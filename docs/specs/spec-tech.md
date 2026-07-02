# Spec: Technical Approach & Hosting

**Status:** Draft — platform decided (Netlify); remaining details to confirm
**Last updated:** 2026-07-01
**Related:** [spec-overview.md](spec-overview.md), [spec-features.md](spec-features.md)

## 1. Real requirements

The two requirements that actually drive the technical choices:

1. **Cheap hosting** — near-zero monthly running cost.
2. **Non-technical administration** — the owner must be able to manage the site
   himself: primarily **adding/removing photos & videos** and **receiving
   enquiries**, without a developer.

Everything else follows from these. (AWS S3 was an earlier idea, not a hard
requirement — it is now just one candidate among several.)

The site is a small, photo-led **static/JAMstack** site, which suits cheap CDN
hosting well. The two features that need more than plain static hosting are the
**enquiry form** and **media management** — the platform choice is really about
which one makes those two easiest and cheapest.

## 2. Decision: Netlify

**Platform: Netlify** (decided). A managed static-site platform is the strongest
fit for "cheap + non-technical" because it bundles the three otherwise-fiddly
pieces — HTTPS/CDN hosting, form handling, and CMS login — into one service on a
free tier.

**Chosen stack:**
- **Hosting/CDN/HTTPS:** Netlify (free tier), auto-deploys from a Git repo.
- **Enquiry form:** Netlify Forms (built-in; no backend to build).
- **Media management:** a **git-based CMS (Decap CMS)** using Netlify Identity /
  Git Gateway for login — giving the owner a simple web editor to manage photos,
  captions, and categories. Changes commit to the repo and auto-deploy.

Net result: the owner logs into one CMS to manage photos and reads enquiries from
one dashboard/inbox; likely **£0/month** at this scale.

The alternatives below (§3) are retained for context only; they are **not** the
chosen path.

## 3. Hosting platform options (considered — Netlify chosen)

| Option | Cost | Form handling | CMS / admin login | Setup effort | Notes |
|---|---|---|---|---|---|
| **Netlify** (recommended) | Free tier likely £0; ~$19/mo if caps exceeded | **Built-in** (Netlify Forms) | **Built-in** (Identity/Git Gateway) | Low | Batteries-included; free-tier caps (e.g. ~100 form submissions/mo) |
| **Cloudflare Pages** | Very generous free tier | Via Pages Functions/Workers (build it) | Build it (external OAuth) | Medium | Cheapest CDN; forms/CMS auth need more work |
| **Vercel** | Free tier (hobby); business use may need paid | Via serverless functions | Build it | Medium | Similar to Netlify but form/CMS less turnkey |
| **AWS S3 + CloudFront** | Pennies/mo, pay-per-use | Build it (API Gateway + Lambda + SES) | Fiddly on pure AWS | Higher | Full control, one vendor, no caps; most assembly |

**Trade-off:** Netlify minimises what we build and maintain and makes admin
easiest (best for the non-technical requirement); AWS gives most control and true
pay-per-use with no caps, at the cost of more setup. For this site, Netlify wins
on the stated requirements. Cloudflare Pages is the pick if we want the
absolute-cheapest CDN and don't mind building forms/CMS auth.

## 4. Media management (non-technical requirement)

The owner manages ~100 photos + some videos via the **CMS UI as the primary
method**.

**Chosen: Decap CMS (git-based) on Netlify.** A web editor at `/admin`; the owner
logs in with email/password (Netlify Identity), then adds/removes/reorders items
through forms. Changes commit to the repo and auto-deploy — no filenames, Git, or
code exposed to him.

**Everyday workflow (primary):**
1. Log in at `procitylasers.com/admin` (Netlify Identity).
2. Create/edit a **project**: title, service category (dropdown), optional
   caption.
3. Upload a **single image** (standalone) or a **before** image + **after** image
   into the same project, labelled via fields.
4. For video: paste a YouTube or Vimeo URL into the video field. Optionally
   upload a thumbnail image (a still frame). If omitted, a YouTube thumbnail
   is fetched automatically from the URL; Vimeo projects without a thumbnail
   upload show a placeholder until one is provided.
5. Publish — Netlify rebuilds and the change is live in ~1 minute.

**Before/after pairing** is therefore driven by **CMS project fields**, not
filenames. The **filename convention** (features §2.1) is retained only as a
**fallback** for bulk imports / non-CMS handling; site logic resolves pairs by
the CMS relationship first, then by matching filename stems.

**Alternatives considered (not chosen):**
- Hosted headless CMS (Sanity/Storyblok) — nicer media library, another vendor /
  possible cost.
- Convention-driven folder upload only — cheapest to build but weakest editing
  UX; fails the "non-technical, easy" bar as a primary method.

## 5. Enquiry form processing

- **With Netlify:** use **Netlify Forms** — no backend; submissions are captured,
  emailed to the client, and viewable in a dashboard. Simplest path.
- **Without a form platform (e.g. AWS/Cloudflare):** a small serverless endpoint
  (function → email service such as SES) or a third-party form endpoint
  (Formspree/Web3Forms).
- Include spam protection (honeypot + lightweight challenge) regardless.

## 6. Build & deploy

- **Framework: Astro** (decided). Produces static, minimal-JS output ideal for a
  photo-led marketing site, has excellent **built-in image optimisation**
  (responsive sizes, modern formats), and integrates cleanly with Netlify and
  Decap CMS.
- **Content model:** gallery/projects as Astro **content collections** (Markdown/
  data files in the repo), which Decap CMS edits directly — a clean, free,
  git-based pairing.
- **CI/CD:** Netlify auto-builds and deploys on Git push (including commits made
  by Decap CMS).
- **Image optimisation at build time** via Astro's image tooling — key for an
  image-heavy ~100-photo site's speed and cost.

## 7. Open Questions

1. **Domain/DNS:** is `procitylasers.com` registered, and where is DNS managed?
   (Netlify can manage DNS or point via existing registrar.)
2. ~~**Video hosting:**~~ **Resolved:** YouTube/Vimeo embed; owner pastes URL into CMS; optional thumbnail upload field (YouTube auto-fetched if omitted; Vimeo shows placeholder).
3. **Free-tier caps:** confirm expected enquiry volume against Netlify Forms'
   free-tier limit (~100 submissions/mo); upgrade only if needed.

**Resolved:** hosting platform = **Netlify** (§2); media management = **Decap CMS
(git-based) on Netlify**, CMS UI primary (§4); framework = **Astro** (§6).
