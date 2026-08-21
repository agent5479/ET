# ET rebuild — SEO strategy (test site)

This replica is a **test / future site**. It must be **informed by** upcoming SEO patterns but **must not compete** with live [www.et.nz](https://www.et.nz).

## Non-competition rules (locked)

1. **Do not ship a public `robots.txt`** that invites crawling of this test deploy (per project brief: avoid writing robots.txt for discovery).
2. Every React document includes **`<meta name="robots" content="noindex, nofollow">`** until you explicitly flip to production.
3. Canonicals, when present, will point at the **future production host you choose** — never claim to be `www.et.nz` while testing.
4. No Google Search Console / sitemap ping for this environment until launch.

## Direct strategic takeaways → what we build

### 1. Informationally Additive (not generic AI filler)

| Build | Why |
|-------|-----|
| First-party **case studies** with NZ outcomes, soil types, council context | Unique data AI engines can cite |
| **AES versatility infographic** (interactive or static-but-unique) | Proprietary explanation, not a rehash |
| **Designers/installers skills exam** (simulated Firebase → our own module) | First-party tool + brand demand |
| **Price / sizing calculator** (when you provide rules) | Additive tool > blog how-to |
| Blog only if posts are **expert / proprietary** (field notes, OSET results commentary) | Generic “what is septic” posts demoted |

### 2. Local entity / “Core 30” alignment

| Build | Why |
|-------|-----|
| Distinct routes per **service** (residential AES, commercial, community, large-scale, UV, greywater, Tuf-Tite, sand) | Entity matching, not one kitchen-sink page |
| Distinct **location / region** pages when you confirm service areas | GBP mirror structure |
| Copy that echoes real **review language** (emergency, retrofit, raised mound, etc.) | Prompt-matching |
| JSON-LD: `LocalBusiness` + `Service` + `GeoCoordinates` (SSG) | AI/entity ingest |

### 3. Brand demand (not only organic)

| Build | Why |
|-------|-----|
| Homepage hero = **Environment Technology / AES** brand-first | Branded search + recognition |
| Training + certification as owned destination | People search “AES training NZ” |
| Prepare YouTube / resources hubs as first-class IA | Diversified channels |

## Technical checklist (GitHub-hosted)

| Item | Plan |
|------|------|
| SSG / prerender | Vite build emits static HTML per route (no blank CSR shell for crawlers) |
| HTTPS + custom domain | At launch only; enforce HTTPS on Pages/custom domain |
| Canonical + sitemap | Prepared in code; **not published** while `noindex` |
| **robots.txt** | **Omitted** on purpose for this test site |
| JSON-LD | Injected in static HTML at build time |
| Mirror phase | `public/mirror` remains reference scrape; React app is the rebuild |

## IA sketch (React)

- `/` — ET brand homepage (AES story + CTAs)
- `/products/*` — dedicated product pages
- `/applications/*` — homeowners, commercial, community, large-scale
- `/trade/*` — designers, installers, training/exam
- `/resources` + `/blog` — additive content only
- `/tools/*` — calculators / exam simulation
- `/contact`, `/price-request`
