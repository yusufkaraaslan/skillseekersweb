---
title: Create Your First Skill
description: Quick hands-on tutorial to create your first AI skill in 5 minutes using Skill Seekers v3.1.0
section: getting-started
order: 4
---

# Create Your First Skill

Learn by doing! This tutorial walks you through creating your first AI skill from documentation using the v3.0+ unified `create` command.

**Prerequisites:** Skill Seekers installed ([Installation Guide](/docs/getting-started/installation))

**Time:** 5-10 minutes | **Result:** Working Claude skill ready to upload

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

You should see something like: `skill-seekers 3.1.0`

**If not installed:** See [Installation Guide](/docs/getting-started/installation)

---

## Step 2: Create the Skill (Unified Command)

Run this single command:

```bash
skill-seekers create https://tailwindcss.com/docs --target claude --max-pages 50
```

**What happens:**
1. **llms.txt check** - Looks for AI-optimized docs (10x faster if available)
2. **BFS traversal** - Crawls all documentation pages
3. **Smart categorization** - Organizes content into sections
4. **Code detection** - Identifies and formats code examples
5. **SKILL.md generation** - Creates main skill file
6. **Packaging** - Creates Claude-compatible ZIP

**Progress output:**
```
🔍 Checking for llms.txt...
📥 Analyzing source type: documentation website
🌐 Fetching https://tailwindcss.com/docs
📄 Scraping documentation...
   ├─ Page 1/50: Installation
   ├─ Page 2/50: Editor Setup
   ├─ Page 3/50: Utility-First Fundamentals
   ...
   └─ Page 50/50: Plugin API

✅ Skill created: tailwindcss-claude.zip (1.8 MB)
📦 Format: Claude AI (YAML frontmatter)
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
unzip -l tailwindcss-claude.zip
```

**You should see:**
```
tailwindcss/
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
# Extract and view
unzip tailwindcss-claude.zip -d tailwindcss/
head -50 tailwindcss/tailwindcss/SKILL.md
```

---

## Step 4: Enhance with AI (Optional, v3.1.0)

Transform from basic (3/10) to comprehensive (9/10) using workflow presets:

**Option A: Default Enhancement**
```bash
# Extract, enhance, and repackage
skill-seekers create https://tailwindcss.com/docs \
  --target claude \
  --max-pages 50 \
  --enhance-workflow default
```

**Option B: API Documentation Workflow**
```bash
skill-seekers create https://tailwindcss.com/docs \
  --target claude \
  --max-pages 50 \
  --enhance-workflow api-documentation
```

**What enhancement does:**
- Summarizes key concepts
- Extracts best practices
- Identifies common patterns
- Creates quick reference sections
- Improves organization

**Time:** Adds 30-60 seconds

**Available workflows:**
- `default` - Balanced enhancement
- `minimal` - Fast, light enhancement
- `security-focus` - Security vulnerability analysis
- `architecture-comprehensive` - Deep architectural insights
- `api-documentation` - API-focused documentation

---

## Step 5: Upload to Claude

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

## Step 6: Test Your Skill

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
- ✅ How to use the unified `create` command
- ✅ How to scrape documentation websites
- ✅ How to enhance with AI workflows (v3.1.0)
- ✅ How to package for Claude AI
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

# Try React with workflow
skill-seekers create https://react.dev --target claude --max-pages 100 --enhance-workflow default

# Try Vue
skill-seekers create https://vuejs.org --target claude --max-pages 100

# Try Django
skill-seekers create https://docs.djangoproject.com --target claude --max-pages 150
```

### 2. Scrape a GitHub Repository

Add code analysis to your skills:

```bash
skill-seekers create https://github.com/facebook/react --target claude
```

**See:** [GitHub Analysis Tutorial](/docs/tutorials/docs/github-repos)

### 3. Extract from PDFs

Turn technical PDFs into searchable skills:

```bash
skill-seekers create ./manual.pdf --target claude --ocr
```

**See:** [Extracting PDFs Tutorial](/docs/tutorials/docs/pdf-manuals)

### 4. Create Multi-Source Skills

Combine docs + GitHub + PDFs:

```bash
skill-seekers create https://docs.djangoproject.com \
  --github https://github.com/django/django \
  --target claude
```

**See:** [Multi-Source Tutorial](/docs/tutorials/docs/multi-source)

---

## Common Issues

### "No pages found"

**Problem:** Scraper couldn't find content

**Solution:** Use interactive mode to test selectors:
```bash
skill-seekers create https://your-site.com/docs --target claude --interactive
```

### "Scraping too slow"

**Solutions:**
```bash
# Check if llms.txt is available (10x faster!)
curl https://your-site.com/llms.txt

# Reduce pages for testing
skill-seekers create URL --target claude --max-pages 10
```

### "Enhancement workflow not found"

**Problem:** Workflow name doesn't exist

**Solution:** List available workflows:
```bash
skill-seekers workflows list
```

---

## Quick Reference

**Your typical workflow:**
```bash
# 1. Create with enhancement (v3.1.0)
skill-seekers create https://docs.site.com/ \
  --target claude \
  --max-pages 50 \
  --enhance-workflow default

# 2. Upload
skill-seekers upload sitename-claude.zip --target claude

# Done! 🎉
```

**Time estimates:**
- Small skill (10-50 pages): 1-2 minutes
- Medium skill (100-200 pages): 3-5 minutes
- Large skill (500+ pages): 15-30 minutes

---

## Next Steps

**Tutorials:**
- [Scraping Documentation](/docs/tutorials/docs/scraping-websites) - Complete step-by-step guide
- [Analyzing GitHub](/docs/tutorials/docs/github-repos) - Add code analysis
- [Extracting PDFs](/docs/tutorials/docs/pdf-manuals) - Work with PDF documentation
- [Multi-Source Skills](/docs/tutorials/docs/multi-source) - Combine multiple sources

**Manual:**
- [Understanding Skills](/docs/getting-started/understanding-skills) - How skills work
- [AI Enhancement](/docs/manual/enhancement/overview) - Deep dive into enhancement
- [Enhancement Workflows](/docs/manual/enhancement/workflows) - v3.1.0 workflows

**CLI Reference:**
- [create command](/docs/cli/create) - Complete command reference
- [workflows command](/docs/cli/workflows) - v3.1.0 workflow management

---

**Questions?** Open an issue: https://github.com/yusufkaraaslan/Skill_Seekers/issues
