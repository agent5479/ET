#!/usr/bin/env node
/**
 * 1:1 mirror scraper for www.et.nz
 * - Fetches sitemap pages with short timeouts
 * - Downloads linked CSS/JS/images/fonts/docs
 * - Rewrites absolute www.et.nz URLs to local /mirror paths
 * Notes failures for retry without blocking progress
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');
const ORIGIN = 'https://www.et.nz';
const TIMEOUT_MS = Number(process.env.SCRAPE_TIMEOUT_MS || 12000);
const CONCURRENCY = Number(process.env.SCRAPE_CONCURRENCY || 4);

const PAGE_URLS = [
  'https://www.et.nz/',
  'https://www.et.nz/aes-certification-videos/',
  'https://www.et.nz/enquiry/',
  'https://www.et.nz/presby-environmental-inc/',
  'https://www.et.nz/et-shop/',
  'https://www.et.nz/warranty/',
  'https://www.et.nz/products-from-et/',
  'https://www.et.nz/disclaimer-and-copyright/',
  'https://www.et.nz/salcor-uv-disinfection-unit/',
  'https://www.et.nz/news-events/',
  'https://www.et.nz/products/',
  'https://www.et.nz/commercial/',
  'https://www.et.nz/community/',
  'https://www.et.nz/design-aids/',
  'https://www.et.nz/design-drawings/',
  'https://www.et.nz/designers/',
  'https://www.et.nz/greywater-recycling/',
  'https://www.et.nz/how-it-works/',
  'https://www.et.nz/installation-aids/',
  'https://www.et.nz/installations/',
  'https://www.et.nz/installers/',
  'https://www.et.nz/large-scale-projects/',
  'https://www.et.nz/marketing-material/',
  'https://www.et.nz/privacy-policy-2/',
  'https://www.et.nz/resources/',
  'https://www.et.nz/system-sand/',
  'https://www.et.nz/the-aes-system/',
  'https://www.et.nz/homeowners/',
  'https://www.et.nz/price-request/',
  'https://www.et.nz/contact-us/',
  'https://www.et.nz/designers-installers/',
  'https://www.et.nz/aes-online-training-course/',
  'https://www.et.nz/case-studies/',
  'https://www.et.nz/aes-components/',
  'https://www.et.nz/oset-testing/',
  'https://www.et.nz/videos/',
  'https://www.et.nz/about-us/',
  'https://www.et.nz/documents/',
  'https://www.et.nz/shop/',
];

const failed = [];
const downloaded = new Set();
const assetQueue = [];
let active = 0;

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function urlToLocalPath(urlStr) {
  const u = new URL(urlStr);
  let p = decodeURIComponent(u.pathname);
  if (p.endsWith('/')) p += 'index.html';
  if (!path.extname(p) && !p.endsWith('.html')) {
    // pretty WP permalinks → directory index
    if (!p.endsWith('/')) p += '/';
    p += 'index.html';
  }
  return path.join(MIRROR, p.replace(/^\//, ''));
}

function toMirrorHref(urlStr) {
  try {
    const u = new URL(urlStr, ORIGIN);
    if (!['www.et.nz', 'et.nz'].includes(u.hostname)) return urlStr;
    let p = u.pathname + (u.search || '');
    if (p.endsWith('/')) p += 'index.html';
    else if (!path.extname(p.split('?')[0])) {
      p = p.replace(/\/?$/, '/') + 'index.html';
    }
    return '/mirror' + (p.startsWith('/') ? p : `/${p}`);
  } catch {
    return urlStr;
  }
}

function rewriteHtml(html, pageUrl) {
  let out = html;
  // Absolute et.nz URLs
  out = out.replace(/https?:\/\/(?:www\.)?et\.nz(\/[^"')\s]*)/gi, (_, pathPart) => {
    return toMirrorHref(ORIGIN + pathPart);
  });
  // Protocol-relative
  out = out.replace(/\/\/(?:www\.)?et\.nz(\/[^"')\s]*)/gi, (_, pathPart) => {
    return toMirrorHref(ORIGIN + pathPart);
  });
  // Root-relative assets stay root-relative under /mirror for assets we download into public/mirror
  // Convert /wp-content and /wp-includes to /mirror/...
  out = out.replace(/(["'(=])(\/(?:wp-content|wp-includes|wp-json)[^"'\\\s)]*)/gi, (_, pre, p) => {
    return `${pre}/mirror${p}`;
  });
  // Inject base so relative links resolve under mirror page dir
  if (!/<base\s/i.test(out)) {
    out = out.replace(/<head([^>]*)>/i, `<head$1><base href="/mirror${new URL(pageUrl).pathname}">`);
  }
  return out;
}

function extractUrls(html, baseUrl) {
  const found = new Set();
  const re =
    /(?:href|src|srcset|data-src|data-lazy-src|poster)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1];
    if (raw.startsWith('data:') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) continue;
    if (raw.includes(',')) {
      // srcset
      for (const part of raw.split(',')) {
        const u = part.trim().split(/\s+/)[0];
        try {
          const abs = new URL(u, baseUrl);
          if (['www.et.nz', 'et.nz'].includes(abs.hostname)) found.add(abs.href.split('#')[0]);
        } catch {}
      }
      continue;
    }
    try {
      const abs = new URL(raw, baseUrl);
      if (['www.et.nz', 'et.nz'].includes(abs.hostname)) found.add(abs.href.split('#')[0]);
    } catch {}
  }
  // url(...) in inline CSS
  const cssUrl = /url\((['"]?)([^'")]+)\1\)/gi;
  while ((m = cssUrl.exec(html))) {
    const raw = m[2];
    if (raw.startsWith('data:')) continue;
    try {
      const abs = new URL(raw, baseUrl);
      if (['www.et.nz', 'et.nz'].includes(abs.hostname)) found.add(abs.href.split('#')[0]);
    } catch {}
  }
  return [...found];
}

function isHtmlUrl(urlStr) {
  const u = new URL(urlStr);
  const ext = path.extname(u.pathname).toLowerCase();
  if (!ext || ext === '.html' || ext === '.php') return true;
  return false;
}

async function fetchBuffer(urlStr) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(urlStr, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'ET-MirrorBot/1.0 (+local replication)',
        Accept: '*/*',
      },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    return { buf, contentType: res.headers.get('content-type') || '' };
  } finally {
    clearTimeout(t);
  }
}

async function saveAsset(urlStr) {
  const key = urlStr.split('#')[0];
  if (downloaded.has(key)) return;
  downloaded.add(key);

  // Skip non-site and huge unknown APIs
  const u = new URL(key);
  if (!['www.et.nz', 'et.nz'].includes(u.hostname)) return;
  if (u.pathname.startsWith('/wp-json')) return;
  if (u.pathname.includes('/xmlrpc.php')) return;

  const local = urlToLocalPath(key);
  if (fs.existsSync(local) && fs.statSync(local).size > 0) {
    // Still parse CSS for nested assets
    if (local.endsWith('.css')) {
      const css = fs.readFileSync(local, 'utf8');
      enqueueAssets(extractUrls(css, key));
    }
    return;
  }

  try {
    const { buf, contentType } = await fetchBuffer(key);
    ensureDir(path.dirname(local));
    // If WP returns HTML for pretty URL assets, write as html
    let dest = local;
    if (contentType.includes('text/html') && !dest.endsWith('.html')) {
      dest = path.join(path.dirname(local), path.basename(local) || 'index', 'index.html');
      ensureDir(path.dirname(dest));
    }
    fs.writeFileSync(dest, buf);
    process.stdout.write(`  asset OK ${key}\n`);

    if (dest.endsWith('.css') || contentType.includes('text/css')) {
      const css = buf.toString('utf8');
      const rewritten = css.replace(/https?:\/\/(?:www\.)?et\.nz/gi, '').replace(/url\((['"]?)\/(?!mirror)/gi, 'url($1/mirror/');
      // Better: rewrite absolute to /mirror
      const css2 = css
        .replace(/https?:\/\/(?:www\.)?et\.nz(\/[^)"'\s]*)/gi, '/mirror$1')
        .replace(/\/\/(?:www\.)?et\.nz(\/[^)"'\s]*)/gi, '/mirror$1');
      fs.writeFileSync(dest, css2);
      enqueueAssets(extractUrls(css2, key));
    }
  } catch (err) {
    failed.push({ url: key, error: String(err.message || err), type: 'asset' });
    process.stdout.write(`  asset FAIL ${key} :: ${err.message}\n`);
  }
}

function enqueueAssets(urls) {
  for (const url of urls) {
    if (isHtmlUrl(url) && !PAGE_URLS.includes(url) && !url.includes('/wp-content/') && !url.includes('/wp-includes/')) {
      // Internal page link — only download if it's a known page or file asset with extension
      const ext = path.extname(new URL(url).pathname).toLowerCase();
      if (!ext || ext === '.html' || ext === '.php') continue;
    }
    assetQueue.push(url);
  }
}

async function pumpAssets() {
  while (assetQueue.length || active > 0) {
    while (active < CONCURRENCY && assetQueue.length) {
      const url = assetQueue.shift();
      active++;
      saveAsset(url).finally(() => {
        active--;
      });
    }
    await new Promise((r) => setTimeout(r, 50));
  }
}

async function scrapePage(pageUrl) {
  process.stdout.write(`PAGE ${pageUrl}\n`);
  try {
    const { buf, contentType } = await fetchBuffer(pageUrl);
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml')) {
      throw new Error(`Unexpected type ${contentType}`);
    }
    let html = buf.toString('utf8');
    const assets = extractUrls(html, pageUrl);
    enqueueAssets(assets);
    html = rewriteHtml(html, pageUrl);
    const local = urlToLocalPath(pageUrl);
    ensureDir(path.dirname(local));
    fs.writeFileSync(local, html, 'utf8');
    process.stdout.write(`  page OK → ${path.relative(ROOT, local)}\n`);
  } catch (err) {
    failed.push({ url: pageUrl, error: String(err.message || err), type: 'page' });
    process.stdout.write(`  page FAIL :: ${err.message}\n`);
  }
}

async function main() {
  ensureDir(MIRROR);
  ensureDir(path.join(ROOT, 'scrape'));

  for (const page of PAGE_URLS) {
    await scrapePage(page);
  }

  process.stdout.write(`\nDownloading ${assetQueue.length}+ assets...\n`);
  await pumpAssets();

  // Second pass: extract assets from saved HTML again (catch missed)
  const walk = (dir) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith('.html')) {
        const html = fs.readFileSync(p, 'utf8');
        // recover original-ish base from path
        const rel = '/' + path.relative(MIRROR, p).replace(/\\/g, '/').replace(/index\.html$/, '');
        enqueueAssets(extractUrls(html.replaceAll('/mirror', ''), ORIGIN + rel));
      }
    }
  };
  walk(MIRROR);
  await pumpAssets();

  const report = {
    scrapedAt: new Date().toISOString(),
    timeoutMs: TIMEOUT_MS,
    pagesAttempted: PAGE_URLS.length,
    assetsDownloaded: [...downloaded].length,
    failed,
  };
  fs.writeFileSync(path.join(ROOT, 'scrape', 'failures.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(
    path.join(ROOT, 'scrape', 'sitemap-urls.json'),
    JSON.stringify(PAGE_URLS, null, 2),
  );

  process.stdout.write(`\nDone. Assets: ${downloaded.size}. Failures: ${failed.length}\n`);
  if (failed.length) {
    process.stdout.write('See scrape/failures.json\n');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
