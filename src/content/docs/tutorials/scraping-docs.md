---
title: "Tutorial: Scraping Documentation"
description: Step-by-step tutorial for scraping documentation websites and creating your first AI skill with Skill Seekers
section: tutorials
order: 1
---

# Tutorial: Scraping Documentation

Learn how to scrape any documentation website and create an AI skill in this hands-on tutorial.

**Time:** 15 minutes | **Level:** Beginner | **Result:** Working React docs skill

---

## What You'll Learn

- How to use preset configurations
- How to scrape documentation websites
- How to verify skill quality
- How to enhance and package skills

## Prerequisites

- Skill Seekers installed ([Installation Guide](/docs/getting-started/installation))
- Internet connection
- 15 minutes of time

---

## Step 1: Choose a Documentation Site

For this tutorial, we'll scrape React documentation. Skill Seekers includes 24 preset configs for popular frameworks.

**View available presets:**
```bash
skill-seekers list-configs
```

**Output:**
```
Available configs:
- react.json        (React documentation)
- vue.json          (Vue.js documentation)
- django.json       (Django framework)
- godot.json        (Godot game engine)
- fastapi.json      (FastAPI framework)
... and 19 more
```

---

## Step 2: Estimate Page Count

Before scraping, estimate how many pages will be processed:

```bash
skill-seekers estimate --config configs/react.json
```

**Output:**
```
📊 Estimation Results:
Base URL: https://react.dev/learn
Estimated pages: ~180 pages
Estimated time: 3-5 minutes
Categories detected: 4
```

---

## Step 3: Scrape the Documentation

Run the scraper with the React preset:

```bash
skill-seekers scrape --config configs/react.json --output output/react/
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
✅ Found llms-full.txt (2.3 MB)
📥 Downloading...
✅ Downloaded in 1.8 seconds
📝 Creating skill structure...
✅ Skill created: output/react/SKILL.md
⚡ Time saved: 4m 32s vs traditional scraping
```

---

## Step 4: Review the Skill

Check what was created:

```bash
ls -lh output/react/
```

**Output:**
```
output/react/
├── SKILL.md                    # Main skill file (200-500 lines)
├── references/                 # Detailed documentation
│   ├── hooks.md
│   ├── components.md
│   ├── state-management.md
│   └── ... (50-100 reference files)
└── examples/                   # Code examples
    ├── useState-example.md
    ├── useEffect-example.md
    └── ...
```

**Preview SKILL.md:**
```bash
head -50 output/react/SKILL.md
```

---

## Step 5: Enhance with AI (Optional)

Transform the skill from basic (3/10) to comprehensive (9/10) using AI:

**Option A: Local Enhancement (FREE with Claude Max)**
```bash
skill-seekers enhance output/react/
```

This opens Claude Code in a new terminal and enhances the skill using your Claude Max subscription (no API costs!).

**Time:** 30-60 seconds

**Option B: API Enhancement (Fast)**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
skill-seekers enhance output/react/ --mode api
```

**Cost:** ~$0.15-$0.30

---

## Step 6: Package the Skill

Package for your preferred platform:

**For Claude AI:**
```bash
skill-seekers package output/react/ --target claude
```

**For Gemini:**
```bash
skill-seekers package output/react/ --target gemini
```

**For OpenAI:**
```bash
skill-seekers package output/react/ --target openai
```

**Output:**
```
✅ Packaged: react-claude.zip (2.3 MB)
📦 Format: Claude AI (YAML frontmatter)
📄 Files: 1 SKILL.md + 87 references
🎯 Ready to upload!
```

---

## Step 7: Upload to AI Assistant

**Automatic Upload (Recommended):**
```bash
# Set API key first
export ANTHROPIC_API_KEY="sk-ant-..."

# Upload
skill-seekers upload react-claude.zip --target claude
```

**Manual Upload:**
1. Open [Claude.ai](https://claude.ai)
2. Click "Add Knowledge"
3. Upload `react-claude.zip`
4. Done!

---

## Step 8: Test Your Skill

**Try these prompts in Claude:**

```
"Explain React hooks to me"
"Show me how to use useState with arrays"
"What's the difference between useEffect and useLayoutEffect?"
"Create a simple counter component using hooks"
```

**Result:** Claude responds with accurate, context-aware answers based on official React documentation!

---

## Troubleshooting

### Issue: "No pages found"

**Solution:** Check your config selectors:
```bash
skill-seekers scrape --config configs/react.json --interactive
```

Interactive mode shows extracted content and lets you test selectors.

### Issue: "Scraping too slow"

**Solutions:**
- Use `--async` flag for 2-3x speedup
- Increase `rate_limit` in config (try 1.0 or 2.0)
- Check if llms.txt is available (10x faster!)

### Issue: "Enhancement failed"

**Solutions:**
- **Local mode:** Install Claude Code
- **API mode:** Set `ANTHROPIC_API_KEY` environment variable
- **Timeout:** Increase with `--timeout 1200` (20 minutes)

---

## Next Steps

**You just created your first AI skill! 🎉**

Try these next:

1. **Scrape another framework:** [Django Tutorial](/docs/tutorials/analyzing-github)
2. **Create custom config:** [Config Creation Tutorial](/docs/tutorials/creating-configs)
3. **Combine sources:** [Multi-Source Tutorial](/docs/tutorials/multi-source-skills)
4. **Explore MCP:** [MCP Setup](/docs/manual/mcp/setup)

---

## Summary

**What you learned:**
- ✅ How to use preset configurations
- ✅ How to estimate and scrape documentation
- ✅ How to enhance skills with AI
- ✅ How to package and upload for any platform
- ✅ How to troubleshoot common issues

**Time investment:** 15 minutes
**Result:** Professional-quality AI skill ready to use!

---

**See Also:**
- [Scraping Manual](/docs/manual/scraping/documentation) - Advanced scraping techniques
- [Enhancement Guide](/docs/manual/enhancement/ai-enhancement) - Deep dive into AI enhancement
- [CLI Reference](/docs/cli/scrape) - Complete scrape command reference
