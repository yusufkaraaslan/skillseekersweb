---
title: Frequently Asked Questions
description: Common questions about Skill Seekers - installation, usage, platforms, pricing, and troubleshooting
section: about
order: 4
---

# Frequently Asked Questions

## General Questions

### What is Skill Seekers?

Skill Seekers is the **universal data layer for AI systems**. It automatically transforms **documentation websites, GitHub repositories, PDF files, and local codebases** into structured knowledge for:

- **RAG Pipelines** - LangChain, LlamaIndex, Chroma, FAISS, Haystack, Qdrant, Weaviate
- **AI Coding Assistants** - Cursor, Windsurf, Cline, Continue.dev
- **Claude AI Skills** - Native format with YAML frontmatter
- **Any LLM Platform** - Generic Markdown, JSON, YAML

### Is it free?

Yes! Skill Seekers is **100% free and open-source** (MIT License). You only pay for:
- **Claude API** (if using API enhancement mode) - ~$0.15-$0.30 per skill
- **Your Claude Max subscription** (if using local enhancement - recommended!)
- **Cloud storage** (if uploading to S3/GCS/Azure)

**Most features are completely free**, including local AI enhancement using Claude Code.

### Which platforms are supported?

**Input Sources (4):**
- Documentation websites (any HTML docs)
- GitHub repositories (public & private)
- PDF files (with OCR for scanned docs)
- Local codebases (27+ languages)

**Output Formats (16):**
- **RAG/Vectors:** LangChain, LlamaIndex, Chroma, FAISS, Haystack, Qdrant, Weaviate
- **AI Platforms:** Claude, Gemini, OpenAI
- **AI Coding:** Cursor, Windsurf, Cline, Continue.dev
- **Generic:** Markdown, JSON, YAML

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
- Local codebase: **5-15 minutes**
- AI enhancement: **30-60 seconds** (local) or **10-30 seconds** (API)

**Total for React docs:** ~12 minutes start to finish!

### Can I use it without internet?

Partially:
- ✅ **Can work offline:** PDF extraction, local file analysis, local codebases
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
| **Quality** | Same (Claude Sonnet) | Same |
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

This creates focused sub-skills with intelligent routing. See [Large Documentation Guide](/docs/reference/large-documentation) for details.

### Can I combine multiple sources?

Yes! Use **unified scraping**:

```bash
skill-seekers unified --config configs/unified.json
```

Combine documentation + GitHub + PDFs + codebases into one comprehensive skill. See [Multi-Source Tutorial](/docs/tutorials/multi-source-skills).

### Can I process local codebases?

Yes! Use the `analyze` command:

```bash
# Analyze local project
skill-seekers analyze --directory ./my-project --format langchain

# Analyze Godot game
skill-seekers analyze --directory ./my-game --comprehensive
```

Supports 27+ programming languages including Python, JavaScript, Go, Rust, C++, C#, GDScript, and more.

---

## Platform-Specific Questions

### Do I need separate skills for different AI systems?

No! Create once, package for any platform:

```bash
# Create skill (works for all sources)
skill-seekers scrape --config configs/react.json

# Package for different platforms
skill-seekers package output/react/ --target langchain
skill-seekers package output/react/ --target llamaindex
skill-seekers package output/react/ --target claude
```

### How does RAG integration work?

- **LangChain:** Native Document objects with metadata
- **LlamaIndex:** TextNode objects with embeddings
- **Vector DBs:** Direct export to Chroma, Weaviate, FAISS, Qdrant
- **Chunking:** Smart semantic chunking (512 tokens)

See [RAG & Vector Databases](/docs/integrations/rag) for details.

### How does AI Coding integration work?

- **Cursor:** `.cursorrules` file with framework knowledge
- **Windsurf:** `.windsurfrules` file
- **Cline:** `.clinerules` + MCP tools
- **Continue.dev:** HTTP context provider

All work with docs, repos, PDFs, and codebases.

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

See [Troubleshooting Guide](/docs/guides/troubleshooting) for more help.

### Why does enhancement fail?

Common issues:
- **No ANTHROPIC_API_KEY** - Set environment variable for API mode
- **Claude Code not installed** - Install for local mode
- **Timeout** - Increase `--timeout` flag (default: 600 seconds)
- **File permissions** - Check write permissions on output directory

---

## MCP Questions

### What is MCP?

MCP (Model Context Protocol) is a standard for connecting AI tools. Skill Seekers provides **26 MCP tools** for Claude Code Desktop, allowing natural language commands like "create a React skill".

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
- **GitHub Copilot CLI** - Enterprise integration
- **OpenAI Codex CLI** - OpenAI integration
- **OpenCode CLI** - Open source alternative
- **Cursor** - HTTP transport
- **Windsurf** - HTTP transport

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
