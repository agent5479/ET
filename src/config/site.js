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
  tagline: 'Advanced Enviro-Septic — onsite wastewater treatment for New Zealand.',
  canonicalOrigin: '',
  noindex: true,
  /** Brand mark from www.et.nz site icon (WordPress cropped AES mark). */
  brandIcon: 'brand/cropped-Environment_Technology_AES.jpg',
  favicon32: 'favicon-32x32.jpg',
  appleTouchIcon: 'apple-touch-icon.jpg',
  contactEmail: 'info@et.nz',
  phone: '03 970 7979',
  phoneTel: '039707979',
  freephone: '0800 927 834',
  freephoneTel: '0800927834',
  freephoneLabel: '0800 WASTEH2O',
  hours: 'Phones & Nelson depot 8am–5pm',
  /** Full-bleed homepage hero — origin et.nz Smart Slider primary slide. */
  heroImage: 'wp-content/uploads/environment_technology_slider1.jpg',
  heroImageAlt: 'Environment Technology AES wastewater system — original homepage hero',
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
    summary:
      'Passive secondary treatment with no pumps in the bed — quiet, reliable, and flexible across NZ soil types and site constraints.',
    image: 'wp-content/uploads/aes_residential.jpg',
    highlights: [
      'OSET-NTP tested — contaminants reduced to about one tenth of the NZ secondary standard',
      'No alarms or bed pumps; septic tank pump-out on a normal multi-year cycle',
      'Works for new-builds and retrofit upgrades',
    ],
    body: `AES (Advanced Enviro-Septic) is Environment Technology’s flagship onsite wastewater system. Wastewater moves through specialised pipe in a sand bed where bacterial treatment and soil infiltration do the work — without mechanical aerators in the field.

Designers specify bed layouts for residential, commercial, community and large-scale projects. Installers follow ET manuals for venting, sand grading and bed geometry. Homeowners get a system that stays quiet and avoids the filter-cleaning and alarm cycles common on pumped secondary plants.`,
    cta: { to: '/aes', label: 'How AES works' },
  },
  {
    slug: 'aes-components',
    title: 'AES Components',
    summary: 'Pipe, fittings, venting details and bed layout sheets for designers and certified installers.',
    image: 'wp-content/uploads/aes_components.jpg',
    highlights: [
      'Standard multi-row bed drawings and venting options',
      'System sand specification and supplier guidance',
      'Design and installation aids for trade partners',
    ],
    body: `AES components are the building blocks of every bed: AES pipe, tees, vents, and the detailing that keeps oxygen and effluent moving correctly. ET publishes design aids, installation manuals and standard bed drawings so designers and installers work from the same specification.`,
    cta: { to: '/contact', label: 'Request trade pack' },
  },
  {
    slug: 'tuf-tite',
    title: 'Tuf-Tite Septic Products',
    summary: 'Distribution boxes, risers and accessories that pair cleanly with AES and conventional septic installations.',
    image: 'wp-content/uploads/products_tuf_tite.jpg',
    highlights: [
      'Distribution boxes and risers for durable access',
      'Suited to NZ septic and AES installations',
      'Available through Environment Technology',
    ],
    body: `Tuf-Tite products support reliable distribution and access around the septic tank and bed. ET supplies the range alongside AES so installers can specify boxes, risers and related fittings without juggling multiple importers.`,
    cta: { to: '/contact', label: 'Enquire about Tuf-Tite' },
  },
  {
    slug: 'salcor-uv',
    title: 'Salcor UV Disinfection',
    summary: 'UV disinfection units where councils or site conditions require higher effluent quality.',
    image: 'wp-content/uploads/products_salcor_uv-1.jpg',
    highlights: [
      'Disinfection stage after secondary treatment',
      'Documented research and installation guidance',
      'Specified when discharge standards demand it',
    ],
    body: `Salcor UV units add a disinfection step when a consent or receiving environment needs tighter microbial control. ET supplies Salcor with supporting literature so designers can document the UV stage alongside AES or other secondary treatment.`,
    cta: { to: '/contact', label: 'Discuss UV requirements' },
  },
  {
    slug: 'greywater',
    title: 'Aqua2use Greywater',
    summary: 'Greywater diversion and filtration options that complement whole-of-site water management.',
    image: 'wp-content/uploads/products_aqua2use_greywater_recycling.jpg',
    highlights: [
      'Divert laundry and bathroom greywater where permitted',
      'Filtration hardware for reuse pathways',
      'Pairs with AES for property-wide water strategy',
    ],
    body: `Aqua2use greywater systems help households and sites reuse suitable greywater streams under local rules. ET offers the range as a complement to AES — reducing potable demand while the AES bed handles blackwater and remaining flows.`,
    cta: { to: '/contact', label: 'Ask about greywater' },
  },
  {
    slug: 'system-sand',
    title: 'System Sand',
    summary: 'Specified sand grading and supplier notes so AES beds perform as designed.',
    image: 'wp-content/uploads/AES_system_sand.png',
    highlights: [
      'Sand grading critical to AES treatment performance',
      'Technical bulletins and supplier directories',
      'Required reading for designers and installers',
    ],
    body: `AES beds rely on the right system sand — wrong grading undermines treatment and longevity. ET publishes sand requirements, technical bulletins and supplier lists so projects stay on-spec from design through placement.`,
    cta: { to: '/products/system-sand', label: 'Sand specifications' },
  },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}
