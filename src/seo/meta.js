import { SITE, mirrorAsset } from '../config/site.js';

/** Document head helpers — noindex while test site must not compete with www.et.nz */
export function applyDocumentMeta({ title, description, image } = {}) {
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · ${SITE.productLine}`;
  const desc = description || SITE.tagline;
  document.title = fullTitle;

  upsertMeta('name', 'description', desc);
  upsertMeta('name', 'robots', SITE.noindex ? 'noindex, nofollow' : 'index, follow');

  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', SITE.name);
  upsertMeta('property', 'og:title', fullTitle);
  upsertMeta('property', 'og:description', desc);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', fullTitle);
  upsertMeta('name', 'twitter:description', desc);

  const ogImage = absoluteAssetUrl(image || SITE.heroImage);
  if (ogImage) {
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:image', ogImage);
  }

  if (typeof window !== 'undefined') {
    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    upsertMeta('property', 'og:url', pageUrl);
  }

  if (SITE.canonicalOrigin && typeof window !== 'undefined') {
    const href = SITE.canonicalOrigin + window.location.pathname;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}

function absoluteAssetUrl(path) {
  if (!path || typeof window === 'undefined') return '';
  const relative = mirrorAsset(path);
  if (relative.startsWith('http')) return relative;
  const origin = SITE.canonicalOrigin || window.location.origin;
  return `${origin}${relative.startsWith('/') ? '' : '/'}${relative}`;
}

function upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** LocalBusiness JSON-LD from scrape NAP */
export function localBusinessJsonLd() {
  if (!SITE.address.locality) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    description: SITE.tagline,
    url: SITE.canonicalOrigin || undefined,
    telephone: SITE.freephone || SITE.phone,
    email: SITE.contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.line1,
      addressLocality: SITE.address.locality,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
  };
}
