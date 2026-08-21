#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');
const TIMEOUT_MS = 10000;

async function get(url, { follow = true } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'ET-MirrorBot/1.0' },
      redirect: follow ? 'follow' : 'manual',
    });
    if (!follow && res.status >= 300 && res.status < 400) {
      return { url: res.headers.get('location') || url, html: null, redirect: true, status: res.status };
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { url: res.url, html: await res.text(), status: res.status };
  } finally {
    clearTimeout(t);
  }
}

function rewrite(html, base) {
  let h = html
    .replace(/https?:\/\/(?:www\.)?et\.nz(\/(?:wp-content|wp-includes)\/[^"')\s]*)/gi, '/mirror$1')
    .replace(/(["'(=])(\/(?:wp-content|wp-includes)\/)/gi, '$1/mirror$2');
  if (!/<base\s/i.test(h)) h = h.replace(/<head([^>]*)>/i, `<head$1><base href="${base}">`);
  else h = h.replace(/<base[^>]*>/i, `<base href="${base}">`);
  return h;
}

const home = await get('https://www.et.nz/');
fs.writeFileSync(path.join(MIRROR, 'index.html'), rewrite(home.html, '/'), 'utf8');
console.log('restored homepage', home.html.length);

const secure = await get('https://www.et.nz/secure/', { follow: false });
console.log('secure probe', secure);

try {
  const aes = await get('https://aes.et.nz/');
  const dir = path.join(MIRROR, '_external', 'aes.et.nz');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), aes.html, 'utf8');
  fs.writeFileSync(
    path.join(ROOT, 'scrape', 'aes-portal-note.json'),
    JSON.stringify(
      {
        at: new Date().toISOString(),
        wwwSecure: 'https://www.et.nz/secure/',
        redirectsTo: 'https://aes.et.nz/',
        fetched: aes.url,
        bytes: aes.html.length,
        note: 'Training/exam portal is on aes.et.nz — simulate in React; do not overwrite www homepage when following /secure/.',
      },
      null,
      2,
    ),
  );
  console.log('aes portal saved', aes.url, aes.html.length);
} catch (e) {
  fs.writeFileSync(
    path.join(ROOT, 'scrape', 'aes-portal-note.json'),
    JSON.stringify({ at: new Date().toISOString(), error: String(e.message || e) }, null, 2),
  );
  console.log('aes fail', e.message);
}
