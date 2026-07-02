# Spec: Features

**Status:** Draft — requirements in definition
**Last updated:** 2026-07-01
**Related:** [spec-overview.md](spec-overview.md), [spec-design.md](spec-design.md)

## 1. Summary

The site is primarily a **photographic and video showcase** of Pro City's work,
supported by a small set of practical features: easy self-service media
management, a cross-link to the sister company (Pro City Painters), and clear
contact details. The feature set is deliberately lean.

## 2. Core Features

### 2.0 Blog
An SEO and credibility blog is now in scope — see **[spec-blog.md](spec-blog.md)**
for the full specification. Summary: AI-drafted, human-reviewed articles stored
as Astro content collections (Markdown in the repo), published via Git, managed
via Decap CMS as an editorial fallback.

### 2.1 Work showcase (photo + video gallery)
The heart of the site — a visual portfolio of completed jobs.

- Displays **photos and videos** of Pro City's work.
- **Volume: ~100 photos or fewer** (client estimate). Video count assumed small.
- Should present the work attractively and credibly (ties to the before/after
  emphasis in the design spec).
- Assumed organisation: grouped/filterable by **service area** (graffiti, heritage,
  fire damage, industrial, paint removal) — *to confirm*.

### Before/after pairs (supported, not required)
Photos may be **standalone** or **matched before/after pairs**; both are
first-class. Pairs render as a before/after comparison (e.g. slider); standalone
images render as single items in the gallery.

**Primary method — CMS UI.** The owner creates a project in the CMS (see
`spec-tech.md`) and uploads either a single image (standalone) or a **before**
image and an **after** image into the same project, labelled via form fields. No
filenames to manage. The site shows a before/after slider when both exist, and a
single photo when only one does. This is the intended, everyday workflow.

**Fallback method — filename convention.** For bulk imports or non-CMS handling,
pairs can also be identified by filename, so no special tooling is strictly
required:

- **Pair:** two files sharing an identical stem with a trailing `-before` /
  `-after` marker — `town-hall-facade-before.jpg` + `town-hall-facade-after.jpg`.
- **Standalone:** any file **without** a `-before`/`-after` marker.
- **Ordering (optional):** a leading `NN-` numeric prefix controls order.
- **Caption fallback:** a human-readable caption is derived from the stem when
  none is set.

The site logic pairs items by the CMS relationship first, and by matching
filename stems as a fallback.

**Open decisions:**
- **Captions/metadata** — per item: title, location, service type, short
  description? Or captions derived from filenames only?

**Resolved:** video is embedded from YouTube or Vimeo (owner pastes the URL
into the CMS). An optional **thumbnail image upload** field sits alongside
the video URL field — the owner uploads a still frame; if omitted, a
YouTube thumbnail is fetched automatically by URL pattern. Vimeo projects
without a thumbnail upload will show a placeholder until one is provided.

### 2.2 Media management (self-service)
The client must be able to **manage the media easily** without a developer.

Requirements:
- Non-technical user can **add, remove, reorder, and caption** photos/videos.
- Assign each item to a **service category** (if categorisation is used).
- Simple, minimal-training interface.
- Scale is small (~100 photos), so heavy DAM tooling is unnecessary.

**Mechanism is a technical decision** (deferred to `spec-tech.md`). Candidate
approaches to evaluate:
- Git-based CMS (e.g. Decap/TinaCMS) — free, editor UI, no ongoing SaaS cost.
- Hosted headless CMS (e.g. Sanity/Storyblok) — polished media library, has a
  free tier, small monthly cost at scale.
- Lightweight custom admin — most control, most build/maintenance.

Selection criteria: ease of use for a non-technical owner, cost, and hosting fit.

### 2.3 Contact (details + enquiry form)
Both are wanted.

- Display **email and phone** clearly and accessibly — on a contact page and in
  the footer (and likely header). Tap-to-call and mailto links on mobile.
- Provide an **enquiry form** for buyers who prefer to submit details.
  - Suggested fields: name, organisation, email, phone, service of interest,
    message. (To finalise.)
  - Needs **spam protection** (e.g. honeypot + a lightweight challenge) and a
    submission destination (email to the client).
  - Submission handling is a technical concern given static hosting — see
    `spec-tech.md`.

### 2.4 Sister-company link (Pro City Painters)
- Prominent, clear link to **Pro City Painters**: **https://www.procitypainters.co.uk**
- Cross-promotes the related business.
- Opens in a new tab (external site).

**Open decisions:**
- Placement — footer, header, and/or a small "our companies" section.
- Whether the reverse link (Painters → Lasers) is also in scope.

## 3. Explicitly Out of Scope (unless raised later)

Keeping the build lean; not currently required:
- E-commerce / online payment
- User accounts / login for visitors
- Multi-language
- Booking/scheduling system

## 4. Open Questions (consolidated)

1. Gallery organisation — filter by service category? Yes/no.
2. Per-item metadata (title, location, service, description) — how much beyond
   filename-derived captions?
3. Video: how many? (Hosting resolved — YouTube/Vimeo embed with optional thumbnail upload.)
4. Enquiry form — final field list, and the destination email for submissions.
5. Pro City Painters — link placement, and whether cross-linking is reciprocal.
6. Who will manage the media (one owner, or a small team)? Affects the
   management mechanism / auth.

**Resolved:** before/after supported-not-required via filename convention (2.1);
contact = details + enquiry form (2.3); Painters URL (2.4).
