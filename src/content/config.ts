import { defineCollection, z } from 'astro:content';

const docsSchema = z.object({
  title: z.string(),
  description: z.string(),
  section: z.enum(['about', 'getting-started', 'tutorials', 'manual', 'features', 'guides', 'cli', 'integrations', 'deployments', 'reference', 'community']),
  subsection: z.enum(['scraping', 'codebase-analysis', 'enhancement', 'platforms', 'mcp', 'advanced', 'rag', 'coding', 'overview']).optional(),
  order: z.number().optional(),
  draft: z.boolean().optional().default(false),
});

const docsCollection = defineCollection({
  type: 'content',
  schema: docsSchema,
});

const docsZhCollection = defineCollection({
  type: 'content',
  schema: docsSchema,
});

// Blog collection schema
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  author: z.string().default('Skill Seekers Team'),
  authorTwitter: z.string().optional(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const blogZhCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

export const collections = {
  docs: docsCollection,
  'docs-zh': docsZhCollection,
  blog: blogCollection,
  'blog-zh': blogZhCollection,
};
