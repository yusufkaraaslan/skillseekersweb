---
title: MCP Setup
description: Complete guide to setting up Skill Seekers MCP server with Claude Code and other AI coding agents - supports 5 agents with automatic configuration
section: manual
subsection: mcp
order: 1
---

# MCP Setup Guide

Set up the Skill Seekers MCP server to use all features through Model Context Protocol with Claude Code and other AI coding agents.

---

## Overview

The Skill Seekers MCP server provides 18 tools accessible through the Model Context Protocol, enabling natural language interaction with all Skill Seekers features.

**Supported Features:**
- ✅ **26 MCP Tools** - Complete Skill Seekers functionality
- ✅ **5 AI Agents** - Claude Code, Cursor, Windsurf, VS Code + Cline, IntelliJ IDEA
- ✅ **Dual Transport** - stdio (default) and HTTP modes
- ✅ **Auto-Configuration** - One-line setup script
- ✅ **Multi-Agent Support** - Configure all agents at once

---

## Quick Start

### One-Command Setup (Recommended)

```bash
# Clone repository
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
cd Skill_Seekers

# Run setup script
./setup_mcp.sh
```

The script automatically:
1. Checks Python version (3.10+ required)
2. Installs dependencies
3. Detects installed AI agents
4. Configures all detected agents
5. Starts HTTP server if needed
6. Validates everything works

**Time:** 2-3 minutes

---

## Supported Agents

| Agent | Transport | Auto-Detect | Config Path |
|-------|-----------|-------------|-------------|
| **Claude Code** | stdio | ✅ | `~/Library/Application Support/Claude/mcp.json` |
| **Cursor** | HTTP | ✅ | `~/Library/Application Support/Cursor/mcp_settings.json` |
| **Windsurf** | HTTP | ✅ | `~/Library/Application Support/Windsurf/mcp_config.json` |
| **VS Code + Cline** | stdio | ✅ | `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` |
| **IntelliJ IDEA** | HTTP | ✅ | `~/Library/Application Support/JetBrains/IntelliJIdea2024.3/mcp.xml` |

**Note:** Paths shown are for macOS. Linux and Windows paths detected automatically.

---

## Manual Installation

If you prefer manual setup or the script doesn't work:

### Step 1: Install Dependencies

```bash
# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Skill Seekers with MCP support
pip install -e ".[mcp]"

# Or install MCP dependencies separately
pip install mcp anthropic-mcp fastmcp
```

### Step 2: Test the Server

```bash
# Test stdio mode (default)
python -m skill_seekers.mcp.server_fastmcp

# Should show:
# MCP Server running in stdio mode
# Connected to client...
# (Press Ctrl+C to exit)

# Test HTTP mode
python -m skill_seekers.mcp.server_fastmcp --http --port 3000

# Should show:
# MCP Server running in HTTP mode on http://localhost:3000
# Health check: http://localhost:3000/health
# SSE endpoint: http://localhost:3000/sse
```

### Step 3: Configure Your Agent

#### For Claude Code (stdio)

Edit `~/Library/Application Support/Claude/mcp.json`:
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

#### For Cursor (HTTP)

Edit `~/Library/Application Support/Cursor/mcp_settings.json`:
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

**Note:** For HTTP-based agents, start the server first:
```bash
# Start in background
python -m skill_seekers.mcp.server_fastmcp --http --port 3000 &
```

---

## Transport Modes

### Stdio Transport (Default)

**Best for:** Claude Code, VS Code + Cline

**Advantages:**
- No network configuration needed
- More secure (local only)
- Faster startup (~100ms)
- Each agent gets isolated process

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

### HTTP Transport

**Best for:** Cursor, Windsurf, IntelliJ IDEA

**Advantages:**
- Multiple simultaneous connections
- Web-based clients support
- Health monitoring endpoint
- Remote access (use with caution)

**Configuration:**
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

**Start HTTP server:**
```bash
# Foreground
python -m skill_seekers.mcp.server_fastmcp --http --port 3000

# Background (macOS/Linux)
python -m skill_seekers.mcp.server_fastmcp --http --port 3000 &

# With custom port
python -m skill_seekers.mcp.server_fastmcp --http --port 8080

# With debug logging
python -m skill_seekers.mcp.server_fastmcp --http --log-level DEBUG
```

### HTTP Endpoints

When running in HTTP mode:

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "healthy",
  "server": "skill-seeker-mcp",
  "version": "2.7.0",
  "transport": "http",
  "tools": 18
}
```

**SSE Endpoint:**
```
http://localhost:3000/sse
```

---

## Available MCP Tools

### Config Tools (3)

**`generate_config`** - Generate config for any documentation site
```python
result = await mcp.call_tool("generate_config", {
    "name": "myframework",
    "url": "https://docs.myframework.com/",
    "description": "My Framework documentation"
})
```

**`list_configs`** - List all available preset configurations
```python
result = await mcp.call_tool("list_configs", {})
```

**`validate_config`** - Validate config file structure
```python
result = await mcp.call_tool("validate_config", {
    "config_path": "configs/myframework.json"
})
```

### Scraping Tools (4)

**`estimate_pages`** - Estimate page count before scraping
```python
result = await mcp.call_tool("estimate_pages", {
    "config_path": "configs/react.json"
})
```

**`scrape_docs`** - Scrape documentation and build skill
```python
result = await mcp.call_tool("scrape_docs", {
    "config_path": "configs/react.json"
})
```

**`scrape_github`** - Scrape GitHub repositories
```python
result = await mcp.call_tool("scrape_github", {
    "repository": "facebook/react",
    "local_repo_path": "/path/to/react"
})
```

**`scrape_pdf`** - Extract content from PDF files
```python
result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "manual.pdf",
    "name": "mymanual"
})
```

### Packaging Tools (4)

**`package_skill`** - Package skill for platform
```python
result = await mcp.call_tool("package_skill", {
    "skill_dir": "output/react/",
    "target": "claude"  # or "gemini", "openai", "markdown"
})
```

**`upload_skill`** - Upload to LLM platform
```python
result = await mcp.call_tool("upload_skill", {
    "skill_zip": "output/react.zip",
    "target": "claude"
})
```

**`enhance_skill`** - AI-enhance SKILL.md
```python
result = await mcp.call_tool("enhance_skill", {
    "skill_dir": "output/react/",
    "mode": "local"  # or "api"
})
```

**`install_skill`** - Complete install workflow
```python
result = await mcp.call_tool("install_skill", {
    "config_path": "configs/react.json",
    "target": "claude",
    "enhance": true
})
```

### Source Tools (5)

**`fetch_config`** - Fetch configs from sources
```python
result = await mcp.call_tool("fetch_config", {
    "name": "custom_framework",
    "source": "community"
})
```

**`submit_config`** - Submit new configs
```python
result = await mcp.call_tool("submit_config", {
    "config_path": "configs/myframework.json",
    "description": "My Framework documentation config"
})
```

**`add_config_source`** - Register private git repositories
```python
result = await mcp.call_tool("add_config_source", {
    "name": "company_configs",
    "url": "https://github.com/company/configs.git",
    "type": "git"
})
```

**`list_config_sources`** - List all registered sources
```python
result = await mcp.call_tool("list_config_sources", {})
```

**`remove_config_source`** - Remove registered sources
```python
result = await mcp.call_tool("remove_config_source", {
    "name": "company_configs"
})
```

### Splitting Tools (2)

**`split_config`** - Split large documentation configs
```python
result = await mcp.call_tool("split_config", {
    "config_path": "configs/large_docs.json",
    "split_by": "category"
})
```

**`generate_router`** - Generate router/hub skills
```python
result = await mcp.call_tool("generate_router", {
    "sub_skills": ["react_basics", "react_hooks", "react_routing"]
})
```

---

## Verification

### Test in Claude Code

1. Restart Claude Code after configuration
2. Type a prompt like:
   ```
   "Generate a skill for Vue.js documentation"
   ```
3. Claude should use the MCP tools automatically

### Check Tool Availability

In Claude Code, tools appear in the tool use panel when relevant. You can also ask:
```
"What Skill Seekers tools do you have access to?"
```

### Manual Tool Testing

```bash
# Test with MCP inspector (if installed)
npx @modelcontextprotocol/inspector python -m skill_seekers.mcp.server_fastmcp

# Or test directly
python -m skill_seekers.mcp.server_fastmcp
# (Will wait for MCP client connection)
```

---

## Multi-Agent Configuration

### Configure All Agents at Once

The setup script detects all installed agents:

```bash
./setup_mcp.sh
```

**Sample output:**
```
🔍 Detecting installed AI agents...

Found the following agents:
✓ Claude Code (stdio)
✓ Cursor (HTTP)
✓ VS Code + Cline (stdio)

Would you like to configure all agents? (Y/n): Y

✅ Configured Claude Code
✅ Configured Cursor
✅ Configured VS Code + Cline
🚀 Starting HTTP server for Cursor...

All agents configured successfully!
```

### Agent-Specific Notes

**Claude Code:**
- Restart Claude Code after configuration
- Tools appear automatically when relevant
- No HTTP server needed

**Cursor:**
- HTTP server must be running
- Start with: `python -m skill_seekers.mcp.server_fastmcp --http --port 3000`
- Restart Cursor after configuration

**Windsurf:**
- HTTP server must be running
- Same port as Cursor (agents can share server)
- Restart Windsurf after configuration

**VS Code + Cline:**
- No HTTP server needed (uses stdio)
- Restart VS Code after configuration
- Tools available in Cline extension

**IntelliJ IDEA:**
- HTTP server must be running
- XML configuration format
- Restart IntelliJ after configuration

---

## Troubleshooting

### Tools Not Appearing

**Problem:** MCP tools don't show up in Claude Code

**Solutions:**
```bash
# 1. Check config file exists
cat ~/Library/Application\ Support/Claude/mcp.json

# 2. Restart Claude Code completely

# 3. Test server manually
python -m skill_seekers.mcp.server_fastmcp
# Should show "MCP Server running in stdio mode"

# 4. Check Python path
which python3
# Make sure it matches the path in config
```

### HTTP Server Not Starting

**Problem:** HTTP server fails to start

**Solutions:**
```bash
# Check port not in use
lsof -i :3000

# Use different port
python -m skill_seekers.mcp.server_fastmcp --http --port 8080

# Check firewall settings
# Make sure localhost:3000 is not blocked
```

### Permission Errors

**Problem:** Can't write to config file

**Solutions:**
```bash
# Check file permissions
ls -la ~/Library/Application\ Support/Claude/mcp.json

# Create directory if missing
mkdir -p ~/Library/Application\ Support/Claude/

# Create empty config if needed
echo '{"mcpServers":{}}' > ~/Library/Application\ Support/Claude/mcp.json
```

### Import Errors

**Problem:** `ModuleNotFoundError: No module named 'mcp'`

**Solutions:**
```bash
# Install MCP dependencies
pip install -e ".[mcp]"

# Or install individually
pip install mcp anthropic-mcp fastmcp

# Verify installation
python -c "import mcp; print(mcp.__version__)"
```

### Agent Not Detected

**Problem:** Setup script doesn't detect your agent

**Solutions:**
```bash
# 1. Check agent is installed
# 2. Look for config file manually
# 3. Add config manually (see Manual Installation)
# 4. Report issue with agent details
```

---

## Advanced Configuration

### Custom Port

```bash
# Start HTTP server on custom port
python -m skill_seekers.mcp.server_fastmcp --http --port 8080
```

Update agent configs to use new port:
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:8080/sse"
    }
  }
}
```

### Debug Logging

```bash
# Enable debug logging
python -m skill_seekers.mcp.server_fastmcp --http --log-level DEBUG

# Logs show:
# - Tool calls
# - Request/response details
# - Error stack traces
```

### Multiple Instances

Run multiple servers on different ports:

```bash
# Terminal 1 - Cursor
python -m skill_seekers.mcp.server_fastmcp --http --port 3000

# Terminal 2 - Windsurf
python -m skill_seekers.mcp.server_fastmcp --http --port 3001
```

### Environment Variables

```bash
# Set default port
export MCP_HTTP_PORT=3000

# Set log level
export MCP_LOG_LEVEL=DEBUG

# Then start server
python -m skill_seekers.mcp.server_fastmcp --http
```

---

## Next Steps

**Tutorials:**
- [Scraping Documentation](/docs/tutorials/scraping-docs) - Use MCP tools to scrape docs
- [Creating Configs](/docs/tutorials/creating-configs) - Generate configs with MCP

**Manual:**
- [MCP Tools Reference](/docs/manual/mcp/tools) - Complete tool documentation
- [Multi-Platform Support](/docs/manual/platforms/overview) - Platform-specific features

**CLI Reference:**
- [scrape command](/docs/cli/scrape) - CLI equivalent of MCP tools
- [package command](/docs/cli/package) - Packaging options
