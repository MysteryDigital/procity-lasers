# Spec: Design Language & Goals

**Status:** Draft — direction agreed, brand assets pending
**Last updated:** 2026-07-01
**Related:** [spec-overview.md](spec-overview.md)

## 1. Target Market

Pro City sells to **organisations, not individuals**. Every buyer spends someone
else's money — a council budget, an insurer's claim reserve, a heritage trust's
grant — so every decision is accountable, documented, and risk-averse. Nobody is
rewarded for hiring Pro City; they are criticised if it goes wrong. **The site's
job is to make choosing Pro City feel like the safe, defensible, professional
decision.**

Four overlapping buyer types:

1. **Local councils & public bodies** — conservation officers, streetscene and
   highways teams, facilities managers. Run anti-graffiti programmes and
   maintain public heritage assets. Care about compliance, liability,
   environmental credentials, and trust on listed structures. Often buy through
   **procurement frameworks and tenders** — scanning for accreditations, method
   statements, and evidence of comparable work.

2. **Insurers & loss adjusters** — fire and damage restoration via claims. Want
   speed, clear scope, reliable documentation, and predictable cost. Valuable as
   **repeat buyers** when dependable.

3. **Heritage & conservation sector** — conservation architects, heritage
   trusts, church/cathedral custodians, listed-building owners. Most technical
   and cautious audience. Need reassurance the laser process is **non-abrasive
   and appropriate for irreplaceable substrates**. Reputation and prior heritage
   work are decisive.

4. **Commercial / industrial & main contractors** — facilities and property
   managers, principal contractors sub-letting specialist cleaning. More
   pragmatic and price/timeline-aware, still expect professionalism.

**Common thread:** all are *professional evaluators*. They arrive skeptical,
short on time, and looking for reasons to trust or reject. They respond to
evidence (before/after, case studies, named clients), credentials
(accreditations, insurance, method statements), and clarity — not marketing hype
or hard-sell.

## 2. Design Goals

Concrete, testable intentions:

1. **Signal credibility within 5 seconds** — polish, restraint, and proof make
   a buyer feel "established, serious specialist" on landing.
2. **Let the results do the talking** — before/after imagery is the single most
   persuasive asset; the design showcases it prominently.
3. **Make each buyer feel understood** — route councils, insurers, heritage, and
   commercial buyers quickly to relevant, reassuring content.
4. **Lower perceived risk** — accreditations, insurance, environmental
   credentials, and process transparency are first-class content, not fine print.
5. **Make enquiry frictionless and professional** — clear, low-pressure
   conversion suited to considered B2B buying; no aggressive CTAs.
6. **Modern, not trendy** — should still look current in five years. Timeless
   professionalism over fashion.
7. **Perform and comply** — fast, accessible (WCAG — often a council
   requirement), fully mobile-competent.

## 3. Brand Direction

**Chosen tilt: technical / architectural precision** (over heritage/craft).

This is a **design decision**, not one inherited from existing brand assets —
there are no established brand colours or fonts, and the client's business card
is explicitly **not** to be used as a styling reference for the site. We are
defining the website's visual identity from a clean slate.

Rationale: the direction suits the **audience and the service**. These buyers
are professional evaluators who trust precision, clarity, and evidence; the work
itself — laser cleaning — is inherently technical and exacting. A clean, modern,
engineered aesthetic reads as competent and defensible, and is more distinctive
than a conventional heritage-serif restoration brand.

**The design does not build around the logo.** The existing mark is treated as a
supplied asset to be placed cleanly, not a source for the visual language (see
Brand Assets). The identity stands on its own.

**North star:** *"Precision you can trust with things that matter."*

**Tone:** confident, precise, understated. Engineering competence with respect
for the material. Clean but not cold — the work is about restoring valued
structures.

## 4. Design Language

Derived from the goals and the audience — **independent of the logo**.

### Precision detailing (self-standing, not logo-derived)
A restrained system of "engineered" detail expresses precision without imitating
the mark:
- Fine hairline rules, clear grid structure, and crisp dividers
- A consistent, minimal **thin-line icon set** for the five services
- Deliberate alignment and measured spacing as the "finish" of the site

### Core visual tension
A calm, precise, restrained **UI** (typography, grid, whitespace) set against
textured, photographic **before/after imagery** — clean competence vs. the real
grime being removed. This contrast is the site's ownable visual story, and it is
carried by layout and photography, not by decorative graphics.

### Colour
- Restrained, professional, largely **neutral** palette so project photography carries the colour.
- **One controlled accent** — steel blue `#1c425c`. Precise and trustworthy; used only for CTA buttons, active states, and focus indicators.
- Monoline single-colour treatment for all line-art.
- All values are design tokens — see §4a for the confirmed set and contrast table.

### 4a. Confirmed colour tokens

**Status: agreed 2026-07-02.** Source swatch: `#1c425c #41413e #d7d7d7 #8d8d8d`.

| Token | Value | Role |
|---|---|---|
| `--color-neutral-dark` | `#41413e` | Warm charcoal — primary text, dark surfaces, footer |
| `--color-neutral-mid` | `#6b6b6b` | Mid grey — secondary text, borders, dividers |
| `--color-neutral-light` | `#d7d7d7` | Light grey — dividers, subtle section backgrounds |
| `--color-accent` | `#1c425c` | Steel blue — CTA buttons, active states, focus indicators |
| `--color-surface` | `#f6f5f2` | Warm white — page and card backgrounds |
| `--color-on-surface` | `#41413e` | Primary text on surface |

**Note on neutral-mid:** the swatch value `#8d8d8d` was nudged to `#6b6b6b` — the same grey direction but dark enough to pass WCAG AA 4.5:1 for normal body text. `#8d8d8d` only reaches 3:1 and is restricted to borders and UI components.

**Note on surface:** `#f6f5f2` (warm white) is derived, not in the original swatch. It picks up the warm undertone of `#41413e` and provides the page background the swatch lacked.

#### WCAG 2.1 AA contrast ratios

| Foreground | Background | Ratio | Normal text (4.5:1) | Large text / UI (3:1) |
|---|---|---|---|---|
| `#41413e` neutral-dark | `#f6f5f2` surface | **9.4:1** | ✅ | ✅ |
| `#41413e` neutral-dark | `#d7d7d7` neutral-light | **7.1:1** | ✅ | ✅ |
| `#6b6b6b` neutral-mid | `#f6f5f2` surface | **4.9:1** | ✅ | ✅ |
| `#6b6b6b` neutral-mid | `#d7d7d7` neutral-light | **3.7:1** | ❌ | ✅ |
| `#1c425c` accent | `#f6f5f2` surface | **9.7:1** | ✅ | ✅ |
| `#1c425c` accent | `#d7d7d7` neutral-light | **7.4:1** | ✅ | ✅ |
| `#ffffff` white | `#1c425c` accent (button) | **10.6:1** | ✅ | ✅ |

**Combination to avoid:** `neutral-mid` text on `neutral-light` section backgrounds (3.7:1 — large text only). Use `neutral-dark` for any body-size text on `neutral-light` surfaces.

---

### Photography
- The hero of the site. High-quality, **real project** imagery only.
- **Before/after is a core UI pattern** (e.g. slider), not just a gallery.
- Avoid generic stock wherever real work can be shown.

### Typography
- **DM Sans** — confirmed by client as the typeface for the site.
- Geometric / architectural character pairs naturally with the mark and lets the
  logo carry the personality.
- Generous sizing and clear hierarchy; many readers skim on desktop.
- A restrained serif for large headings remains an *optional* heritage nod only.

### Layout & space
- Spacious, structured, grid-driven. Whitespace signals confidence and quality.
- Nothing cramped or busy.

### Motion
- Minimal and purposeful (before/after slider, gentle reveals). Precision, not
  flash.

### Components (design system, not one-off pages)
- Service cards, case-study blocks, credential/accreditation strips, and a
  prominent-but-calm enquiry path. Consistent and systematic.

## 5. Brand Assets — Status & Dependencies

- **Brand colours / fonts:** none exist. The website palette and typography are
  defined from scratch as part of this design work.
- **Business card:** **not** to be used as a branding or styling reference for
  the website.
- **Logo:** an isometric line drawing of three buildings on hills is the mark;
  the client will supply the file. It appears to be a stock/free SVG, so it is
  treated as a **drop-in asset only** — placed cleanly and given room to breathe,
  **not** used as the basis for the site's visual language.
- **Action:** request the logo in **SVG** (fallback high-res PNG). Confirm it has
  adequate contrast and legibility at small sizes against the chosen palette.
- **Interim:** the design language is fully self-standing and does not depend on
  the logo file; the site can be designed and built before it arrives.

## 6. Open Questions

- **Logo:** is the existing isometric mark the website's logo (client to supply
  file), is a refreshed mark being commissioned, or is logo design in scope for
  this project?
- Availability and quality of real before/after project imagery.

**Resolved:**
- ~~Accreditations / certifications~~ — leave out for now; client to supply when available.
- ~~Colour palette~~ — agreed 2026-07-02; see §4a.
