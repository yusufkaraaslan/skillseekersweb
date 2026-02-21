---
title: Overview
description: Learn what Skill Seekers is and how it transforms docs, GitHub repos, PDFs, and codebases into structured knowledge for any AI system
section: getting-started
order: 1
---

# What is Skill Seekers?

Skill Seekers is the **AI Skill & RAG Toolkit**. It transforms **documentation websites, GitHub repositories, PDF files, and local codebases** into structured AI skills and RAG-ready knowledge for Claude, Gemini, OpenAI, LangChain, LlamaIndex, Cursor, and any LLM platform.

**What is an AI Skill?** A curated, structured knowledge package that gives AI systems deep expertise in a specific domain—frameworks, APIs, codebases, or documentation. Instead of generic responses, your AI "knows" the subject matter.

**The Problem:** 70% of AI skill development is spent on data preprocessing—scraping, cleaning, analyzing code, extracting patterns, and structuring knowledge. **We automate all of it.**

Instead of manually building skills, Skill Seekers:

1. **Extracts** from any source - docs, GitHub repos, PDFs, local codebases
2. **Analyzes** with deep parsing (AST for code, OCR for PDFs, semantic chunking)
3. **Detects** patterns, design principles, and code architecture
4. **Organizes** content into categorized skill files with rich metadata
5. **Enhances** with AI to extract best practices, examples, and key concepts
6. **Packages** into 16+ formats for any AI system—skills, RAG, or coding assistants

**Result:** Production-ready AI skills in 15-45 minutes instead of days of manual work.

## Why Use Skill Seekers?

### For AI Skill Developers
- 🎯 **AI Skills for Claude, Gemini, OpenAI**: Create structured knowledge that gives AI systems true expertise
- 🧠 **Codebase Intelligence**: Turn any GitHub repo or local project into an AI skill with deep pattern analysis
- 📊 **Architecture Understanding**: AI learns your project's structure, patterns, and design decisions
- 🚀 **99% Faster**: Days of skill building → 15-45 minutes
- ✅ **Battle-Tested**: 1,852 tests, 24+ framework presets, production-ready

### For Software Engineers & Developers
- 💻 **Codebase Analysis**: Understand unfamiliar projects with AI-powered architecture detection
- 🔍 **Pattern Discovery**: Automatically detect design patterns (MVC, Factory, Strategy, etc.)
- 📚 **Documentation Generation**: Auto-generate architecture docs, API references, and how-to guides
- 🧪 **Test-Driven Insights**: Extract working code examples from test suites
- 🎮 **Game Development**: Godot signal flow analysis, Unity/Unreal C#/C++ pattern detection

### For AI Coding Assistant Users
- 🛠️ **Cursor, Windsurf, Cline, Continue.dev**: Generate `.cursorrules` for framework expertise
- 🎯 **Persistent Context**: AI "knows" your frameworks and codebase without manual prompting
- 🔄 **Always Current**: Update skills in 5 minutes when frameworks or code changes

### For RAG Builders & AI Engineers
- 🤖 **RAG Systems**: Build production-grade Q&A bots, chatbots, documentation portals
- 🌐 **Platform-Agnostic**: Export to LangChain, LlamaIndex, Pinecone, Chroma, Weaviate, Haystack
- 🔄 **Multi-Source**: Combine docs + GitHub + PDFs + codebases automatically

### For Teams & Enterprises
- 🔧 **Internal Knowledge Base**: Transform internal docs + code repositories into unified AI skills
- 👥 **Share Configs**: Private git repos for team skill configurations
- 🔄 **CI/CD Ready**: GitHub Actions for automated skill updates when code changes

## Quick Example (v3.0+ Unified Command)

```bash
# Install
pip install skill-seekers

# Create skill from any source with one command
skill-seekers create https://react.dev --target claude

# From GitHub repository
skill-seekers create https://github.com/owner/repo --target langchain

# From PDF
skill-seekers create ./manual.pdf --target openai

# From local codebase
skill-seekers create ./my-project --target llamaindex

# With workflow enhancement (v3.1.0)
skill-seekers create https://docs.python.org --target claude --enhance-workflow api-documentation
```

That's it! You now have AI-ready skills from ANY source.

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

### v3.1.0: Enhancement Workflows

**New workflow system for consistent, reusable enhancement strategies:**

```bash
# Use bundled preset
skill-seekers create <source> --enhance-workflow security-focus

# Chain multiple workflows
skill-seekers create <source> --enhance-workflow minimal --enhance-workflow api-documentation

# Create custom workflow
cat > my-workflow.yaml << 'EOF'
name: "custom-analysis"
stages:
  - name: "Deep Analysis"
    prompt: "Analyze this code for performance patterns..."
    model: "claude-sonnet-4"
EOF
skill-seekers workflows add my-workflow.yaml
```

**Bundled presets:** `default`, `minimal`, `security-focus`, `architecture-comprehensive`, `api-documentation`

### C3.x Codebase Analysis
- **C3.1:** Design pattern detection (Strategy, Factory, etc.)
- **C3.2:** Test example extraction (working code from tests)
- **C3.3:** How-to guide generation (automated tutorials)
- **C3.4:** Configuration analysis (9 formats with security scan)
- **C3.5:** Architecture overview generation
- **C3.7:** Architectural pattern detection (MVC, MVVM, etc.)

### Multi-Agent Support
- **Claude Code** (default) - Native stdio transport
- **Cursor** - HTTP transport
- **Windsurf** - HTTP transport
- **VS Code + Cline** - MCP integration
- **IntelliJ IDEA** - MCP integration

### Intelligent Processing
- **Smart chunking** - Preserves code blocks, maintains context (512 token chunks)
- **27+ languages** - Python, JavaScript, Go, Rust, C++, C#, GDScript, and more
- **Godot support** - Signal flow detection and pattern analysis
- **Cloud storage** - Direct upload to S3, GCS, Azure
- **CI/CD ready** - GitHub Actions + Docker

## What's New in v3.1.0

**Enhancement Workflows:**
- **5 bundled presets** - Ready-to-use enhancement strategies
- **Custom workflows** - Create your own YAML workflow definitions
- **Multiple workflow chaining** - Combine presets for comprehensive analysis
- **CLI management** - `workflows list`, `show`, `add`, `remove`, `validate`

**Improved CLI:**
- **Unified `create` command** - One command for all source types
- **Multiple workflow flags** - Apply several workflows in one command
- **Config file workflow support** - Define workflows in JSON configs

## What's New in v3.0.0

**Universal Intelligence Platform:**

- **16 platform adaptors** (up from 4) - LangChain, LlamaIndex, Chroma, FAISS, Haystack, Qdrant, Weaviate, Pinecone, Claude, Gemini, OpenAI, Cursor, Windsurf, Cline, Continue.dev
- **26 MCP tools** (up from 9) - AI agents prepare their own knowledge
- **Cloud storage** - AWS S3, Google Cloud Storage, Azure Blob Storage
- **CI/CD ready** - GitHub Action + Docker support
- **Three-stream GitHub fetcher** - Code + Docs + Issues streams
- **1,852 tests** (up from 700+) - Production-ready quality

[Read the full changelog →](/docs/community/changelog)

## Next Steps

- [Installation Guide](/docs/getting-started/installation) - Set up Skill Seekers
- [Quick Start](/docs/getting-started/quick-start) - Create your first skill in 5 minutes
- [Browse Configs](/configs) - Explore 24 pre-built configurations
