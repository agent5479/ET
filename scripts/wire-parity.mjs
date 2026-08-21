#!/usr/bin/env node
/**
 * Parity wiring pass over mirrored HTML:
 * - Assets: //www.et.nz/wp-* and https://www.et.nz/wp-* → /mirror/wp-*
 * - Internal page links → local permalinks (for in-iframe navigation)
 * - <base href="/mirror/..."> so relative URLs resolve
 * Minimises React work by keeping WP CSS/JS intact.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'public', 'mirror');

const PAGE_SLUGS = new Set(
  fs
    .readdirSync(MIRROR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && d.name !== 'wp-content' && d.name !== 'wp-includes')
    .map((d) => d.name),
);

function walkPages() {
  const files = [];
  const rootIndex = path.join(MIRROR, 'index.html');
  if (fs.existsSync(rootIndex)) files.push(rootIndex);
  for (const slug of PAGE_SLUGS) {
    const f = path.join(MIRROR, slug, 'index.html');
    if (fs.existsSync(f)) files.push(f);
  }
  return files;
}

function wire(html, filePath) {
  const relDir = path.relative(MIRROR, path.dirname(filePath)).replace(/\\/g, '/');
  const basePath = relDir === '' ? '/mirror/' : `/mirror/${relDir}/`;

  let out = html;

  // Protocol-relative + absolute asset hosts → local mirror
  out = out.replace(/https?:\/\/(?:www\.)?et\.nz(\/(?:wp-content|wp-includes)\/[^"'\\\s)]*)/gi, '/mirror$1');
  out = out.replace(/\/\/(?:www\.)?et\.nz(\/(?:wp-content|wp-includes)\/[^"'\\\s)]*)/gi, '/mirror$1');

  // Already /wp-content without /mirror prefix
  out = out.replace(/(["'(=])(\/(?:wp-content|wp-includes)\/)/gi, '$1/mirror$2');
  out = out.replace(/\/mirror\/mirror\//g, '/mirror/');

  // Internal page URLs → local permalinks (parent React route via bridge script)
  out = out.replace(/https?:\/\/(?:www\.)?et\.nz\/([a-z0-9-]+)\/?/gi, (m, slug) => {
    if (PAGE_SLUGS.has(slug)) return `/${slug}/`;
    return m;
  });
  out = out.replace(/https?:\/\/(?:www\.)?et\.nz\/?(?=["'#?\s>])/gi, '/');

  // Nested product menu leftovers
  out = out.replace(/\/mirror\/(?:products|resources)\/([a-z0-9-]+)\/(?:index\.html)?/gi, (m, slug) =>
    PAGE_SLUGS.has(slug) ? `/${slug}/` : m,
  );
  out = out.replace(/\/mirror\/([a-z0-9-]+)\/(?:index\.html)?(?=["'#?\s>])/gi, (m, slug) =>
    PAGE_SLUGS.has(slug) ? `/${slug}/` : m,
  );

  if (/<base\s/i.test(out)) out = out.replace(/<base[^>]*>/i, `<base href="${basePath}">`);
  else out = out.replace(/<head([^>]*)>/i, `<head$1><base href="${basePath}">`);

  // Inject noindex if missing (test site)
  if (!/name=["']robots["']/i.test(out)) {
    out = out.replace(/<head([^>]*)>/i, `<head$1><meta name="robots" content="noindex, nofollow">`);
  }

  // Bridge: in-iframe clicks navigate parent React route (supports GitHub Pages basename via parent.__ET_BASE__)
  const bridge = `<script data-et-parity-bridge>(function(){if(window.top===window)return;document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank'||a.hasAttribute('download'))return;var href=a.getAttribute('href');if(!href||href.charAt(0)==='#'||/^(mailto:|tel:|javascript:)/i.test(href))return;try{var u=new URL(href,window.location.href);if(u.origin!==window.location.origin)return;if(u.pathname.indexOf('/mirror/wp-')===0||u.pathname.indexOf('/ET/mirror/wp-')===0||/\\.(pdf|zip|png|jpe?g|gif|svg|css|js)(\\?|$)/i.test(u.pathname))return;e.preventDefault();var base=(window.parent.__ET_BASE__||'').replace(/\\/$/,'');var path=u.pathname+(u.search||'')+(u.hash||'');if(base&&path.indexOf(base+'/')!==0&&path!==base)path=base+path;window.parent.location.href=path;}catch(err){}});}());</script>`;
  if (!/data-et-parity-bridge/.test(out)) {
    out = out.replace(/<\/body>/i, `${bridge}</body>`);
  }

  return out;
}

const files = walkPages();
let n = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  const after = wire(before, f);
  if (after !== before) {
    fs.writeFileSync(f, after, 'utf8');
    n++;
  }
  console.log('wired', path.relative(ROOT, f));
}
console.log(`Wired ${files.length} pages (${n} changed). Slugs: ${PAGE_SLUGS.size}`);
