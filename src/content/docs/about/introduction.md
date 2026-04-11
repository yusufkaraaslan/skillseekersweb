---
title: What is Skill Seekers?
description: Introduction to Skill Seekers — the data layer for AI systems. Transform 18 source types into structured AI skills and RAG knowledge for Claude, Gemini, OpenAI, LangChain, Cursor, and 12+ AI platforms.
section: about
order: 1
---

# What is Skill Seekers?

**Skill Seekers** is the **data layer for AI systems**. It transforms **18 source types** — documentation websites, GitHub repositories, PDFs, videos, Jupyter notebooks, Word/EPUB documents, OpenAPI specs, Confluence wikis, Notion pages, and more — into structured AI skills and RAG-ready knowledge for **12+ AI platforms**.

## The Problem

Building AI systems that truly understand a domain requires extensive preparation:

- **AI Skill Development**: 70% of time is spent preprocessing — scraping docs, analyzing code, extracting patterns
- **Codebase Onboarding**: Understanding a new project takes weeks of manual analysis
- **AI Assistant Expertise**: Generic AI responses lack deep framework and codebase knowledge
- **Multi-format Needs**: Different AI systems need different formats (skills, RAG, coding rules)

**Result:** Everyone rebuilds the same preprocessing infrastructure. **Stop rebuilding. Start using.**

## The Solution

Skill Seekers automates AI skill creation and knowledge preprocessing:

1. **Extract** from any of 18 source types — docs, repos, PDFs, videos, notebooks, wikis, and more
2. **Analyze** with deep code parsing (AST analysis across 27+ languages, pattern detection, architecture mapping)
3. **Enhance** with any AI agent — Claude, Kimi, Codex, Copilot, OpenCode, or custom agents via unified AgentClient
4. **Package** into 12+ output platforms (AI skills, RAG pipelines, coding rules, vector DBs)
5. **Deploy** to any AI system with one command

**Result:** Go from any source to production-ready AI skills in 15-45 minutes, not days.

## Key Capabilities

### 17 Input Sources

| # | Source | CLI |
|---|--------|-----|
| 1 | Documentation websites | `skill-seekers create <url>` |
| 2 | GitHub repositories | `skill-seekers create owner/repo` |
| 3 | PDF documents | `skill-seekers create file.pdf` |
| 4 | Local codebases | `skill-seekers create ./path` |
| 5 | Video (YouTube/local) | `skill-seekers video --url <url>` |
| 6 | Word (.docx) | `skill-seekers create file.docx` |
| 7 | EPUB e-books | `skill-seekers create book.epub` |
| 8 | Jupyter Notebooks | `skill-seekers create file.ipynb` |
| 9 | OpenAPI/Swagger | `skill-seekers create spec.yaml` |
| 10 | AsciiDoc | `skill-seekers create file.adoc` |
| 11 | PowerPoint (.pptx) | `skill-seekers create file.pptx` |
| 12 | Local HTML | `skill-seekers create file.html` |
| 13 | RSS/Atom feeds | `skill-seekers create feed.rss` |
| 14 | Man pages | `skill-seekers create curl.1` |
| 15 | Confluence wiki | `skill-seekers confluence --space KEY` |
| 16 | Notion pages | `skill-seekers notion --database-id ID` |
| 17 | Slack/Discord chat | `skill-seekers chat --export-path dir/` |

### 12+ Output Platforms

| Category | Platforms |
|----------|-----------|
| **AI Skills** | Claude, Gemini, OpenAI, Kimi, DeepSeek, Qwen, OpenRouter, Together, Fireworks, MiniMax, OpenCode |
| **RAG/Vectors** | LangChain, LlamaIndex, Pinecone, Chroma, FAISS, Haystack, Qdrant, Weaviate |
| **AI Coding** | Cursor, Windsurf, Cline, Continue.dev, Roo, Aider, Bolt, Kilo |
| **Generic** | Markdown, JSON, YAML |

### Agent-Agnostic Enhancement (v3.5.0)

All enhancers now support multiple AI agents via the unified `AgentClient`:

```bash
# Use different AI agents for enhancement
skill-seekers create https://react.dev --agent kimi
skill-seekers create https://react.dev --agent codex
skill-seekers create https://react.dev --agent-cmd "my-custom-agent run"

# Enhancement levels control depth
skill-seekers create https://react.dev --enhance-level 2  # architecture + patterns
```

**Supported agents:** Claude Code, Kimi, Codex, Copilot, OpenCode, and any custom agent.

### Intelligent Processing
- **Smart SPA discovery** — Three-layer engine: sitemap.xml, llms.txt, and browser rendering for JavaScript sites
- **Pattern recognition** — Detects 10 GoF design patterns in codebases (C3.x analysis, 27+ languages + Kotlin)
- **Test extraction** — Extracts real usage examples from test files
- **How-to generation** — Creates step-by-step tutorials from workflow examples
- **Prompt injection detection** — Security workflow scans for injection patterns

### MCP & Marketplace
- **40 MCP tools** across 10 categories for Claude Code Desktop, Cursor, and other agents
- **Marketplace Publisher** — Publish skills to Claude Code plugin marketplace repos
- **18 agent install paths** — Install skills to any supported AI coding assistant

## Version

Current version: **v3.5.0** (April 2026)

**Latest additions:**
- Grand Unification — one command, direct converters (v3.5.0)
- Agent-agnostic architecture (v3.5.0)
- Marketplace & config publishing (v3.5.0)
- Smart SPA discovery engine (v3.5.0)
- Prompt injection detection (v3.5.0)
- All content extraction features enabled by default (v3.5.0)
- 12 LLM platform targets (v3.4.0)
- 21 UML architecture diagrams (v3.4.0)
- 17 source types (v3.3.0) → 18 (v3.5.0)
- Video scraping pipeline (v3.2.0)
- **3194+ tests passing**

## Quick Example

```bash
# Install
pip install skill-seekers

# Create skill from any source
skill-seekers create https://react.dev --target claude
skill-seekers create facebook/react --target langchain
skill-seekers create manual.pdf --target openai
skill-seekers create notebook.ipynb --target gemini

# Use a different AI agent
skill-seekers create https://react.dev --agent kimi

# Run diagnostics
skill-seekers doctor
```

## Next Steps

- [Installation Guide](/docs/getting-started/installation) — Install Skill Seekers
- [Your First Skill](/docs/getting-started/first-skill) — Create your first AI skill in 3 steps
- [Features Overview](/docs/about/features) — Explore all capabilities
- [Architecture](/architecture) — View 21 UML architecture diagrams

---

**Open Source** — MIT License | **Community-Driven** — Contributions welcome!
