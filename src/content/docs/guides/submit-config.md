---
title: "How to Submit a Config"
description: Complete guide to validating and submitting custom configuration files to the Skill Seekers community
section: guides
order: 4
---

# How to Submit a Config

Learn how to validate and submit your custom configuration files to the official Skill Seekers config repository.

---

## Overview

The Skill Seekers community welcomes configuration contributions for any framework, library, or documentation site. Your configs help other developers quickly create AI skills for their tools.

**What You'll Need:**
- A valid JSON config file (see [Config Schema Reference](/docs/reference/config-schema))
- GitHub account
- 5-10 minutes

---

## Submission Process

### 1. Create Your Config

Create a config file using the [unified format](/docs/reference/config-schema):

```json
{
  "name": "your-framework",
  "description": "Complete framework knowledge combining docs and codebase.",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.yourframework.com",
      "selectors": {
        "main_content": "article",
        "title": "h1",
        "code_blocks": "pre code"
      },
      "rate_limit": 0.5,
      "max_pages": 200
    }
  ]
}
```

**Tips:**
- Start with the [interactive mode](/docs/getting-started/first-skill#interactive-mode): `skill-seekers scrape --interactive`
- Use an [existing config](/configs) as a template
- Follow the [config schema](/docs/reference/config-schema) for all fields

### 2. Test Your Config

Before submitting, test your config locally:

```bash
# Validate the config structure
skill-seekers validate configs/your-framework.json

# Test scraping
skill-seekers scrape configs/your-framework.json

# Check the output
ls output/your-framework/
```

**Verify:**
- Config validates without errors
- Scraping completes successfully
- Content is properly extracted
- Code blocks are captured

### 3. Validate Online

Visit [skillseekersweb.com/configs](https://skillseekersweb.com/configs) and scroll to the validator:

1. **Paste your config JSON** into the text area
2. **Click "Validate Config"** to check for errors
3. **Fix any validation errors** that appear
4. **Proceed to submission** when you see the green checkmark

The validator checks:
- Required fields (name, description, sources)
- Source type validity (documentation, github, pdf)
- Field types and formats
- URL patterns and selectors

### 4. Submit to GitHub

Once validated, there are two submission methods:

#### Method A: Automatic Submission (Recommended)

1. Click **"Submit Config"** button after validation passes
2. The config is automatically submitted as a GitHub issue
3. You'll receive a link to track the submission
4. Wait for review (typically 24-48 hours)

#### Method B: Manual Submission

If automatic submission doesn't work:

1. Copy your validated JSON
2. Go to [GitHub Issues](https://github.com/yusufkaraaslan/skill-seekers-configs/issues/new)
3. Choose "Config Submission" template
4. Fill in:
   - **Title:** `[CONFIG] Your Framework Name`
   - **Body:** Paste your JSON config
5. Add labels: `config-submission`, `needs-review`
6. Submit the issue

---

## What Happens Next?

### Review Process

1. **Automated Checks** (5 minutes)
   - Config structure validation
   - Source accessibility tests
   - Naming convention checks

2. **Manual Review** (24-48 hours)
   - Content quality check
   - Scraping test run
   - Duplicate detection
   - Category assignment

3. **Approval** (48 hours)
   - Config added to [official repository](https://github.com/yusufkaraaslan/skill-seekers-configs)
   - Appears in [config gallery](/configs)
   - Your GitHub profile listed as contributor

### Review Criteria

Your config will be approved if it:

✅ Validates without errors
✅ Scrapes successfully
✅ Extracts meaningful content
✅ Follows naming conventions
✅ Doesn't duplicate existing configs
✅ Has accurate selectors
✅ Respects rate limits

**Common Rejection Reasons:**
❌ Invalid JSON syntax
❌ Missing required fields
❌ Incorrect selectors (no content extracted)
❌ Duplicate of existing config
❌ Rate limit too aggressive
❌ Broken or inaccessible URLs

---

## Config Categories

Configs are organized into categories in the gallery:

### Web Frameworks
React, Vue, Angular, Svelte, Astro, etc.

### Backend Frameworks
Django, FastAPI, Express, Laravel, Rails, etc.

### Game Engines
Godot, Unity, Unreal, etc.

### DevOps Tools
Kubernetes, Docker, Ansible, Terraform, etc.

### Development Tools
Git, VS Code, Claude Code, etc.

### Mobile Frameworks
React Native, Flutter, Ionic, etc.

### Data & ML
TensorFlow, PyTorch, Pandas, etc.

### Testing Frameworks
Jest, Pytest, Cypress, Playwright, etc.

**Where does your config fit?** Mention the category in your submission for faster processing.

---

## Advanced Submission Tips

### Multi-Source Configs

When submitting configs with multiple sources:

```json
{
  "name": "advanced-framework",
  "description": "Complete knowledge from docs, GitHub, and PDF manual.",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.framework.com"
    },
    {
      "type": "github",
      "repo": "company/framework",
      "enable_codebase_analysis": true,
      "code_analysis_depth": "deep"
    },
    {
      "type": "pdf",
      "path": "https://framework.com/manual.pdf"
    }
  ]
}
```

**Explain in submission:**
- Why multiple sources are needed
- How they complement each other
- Merge strategy rationale

### Private/Enterprise Configs

For private documentation or internal tools:

1. Create config with authentication requirements
2. Submit with note: "Requires authentication"
3. Provide example without credentials
4. Include setup instructions

We'll approve the structure even if we can't test the scraping.

### Large Documentation Sites

For sites with 500+ pages:

```json
{
  "max_pages": 500,
  "rate_limit": 1.0,
  "url_patterns": {
    "include": ["/getting-started/", "/api/", "/guides/"],
    "exclude": ["/blog/", "/changelog/", "/community/"]
  }
}
```

**Recommended:**
- Set aggressive exclusions
- Limit to essential pages
- Use `max_pages` cap
- Higher rate limits (1-2 seconds)

---

## Getting Help

### Config Not Working?

1. **Test locally first:** Run `skill-seekers scrape` before submitting
2. **Check selectors:** Visit a sample page and inspect elements
3. **Verify URLs:** Make sure `base_url` is accessible
4. **Review logs:** Look for errors in scraping output

### Questions?

- **GitHub Discussions:** [Skill Seekers Discussions](https://github.com/yusufkaraaslan/Skill_Seekers/discussions)
- **GitHub Issues:** [Report Problems](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
- **Documentation:** [Config Schema Reference](/docs/reference/config-schema)

### Example Configs

Browse [27+ preset configs](/configs) for inspiration:
- Simple single-source: [Vue](https://github.com/yusufkaraaslan/skill-seekers-configs/blob/main/official/web-frameworks/vue.json)
- Multi-source: [Astro](https://github.com/yusufkaraaslan/skill-seekers-configs/blob/main/official/web-frameworks/astro.json)
- GitHub analysis: [Godot](https://github.com/yusufkaraaslan/skill-seekers-configs/blob/main/official/game-engines/godot.json)

---

## Community Guidelines

### Be Respectful
- Respect website rate limits
- Don't scrape paid/premium content
- Follow robots.txt guidelines
- Credit original documentation sources

### Quality Standards
- Test before submitting
- Use accurate descriptions
- Choose appropriate categories
- Follow naming conventions

### Collaboration
- Help review others' configs
- Suggest improvements
- Report broken configs
- Maintain submitted configs

---

## Recognition

Contributors are recognized in:
- GitHub repository contributors list
- Config file metadata (`submitted_by` field)
- Community leaderboard (coming soon)
- Annual contributor acknowledgments

**Top contributors get:**
- Special GitHub badge
- Priority review for future submissions
- Early access to new features

---

## Quick Reference

### Validation Checklist

Before submitting, ensure:

- [ ] Config validates online (green checkmark)
- [ ] Tested locally with `skill-seekers scrape`
- [ ] Name is lowercase with hyphens
- [ ] Description explains when to use the skill
- [ ] Selectors extract content correctly
- [ ] Rate limit is respectful (0.5-2.0 seconds)
- [ ] No duplicate of existing config
- [ ] Categories are meaningful (if multi-source)

### Submission URLs

- **Validate:** [skillseekersweb.com/configs](/configs)
- **Gallery:** [skillseekersweb.com/configs](/configs)
- **Submit Issue:** [GitHub Issues](https://github.com/yusufkaraaslan/skill-seekers-configs/issues/new)
- **Track Status:** GitHub issue created during submission

---

## See Also

- [Configuration Schema Reference](/docs/reference/config-schema) - Complete field documentation
- [Creating Custom Configs Tutorial](/docs/tutorials/creating-configs) - Step-by-step guide
- [Configuration Gallery](/configs) - Browse 27+ preset configs
- [Troubleshooting](/docs/guides/troubleshooting) - Common config issues

---

**Questions?** Open a [GitHub Discussion](https://github.com/yusufkaraaslan/Skill_Seekers/discussions) or [Issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues).
