# Spec: Blog

**Status:** Draft — requirements defined, implementation not started
**Last updated:** 2026-07-01
**Related:** [spec-overview.md](spec-overview.md), [spec-features.md](spec-features.md), [spec-tech.md](spec-tech.md)

## 1. Purpose

A content blog serving two objectives:

1. **SEO** — establish topical authority on laser cleaning search queries; attract
   councils, heritage bodies, contractors, and insurers who are researching rather
   than actively buying. Long-tail article traffic converts at a lower rate than
   direct service-page traffic, but compounds over time as the article archive grows.
2. **Credibility** — demonstrate depth of knowledge to professional evaluators
   reading the site. An article on laser cleaning listed stone, citing method
   and substrate considerations, signals expertise more credibly than marketing copy.

Articles will be **AI-drafted and human-reviewed**. The publishing process will
be partly or fully automated via Git — no manual CMS editing required for
routine publishing.

## 2. Content Model

Blog posts are **Astro content collections** — Markdown files in
`src/content/blog/`. This fits the existing project architecture (gallery
projects are already content collections) and requires no new infrastructure.

Decap CMS will be extended to manage blog posts, providing a manual editing
fallback and the ability to make editorial corrections without touching Git
directly.

### Frontmatter schema

```yaml
---
title: "..."            # H1 / <title>; 50–60 chars; primary keyword first
slug: "..."             # URL path segment; kebab-case; matches filename
description: "..."      # Meta description; 145–155 chars; not a ranking signal,
                        # but controls social previews
publishedAt: 2026-07-01 # Never changes after first publication
updatedAt: 2026-07-01   # Update only on substantive content revision
category: heritage      # One of: graffiti | heritage | fire-damage |
                        # industrial | paint-removal
tags: []                # Optional; noindexed tag pages — used for filtering only
author:
  name: "..."           # Named human reviewer who took editorial responsibility
  url: "/about/..."     # Profile page URL (required for schema author.url)
ogImage: "..."          # 1200×630px JPEG path; generated at publish time
featured: false         # Pin to featured section on index
draft: false            # Exclude from build when true
---
```

### File location and naming

```
src/content/blog/
  graffiti/
    council-graffiti-removal-contracts.md
    ...
  heritage/
    laser-cleaning-listed-buildings.md
    ...
  fire-damage/
    ...
  industrial/
    ...
  paint-removal/
    ...
```

Files are organised by category (matches the `category` frontmatter field) for
human navigability; the category slug in the URL is derived from frontmatter,
not from the folder path.

### URL structure

```
/blog/                              # Index
/blog/[category]/                   # Category pages (e.g. /blog/heritage/)
/blog/[category]/[slug]/            # Article pages
```

Category pages are indexed only once they contain 5+ articles and have a unique
editorial intro paragraph. They are `noindex` until that threshold is met.

## 3. Blog Index Page

### Layout

1. **Page header** — H1 targeting a primary keyword (e.g. "Laser Cleaning
   Resources & Case Studies"), followed by a short editorial paragraph (2–3
   sentences confirming the audience and content value).
2. **Featured posts** — 1–3 articles pinned via `featured: true` in frontmatter,
   displayed prominently above the main grid. Reduces their click depth to one
   from the index; concentrates authority on the highest-intent content. Aim for
   one featured post per service category when enough articles exist.
3. **Category filter tabs** — links to each category page (`/blog/heritage/`,
   etc.). No JS filtering; standard navigation.
4. **Article card grid** — 2 or 3 columns on desktop, 1 on mobile.
   Each card: featured image (16:9), category label, H2 title, reading time,
   brief excerpt (derived from first paragraph if not set explicitly).
5. **Pagination** — numbered (`/blog/page/2/`), not infinite scroll.
   Googlebot cannot trigger scroll events; numbered pagination creates stable
   crawlable URLs. Append `— Page N` to the `<title>` on paginated pages.
   Show `rel="next"` / `rel="prev"` in `<head>` for crawl sequencing.

### Meta tags (index)

```
<title>Laser Cleaning Resources & Case Studies | Pro City Lasers</title>
<meta name="description" content="Articles on commercial laser cleaning —
graffiti removal, heritage conservation, fire damage remediation. Written
for councils, contractors, and heritage professionals." />
```

### Schema markup (index)

`BreadcrumbList` + `ItemList` (listing article URLs) as JSON-LD in `<head>`.
Do not use the generic `Blog` schema type — no Google rich-result benefit.

## 4. Article Detail Page

### Layout (top to bottom)

1. **Breadcrumbs** — visible HTML + matching `BreadcrumbList` JSON-LD.
   `Home > Blog > [Category] > [Article Title]`
2. **H1** — one per page; primary keyword included naturally; 50–70 characters.
3. **Byline block** — author name (linked to profile page), update date (show
   update date only, not original publish date, for evergreen content — showing
   publish date on evergreen content is associated with ranking drops), reading
   time estimate, category label.
4. **Hero image** — `loading="eager" fetchpriority="high"` (never lazy-load the
   LCP image). 16:9, captioned.
5. **Table of contents** — for articles with 4+ H2 sections (typically 1,500+
   words). Collapsible on mobile. Anchor IDs must be keyword-descriptive kebab-
   case; they enable Google to surface jump-links in SERP results.
6. **Body** — H2s phrased as questions where the content permits (H2 questions
   with a 40–60 word direct answer beneath them are the primary route to
   Featured Snippets and AI Overviews). H3s for sub-points. All below-fold
   images: `loading="lazy"` and descriptive `alt` text.
7. **Mid-article CTA** — placed at approximately the 40% point (primary
   conversion driver — see §5).
8. **Body continued.**
9. **End-of-article CTA block** — serves the highest-intent readers who finish
   the article (see §5).
10. **Author bio** — name, title, photo, credentials, links to LinkedIn and
    other verifiable external profiles.
11. **Related articles** — 3–4 contextual links to articles in the same or
    adjacent categories. These are in-body links, not a card widget; in-body
    contextual links carry more SEO weight.

### Heading hierarchy

- One `<h1>` — the article title.
- `<h2>` — major sections; question-phrased where suitable.
- `<h3>` — sub-points within the H2 above.
- Never skip levels (WCAG 2.1 requirement — relevant for council audiences).

### Image alt text

Formula: `[primary subject] [descriptor] [context/location]`
Example: `sandstone facade after laser graffiti removal, Bradford town hall`
Maximum 125 characters. Never prefix with "photo of". Empty `alt=""` on
decorative images.

### Meta tags (article)

```
<title>[Primary Keyword — Supporting Context | Pro City Lasers]</title>
<!-- Keyword first; brand last; 50–60 chars -->

<meta name="description" content="..." />
<!-- 145–155 chars; Google rewrites ~70–80% of displayed snippets anyway;
     write as a pitch for social previews, not keyword stuffing -->

<link rel="canonical" href="https://www.procitylasers.com/blog/[cat]/[slug]/" />
<!-- Self-referencing; strip UTM and query params -->
```

### Open Graph (article)

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://..." />
<meta property="og:image" content="https://.../og.jpg" />
<!-- 1200×630px JPEG — not WebP (social platform crawlers don't reliably
     serve WebP). Generate a dedicated OG JPEG even if the site uses WebP. -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="..." />
<meta property="og:locale" content="en_GB" />
<meta property="article:published_time" content="..." />
<meta property="article:section" content="[Category]" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://.../twitter.jpg" />
<!-- 1200×675px JPEG; `twitter:` prefix unchanged despite X rebrand -->
```

### Schema markup (article)

`BlogPosting` JSON-LD in `<head>`. Critical fields:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "image": [
    "https://procitylasers.com/images/article-16x9.jpg",
    "https://procitylasers.com/images/article-4x3.jpg",
    "https://procitylasers.com/images/article-1x1.jpg"
  ],
  "datePublished": "2026-07-01T09:00:00+01:00",
  "dateModified": "2026-07-01T09:00:00+01:00",
  "author": {
    "@type": "Person",
    "name": "...",
    "url": "https://procitylasers.com/about/..."
  }
}
```

`author.url` is the most-cited missing field in E-E-A-T guidance — always
include it and ensure it points to a real, externally verifiable profile.

Provide images in three aspect ratios (16:9, 4:3, 1:1), minimum 1200px wide.
`dateModified` must only update on substantive content revision; updating it
without changing content is flagged as noise by Google.

`BreadcrumbList` on every article, exactly matching the visible breadcrumb.

## 5. Conversion Hooks

The goal is to convert article readers into enquiries. For a B2B institutional
audience (councils, heritage bodies, insurers, contractors), conversion rate
baselines for construction/specialist services blogs are 1.5–2.1%. This means
volume and an email-capture nurture path are necessary for commercial returns;
individual articles will not convert at consumer rates.

**Single offer, two placements.** Reducing to one CTA per page is associated
with conversion rate increases of 200–300%. All positions should drive to the
same offer (or closely related offers). Never present competing CTAs.

### Position 1 — Inline mid-article CTA (primary)

Placed at approximately the 40% point in the article, where the highest reader
drop-off occurs. Styled as an editorial callout box, not a banner ad.

Copy is matched to the article's service category:

| Article category | CTA copy | Destination |
|---|---|---|
| Heritage | "See our listed-building and conservation work" | `/services/heritage/` or relevant case studies |
| Graffiti | "View commercial graffiti removal case studies" | `/services/graffiti/` |
| Fire damage | "We work directly with loss adjusters — get in touch" | `/contact/` |
| Industrial | "Request a method statement for your project" | `/contact/` |
| Paint removal | "See our paint stripping portfolio" | `/services/paint-removal/` |

Generic "Contact Us" across all categories underperforms category-specific copy.

### Position 2 — End-of-article CTA block

Serves high-intent readers who finish the article. A full-width block with a
direct enquiry prompt and an optional secondary lead magnet offer (see below).

Example copy: "Working on a listed building? Request a method statement or
get in touch with our team."

### Position 3 — Sticky sidebar (desktop only, supportive)

Single element, same offer as the above, no competing links. Acts as a
persistent reminder, not a primary driver. Not shown on mobile. Do not add
recent-post links, social buttons, or other elements alongside the CTA — it
creates decision paralysis and dilutes all of them.

### Lead magnets

For institutional buyers, downloadable PDFs fit how procurement actually
works — buyers attach them to internal emails and tender packs.

Priority lead magnets to produce:
1. **Case study PDFs per service category** — a before/after photo, scope,
   method overview, and outcome. These serve as reference documents for
   councils and heritage bodies writing specifications.
2. **Method statement / specification document** — a template or sample
   method statement for laser cleaning. Directly useful for buyers specifying
   the work.
3. **"What to Specify" checklist** (e.g. for conservation architects specifying
   laser cleaning on listed structures).

### Exit-intent popup

Appropriate on articles over 800 words only. The offer must match the article's
topic (a heritage conservation article → heritage case study PDF, not a
generic newsletter signup). Do not trigger on homepage or contact page.

Avoid: urgency tactics, countdown timers, spin-to-win mechanics. These damage
credibility with procurement-minded institutional buyers.

### Enquiry form fields

Name, company, email, brief project description. Nothing more. Cutting fields
increases completion rates significantly; progressive profiling (collecting more
in follow-up) outperforms long upfront forms for both completion and lead quality.

## 6. AI Content Workflow

### Policy

Articles are AI-drafted and published under the byline of a named human
reviewer who has substantively reviewed and fact-checked the content. This is
the defensible and legally appropriate approach: the key test is whether a real
person has genuinely reviewed and taken editorial responsibility, not whether AI
was involved in drafting.

Do not attribute a byline to someone who has not reviewed the content. Do not
give the AI itself a byline.

Disclosure: "Written with AI assistance. Reviewed and edited by [Name], [Title]."
This is recommended as a trust-building measure, not a ranking requirement, and
is not legally required for standard UK marketing content as of mid-2026.

### What Google evaluates

Google does not penalise AI-generated content per se. The enforcement mechanism
is the Scaled Content Abuse spam policy, which targets content produced
primarily to manipulate rankings without adding value (mass templated pages,
scraped/synonymised content, keyword-stuffed filler). Well-researched,
genuinely useful articles do not trigger this regardless of how they were
drafted.

Ranking differentiators for AI-assisted content:

- **Original project data** — before/after photos, real client outcomes, case
  study specifics. AI cannot produce these. They are the primary ranking edge.
- **Expert accuracy** — every factual claim must be checked. Hallucinated
  technical details (substrate types, laser parameters, regulatory references)
  are the principal risk.
- **Tight topic focus** — one narrow topic per article, covered thoroughly.
  AI tends toward breadth; human editing should cut and sharpen.
- **Genuine depth** — generic surveys rank poorly on competitive queries. A
  focused article on laser cleaning of carboniferous limestone, citing method
  considerations, outperforms a broad "what is laser cleaning?" piece.

### Automated publishing workflow

1. AI drafts the article as a Markdown file with complete frontmatter.
2. Human reviewer checks: factual accuracy, author byline, OG image path,
   `updatedAt` date. Corrects as needed.
3. Reviewer commits to `main` (or a `drafts/` branch if a preview step is
   wanted) via the GitHub API or CLI.
4. Netlify auto-builds and deploys; the article is live within ~2 minutes.

No CMS login is required for routine publishing. Decap CMS remains available
for editorial corrections and ad-hoc changes without touching Git.

### Automation tools

Any tool or script that can write a file and commit it via the GitHub API is
sufficient. There is no special infrastructure to build. Future tooling options
include direct API commit scripts, GitHub Actions triggered by a data source,
or a lightweight local CLI wrapper. The content model is a plain Markdown file
— no vendor lock-in.

## 7. Technical SEO Requirements

These apply across the blog and integrate with the site's global technical SEO
setup.

### Canonical URLs

Self-referencing canonical on every indexable page. Strip query parameters
(UTM, filters). Point to the `www.` domain. Omit canonical on `noindex` pages.

### Netlify subdomain duplicate content

`procitylasers.netlify.app` is a duplicate of the production domain. Redirect
it in `public/_redirects`:
```
https://procitylasers.netlify.app/* https://www.procitylasers.com/:splat 301!
```

### Sitemap

`@astrojs/sitemap` generates `sitemap-index.xml` automatically. Blog article
and category pages are included. Draft articles (`draft: true`) and thin
category pages (`noindex`) must be excluded. The sitemap must be referenced in
both `robots.txt` and a `<link rel="sitemap">` in `<head>`.

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://www.procitylasers.com/sitemap-index.xml
```

### Performance

- Hero/LCP image on article pages: `loading="eager" fetchpriority="high"` and
  `<link rel="preload" as="image">` in `<head>`. This is the single highest-
  impact LCP improvement for image-heavy pages.
- All below-fold images: `loading="lazy"`.
- Use Astro's `<Image>` component throughout (enforces dimensions, prevents CLS).

### Noindex rules

| Page type | Treatment |
|---|---|
| Blog index `/blog/` | Index |
| Category with 5+ articles + editorial intro | Index |
| Category with fewer than 5 articles | Noindex |
| Tag pages | Noindex |
| Author archive pages | Noindex |
| `draft: true` articles | Excluded from build entirely |
| Paginated page 2+ | Index; append `— Page N` to title |

## 8. Author Profiles

Each byline `author.url` must resolve to a real author profile page with:
- Full name and job title
- Professional headshot
- Relevant credentials and professional background
- Links to LinkedIn and other verifiable external profiles

This is required for the `BlogPosting` schema `author.url` field, which is the
primary E-E-A-T signal Google uses to verify claimed expertise. Without a
verifiable external profile, the E-E-A-T claim is unverifiable and weaker.

## 9. Open Questions

1. **Author byline** — who is the named human reviewer? The site owner, or a
   hired specialist? Credentials drive the strength of the E-E-A-T claim.
2. **Publishing cadence** — how many articles per week/month? Affects whether
   the Netlify free tier build minutes are a concern (they are unlikely to be at
   low cadence).
3. **Category threshold** — which categories already have enough project work
   to produce 5+ articles at launch?
4. **Lead magnet production** — case study PDFs require real project data
   (photos, scope, outcome). Who supplies this and in what format?
5. **OG image generation** — will OG images be generated programmatically
   (e.g. Satori/canvas) from the article title and category, or manually
   produced per article?
6. **Branch strategy** — commit AI-published articles directly to `main` (live
   immediately after build) or to a `drafts/` branch (requires manual PR merge
   to go live)? The latter adds a review gate; the former is fully automated.
7. **`FAQPage` schema** — pages implementing `FAQPage` schema are reportedly
   more likely to appear in Google AI Overviews. Worth adding to articles with
   a Q&A section; decide whether to include this in the article template.
