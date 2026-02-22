---
title: Quick Start
description: Get up and running with Skill Seekers v3.1.0 in 5 minutes - create your first AI skill using the unified create command
section: getting-started
order: 3
---

# Quick Start

Get up and running with Skill Seekers in **5 minutes** using the new v3.0+ unified `create` command.

## Prerequisites

Before starting, ensure you have:

- Python 3.10 or higher installed
- A terminal/command prompt
- Skill Seekers installed (`pip install skill-seekers`)

## Step 1: Verify Installation

```bash
skill-seekers --version
```

You should see: `skill-seekers 3.1.0` or higher

## Step 2: Create Your First Skill (Unified Command)

The v3.0+ `create` command works with any source:

```bash
# From documentation website
skill-seekers create https://docs.python-requests.org --target claude

# From GitHub repository
skill-seekers create https://github.com/psf/requests --target claude

# From PDF file
skill-seekers create ./manual.pdf --target claude

# From local codebase
skill-seekers create ./my-project --target claude
```

**Let's try a real example with Tailwind CSS:**

```bash
skill-seekers create https://tailwindcss.com/docs --target claude --max-pages 50
```

**What happens:**
1. Detects source type (documentation website)
2. Scrapes content from up to 50 pages
3. Structures it for AI consumption
4. Packages for Claude AI
5. Takes 3-5 minutes

**Output:**
```
✅ Skill created: tailwindcss-claude.zip (2.1 MB)
📦 Format: Claude AI (YAML frontmatter)
📄 Pages: 50
🎯 Ready to upload!
```

## Step 3: Enhance with Workflow (v3.1.0)

Transform the skill with AI enhancement using a workflow preset:

```bash
# Extract and enhance with default workflow
skill-seekers create https://tailwindcss.com/docs --target claude --enhance-workflow default

# Or use API documentation workflow
skill-seekers create https://tailwindcss.com/docs --target claude --enhance-workflow api-documentation
```

**Available workflows:**
- `default` - Balanced enhancement
- `minimal` - Fast, light enhancement  
- `security-focus` - Security vulnerability analysis
- `architecture-comprehensive` - Deep architectural insights
- `api-documentation` - API-focused documentation

## Step 4: Upload to Claude

**Automatic upload:**
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
skill-seekers upload tailwindcss-claude.zip --target claude
```

**Manual upload:**
1. Open [Claude.ai](https://claude.ai)
2. Start a new conversation
3. Click "Add Knowledge" (📎 icon)
4. Upload `tailwindcss-claude.zip`
5. Done!

## Step 5: Test Your Skill

Try these prompts in Claude:

```
"What are the Tailwind spacing utilities?"

"Show me how to create a responsive navbar with Tailwind"

"Create a card component using Tailwind"
```

**Result:** Claude responds with accurate, context-aware answers!

---

## Quick Examples for Different Sources

### Documentation Website

```bash
skill-seekers create https://react.dev --target langchain
skill-seekers create https://docs.python.org --target gemini
skill-seekers create https://vuejs.org --target openai
```

### GitHub Repository

```bash
# Public repo
skill-seekers create https://github.com/facebook/react --target claude

# With C3.x analysis (code patterns)
skill-seekers create https://github.com/owner/repo --target claude --comprehensive

# Private repo (set GITHUB_TOKEN first)
export GITHUB_TOKEN="ghp_..."
skill-seekers create https://github.com/private/repo --target claude
```

### PDF File

```bash
# Basic extraction
skill-seekers create ./manual.pdf --target claude

# With OCR for scanned documents
skill-seekers create ./scanned-manual.pdf --target claude --ocr

# Specific page range
skill-seekers create ./manual.pdf --target claude --pages "1-50"
```

### Local Codebase

```bash
# Basic analysis
skill-seekers create ./my-project --target claude

# With comprehensive C3.x analysis
skill-seekers create ./my-project --target claude --comprehensive

# Specific output format
skill-seekers create ./my-project --target langchain
```

### Multiple Sources (v3.0+)

```bash
# Combine documentation + GitHub + PDF in one command
skill-seekers create https://docs.example.com \
  --github https://github.com/example/repo \
  --pdf ./manual.pdf \
  --target claude
```

---

## One-Liner Complete Workflow

For the impatient, here's everything in one command:

```bash
skill-seekers create https://docs.python-requests.org \
  --target claude \
  --enhance-workflow default && \
skill-seekers upload requests-claude.zip --target claude
```

**Total time:** ~10-15 minutes for a complete, production-ready skill.

---

## Next Steps

Now that you've created your first skill:

- **[Your First Skill](/docs/getting-started/first-skill)** - Deep dive into skill creation
- **[Understanding Skills](/docs/getting-started/understanding-skills)** - How skills work
- **[Tutorials](/docs/tutorials/docs/scraping-websites)** - Master specific use cases
- **[CLI Reference](/docs/cli/index)** - Explore all commands

---

## Common Issues

### "API key not found"

```bash
# Set environment variable
export ANTHROPIC_API_KEY="your-key"

# Or use local enhancement (free with Claude Code)
skill-seekers create URL --target claude --enhance-mode local
```

### "Site requires authentication"

Use the `--selector` option with custom CSS selectors, or check if the site provides `llms.txt` for faster access.

### "Scraping too slow"

```bash
# Check if llms.txt is available (10x faster!)
curl https://docs.example.com/llms.txt

# Reduce pages for testing
skill-seekers create URL --target claude --max-pages 10
```

💡 **Pro Tip:** Check if your target site has an `llms.txt` file. This provides pre-structured documentation and is **10x faster** to process!
