---
title: Feature Support Matrix & Platform Comparison
description: Complete feature support matrix across Claude AI, Google Gemini, OpenAI ChatGPT, and Generic Markdown - compare platforms, skill modes, CLI commands, and MCP tools
section: reference
order: 4
---

# Feature Support Matrix & Platform Comparison

**Complete comparison of Skill Seekers features across all supported platforms.**

## Platform Overview

Skill Seekers supports **4 target platforms** with different formats, APIs, and capabilities:

| Platform | Format | API | Enhancement | Status |
|----------|--------|-----|-------------|--------|
| **Claude AI** | ZIP, YAML frontmatter | Skills API (manual) | ✅ LOCAL + API | ✅ Production |
| **Google Gemini** | tar.gz, plain markdown | Files API | ✅ API only | ✅ Production |
| **OpenAI ChatGPT** | ZIP, assistant instructions | Assistants API | ✅ API only | ✅ Production |
| **Generic Markdown** | ZIP, universal markdown | N/A | ❌ Not applicable | ✅ Production |

---

## Platform Capabilities

### File Formats

| Platform | Package Format | SKILL.md Format | References |
|----------|----------------|-----------------|------------|
| **Claude AI** | `.zip` | Markdown + YAML frontmatter | `references/` directory |
| **Google Gemini** | `.tar.gz` | Plain markdown (no frontmatter) | `references/` directory |
| **OpenAI ChatGPT** | `.zip` | Plain text (assistant instructions) | `vector_store_files/` |
| **Generic Markdown** | `.zip` | Universal markdown | `references/` directory |

**Command:**
```bash
skill-seekers package output/skill/ --target [claude|gemini|openai|markdown]
```

### Enhancement Support

| Platform | API Mode | LOCAL Mode | Cost | Speed |
|----------|----------|------------|------|-------|
| **Claude AI** | ✅ Yes (Anthropic API) | ✅ Yes (Claude Code Max) | $0.15-0.30 / FREE | Fast / Moderate |
| **Google Gemini** | ✅ Yes (Gemini API) | ❌ No | $0.01-0.05 | Fast |
| **OpenAI ChatGPT** | ✅ Yes (OpenAI API) | ❌ No | $0.15-0.30 | Fast |
| **Generic Markdown** | ❌ N/A | ❌ N/A | N/A | N/A |

**Commands:**
```bash
# Claude (API mode)
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/skill/ --enhance

# Claude (LOCAL mode - FREE!)
skill-seekers enhance output/skill/ --enhance-local

# Gemini (API mode)
export GOOGLE_API_KEY=AIza...
skill-seekers enhance output/skill/ --target gemini

# OpenAI (API mode)
export OPENAI_API_KEY=sk-proj-...
skill-seekers enhance output/skill/ --target openai
```

### Upload Methods

| Platform | Manual Upload | Programmatic Upload | MCP Tool |
|----------|---------------|---------------------|----------|
| **Claude AI** | ✅ claude.ai/skills | 🚧 Coming soon | 🚧 Coming soon |
| **Google Gemini** | ✅ aistudio.google.com | ✅ Python API | ✅ Yes |
| **OpenAI ChatGPT** | ✅ platform.openai.com | ✅ Python API | ✅ Yes |
| **Generic Markdown** | ❌ N/A | ❌ N/A | ❌ N/A |

**Commands:**
```bash
# Gemini (programmatic)
skill-seekers upload skill-gemini.tar.gz --target gemini --api-key AIza...

# OpenAI (programmatic)
skill-seekers upload skill-openai.zip --target openai --api-key sk-proj-...

# Claude (manual for now)
# Upload skill.zip at claude.ai/skills
```

---

## Skill Modes

### Single-Source Skills

**All platforms support:**

| Mode | Command | Output | Platforms |
|------|---------|--------|-----------|
| **Documentation** | `skill-seekers scrape` | Single skill from docs | All |
| **GitHub** | `skill-seekers github` | Single skill from repo | All |
| **PDF** | `skill-seekers pdf` | Single skill from PDF | All |
| **Codebase (C3.x)** | `skill-seekers-codebase` | Single skill from code | All |

### Multi-Source Skills

**Platform-specific support:**

| Mode | Command | Output | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|--------|----------|
| **Unified** | `skill-seekers unified` | Merged skill | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Router (3-Stream)** | `skill-seekers router` | Router + sub-skills | ✅ Yes | ⚠️ Limited | ⚠️ Limited | ❌ No |

**Notes:**
- **Unified mode:** All platforms merge multiple sources into one skill
- **Router mode:** Claude AI has native sub-skill support; other platforms require manual sub-skill management

---

## CLI Command Support

### Scraping Commands

| Command | Description | All Platforms |
|---------|-------------|---------------|
| `skill-seekers scrape` | Documentation scraping | ✅ Yes |
| `skill-seekers github` | GitHub repository | ✅ Yes |
| `skill-seekers pdf` | PDF extraction | ✅ Yes |
| `skill-seekers unified` | Multi-source scraping | ✅ Yes |
| `skill-seekers-codebase` | Codebase analysis (C3.x) | ✅ Yes |

### Processing Commands

| Command | Description | Claude | Gemini | OpenAI | Markdown |
|---------|-------------|--------|--------|--------|----------|
| `skill-seekers enhance` | AI enhancement | ✅ API + LOCAL | ✅ API only | ✅ API only | ❌ N/A |
| `skill-seekers package` | Package skill | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| `skill-seekers upload` | Upload to platform | 🚧 Manual | ✅ Yes | ✅ Yes | ❌ N/A |
| `skill-seekers validate` | Validate structure | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| `skill-seekers router` | Generate router | ✅ Yes | ⚠️ Limited | ⚠️ Limited | ❌ No |

**Legend:**
- ✅ Full support
- ⚠️ Partial support
- 🚧 Coming soon
- ❌ Not applicable

---

## C3.x Codebase Analysis

### Feature Support

All platforms support C3.x codebase analysis features:

| Feature | Command Flag | Output | All Platforms |
|---------|--------------|--------|---------------|
| **Pattern Detection** | `--extract-patterns` | Design patterns | ✅ Yes |
| **Test Extraction** | `--extract-test-examples` | 5 test categories | ✅ Yes |
| **How-To Guides** | `--build-how-to-guides` | Tutorial generation | ✅ Yes |
| **Config Patterns** | `--extract-config-patterns` | Config analysis | ✅ Yes |
| **Architecture** | `--generate-architecture` | System overview | ✅ Yes |
| **AI Enhancement** | `--ai-mode [auto|api|local|none]` | Quality boost | Claude: Both, Others: API |

**Example:**
```bash
# Works for all platforms
skill-seekers-codebase path/to/repo/ \
  --output output/codebase/ \
  --extract-patterns \
  --extract-test-examples \
  --build-how-to-guides \
  --ai-mode auto
```

### AI Enhancement Modes

| Mode | Claude | Gemini | OpenAI | Markdown |
|------|--------|--------|--------|----------|
| **AUTO** (detect best) | ✅ LOCAL if available, else API | ✅ API | ✅ API | ❌ N/A |
| **API** | ✅ Anthropic API | ✅ Gemini API | ✅ OpenAI API | ❌ N/A |
| **LOCAL** | ✅ Claude Code Max (FREE!) | ❌ No | ❌ No | ❌ N/A |
| **NONE** | ✅ Basic output | ✅ Basic output | ✅ Basic output | ✅ Basic output |

---

## MCP Tool Support

### Available MCP Tools

**26 MCP tools for Claude Desktop integration:**

| Tool Category | Tool Name | Description |
|---------------|-----------|-------------|
| **Scraping** | `scrape_docs` | Documentation scraping |
| | `scrape_github` | GitHub repository |
| | `scrape_pdf` | PDF extraction |
| | `unified_scrape` | Multi-source scraping |
| **Skill Management** | `package_skill` | Package for platform |
| | `upload_skill` | Upload to Claude/Gemini/OpenAI |
| | `enhance_skill` | AI enhancement |
| | `validate_skill` | Validate structure |
| **C3.x Analysis** | `analyze_codebase` | Full codebase analysis |
| | `extract_patterns` | Pattern detection |
| | `extract_test_examples` | Test extraction |
| | `build_how_to_guides` | Tutorial generation |
| **Git Sources** | `add_git_source` | Add git config source |
| | `list_git_sources` | List sources |
| | `remove_git_source` | Remove source |
| | `fetch_git_sources` | Fetch updates |
| **Utilities** | `list_presets` | Show presets |
| | `get_preset` | Get preset config |

**Setup:**
```bash
pip install skill-seekers[mcp]

# Add to Claude Desktop config
# ~/.config/Claude/claude_desktop_config.json (Linux)
# ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
# %APPDATA%/Claude/claude_desktop_config.json (Windows)
```

**See also:** [MCP Setup Guide](/docs/guides/mcp-setup)

---

## Workflow Coverage

### Workflow: Documentation → Skill

| Step | Command | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. Scrape | `skill-seekers scrape` | ✅ | ✅ | ✅ | ✅ |
| 2. Enhance | `skill-seekers enhance` | ✅ API + LOCAL | ✅ API | ✅ API | ❌ |
| 3. Package | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 4. Upload | `skill-seekers upload --target X` | 🚧 Manual | ✅ API | ✅ API | ❌ |

### Workflow: GitHub → Skill

| Step | Command | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. Scrape | `skill-seekers github` | ✅ | ✅ | ✅ | ✅ |
| 2. Package | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 3. Upload | `skill-seekers upload --target X` | 🚧 Manual | ✅ API | ✅ API | ❌ |

### Workflow: Codebase (C3.x) → Skill

| Step | Command | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. Analyze | `skill-seekers-codebase` | ✅ | ✅ | ✅ | ✅ |
| 2. Extract Patterns | `--extract-patterns` | ✅ | ✅ | ✅ | ✅ |
| 3. Build Guides | `--build-how-to-guides` | ✅ | ✅ | ✅ | ✅ |
| 4. AI Enhance | `--ai-mode auto` | ✅ LOCAL + API | ✅ API | ✅ API | ❌ |
| 5. Package | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 6. Upload | `skill-seekers upload --target X` | 🚧 Manual | ✅ API | ✅ API | ❌ |

### Workflow: Multi-Source (Unified) → Skill

| Step | Command | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. Unified Scrape | `skill-seekers unified` | ✅ | ✅ | ✅ | ✅ |
| 2. Conflict Detection | Automatic | ✅ | ✅ | ✅ | ✅ |
| 3. Merge | `--merge-mode rule-based` | ✅ | ✅ | ✅ | ✅ |
| 4. Enhance | `skill-seekers enhance` | ✅ API + LOCAL | ✅ API | ✅ API | ❌ |
| 5. Package | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 6. Upload | `skill-seekers upload --target X` | 🚧 Manual | ✅ API | ✅ API | ❌ |

### Workflow: Three-Stream Router → Skill

| Step | Command | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. Code Stream | `skill-seekers-codebase` | ✅ | ✅ | ✅ | ✅ |
| 2. Docs Stream | `skill-seekers scrape` | ✅ | ✅ | ✅ | ✅ |
| 3. GitHub Stream | `skill-seekers github` | ✅ | ✅ | ✅ | ✅ |
| 4. Generate Router | `skill-seekers router` | ✅ Full support | ⚠️ Single skill | ⚠️ Single skill | ❌ |
| 5. Package All | `--include-subskills` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ❌ |
| 6. Upload | `skill-seekers upload --target X` | 🚧 Manual | ✅ API | ✅ API | ❌ |

**Note:** Gemini and OpenAI don't have native sub-skill routing, so the router flattens into a single comprehensive skill.

---

## Platform-Specific Features

### Claude AI Exclusive

✅ **LOCAL Enhancement Mode** - FREE with Claude Code Max
✅ **Sub-Skill Routing** - Native hierarchical skill support
✅ **Custom Instructions** - Behavior customization in YAML frontmatter
✅ **MCP Integration** - 18 tools for Claude Desktop

### Google Gemini Exclusive

✅ **Grounding Support** - Automatic source attribution
✅ **Long Context Window** - Up to 1M tokens
✅ **Low Cost Enhancement** - $0.01-0.05 per skill (Gemini 2.0 Flash)

### OpenAI ChatGPT Exclusive

✅ **Vector Store + file_search** - Semantic search built-in
✅ **Function Calling** - Extend with custom tools
✅ **Streaming Responses** - Real-time answer generation

### Generic Markdown

✅ **Universal Compatibility** - Works with any LLM
✅ **No Platform Lock-In** - Pure markdown format
✅ **Version Control Friendly** - Easy to diff and track changes

---

## Preset Support

**24 built-in presets** work across all platforms:

| Category | Presets | All Platforms |
|----------|---------|---------------|
| **Game Engines** | Godot, Unity, Unreal | ✅ Yes |
| **Web Frameworks** | React, Vue, Angular, Svelte, Next.js | ✅ Yes |
| **Backend** | Django, FastAPI, Flask, Express, NestJS | ✅ Yes |
| **Languages** | Python, TypeScript, Rust, Go | ✅ Yes |
| **Tools** | Tailwind, Kubernetes, Docker, PostgreSQL | ✅ Yes |

**Usage:**
```bash
# List all presets
skill-seekers list-presets

# Use preset (works for all platforms)
skill-seekers scrape --preset react
skill-seekers package output/react/ --target [claude|gemini|openai|markdown]
```

---

## Cost Comparison

### Enhancement Costs

| Platform | Model | Input Cost | Output Cost | Typical Skill | Total Cost |
|----------|-------|------------|-------------|---------------|------------|
| **Claude AI (API)** | Claude Sonnet | $3/1M | $15/1M | 50K in, 10K out | $0.30 |
| **Claude AI (LOCAL)** | Claude Code Max | FREE | FREE | Any size | **$0.00** 🎉 |
| **Google Gemini** | Gemini 2.0 Flash | $0.075/1M | $0.30/1M | 50K in, 10K out | $0.01 |
| **OpenAI ChatGPT** | GPT-4o | $2.50/1M | $10.00/1M | 50K in, 10K out | $0.23 |

### Storage/Upload Costs

| Platform | Storage Cost | Upload Cost | Notes |
|----------|--------------|-------------|-------|
| **Claude AI** | FREE | FREE | Manual upload (for now) |
| **Google Gemini** | $0.10/GB/day | FREE | Files API |
| **OpenAI ChatGPT** | $0.10/GB/day | FREE | Vector Store |
| **Generic Markdown** | N/A | N/A | No upload |

---

## Version Compatibility

| Feature | Version Added | Claude | Gemini | OpenAI | Markdown |
|---------|---------------|--------|--------|--------|----------|
| **Documentation Scraping** | v1.0.0 | ✅ | ✅ | ✅ | ✅ |
| **GitHub Scraping** | v1.5.0 | ✅ | ✅ | ✅ | ✅ |
| **PDF Extraction** | v2.0.0 | ✅ | ✅ | ✅ | ✅ |
| **Multi-LLM Support** | v2.5.0 | ✅ | ✅ | ✅ | ✅ |
| **C3.x Codebase Analysis** | v2.6.0 | ✅ | ✅ | ✅ | ✅ |
| **Three-Stream Architecture** | v2.6.0 | ✅ | ⚠️ | ⚠️ | ❌ |
| **AI Enhancement (API)** | v2.5.0 | ✅ | ✅ | ✅ | ❌ |
| **AI Enhancement (LOCAL)** | v2.6.0 | ✅ | ❌ | ❌ | ❌ |
| **Unified Scraping** | v2.0.0 | ✅ | ✅ | ✅ | ✅ |
| **MCP Integration** | v2.5.0 | ✅ | ⚠️ | ⚠️ | ❌ |

---

## Platform Selection Guide

### Choose Claude AI if:
- ✅ You have Claude Code Max (FREE LOCAL enhancement!)
- ✅ You need sub-skill routing (router pattern)
- ✅ You want MCP integration with Claude Desktop
- ✅ You prefer YAML frontmatter structure

### Choose Google Gemini if:
- ✅ You want lowest enhancement cost ($0.01-0.05)
- ✅ You need very long context window (1M tokens)
- ✅ You want automatic grounding/citations
- ✅ You prefer plain markdown format

### Choose OpenAI ChatGPT if:
- ✅ You need Vector Store + semantic search
- ✅ You want function calling capabilities
- ✅ You need streaming responses
- ✅ You're building custom GPTs

### Choose Generic Markdown if:
- ✅ You want platform independence
- ✅ You need version control friendly format
- ✅ You're using custom/local LLMs
- ✅ You want maximum portability

---

## Next Steps

- [Multi-LLM Support Guide](/docs/manual/platforms/multi-llm-support) - Detailed platform comparison
- [Claude Integration](/docs/reference/claude-integration) - Claude-specific features
- [Gemini Integration](/docs/integrations/gemini) - Gemini setup and usage
- [OpenAI Integration](/docs/integrations/openai) - OpenAI setup and usage

---

**Status**: ✅ Complete (v2.6.0)

Found an issue or have suggestions? [Open an issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
