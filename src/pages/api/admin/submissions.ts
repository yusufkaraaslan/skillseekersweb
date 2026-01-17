import type { APIRoute } from 'astro';
import { rateLimits, applyRateLimit } from '../../../utils/ratelimit';

// API endpoint to fetch pending config submissions from GitHub Issues
export const GET: APIRoute = async ({ request }) => {
  try {
    // Verify admin session (from cookie set by OAuth)
    const authCookie = request.headers.get('cookie')?.match(/gh_admin_session=([^;]+)/)?.[1];

    if (!authCookie) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Decode session (simple base64 for now - in production use signed tokens)
    const sessionData = JSON.parse(atob(authCookie));

    // Apply rate limiting (30 requests per hour per user)
    const rateLimitResponse = await applyRateLimit(rateLimits.adminSubmissions, sessionData.username);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Check if user is in admin whitelist
    const adminWhitelist = import.meta.env.ADMIN_GITHUB_USERNAMES?.split(',') || [];
    if (!adminWhitelist.includes(sessionData.username)) {
      return new Response(JSON.stringify({ error: 'Forbidden: Not an admin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch pending submissions from GitHub Issues
    const response = await fetch(
      'https://api.github.com/repos/yusufkaraaslan/skill-seekers-configs/issues?labels=config-submission,needs-review&state=open',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${import.meta.env.GITHUB_TOKEN}`,
          'User-Agent': 'SkillSeekersWeb-Admin',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const issues = await response.json();

    // Parse config JSON from issue bodies
    const submissions = issues.map((issue: any) => {
      // Extract JSON from issue body (between ```json and ```)
      const jsonMatch = issue.body?.match(/```json\n([\s\S]*?)\n```/);
      let config = null;
      let parseError = null;

      if (jsonMatch) {
        try {
          config = JSON.parse(jsonMatch[1]);
        } catch (e) {
          parseError = (e as Error).message;
        }
      }

      return {
        issueNumber: issue.number,
        title: issue.title,
        author: issue.user.login,
        createdAt: issue.created_at,
        url: issue.html_url,
        config,
        parseError,
      };
    });

    return new Response(JSON.stringify({ submissions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch submissions' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
