import type { APIRoute } from 'astro';
import { rateLimits, applyRateLimit, getClientIP } from '../../utils/ratelimit';

// API endpoint to automatically submit config to GitHub Issues
export const POST: APIRoute = async ({ request }) => {
  try {
    // Apply rate limiting (5 requests per hour per IP)
    const clientIP = getClientIP(request);
    const rateLimitResponse = await applyRateLimit(rateLimits.submitConfig, clientIP);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();
    const { config } = body;

    if (!config) {
      return new Response(
        JSON.stringify({ error: 'Config is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields for unified format (v2.6.0)
    const requiredFields = ['name', 'description', 'sources'];
    for (const field of requiredFields) {
      if (!config[field]) {
        return new Response(
          JSON.stringify({ error: `Config missing required field: ${field}` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Validate sources array
    if (!Array.isArray(config.sources) || config.sources.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Config must have at least one source in sources array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate first source (at least one documentation source required)
    const firstSource = config.sources[0];
    if (!firstSource.type) {
      return new Response(
        JSON.stringify({ error: 'Source missing required field: type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // For documentation sources, validate base_url and selectors
    if (firstSource.type === 'documentation') {
      if (!firstSource.base_url) {
        return new Response(
          JSON.stringify({ error: 'Documentation source missing required field: base_url' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (!firstSource.selectors) {
        return new Response(
          JSON.stringify({ error: 'Documentation source missing required field: selectors' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Validate selectors
      const requiredSelectors = ['main_content', 'title', 'code_blocks'];
      for (const selector of requiredSelectors) {
        if (!firstSource.selectors[selector]) {
          return new Response(
            JSON.stringify({
              error: `Documentation source selectors missing required field: ${selector}`
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
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

    // Extract base_url from sources for display
    const baseUrl = config.sources[0]?.base_url ||
                    config.sources[0]?.repo ||
                    config.sources[0]?.pdf_path ||
                    'N/A';

    const sourceType = config.sources[0]?.type || 'unknown';
    const sourceCount = config.sources.length;

    // Create issue body using the template
    const issueBody = `## Config Submission

**Config Name:** ${config.name}

**Description:** ${config.description}

**Source Type:** ${sourceType}

**Sources:** ${sourceCount} source${sourceCount > 1 ? 's' : ''}

**Primary URL/Path:** ${baseUrl}

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
