import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/**
 * Rehype plugin: insert an empty <div id="mid-cta-slot"> into rendered
 * article HTML at approximately the 40% mark (by top-level block count).
 *
 * The article page template then uses a tiny inline script to relocate
 * the server-rendered ArticleCta component into this slot. If JS is
 * disabled the CTA stays in its default position after the body.
 */
function rehypeMidCtaSlot() {
  return (tree) => {
    // Count top-level block elements to find the insertion point
    const blockChildren = tree.children.filter((n) => n.type === 'element');
    if (blockChildren.length < 3) return; // article too short — skip

    const insertAfterNth = Math.floor(blockChildren.length * 0.4);
    let blockCount = 0;
    let insertIdx = -1;

    for (let i = 0; i < tree.children.length; i++) {
      if (tree.children[i].type === 'element') {
        blockCount++;
        if (blockCount === insertAfterNth) {
          insertIdx = i + 1;
          break;
        }
      }
    }

    if (insertIdx === -1) return;

    tree.children.splice(insertIdx, 0, {
      type: 'element',
      tagName: 'div',
      properties: { id: 'mid-cta-slot' },
      children: [],
    });
  };
}

export default defineConfig({
  server: { host: '0.0.0.0' },
  site: 'https://www.procitylasers.com',
  trailingSlash: 'always',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/admin/'),
    }),
  ],
  image: {
    domains: ['img.youtube.com'],
  },
  markdown: {
    rehypePlugins: [rehypeMidCtaSlot],
  },
});
