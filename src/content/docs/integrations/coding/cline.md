---
title: Cline
description: VS Code extension with MCP support for advanced AI coding.
section: integrations
subsection: coding
order: 13
---

# Cline

**VS Code extension** with MCP support for advanced AI coding.

## Quick Start

```bash
skill-seekers scrape --target claude --config configs/react.json
cp output/react-claude/.clinerules ./
```

## Setup

### 1. Install Cline
From VS Code Extensions marketplace.

### 2. Generate Rules
```bash
skill-seekers scrape --config configs/react.json --target claude
```

### 3. Copy Rules
```bash
cp output/react-claude/.clinerules ./my-project/
```

### 4. MCP Setup (Optional but Recommended)
```bash
cd /path/to/Skill_Seekers
./setup_mcp.sh
```

This enables natural language commands in Cline:
- "Create a React component skill"
- "Scrape the Django documentation"

## Features

- ✅ **VS Code native** - No IDE switch needed
- ✅ **MCP support** - 26 tools available
- ✅ **No character limits** - Full framework knowledge
- ✅ **Multi-agent** - Claude, GPT-4, local models

## MCP Commands

With MCP enabled:
```
"Generate a skill from the Next.js docs"
"Analyze this GitHub repository"
"Extract patterns from my codebase"
```

## Next Steps

- [Continue.dev](/docs/integrations/coding/continue) - Use in any IDE
- [MCP Setup](/docs/manual/mcp/setup) - Full MCP guide
