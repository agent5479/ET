import { SITE } from '../config/site.js';

/** Document head helpers — noindex while test site must not compete with www.et.nz */
export function applyDocumentMeta({ title, description }) {
  document.title = title ? `${title} · ${SITE.name}` : `${SITE.name} · ${SITE.productLine}`;

  upsertMeta('name', 'description', description || SITE.tagline);
  upsertMeta('name', 'robots', SITE.noindex ? 'noindex, nofollow' : 'index, follow');

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
