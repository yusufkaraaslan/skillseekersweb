---
title: "Configuration Schema Reference"
description: Complete reference for Skill Seekers unified configuration format (v2.6.0)
section: reference
order: 1
---

# Configuration Schema Reference

Complete reference for the Skill Seekers unified configuration format introduced in v2.6.0.

---

## Overview

The unified config format allows you to combine multiple sources (documentation, GitHub, PDFs) into a single AI skill with intelligent content merging.

**Schema Version:** v2.6.0
**Format:** JSON
**Backward Compatible:** Yes (legacy configs still supported)

---

## Top-Level Fields

### Required Fields

#### `name` (string)
**Required** - Unique identifier for the config.

- Must be lowercase alphanumeric with hyphens or underscores
- Used as the skill filename
- Pattern: `^[a-z0-9-_]+$`

```json
{
  "name": "react"
}
```

#### `description` (string)
**Required** - Human-readable description of what the skill covers.

- Should explain when to use this skill
- Appears in skill metadata and gallery
- Recommended length: 1-2 sentences

```json
{
  "description": "Complete React knowledge combining official documentation and React codebase. Use when building React applications or understanding React internals."
}
```

#### `sources` (array)
**Required** - Array of source configurations (at least 1 required).

- Supports 3 source types: `documentation`, `github`, `pdf`
- Multiple sources are merged intelligently
- Order matters for merge conflict resolution

```json
{
  "sources": [
    { "type": "documentation", "base_url": "..." },
    { "type": "github", "repo": "..." }
  ]
}
```

### Optional Fields

#### `merge_mode` (string)
**Optional** - Content merging strategy when using multiple sources.

- **Values:** `"rule-based"` (default) | `"claude-enhanced"`
- **rule-based:** Deterministic merging based on categories
- **claude-enhanced:** AI-powered intelligent merging

```json
{
  "merge_mode": "rule-based"
}
```

---

## Source Types

### Documentation Source

Extract content from documentation websites.

#### Required Fields

- **`type`** (string) - Must be `"documentation"`
- **`base_url`** (string) - Base URL of documentation site (with `http://` or `https://`)

#### Optional Fields

##### `extract_api` (boolean)
Default: `false` - Whether to extract API reference sections separately.

```json
{
  "extract_api": true
}
```

##### `start_urls` (array of strings)
Specific URLs to start scraping from (bypasses automatic discovery).

```json
{
  "start_urls": [
    "https://docs.example.com/getting-started/",
    "https://docs.example.com/api/"
  ]
}
```

##### `selectors` (object)
CSS selectors for extracting content.

**Fields:**
- `main_content` (string) - Main documentation content
- `title` (string) - Page title
- `code_blocks` (string) - Code examples

```json
{
  "selectors": {
    "main_content": "article.docs",
    "title": "h1",
    "code_blocks": "pre code"
  }
}
```

##### `url_patterns` (object)
Control which URLs to include/exclude.

**Fields:**
- `include` (array of strings) - URL patterns to include
- `exclude` (array of strings) - URL patterns to exclude

```json
{
  "url_patterns": {
    "include": ["/docs/", "/api/", "/guide/"],
    "exclude": ["/blog/", "/changelog/"]
  }
}
```

##### `categories` (object)
Categorize pages for better organization and merging.

- Keys: category names
- Values: arrays of keywords/patterns

```json
{
  "categories": {
    "getting_started": ["intro", "installation", "quickstart"],
    "api": ["api", "reference", "methods"],
    "guides": ["tutorial", "guide", "how-to"]
  }
}
```

##### `rate_limit` (number)
Delay between requests in seconds (prevents rate limiting).

```json
{
  "rate_limit": 0.5
}
```

##### `max_pages` (number or null)
**Optional** - Maximum pages to scrape. Defaults to unlimited if not specified.

- **Omit field:** Unlimited scraping (recommended)
- **null:** Explicitly unlimited
- **-1:** Explicitly unlimited
- **Number:** Limit to specific page count

```json
{
  // Option 1: Omit for unlimited (recommended)
  // "max_pages": not specified

  // Option 2: Explicit unlimited
  "max_pages": null

  // Option 3: Limit to specific count
  // "max_pages": 300
}
```

**Note:** Since v2.6.0, unlimited scraping is the default. Only specify `max_pages` if you need to limit pages for testing or rate-limit concerns.

#### Complete Documentation Source Example

```json
{
  "type": "documentation",
  "base_url": "https://docs.astro.build/en/",
  "extract_api": true,
  "start_urls": [
    "https://docs.astro.build/en/getting-started/",
    "https://docs.astro.build/en/core-concepts/"
  ],
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "url_patterns": {
    "include": ["/en/getting-started/", "/en/core-concepts/", "/en/guides/"],
    "exclude": ["/en/community/", "/en/blog/"]
  },
  "categories": {
    "getting_started": ["getting-started", "install"],
    "core_concepts": ["project-structure", "components"],
    "integrations": ["integrations", "framework"]
  },
  "rate_limit": 0.5
}
```

---

### GitHub Source

Extract code, issues, and repository metadata from GitHub.

#### Required Fields

- **`type`** (string) - Must be `"github"`
- **`repo`** (string) - Repository in format `owner/repo`

#### Optional Fields

##### `enable_codebase_analysis` (boolean)
Default: `false` - Enable C3.x codebase analysis with AST parsing.

```json
{
  "enable_codebase_analysis": true
}
```

##### `code_analysis_depth` (string)
Depth of code analysis when C3.x is enabled.

- **Values:** `"surface"` | `"deep"` | `"full"`
- **surface:** File structure, exports, imports
- **deep:** Function signatures, class definitions
- **full:** Complete AST analysis

```json
{
  "code_analysis_depth": "deep"
}
```

##### `fetch_issues` (boolean)
Default: `false` - Include GitHub issues in the skill.

```json
{
  "fetch_issues": true
}
```

##### `max_issues` (number)
Maximum number of issues to fetch (requires `fetch_issues: true`).

```json
{
  "max_issues": 100
}
```

##### `fetch_changelog` (boolean)
Default: `false` - Extract CHANGELOG.md if it exists.

```json
{
  "fetch_changelog": true
}
```

##### `fetch_releases` (boolean)
Default: `false` - Include GitHub releases.

```json
{
  "fetch_releases": true
}
```

##### `file_patterns` (array of strings)
Glob patterns for files to analyze (requires codebase analysis).

```json
{
  "file_patterns": [
    "src/**/*.ts",
    "packages/**/*.ts",
    "core/**/*.js"
  ]
}
```

##### `ai_mode` (string)
AI enhancement mode for C3.x analysis.

- **Values:** `"auto"` | `"api"` | `"local"` | `"none"`
- **auto:** Detect best mode automatically
- **api:** Use Claude API for enhancement
- **local:** Use local models
- **none:** Skip AI enhancement

```json
{
  "ai_mode": "auto"
}
```

#### Complete GitHub Source Example

```json
{
  "type": "github",
  "repo": "withastro/astro",
  "enable_codebase_analysis": true,
  "code_analysis_depth": "deep",
  "fetch_issues": true,
  "max_issues": 100,
  "fetch_changelog": true,
  "fetch_releases": true,
  "file_patterns": [
    "packages/astro/src/**/*.ts",
    "packages/integrations/**/*.ts"
  ],
  "ai_mode": "auto"
}
```

---

### PDF Source

Extract content from PDF documents.

#### Required Fields

- **`type`** (string) - Must be `"pdf"`
- **`path`** (string) - Path to PDF file (local or remote URL)

#### Optional Fields

##### `ocr` (boolean)
Default: `false` - Enable OCR for scanned PDFs.

```json
{
  "ocr": true
}
```

##### `password` (string)
Password for encrypted PDFs.

```json
{
  "password": "secret123"
}
```

##### `extract_tables` (boolean)
Default: `false` - Extract tables as structured data.

```json
{
  "extract_tables": true
}
```

##### `parallel` (boolean)
Default: `false` - Process pages in parallel for faster extraction.

```json
{
  "parallel": true
}
```

#### Complete PDF Source Example

```json
{
  "type": "pdf",
  "path": "/path/to/manual.pdf",
  "ocr": true,
  "extract_tables": true,
  "parallel": true
}
```

---

## Complete Examples

### Single Source (Documentation Only)

```json
{
  "name": "vue",
  "description": "Vue.js 3 documentation for building reactive web applications.",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://vuejs.org/guide/",
      "selectors": {
        "main_content": "article",
        "title": "h1",
        "code_blocks": "pre code"
      },
      "rate_limit": 0.5
    }
  ]
}
```

### Multi-Source (Docs + GitHub)

```json
{
  "name": "fastapi",
  "description": "Complete FastAPI knowledge combining documentation and codebase analysis. Use for building high-performance Python APIs.",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://fastapi.tiangolo.com/",
      "extract_api": true,
      "selectors": {
        "main_content": ".md-content",
        "title": "h1",
        "code_blocks": "pre code"
      },
      "categories": {
        "getting_started": ["tutorial", "first-steps"],
        "advanced": ["advanced", "security", "database"],
        "deployment": ["deployment", "docker", "server"]
      },
      "rate_limit": 0.5
    },
    {
      "type": "github",
      "repo": "tiangolo/fastapi",
      "enable_codebase_analysis": true,
      "code_analysis_depth": "deep",
      "fetch_issues": true,
      "max_issues": 50,
      "file_patterns": [
        "fastapi/**/*.py"
      ]
    }
  ]
}
```

### Multi-Source (Docs + GitHub + PDF)

```json
{
  "name": "enterprise-system",
  "description": "Complete enterprise system documentation from multiple sources.",
  "merge_mode": "claude-enhanced",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.enterprise.com/",
      "rate_limit": 1.0
    },
    {
      "type": "github",
      "repo": "company/enterprise-system",
      "enable_codebase_analysis": true,
      "code_analysis_depth": "full",
      "file_patterns": ["src/**/*.ts", "api/**/*.ts"]
    },
    {
      "type": "pdf",
      "path": "/docs/enterprise-manual-v2.pdf",
      "extract_tables": true,
      "parallel": true
    }
  ]
}
```

---

## Validation

### Using the CLI

```bash
# Validate a config file
skill-seekers validate configs/my-config.json

# Convert legacy config to unified format
skill-seekers convert configs/legacy-config.json
```

### Using the Web Validator

Visit [skillseekersweb.com/configs](https://skillseekersweb.com/configs) and scroll to the "Validate Your Config" section:

1. Paste your JSON config
2. Click "Validate Config"
3. Fix any errors
4. Submit to GitHub when valid

---

## Legacy Config Support

Skill Seekers v2.6.0+ still supports legacy configs (single-source format).

**Legacy format:**
```json
{
  "name": "example",
  "description": "Example docs",
  "base_url": "https://docs.example.com",
  "selectors": { "main_content": "article" }
}
```

**Automatically converts to:**
```json
{
  "name": "example",
  "description": "Example docs",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.example.com",
      "selectors": { "main_content": "article" }
    }
  ]
}
```

---

## Best Practices

### 1. Naming Conventions
- Use lowercase with hyphens: `fast-api`, `react-router`
- Match the official framework name when possible
- Be descriptive: `godot-game-engine` not just `godot`

### 2. Description Guidelines
- Explain what knowledge the skill covers
- Include when to use the skill
- Keep it concise (1-2 sentences)
- Use action verbs: "Use when building...", "Helps with..."

### 3. Multi-Source Configs
- Order sources by authority (official docs first, then GitHub)
- Use `merge_mode: "rule-based"` for deterministic results
- Use `merge_mode: "claude-enhanced"` for complex merging
- Define clear categories for better merging

### 4. Rate Limiting
- Start with `rate_limit: 0.5` (500ms delay)
- Increase if you get rate-limited
- Official docs: 0.5-1.0 seconds
- Community sites: 1.0-2.0 seconds

### 5. Page Limits
- **Default:** Unlimited scraping (recommended for complete documentation)
- **When to limit:** Testing configs, respecting aggressive rate limits
- **How to limit:** Set `"max_pages": 100` for specific page count
- **Unlimited modes:** Omit field, use `null`, or use `-1`

### 6. GitHub Codebase Analysis
- Use `code_analysis_depth: "deep"` for most cases
- Use `"full"` only for critical framework analysis
- Limit `file_patterns` to relevant directories
- Set `max_issues` to avoid overwhelming content

---

## Migration from Legacy Configs

If you have legacy configs (pre-v2.6.0), you can:

### Option 1: Automatic Conversion
```bash
skill-seekers convert configs/legacy-config.json > configs/new-config.json
```

### Option 2: Manual Migration

**Old (legacy):**
```json
{
  "name": "django",
  "base_url": "https://docs.djangoproject.com/en/stable/",
  "selectors": { "main_content": "div.document" }
}
```

**New (unified):**
```json
{
  "name": "django",
  "description": "Django web framework documentation",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.djangoproject.com/en/stable/",
      "selectors": { "main_content": "div.document" }
    }
  ]
}
```

---

## See Also

- [Creating Custom Configs Tutorial](/docs/tutorials/creating-configs) - Step-by-step guide
- [Unified Scraping Guide](/docs/manual/scraping/unified-scraping) - Multi-source scraping
- [C3.x Codebase Analysis](/docs/manual/codebase-analysis/c3x-codebase-analysis) - GitHub analysis features
- [Configuration Gallery](/configs) - 27+ preset configs

---

**Schema Version:** v2.6.0
**Last Updated:** January 2026
**Backward Compatible:** Yes (legacy configs supported)
