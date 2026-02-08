import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog');
  
  const rssBody = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Skill Seekers Blog</title>
    <description>Latest news, tutorials, and updates from Skill Seekers</description>
    <link>${context.site}</link>
    <atom:link href="${context.site}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <link>${context.site}/blog/${post.slug}/</link>
      <guid>${context.site}/blog/${post.slug}/</guid>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rssBody, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
