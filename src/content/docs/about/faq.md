---
title: Frequently Asked Questions
description: Common questions about Skill Seekers - installation, usage, platforms, pricing, and troubleshooting
section: about
order: 4
---

# Frequently Asked Questions

## General Questions

### What is Skill Seekers?

Skill Seekers is an open-source tool that automatically converts documentation websites, GitHub repositories, and PDFs into optimized AI skills for Claude, Gemini, and OpenAI ChatGPT.

### Is it free?

Yes! Skill Seekers is **100% free and open-source** (MIT License). You only pay for:
- **Claude API** (if using API enhancement mode) - ~$0.15-$0.30 per skill
- **Your Claude Max subscription** (if using local enhancement - recommended!)
- **API keys** for upload (if using automatic upload)

**Most features are completely free**, including local AI enhancement using Claude Code.

### Which platforms are supported?

- **Claude AI** - Native format (ZIP with YAML frontmatter)
- **Google Gemini** - tar.gz with 1M token context
- **OpenAI ChatGPT** - ZIP with vector store
- **Generic Markdown** - Universal format for any LLM

All features work across all platforms with complete feature parity.

---

## Installation & Setup

### What are the requirements?

- **Python 3.10+** (required)
- **pip** or **uv** package manager
- **Git** (for GitHub scraping)
- **Tesseract OCR** (optional, for scanned PDFs)

### How do I install?

```bash
pip install skill-seekers
```

That's it! See [Installation Guide](/docs/getting-started/installation) for detailed instructions.

### Do I need to install Claude Code?

No, but it's **highly recommended**! With Claude Code, you can use FREE local AI enhancement (uses your Claude Max subscription, no API costs).

Without Claude Code, you can still:
- Scrape documentation (works perfectly)
- Package skills (works perfectly)
- Upload manually (works perfectly)
- Use API enhancement (costs ~$0.30/skill)

---

## Usage Questions

### How long does it take to create a skill?

**Typical timeline:**
- Small docs (50 pages): **2-3 minutes**
- Medium docs (200 pages): **5-10 minutes**
- Large docs (1000+ pages): **15-30 minutes**
- GitHub repo analysis: **3-10 minutes**
- PDF extraction: **1-5 minutes**
- AI enhancement: **30-60 seconds** (local) or **10-30 seconds** (API)

**Total for React docs:** ~12 minutes start to finish!

### Can I use it without internet?

Partially:
- ✅ **Can work offline:** PDF extraction, local file analysis, enhancement with local models
- ❌ **Needs internet:** Documentation scraping, GitHub API calls, API enhancement, upload

### How accurate is the scraping?

**Very accurate** with proper configuration:
- **Smart selectors** - Automatically detect content vs navigation
- **Category detection** - 95%+ accuracy for well-structured docs
- **Code preservation** - 100% accuracy for code blocks
- **Link resolution** - Handles internal references correctly

**Tips for best results:**
- Use interactive mode to test selectors
- Check existing configs first (24 presets available)
- Validate with `skill-seekers estimate` before full scrape

---

## Feature Questions

### What's the difference between local and API enhancement?

| Feature | Local (FREE) | API |
|---------|-------------|-----|
| **Cost** | FREE (uses Claude Max) | ~$0.15-$0.30/skill |
| **Speed** | 30-60 seconds | 10-30 seconds |
| **Quality** | Same (Claude Sonnet 4.5) | Same |
| **Requirements** | Claude Code installed | ANTHROPIC_API_KEY |
| **Use Case** | Single skills, development | Batch processing, CI/CD |

**Recommendation:** Use local mode for development, API for automation.

### Can I scrape private documentation?

Yes! Several options:
1. **VPN/network access** - Scrape from internal network
2. **Local HTML** - Download docs locally, then scrape
3. **Authentication** - Configure custom headers/cookies
4. **Private GitHub** - Use GITHUB_TOKEN for private repos

See [GitHub Analysis Tutorial](/docs/tutorials/analyzing-github) for details.

### How do I handle large documentation (10K+ pages)?

Use **config splitting** and **router generation**:

```bash
# Automatically split large config
skill-seekers split --config configs/large-docs.json

# Generate router skill
skill-seekers router output/large-docs-*/
```

This creates focused sub-skills with intelligent routing. See [Large Documentation Guide](/docs/manual/advanced/large-docs) for details.

### Can I combine multiple sources?

Yes! Use **unified scraping**:

```bash
skill-seekers unified --config configs/unified.json
```

Combine documentation + GitHub + PDFs into one comprehensive skill. See [Multi-Source Tutorial](/docs/tutorials/multi-source-skills).

---

## Platform-Specific Questions

### Do I need separate skills for Claude, Gemini, and OpenAI?

No! Create once, package for any platform:

```bash
# Create skill (works for all platforms)
skill-seekers scrape --config configs/react.json

# Package for different platforms
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
```

### How does Claude AI integration work?

- **Format:** ZIP file with YAML frontmatter
- **Upload:** Automatic via API or manual via Claude.ai
- **MCP:** 18 tools available for Claude Code Desktop
- **Quality:** Native format, best integration

### How does Gemini integration work?

- **Format:** tar.gz with plain markdown
- **Context:** Supports 1M token context window
- **Upload:** Automatic via Google Files API + Grounding
- **Enhancement:** Uses Gemini 2.0 Flash

### How does OpenAI integration work?

- **Format:** ZIP with assistant instructions
- **Upload:** Automatic via Assistants API + Vector Store
- **Search:** Semantic search with file search enabled
- **Enhancement:** Uses GPT-4o

---

## Troubleshooting

### Why is scraping slow?

Common causes:
- **Rate limiting** - Increase `rate_limit` in config (try 1.0 or 2.0)
- **Sync mode** - Use `--async` flag for 2-3x speedup
- **Large pages** - Normal for 1000+ page sites
- **Network issues** - Check internet connection

### Why are some pages missing?

Check:
1. **max_pages limit** - Remove or increase limit
2. **URL patterns** - Add `url_patterns` to config
3. **Selectors** - Test with `--interactive` mode
4. **JavaScript rendering** - Some sites need browser automation

### How do I debug selector issues?

```bash
# Interactive mode shows what gets extracted
skill-seekers scrape --config configs/test.json --interactive

# Test on single page
skill-seekers estimate --config configs/test.json
```

See [Troubleshooting Guide](/docs/manual/mcp/troubleshooting) for more help.

### Why does enhancement fail?

Common issues:
- **No ANTHROPIC_API_KEY** - Set environment variable for API mode
- **Claude Code not installed** - Install for local mode
- **Timeout** - Increase `--timeout` flag (default: 600 seconds)
- **File permissions** - Check write permissions on output directory

---

## MCP Questions

### What is MCP?

MCP (Model Context Protocol) is a standard for connecting AI tools. Skill Seekers provides 18 MCP tools for Claude Code Desktop, allowing natural language commands like "create a React skill".

### How do I set up MCP?

```bash
# Automatic setup (recommended)
cd /path/to/Skill_Seekers
./setup_mcp.sh

# Manual setup
# Edit ~/.claude/mcp_settings.json
```

See [MCP Setup Guide](/docs/manual/mcp/setup) for details.

### Which AI agents support MCP?

- **Claude Code** - stdio transport (native)
- **Cursor** - HTTP transport
- **Windsurf** - HTTP transport
- **VS Code + Cline** - stdio transport
- **IntelliJ IDEA** - HTTP transport

Setup script auto-detects and configures all installed agents.

---

## Advanced Questions

### Can I customize the AI enhancement?

Yes! Enhancement uses configurable prompts. You can:
- Modify enhancement instructions in config
- Use different AI models (Claude, Gemini, GPT-4o)
- Skip enhancement entirely (`--skip-enhancement`)
- Enhance manually later (`skill-seekers enhance output/skill/`)

### Can I contribute configs?

Absolutely! We welcome community configs:

```bash
# Submit via MCP
submit_config(config_json="...", description="...")

# Or create GitHub issue
# https://github.com/yusufkaraaslan/Skill_Seekers/issues
```

See [Contributing Guide](/docs/community/contributing) for details.

### Is there a roadmap?

Yes! See [Roadmap](/docs/community/roadmap) for planned features and [Changelog](/docs/community/changelog) for version history.

---

## Getting Help

**Can't find your answer?**

- 📚 [Documentation](/docs/getting-started/overview) - Comprehensive guides
- 🐛 [GitHub Issues](https://github.com/yusufkaraaslan/Skill_Seekers/issues) - Report bugs
- 💬 [Discussions](https://github.com/yusufkaraaslan/Skill_Seekers/discussions) - Ask questions
- 📧 [Email](mailto:yusufkaraaslan.yk@pm.me) - Direct support

**Found a bug?** Please report it with:
- Steps to reproduce
- Expected vs actual behavior
- Error messages and stack traces
- Environment details (OS, Python version, config file)
