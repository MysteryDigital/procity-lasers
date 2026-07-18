# Agent Notes & Handovers (AGENTS.md)

This file tracks important architectural changes, feature toggles, and notes for AI agents working on the Pro City Laser Removal codebase.

---

## Blog Feature Suspended (2026-07-18)

The client requested to go live without the blog feature, but did not want to delete the existing blog articles and structural setup.

### Current State
* **Routing Disabled:** The blog router folder has been renamed from `src/pages/blog` to `src/pages/_blog`. Astro ignores folders prefixed with an underscore, so no blog pages are built, and they are omitted from the XML sitemap.
* **Navigation Links Removed:** The blog link has been removed from [src/components/Footer.astro](file:///home/andy/projects/procity-lasers/src/components/Footer.astro).
* **CMS Collections Hidden:** The `blog` collection configuration has been commented out in [public/admin/config.yml](file:///home/andy/projects/procity-lasers/public/admin/config.yml) to hide the blog editing interface from the client.
* **Content Preserved:** The original markdown blog posts remain in `src/content/blog/` and the schemas remain defined in [src/content/config.ts](file:///home/andy/projects/procity-lasers/src/content/config.ts).

### How to Re-enable the Blog
To restore the blog feature in the future, follow these steps:
1. **Enable Routing:** Rename `src/pages/_blog` back to `src/pages/blog`.
2. **Restore Navigation:** Add `{ label: 'Blog', href: '/blog/' }` back into the company links array inside [src/components/Footer.astro](file:///home/andy/projects/procity-lasers/src/components/Footer.astro).
3. **Show CMS Collection:** Uncomment the `blog` collection in [public/admin/config.yml](file:///home/andy/projects/procity-lasers/public/admin/config.yml) (around line 74).
4. Run `npm run build` to verify page generation.
