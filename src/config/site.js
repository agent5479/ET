/**
 * Site config for the React sales rebuild.
 * TEST SITE: noindex — do not compete with www.et.nz.
 */
const base = () => (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

/** Prefix public/mirror paths for local + GitHub Pages (/ET/). */
export function mirrorAsset(path) {
  const clean = path.replace(/^\//, '');
  return `${base()}mirror/${clean.replace(/^mirror\//, '')}`;
}

/** Prefix public/ root assets (brand/favicon) for local + GitHub Pages. */
export function publicAsset(path) {
  const clean = path.replace(/^\//, '');
  return `${base()}${clean}`;
}

export const SITE = {
  name: 'Environment Technology',
  shortName: 'ET',
  productLine: 'AES',
  tagline: 'AES — set-and-forget onsite wastewater treatment for New Zealand.',
  canonicalOrigin: '',
  noindex: true,
  /** Wordmark logo (Et. leaf/water mark) — matches origin brand palette. */
  brandIcon: 'brand/et-logo.png',
  /** Cropped AES mark used as brand/tile/favicon source of truth. */
  brandMark: 'brand/cropped-Environment_Technology_AES.jpg',
  tileImage: 'brand/cropped-Environment_Technology_AES-270x270.jpg',
  faviconIco: 'favicon.ico',
  favicon32: 'brand/cropped-Environment_Technology_AES-32x32.jpg',
  favicon192: 'brand/cropped-Environment_Technology_AES-192x192.jpg',
  appleTouchIcon: 'brand/cropped-Environment_Technology_AES-180x180.jpg',
  /** Product wordmark (AES) — small accent, not brand-hero. */
  aesLogo: 'wp-content/uploads/AES_logo.png',
  contactEmail: 'info@et.nz',
  phone: '03 970 7979',
  phoneTel: '039707979',
  freephone: '0800 927 834',
  freephoneTel: '0800927834',
  freephoneLabel: '0800 WASTEH2O',
  hours: 'Phones & Nelson depot 8am–5pm',
  /** Full-bleed homepage hero — clean NZ river from et.nz Smart Slider. */
  heroImage: 'wp-content/uploads/environment_technology_slider2.jpg',
  heroImageAlt: 'Clear New Zealand river through native bush — clean water Environment Technology protects',
  address: {
    line1: '105 Pascoe Street',
    locality: 'Nelson',
    postalCode: '7011',
    region: 'NZ',
    country: 'NZ',
  },
};

export const NAV = [
  { to: '/products', label: 'Products' },
  { to: '/aes', label: 'AES System' },
  { to: '/blog', label: 'Field Notes' },
  { to: '/contact', label: 'Contact' },
];

/** Dedicated product entities — copy distilled from scrape. */
export const PRODUCTS = [
  {
    slug: 'aes-system',
    title: 'AES Wastewater System',
    summary: 'Passive onsite wastewater treatment. No pumps in the bed — set-and-forget after install.',
    image: 'wp-content/uploads/aes_residential.jpg',
    highlights: [
      'Secondary treatment in pipe and system sand',
      'No bed pumps or field alarms; septic tank pump-out every few years',
      'New builds and retrofits',
    ],
    body: `AES (Advanced Enviro-Septic) is onsite wastewater treatment: effluent leaves the septic tank, moves through specialised pipe in a sand bed, and disperses after secondary treatment. There is no aerator or pump in the bed.

You maintain the septic tank on a normal multi-year pump-out cycle. Designers and installers work from ET manuals for sand, venting and bed shape.`,
    cta: { to: '/aes', label: 'How AES works' },
    diagram: 'process-flow',
  },
  {
    slug: 'aes-components',
    title: 'AES Components',
    summary: 'Pipe, fittings, vents and bed drawings for designers and installers.',
    image: 'wp-content/uploads/aes_components.jpg',
    highlights: [
      'Pipe, tees and venting',
      'Standard bed drawings',
      'Trade design and install aids',
    ],
    body: `Components for every AES bed: pipe, fittings, vents and detailing. ET supplies the parts and the drawings so design and install stay on the same spec.`,
    cta: { to: '/contact', label: 'Request trade pack' },
    diagram: 'pipe-layers',
  },
  {
    slug: 'tuf-tite',
    title: 'Tuf-Tite Septic Products',
    summary: 'Distribution boxes, risers and accessories for AES and conventional septic.',
    image: 'wp-content/uploads/products_tuf_tite.jpg',
    highlights: [
      'Boxes and risers for access',
      'Works with AES and standard septic',
      'Supplied by Environment Technology',
    ],
    body: `Tuf-Tite covers distribution and access around the tank and bed. Available from ET alongside AES so you are not chasing a separate importer.`,
    cta: { to: '/contact', label: 'Enquire about Tuf-Tite' },
  },
  {
    slug: 'salcor-uv',
    title: 'Salcor UV Disinfection',
    summary: 'UV after secondary treatment when the consent needs it.',
    image: 'wp-content/uploads/products_salcor_uv-1.jpg',
    highlights: [
      'Disinfection stage when required',
      'Install guidance available',
      'Pairs with AES effluent',
    ],
    body: `Add Salcor UV when the council or receiving environment needs tighter microbial control. ET supplies the units and supporting notes.`,
    cta: { to: '/contact', label: 'Discuss UV' },
  },
  {
    slug: 'greywater',
    title: 'Aqua2use Greywater',
    summary: 'Greywater diversion and filtration where local rules allow.',
    image: 'wp-content/uploads/products_aqua2use_greywater_recycling.jpg',
    highlights: [
      'Laundry and bathroom diversion where permitted',
      'Filtration for reuse pathways',
      'Complements AES for blackwater',
    ],
    body: `Aqua2use handles suitable greywater under local rules. AES still handles blackwater and remaining flows.`,
    cta: { to: '/contact', label: 'Ask about greywater' },
  },
  {
    slug: 'system-sand',
    title: 'System Sand',
    summary: 'Correct sand grading for AES beds — required, not optional.',
    image: 'wp-content/uploads/AES_system_sand.png',
    highlights: [
      'Grading drives treatment performance',
      'Supplier directories and bulletins',
      'For designers and installers',
    ],
    body: `Wrong sand grading undermines AES. Use ET’s sand requirements and supplier list from design through placement.`,
    cta: { to: '/contact', label: 'Sand specs' },
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}
