---
title: Overview
description: Learn what Skill Seekers is and how it transforms documentation into AI skills
section: getting-started
order: 1
---

# What is Skill Seekers?

Skill Seekers is an automated tool that transforms documentation websites, GitHub repositories, and PDF files into production-ready Claude AI skills. Instead of manually reading and summarizing documentation, Skill Seekers:

1. **Scrapes** multiple sources (docs, GitHub repos, PDFs) automatically
2. **Analyzes** code repositories with deep AST parsing
3. **Detects** conflicts between documentation and code implementation
4. **Organizes** content into categorized reference files
5. **Enhances** with AI to extract best examples and key concepts
6. **Packages** everything into an uploadable file for Claude

**Result:** Get comprehensive Claude skills for any framework, API, or tool in 20-40 minutes instead of hours of manual work.

## Why Use Skill Seekers?

- 🎯 **For Developers**: Create skills from documentation + GitHub repos with conflict detection
- 🎮 **For Game Devs**: Generate skills for game engines (Godot docs + GitHub, Unity, etc.)
- 🔧 **For Teams**: Combine internal docs + code repositories into single source of truth
- 📚 **For Learners**: Build comprehensive skills from docs, code examples, and PDFs
- 🔍 **For Open Source**: Analyze repos to find documentation gaps and outdated examples

## Quick Example

```bash
# Install
pip install skill-seekers

# Scrape documentation
skill-seekers scrape https://docs.astro.build/en/getting-started/

# Package for Claude
skill-seekers package output/astro/

# Upload to Claude
skill-seekers upload astro.zip
```

That's it! You now have a comprehensive Astro skill in Claude.

## Key Capabilities

### Multi-Source Support
- Documentation websites (any site with docs)
- GitHub repositories (with deep C3.x analysis)
- PDF files (with OCR support)
- Combined unified skills from multiple sources

### Three-Stream Architecture (NEW v2.6.0)
- **Stream 1: Code** - Deep C3.x analysis (patterns, examples, architecture)
- **Stream 2: Docs** - Repository documentation (README, docs/)
- **Stream 3: Insights** - GitHub issues (common problems + solutions)
- Automatic conflict detection between docs and code
- Real user problems and solutions from GitHub

### C3.x Codebase Analysis (NEW v2.6.0)
- **C3.1:** Design pattern detection (Strategy, Factory, etc.)
- **C3.2:** Test example extraction (working code from tests)
- **C3.3:** How-to guide generation (automated tutorials)
- **C3.4:** Configuration analysis (9 formats with security scan)
- **C3.7:** Architectural pattern detection (MVC, microservices, etc.)

### Multi-Platform Export
- **Claude AI** (default) - ZIP + YAML format
- **Google Gemini** - tar.gz with platform optimization
- **OpenAI ChatGPT** - ZIP with vector store
- **Generic Markdown** - Universal markdown format

### Intelligent Processing
- Automatic content categorization
- Code language detection (Python, JS, C++, GDScript, etc.)
- Conflict detection between docs and code
- AI-powered enhancement and summarization
- Smart caching for faster re-runs (50% speedup)

## What's New in v2.6.0

**Three-Stream GitHub Architecture:**
- Automatically splits GitHub repos into Code, Docs, and Insights streams
- Real user problems and solutions from GitHub issues
- Complete understanding of any framework

**Enhanced C3.x Analysis:**
- Design pattern detection (Strategy, Factory, Observer, etc.)
- Test example extraction from test files
- Automated how-to guide generation
- Configuration security analysis
- Architectural pattern detection

[Read the full v2.6.0 announcement →](/docs/features/three-stream-architecture)

## Next Steps

- [Installation Guide](/docs/getting-started/installation) - Set up Skill Seekers v2.6.0
- [Quick Start](/docs/getting-started/quick-start) - Create your first skill in 5 minutes
- [Browse Configs](/configs) - Explore 24 pre-built configurations
