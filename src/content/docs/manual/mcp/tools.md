---
title: MCP Tools Reference
description: Complete reference for all 26 MCP tools available in Skill Seekers - natural language commands for AI agents
section: manual
subsection: mcp
order: 2
---

# MCP Tools Reference

Skill Seekers provides **26 MCP (Model Context Protocol) tools** for Claude Code Desktop and other AI agents. These tools enable natural language commands for skill creation, codebase analysis, and knowledge management.

## Overview

MCP tools allow AI agents to:
- **Create skills** from documentation, code, and PDFs
- **Analyze codebases** with C3.x pattern detection
- **Enhance knowledge** with AI-powered improvements
- **Manage configurations** for different platforms

All tools work across **5 AI agent platforms**: Claude Code, Cursor, Windsurf, VS Code, and IntelliJ.

---

## Tool Categories

### 🎯 Skill Creation Tools (8)

Tools for creating skills from various sources:

| Tool | Description | Example Command |
|------|-------------|-----------------|
| `scrape_docs` | Scrape documentation websites | "Scrape React docs" |
| `scrape_github` | Analyze GitHub repositories | "Analyze facebook/react" |
| `scrape_pdf` | Extract content from PDFs | "Extract my-api.pdf" |
| `unified_scrape` | Multi-source skill creation | "Create skill from docs + GitHub" |
| `create_skill` | Create skill from local files | "Create skill from ./my-project" |
| `clone_skill` | Duplicate existing skill | "Clone my-react skill" |
| `merge_skills` | Combine multiple skills | "Merge react and redux skills" |
| `split_skill` | Split large skills | "Split skill into smaller chunks" |

### 🔍 Analysis Tools (6)

C3.x codebase analysis capabilities:

| Tool | Description | Example Command |
|------|-------------|-----------------|
| `analyze_codebase` | Full codebase analysis | "Analyze this codebase" |
| `detect_patterns` | Find design patterns | "Detect patterns in src/" |
| `extract_tests` | Pull test examples | "Extract test examples" |
| `generate_guides` | Create how-to guides | "Generate setup guide" |
| `analyze_config` | Config pattern extraction | "Analyze config files" |
| `generate_architecture` | Create ARCHITECTURE.md | "Generate architecture doc" |

### ✨ Enhancement Tools (4)

AI-powered skill improvements:

| Tool | Description | Example Command |
|------|-------------|-----------------|
| `enhance_skill` | AI-enhance a skill | "Enhance my skill" |
| `improve_descriptions` | Better skill descriptions | "Improve descriptions" |
| `add_examples` | Generate code examples | "Add Python examples" |
| `validate_skill` | Check skill quality | "Validate this skill" |

### 📦 Packaging Tools (4)

Platform-specific packaging:

| Tool | Description | Example Command |
|------|-------------|-----------------|
| `package_for_claude` | Package for Claude AI | "Package for Claude" |
| `package_for_langchain` | Package for LangChain | "Package for LangChain" |
| `package_for_llamaindex` | Package for LlamaIndex | "Package for LlamaIndex" |
| `package_for_coding` | Package for AI IDEs | "Package for Cursor" |

### ⚙️ Configuration Tools (4)

Management and utilities:

| Tool | Description | Example Command |
|------|-------------|-----------------|
| `list_configs` | Show available configs | "List all configs" |
| `validate_config` | Check config syntax | "Validate my config" |
| `estimate_job` | Estimate time/cost | "Estimate react docs scrape" |
| `resume_job` | Resume interrupted job | "Resume last job" |

---

## Detailed Tool Reference

### scrape_docs

Scrape documentation websites into structured skills.

**Parameters:**
```json
{
  "url": "https://react.dev",
  "max_pages": 100,
  "selectors": { "content": "article" },
  "output_dir": "./output/react"
}
```

**Example Commands:**
- "Scrape React documentation"
- "Scrape https://vuejs.org with 50 pages max"
- "Scrape Django docs using custom selectors"

**Returns:** Path to created skill directory

---

### scrape_github

Analyze GitHub repositories for code patterns and structure.

**Parameters:**
```json
{
  "repo": "facebook/react",
  "include_issues": false,
  "include_tests": true,
  "output_dir": "./output/react-github"
}
```

**Example Commands:**
- "Analyze facebook/react"
- "Scrape GitHub repo with tests included"
- "Analyze python/cpython with issues"

**Returns:** Path to created skill directory

---

### analyze_codebase

Full C3.x analysis suite for local codebases.

**Parameters:**
```json
{
  "directory": "./my-project",
  "comprehensive": true,
  "output_format": "claude"
}
```

**Example Commands:**
- "Analyze this codebase comprehensively"
- "Analyze src/ for patterns"
- "Run C3.x suite on my project"

**Returns:** Analysis results with patterns, tests, and guides

---

### enhance_skill

AI-enhance skill content for better quality.

**Parameters:**
```json
{
  "skill_path": "./output/react",
  "method": "local",
  "platform": "claude"
}
```

**Example Commands:**
- "Enhance my react skill"
- "Use API enhancement for this skill"
- "Enhance with Gemini instead of Claude"

**Returns:** Enhanced skill path

---

### package_for_claude

Package skill for Claude AI platform.

**Parameters:**
```json
{
  "skill_path": "./output/react",
  "include_router": true
}
```

**Example Commands:**
- "Package for Claude"
- "Create Claude skill with router"
- "Package my skill for Claude AI"

**Returns:** Packaged skill ready for upload

---

### estimate_job

Estimate time and cost before running.

**Parameters:**
```json
{
  "config": "configs/react.json",
  "include_enhancement": true
}
```

**Example Commands:**
- "Estimate React docs scrape"
- "How long will this take?"
- "Estimate cost for this job"

**Returns:** Time estimate and cost breakdown

---

## Platform-Specific Features

### Claude Code
- **Transport:** stdio (native)
- **Best For:** Interactive skill creation
- **Features:** Full 26-tool support

### Cursor
- **Transport:** HTTP
- **Best For:** Codebase analysis
- **Features:** 18 core tools

### Windsurf
- **Transport:** HTTP
- **Best For:** Web development skills
- **Features:** 18 core tools

### VS Code
- **Transport:** stdio
- **Best For:** Development workflows
- **Features:** 20 tools

### IntelliJ
- **Transport:** HTTP
- **Best For:** Java/Kotlin projects
- **Features:** 18 core tools

---

## Common Workflows

### Workflow 1: Quick Skill Creation
```
1. scrape_docs → Create skill from docs
2. enhance_skill → AI improvement
3. package_for_claude → Platform packaging
4. validate_skill → Quality check
```

### Workflow 2: Codebase Analysis
```
1. analyze_codebase → Full analysis
2. detect_patterns → Find patterns
3. extract_tests → Get examples
4. generate_guides → Create tutorials
5. package_for_coding → IDE integration
```

### Workflow 3: Multi-Source Skill
```
1. unified_scrape → Combine sources
2. merge_skills → Merge outputs
3. enhance_skill → AI enhancement
4. package_for_langchain → RAG pipeline
```

---

## Troubleshooting

### Tool Not Found
```bash
# Re-run MCP setup
./setup_mcp.sh
```

### Permission Errors
```bash
# Check MCP settings file
ls -la ~/.claude/mcp_settings.json
```

### Timeout Issues
- Increase timeout in MCP settings
- Use `--timeout` flag for long operations

---

## See Also

- [MCP Setup Guide](/docs/manual/mcp/setup) - Installation and configuration
- [Multi-Agent Setup](/docs/guides/multi-agent) - Using with different AI agents
- [Claude Integration](/docs/reference/claude-integration) - Claude-specific features
