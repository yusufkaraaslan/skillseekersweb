---
title: Submit a Configuration
description: Step-by-step guide to submitting your custom configuration to the Skill Seekers gallery
section: guides
order: 10
---

# Submit a Configuration

Have you created a configuration for a framework or documentation site that's not in our gallery? Share it with the community! This guide walks you through the entire submission process.

## Overview

The submission process uses **GitHub Issues** as our review queue. This approach:
- Provides transparency (you can track your submission)
- Enables community discussion and feedback
- Integrates with our existing workflow
- Requires no account creation (just GitHub)

**Time Required:** 5-10 minutes

## Prerequisites

- A GitHub account
- A valid Skill Seekers configuration file (`.json`)
- Test results showing your config works

## Step-by-Step Guide

### Step 1: Create and Test Your Config

Before submitting, ensure your configuration works correctly:

```bash
# Test with estimate (doesn't scrape, just counts)
skill-seekers estimate --config your-config.json

# Test with limited scraping (1-5 pages)
skill-seekers scrape --config your-config.json --max-pages 5 \
  --output test-skill.md

# Verify the output looks correct
cat test-skill.md
```

### Step 2: Open the Config Gallery

Navigate to the [Configuration Gallery](/configs) on skillseekersweb.com and scroll down to the **"Share Your Config"** section.

### Step 3: Validate Your Configuration

1. **Copy your config file content** (the entire JSON)

2. **Paste it into the validator** text area

3. **Click "Validate Config"** button

The validator will check for:
- Valid JSON syntax
- Required fields (`name`, `description`, `base_url`, `selectors`)
- Proper name format (lowercase, alphanumeric, hyphens/underscores)
- Valid URL format (starts with `http://` or `https://`)
- Complete selector structure

**Common Validation Errors:**

| Error | Fix |
|-------|-----|
| `name must be lowercase` | Change `"ReactDocs"` to `"react-docs"` |
| `base_url must start with http://` | Add protocol: `"https://example.com"` |
| `selectors must have "main_content"` | Add selector: `"main_content": "article"` |
| `Invalid JSON format` | Check for missing commas, quotes, or brackets |

### Step 4: Copy and Submit to GitHub

Once validation passes:

1. **Click "Copy & Submit to GitHub"** button
   - Your config is copied to clipboard
   - GitHub issue page opens in new tab

2. **Fill in the GitHub issue template:**
   - **Framework/Tool Name:** (e.g., "React Documentation")
   - **Category:** Choose from: `frontend`, `backend`, `database`, `ai-ml`, `devops`, `mobile`, `testing`, `other`
   - **Configuration JSON:** Paste your config (already in clipboard)
   - **Testing Results:** Describe what you tested

3. **Complete the checklist:**
   ```markdown
   - [x] Config tested with `skill-seekers estimate`
   - [x] Config tested with limited scraping (1-5 pages)
   - [x] Selectors extract content correctly (no empty sections)
   - [x] Config name follows naming convention (lowercase-with-hyphens)
   ```

4. **Submit the issue**

### Step 5: Review Process

After submission:

1. **Automated checks** (if configured):
   - JSON validation
   - Required fields check
   - URL accessibility test

2. **Manual review** (24-48 hours):
   - Test config against live documentation
   - Verify selectors extract content correctly
   - Check for duplicates or similar configs
   - Ensure quality meets gallery standards

3. **Feedback or approval:**
   - If changes needed, we'll comment on your issue
   - If approved, config is added to gallery
   - You're credited as contributor!

## Configuration Best Practices

### Naming Convention

**Format:** `framework-docs` or `tool-name`

**Good examples:**
- `react-docs`
- `vue-3-docs`
- `fastapi-docs`
- `godot-4-docs`

**Bad examples:**
- `ReactDocs` (uppercase)
- `react docs` (space)
- `react_documentation_v3.2` (too verbose)

### Description Guidelines

Write a clear, concise description (1-2 sentences):

**Good:**
> "Official React documentation covering hooks, components, and API reference"

**Bad:**
> "React docs" (too short)
> "This is the official documentation for React which is a JavaScript library for building user interfaces..." (too long)

### Selector Strategy

Choose selectors that are:
- **Stable** (unlikely to change with redesigns)
- **Specific** (target content, not layout)
- **Consistent** (work across all pages)

**Example:**
```json
{
  "selectors": {
    "main_content": "article.documentation",
    "title": "h1.page-title",
    "code_blocks": "pre code",
    "navigation": "nav.sidebar",
    "remove": [".ads", ".newsletter-signup", "footer"]
  }
}
```

### URL Patterns

Use `url_patterns` to control what gets scraped:

```json
{
  "url_patterns": {
    "include": [
      "/docs/*",
      "/api/*",
      "/guide/*"
    ],
    "exclude": [
      "/blog/*",
      "/community/*",
      "*/changelog*"
    ]
  }
}
```

### Rate Limiting

Be respectful of documentation sites:

```json
{
  "rate_limit": 0.5,  // 500ms between requests (2 pages/sec)
  "max_pages": 100    // Reasonable limit for most docs
}
```

For large documentation sites (1000+ pages), increase `rate_limit` to 1.0 or higher.

## Example Configuration

Here's a complete example for reference:

```json
{
  "name": "astro-docs",
  "description": "Official Astro documentation covering core concepts, recipes, and API reference",
  "base_url": "https://docs.astro.build",
  "selectors": {
    "main_content": "article.content",
    "title": "h1",
    "code_blocks": "pre code",
    "navigation": "nav.sidebar",
    "remove": [".aside", ".callout-advertisement"]
  },
  "url_patterns": {
    "include": ["/en/*"],
    "exclude": ["/blog/*", "/showcase/*"]
  },
  "categories": {
    "getting-started": ["install", "tutorial", "core-concepts"],
    "guides": ["recipes", "guides"],
    "reference": ["reference", "api"]
  },
  "rate_limit": 0.5,
  "max_pages": 200
}
```

## Troubleshooting

### Config Fails Validation

**Problem:** "Invalid JSON format"
- **Solution:** Use a JSON validator (jsonlint.com) to find syntax errors
- Common issues: missing comma, trailing comma, unquoted keys

**Problem:** "selectors must have main_content"
- **Solution:** Add all required selectors: `main_content`, `title`, `code_blocks`
- These are essential for content extraction

### GitHub Issue Won't Open

**Problem:** Button doesn't work
- **Solution:** Check if popup blocker is enabled
- Allow popups for skillseekersweb.com
- Or manually navigate to: [Skill_Seekers Issues](https://github.com/yusufkaraaslan/Skill_Seekers/issues/new?template=submit-config.md)

### Config Works Locally but Fails Review

**Problem:** Reviewers report empty content
- **Solution:** Selectors may be too specific or site structure changed
- Test with current live site (not cached version)
- Check if site requires JavaScript rendering (not supported)

## FAQ

**Q: Can I submit multiple configs at once?**
A: Yes! Create separate GitHub issues for each config. This helps us track and review them individually.

**Q: What if a config already exists for my framework?**
A: Check the gallery first. If yours is better (more comprehensive selectors, better categorization), submit it with a note explaining the improvements.

**Q: Can I update my submitted config?**
A: Yes! Comment on your original GitHub issue with the updated config and explain what changed.

**Q: How long until my config appears in the gallery?**
A: Typically 24-48 hours after approval. We batch-deploy updates to keep the gallery stable.

**Q: Do I get credited for my submission?**
A: Absolutely! Your GitHub username is listed as a contributor in the config metadata.

**Q: What if the documentation site requires authentication?**
A: Currently, configs requiring authentication aren't supported. Submit an issue on GitHub to request this feature.

## Getting Help

If you encounter issues or have questions:

1. **Check existing configs** in the gallery for examples
2. **Search GitHub issues** for similar questions
3. **Ask on Discord** (if available) for community help
4. **Create a GitHub issue** with the `question` label

## Next Steps

After your config is approved:

- Check out the [gallery](/configs) to see it live
- Consider contributing more configs for other frameworks
- Share your config creation experience on social media
- Help review other submissions (advanced contributors)

---

**Ready to submit?** Head to the [Config Gallery](/configs) and share your configuration with the community!
