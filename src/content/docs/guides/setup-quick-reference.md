---
title: Setup Quick Reference
description: Quick reference card for Skill Seekers MCP setup - commands, configs, and troubleshooting at a glance
section: guides
order: 4
---

# Setup Quick Reference Card

## One-Command Setup

```bash
./setup_mcp.sh
```

## What Gets Configured

| Agent | Transport | Auto-Detected | Config Path (macOS) |
|-------|-----------|---------------|---------------------|
| Claude Code | stdio | ✅ | `~/Library/Application Support/Claude/mcp.json` |
| Cursor | HTTP | ✅ | `~/Library/Application Support/Cursor/mcp_settings.json` |
| Windsurf | HTTP | ✅ | `~/Library/Application Support/Windsurf/mcp_config.json` |
| VS Code + Cline | stdio | ✅ | `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` |
| IntelliJ IDEA | HTTP | ✅ | `~/Library/Application Support/JetBrains/IntelliJIdea2024.3/mcp.xml` |

## Setup Steps

1. ✅ **Check Python** (3.10+ recommended)
2. ✅ **Verify repo path**
3. ✅ **Install dependencies** (with venv option)
4. ✅ **Test transports** (stdio + HTTP)
5. ✅ **Detect agents** (automatic!)
6. ✅ **Configure agents** (with merging)
7. ✅ **Start HTTP server** (if needed)
8. ✅ **Test configs** (validate JSON)
9. ✅ **Show instructions** (next steps)

## Common Workflows

### Configure All Detected Agents
```bash
./setup_mcp.sh
# Choose option 1 when prompted
```

### Select Individual Agents
```bash
./setup_mcp.sh
# Choose option 2 when prompted
# Answer y/n for each agent
```

### Manual Configuration Only
```bash
./setup_mcp.sh
# Choose option 3 when prompted
# Copy manual config from output
```

## HTTP Server Management

### Start Server
```bash
# During setup
./setup_mcp.sh
# Choose option 1 for HTTP server

# Manual start
python3 -m skill_seekers.mcp.server_fastmcp --http --port 3000
```

### Test Server
```bash
curl http://localhost:3000/health
```

### Stop Server
```bash
# If you know PID
kill 12345

# Find and kill
pkill -f "skill_seekers.mcp.server_fastmcp"
```

### View Logs
```bash
tail -f /tmp/skill-seekers-mcp.log
```

## Configuration Files

### Stdio Config (Claude Code, VS Code)
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

### HTTP Config (Cursor, Windsurf)
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

## Testing

### Test in Agent
After restart, try these commands:
```
List all available configs
Generate config for React at https://react.dev
Estimate pages for configs/godot.json
```

## Troubleshooting

### Agent Not Detected
```bash
# Check if config directory exists
ls ~/Library/Application\ Support/Claude/  # macOS
ls ~/.config/claude-code/                   # Linux
```

### Config Merge Failed
```bash
# Check backup
cat ~/.config/claude-code/mcp.json.backup.*

# Validate JSON
jq empty ~/.config/claude-code/mcp.json
```

### HTTP Server Won't Start
```bash
# Check port usage
lsof -i :3000

# Kill process
lsof -ti:3000 | xargs kill -9

# Use different port
python3 -m skill_seekers.mcp.server_fastmcp --http --port 8080
```

### Agent Can't Connect
```bash
# Verify server running
curl http://localhost:3000/health

# Check logs
tail -f /tmp/skill-seekers-mcp.log

# Restart server
pkill -f skill_seekers.mcp.server_fastmcp
python3 -m skill_seekers.mcp.server_fastmcp --http --port 3000 &
```

## Quick Commands

```bash
# Check Python version
python3 --version

# Test MCP server (stdio)
python3 -m skill_seekers.mcp.server_fastmcp

# Test MCP server (HTTP)
python3 -m skill_seekers.mcp.server_fastmcp --http --port 3000

# Start HTTP server in background
nohup python3 -m skill_seekers.mcp.server_fastmcp --http --port 3000 > /tmp/skill-seekers-mcp.log 2>&1 &

# Health check
curl http://localhost:3000/health

# View logs
tail -f /tmp/skill-seekers-mcp.log

# Find server process
ps aux | grep skill_seekers.mcp.server_fastmcp

# Kill server
pkill -f skill_seekers.mcp.server_fastmcp
```

## File Locations

### Config Paths (Linux)
```
~/.config/claude-code/mcp.json
~/.cursor/mcp_settings.json
~/.windsurf/mcp_config.json
~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
~/.config/JetBrains/IntelliJIdea2024.3/mcp.xml
```

### Config Paths (macOS)
```
~/Library/Application Support/Claude/mcp.json
~/Library/Application Support/Cursor/mcp_settings.json
~/Library/Application Support/Windsurf/mcp_config.json
~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
~/Library/Application Support/JetBrains/IntelliJIdea2024.3/mcp.xml
```

## After Setup

1. **Restart agents** (completely quit and reopen)
2. **Test commands** in agent
3. **Verify HTTP server** (if applicable)
4. **Read documentation** for advanced features

## Getting Help

- **Documentation**: [Multi-Agent Setup](/docs/guides/multi-agent-setup)
- **GitHub Issues**: https://github.com/yusufkaraaslan/Skill_Seekers/issues
- **MCP Docs**: https://modelcontextprotocol.io/

## Quick Validation Checklist

- [ ] Python 3.10+ installed
- [ ] Dependencies installed (`pip install -e .`)
- [ ] MCP server tests passed (stdio + HTTP)
- [ ] Agents detected
- [ ] Configs created/merged
- [ ] Backups created (if configs existed)
- [ ] HTTP server started (if needed)
- [ ] Health check passed (if HTTP)
- [ ] Agents restarted
- [ ] MCP tools working in agents

## Version Info

**Skill Seekers Version**: 2.6.0
**Setup Script**: Multi-agent auto-configuration
**Supported Agents**: 5 (Claude Code, Cursor, Windsurf, VS Code + Cline, IntelliJ)
**Transport Types**: stdio, HTTP
**Platforms**: Linux, macOS, Windows
