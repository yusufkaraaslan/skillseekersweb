---
title: What is Skill Seekers?
description: Introduction to Skill Seekers - the AI Skill & RAG Toolkit. Transform docs, GitHub repos, PDFs, and codebases into structured AI skills and RAG knowledge for Claude, Gemini, OpenAI, and any LLM platform.
section: about
order: 1
---

# What is Skill Seekers?

**Skill Seekers** is the **AI Skill & RAG Toolkit**. It transforms **documentation websites, GitHub repositories, PDF files, and local codebases** into structured AI skills and RAG-ready knowledge for Claude, Gemini, OpenAI, LangChain, LlamaIndex, Cursor, and any LLM platform.

## The Problem

Building AI systems that truly understand a domain requires extensive preparation:

- **AI Skill Development**: 70% of time is spent preprocessing—scraping docs, analyzing code, extracting patterns
- **Codebase Onboarding**: Understanding a new project takes weeks of manual analysis
- **AI Assistant Expertise**: Generic AI responses lack deep framework and codebase knowledge
- **Multi-format Needs**: Different AI systems need different formats (skills, RAG, coding rules)

**Result:** Everyone rebuilds the same preprocessing infrastructure. **Stop rebuilding. Start using.**

## The Solution

Skill Seekers automates AI skill creation and knowledge preprocessing:

1. **Extract** from any source - docs, GitHub repos, PDFs, local codebases
2. **Analyze** with deep code parsing (AST analysis, pattern detection, architecture mapping)
3. **Enhance** with AI to extract best practices, examples, and key concepts (using **v3.1.0 workflow presets**)
4. **Package** into 16+ output formats (AI skills, RAG pipelines, coding rules, vector DBs)
5. **Deploy** to any AI system with one command

**Result:** Go from any source to production-ready AI skills in 15-45 minutes, not days.

## Key Capabilities

### 4 Input Sources
- **Documentation websites** - Scrape any HTML documentation (Docusaurus, GitBook, ReadTheDocs)
- **GitHub repositories** - Analyze code structure, patterns, and examples (public & private)
- **PDF files** - Extract text from technical PDFs with OCR support (scanned docs, manuals, research papers)
- **Local codebases** - Analyze your own projects, game engines, or internal code (27+ languages)

### 16 Output Formats
| Category | Platforms |
|----------|-----------|
| **RAG/Vectors** | LangChain, LlamaIndex, Chroma, FAISS, Haystack, Qdrant, Weaviate |
| **AI Platforms** | Claude, Gemini, OpenAI |
| **AI Coding** | Cursor, Windsurf, Cline, Continue.dev |
| **Generic** | Markdown, JSON, YAML |

### v3.1.0: Enhancement Workflows

New in v3.1.0: **Workflow presets** for AI enhancement. Choose from bundled presets or create your own:

```bash
# Use a preset workflow
skill-seekers create https://react.dev --enhance-workflow security-focus

# Apply multiple workflows
skill-seekers create https://github.com/owner/repo --enhance-workflow minimal --enhance-workflow api-documentation

# Manage workflows
skill-seekers workflows list
skill-seekers workflows show security-focus
```

**Bundled presets:** `default`, `minimal`, `security-focus`, `architecture-comprehensive`, `api-documentation`

### Intelligent Processing
- **Smart categorization** - Automatically organizes content into logical sections
- **Code detection** - Identifies and formats code examples with language tags (27+ languages)
- **Pattern recognition** - Detects design patterns in codebases (C3.x analysis)
- **Test extraction** - Extracts real usage examples from test files
- **How-to generation** - Creates step-by-step tutorials from workflow examples
- **Signal flow analysis** - Godot game engine event detection

### AI Enhancement
- **Local enhancement** - Uses Claude Code (FREE with Claude Max subscription)
- **API enhancement** - Uses Claude API for batch processing
- **Workflow presets** (v3.1.0) - Pre-configured enhancement strategies
- **Quality improvement** - Transforms basic docs into comprehensive guides (3/10 → 9/10 quality)
- **Context-aware** - Adds explanations, best practices, and troubleshooting

### MCP Integration
- **26 MCP tools** for Claude Code Desktop
- **Multi-agent support** - Claude Code, Cursor, Windsurf, VS Code, IntelliJ
- **One-command workflows** - Fetch, scrape, enhance, package, upload automatically

## Version

Current version: **v3.1.0** (February 2026)

**Latest additions:**
- Enhancement workflow presets
- Multiple workflow chaining
- CLI workflows management

## Who Should Use Skill Seekers?

- **AI Skill Developers** - Create structured skills for Claude, Gemini, OpenAI with deep expertise
- **Software Engineers** - Analyze unfamiliar codebases, understand architecture and patterns
- **AI Coding Assistant Users** - Give Cursor, Windsurf, Cline deep framework and project knowledge
- **Game Developers** - Analyze Godot, Unity, Unreal projects with signal flow and pattern detection
- **RAG Engineers** - Build production Q&A systems with preprocessed knowledge
- **Teams** - Combine internal docs + code into unified AI skills and knowledge bases

## Quick Example

```bash
# Install
pip install skill-seekers

# Create skill from any source (v3.0+ unified command)
skill-seekers create https://react.dev --target langchain

# From GitHub repo
skill-seekers create https://github.com/facebook/react --target claude

# From PDF
skill-seekers create ./manual.pdf --target openai

# From local codebase
skill-seekers create ./my-project --target langchain

# With workflow enhancement (v3.1.0)
skill-seekers create https://docs.python.org --target claude --enhance-workflow api-documentation
```

**Result:** You now have AI-ready skills from ANY source!

## Next Steps

- [Installation Guide](/docs/getting-started/installation) - Install Skill Seekers
- [Your First Skill](/docs/getting-started/first-skill) - Create your first AI skill in 3 steps
- [Features Overview](/docs/about/features) - Explore all capabilities
- [Community Showcase](/docs/about/showcase) - See what others have built

---

**Open Source** - MIT License | **Community-Driven** - Contributions welcome!
