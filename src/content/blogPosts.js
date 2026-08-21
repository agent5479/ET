/** Improvised Field Notes — first-party style, not generic septic how-tos. */
export const BLOG_POSTS = [
  {
    slug: 'oset-numbers-that-matter',
    title: 'OSET numbers that matter on a consent conversation',
    date: '2026-03-12',
    excerpt:
      'When a council planner asks “how clean?”, point to the OSET-NTP framing — not a brochure claim. Here’s how we talk about AES results in the room.',
    tags: ['AES', 'OSET', 'Designers'],
    body: `Most homeowners hear “secondary treatment” and stop listening. Designers and consent officers hear a different question: what was measured, where, and against which standard?

AES has been through OSET-NTP at Rotorua. In plain language we use with councils: the system reduced contaminants to around one tenth of the New Zealand secondary treatment standard in that trial framing. That is not a substitute for site-specific design — soil, loading and layout still rule — but it is a concrete anchor when someone asks whether a passive bed can meet modern expectations.

Field habit: keep the achievement summary PDF and the site’s soil category in the same email thread. The conversation moves faster when numbers and geology travel together.`,
  },
  {
    slug: 'raised-mounds-and-tight-sections',
    title: 'Raised mounds and tight sections — when AES stops fighting the contour',
    date: '2026-02-18',
    excerpt:
      'Constrained sites are where passive systems earn their keep. Curved beds, raised mounds and under-driveway layouts are design tools, not marketing fluff.',
    tags: ['Homeowners', 'Design'],
    body: `On a steep Nelson section or a small lifestyle block, the wastewater area is often the last uncompromised rectangle — until it isn’t. AES’s flexibility shows up when the bed has to follow a contour, sit in a raised mound, or share space with hard surfaces.

That does not mean “put it anywhere.” It means the design vocabulary includes options that pumped plants often solve with more machinery and more alarms. Homeowners care about lawn and noise; designers care about setbacks and reserve areas. AES sits in the overlap when the sand bed can be shaped to the site instead of demanding a flat, isolated field.

If you are early in design, walk the contour with the drainlayer before you freeze the house pad. The bed geometry is cheaper to negotiate on paper than after the digger arrives.`,
  },
  {
    slug: 'retrofit-without-the-alarm-cycle',
    title: 'Retrofit without the alarm cycle',
    date: '2026-01-22',
    excerpt:
      'Upgrading a failing secondary plant is half engineering, half household psychology. Removing pumps from the story changes what “maintenance” means.',
    tags: ['Retrofit', 'Homeowners'],
    body: `Retrofits start with a smell, an alarm, or a consent renewal. Families remember the 2 a.m. pump call more than any brochure diagram. AES is attractive in that moment because the secondary story is passive — treatment in the pipe-and-sand bed, tank pump-outs on a multi-year rhythm rather than continuous mechanical babysitting.

The engineering still matters: tank condition, distribution, sand supply, and whether the reserve area exists. The sales conversation should stay honest about dig-up extent and sand logistics. What changes for the household is the mental model — fewer moving parts in the field means fewer ways for a holiday weekend to end with an overflow light.

Trade tip: bring the homeowner’s maintenance manual to the first site visit. People relax when they can see the annual checklist is short.`,
  },
  {
    slug: 'commercial-and-community-loading',
    title: 'Commercial and community loading — same language, different duty',
    date: '2025-11-05',
    excerpt:
      'Cafés, campgrounds and worker accommodation are not “big houses.” Peak loads and seasonal swings are where AES scale-up has to be designed, not assumed.',
    tags: ['Commercial', 'Large-scale'],
    body: `AES shows up on motels, DOC campgrounds, cafés and seasonal worker accommodation because the core treatment language scales — more pipe, more sand, careful distribution — without inventing a new mechanical plant for every consent.

The failure mode on commercial jobs is optimism about peak occupancy. Designers who size for average beds get surprised by Friday night or the January camping rush. Large-scale AES projects work when loading profiles, tank capacity and bed area are treated as a system, and when installers who have done the online training are on the dig.

If you are scoping a commercial site, ask for the busiest consecutive three days, not the annual average. That single question saves redraws.`,
  },
];

export function getPost(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
