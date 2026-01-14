---
title: Create Your First Skill
description: Quick hands-on tutorial to create your first AI skill in 5 minutes using Skill Seekers
section: getting-started
order: 3
---

# Create Your First Skill

Learn by doing! This tutorial walks you through creating your first AI skill from documentation in just 5 minutes.

**Prerequisites:** Skill Seekers installed ([Installation Guide](/docs/getting-started/installation))

**Time:** 5 minutes | **Result:** Working Claude skill ready to upload

---

## What We'll Build

We'll create a skill from **Tailwind CSS documentation** because it's:
- Small (~50 pages) - quick to scrape
- Well-structured - demonstrates good results
- Useful - a skill you'll actually use

**Final result:** A Claude skill that knows Tailwind CSS utilities, components, and best practices.

---

## Step 1: Check Your Installation

Make sure Skill Seekers is ready:

```bash
skill-seekers --version
```

You should see something like: `Skill Seekers v2.6.0`

**If not installed:** See [Installation Guide](/docs/getting-started/installation)

---

## Step 2: Scrape the Documentation

Run this single command:

```bash
skill-seekers scrape https://tailwindcss.com/docs/installation --max-pages 50
```

**What happens:**
1. **llms.txt check** - Looks for AI-optimized docs (10x faster if available)
2. **BFS traversal** - Crawls all documentation pages
3. **Smart categorization** - Organizes content into sections
4. **Code detection** - Identifies and formats code examples
5. **SKILL.md generation** - Creates main skill file

**Progress output:**
```
🔍 Checking for llms.txt...
📥 Scraping documentation...
   ├─ Page 1/50: Installation
   ├─ Page 2/50: Editor Setup
   ├─ Page 3/50: Utility-First Fundamentals
   ...
   └─ Page 50/50: Plugin API

✅ Skill created: output/tailwindcss/SKILL.md
📊 Statistics:
   - Pages: 50
   - Code examples: 127
   - Categories: 8
   - Time: 45 seconds
```

---

## Step 3: Review What Was Created

Check the output:

```bash
ls output/tailwindcss/
```

**You should see:**
```
output/tailwindcss/
├── SKILL.md                    # Main skill file (250-400 lines)
├── references/                 # Detailed documentation
│   ├── utilities/
│   │   ├── layout.md
│   │   ├── flexbox.md
│   │   └── spacing.md
│   ├── components/
│   │   └── forms.md
│   └── configuration/
│       └── theme.md
└── examples/                   # Code examples extracted
    ├── custom-colors.md
    └── responsive-design.md
```

**Preview the skill:**
```bash
head -50 output/tailwindcss/SKILL.md
```

---

## Step 4: Enhance with AI (Optional)

Transform from basic (3/10) to comprehensive (9/10):

**Option A: Local Enhancement (FREE with Claude Max)**
```bash
skill-seekers enhance output/tailwindcss/
```

Uses your Claude Max subscription - no API costs!

**Option B: API Enhancement (Fast)**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
skill-seekers enhance output/tailwindcss/ --mode api
```

**Cost:** ~$0.10-$0.20

**What enhancement does:**
- Summarizes key concepts
- Extracts best practices
- Identifies common patterns
- Creates quick reference sections
- Improves organization

**Time:** 30-60 seconds

---

## Step 5: Package the Skill

Package for Claude AI:

```bash
skill-seekers package output/tailwindcss/ --target claude
```

**Output:**
```
✅ Packaged: tailwindcss-claude.zip (1.8 MB)
📦 Format: Claude AI (YAML frontmatter)
📄 Files: 1 SKILL.md + 45 references
🎯 Ready to upload!
```

**For other platforms:**
```bash
# Google Gemini
skill-seekers package output/tailwindcss/ --target gemini

# OpenAI ChatGPT
skill-seekers package output/tailwindcss/ --target openai

# Generic Markdown
skill-seekers package output/tailwindcss/ --target markdown
```

---

## Step 6: Upload to Claude

**Automatic Upload:**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
skill-seekers upload tailwindcss-claude.zip --target claude
```

**Manual Upload:**
1. Open [Claude.ai](https://claude.ai)
2. Start a new conversation
3. Click "Add Knowledge" (📎 icon)
4. Upload `tailwindcss-claude.zip`
5. Done!

---

## Step 7: Test Your Skill

Try these prompts in Claude:

```
"What are the Tailwind spacing utilities?"

"Show me how to create a responsive navbar with Tailwind"

"What's the difference between px-4 and p-4?"

"Create a card component using Tailwind utilities"
```

**Result:** Claude responds with accurate, context-aware answers based on official Tailwind documentation!

---

## What You Just Learned

**Skills covered:**
- ✅ How to scrape documentation websites
- ✅ How to review generated skills
- ✅ How to enhance with AI (optional)
- ✅ How to package for different platforms
- ✅ How to upload to Claude

**Time investment:** 5 minutes (10-15 with enhancement)

**Result:** Production-quality AI skill ready to use!

---

## Try These Next

Now that you know the basics, try:

### 1. Use a Preset Configuration

Skill Seekers includes 24 presets for popular frameworks:

```bash
# List available presets
skill-seekers list-configs

# Try React
skill-seekers scrape --config react --max-pages 100

# Try Vue
skill-seekers scrape --config vue --max-pages 100

# Try Django
skill-seekers scrape --config django --max-pages 150
```

### 2. Scrape a GitHub Repository

Add code analysis to your skills:

```bash
skill-seekers github facebook/react --local-repo-path /path/to/react
```

**See:** [Analyzing GitHub Tutorial](/docs/tutorials/analyzing-github)

### 3. Extract from PDFs

Turn technical PDFs into searchable skills:

```bash
skill-seekers pdf --input manual.pdf --ocr
```

**See:** [Extracting PDFs Tutorial](/docs/tutorials/extracting-pdfs)

### 4. Create Multi-Source Skills

Combine docs + GitHub + PDFs:

```bash
skill-seekers unified --config django-complete.json
```

**See:** [Multi-Source Tutorial](/docs/tutorials/multi-source-skills)

---

## Common Issues

### "No pages found"

**Problem:** Scraper couldn't find content

**Solution:** Use interactive mode to test selectors:
```bash
skill-seekers scrape https://your-site.com/docs --interactive
```

### "Scraping too slow"

**Solutions:**
```bash
# Use async mode (2-3x faster)
skill-seekers scrape URL --async

# Reduce pages for testing
skill-seekers scrape URL --max-pages 10

# Check if llms.txt is available (10x faster!)
curl https://your-site.com/llms.txt
```

### "Enhancement failed"

**Solutions:**
- **Local mode:** Make sure Claude Code is installed
- **API mode:** Set `ANTHROPIC_API_KEY` environment variable
- **Timeout:** Increase with `--timeout 1200` (20 minutes)

**Full troubleshooting:** [Troubleshooting Guide](/docs/guides/troubleshooting)

---

## Quick Reference

**Your typical workflow:**
```bash
# 1. Scrape
skill-seekers scrape https://docs.site.com/ --max-pages 50

# 2. Enhance (optional)
skill-seekers enhance output/sitename/

# 3. Package
skill-seekers package output/sitename/ --target claude

# 4. Upload
skill-seekers upload sitename-claude.zip

# Done! 🎉
```

**Time estimates:**
- Small skill (10-50 pages): 1-2 minutes
- Medium skill (100-200 pages): 3-5 minutes
- Large skill (500+ pages): 15-30 minutes

---

## Next Steps

**Tutorials:**
- [Scraping Documentation](/docs/tutorials/scraping-docs) - Complete step-by-step guide
- [Analyzing GitHub](/docs/tutorials/analyzing-github) - Add code analysis
- [Extracting PDFs](/docs/tutorials/extracting-pdfs) - Work with PDF documentation
- [Multi-Source Skills](/docs/tutorials/multi-source-skills) - Combine multiple sources

**Manual:**
- [Documentation Scraping](/docs/manual/scraping/documentation) - Advanced techniques
- [AI Enhancement](/docs/manual/enhancement/ai-enhancement) - Deep dive into enhancement
- [Multi-Platform Support](/docs/manual/platforms/overview) - Platform-specific guides

**CLI Reference:**
- [scrape command](/docs/cli/scrape) - Complete command reference
- [package command](/docs/cli/package) - Packaging options
- [upload command](/docs/cli/upload) - Upload automation

---

**Questions?** Open an issue: https://github.com/yusufkaraaslan/Skill_Seekers/issues
