# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

This repository is in the **specification / planning phase**. There is **no application code, build tooling, or tests yet** — only design and technical specs under `docs/specs/`. Do not invent build/lint/test commands; none exist until the project is scaffolded. When implementation begins, this file should be updated with real commands.

The specs are the source of truth for what to build. Read them before making decisions:

- `docs/specs/spec-overview.md` — the company, audience, goals, and scope.
- `docs/specs/spec-features.md` — feature set (gallery, media management, contact, sister-company link) and what is explicitly out of scope.
- `docs/specs/spec-design.md` — design language, brand direction, and audience psychology.
- `docs/specs/spec-tech.md` — decided tech stack and hosting.

Several specs contain **Open Questions** and items marked *to confirm* / *to decide*. These are genuinely undecided — surface them rather than silently picking an answer.

## What is being built

A small, **photo-led static marketing website** for **Pro City Laser Removal** (procitylasers.com), a UK laser-cleaning specialist (graffiti removal, heritage conservation, fire-damage remediation, industrial cleaning, paint stripping).

The audience is **B2B / institutional** (councils, insurers, heritage bodies, contractors) — professional evaluators who buy on credibility, compliance, and evidence, not price. Two design consequences drive most decisions:

1. **Before/after project imagery is the primary sales asset** and a core UI pattern (comparison slider), not just a gallery.
2. **Trust signals** (accreditations, method statements, real project evidence) are first-class content, not fine print.

## Decided tech stack (from spec-tech.md)

- **Framework: Astro** — static, minimal-JS output; build-time image optimisation is critical for the ~100-photo, image-heavy site.
- **Hosting: Netlify** (free tier) — auto-deploys from Git; provides HTTPS/CDN.
- **Enquiry form: Netlify Forms** — no backend to build. Include spam protection (honeypot + lightweight challenge).
- **Media CMS: Decap CMS** (git-based) at `/admin`, using Netlify Identity / Git Gateway. The non-technical owner edits photos/captions/categories via a web UI; changes commit to the repo and auto-deploy.

The two hard requirements behind these choices: **near-zero hosting cost** and **non-technical self-service administration** (the owner manages photos/videos and reads enquiries without a developer). Preserve both when making technical decisions.

## Content model (important architectural pattern)

Gallery projects are **Astro content collections** (Markdown/data files in the repo) that Decap CMS edits directly. This is the key coupling: the CMS config, the content-collection schema, and the gallery-rendering logic must stay aligned.

**Before/after pairing is resolved by CMS project relationship first, filename convention as fallback:**

- A **project** holds a title, service category, optional caption, and either a single (standalone) image or a `before` + `after` image pair.
- Fallback filename convention (for bulk/non-CMS imports only): matching stems with `-before` / `-after` markers form a pair (`town-hall-facade-before.jpg` + `-after.jpg`); a leading `NN-` prefix controls order; a file with no marker is standalone.
- Render a before/after slider when both images exist; a single image otherwise.

## Design constraints to respect

- **Do not build the visual language around the logo.** The supplied isometric mark is a drop-in asset only. There are no inherited brand colours/fonts; the business card is explicitly *not* a styling reference.
- Aesthetic: **technical / architectural precision** — restrained neutral palette (charcoal/slate/off-white) so photography carries the colour, one controlled accent, geometric sans typography, hairline rules, thin-line icons, spacious grid.
- **Accessibility (WCAG) and performance are requirements**, not nice-to-haves — councils often mandate accessibility, and the site must be fast and fully mobile-competent.
- Cross-link to sister company **Pro City Painters** (https://www.procitypainters.co.uk), opens in a new tab.

## Out of scope (unless explicitly raised)

E-commerce/payment, visitor accounts, blog/news, multi-language, booking/scheduling.
