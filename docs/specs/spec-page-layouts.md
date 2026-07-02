# Spec: Page Layouts

**Status:** Draft — structure decided, individual page layouts in progress
**Last updated:** 2026-07-01
**Related:** [spec-overview.md](spec-overview.md), [spec-design.md](spec-design.md), [spec-features.md](spec-features.md), [spec-blog.md](spec-blog.md)

## 1. Site Architecture

**Decision: multi-page site.**

### Rationale (client-facing)

The choice between a single long-scrolling page and a multi-page site depends
on who the buyer is and how they make decisions. For Pro City Lasers, the buyers
are procurement professionals — councils, insurers, heritage bodies, contractors
— who evaluate suppliers carefully, often across multiple visits, and frequently
share links internally with colleagues. This changes the calculus entirely.

**Single-page sites have a narrow advantage:** they convert better on simple,
low-consideration offers where there's one thing to sell, one CTA, and the
buyer decides in a single visit. That is not this site.

**Multi-page is the right architecture here for three reasons:**

1. **Buyer behaviour.** A council conservation officer and a loss adjuster
   have different evidence requirements. They need to land on a page that
   speaks directly to their situation — graffiti contracts for one, fire damage
   documentation for the other. A single scroll forces every buyer through
   everything; separate pages let each buyer self-select and find relevant
   evidence fast. Procurement decisions also involve multiple people: a
   facilities manager may share a specific service page URL with a contracts
   manager. That requires stable, linkable URLs per service.

2. **SEO.** Institutional buyers research suppliers before they buy. A council
   writing a specification for graffiti removal will search for "laser graffiti
   removal council contractor UK." A conservation architect will search for
   "laser cleaning listed building heritage stonework." These are distinct
   queries that require distinct, focused pages to rank. A single `/services`
   section competes for none of them specifically and ranks for all of them
   poorly. Separate service pages at `/services/graffiti/`,
   `/services/heritage/` etc. are the only way to capture high-intent niche
   search traffic for each area.

3. **Credibility.** Depth of content on a dedicated service page — process
   explanation, evidence, credentials relevant to that service type — signals
   expertise in a way a few paragraphs in a scroll section cannot. To a
   procurement evaluator, a dedicated heritage conservation page with case
   studies and a process overview reads as "they really do this"; a section in
   a scroll reads as "they also do this."

**Competitive landscape note:** research across six direct UK competitors
(LaserTec, Laser Renew, ThePrepWorks, Berkshire Laser Cleaning, Carrek,
Conservation Cleaning) confirmed that not one uses a before/after comparison
slider, and the sector is consistently photo-poor. A photography-led site with
interactive before/after sliders is visually distinct from every direct
competitor, while also being exactly what institutional buyers need — real
evidence of results, not marketing copy.

## 2. Sitemap

```
/                           Home
/services/                  Services hub (internal linking; not a ranking page)
  /services/graffiti/
  /services/heritage/
  /services/fire-damage/
  /services/industrial/
  /services/paint-removal/
/work/                      Full project gallery
  /work/[category]/         Filtered by service category (clean URLs)
  /work/[slug]/             Individual project page
/blog/                      Blog index
  /blog/[category]/         Category pages (indexed at 5+ articles)
  /blog/[category]/[slug]/  Article pages
/about/                     Company, credentials, accreditations
/contact/                   Enquiry form + contact details
/admin/                     Decap CMS (not a public page)
```

**Open questions:**
- Should `/about/` split into separate company and credentials pages, or stay
  combined? A standalone credentials page aids buyers arriving specifically for
  compliance evidence (accreditations, insurance, method statements).
- Does `/services/` need a standalone hub page, or should the nav dropdown link
  directly to the five service pages?

## 3. Global Elements

### Header
- Logo (left)
- Navigation: Services (dropdown to five service pages), Work, Blog, About, Contact
- Contact CTA (right) — phone number or "Get in touch" button; visible on desktop

### Footer
- Contact details (email, phone) — tap-to-call/mailto on mobile
- Navigation links
- Accreditation marks (small)
- Sister-company link: Pro City Painters (procitypainters.co.uk) — opens in new tab
- Legal: privacy policy, company registration

---

## 4. Homepage (`/`)

The homepage's job for a procurement-minded B2B audience is to answer, above
the fold: *"Are you safe to contract with?"* — then route different buyer types
to relevant evidence quickly.

### Layout (top to bottom)

1. **Hero**
   - Outcome-led headline (what the buyer gets, not what Pro City does).
     Example direction: *"Restore what matters — without abrasion, chemicals,
     or risk"* rather than *"Specialist laser cleaning services."*
   - Hero image or before/after slider using the strongest project image.
   - 2–3 key accreditation/trust marks visible in the hero — not below the fold.
   - Single CTA: "Get in touch" or "See our work" (to be decided).

2. **Services strip**
   - Five service category cards/links so buyers self-select immediately.
   - Thin-line icon + service name + one-line description.
   - Links to individual service pages.

3. **Credibility layer**
   - Accreditation badges (ISO 9001/14001/45001 if held, heritage register
     memberships, NFB Heritage Approved Contractor, IHBC if applicable).
   - Must be verifiable — badges link to issuing body. Generic logo walls are
     discounted by institutional buyers.
   - Optional: named client types ("trusted by local councils, heritage trusts,
     and loss adjusters") without revealing confidential client names.

4. **Project evidence**
   - Before/after pairs with brief context: building type, service applied,
     outcome. Not just a photo gallery — contextualised project evidence.
   - 3–4 featured projects drawn from across service categories.
   - "See all projects" link to `/work/`.

5. **Enquiry CTA**
   - Low-pressure, professional. Project-type fields signal procurement
     familiarity to councils and heritage bodies.
   - Not a generic "get a quote" banner.

6. **Blog teaser** *(optional — include if blog has content at launch)*
   - 2–3 recent articles. Reinforces expertise and gives search-arriving
     visitors a reason to stay.

---

## 5. Service Pages (`/services/[slug]/`)

Five pages sharing a common layout template, with service-specific content.
The five slugs: `graffiti`, `heritage`, `fire-damage`, `industrial`,
`paint-removal`.

Each page's primary job: convince a specific type of buyer that Pro City is
the safe, credible, competent choice for *this* type of work — then make it
easy to enquire.

### Layout (top to bottom)

1. **Page hero**
   - Service-specific headline targeting the buyer's concern, not the
     service name. Examples:
     - Heritage: *"Non-abrasive laser cleaning for listed buildings and
       historic stonework"*
     - Graffiti: *"Commercial graffiti removal for councils and public realm"*
     - Fire damage: *"Fire damage remediation — working directly with
       loss adjusters and insurers"*
   - Strong before/after image from this service category as the hero
     visual (slider if a good pair is available; single image otherwise).
   - Breadcrumb: Home › Services › [Service name]

2. **Service introduction (2–3 short paragraphs)**
   - What the service is, who typically needs it, and why laser is the
     right method for this application (non-abrasive, no chemicals,
     precise, safe for the substrate).
   - Framed around the buyer's risk and concern, not around Pro City.
     Heritage buyers fear damaging irreplaceable stone; graffiti buyers
     want documentation and reliability; fire-damage buyers want speed
     and claim-friendly process.

3. **Why laser — method advantages**
   - Concise bullet list or short comparison: laser vs. traditional
     methods (sandblasting, chemicals) for this specific application.
   - For heritage: emphasise non-abrasive, no moisture, no residue, safe
     for carved detail and polychrome surfaces.
   - For graffiti: emphasise full removal (no ghosting), substrate
     preservation, works on brick/stone/metal, scalable.
   - For fire damage: emphasise soot and char removal without secondary
     damage, documentation trail.
   - Not a generic "laser is great" section — specific to the service.

4. **Project evidence**
   - 3–6 before/after pairs or project cards from this service category.
   - Each with brief context: building/structure type, location (if
     shareable), challenge, outcome.
   - "See all [service] projects" link filters `/work/` to this category.

5. **Service-specific credibility signals**
   - Accreditations and memberships relevant to this service type:
     - Heritage: IHBC membership, Historic England approved, NFB Heritage
       Approved Contractor, Ecclesiastical Insurance approved (if held).
     - Graffiti: council framework agreements, environmental disposal
       credentials.
     - Fire damage: insurer relationships, loss adjuster documentation
       process.
   - Method statement / RAMS availability — "We provide full RAMS and
     COSHH documentation on request." (Institutional buyers need this.)
   - Insurance confirmation ("fully insured — certificates available on
     request").

6. **Process overview (optional — include where it adds reassurance)**
   - 3–4 step visual sequence: survey / quote → method statement →
     on-site work → documentation / sign-off.
   - Keeps it brief; the goal is to reduce perceived risk, not explain
     laser physics.
   - Most valuable on Heritage and Fire Damage pages where the buyer
     is most cautious.

7. **FAQ**
   - 3–5 questions specific to this service. Phrased as the buyer would
     ask them. Serves Featured Snippet and AI Overview targeting (ties
     to blog SEO approach in spec-blog.md).
   - Examples for Heritage:
     - "Is laser cleaning safe for listed buildings?"
     - "Will laser cleaning damage carved stonework or polychrome surfaces?"
     - "Do you carry out trial patches before full treatment?"
   - Examples for Graffiti:
     - "Do you work under council framework agreements?"
     - "What surfaces can you remove graffiti from?"

8. **Enquiry CTA**
   - Full-width block. Service-specific copy (matches blog CTA table in
     spec-blog.md §5).
   - Fields: name, company/organisation, email, brief project description.
     No more — short forms complete more.
   - Secondary option: phone number for buyers who prefer to call.

### Per-service primary buyer and emphasis

| Service | Primary buyer | Key concern | Emphasis |
|---|---|---|---|
| Heritage | Conservation architects, heritage trusts, church/listed-building owners | Damaging irreplaceable substrate | Non-abrasive process, prior heritage work, relevant credentials |
| Graffiti | Councils, streetscene/highways teams | Compliance, documentation, reliability, scale | Framework experience, environmental credentials, before/after volume |
| Fire damage | Insurers, loss adjusters | Speed, scope clarity, documentation for claim | Claim-process familiarity, documentation trail, turnaround |
| Industrial | Facilities managers, principal contractors | Capability, timeline, professionalism | Method statements, scale, range of substrates |
| Paint removal | Commercial clients, contractors | Surface preservation, thoroughness | Substrate-specific process, before/after evidence |

### SEO note

Each page targets one primary cluster of niche queries. The H1, meta title,
and introduction copy should lead with the specific query term, not a generic
service label. Primary targets:

| Page | Primary query target |
|---|---|
| `/services/heritage/` | "laser cleaning listed buildings UK" / "heritage stonework laser cleaning" |
| `/services/graffiti/` | "laser graffiti removal council contractor" / "commercial graffiti removal UK" |
| `/services/fire-damage/` | "fire damage laser cleaning" / "soot removal laser" |
| `/services/industrial/` | "industrial laser cleaning UK" / "laser surface preparation" |
| `/services/paint-removal/` | "laser paint stripping UK" / "laser coating removal" |

---

## 6. Project Gallery (`/work/`)

The primary evidence page — the place institutional buyers go to assess whether
Pro City's real-world output meets the standard their project requires.

### Architecture

Two levels:

- **`/work/`** — filterable grid of all projects. The browsing view.
- **`/work/[slug]/`** — individual project page. Shareable URL per project,
  indexed, linkable from service pages and blog articles.

Individual project pages are important for B2B buyers: a council officer or
conservation architect will share a specific project link internally with
colleagues or attach it to an evaluation. Hash-based modals lose that.

### Gallery index (`/work/`) layout

1. **Page header**
   - H1: "Our Work" or "Project Gallery" (SEO value is limited here; this
     page earns its keep through internal linking and user experience, not
     organic search).
   - 1–2 sentence intro confirming scope: services covered, that pairs show
     before/after comparisons.

2. **Category filter tabs**
   - All | Graffiti | Heritage | Fire Damage | Industrial | Paint Removal
   - No JS filtering — standard links to filtered URLs
     (`/work/?category=heritage` or `/work/heritage/`). Crawlable by
     search engines; works without JavaScript.
   - Active tab highlighted.

3. **Project grid**
   - 3 columns desktop, 2 tablet, 1 mobile.
   - Each **project card** shows:
     - Thumbnail — for before/after projects, show the *after* image (the
       result is the selling point); the slider is on the project page.
       For video projects, show the uploaded thumbnail or auto-fetched
       YouTube thumbnail.
     - Category label (small badge, top-left of image).
     - Project title / caption.
     - Brief descriptor (building type, location if shareable) — one line.
   - Cards link to `/work/[slug]/`.
   - Video projects get a play icon overlay on the thumbnail.

4. **Pagination**
   - Numbered pagination if project count exceeds ~24.
   - Consistent with blog pagination approach (stable crawlable URLs,
     `rel="next"` / `rel="prev"`).

### Individual project page (`/work/[slug]/`) layout

1. **Breadcrumb**
   Home › Work › [Project title]

2. **Project title (H1)**
   Descriptive — building/structure type, location, service applied.
   Example: *"Graffiti removal — Victorian railway viaduct, Manchester"*

3. **Before/after slider or video embed**
   - Full-width or wide-column. The primary content above the fold.
   - Before/after: interactive slider with "Before" / "After" labels.
   - Video: embedded iframe (YouTube or Vimeo). Thumbnail shown until play.
   - Standalone image: full-width single image.

4. **Project detail block**
   - Service category, location (if shareable), substrate/material type.
   - Short description: the challenge, the method applied, the outcome.
     3–5 sentences. Written as evidence, not marketing copy.
   - Optional: client type (e.g. "Local authority" without naming the
     client if confidential).

5. **Additional images** *(if available)*
   - Secondary photos from the same project — process shots, close-ups,
     wider context. Small grid below the main visual.

6. **Related service link**
   - "This project was completed under our [Heritage Conservation] service."
     Links to the relevant service page. Keeps the buyer in the funnel and
     supports internal linking for SEO.

7. **Related projects**
   - 3 other projects from the same service category. Card thumbnails with
     titles — same format as the gallery grid.

8. **Enquiry CTA**
   - Same service-specific CTA as the relevant service page (pulled from
     the same category mapping).

### Open questions

- ~~**URL structure for filtered gallery:**~~ **Resolved:** clean paths
  (`/work/heritage/`, `/work/graffiti/` etc.) — no query strings.
- **Project page depth:** is there enough content per project to justify
  a standalone page, or will most projects be thin (one image, two
  sentences)? If thin, a lightbox modal may serve better — but loses
  shareability. Recommend standalone pages and encourage the client to
  provide more context per project over time.
- **Client confidentiality:** can project locations and client types be
  named? Anonymised context ("listed church in Yorkshire") is better than
  nothing if names can't be used.

---

## 7. Blog

Fully specified in [spec-blog.md](spec-blog.md).

---

## 8. About / Credentials (`/about/`)

The page institutional buyers visit when they want to assess the company behind
the work — not just the results. For procurement evaluators, this page answers:
*"Are these people credible, compliant, and safe to contract with?"*

### Single page vs split

Keep as a single `/about/` page for now. If the credentials and accreditations
content is substantial (multiple ISO certificates, framework agreements,
memberships), it can be split into `/about/` (company) and `/credentials/`
(compliance evidence) — a standalone credentials page would also be directly
linkable in tender documents. Flag this with the client once the actual
accreditations list is known.

### Layout (top to bottom)

1. **Page header**
   - H1: "About Pro City Laser Removal"
   - 2–3 sentence summary: who they are, how long established, what they
     specialise in. Factual and direct — this is an evidence page.

2. **Company overview**
   - Founding story, brief — when, where, by whom.
   - Geographic coverage (flagged as open question in spec-overview.md —
     confirm with client: national, regional, specific areas?).
   - Scale and capacity indicators where honest: number of projects
     completed, years in operation, types of structures worked on.
   - Tone: confident and factual. No marketing hyperbole — this audience
     discounts it.

3. **Why laser cleaning**
   - Brief explanation of the technology and why Pro City chose it.
   - Frames the company's specialism: non-abrasive, environmentally
     cleaner than chemical or abrasive alternatives, precise enough for
     irreplaceable substrates.
   - This is not a technical manual — it is a credibility statement about
     the company's approach and values.

4. **Credentials & accreditations**
   - The most important section for procurement buyers. Treat as
     first-class content, not a logo strip in the footer.
   - Each accreditation listed with:
     - Name and issuing body
     - What it means in plain terms (one sentence)
     - Verification link (to the issuing body's register where possible)
   - Priority accreditations to confirm with client (from spec-design.md
     open questions):
     - ISO 9001 (quality management)
     - ISO 14001 (environmental management)
     - ISO 45001 (health & safety)
     - NFB Heritage Approved Contractor Mark
     - IHBC (Institute of Historic Building Conservation) membership
     - Ecclesiastical Insurance / Historic England approved (if applicable)
     - CHAS / Constructionline / SafeContractor (common council prequalifiers)
   - **This section is blocked on the client supplying the actual
     accreditations list.**

5. **Insurance & compliance**
   - Public liability insurance confirmation (limit of indemnity).
   - Employer's liability insurance.
   - RAMS and COSHH documentation available on request — stated plainly,
     as this is a common council and heritage body requirement.
   - Professional indemnity if applicable.
   - Certificates available on request (do not publish PDFs publicly —
     link to contact page instead).

6. **Team** *(include if owner is comfortable with this)*
   - Owner/director name, brief background, relevant expertise.
   - Any named operatives or specialist staff.
   - For the blog's E-E-A-T requirement, the named reviewer needs a
     profile URL — this section is where that profile lives
     (see spec-blog.md §8).
   - Photo(s): real, professional. Not stock.

7. **Sister company**
   - Brief mention of Pro City Painters with link
     (procitypainters.co.uk, opens new tab).
   - Frames the relationship: complementary services, same professional
     standards.

8. **Enquiry CTA**
   - Low-key at the bottom. Buyers on the About page are evaluating, not
     yet ready to commit. A soft prompt: "Ready to discuss your project?
     Get in touch."

### Open questions

- **Accreditations:** what does Pro City actually hold? This is the
  most important unknown — the credentials section cannot be written
  without it.
- **Geographic coverage:** national, or regional? This affects how the
  company overview is framed.
- **Team:** is the owner comfortable being named and photographed on the
  site? Required for blog E-E-A-T author profile.
- **Years / project count:** how long established, and is there a
  defensible project count to cite?

---

## 9. Contact (`/contact/`)

*To be detailed — placeholder.*
