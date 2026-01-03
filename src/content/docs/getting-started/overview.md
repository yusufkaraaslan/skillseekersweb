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
- GitHub repositories (with code analysis)
- PDF files (with OCR support)
- Combined unified skills from multiple sources

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
- Smart caching for faster re-runs

## Next Steps

- [Installation Guide](/docs/getting-started/installation) - Set up Skill Seekers
- [Quick Start](/docs/getting-started/quick-start) - Create your first skill in 5 minutes
- [Browse Configs](/configs) - Explore 27 pre-built configurations
