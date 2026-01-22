import type { APIRoute } from 'astro';

// Debug endpoint to check admin configuration
export const GET: APIRoute = async ({ request }) => {
  try {
    // Check auth cookie
    const authCookie = request.headers.get('cookie')?.match(/gh_admin_session=([^;]+)/)?.[1];

    if (!authCookie) {
      return new Response(JSON.stringify({
        error: 'No auth cookie found',
        authenticated: false
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Decode session
    const sessionData = JSON.parse(atob(authCookie));

    // Check environment variables
    const hasGitHubToken = !!import.meta.env.GITHUB_TOKEN;
    const adminWhitelist = import.meta.env.ADMIN_GITHUB_USERNAMES?.split(',') || [];
    const isAdmin = adminWhitelist.includes(sessionData.username);

    // Test GitHub API call
    let githubApiWorking = false;
    let githubError = null;
    let issueCount = 0;

    if (hasGitHubToken) {
      try {
        const response = await fetch(
          'https://api.github.com/repos/yusufkaraaslan/skill-seekers-configs/issues?labels=config-submission,needs-review&state=open',
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${import.meta.env.GITHUB_TOKEN}`,
              'User-Agent': 'SkillSeekersWeb-Debug',
            },
          }
        );

        if (response.ok) {
          const issues = await response.json();
          githubApiWorking = true;
          issueCount = issues.length;
        } else {
          githubError = `HTTP ${response.status}: ${response.statusText}`;
        }
      } catch (e) {
        githubError = (e as Error).message;
      }
    }

    return new Response(JSON.stringify({
      authenticated: true,
      username: sessionData.username,
      isAdmin,
      adminWhitelist,
      environment: {
        hasGitHubToken,
        githubApiWorking,
        githubError,
        issueCount,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: (error as Error).message,
        stack: (error as Error).stack
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
