# robots.txt policy (test deploy)

This site **must not compete** with [www.et.nz](https://www.et.nz).

- Published `robots.txt` is **Disallow: /** for all user-agents (see `public/robots.txt`).
- Every HTML page (React + `/mirror`) gets `<meta name="robots" content="noindex, nofollow">` via `index.html`, `SITE.noindex`, and `scripts/prepare-gh-pages.mjs`.
- Flip `SITE.noindex` and replace `robots.txt` only at a deliberate production launch.
