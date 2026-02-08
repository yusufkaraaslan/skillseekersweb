---
title: Quick Start
description: Get up and running with Skill Seekers in 5 minutes - create your first AI skill from any documentation source
section: getting-started
order: 2
---

# Quick Start

Get up and running with Skill Seekers in **5 minutes**. This guide walks you through creating your first AI skill from a documentation website.

## Prerequisites

Before starting, ensure you have:

- Python 3.10 or higher installed
- A terminal/command prompt
- API key for your preferred LLM platform (Claude, Gemini, or OpenAI)

## Step 1: Install Skill Seekers

```bash
pip install skill-seekers
```

Or with uv (faster):

```bash
uv tool install skill-seekers
```

Verify the installation:

```bash
skill-seekers --version
```

You should see: `Skill Seekers v3.0.0`

## Step 2: Configure Your API Key

Set up your LLM platform API key:

```bash
skill-seekers config
```

This interactive wizard will:
1. Prompt for your API key
2. Test the connection
3. Save configuration securely

Or set it directly:

```bash
export CLAUDE_API_KEY="your-api-key-here"
```

## Step 3: Create Your First Skill

Let's scrape the documentation for a popular framework. This example uses React:

```bash
skill-seekers scrape https://react.dev --output react-skill/
```

**What happens:**
- Skill Seekers crawls the React documentation
- Extracts content from ~50-100 pages
- Structures it for AI consumption
- Takes 15-30 minutes depending on site size

**For faster results**, try a smaller site:

```bash
skill-seekers scrape https://docs.python-requests.org --output requests-skill/
```

## Step 4: Enhance with AI

Transform the scraped content into a production-ready skill:

```bash
skill-seekers enhance react-skill/ --platform claude
```

**Enhancement includes:**
- ✨ AI-optimized descriptions
- 🏷️ Smart tagging
- 📚 Curated examples
- 🔍 Better searchability

## Step 5: Upload to Your Platform

Deploy the skill to your AI platform:

```bash
skill-seekers upload react-skill/ --platform claude
```

**Result:** Your skill is now available in Claude AI for immediate use.

## Alternative: GitHub Repository

Prefer analyzing code? Extract a skill from a GitHub repo:

```bash
skill-seekers github https://github.com/owner/repo --output my-skill/
```

## Next Steps

Now that you've created your first skill:

- **[Create Your First Skill](/docs/getting-started/first-skill)** - Deep dive into skill creation
- **[Scraping Tutorial](/docs/tutorials/scraping-docs)** - Master documentation scraping
- **[CLI Reference](/docs/cli/overview)** - Explore all commands
- **[Configuration Guide](/docs/cli/config)** - Customize Skill Seekers

## Common Issues

### "API key not found"
```bash
skill-seekers config
# Or set environment variable:
export CLAUDE_API_KEY="your-key"
```

### "Site requires authentication"
Use the `--selector` option with custom CSS selectors, or check if the site provides `llms.txt` for faster access.

### "Out of API credits"
Try local enhancement (free):
```bash
skill-seekers enhance my-skill/ --method local
```

## One-Liner Complete Workflow

For the impatient, here's everything in one command:

```bash
skill-seekers scrape https://docs.python-requests.org --output requests/ && \
skill-seekers enhance requests/ --platform claude && \
skill-seekers upload requests/ --platform claude
```

**Total time:** ~20 minutes for a complete, production-ready skill.

---

💡 **Pro Tip:** Check if your target site has an `llms.txt` file (e.g., `https://docs.example.com/llms.txt`). This provides pre-structured documentation and is **10x faster** to process!
