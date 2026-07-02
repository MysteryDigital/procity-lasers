# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mandatory rules — read before any task

Six short rule files apply to every task. Read all six and confirm their tags
before proceeding. If a tag is absent from your context, your only valid action
is to read the corresponding file.

| Rule | File | Required tag |
|---|---|---|
| Design language | `docs/rules/design.md` | `#r7x2_design` |
| Content model & CMS coupling | `docs/rules/content-model.md` | `#k4p9_content` |
| Accessibility (WCAG 2.1 AA) | `docs/rules/accessibility.md` | `#w8m3_a11y` |
| URL structure | `docs/rules/urls.md` | `#j5t6_urls` |
| Colour tokens | `docs/rules/colours.md` | `#c3n1_colours` |
| Cookie & consent gating | `docs/rules/cookies.md` | `#d9w2_cookies` |

**Context Check:** before starting any task, confirm all six tags are present.
If any is missing, read the file and confirm its tag before continuing.

## Specs — read when relevant

The specs are the source of truth for what to build. Read them when the task
touches their domain:

- `docs/specs/spec-overview.md` — company, audience, goals, scope.
- `docs/specs/spec-features.md` — full feature set and what is out of scope.
- `docs/specs/spec-design.md` — design language detail, brand direction, audience psychology.
- `docs/specs/spec-tech.md` — decided tech stack and hosting rationale.
- `docs/specs/spec-blog.md` — blog content model, SEO, conversion hooks, AI workflow.
- `docs/specs/spec-page-layouts.md` — site architecture, sitemap, page-by-page layouts.

Several specs contain **Open Questions** marked *to confirm* / *to decide*.
Surface these rather than silently picking an answer.

## Current state

**Specification / planning phase.** No application code, build tooling, or tests
exist yet. Do not invent build/lint/test commands. When implementation begins,
update this file with real commands.

## What is being built

A **photo-led static marketing website** for **Pro City Laser Removal**
(procitylasers.com) — a UK laser-cleaning specialist serving B2B / institutional
buyers (councils, insurers, heritage bodies, contractors).

Core design principle: **before/after project imagery is the primary sales
asset.** Trust signals (accreditations, method statements, real project evidence)
are first-class content.

## Tech stack (decided)

- **Framework:** Astro — static output, build-time image optimisation.
- **Hosting:** Netlify (free tier) — auto-deploys from Git, HTTPS/CDN.
- **Forms:** Netlify Forms — no backend. Honeypot + lightweight spam protection.
- **CMS:** Decap CMS at `/admin` — git-based, Netlify Identity login. Owner
  manages photos, videos, and captions without a developer.

Hard requirements: **near-zero hosting cost** and **non-technical self-service
administration**. Preserve both when making technical decisions.

## Out of scope

E-commerce/payment, visitor accounts, multi-language, booking/scheduling.
