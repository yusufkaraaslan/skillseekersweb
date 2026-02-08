---
title: "Tutorial: Creating Custom Configs"
description: Step-by-step tutorial for creating custom configuration files for any documentation website
section: tutorials
order: 5
---

# Tutorial: Creating Custom Configs

Learn how to create custom configuration files for documentation websites not covered by presets.

**Time:** 15-30 minutes | **Level:** Intermediate | **Result:** Working custom config

---

## Why Create Custom Configs?

While Skill Seekers includes 24 preset configs for popular frameworks, you'll often need to scrape documentation for:

- Internal company documentation
- Niche or emerging frameworks
- Private documentation portals
- Specific versions of frameworks

**Benefits of custom configs:**
- ✅ Reusable - Create once, use many times
- ✅ Shareable - Submit to community gallery
- ✅ Version controlled - Track changes over time
- ✅ Team-friendly - Share with your organization

---

## Method 1: Interactive Config Creation (Recommended)

The easiest way to create a config is using interactive mode:

```bash
skill-seekers scrape --interactive
```

**Step-by-step process:**

### Step 1: Enter Base URL

```
📍 Enter the documentation base URL:
→ https://docs.my-framework.com/
```

**Tips:**
- Use the root documentation URL
- Include trailing slash
- Make sure the URL is publicly accessible

### Step 2: Test Content Selectors

The scraper will suggest CSS selectors. Test and refine:

```
🎯 Testing selectors on https://docs.my-framework.com/guide/intro

Suggested content selector: "article.main-content"
✅ Found: Main article content
✅ Length: 2,450 characters
✅ Code blocks: 3 detected

Is this correct? (y/n/custom)
→ y
```

**Common selectors by documentation platform:**

| Platform | Content Selector | Title Selector |
|----------|-----------------|----------------|
| Docusaurus | `.theme-doc-markdown` | `h1` |
| GitBook | `.page-content` | `h1` |
| ReadTheDocs | `.document` | `h1` |
| MkDocs | `.md-content` | `h1` |
| VuePress | `.theme-default-content` | `h1` |

### Step 3: Verify Extracted Content

Review a sample page:

```
📄 Preview extracted content:

Title: Getting Started
Content preview:
━━━━━━━━━━━━━━━━━━━━
# Getting Started

MyFramework is a powerful tool for...

## Installation

```bash
npm install my-framework
```
━━━━━━━━━━━━━━━━━━━━

✅ Content looks good!
```

### Step 4: Configure URL Patterns

Define which pages to include:

```
🔗 URL Patterns (regex):

Include patterns:
1. ^https://docs.my-framework.com/guide/
2. ^https://docs.my-framework.com/api/

Exclude patterns:
1. /blog/
2. /changelog/

Add more? (y/n)
→ n
```

### Step 5: Save Config

```
💾 Save configuration:

Config name: my-framework
Save to: configs/my-framework.json

✅ Config saved!
```

---

## Method 2: Manual Config Creation

For advanced users, create configs manually:

### Basic Config Structure

Create `configs/my-framework.json`:

```json
{
  "name": "my-framework",
  "base_url": "https://docs.my-framework.com/",
  "selectors": {
    "content": "article.documentation",
    "title": "h1.page-title",
    "code": "pre code"
  },
  "url_patterns": [
    "^https://docs.my-framework.com/guide/",
    "^https://docs.my-framework.com/api/"
  ],
  "exclude_patterns": [
    "/changelog/",
    "/blog/",
    "/search"
  ],
  "max_pages": 200,
  "rate_limit": 0.5
}
```

### Advanced Config Options

```json
{
  "name": "my-framework-advanced",
  "base_url": "https://docs.my-framework.com/",
  
  "selectors": {
    "content": "article.documentation",
    "title": "h1.page-title",
    "code": "pre code",
    "category": ".breadcrumb",
    "description": "meta[name='description']"
  },
  
  "url_patterns": [
    "^https://docs.my-framework.com/guide/",
    "^https://docs.my-framework.com/api/",
    "^https://docs.my-framework.com/tutorials/"
  ],
  
  "exclude_patterns": [
    "/changelog/",
    "/blog/",
    "/search",
    "\\?utm_",
    "#comments"
  ],
  
  "max_pages": 500,
  "rate_limit": 0.5,
  "async_mode": true,
  "max_concurrent": 5,
  
  "llms_txt": {
    "enabled": true,
    "urls": [
      "https://docs.my-framework.com/llms-full.txt",
      "https://docs.my-framework.com/llms.txt"
    ]
  },
  
  "enhancement": {
    "enabled": true,
    "method": "local",
    "skip_sections": ["changelog", "deprecated"]
  }
}
```

---

## Testing Your Config

### Estimate Page Count

Before full scraping, estimate the scope:

```bash
skill-seekers estimate --config configs/my-framework.json
```

**Example output:**
```
📊 Estimation Results:
   - Estimated pages: 127
   - Average page size: 15.4 KB
   - Estimated time: 8-12 minutes
   - API enhancement cost: ~$0.18
```

### Test Run

Scrape a small subset to verify:

```bash
skill-seekers scrape \
  --config configs/my-framework.json \
  --max-pages 10 \
  --output output/test/
```

**Review the output:**
```bash
# Check structure
ls -la output/test/

# Review SKILL.md
head -100 output/test/SKILL.md

# Check extracted content
cat output/test/references/guide/intro.md
```

### Validate Quality

Run quality checks:

```bash
skill-seekers validate --config configs/my-framework.json
```

---

## Debugging Config Issues

### Issue: "No pages found"

**Causes & Solutions:**

1. **Incorrect URL patterns**
   ```bash
   # Debug: List discovered URLs
   skill-seekers scrape --config my-framework.json --dry-run
   ```

2. **Too restrictive exclude patterns**
   ```json
   // Remove overly broad patterns
   "exclude_patterns": [
     // ❌ Too broad - excludes everything
     // "/"
     
     // ✅ Specific exclusions
     "/blog/",
     "/search"
   ]
   ```

3. **Content selector not matching**
   ```bash
   # Test selector manually
   skill-seekers test-selector \
     --url https://docs.my-framework.com/guide/ \
     --selector "article.content"
   ```

### Issue: "Wrong content extracted"

**Use more specific selectors:**

```json
{
  "selectors": {
    // ❌ Too generic - catches navigation
    "content": "div",
    
    // ✅ Specific - targets main content
    "content": "main article.prose",
    
    // ✅ Even better - exclude navigation elements
    "content": "article.main-content:not(.sidebar):not(.nav)"
  }
}
```

### Issue: "Too many pages"

**Limit scope:**

```json
{
  "max_pages": 50,
  "url_patterns": [
    // Only specific sections
    "^https://docs.my-framework.com/guide/",
    "^https://docs.my-framework.com/api/core/"
  ],
  "exclude_patterns": [
    // Exclude versioned docs
    "/v1/",
    "/v2/",
    "/deprecated/"
  ]
}
```

---

## Sharing Your Config

### Submit to Community Gallery

```bash
# Submit via CLI
skill-seekers submit-config \
  --config configs/my-framework.json \
  --description "My Framework v3.x documentation"
```

**Or via GitHub:**
1. Fork the Skill Seekers repository
2. Add your config to `configs/`
3. Submit a Pull Request

### Share with Your Team

**Git-based sharing:**
```bash
# Add to your team's config repo
git clone git@github.com:yourcompany/skill-seekers-configs.git
cp configs/my-framework.json skill-seekers-configs/
git add .
git commit -m "Add My Framework config"
git push
```

**Usage:**
```bash
skill-seekers scrape --config-source git@github.com:yourcompany/skill-seekers-configs.git
```

---

## Best Practices

### ✅ Do's

- **Start small** - Test with `--max-pages 10` first
- **Use specific selectors** - Avoid generic tags like `div`
- **Test incrementally** - Verify each change
- **Document your config** - Add comments for complex selectors
- **Version your configs** - Include framework version in name

### ❌ Don'ts

- Don't use overly broad URL patterns
- Don't exclude too aggressively
- Don't forget to test code block extraction
- Don't commit configs with hardcoded API keys

---

## Example: Complete Custom Config

Here's a real-world example for an internal framework:

```json
{
  "name": "acme-platform-v2",
  "version": "2.3.1",
  "description": "Acme Platform v2.x internal documentation",
  
  "base_url": "https://internal-docs.acme.com/platform/",
  
  "selectors": {
    "content": "div.documentation-content",
    "title": "h1.doc-title",
    "code": "pre > code",
    "category": "nav.breadcrumb"
  },
  
  "url_patterns": [
    "^https://internal-docs.acme.com/platform/guide/",
    "^https://internal-docs.acme.com/platform/api/",
    "^https://internal-docs.acme.com/platform/tutorials/"
  ],
  
  "exclude_patterns": [
    "/archive/",
    "/draft/",
    "/preview/",
    "\\?draft=true"
  ],
  
  "max_pages": 300,
  "rate_limit": 1.0,
  "async_mode": true,
  "request_timeout": 30,
  
  "headers": {
    "User-Agent": "SkillSeekers/3.0.0 (internal-scraper)"
  },
  
  "enhancement": {
    "enabled": true,
    "method": "local",
    "platform": "claude"
  }
}
```

---

## Quick Reference

**Essential commands:**
```bash
# Interactive creation
skill-seekers scrape --interactive

# Estimate scope
skill-seekers estimate --config my-framework.json

# Test run
skill-seekers scrape --config my-framework.json --max-pages 10

# Full scrape
skill-seekers scrape --config my-framework.json

# Validate config
skill-seekers validate --config my-framework.json

# Submit to gallery
skill-seekers submit-config --config my-framework.json
```

---

## Next Steps

- [Config Schema Reference](/docs/reference/config-schema) - All available options
- [Troubleshooting Guide](/docs/guides/troubleshooting) - Common issues
- [Submit Config Guide](/docs/guides/submit-config) - Share with community

**Need help?** Open an issue: https://github.com/yusufkaraaslan/Skill_Seekers/issues
