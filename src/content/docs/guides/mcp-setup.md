---
title: MCP Setup Guide
description: Complete guide to setting up the Skill Seeker MCP server with Claude Code and other AI coding agents - supports 5 agents with automatic configuration
section: guides
order: 2
---

# Complete MCP Setup Guide - MCP 2025 (v2.6.0)

Step-by-step guide to set up the Skill Seeker MCP server with 5 supported AI coding agents.

**Version 2.6.0 Highlights:**
- ✅ **MCP SDK v1.25.0** - Latest protocol support (upgraded from v1.18.0)
- ✅ **FastMCP Framework** - Modern, decorator-based server implementation
- ✅ **Dual Transport** - HTTP + stdio support (choose based on agent)
- ✅ **17 MCP Tools** - Expanded from 9 tools (8 new source management tools)
- ✅ **Multi-Agent Support** - Claude Code, Cursor, Windsurf, VS Code + Cline, IntelliJ IDEA
- ✅ **Auto-Configuration** - One-line setup with `./setup_mcp.sh`
- ✅ **Production Ready** - 34 comprehensive tests, 100% pass rate

---

## Table of Contents

- [What's New in v2.6.0](#whats-new-in-v260)
- [Migration from v2.5.0](#migration-from-v250)
- [Prerequisites](#prerequisites)
- [Quick Start (Recommended)](#quick-start-recommended)
- [Manual Installation](#manual-installation)
- [Agent-Specific Configuration](#agent-specific-configuration)
- [Transport Modes](#transport-modes)
- [Verification](#verification)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)

---

## What's New in v2.6.0

### MCP 2025 Upgrade

**MCP SDK v1.25.0** (upgraded from v1.18.0):
- Latest MCP protocol specification
- Enhanced reliability and performance
- Better error handling and diagnostics

**FastMCP Framework**:
- Decorator-based tool registration (modern Python pattern)
- Simplified server implementation (2200 lines → 708 lines, 68% reduction)
- Modular tool architecture in `tools/` directory
- Easier to maintain and extend

**Dual Transport Support**:
- **stdio transport**: Default, backward compatible with Claude Code and VS Code + Cline
- **HTTP transport**: New, required for Cursor, Windsurf, and IntelliJ IDEA
- Automatic transport detection via agent_detector.py

### New Features

**17 MCP Tools** (expanded from 9):

**Config Tools (3):**
- `generate_config` - Generate config for any documentation site
- `list_configs` - List all available preset configurations
- `validate_config` - Validate config file structure

**Scraping Tools (4):**
- `estimate_pages` - Estimate page count before scraping
- `scrape_docs` - Scrape documentation and build skill
- `scrape_github` - Scrape GitHub repositories
- `scrape_pdf` - Extract content from PDF files

**Packaging Tools (4):**
- `package_skill` - Package skill (supports multi-platform via `target` parameter)
- `upload_skill` - Upload to LLM platform (claude, gemini, openai)
- `enhance_skill` - AI-enhance SKILL.md (NEW - local or API mode)
- `install_skill` - Complete install workflow

**Splitting Tools (2):**
- `split_config` - Split large documentation configs
- `generate_router` - Generate router/hub skills

**Source Tools (5 - NEW):**
- `fetch_config` - Fetch configs from API or git sources
- `submit_config` - Submit new configs to community
- `add_config_source` - Register private git repositories as config sources
- `list_config_sources` - List all registered config sources
- `remove_config_source` - Remove registered config sources

**Multi-Agent Support**:
- **5 supported agents** with automatic detection
- **Auto-configuration script** (`./setup_mcp.sh`) detects and configures all agents
- **Transport auto-selection** based on agent requirements

### Infrastructure

**HTTP Server Features**:
- Health check endpoint: `http://localhost:8000/health`
- SSE endpoint: `http://localhost:8000/sse`
- Configurable host and port
- Production-ready with uvicorn

**New Server Implementation**:
- `server_fastmcp.py` - New FastMCP-based server (recommended)
- `server.py` - Legacy server (deprecated, maintained for compatibility)

---

## Prerequisites

### Required Software

1. **Python 3.10 or higher**
   ```bash
   python3 --version
   # Should show: Python 3.10.x or higher
   ```

2. **AI Coding Agent** (at least one):
   - **Claude Code** - Download from [claude.ai/code](https://claude.ai/code)
   - **Cursor** - Download from [cursor.sh](https://cursor.sh)
   - **Windsurf** - Download from [codeium.com/windsurf](https://codeium.com/windsurf)
   - **VS Code + Cline** - Install [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
   - **IntelliJ IDEA** - Download from [jetbrains.com](https://www.jetbrains.com/idea/)

3. **Skill Seeker repository** (for source installation):
   ```bash
   git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
   cd Skill_Seekers
   ```

   Or install from PyPI:
   ```bash
   pip install skill-seekers
   ```

### System Requirements

- **Operating System**: macOS, Linux, or Windows (WSL)
- **Disk Space**: 100 MB for dependencies + space for generated skills
- **Network**: Internet connection for documentation scraping

---

## Quick Start (Recommended)

The fastest way to set up MCP for all detected agents:

### 1. Run Auto-Configuration Script

```bash
# Navigate to repository
cd /path/to/Skill_Seekers

# Run setup script
./setup_mcp.sh
```

### 2. What the Script Does

1. **Detects Python version** - Ensures Python 3.10+
2. **Installs dependencies** - Installs MCP SDK v1.25.0, FastMCP, uvicorn
3. **Detects agents** - Automatically finds installed AI coding agents
4. **Configures stdio agents** - Auto-configures Claude Code and VS Code + Cline
5. **Shows HTTP setup** - Provides commands for Cursor, Windsurf, IntelliJ IDEA

### 3. Follow On-Screen Instructions

For **stdio agents** (Claude Code, VS Code + Cline):
- Restart the agent
- Configuration is automatic

For **HTTP agents** (Cursor, Windsurf, IntelliJ):
- Start HTTP server: `python -m skill_seekers.mcp.server_fastmcp --http --port 3000`
- Add server URL to agent settings (instructions provided by script)
- Restart the agent

### 4. Verify Setup

In your agent:
```
List all available MCP tools
```

You should see 17 Skill Seeker tools.

---

## Agent-Specific Configuration

### Claude Code (stdio transport)

**Config Location:**
- **macOS**: `~/Library/Application Support/Claude/mcp.json`
- **Linux**: `~/.config/claude-code/mcp.json`
- **Windows**: `%APPDATA%\Claude\mcp.json`

**Configuration:**

```json
{
  "mcpServers": {
    "skill-seeker": {
      "command": "python",
      "args": ["-m", "skill_seekers.mcp.server_fastmcp"]
    }
  }
}
```

**Setup Steps:**
1. Create config directory: `mkdir -p ~/Library/Application\ Support/Claude`
2. Edit config: `nano ~/Library/Application\ Support/Claude/mcp.json`
3. Paste configuration above
4. Save and exit
5. Restart Claude Code

---

### Cursor (HTTP transport)

**Config Location:**
- **macOS**: `~/Library/Application Support/Cursor/mcp_settings.json`
- **Linux**: `~/.cursor/mcp_settings.json`
- **Windows**: `%APPDATA%\Cursor\mcp_settings.json`

**Step 1: Start HTTP Server**

```bash
# Terminal 1 - Run HTTP server
python -m skill_seekers.mcp.server_fastmcp --http --port 3000

# Should show:
# INFO: Started server process
# INFO: Uvicorn running on http://127.0.0.1:3000
```

**Step 2: Configure Cursor**

```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

**Step 3: Verify Connection**

```bash
# Check health endpoint
curl http://localhost:3000/health

# Should return: {"status": "ok"}
```

**Step 4: Restart Cursor**

---

## Verification

### Step 1: Check MCP Server Loaded

In your AI coding agent, type:
```
List all available MCP tools
```

You should see **17 Skill Seeker tools**:

**Config Tools:**
- `generate_config` - Generate config for documentation site
- `list_configs` - List available preset configs
- `validate_config` - Validate config structure

**Scraping Tools:**
- `estimate_pages` - Estimate page count
- `scrape_docs` - Scrape documentation
- `scrape_github` - Scrape GitHub repositories
- `scrape_pdf` - Extract PDF content

**Packaging Tools:**
- `package_skill` - Package skill (multi-platform support)
- `upload_skill` - Upload to LLM platform
- `enhance_skill` - AI-enhance SKILL.md
- `install_skill` - Complete install workflow

**Splitting Tools:**
- `split_config` - Split large configs
- `generate_router` - Generate router skills

**Source Tools:**
- `fetch_config` - Fetch configs from sources
- `submit_config` - Submit new configs
- `add_config_source` - Register git sources
- `list_config_sources` - List config sources
- `remove_config_source` - Remove sources

### Step 2: Test a Simple Command

```
List all available configs
```

**Expected response:**
```
Available configurations:
1. godot - Godot Engine documentation
2. react - React framework
3. vue - Vue.js framework
4. django - Django web framework
5. fastapi - FastAPI Python framework
... (24 total configs)
```

---

## Next Steps

- [Multi-Agent Setup](/docs/guides/multi-agent-setup) - Configure multiple agents
- [HTTP Transport Guide](/docs/guides/http-transport) - Learn about HTTP transport
- [Quick Start](/docs/getting-started/quickstart) - Create your first skill
- [Troubleshooting](/docs/guides/troubleshooting) - Common issues and solutions
