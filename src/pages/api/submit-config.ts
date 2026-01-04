import type { APIRoute } from 'astro';

// API endpoint to automatically submit config to GitHub Issues
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { config } = body;

    if (!config) {
      return new Response(
        JSON.stringify({ error: 'Config is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    const requiredFields = ['name', 'description', 'base_url', 'selectors'];
    for (const field of requiredFields) {
      if (!config[field]) {
        return new Response(
          JSON.stringify({ error: `Config missing required field: ${field}` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Validate selectors
    const requiredSelectors = ['main_content', 'title', 'code_blocks'];
    for (const selector of requiredSelectors) {
      if (!config.selectors[selector]) {
        return new Response(
          JSON.stringify({
            error: `Config selectors missing required field: ${selector}`
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create GitHub Issue
    const githubToken = import.meta.env.GITHUB_TOKEN;
    const repoOwner = 'yusufkaraaslan';
    const repoName = 'skill-seekers-configs';

    // Format config JSON for issue body
    const configJson = JSON.stringify(config, null, 2);

    // Create issue title
    const issueTitle = `[CONFIG] ${config.name}`;

    // Create issue body using the template
    const issueBody = `## Config Submission

**Config Name:** ${config.name}

**Description:** ${config.description}

**Base URL:** ${config.base_url}

---

### Configuration JSON

\`\`\`json
${configJson}
\`\`\`

---

### Validation Status
✅ All required fields present
✅ Selectors validated
✅ Submitted via skillseekersweb.com

### Next Steps
- [ ] Admin review in dashboard: https://skillseekersweb.com/admin
- [ ] Test config with \`skill-seekers scrape --config [name].json --dry-run\`
- [ ] Approve and merge to \`configs/\` directory

---

*This config was submitted automatically via the Skill Seekers website.*`;

    // Create the GitHub Issue
    const createIssueResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'SkillSeekersWeb',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody,
          labels: ['config-submission', 'needs-review'],
        }),
      }
    );

    if (!createIssueResponse.ok) {
      const errorData = await createIssueResponse.json();
      console.error('GitHub API error:', errorData);
      throw new Error(`Failed to create GitHub issue: ${errorData.message || 'Unknown error'}`);
    }

    const issueData = await createIssueResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Config submitted successfully!',
        issueUrl: issueData.html_url,
        issueNumber: issueData.number,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error submitting config:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to submit config',
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
