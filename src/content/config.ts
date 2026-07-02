import { defineCollection, z } from 'astro:content';

const SERVICE_CATEGORIES = ['graffiti', 'heritage', 'fire-damage', 'industrial', 'paint-removal'] as const;

const projects = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        category: z.enum(SERVICE_CATEGORIES),
        caption: z.string().optional(),
        image: image().optional(),
        imageCaption: z.string().optional(),
        before: image().optional(),
        beforeCaption: z.string().optional(),
        after: image().optional(),
        afterCaption: z.string().optional(),
        videoUrl: z.string().url().optional(),
        thumbnail: image().optional(),
      })
      .refine(
        (d) => !(d.image && (d.before || d.after)),
        { message: 'A project cannot have both "image" and "before"/"after" fields.' }
      )
      .refine(
        (d) => (d.before == null) === (d.after == null),
        { message: '"before" and "after" must both be set or both be absent.' }
      ),
});

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Pro City Laser Removal'),
      category: z.enum(SERVICE_CATEGORIES),
      coverImage: image().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, blog };
