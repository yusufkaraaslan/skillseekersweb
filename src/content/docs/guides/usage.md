---
title: Complete Usage Guide
description: Comprehensive reference for all Skill Seekers commands, options, and workflows - from scraping to packaging
section: guides
order: 6
---

# Complete Usage Guide for Skill Seeker

Comprehensive reference for all commands, options, and workflows.

## Quick Reference

```bash
# 1. Estimate pages (fast, 1-2 min)
skill-seekers estimate configs/react.json

# 2. Scrape documentation (20-40 min)
skill-seekers scrape --config configs/react.json

# 3. Enhance with AI (60 sec)
skill-seekers enhance output/react/

# 4. Package to .zip (instant)
skill-seekers package output/react/

# 5. Upload to platform
skill-seekers upload output/react.zip
```

---

## Main Commands

### Scrape Documentation

```bash
skill-seekers scrape [OPTIONS]
```

**Options:**
- `--config CONFIG` - Load configuration from file
- `--interactive, -i` - Interactive configuration mode
- `--name NAME` - Skill name
- `--url URL` - Base documentation URL
- `--description DESC` - Skill description
- `--skip-scrape` - Skip scraping, use existing data
- `--dry-run` - Preview without scraping
- `--enhance` - Enhance with Claude API after scraping
- `--enhance-local` - Enhance with Claude Code (no API key)

**Examples:**

**1. Use Preset Config (Recommended)**
```bash
skill-seekers scrape --config configs/godot.json
skill-seekers scrape --config configs/react.json
```

**2. Interactive Mode**
```bash
skill-seekers scrape --interactive
# Wizard walks you through all options
```

**3. Quick Mode**
```bash
skill-seekers scrape \
  --name react \
  --url https://react.dev/ \
  --description "React framework"
```

**4. With Local Enhancement**
```bash
skill-seekers scrape --config configs/react.json --enhance-local
# Scrapes + enhances in one command
```

---

### Estimate Pages

```bash
skill-seekers estimate CONFIG [OPTIONS]
```

**Options:**
- `--max-discovery, -m` - Maximum pages to discover (default: 1000)
- `--timeout, -t` - HTTP timeout in seconds (default: 30)

**Examples:**

```bash
# Quick estimate (100 pages)
skill-seekers estimate configs/react.json --max-discovery 100

# Standard estimate
skill-seekers estimate configs/godot.json

# Deep estimate (2000 pages)
skill-seekers estimate configs/vue.json --max-discovery 2000
```

---

### Enhance Skills

```bash
skill-seekers enhance INPUT_DIR [OPTIONS]
```

**Options:**
- `--api-key KEY` - Anthropic API key (or use ANTHROPIC_API_KEY env)
- `--local` - Use Claude Code instead of API (no key needed)

**Examples:**

**Local Enhancement (No API key)**
```bash
skill-seekers enhance output/react/
# Uses Claude Code Max plan - free!
```

**API Enhancement**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/

# Or with inline key
skill-seekers enhance output/godot/ --api-key sk-ant-...
```

---

### Package Skills

```bash
skill-seekers package INPUT_DIR [OPTIONS]
```

**Options:**
- `--target PLATFORM` - Target platform: claude, gemini, openai, markdown
- `--output FILE` - Custom output filename

**Examples:**

```bash
# Package for Claude (default)
skill-seekers package output/react/

# Package for all platforms
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown
```

---

### Upload Skills

```bash
skill-seekers upload PACKAGE_FILE [OPTIONS]
```

**Options:**
- `--target PLATFORM` - Target platform: claude, gemini, openai

**Examples:**

```bash
# Upload to Claude
skill-seekers upload output/react.zip

# Upload to Gemini
skill-seekers upload output/react-gemini.tar.gz --target gemini

# Upload to OpenAI
skill-seekers upload output/react-openai.zip --target openai
```

---

## Available Configs

### Preset Configs (Ready to Use)

| Config | Framework | Pages | Description |
|--------|-----------|-------|-------------|
| `godot.json` | Godot Engine | ~500 | Game engine documentation |
| `react.json` | React | ~300 | React framework docs |
| `vue.json` | Vue.js | ~250 | Vue.js framework docs |
| `django.json` | Django | ~400 | Django web framework |
| `fastapi.json` | FastAPI | ~200 | FastAPI Python framework |

**View all configs:**
```bash
ls configs/
```

---

## Common Workflows

### Workflow 1: Use Preset (Fastest)

```bash
# 1. Estimate (optional, 1-2 min)
skill-seekers estimate configs/react.json

# 2. Scrape with local enhancement (25 min)
skill-seekers scrape --config configs/react.json --enhance-local

# 3. Package (instant)
skill-seekers package output/react/

# Result: output/react.zip ready to upload!
```

### Workflow 2: Custom Documentation

```bash
# 1. Create config
cat > configs/my-docs.json << 'EOF'
{
  "name": "my-docs",
  "base_url": "https://docs.example.com/",
  "description": "My documentation site",
  "rate_limit": 0.5,
  "max_pages": 200
}
EOF

# 2. Estimate
skill-seekers estimate configs/my-docs.json

# 3. Dry-run test
skill-seekers scrape --config configs/my-docs.json --dry-run

# 4. Full scrape
skill-seekers scrape --config configs/my-docs.json

# 5. Enhance
skill-seekers enhance output/my-docs/

# 6. Package
skill-seekers package output/my-docs/
```

### Workflow 3: Rebuild from Cache

```bash
# Already scraped once?
# Skip re-scraping, just rebuild
skill-seekers scrape --config configs/godot.json --skip-scrape

# Try new enhancement
skill-seekers enhance output/godot/

# Re-package
skill-seekers package output/godot/
```

---

## Output Structure

```
output/
├── {name}_data/              # Scraped raw data (cached)
│   ├── pages/
│   │   ├── page_0.json
│   │   └── ...
│   └── summary.json          # Scraping stats
│
└── {name}/                   # Built skill directory
    ├── SKILL.md              # Main skill file
    ├── SKILL.md.backup       # Backup (if enhanced)
    ├── references/           # Categorized docs
    │   ├── index.md
    │   ├── getting_started.md
    │   └── ...
    ├── scripts/              # Empty (user scripts)
    └── assets/               # Empty (user assets)
```

---

## Configuration File Structure

```json
{
  "name": "react",
  "base_url": "https://react.dev/",
  "description": "React - JavaScript library for building UIs",
  "start_urls": [
    "https://react.dev/learn",
    "https://react.dev/reference/react"
  ],
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "url_patterns": {
    "include": ["/learn/", "/reference/"],
    "exclude": ["/blog/", "/community/"]
  },
  "categories": {
    "getting_started": ["learn", "tutorial", "intro"],
    "api": ["reference", "api", "hooks"],
    "guides": ["guide"]
  },
  "rate_limit": 0.5,
  "max_pages": 300
}
```

---

## Troubleshooting

### "Rate limit exceeded"

```bash
# Increase rate_limit in config
{
  "rate_limit": 1.0  # Wait longer between requests
}
```

### "No content extracted"

```bash
# Wrong selectors - test with browser dev tools
# Common selectors:
"main_content": "article"
"main_content": "main"
"main_content": ".content"
```

### "Enhancement fails"

```bash
# Local enhancement - ensure Claude Code is running

# API enhancement - verify API key
echo $ANTHROPIC_API_KEY

# Or use inline
skill-seekers enhance output/react/ --api-key sk-ant-...
```

---

## Environment Variables

```bash
# Anthropic API key (for API enhancement)
export ANTHROPIC_API_KEY=sk-ant-...

# Google API key (for Gemini)
export GOOGLE_API_KEY=AIzaSy...

# OpenAI API key
export OPENAI_API_KEY=sk-proj-...
```

---

## Next Steps

- [CLI Reference](/docs/cli/overview) - Detailed command documentation
- [Troubleshooting](/docs/guides/troubleshooting) - Common issues
- [Upload Guide](/docs/guides/upload-guide) - Multi-platform upload
- [Features](/docs/features/three-stream-architecture) - Advanced features
