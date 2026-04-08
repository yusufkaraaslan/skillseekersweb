---
title: Feature Support Matrix & Platform Comparison
description: Complete feature support matrix across all 12+ AI platforms, 17 source types, 40 MCP tools, and 18 agent install paths
section: reference
order: 4
---

# Feature Support Matrix & Platform Comparison

**Complete comparison of Skill Seekers v3.5.0 features across all supported platforms.**

## Platform Overview

Skill Seekers supports **12+ target platforms** organized into tiers:

### Tier 1: Direct Skill Platforms

| Platform | CLI Target | Format | Enhancement | Status |
|----------|-----------|--------|-------------|--------|
| **Claude AI** | `--target claude` | ZIP, YAML frontmatter | LOCAL + API | Production |
| **Google Gemini** | `--target gemini` | tar.gz, plain markdown | API only | Production |
| **OpenAI / GPT** | `--target openai` | ZIP, assistant instructions | API only | Production |
| **OpenCode** | `--target opencode` | Directory, dual-format YAML | LOCAL + API | Production |

### Tier 2: OpenAI-Compatible Platforms (v3.4.0+)

| Platform | CLI Target | Base |
|----------|-----------|------|
| **Kimi** | `--target kimi` | OpenAICompatibleAdaptor |
| **DeepSeek** | `--target deepseek` | OpenAICompatibleAdaptor |
| **Qwen** | `--target qwen` | OpenAICompatibleAdaptor |
| **OpenRouter** | `--target openrouter` | OpenAICompatibleAdaptor |
| **Together AI** | `--target together` | OpenAICompatibleAdaptor |
| **Fireworks AI** | `--target fireworks` | OpenAICompatibleAdaptor |
| **MiniMax** | `--target minimax` | OpenAICompatibleAdaptor |

### Tier 3: RAG & Vector Platforms

| Platform | CLI Target | Format |
|----------|-----------|--------|
| **LangChain** | `--target langchain` | LangChain Documents |
| **LlamaIndex** | `--target llama-index` | TextNodes |
| **Haystack** | `--target haystack` | Haystack Documents |
| **Pinecone** | `--target markdown` | Markdown for upsert |
| **ChromaDB** | `--format chroma` | Vector-ready |
| **FAISS** | `--format faiss` | Vector-ready |
| **Qdrant** | `--format qdrant` | Vector-ready |
| **Weaviate** | `--format weaviate` | Vector-ready |

### Tier 4: AI Coding Assistants

| Agent | Install Path | Method |
|-------|-------------|--------|
| Cursor | `skill-seekers install-agent cursor` | .cursorrules |
| Windsurf | `skill-seekers install-agent windsurf` | Rules file |
| Cline | `skill-seekers install-agent cline` | Context file |
| Continue.dev | `skill-seekers install-agent continue` | Context |
| Roo | `skill-seekers install-agent roo` | Rules |
| Aider | `skill-seekers install-agent aider` | Context |
| Bolt | `skill-seekers install-agent bolt` | Rules |
| Kilo | `skill-seekers install-agent kilo` | Context |

---

## Source Type Support (17)

| # | Source | CLI | Auto-Detect | Optional Dep |
|---|--------|-----|-------------|-------------|
| 1 | Documentation (web) | `create <url>` | HTTP/HTTPS URLs | - |
| 2 | GitHub repository | `create owner/repo` | owner/repo or github.com | - |
| 3 | PDF document | `create file.pdf` | `.pdf` extension | - |
| 4 | Local codebase | `create ./path` | Directory paths | - |
| 5 | Word (.docx) | `create file.docx` | `.docx` extension | - |
| 6 | EPUB e-book | `create file.epub` | `.epub` extension | `[epub]` |
| 7 | Video | `video --url <url>` | YouTube/Vimeo URLs | `[video]` |
| 8 | Jupyter Notebook | `create file.ipynb` | `.ipynb` extension | `[jupyter]` |
| 9 | Local HTML | `create file.html` | `.html`/`.htm` | - |
| 10 | OpenAPI/Swagger | `create spec.yaml` | Content sniffing | - |
| 11 | AsciiDoc | `create file.adoc` | `.adoc`/`.asciidoc` | `[asciidoc]` |
| 12 | PowerPoint | `create file.pptx` | `.pptx` extension | `[pptx]` |
| 13 | RSS/Atom feed | `create feed.rss` | `.rss`/`.atom` | `[rss]` |
| 14 | Man pages | `create cmd.1` | `.1`-`.8`/`.man` | - |
| 15 | Confluence wiki | `confluence` | API/export dir | `[confluence]` |
| 16 | Notion pages | `notion` | API/export dir | `[notion]` |
| 17 | Slack/Discord | `chat` | Export dir/API | `[chat]` |

---

## MCP Tools (40)

40 tools across 10 categories:

| Category | Tools | Description |
|----------|-------|-------------|
| Scraping | 11 | All 17 source types via `scrape_*` and `scrape_generic` tools |
| Config | 4 | Create, read, update, validate configs |
| Packaging | 3 | Package, upload, install skills |
| Analysis | 3 | Codebase analysis, quality check, estimate |
| Enhancement | 3 | Enhance, workflow management |
| Marketplace | 3 | Publish, manage, push configs |
| Sync | 2 | Sync configs, monitor changes |
| Installation | 3 | Install to agents, manage paths |
| Info | 3 | Doctor, version, help |
| Other | 5 | Stream, multilang, etc. |

---

## Enhancement Agent Support

| Agent | API Mode | LOCAL Mode | Config Flag |
|-------|----------|-----------|-------------|
| Claude | Anthropic API | Claude Code CLI | `--agent claude` (default) |
| Kimi | Moonshot API | Kimi CLI | `--agent kimi` |
| Codex | - | Codex CLI | `--agent codex` |
| Copilot | - | Copilot CLI | `--agent copilot` |
| OpenCode | - | OpenCode CLI | `--agent opencode` |
| Custom | - | Any CLI | `--agent-cmd "cmd"` |

Enhancement levels:
- **Level 0**: No AI enhancement
- **Level 1**: Basic SKILL.md enhancement
- **Level 2**: + Architecture and config analysis
- **Level 3**: + Pattern and test enhancement
