# Aesthetic strategy — sales React IA

## Current phase

**Public site = React sales rebuild** (Site Machinery–informed flow). Scraped WordPress HTML under `public/mirror/` is **reference only** (assets + legacy copy), not the customer UI.

| Surface | Implementation |
|---------|----------------|
| `/`, `/products`, `/blog`, `/aes`, `/contact` | React components |
| `/mirror/*` | Static scrape for images & archival pages |
| Indexing | `noindex` + no `robots.txt` (test deploy) |

## Design notes

- Brand-first hero (Environment Technology dominant)
- Sticky navbar with phone CTA
- Problem → solution → products → AES versatility → audiences → field notes → contact
- Earth/water palette (forest, sea, terracotta accent) — not purple/cream AI defaults
