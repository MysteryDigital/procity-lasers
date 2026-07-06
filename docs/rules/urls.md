# URL RULES — MANDATORY

Applies when: any routing, linking, redirect, sitemap, or canonical work.

## Clean paths — no query strings for navigation

All category filtering and navigation must use clean path segments, never query
strings. This is a decided constraint, not a preference.

| Correct | Wrong |
|---|---|
| `/work/heritage/` | `/work/?category=heritage` |
| `/blog/graffiti/` | `/blog/?cat=graffiti` |
| `/work/graffiti/council-viaduct/` | `/work/council-viaduct?cat=graffiti` |

## Trailing slashes

All URLs end with a trailing slash. Astro must be configured to output trailing
slashes. Canonical tags and internal links must include them.

## Canonical tags

- Self-referencing canonical on every indexable page.
- Always point to the `www.` domain: `https://www.procitylasers.com/...`
- Strip all query parameters (UTM, tracking, filters) from canonicals.
- Omit canonical on `noindex` pages.

## Netlify subdomain

`procitylasers.netlify.app` is a duplicate of production. Redirect it in
`public/_redirects`:

```
https://procitylasers.netlify.app/* https://www.procitylasers.com/:splat 301!
```

## Sitemap

- `@astrojs/sitemap` generates `sitemap-index.xml` automatically.
- Draft posts and `noindex` pages must be excluded from the sitemap.
- Reference the sitemap in both `robots.txt` and `<link rel="sitemap">` in `<head>`.

## robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://www.procitylasers.com/sitemap-index.xml
```

## URL structure (reference)

```
/
/services/[slug]/           graffiti | heritage | fire-damage | industrial | paint-removal | surface-preparation
/work/
/work/[category]/           same slugs as services
/work/[category]/[slug]/    individual project pages  (note: NOT /work/[slug]/)
/blog/
/blog/[category]/
/blog/[category]/[slug]/
/about/
/contact/
/admin/                     Decap CMS — Disallowed in robots.txt
```

Context tag: `#j5t6_urls` — confirm this tag after reading to satisfy the Context Check in CLAUDE.md.
