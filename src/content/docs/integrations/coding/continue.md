---
title: Continue.dev
description: Universal AI coding plugin for VS Code, JetBrains, Vim.
section: integrations
subsection: coding
order: 14
---

# Continue.dev

**Universal AI coding plugin** for VS Code, JetBrains, Vim.

## Quick Start

```bash
skill-seekers scrape --target markdown --config configs/react.json
```

## Setup

### 1. Install Continue.dev
From your IDE's plugin marketplace.

### 2. Generate Context
```bash
skill-seekers scrape --config configs/react.json --target markdown
```

### 3. Configure Continue

Add to `~/.continue/config.json`:

```json
{
  "contextProviders": [
    {
      "name": "react-docs",
      "type": "file",
      "file": "/path/to/output/react-markdown/SKILL.md"
    }
  ]
}
```

### 4. Use in Chat

Type `@react-docs` in Continue chat to reference the framework knowledge.

## Features

- ✅ **Universal** - Works in any IDE
- ✅ **No limits** - Full context available
- ✅ **HTTP context** - Dynamic loading
- ✅ **Multi-model** - Claude, GPT-4, local

## Comparison

| Feature | Cursor | Windsurf | Cline | Continue.dev |
|---------|--------|----------|-------|--------------|
| **IDE** | Cursor only | Windsurf only | VS Code only | Any IDE |
| **Limit** | None | 12K chars | None | None |
| **MCP** | ✅ | ✅ | ✅ | ✅ |

## Best For

- **Multi-IDE users** - Use same rules everywhere
- **JetBrains/Vim** - Not limited to VS Code
- **Large frameworks** - No character limits

## Next Steps

- [AI Coding Guide](/blog/2026-02-14-ai-coding-guide) - Full tutorial
- [RAG Pipelines](/docs/integrations/rag) - For knowledge bases
