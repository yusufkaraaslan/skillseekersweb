import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['about', 'getting-started', 'tutorials', 'manual', 'features', 'guides', 'cli', 'integrations', 'reference', 'community', 'api']),
    subsection: z.enum(['scraping', 'codebase-analysis', 'enhancement', 'platforms', 'mcp', 'advanced']).optional(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  docs: docsCollection,
};
