---
title: What is Skill Seekers?
description: Introduction to Skill Seekers - the fastest way to create AI skills from documentation websites, GitHub repos, and PDFs for Claude, Gemini, and OpenAI
section: about
order: 1
---

# What is Skill Seekers?

**Skill Seekers** is a powerful documentation-to-AI skill converter that automatically transforms any knowledge source into optimized skills for AI assistants like Claude, Gemini, and OpenAI ChatGPT.

## The Problem

Modern AI assistants are incredibly powerful, but they don't know about your specific tools, frameworks, or internal systems. You need to manually feed them documentation, which is:
- ⏰ **Time-consuming** - Copy-pasting docs takes hours
- 📉 **Incomplete** - Easy to miss important sections
- 🔄 **Repetitive** - Need to do it for every conversation
- 😞 **Frustrating** - Context window limits mean truncated information

## The Solution

Skill Seekers automates the entire process:
1. **Scrapes** documentation websites, GitHub repositories, or PDFs
2. **Analyzes** content with smart categorization and code detection
3. **Enhances** with AI to add explanations and best practices
4. **Packages** into platform-specific formats (Claude, Gemini, OpenAI, or generic Markdown)
5. **Uploads** directly to your AI assistant

**Result:** Your AI assistant becomes an expert on any framework or tool in minutes, not hours.

## Key Capabilities

### Multiple Input Sources
- **Documentation websites** - Scrape any HTML documentation (React, Vue, Django, etc.)
- **GitHub repositories** - Analyze code structure, patterns, and examples
- **PDF files** - Extract text from technical PDFs with OCR support
- **Multi-source skills** - Combine docs + GitHub + PDFs into unified skills

### Intelligent Processing
- **Smart categorization** - Automatically organizes content into logical sections
- **Code detection** - Identifies and formats code examples with language tags
- **Pattern recognition** - Detects design patterns in codebases (C3.x analysis)
- **Test extraction** - Extracts real usage examples from test files
- **How-to generation** - Creates step-by-step tutorials from workflow examples

### AI Enhancement
- **Local enhancement** - Uses Claude Code (FREE with Claude Max subscription)
- **API enhancement** - Uses Claude API for batch processing
- **Quality improvement** - Transforms basic docs into comprehensive guides (3/10 → 9/10 quality)
- **Context-aware** - Adds explanations, best practices, and troubleshooting

### Multi-Platform Support
- **Claude AI** - Native format with YAML frontmatter
- **Google Gemini** - tar.gz with 1M token context support
- **OpenAI ChatGPT** - ZIP with vector store integration
- **Generic Markdown** - Universal format for any LLM

### MCP Integration
- **18 MCP tools** for Claude Code Desktop
- **5 AI coding agents** supported (Claude Code, Cursor, Windsurf, VS Code, IntelliJ)
- **One-command workflows** - Fetch, scrape, enhance, package, upload automatically

## Version

Current version: **v2.6.0** (January 2026)

## Who Should Use Skill Seekers?

- **Developers** building with modern frameworks (React, Vue, Django, FastAPI, etc.)
- **Technical writers** creating AI-ready documentation
- **Teams** sharing internal knowledge across organizations
- **Educators** preparing teaching materials for AI assistants
- **Researchers** organizing technical knowledge bases

## Quick Example

```bash
# Install
pip install skill-seekers

# Create a skill from React docs
skill-seekers scrape --config configs/react.json

# Enhance with AI (FREE with Claude Max)
skill-seekers enhance output/react/

# Package and upload to Claude
skill-seekers package output/react/ --upload
```

**Result:** Claude now understands React hooks, components, routing, and best practices!

## Next Steps

- [Installation Guide](/docs/getting-started/installation) - Install Skill Seekers
- [Your First Skill](/docs/getting-started/first-skill) - Create your first AI skill in 3 steps
- [Features Overview](/docs/about/features) - Explore all capabilities

---

**Open Source** - MIT License | **Community-Driven** - Contributions welcome!
