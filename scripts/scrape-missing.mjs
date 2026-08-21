#!/usr/bin/env node
/** HEAD/GET check candidate URLs; scrape HTML pages that return 200. Timeout 8s. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');
const ORIGIN = 'https://www.et.nz';
const TIMEOUT_MS = 8000;

const CANDIDATES = [
  'https://www.et.nz/case-studies-technical/',
  'https://www.et.nz/members-home-page/',
  'https://www.et.nz/seasonal-worker-accommodation/',
  'https://www.et.nz/secure/',
  'https://www.et.nz/brochure-3/',
  'https://www.et.nz/residential/',
  'https://www.et.nz/faq/',
  'https://www.et.nz/products/aes-components/',
  'https://www.et.nz/products/tuf-tite/',
  'https://www.et.nz/products/salcor-uv-disinfection-unit/',
  'https://www.et.nz/products/greywater-recycling/',
];

// Also scrape any REST page links not yet mirrored
const restPath = path.join(ROOT, 'scrape', 'discovered-urls.json');
if (fs.existsSync(restPath)) {
  const disc = JSON.parse(fs.readFileSync(restPath, 'utf8'));
  for (const p of disc.pages || []) {
    if ((p.sources || []).some((s) => s.startsWith('rest:'))) {
      CANDIDATES.push(p.href);
    }
  }
}

const unique = [...new Set(CANDIDATES)];
const results = [];

async function checkAndScrape(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'ET-MirrorBot/1.0' },
      redirect: 'follow',
    });
    const finalUrl = res.url;
    // Never overwrite www homepage with external hosts (e.g. /secure/ → aes.et.nz)
    const finalHost = new URL(finalUrl).hostname;
    if (!['www.et.nz', 'et.nz'].includes(finalHost)) {
      results.push({ url, finalUrl, status: res.status, action: 'external-skip' });
      console.log('EXTERNAL', url, '→', finalUrl);
      return;
    }
    const ct = res.headers.get('content-type') || '';
    if (!res.ok) {
      results.push({ url, finalUrl, status: res.status, action: 'skip-http' });
      console.log('FAIL', res.status, url, '→', finalUrl);
      return;
    }
    if (!ct.includes('text/html')) {
      results.push({ url, finalUrl, status: res.status, action: 'skip-type', ct });
      return;
    }
    const htmlRaw = await res.text();
    const u = new URL(finalUrl);
    const slug = u.pathname.replace(/^\/|\/$/g, '');
    // If redirected to an already-known page path, still ensure file exists under final slug
    const local = slug ? path.join(MIRROR, slug, 'index.html') : path.join(MIRROR, 'index.html');
    let html = htmlRaw
      .replace(/https?:\/\/(?:www\.)?et\.nz(\/(?:wp-content|wp-includes)\/[^"')\s]*)/gi, '/mirror$1')
      .replace(/(["'(=])(\/(?:wp-content|wp-includes)\/)/gi, '$1/mirror$2')
      .replace(/https?:\/\/(?:www\.)?et\.nz\//gi, '/');
    if (!/<base\s/i.test(html)) {
      html = html.replace(/<head([^>]*)>/i, `<head$1><base href="/${slug ? slug + '/' : ''}">`);
    } else {
      html = html.replace(/<base[^>]*>/i, `<base href="/${slug ? slug + '/' : ''}">`);
    }
    fs.mkdirSync(path.dirname(local), { recursive: true });
    fs.writeFileSync(local, html, 'utf8');
    results.push({ url, finalUrl, status: 200, action: 'saved', local: path.relative(ROOT, local) });
    console.log('OK', url, '→', path.relative(ROOT, local), `(final ${finalUrl})`);
  } catch (e) {
    results.push({ url, status: 'timeout/error', error: String(e.message || e), action: 'failed' });
    console.log('ERR', url, e.message);
  } finally {
    clearTimeout(t);
  }
}

for (const url of unique) {
  await checkAndScrape(url);
}

fs.writeFileSync(path.join(ROOT, 'scrape', 'rescrape-results.json'), JSON.stringify({ at: new Date().toISOString(), results }, null, 2));
const failed = results.filter((r) => r.action === 'failed' || r.action === 'skip-http');
console.log(`Done. saved=${results.filter((r) => r.action === 'saved').length} failed/skip=${failed.length}`);
