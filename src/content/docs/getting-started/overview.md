---
title: Overview
description: Learn what Skill Seekers is and how it transforms docs, GitHub repos, PDFs, and codebases into structured knowledge for any AI system
section: getting-started
order: 1
---

# What is Skill Seekers?

Skill Seekers is the **universal preprocessor for AI systems**. It transforms **documentation websites, GitHub repositories, PDF files, and local codebases** into structured knowledge for RAG pipelines, AI coding assistants, Claude skills, and any LLM platform.

**70% of RAG development time is spent on data preprocessing**—scraping, cleaning, chunking, and structuring documentation. **We automate all of it.**

Instead of manually preprocessing data, Skill Seekers:

1. **Extracts** from any source - docs, GitHub repos, PDFs, local codebases
2. **Analyzes** with deep parsing (AST for code, OCR for PDFs, semantic chunking)
3. **Detects** conflicts between documentation and code implementation
4. **Organizes** content into categorized reference files with rich metadata
5. **Enhances** with AI to extract best examples and key concepts
6. **Packages** into 16+ formats for any AI system

**Result:** Production-ready AI knowledge in 15-45 minutes instead of days of manual work.

## Why Use Skill Seekers?

### For RAG Builders & AI Engineers
- 🤖 **RAG Systems**: Build production-grade Q&A bots, chatbots, documentation portals
- 🚀 **99% Faster**: Days of preprocessing → 15-45 minutes
- ✅ **Battle-Tested**: 1,852 tests, 24+ framework presets, production-ready
- 🔄 **Multi-Source**: Combine docs + GitHub + PDFs + codebases automatically
- 🌐 **Platform-Agnostic**: Export to LangChain, LlamaIndex, Pinecone, or custom

### For AI Coding Assistant Users
- 💻 **Cursor, Windsurf, Cline, Continue.dev**: Generate `.cursorrules` for framework expertise
- 🎯 **Persistent Context**: AI "knows" your frameworks without manual prompting
- 📚 **Always Current**: Update rules in 5 minutes when frameworks change

### For Game Developers
- 🎮 **Godot 4.x**: Signal flow analysis (208 signals, 634 connections)
- 🕹️ **Unity/Unreal**: C# and C++ code analysis with pattern detection
- 📖 **Auto-Documentation**: Generate architecture docs from code

### For Teams
- 🔧 **Internal Knowledge**: Combine docs + code repositories into single source of truth
- 👥 **Share Configs**: Private git repos for team configurations
- 🔄 **CI/CD Ready**: GitHub Actions for automated knowledge updates

## Quick Example

```bash
# Install
pip install skill-seekers

# From documentation
skill-seekers scrape --config configs/react.json

# From GitHub repository
skill-seekers scrape --github https://github.com/owner/repo --format langchain

# From PDF
skill-seekers scrape --pdf ./manual.pdf --format llamaindex

# From local codebase
skill-seekers analyze --directory ./my-project --format langchain

# Package for any platform
skill-seekers package output/ --target langchain
```

That's it! You now have RAG-ready documents from ANY source.

## Key Capabilities

### 4 Input Sources
- **Documentation websites** - Any HTML docs (Docusaurus, GitBook, ReadTheDocs)
- **GitHub repositories** - Public & private with deep C3.x analysis
- **PDF files** - Scanned docs, manuals, research papers with OCR
- **Local codebases** - Your projects (27+ languages, game engines)

### 16 Output Formats
| Category | Platforms |
|----------|-----------|
| **RAG/Vectors** | LangChain, LlamaIndex, Chroma, FAISS, Haystack, Qdrant, Weaviate |
| **AI Platforms** | Claude, Gemini, OpenAI |
| **AI Coding** | Cursor, Windsurf, Cline, Continue.dev |
| **Generic** | Markdown, JSON, YAML |

### C3.x Codebase Analysis
- **C3.1:** Design pattern detection (Strategy, Factory, etc.)
- **C3.2:** Test example extraction (working code from tests)
- **C3.3:** How-to guide generation (automated tutorials)
- **C3.4:** Configuration analysis (9 formats with security scan)
- **C3.9:** Signal flow analysis (Godot, game engines)
- **C3.10:** Multi-agent LOCAL mode support

### Multi-Agent Support
- **Claude Code** (default) - Native stdio transport
- **GitHub Copilot CLI** - Enterprise integration
- **OpenAI Codex CLI** - OpenAI integration
- **OpenCode CLI** - Open source alternative
- **Custom agents** - Any CLI tool

### Intelligent Processing
- **Smart chunking** - Preserves code blocks, maintains context (512 token chunks)
- **27+ languages** - Python, JavaScript, Go, Rust, C++, C#, GDScript, and more
- **Godot support** - Signal flow detection and pattern analysis
- **Cloud storage** - Direct upload to S3, GCS, Azure
- **CI/CD ready** - GitHub Actions + Docker

## What's New in v3.0.0

**Universal Intelligence Platform:**

- **16 platform adaptors** (up from 4) - LangChain, LlamaIndex, Chroma, FAISS, Haystack, Qdrant, Weaviate, Pinecone, Claude, Gemini, OpenAI, Cursor, Windsurf, Cline, Continue.dev
- **26 MCP tools** (up from 9) - AI agents prepare their own knowledge
- **Cloud storage** - AWS S3, Google Cloud Storage, Azure Blob Storage
- **CI/CD ready** - GitHub Action + Docker support
- **Godot game engine** - Full 4.x analysis with signal flow detection
- **7 new languages** - Dart, Scala, SCSS/SASS, Elixir, Lua, Perl (27+ total)
- **Multi-agent support** - Claude, Copilot, Codex, OpenCode
- **1,852 tests** (up from 700+) - Production-ready quality

[Read the full v3.0.0 changelog →](/docs/community/changelog)

## Next Steps

- [Installation Guide](/docs/getting-started/installation) - Set up Skill Seekers v3.0.0
- [Quick Start](/docs/getting-started/first-skill) - Create your first skill in 5 minutes
- [Browse Configs](/configs) - Explore 24 pre-built configurations
