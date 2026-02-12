import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    newsroom: defineCollection({
      type: "page",
      source: "newsroom/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        category: z.enum([
          "Company News",
          "Insights",
          "Portfolio Updates",
          "Press Release",
        ]),
        author: z.string().optional(),
        excerpt: z.string().optional(),
        featured: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
      }),
    }),
  },
});
