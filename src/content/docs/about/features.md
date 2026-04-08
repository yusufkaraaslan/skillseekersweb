---
title: Features Overview
description: Complete overview of Skill Seekers v3.5.0 features — 17 source types, 12+ AI platforms, agent-agnostic enhancement, marketplace, 40 MCP tools, and UML architecture
section: about
order: 2
---

# Features Overview

Skill Seekers v3.5.0 is a comprehensive toolkit for transforming any knowledge source into structured AI skills and RAG-ready knowledge.

## Input Sources (17 Types)

### Documentation Scraping
- **HTML websites** — Scrape any documentation site (React, Vue, Django, Godot, etc.)
- **Smart SPA discovery** (v3.5.0) — Three-layer engine: sitemap.xml, llms.txt, and browser rendering for JavaScript SPA sites
- **Browser rendering** (v3.5.0) — Playwright-based rendering for React, Vue, Angular sites that return empty HTML shells
- **Unlimited pages** — No page limits, handles 40K+ page documentation sites
- **Smart selectors** — Automatic content detection or custom CSS selectors

### GitHub Repository Analysis
- **Unlimited local analysis** — Analyze entire codebases without API rate limits (50-file limit removed in v3.5.0)
- **Three-stream fetcher** — Code + Docs + Issues streams
- **C3.x deep analysis** — AST parsing across 27+ languages including Kotlin (v3.5.0)
- **10 GoF pattern detectors** — Singleton, Factory, Strategy, Observer, etc.
- **Test example extraction** — Real usage examples from test files

### PDF & Document Extraction
- **PDF** — Text extraction with OCR fallback for scanned documents
- **Word (.docx)** (v3.2.0) — Full document extraction
- **EPUB** (v3.3.0) — Chapter extraction, DRM detection, EPUB 2/3 support
- **PowerPoint (.pptx)** (v3.3.0) — Slide text, speaker notes, tables, code block detection
- **AsciiDoc** (v3.3.0) — Headings, code blocks, tables, admonitions

### Media & API Sources
- **Video** (v3.2.0) — YouTube and local video extraction: transcripts, visual OCR, code timeline tracking
- **Jupyter Notebooks** (v3.3.0) — Code cells, outputs, markdown, kernel metadata
- **OpenAPI/Swagger** (v3.3.0) — Endpoint extraction, schema resolution, security schemes
- **RSS/Atom feeds** (v3.3.0) — Article extraction with optional full-page scraping
- **Local HTML** (v3.3.0) — Smart main content detection
- **Man pages** (v3.3.0) — Structured section parsing, gzip/bzip2/xz support

### Collaboration & Wiki Sources
- **Confluence** (v3.3.0) — REST API or HTML export, page hierarchy, macros
- **Notion** (v3.3.0) — API or Markdown export, 20+ block types, 16+ property types
- **Slack/Discord** (v3.3.0) — Workspace exports or live API, threads, code snippets

## Output Platforms (12+)

| Category | Platforms |
|----------|-----------|
| **AI Skills** | Claude, Gemini, OpenAI, Kimi, DeepSeek, Qwen, OpenRouter, Together, Fireworks, MiniMax, OpenCode |
| **RAG/Vectors** | LangChain, LlamaIndex, Pinecone, Chroma, FAISS, Haystack, Qdrant, Weaviate |
| **AI Coding** | Cursor, Windsurf, Cline, Continue.dev, Roo, Aider, Bolt, Kilo |
| **Generic** | Markdown, JSON, YAML |

## Agent-Agnostic Enhancement (v3.5.0)

All 5 enhancers now support multiple AI agents via the unified `AgentClient` abstraction:

- **API mode:** Anthropic, Moonshot/Kimi, Google Gemini, OpenAI
- **LOCAL mode:** Claude Code, Kimi, Codex, Copilot, OpenCode, or any custom agent
- **Auto-detection:** Automatically detects available agent from API keys
- **Custom agents:** `--agent-cmd "my-agent run"` for any CLI-based agent

```bash
skill-seekers create https://react.dev --agent kimi
skill-seekers create https://react.dev --agent codex
skill-seekers create https://react.dev --agent-cmd "my-custom-agent run"
```

## Marketplace & Publishing (v3.5.0)

- **MarketplacePublisher** — Publish skills to Claude Code plugin marketplace repos
- **MarketplaceManager** — Register and manage marketplace repositories
- **ConfigPublisher** — Push configs to registered config source repos
- **`push_config` MCP tool** — Automated config publishing

## MCP Integration (40 Tools)

40 MCP tools across 10 categories for AI agents to prepare their own knowledge:

- Scraping tools (11) — All 17 source types accessible
- Config management, validation, packaging, installation
- Marketplace publishing and config pushing
- Supports Claude Code Desktop, Cursor, and other MCP-compatible agents

## CLI Commands (27+)

Key commands:
- `create` — Unified entry point for all source types with auto-detection
- `doctor` (v3.5.0) — 8 diagnostic checks for troubleshooting
- `sync-config` (v3.3.0) — Crawl doc sites and sync URL lists
- `package` — Export to any platform with `--target`
- `install` / `install-agent` — Install to AI agent directories
- `workflows` — Manage enhancement workflow presets

## Architecture Documentation (v3.4.0)

- **21 UML diagrams** created with StarUML, synced from source code
- 14 class diagrams covering all modules
- 7 behavioral diagrams (sequence, activity, component)
- [View Architecture Diagrams](/architecture)
- [Full API Reference](/api-docs)

## Security (v3.5.0)

- **Prompt injection detection** — Bundled workflow scans scraped content for injection patterns
- **defusedxml** for XXE protection in sitemap parsing
- **Path traversal validation** for config names
- **Auth token cleanup** from cached Git configs

## Quality & Testing

- **3194+ tests passing** with 39 expected skips
- Comprehensive coverage across all 17 source types
- Integration tests with local HTTP servers
- Performance benchmarks with stabilized thresholds
