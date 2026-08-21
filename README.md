# Environment Technology (ET) — React sales rebuild

Replica: [github.com/agent5479/ET](https://github.com/agent5479/ET) · Live: [agent5479.github.io/ET](https://agent5479.github.io/ET/)  
Scrape reference: [www.et.nz](https://www.et.nz)

## Important: test site (non-competing)

- **No `robots.txt`** (see `public/ROBOTS.txt.OMITTED.md`)
- React pages use `<meta name="robots" content="noindex, nofollow">`
- Flip `SITE.noindex` in `src/config/site.js` only at real launch

## Commands

```bash
npm install
npm run dev           # http://localhost:5173
npm run build:pages   # production build for GitHub Pages (/ET/ base)
npm run scrape        # refresh mirror assets/HTML if needed
```

## Docs

- [docs/AESTHETIC-STRATEGY.md](docs/AESTHETIC-STRATEGY.md) — sales IA vs mirror
- [docs/SEO-STRATEGY.md](docs/SEO-STRATEGY.md)
- [docs/NEEDS-YOUR-INPUT.md](docs/NEEDS-YOUR-INPUT.md) — exam / forms / GBP

## Architecture

| Path | Role |
|------|------|
| `src/pages/` | Home, products, blog, AES, contact |
| `src/components/Layout.jsx` | Sticky navbar + footer |
| `src/components/AesVersatilityInfographic.jsx` | AES versatility diagram |
| `public/mirror/` | Scraped images + archival WP HTML |
| `.github/workflows/deploy-pages.yml` | Deploy on push to `main` |

Homepage sales flow (Site Machinery–informed): problem → solution → products → versatility → audiences → field notes → contact.
