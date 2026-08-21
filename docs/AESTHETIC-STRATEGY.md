# Aesthetic strategy — minimise React conversion workload

## Decision (parity phase)

**Keep the scraped WordPress Storefront look.** Do not re-skin page-by-page in React yet.

| Approach | Workload | Parity |
|----------|----------|--------|
| Rewrite every page as JSX + restyle | Very high | Easy to drift |
| **React route → iframe of mirrored HTML + wired CSS/assets** | **Low** | **1:1** |

Restyle / “informationally additive” IA comes **after** parity is verified.

## What React does now

1. One route per mirrored permalink (`src/sitemap.js`)
2. `MirrorFrame` loads `/mirror/.../index.html` (original CSS/JS/images)
3. `scripts/wire-parity.mjs` rewrites asset URLs + injects parent-nav bridge
4. `npm run verify:parity` checks HTML + critical CSS/assets return 200

## What React does *not* do yet

- Custom homepage redesign components (kept under `src/pages/` for later)
- Re-implementing Storefront menus/sliders in JSX

## Later (when you greenlight restyle)

Swap `MirrorFrame` for real components **one route at a time**, reusing scraped copy/assets from `public/mirror`.
