# Image Uploads & Optimisation

How images uploaded through Decap CMS are stored, processed, and served.

## Upload flow

1. Owner uploads an image via the CMS at `/admin`.
2. Decap CMS commits the file to `src/assets/images/uploads/` in the Git repo.
3. Netlify detects the commit and triggers a rebuild.
4. Astro's build pipeline processes every image in `src/` at build time.
5. Optimised images (WebP/AVIF, multiple sizes, content-hashed filenames) are written to the static output and served from Netlify's CDN.

## Why images must land in `src/`, not `public/`

Astro only processes images that live under `src/`. Files placed in `public/` are copied to the output as-is — no format conversion, no responsive sizes, no layout-shift prevention. The Decap CMS config enforces the correct location:

```yaml
# public/admin/config.yml
media_folder: src/assets/images/uploads
```

Do not change this to a `public/` path without understanding the performance impact.

## What Astro does at build time

Astro's `astro:assets` pipeline (via the `<Image>` component) applies the following to every referenced image:

| Transform | Effect |
|---|---|
| Format conversion | Outputs WebP and/or AVIF in addition to the original format |
| Responsive sizes | Generates multiple width variants; the browser fetches only what it needs via `srcset` |
| Dimension injection | Adds `width` and `height` attributes to prevent cumulative layout shift (CLS) |
| Content-hashed filename | Allows far-future cache headers; changing the image invalidates the cache automatically |

The widths generated depend on the `widths` prop passed to `<Image>`. For example, `ProjectCard.astro` passes `widths={[400, 800]}` with a `sizes` descriptor so the browser fetches a 400 px image on mobile and an 800 px image on desktop.

## How the schema connects uploads to the pipeline

The content collection schema in `src/content/config.ts` uses Astro's `image()` helper for every image field:

```ts
image: image().optional(),
before: image().optional(),
after: image().optional(),
thumbnail: image().optional(),
```

This tells Astro to treat those fields as local image references rather than plain strings. At build time, Astro resolves the path, reads the file, and returns `ImageMetadata` (dimensions, format, the processed URL). Passing that metadata to `<Image>` is what enables all the optimisations above.

If you ever add a new image field to the schema, use `image()` — not `z.string()` — or the image will bypass the pipeline entirely.

## The `public_folder` path issue

Decap CMS writes the uploaded path into the JSON content file. The `public_folder` setting controls what prefix it writes:

```yaml
public_folder: /src/assets/images/uploads
```

This writes an absolute path like `/src/assets/images/uploads/photo.jpg` into the JSON. Astro's content collection `image()` helper must be able to resolve that path. **Verify this works on the first real upload** — if Astro cannot resolve the path (e.g. it expects a relative path such as `../../assets/images/uploads/photo.jpg`), the build will error and the CMS config will need adjusting.

## Loading behaviour (accessibility rule)

The accessibility rules (`docs/rules/accessibility.md`) require:

- **Hero / LCP image:** `loading="eager" fetchpriority="high"` plus a `<link rel="preload" as="image">` in `<head>`. Never lazy-load the first visible image.
- **All below-fold images:** `loading="lazy"` (already the default in `ProjectCard.astro`).

Do not remove or change these attributes without checking which image is the LCP candidate on the relevant page.
