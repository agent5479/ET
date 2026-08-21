#!/usr/bin/env node
/**
 * Post-process Vite dist for GitHub Pages project site (https://<user>.github.io/ET/).
 * - Prefix /mirror asset URLs with /ET
 * - SPA fallback: copy index.html → 404.html
 * - Touch .nojekyll
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const BASE = (process.env.VITE_BASE || '/ET/').replace(/\/?$/, '/'); // e.g. /ET/
const BASE_NO_SLASH = BASE.replace(/\/$/, '') || '';

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  console.error('dist/ missing — run vite build first');
  process.exit(1);
}

let htmlTouched = 0;
for (const file of walk(DIST)) {
  if (!file.endsWith('.html') && !file.endsWith('.css') && !file.endsWith('.js')) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;

  // Absolute mirror assets → /ET/mirror/...
  text = text.replace(/(=["'])\/mirror\//g, `$1${BASE}mirror/`);
  text = text.replace(/(url\((['"]?))\/mirror\//g, `$1$2${BASE}mirror/`);
  text = text.replace(/href="\/mirror\//g, `href="${BASE}mirror/`);
  text = text.replace(/src="\/mirror\//g, `src="${BASE}mirror/`);
  text = text.replace(/<base href="\/mirror\//g, `<base href="${BASE}mirror/`);

  // Avoid double-prefix
  text = text.replaceAll(`${BASE}${BASE}`.replace(/\/$/, '/'), BASE);

  if (text !== before) {
    fs.writeFileSync(file, text);
    htmlTouched++;
  }
}

// SPA deep-link fallback for GitHub Pages
fs.copyFileSync(path.join(DIST, 'index.html'), path.join(DIST, '404.html'));
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');

fs.writeFileSync(
  path.join(DIST, 'pages-meta.json'),
  JSON.stringify({ base: BASE, preparedAt: new Date().toISOString(), htmlTouched }, null, 2),
);

console.log(`GitHub Pages prepare done. base=${BASE} filesRewritten≈${htmlTouched} basename=${BASE_NO_SLASH || '/'}`);
