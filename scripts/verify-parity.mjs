#!/usr/bin/env node
/**
 * Verify local mirror parity: each page HTML + critical CSS/assets return 200.
 * Usage: node scripts/verify-parity.mjs [baseUrl]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.argv[2] || 'http://localhost:5173';
const TIMEOUT_MS = 8000;

const sitemapSrc = fs.readFileSync(path.join(ROOT, 'src', 'sitemap.js'), 'utf8');
const block = sitemapSrc.match(/export const SITEMAP_PATHS = \[([\s\S]*?)\];/);
if (!block) {
  console.error('Could not parse SITEMAP_PATHS');
  process.exit(2);
}
const PATHS = [...block[1].matchAll(/'(\/[^']*)'/g)].map((m) => m[1]);

const CRITICAL = [
  '/mirror/wp-content/themes/storefront/style.css',
  '/mirror/wp-content/themes/storefront-child/style.css',
  '/mirror/wp-content/themes/storefront/assets/css/base/icons.css',
  '/mirror/wp-content/uploads/AES_logo.png',
  '/mirror/wp-content/uploads/logo-sm.png',
  '/mirror/wp-content/plugins/smart-slider-3/Public/SmartSlider3/Application/Frontend/Assets/dist/smartslider.min.css',
];

async function get(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    const buf = await res.arrayBuffer();
    return { status: res.status, bytes: buf.byteLength };
  } catch (e) {
    return { status: 0, bytes: 0, error: String(e.message || e) };
  } finally {
    clearTimeout(t);
  }
}

function mirrorUrl(permalink) {
  if (permalink === '/') return `${BASE}/mirror/index.html`;
  const p = permalink.endsWith('/') ? permalink : `${permalink}/`;
  return `${BASE}/mirror${p}index.html`;
}

const report = { at: new Date().toISOString(), base: BASE, pages: [], assets: [], ok: true };

console.log(`Checking ${PATHS.length} pages against ${BASE}`);
for (const p of PATHS) {
  const url = mirrorUrl(p);
  const r = await get(url);
  const pass = r.status === 200 && r.bytes > 5000;
  report.pages.push({ path: p, url, ...r, pass });
  if (!pass) report.ok = false;
  console.log(pass ? 'OK ' : 'BAD', r.status, String(r.bytes).padStart(8), p);
}

for (const a of CRITICAL) {
  const r = await get(BASE + a);
  const pass = r.status === 200 && r.bytes > 100;
  report.assets.push({ asset: a, ...r, pass });
  if (!pass) report.ok = false;
  console.log(pass ? 'OK ' : 'BAD', r.status, String(r.bytes).padStart(8), a);
}

fs.writeFileSync(path.join(ROOT, 'scrape', 'parity-report.json'), JSON.stringify(report, null, 2));
console.log(report.ok ? '\nPARITY CHECK PASSED' : '\nPARITY CHECK HAD FAILURES — see scrape/parity-report.json');
process.exit(report.ok ? 0 : 1);
