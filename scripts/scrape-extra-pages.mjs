#!/usr/bin/env node
/** Scrape extra internal pages discovered via nav links but missing from Yoast sitemap. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');
const ORIGIN = 'https://www.et.nz';
const TIMEOUT_MS = 12000;

const EXTRA = [
  'https://www.et.nz/system-sand-suppliers/',
  'https://www.et.nz/tuf-tite/',
  'https://www.et.nz/brochure-3/',
  'https://www.et.nz/faq/',
  'https://www.et.nz/media/',
  'https://www.et.nz/residential/',
];

async function scrape(url) {
  const u = new URL(url);
  const slug = u.pathname.replace(/^\/|\/$/g, '') || '';
  const dest = path.join(MIRROR, slug || '.', slug ? 'index.html' : 'index.html');
  const local = slug ? path.join(MIRROR, slug, 'index.html') : path.join(MIRROR, 'index.html');
  if (fs.existsSync(local) && fs.statSync(local).size > 1000) {
    console.log('skip exists', url);
    return;
  }
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'ET-MirrorBot/1.0' }, redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let html = await res.text();
    html = html
      .replace(/https?:\/\/(?:www\.)?et\.nz(\/(?:wp-content|wp-includes)\/[^"')\s]*)/gi, '/mirror$1')
      .replace(/(["'(=])(\/(?:wp-content|wp-includes)\/)/gi, '$1/mirror$2')
      .replace(/https?:\/\/(?:www\.)?et\.nz\//gi, '/')
      .replace(/<head([^>]*)>/i, `<head$1><base href="/${slug ? slug + '/' : ''}">`);
    fs.mkdirSync(path.dirname(local), { recursive: true });
    fs.writeFileSync(local, html, 'utf8');
    console.log('OK', url, '→', path.relative(ROOT, local));
  } catch (e) {
    console.log('FAIL', url, e.message);
    fs.mkdirSync(path.join(ROOT, 'scrape'), { recursive: true });
    const failPath = path.join(ROOT, 'scrape', 'extra-page-failures.json');
    const prev = fs.existsSync(failPath) ? JSON.parse(fs.readFileSync(failPath, 'utf8')) : [];
    prev.push({ url, error: String(e.message || e), at: new Date().toISOString() });
    fs.writeFileSync(failPath, JSON.stringify(prev, null, 2));
  } finally {
    clearTimeout(t);
  }
}

for (const url of EXTRA) await scrape(url);

// Fetch youtube image with weird newline in sitemap/html
const yt = '/wp-content/uploads/You-Tube-150x71-1.png';
const ytLocal = path.join(MIRROR, yt.slice(1));
if (!fs.existsSync(ytLocal)) {
  try {
    const res = await fetch(ORIGIN + yt, { headers: { 'User-Agent': 'ET-MirrorBot/1.0' } });
    if (res.ok) {
      fs.mkdirSync(path.dirname(ytLocal), { recursive: true });
      fs.writeFileSync(ytLocal, Buffer.from(await res.arrayBuffer()));
      console.log('OK youtube png');
    } else console.log('FAIL youtube', res.status);
  } catch (e) {
    console.log('FAIL youtube', e.message);
  }
}

spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'fix-mirror-links.mjs')], { stdio: 'inherit' });
spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'fetch-missing-assets.mjs')], { stdio: 'inherit' });
