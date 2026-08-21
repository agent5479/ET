/** Mirrored WP paths (parity phase — aesthetics = scraped Storefront). */
export const SITEMAP_PATHS = [
  '/',
  '/about-us/',
  '/aes-certification-videos/',
  '/aes-components/',
  '/aes-online-training-course/',
  '/case-studies/',
  '/case-studies-technical/',
  '/commercial/',
  '/community/',
  '/contact-us/',
  '/design-aids/',
  '/design-drawings/',
  '/designers/',
  '/designers-installers/',
  '/disclaimer-and-copyright/',
  '/documents/',
  '/enquiry/',
  '/et-shop/',
  '/greywater-recycling/',
  '/homeowners/',
  '/how-it-works/',
  '/installation-aids/',
  '/installations/',
  '/installers/',
  '/large-scale-projects/',
  '/marketing-material/',
  '/media/',
  '/members-home-page/',
  '/news-events/',
  '/oset-testing/',
  '/presby-environmental-inc/',
  '/price-request/',
  '/privacy-policy-2/',
  '/products/',
  '/products-from-et/',
  '/resources/',
  '/salcor-uv-disinfection-unit/',
  '/shop/',
  '/system-sand/',
  '/system-sand-suppliers/',
  '/the-aes-system/',
  '/tuf-tite/',
  '/videos/',
  '/warranty/',
];

/** React Router path (no trailing slash except home). */
export function routePathFor(permalink) {
  if (!permalink || permalink === '/') return '/';
  return permalink.replace(/\/$/, '');
}

/** Static file URL under public/mirror (honours Vite base for GitHub Pages). */
export function mirrorSrcForPath(permalink) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  if (!permalink || permalink === '/') return `${base}mirror/index.html`;
  const clean = permalink.endsWith('/') ? permalink : `${permalink}/`;
  return `${base}mirror${clean}index.html`;
}
