---
title: CLI Overview
description: Overview of all Skill Seekers CLI commands - scrape, enhance, package, and upload skills for multiple platforms
section: cli
order: 1
---

# CLI Overview

Skill Seekers provides a comprehensive command-line interface for creating, enhancing, and deploying AI skills across multiple platforms.

## Available Commands

### Core Commands

| Command | Purpose | Time | Example |
|---------|---------|------|---------|
| [`scrape`](/docs/cli/scrape) | Scrape documentation websites | 20-40 min | `skill-seekers scrape --config configs/react.json` |
| [`github`](/docs/cli/github) | Scrape GitHub repositories | 5-10 min | `skill-seekers github --repo facebook/react` |
| [`pdf`](/docs/cli/pdf) | Extract content from PDFs | 5-15 min | `skill-seekers pdf --pdf manual.pdf --name myskill` |
| [`unified`](/docs/cli/unified) | Multi-source scraping | 30-45 min | `skill-seekers unified --config configs/react_unified.json` |

### Processing Commands

| Command | Purpose | Time | Example |
|---------|---------|------|---------|
| [`enhance`](/docs/cli/enhance) | AI-enhance skills | 30-60 sec | `skill-seekers enhance output/react/` |
| [`package`](/docs/cli/package) | Package for platforms | Instant | `skill-seekers package output/react/ --target claude` |
| [`upload`](/docs/cli/upload) | Upload to LLM platforms | 5-10 sec | `skill-seekers upload output/react.zip` |

### Utility Commands

| Command | Purpose | Time |
|---------|---------|------|
| `estimate` | Estimate page count | 1-2 min |
| `validate` | Validate config files | Instant |
| `install` | One-command install | Variable |

## Quick Reference

### Complete Workflow

```bash
# 1. Scrape documentation
skill-seekers scrape --config configs/react.json

# 2. Enhance with AI
skill-seekers enhance output/react/

# 3. Package for platform
skill-seekers package output/react/ --target claude

# 4. Upload to platform
skill-seekers upload output/react.zip
```

### Multi-Platform Workflow

```bash
# Scrape once
skill-seekers scrape --config configs/react.json

# Package for all platforms
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown

# Upload to platforms
skill-seekers upload output/react.zip --target claude
skill-seekers upload output/react-gemini.tar.gz --target gemini
skill-seekers upload output/react-openai.zip --target openai
```

## Command Categories

### Source Commands

Extract content from various sources:
- **scrape** - Documentation websites
- **github** - GitHub repositories
- **pdf** - PDF documents
- **unified** - Multiple sources combined

### Processing Commands

Transform and package skills:
- **enhance** - AI-powered improvement
- **package** - Platform-specific packaging
- **upload** - Deploy to LLM platforms

## Common Options

Most commands support these options:

- `--config CONFIG` - Load configuration from file
- `--name NAME` - Skill name
- `--output DIR` - Output directory
- `--help` - Show command help

## Getting Help

```bash
# General help
skill-seekers --help

# Command-specific help
skill-seekers scrape --help
skill-seekers github --help
skill-seekers package --help
```

## Next Steps

- [Scrape Command](/docs/cli/scrape) - Documentation scraping
- [GitHub Command](/docs/cli/github) - Repository scraping
- [Package Command](/docs/cli/package) - Multi-platform packaging
- [Upload Command](/docs/cli/upload) - Platform deployment
