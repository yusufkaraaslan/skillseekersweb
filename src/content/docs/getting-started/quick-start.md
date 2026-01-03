---
title: Quick Start
description: Create your first Claude AI skill in 5 minutes
section: getting-started
order: 3
---

# Quick Start Guide

Create your first Claude AI skill in just 5 minutes!

## Prerequisites

- Python 3.10+ installed
- Skill Seekers installed (`pip install skill-seekers`)
- Internet connection

## Step 1: Scrape Documentation (2 minutes)

Let's create a skill from the Astro documentation:

```bash
skill-seekers scrape https://docs.astro.build/en/getting-started/
```

**What happens:**
- Skill Seekers crawls the documentation
- Extracts content, code examples, and structure
- Organizes everything into categorized files
- Saves to `output/astro/`

**Output:**
```
✓ Scraped 42 pages
✓ Extracted 156 code examples
✓ Organized into 8 categories
✓ Saved to output/astro/
```

## Step 2: Package for Claude (1 minute)

Package the scraped content into a Claude-ready format:

```bash
skill-seekers package output/astro/
```

**What happens:**
- Creates a `.zip` file with all content
- Generates YAML metadata
- Optimizes for Claude's context window
- Ready for upload!

**Output:**
```
✓ Packaged astro.zip (2.4 MB)
✓ Ready for upload to Claude
```

## Step 3: Upload to Claude (1 minute)

Upload your skill to Claude:

```bash
skill-seekers upload astro.zip
```

**What happens:**
- Authenticates with Claude API
- Uploads skill package
- Registers skill in your account

**Output:**
```
✓ Uploaded to Claude
✓ Skill ID: skill_abc123xyz
✓ Ready to use!
```

## That's It!

You now have a comprehensive Astro skill in Claude. Try asking Claude:
- "How do I set up Astro?"
- "Show me an example of content collections"
- "What's the difference between SSR and SSG in Astro?"

## Next Steps

### Enhance with AI

Add AI-powered summaries and examples:

```bash
export ANTHROPIC_API_KEY="your-key-here"
skill-seekers enhance output/astro/
```

### Try More Sources

**GitHub repositories:**
```bash
skill-seekers github facebook/react
```

**PDF files:**
```bash
skill-seekers pdf path/to/documentation.pdf
```

**Multiple sources (unified):**
```bash
skill-seekers unified my-config.json
```

### Use Pre-built Configs

Browse 27 ready-to-use configurations:

```bash
# Visit /configs to download
wget https://api.skillseekersweb.com/api/download/godot.json
skill-seekers unified godot.json
```

## Common Issues

### "Permission denied"

Install with `--user` flag:
```bash
pip install --user skill-seekers
```

### "API key not found"

Set your API key:
```bash
export ANTHROPIC_API_KEY="your-key-here"
```

### "Too many pages"

Limit pages during scraping:
```bash
skill-seekers scrape https://docs.example.com --max-pages 100
```

## Learn More

- [Full Installation Guide](/docs/getting-started/installation)
- [Features Overview](/docs/getting-started/overview)
- [Browse Configs](/configs)
- [CLI Reference](/docs/getting-started/installation)
