---
title: create — Unified Skill Creation
description: The unified create command — auto-detects source type and creates AI skills from any of 17 supported sources
section: cli
order: 1
---

# `skill-seekers create`

The `create` command is the primary entry point for creating AI skills. It auto-detects the source type and routes to the appropriate extractor.

## Usage

```bash
skill-seekers create <source> [options]
```

## Source Auto-Detection

The `SourceDetector` identifies the source type in this order:

1. **File extension** — `.pdf`, `.docx`, `.epub`, `.ipynb`, `.html`, `.pptx`, `.adoc`, `.rss`, `.atom`, `.yaml`/`.yml` (with OpenAPI content sniffing), `.1`-`.8`/`.man`
2. **Video URL** — YouTube, Vimeo patterns
3. **Directory** — `os.path.isdir()` → local codebase
4. **GitHub pattern** — `owner/repo` or `github.com` URLs
5. **HTTP/HTTPS URL** — Documentation website
6. **Bare domain** — Inferred as documentation

## Examples

```bash
# Documentation website
skill-seekers create https://react.dev

# GitHub repository
skill-seekers create facebook/react

# PDF document
skill-seekers create manual.pdf

# Local codebase
skill-seekers create ./my-project

# Jupyter Notebook
skill-seekers create notebook.ipynb

# OpenAPI spec
skill-seekers create openapi.yaml

# Word document
skill-seekers create report.docx

# EPUB e-book
skill-seekers create book.epub

# PowerPoint
skill-seekers create presentation.pptx
```

## Key Options

| Flag | Description |
|------|-------------|
| `--target <platform>` | Output platform (claude, gemini, openai, langchain, etc.) |
| `--agent <name>` | AI agent for enhancement (claude, kimi, codex, copilot, opencode) |
| `--agent-cmd <cmd>` | Custom agent command |
| `--enhance-level <0-3>` | Enhancement depth (0=none, 1=basic, 2=architecture, 3=full) |
| `--enhance-workflow <name>` | Apply workflow preset |
| `--browser` | Enable Playwright rendering for SPA sites |
| `--name <name>` | Override skill name |
| `--max-pages <n>` | Limit pages to scrape (default: 500) |

## Pipeline

The create command follows this pipeline:

1. `SourceDetector.detect(source)` — Identify source type
2. `ExecutionContext.initialize()` — Set up configuration singleton
3. `get_converter(type, config)` — Factory creates appropriate converter
4. `converter.run()` — Extract + build skill (Template Method pattern)
5. `_run_enhancement(ctx)` — AI enhancement (if enabled)
6. `_run_workflows()` — Apply workflow presets

See [Architecture Diagrams](/architecture#create-pipeline) for the full sequence diagram.
