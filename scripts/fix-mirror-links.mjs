#!/usr/bin/env node
/**
 * Post-process mirrored HTML:
 * - Page permalinks → /slug/ (Vite mirror middleware)
 * - Assets stay under /mirror/wp-content|wp-includes/...
 * - Fix <base href>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');

const PAGE_SLUGS = new Set([
  '',
  'aes-certification-videos',
  'enquiry',
  'presby-environmental-inc',
  'et-shop',
  'warranty',
  'products-from-et',
  'disclaimer-and-copyright',
  'salcor-uv-disinfection-unit',
  'news-events',
  'products',
  'commercial',
  'community',
  'design-aids',
  'design-drawings',
  'designers',
  'greywater-recycling',
  'how-it-works',
  'installation-aids',
  'installations',
  'installers',
  'large-scale-projects',
  'marketing-material',
  'privacy-policy-2',
  'resources',
  'system-sand',
  'the-aes-system',
  'homeowners',
  'price-request',
  'contact-us',
  'designers-installers',
  'aes-online-training-course',
  'case-studies',
  'aes-components',
  'oset-testing',
  'videos',
  'about-us',
  'documents',
  'shop',
  'system-sand-suppliers',
  'tuf-tite',
  'brochure-3',
  'faq',
  'media',
  'residential',
]);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function fixHtml(html, filePath) {
  const relDir = path.relative(MIRROR, path.dirname(filePath)).replace(/\\/g, '/');
  const basePath = relDir === '' ? '/' : `/${relDir}/`;

  let out = html;

  // Normalize absolute mirror page links → clean permalinks
  out = out.replace(/\/mirror\/(?:index\.html)?(?=["'#?\s>])/g, '/');
  // Nested custom menu paths e.g. /mirror/products/aes-components/ → /aes-components/
  out = out.replace(
    /\/mirror\/(?:products|resources)\/([a-z0-9-]+)\/(?:index\.html)?(?=["'#?\s>])/gi,
    (m, slug) => (PAGE_SLUGS.has(slug.toLowerCase()) ? `/${slug}/` : m),
  );
  out = out.replace(/\/mirror\/([a-z0-9-]+)\/(?:index\.html)?(?=["'#?\s>])/gi, (m, slug) => {
    if (PAGE_SLUGS.has(slug.toLowerCase())) return `/${slug}/`;
    return m;
  });

  // Any leftover https://www.et.nz/page → /page/
  out = out.replace(/https?:\/\/(?:www\.)?et\.nz\/([a-z0-9-]+\/?)(?=["'#?\s>])/gi, (m, slug) => {
    const s = slug.replace(/\/$/, '');
    if (PAGE_SLUGS.has(s)) return `/${s}/`;
    return m;
  });
  out = out.replace(/https?:\/\/(?:www\.)?et\.nz\/?(?=["'#?\s>])/gi, '/');

  // Ensure assets use /mirror prefix
  out = out.replace(/(["'(=])(\/(?:wp-content|wp-includes)\/)/gi, '$1/mirror$2');
  out = out.replace(/(["'(=])\/mirror\/mirror\//g, '$1/mirror/');

  // Fix base
  if (/<base\s/i.test(out)) {
    out = out.replace(/<base[^>]*>/i, `<base href="${basePath}">`);
  } else {
    out = out.replace(/<head([^>]*)>/i, `<head$1><base href="${basePath}">`);
  }

  return out;
}

const files = walk(MIRROR).filter((f) => !f.includes(`${path.sep}wp-content${path.sep}`) || f.endsWith(`${path.sep}contact-us${path.sep}index.html`) === false);
// Only rewrite actual page mirrors at top-level slug folders + root
const pageFiles = walk(MIRROR).filter((f) => {
  const rel = path.relative(MIRROR, f).replace(/\\/g, '/');
  if (rel === 'index.html') return true;
  const parts = rel.split('/');
  return parts.length === 2 && parts[1] === 'index.html' && PAGE_SLUGS.has(parts[0]);
});

for (const f of pageFiles) {
  const html = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f, fixHtml(html, f), 'utf8');
  console.log('fixed', path.relative(ROOT, f));
}
console.log(`Fixed ${pageFiles.length} pages`);
