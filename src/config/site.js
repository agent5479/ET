/**
 * Site config for the React rebuild.
 * TEST SITE: noindex until production flip.
 * Do NOT add public/robots.txt while this is a non-competing test deploy.
 */
export const SITE = {
  name: 'Environment Technology',
  shortName: 'ET',
  productLine: 'AES',
  tagline: 'Advanced Enviro-Septic — onsite wastewater treatment for New Zealand.',
  // Future production host — leave blank while testing on GitHub Pages
  canonicalOrigin: '',
  // Prevent competition with live www.et.nz during test phase
  noindex: true,
  contactEmail: '', // fill when known
  phone: '',
  // Placeholder NAP — confirm against GBP
  address: {
    locality: '',
    region: 'NZ',
    country: 'NZ',
  },
};

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/applications', label: 'Applications' },
  { to: '/aes', label: 'The AES System' },
  { to: '/trade', label: 'Designers & Installers' },
  { to: '/blog', label: 'Field Notes' },
  { to: '/contact', label: 'Contact' },
];

/** Dedicated product entities (SEO: one page per service/product) */
export const PRODUCTS = [
  {
    slug: 'aes-system',
    title: 'AES Wastewater System',
    summary: 'Passive, reliable onsite treatment with design flexibility across soil types.',
  },
  {
    slug: 'aes-components',
    title: 'AES Components',
    summary: 'Pipe, sand specification, venting and bed layouts for designers and installers.',
  },
  {
    slug: 'tuf-tite',
    title: 'Tuf-Tite Septic Products',
    summary: 'Distribution boxes, risers and accessories for septic installations.',
  },
  {
    slug: 'salcor-uv',
    title: 'Salcor UV Disinfection',
    summary: 'UV disinfection units for higher effluent quality requirements.',
  },
  {
    slug: 'greywater',
    title: 'Aqua2use Greywater',
    summary: 'Greywater recycling options alongside AES systems.',
  },
  {
    slug: 'system-sand',
    title: 'System Sand',
    summary: 'Specified sand grading and supplier guidance for AES beds.',
  },
];
