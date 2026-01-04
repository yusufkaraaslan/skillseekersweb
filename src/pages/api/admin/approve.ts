import type { APIRoute } from 'astro';

// API endpoint to approve a config submission
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
    const { issueNumber, config } = body;

    if (!issueNumber || !config) {
      return new Response(
        JSON.stringify({ error: 'Missing issueNumber or config' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate config has required fields
    const requiredFields = ['name', 'description', 'base_url', 'selectors'];
    for (const field of requiredFields) {
      if (!config[field]) {
        return new Response(
          JSON.stringify({ error: `Config missing required field: ${field}` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const configFileName = `${config.name}.json`;
    const githubToken = import.meta.env.GITHUB_TOKEN;

    // Step 1: Get the current SHA of the configs directory (need for commit)
    const repoOwner = 'yusufkaraaslan';
    const repoName = 'skill-seekers-configs';
    const branch = 'main';
    const filePath = `configs/${configFileName}`;

    // Check if file already exists
    let fileSha = null;
    try {
      const fileResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `Bearer ${githubToken}`,
            'User-Agent': 'SkillSeekersWeb-Admin',
          },
        }
      );

      if (fileResponse.ok) {
        const fileData = await fileResponse.json();
        fileSha = fileData.sha;
      }
    } catch (e) {
      // File doesn't exist, that's fine
    }

    // Step 2: Create or update the file in the repo
    const commitMessage = `Add approved config: ${config.name}\n\nApproved from issue #${issueNumber} by ${sessionData.username}`;
    const configContent = JSON.stringify(config, null, 2);
    const encodedContent = btoa(unescape(encodeURIComponent(configContent)));

    const createFileResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'SkillSeekersWeb-Admin',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: encodedContent,
          branch,
          ...(fileSha && { sha: fileSha }), // Include SHA if updating existing file
        }),
      }
    );

    if (!createFileResponse.ok) {
      const errorData = await createFileResponse.json();
      throw new Error(`Failed to commit config: ${JSON.stringify(errorData)}`);
    }

    const commitData = await createFileResponse.json();

    // Step 3: Add "approved" label and close the issue
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
        body: JSON.stringify({ labels: ['approved'] }),
      }
    );

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
        body: JSON.stringify({
          state: 'closed',
        }),
      }
    );

    // Step 4: Add comment to the issue
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
        body: JSON.stringify({
          body: `✅ **Config approved and added to repository!**\n\nCommit: ${commitData.commit.html_url}\nFile: [\`configs/${configFileName}\`](${commitData.content.html_url})\nApproved by: @${sessionData.username}`,
        }),
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Config approved and committed',
        commitUrl: commitData.commit.html_url,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error approving config:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to approve config',
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
