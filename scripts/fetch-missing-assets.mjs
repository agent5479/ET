#!/usr/bin/env node
/**
 * Download missing image/CSS/JS/PDF assets referenced by mirrored HTML.
 * Short timeout; logs failures without blocking.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');
const ORIGIN = 'https://www.et.nz';
const TIMEOUT_MS = 12000;
const CONCURRENCY = 8;

function walkHtml(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'wp-content' || ent.name === 'wp-includes') continue;
      walkHtml(p, out);
    } else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function collectRefs(html) {
  const urls = new Set();
  const re = /(?:href|src|poster)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    let u = m[1].split('#')[0].split('?')[0];
    if (!u || u.startsWith('data:') || u.startsWith('mailto:') || u.startsWith('tel:') || u.startsWith('javascript:')) continue;
    if (u.startsWith('/mirror/')) u = u.slice('/mirror'.length);
    if (u.startsWith('/wp-content/') || u.startsWith('/wp-includes/')) urls.add(u);
  }
  const srcset = /srcset=["']([^"']+)["']/gi;
  while ((m = srcset.exec(html))) {
    for (const part of m[1].split(',')) {
      let u = part.trim().split(/\s+/)[0].split('?')[0];
      if (u.startsWith('/mirror/')) u = u.slice('/mirror'.length);
      if (u.startsWith('/wp-content/') || u.startsWith('/wp-includes/')) urls.add(u);
    }
  }
  return [...urls];
}

async function fetchOne(relPath) {
  const local = path.join(MIRROR, relPath.replace(/^\//, ''));
  if (fs.existsSync(local) && fs.statSync(local).size > 0) return { relPath, status: 'skip' };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ORIGIN + relPath, {
      signal: ctrl.signal,
      headers: { 'User-Agent': 'ET-MirrorBot/1.0' },
      redirect: 'follow',
    });
    if (!res.ok) return { relPath, status: 'fail', error: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(local), { recursive: true });
    fs.writeFileSync(local, buf);
    return { relPath, status: 'ok', bytes: buf.length };
  } catch (e) {
    return { relPath, status: 'fail', error: String(e.message || e) };
  } finally {
    clearTimeout(t);
  }
}

async function pool(items, n, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}

const refs = new Set();
for (const f of walkHtml(MIRROR)) {
  for (const r of collectRefs(fs.readFileSync(f, 'utf8'))) refs.add(r);
}

// Also pull CSS url() refs from already downloaded CSS
function walkCss(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkCss(p, out);
    else if (ent.name.endsWith('.css')) out.push(p);
  }
  return out;
}

for (const cssFile of walkCss(path.join(MIRROR, 'wp-content'))) {
  const css = fs.readFileSync(cssFile, 'utf8');
  const re = /url\((['"]?)([^'")]+)\1\)/gi;
  let m;
  while ((m = re.exec(css))) {
    let u = m[2].split('?')[0].split('#')[0];
    if (u.startsWith('data:')) continue;
    try {
      if (u.startsWith('http')) {
        const abs = new URL(u);
        if (!['www.et.nz', 'et.nz'].includes(abs.hostname)) continue;
        u = abs.pathname;
      } else if (u.startsWith('/mirror/')) u = u.slice('/mirror'.length);
      else if (u.startsWith('../') || u.startsWith('./') || !u.startsWith('/')) {
        const abs = new URL(u, ORIGIN + '/' + path.relative(MIRROR, cssFile).replace(/\\/g, '/'));
        u = abs.pathname;
      }
      if (u.startsWith('/wp-content/') || u.startsWith('/wp-includes/')) refs.add(u);
    } catch {}
  }
}

const list = [...refs].sort();
console.log(`Refs to fetch/check: ${list.length}`);
const results = await pool(list, CONCURRENCY, fetchOne);
const ok = results.filter((r) => r.status === 'ok').length;
const skip = results.filter((r) => r.status === 'skip').length;
const fail = results.filter((r) => r.status === 'fail');
fs.writeFileSync(
  path.join(ROOT, 'scrape', 'asset-retry.json'),
  JSON.stringify({ at: new Date().toISOString(), ok, skip, failed: fail }, null, 2),
);
console.log(`ok=${ok} skip=${skip} fail=${fail.length}`);
for (const f of fail.slice(0, 30)) console.log(' FAIL', f.relPath, f.error);
