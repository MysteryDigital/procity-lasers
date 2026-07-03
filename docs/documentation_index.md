# Documentation Index

All files under `docs/`. Read the file in the **When to read** column when the task touches that domain.

---

## Mandatory rules

These six files are required reading before any implementation task. CLAUDE.md enforces this — each file contains a context tag that must be confirmed before proceeding.

| File | Summary | When to read |
|---|---|---|
| `rules/design.md` | Palette (neutrals + one accent), typography (DM Sans), spacing, icons, and photography rules. Violations are bugs. | Any UI, layout, component, CSS, or styling work. |
| `rules/colours.md` | Every colour must come from design tokens — no hardcoded hex, rgb, hsl, or named CSS values anywhere. Lists the six canonical token names and what each covers. | Any CSS, Tailwind class, component, inline style, or design-token work. |
| `rules/accessibility.md` | WCAG 2.1 AA requirements: heading hierarchy, image alt text formula, loading attributes, contrast ratios, keyboard navigation, form labels, link text, and mobile tap targets. | Any HTML, component, layout, image, or form work. |
| `rules/urls.md` | Clean path segments (no query strings for navigation), trailing slashes everywhere, canonical tag rules, sitemap and robots.txt requirements, and the full URL structure reference. | Any routing, linking, redirect, sitemap, or canonical work. |
| `rules/content-model.md` | The project content schema (title, category, caption, image, before, after, videoUrl, thumbnail), before/after pairing logic, render rules per field combination, and blog post file locations. CMS config, schema, and rendering logic are tightly coupled — change one, change all three. | Any work touching content collections, CMS config, schema, or gallery/project rendering. |
| `rules/cookies.md` | No optional script or cookie may load before user consent. Required gate pattern using `localStorage`, list of what counts as optional, strictly necessary exemptions, and privacy policy update obligations. Violations are a UK GDPR / PECR legal risk. | Any work adding, modifying, or removing scripts, third-party integrations, analytics, tracking, or anything that sets cookies or uses browser storage. |

---

## Specs

Source of truth for what to build. Read when the task touches their domain.

| File | Summary | When to read |
|---|---|---|
| `specs/spec-overview.md` | Company background, services, target market (councils, insurers, heritage bodies, contractors), site goals, brand direction, and scope. Contains open questions about accreditations, brand assets, and existing case study material. | Orienting on the project for the first time, or when you need to understand who the audience is and why something is being built. |
| `specs/spec-features.md` | Full feature set: blog, work showcase (photo + video gallery), before/after pairing logic (CMS primary, filename fallback), media management via Decap CMS, contact details + enquiry form, and Pro City Painters cross-link. Explicitly lists what is out of scope. | Planning or implementing any feature; checking whether something is in or out of scope. |
| `specs/spec-design.md` | Detailed design language: audience psychology, design goals, brand direction ("technical/architectural precision"), colour tokens with confirmed hex values and WCAG contrast ratios, typography (DM Sans), layout, motion, and component system. Includes the agreed colour token table. | Any design or styling decision; choosing colours, typography, or spacing; confirming token values. |
| `specs/spec-tech.md` | Technical stack rationale: Netlify (hosting, forms, identity), Decap CMS (git-based), Astro (framework, image optimisation). Includes the everyday CMS workflow, alternatives considered, form processing, and build/deploy pipeline. | Understanding why the stack was chosen, adding integrations, troubleshooting the CMS or build pipeline. |
| `specs/spec-blog.md` | Complete blog specification: frontmatter schema, file/URL structure, index and article page layouts, SEO requirements (meta tags, Open Graph, schema markup, noindex rules), conversion hooks (CTA placements, lead magnets), AI content workflow and policy, and author profile requirements. | Any blog implementation work; writing or publishing articles; adding CTAs; SEO markup on blog pages. |
| `specs/spec-page-layouts.md` | Site architecture rationale (multi-page over single-page), full sitemap, global header/footer spec, and page-by-page layout breakdowns for: Homepage, Service pages (all five), Project Gallery (index + individual project), Blog (delegates to spec-blog.md), About/Credentials, and Contact (placeholder). | Implementing or modifying any page layout; understanding what content goes where and in what order. |

---

## Operational guides

How-to documentation for non-technical site administration and developer reference.

| File | Summary | When to read |
|---|---|---|
| `adding-photos.md` | Non-technical guide for the site owner: how to name photo files (before/after naming convention), how to add a new project in the Decap CMS admin panel, the three project photo options (before/after pair, standalone image, video), and photography tips for good results. | Writing owner-facing documentation; understanding the intended CMS workflow from the owner's perspective; testing the admin panel flow. |
| `image-uploads.md` | Developer reference for the image pipeline: upload flow (CMS → Git → Netlify rebuild → Astro build-time processing), why images must land in `src/` not `public/`, what Astro's `<Image>` component does (WebP/AVIF, responsive sizes, CLS prevention, content-hashed filenames), how the content schema connects to the pipeline via `image()`, the `public_folder` path issue to verify on first upload, and loading attribute rules (LCP eager, below-fold lazy). | Adding or modifying image fields in the schema; debugging image optimisation or build errors; setting loading attributes on images. |
