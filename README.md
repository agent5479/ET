# Environment Technology (ET) — React rebuild + scrape mirror

Replica target: [github.com/agent5479/ET](https://github.com/agent5479/ET)  
Source reference: [www.et.nz](https://www.et.nz)

## Important: test site (non-competing)

- **No `robots.txt`** is published (see `public/ROBOTS.txt.OMITTED.md`).
- React pages ship `<meta name="robots" content="noindex, nofollow">`.
- Live site remains the indexed property until you flip `SITE.noindex` in `src/config/site.js`.

## Commands

```bash
npm install
npm run scrape          # discover + mirror pages/assets (8–12s timeouts)
npm run scrape:discover # URL inventory → scrape/discovered-urls.json
npm run dev             # http://localhost:5173  React rebuild
```

- HTML 1:1 mirror: http://localhost:5173/mirror/index.html  
- Status: http://localhost:5173/__status  

## Docs

- [docs/SEO-STRATEGY.md](docs/SEO-STRATEGY.md) — additive SEO / local entity / SSG checklist  
- [docs/NEEDS-YOUR-INPUT.md](docs/NEEDS-YOUR-INPUT.md) — Firebase exam, forms, GBP, dead links  
- [scrape/NOTES.md](scrape/NOTES.md) — scrape failures & gaps  

## Architecture (parity-first)

| Path | Role |
|------|------|
| `src/App.jsx` + `MirrorFrame` | React routes = 1:1 mirrored pages (minimal code) |
| `public/mirror/` | Scraped WP HTML + CSS + assets (aesthetics source of truth) |
| `scripts/wire-parity.mjs` | Rewrites asset URLs + iframe→parent nav bridge |
| `npm run verify:parity` | HTTP checks for pages + critical CSS |
| `docs/AESTHETIC-STRATEGY.md` | Why we defer restyle |

Restyle / new IA comes after parity. No `robots.txt` (test site).

