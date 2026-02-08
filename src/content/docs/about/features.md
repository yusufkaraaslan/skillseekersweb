---
title: Features Overview
description: Complete overview of Skill Seekers features - scraping, analysis, enhancement, multi-platform support, and MCP integration
section: about
order: 2
---

# Features Overview

Skill Seekers v3.0.0 offers comprehensive capabilities for creating AI skills from any knowledge source.

## 🌐 Input Sources

### Documentation Scraping
- **HTML websites** - Scrape any documentation site (React, Vue, Django, Godot, etc.)
- **llms.txt support** - 10x faster when sites provide AI-optimized documentation
- **Unlimited pages** - No page limits, handles 40K+ page documentation sites
- **Smart selectors** - Automatic content detection or custom CSS selectors
- **Category detection** - Automatically organizes content into logical sections

### GitHub Repository Analysis
- **Unlimited local analysis** - Analyze entire codebases without API rate limits
- **Code structure** - Extracts classes, functions, dependencies
- **README extraction** - Pulls README files from all directories
- **Issue tracking** - Optionally includes GitHub issues and releases
- **Changelog parsing** - Extracts version history and release notes

### PDF Extraction
- **Text extraction** - Extracts text from technical PDFs
- **OCR support** - Handles scanned documents with Tesseract OCR
- **Password-protected** - Supports encrypted PDFs
- **Table extraction** - Extracts tables with structure preservation
- **Parallel processing** - 3x faster with multi-core support

### Multi-Source Skills (Unified Scraping)
- **Combine sources** - Docs + GitHub + PDFs in one skill
- **Conflict detection** - Identifies and resolves duplicate content
- **Priority resolution** - Configurable source priorities
- **Comprehensive knowledge** - Creates complete picture of frameworks/tools

## 🧬 C3.x Codebase Analysis Suite

Advanced code analysis features for understanding codebases:

### C3.1 Pattern Detection
- **10 design patterns** - Detects Singleton, Factory, Observer, Strategy, Decorator, Builder, Adapter, Command, Template Method, Chain of Responsibility
- **9 languages** - Python (AST-based), JavaScript, TypeScript, C++, C, C#, Go, Rust, Java
- **87% precision** - Tested on 100 real-world projects

### C3.2 Test Example Extraction
- **Real usage examples** - Extracts examples from test files
- **5 categories** - Instantiation, method calls, configuration, setup, workflows
- **Quality filtering** - Removes trivial patterns, keeps meaningful examples
- **80%+ high-confidence** - Only includes clear, useful examples

### C3.3 How-To Guide Generation
- **AI-enhanced tutorials** - Transforms test workflows into step-by-step guides
- **5 automatic improvements** - Step descriptions, troubleshooting, prerequisites, next steps, use cases
- **Dual-mode AI** - API mode (fast) or LOCAL mode (FREE with Claude Max)
- **95%+ satisfaction** - Enhanced guides rated highly by users

### C3.4 Configuration Pattern Extraction
- **9 config formats** - JSON, YAML, TOML, ENV, INI, Python, JavaScript, Dockerfile, Docker Compose
- **7 common patterns** - Database, API, logging, cache, email, auth, server configs
- **Security analysis** - Identifies hardcoded secrets and exposed credentials
- **AI-enhanced insights** - Explanations, best practices, migration suggestions

### C3.5 Architectural Overview
- **ARCHITECTURE.md generation** - Comprehensive architectural overview with 8 sections
- **Integrated analysis** - Combines all C3.x outputs into unified skills
- **Default ON** - Automatically runs when local_repo_path is provided

### C3.7 Architectural Pattern Detection
- **8 patterns** - MVC, MVVM, MVP, Repository, Service Layer, Layered, Clean Architecture
- **Framework detection** - Django, Flask, Spring, ASP.NET, Rails, Laravel, Angular, React, Vue.js
- **Evidence-based** - Confidence scoring with detailed evidence

## 🤖 AI Enhancement

### Local Enhancement (FREE)
- **Uses Claude Code** - No API costs! Uses your Claude Max subscription
- **4 execution modes** - Headless (default), Background, Daemon, Interactive
- **30-60 seconds** - Quick enhancement with Claude Sonnet 4.5
- **3/10 → 9/10 quality** - Transforms basic docs into comprehensive guides

### API Enhancement
- **Platform-specific models** - Claude Sonnet 4, Gemini 2.0 Flash, GPT-4o
- **Batch processing** - Efficient for large-scale enhancement
- **Cost-effective** - ~$0.15-$0.30 per skill
- **Quality verification** - Automatic checks before packaging

## 🌍 Multi-Platform Support

### Supported Platforms
- **Claude AI** - Native ZIP format with YAML frontmatter
- **Google Gemini** - tar.gz with 1M token context support
- **OpenAI ChatGPT** - ZIP with vector store and file search
- **Generic Markdown** - Universal format for any LLM

### Complete Feature Parity
- All skill modes work with all platforms
- All CLI commands support `--target` parameter
- All MCP tools support platform selection
- Consistent workflow across platforms

## 🔌 MCP Integration

### 26 MCP Tools for Claude Code
- **Config Management** - generate_config, list_configs, validate_config
- **Scraping** - scrape_docs, scrape_github, scrape_pdf, estimate_pages
- **Processing** - enhance_skill, package_skill, upload_skill
- **Workflows** - install_skill (complete automation)
- **Splitting** - split_config, generate_router (for large docs)
- **Sources** - fetch_config, add_config_source, list_config_sources, remove_config_source

### Multi-Agent Support
- **5 AI agents** - Claude Code, Cursor, Windsurf, VS Code + Cline, IntelliJ IDEA
- **Dual transport** - stdio (default) and HTTP (for web-based agents)
- **Auto-configuration** - `./setup_mcp.sh` configures all detected agents

## 📦 Smart Features

### Automatic llms.txt Detection
- **10x faster** - Downloads AI-optimized docs when available
- **3 variants** - llms-full.txt, llms.txt, llms-small.txt
- **Complete content** - No truncation, preserves full documentation

### Git-Based Config Sources
- **Private repositories** - Fetch configs from private/team repos
- **Team collaboration** - Share configs across organizations
- **Version control** - Track config changes over time
- **Secure auth** - Environment variable tokens only

### Large Documentation Support
- **40K+ pages** - Handles massive documentation sites
- **Config splitting** - Breaks large sites into focused sub-skills
- **Router generation** - Creates intelligent routing between sub-skills
- **Checkpoint/resume** - Resume interrupted scraping sessions

### Quality Assurance
- **Automatic checks** - Quality scoring before packaging (0-100 score, A-F grade)
- **Structure validation** - Validates SKILL.md, references/ directory
- **Link validation** - Checks all internal markdown links
- **Enhancement verification** - Ensures AI enhancement completed successfully

## 🚀 Performance

- **Parallel scraping** - 2-3x faster with async mode
- **Intelligent caching** - 50% faster on re-runs
- **PDF parallel processing** - 3x faster with multi-core support
- **Shallow git clones** - 10-50x faster for git-based configs

## 📊 Statistics

- **1,852 tests** - Comprehensive test coverage, 100% passing
- **24 preset configs** - Ready-to-use configs for popular frameworks
- **4 platforms** - Complete multi-LLM support
- **26 MCP tools** - Full Claude Code integration
- **v3.0.0** - Latest release (February 2026)

## Next Steps

- [Use Cases](/docs/about/use-cases) - When to use Skill Seekers
- [FAQ](/docs/about/faq) - Frequently asked questions
- [Installation](/docs/getting-started/installation) - Get started now
