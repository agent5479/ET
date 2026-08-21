#!/usr/bin/env node
/**
 * Discover ALL internal et.nz URLs from:
 * - Yoast sitemaps
 * - WP REST API (pages + posts)
 * - Link crawl of already-mirrored HTML
 * Writes scrape/discovered-urls.json (allow-all inventory)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');
const ORIGIN = 'https://www.et.nz';
const TIMEOUT_MS = 10000;

const found = new Map(); // href -> sources[]

function add(url, source) {
  try {
    const u = new URL(url, ORIGIN);
    if (!['www.et.nz', 'et.nz'].includes(u.hostname)) return;
    u.hash = '';
    // normalize
    let href = u.origin.replace('://et.nz', '://www.et.nz') + u.pathname + u.search;
    if (!path.extname(u.pathname) && !href.endsWith('/') && !u.search) href += '/';
    if (!found.has(href)) found.set(href, []);
    found.get(href).push(source);
  } catch {}
}

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'ET-DiscoverBot/1.0', Accept: '*/*' },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'wp-content' || ent.name === 'wp-includes') continue;
      walkHtml(p, out);
    } else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function extractLinks(html, base) {
  const re = /(?:href|src)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1];
    if (/^(mailto:|tel:|javascript:|data:|#)/i.test(raw)) continue;
    add(raw, base);
  }
}

// 1) Sitemaps
const sitemapUrls = [
  `${ORIGIN}/sitemap_index.xml`,
  `${ORIGIN}/page-sitemap.xml`,
  `${ORIGIN}/post-sitemap.xml`,
];
for (const sm of sitemapUrls) {
  try {
    const xml = await fetchText(sm);
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]);
    for (const loc of locs) {
      if (loc.endsWith('.xml')) {
        try {
          const nested = await fetchText(loc);
          for (const m of nested.matchAll(/<loc>([^<]+)<\/loc>/g)) add(m[1], `sitemap:${sm}`);
        } catch (e) {
          console.log('sitemap nested fail', loc, e.message);
        }
      } else add(loc, `sitemap:${sm}`);
    }
    console.log('sitemap ok', sm, locs.length);
  } catch (e) {
    console.log('sitemap fail', sm, e.message);
  }
}

// 2) REST API pages + posts (paginate)
async function restAll(endpoint, label) {
  let page = 1;
  while (page <= 20) {
    const url = `${ORIGIN}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}&_fields=link,slug,status`;
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'ET-DiscoverBot/1.0' } });
      clearTimeout(t);
      if (res.status === 400 || res.status === 404) break;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rows = await res.json();
      if (!Array.isArray(rows) || rows.length === 0) break;
      for (const row of rows) if (row.link) add(row.link, `rest:${label}`);
      console.log(`rest ${label} page ${page}: ${rows.length}`);
      if (rows.length < 100) break;
      page++;
    } catch (e) {
      console.log(`rest ${label} fail`, e.message);
      break;
    }
  }
}
await restAll('pages', 'pages');
await restAll('posts', 'posts');

// 3) Crawl mirrored HTML
for (const file of walkHtml(MIRROR)) {
  const html = fs.readFileSync(file, 'utf8');
  extractLinks(html.replaceAll('/mirror', ''), `mirror:${path.relative(MIRROR, file)}`);
}

// Classify
const pages = [];
const assets = [];
const other = [];
for (const [href, sources] of [...found.entries()].sort()) {
  const u = new URL(href);
  const ext = path.extname(u.pathname).toLowerCase();
  const row = { href, sources: [...new Set(sources)] };
  if (!ext || ext === '.html' || ext === '.php') pages.push(row);
  else if (u.pathname.includes('/wp-content/') || u.pathname.includes('/wp-includes/')) assets.push(row);
  else other.push(row);
}

const already = new Set();
for (const ent of walkHtml(MIRROR)) {
  const rel = path.relative(MIRROR, path.dirname(ent)).replace(/\\/g, '/');
  already.add(rel === '' ? `${ORIGIN}/` : `${ORIGIN}/${rel}/`);
}

const missingPages = pages.filter((p) => {
  const u = new URL(p.href);
  if (u.pathname.startsWith('/wp-json') || u.pathname.startsWith('/feed') || u.pathname.includes('xmlrpc')) return false;
  const key = `${ORIGIN}${u.pathname.endsWith('/') || path.extname(u.pathname) ? u.pathname : u.pathname + '/'}`;
  return !already.has(key) && !already.has(key.replace(/\/$/, '') + '/');
});

const report = {
  discoveredAt: new Date().toISOString(),
  totals: { pages: pages.length, assets: assets.length, other: other.length, missingPages: missingPages.length },
  missingPages,
  pages,
  assetsSample: assets.slice(0, 50),
};

fs.mkdirSync(path.join(ROOT, 'scrape'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'scrape', 'discovered-urls.json'), JSON.stringify(report, null, 2));
fs.writeFileSync(
  path.join(ROOT, 'scrape', 'missing-pages.json'),
  JSON.stringify(missingPages, null, 2),
);
console.log(JSON.stringify(report.totals, null, 2));
console.log('Missing page URLs:');
for (const m of missingPages) console.log(' ', m.href);
