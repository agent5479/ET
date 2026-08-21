# Scrape notes — et.nz

## Discovery (allow-all recheck)

| Source | Result |
|--------|--------|
| Yoast `sitemap_index.xml` | Only `page-sitemap.xml` (38 locs) |
| `post-sitemap.xml` | Exists but **0 posts** |
| WP REST `pages` | **43** published pages |
| HTML link crawl | Nested `/products/*` → redirect to flat slugs |
| `/secure/` | **302/redirect → https://aes.et.nz/** (training portal) |

Inventories: `scrape/discovered-urls.json`, `scrape/missing-pages.json`, `scrape/rescrape-results.json`

## Mirrored (HTML under `public/mirror/`)

All Yoast pages + `/shop/`, `/media/`, `/tuf-tite/`, `/system-sand-suppliers/`, `/case-studies-technical/`, `/members-home-page/`, plus assets (~550+).

## Live 404s (noted for future; cannot scrape)

- `/brochure-3/`, `/faq/`, `/residential/`, `/seasonal-worker-accommodation/`
- Broken Presby images; some WPForms pro SVGs; odd PDF filenames

## External / simulate

- **aes.et.nz** — skills exam / secure members (see `docs/NEEDS-YOUR-INPUT.md`)
- Form backends (WPForms) — UI only until destination confirmed

## Timeouts

Scrapers use **8–12s** abort; failures logged without blocking the run.

## Non-competition

- **No `robots.txt`** published for this test rebuild
- React app uses **noindex, nofollow**
