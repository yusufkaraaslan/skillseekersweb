import type { APIRoute } from 'astro';
import { rateLimits, applyRateLimit } from '../../../utils/ratelimit';

// API endpoint to reject a config submission
export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify admin session
    const authCookie = request.headers.get('cookie')?.match(/gh_admin_session=([^;]+)/)?.[1];

    if (!authCookie) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sessionData = JSON.parse(atob(authCookie));

    // Apply rate limiting (20 requests per hour per user)
    const rateLimitResponse = await applyRateLimit(rateLimits.adminReject, sessionData.username);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Check admin whitelist
    const adminWhitelist = import.meta.env.ADMIN_GITHUB_USERNAMES?.split(',') || [];
    if (!adminWhitelist.includes(sessionData.username)) {
      return new Response(JSON.stringify({ error: 'Forbidden: Not an admin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get request body
    const body = await request.json();
    const { issueNumber, reason } = body;

    if (!issueNumber) {
      return new Response(
        JSON.stringify({ error: 'Missing issueNumber' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const githubToken = import.meta.env.GITHUB_TOKEN;
    const repoOwner = 'yusufkaraaslan';
    const repoName = 'skill-seekers-configs';

    // Step 1: Add "rejected" label
    await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/labels`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'SkillSeekersWeb-Admin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ labels: ['rejected'] }),
      }
    );

    // Step 2: Add comment with feedback
    const feedbackMessage = reason
      ? `❌ **Config submission rejected**\n\n**Reason:** ${reason}\n\nRejected by: @${sessionData.username}\n\nPlease fix the issues and submit again.`
      : `❌ **Config submission rejected**\n\nRejected by: @${sessionData.username}\n\nPlease review the config and submit again.`;

    await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/comments`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'SkillSeekersWeb-Admin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: feedbackMessage }),
      }
    );

    // Step 3: Close the issue
    await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}`,
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'SkillSeekersWeb-Admin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: 'closed' }),
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Config rejected and issue closed',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error rejecting config:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to reject config',
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
