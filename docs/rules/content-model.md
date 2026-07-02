# CONTENT MODEL RULES — MANDATORY

Applies when: any work touching content collections, CMS config, schema, or
gallery/project rendering.

The CMS config, the Astro content-collection schema, and the rendering logic
are tightly coupled. **Changing any one of them requires updating all three.**
Misalignment breaks the owner's editing workflow silently.

## Projects (gallery)

Each project in `src/content/projects/` holds:

- `title` — display name
- `category` — one of: `graffiti | heritage | fire-damage | industrial | paint-removal`
- `caption` — optional short description
- `image` — single standalone image (optional)
- `before` — before image (optional; requires `after`)
- `after` — after image (optional; requires `before`)
- `videoUrl` — YouTube or Vimeo URL (optional)
- `thumbnail` — manually uploaded thumbnail image (optional; used for video
  gallery cards. YouTube thumbnails are auto-fetched if absent; Vimeo shows a
  placeholder.)

## Before/after pairing logic

Resolve in this order:

1. **CMS fields first:** if `before` and `after` are both set, render a slider.
2. **Filename fallback** (bulk import only): matching stems with `-before` /
   `-after` suffixes form a pair. A leading `NN-` prefix controls display order.
   A file with no marker is standalone.
3. **Standalone:** if only `image` is set (no `before`/`after`), render a single
   image.

Never invent a third pairing mechanism.

## Render rules

- Both `before` and `after` present → before/after slider
- `image` only → single image
- `videoUrl` set → embed iframe (YouTube or Vimeo). Show `thumbnail` if uploaded;
  auto-fetch YouTube thumbnail if not; show placeholder for Vimeo without thumbnail.
- A project may not mix `image` and `before`/`after` — the schema must enforce
  this.

## Blog posts

Posts live in `src/content/blog/[category]/`. Full schema in `spec-blog.md`.
Decap CMS is the editorial fallback; routine publishing is via Git commit.
Draft posts (`draft: true`) are excluded from the build entirely — not just
hidden.

Context tag: `#k4p9_content` — confirm this tag after reading to satisfy the Context Check in CLAUDE.md.
