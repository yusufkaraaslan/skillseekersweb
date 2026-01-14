---
title: Multi-Agent Setup Guide
description: Automatic detection and configuration of multiple AI coding agents - supports Claude Code, Cursor, Windsurf, VS Code + Cline, and IntelliJ IDEA
section: guides
order: 3
---

# Multi-Agent Auto-Configuration Guide

The Skill Seeker MCP server now supports automatic detection and configuration of multiple AI coding agents. This guide explains how to use the enhanced `setup_mcp.sh` script to configure all your installed AI agents at once.

## Supported Agents

The setup script automatically detects and configures:

| Agent | Transport | Config Path (macOS) |
|-------|-----------|---------------------|
| **Claude Code** | stdio | `~/Library/Application Support/Claude/mcp.json` |
| **Cursor** | HTTP | `~/Library/Application Support/Cursor/mcp_settings.json` |
| **Windsurf** | HTTP | `~/Library/Application Support/Windsurf/mcp_config.json` |
| **VS Code + Cline** | stdio | `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` |
| **IntelliJ IDEA** | HTTP (XML) | `~/Library/Application Support/JetBrains/IntelliJIdea2024.3/mcp.xml` |

**Note:** Paths vary by operating system. The script automatically detects the correct paths for Linux, macOS, and Windows.

## Quick Start

### One-Command Setup

```bash
# Run the setup script
./setup_mcp.sh
```

The script will:
1. ✅ Check Python version (3.10+ recommended)
2. ✅ Verify repository path
3. ✅ Install dependencies (with virtual environment option)
4. ✅ Test both stdio and HTTP transports
5. ✅ **Detect installed AI agents automatically**
6. ✅ **Configure all detected agents**
7. ✅ **Start HTTP server if needed**
8. ✅ Validate configurations
9. ✅ Provide next steps

### What's New in Multi-Agent Setup

**Automatic Agent Detection:**
- Scans your system for installed AI coding agents
- Shows which agents were found and their transport types
- Allows you to configure all agents or select individually

**Smart Configuration:**
- Creates backups before modifying existing configs
- Merges with existing configurations (preserves other MCP servers)
- Detects if skill-seeker is already configured
- Uses appropriate transport (stdio or HTTP) for each agent

**HTTP Server Management:**
- Automatically starts HTTP server if HTTP-based agents detected
- Configurable port (default: 3000)
- Background process with health monitoring
- Optional systemd service support (future)

## Configuration Details

### Stdio Transport (Claude Code, VS Code + Cline)

**Generated Config:**
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

**Features:**
- Each agent gets its own server process
- No network configuration needed
- More secure (local only)
- Faster startup (~100ms)

### HTTP Transport (Cursor, Windsurf, IntelliJ)

**Generated Config (JSON):**
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

**Features:**
- Single server process for all agents
- Network-based (can be remote)
- Health monitoring endpoint
- Requires server to be running

### Config Merging Strategy

The setup script **preserves existing MCP server configurations**:

**Before (existing config):**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    }
  }
}
```

**After (merged config):**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
    },
    "skill-seeker": {
      "command": "python",
      "args": ["-m", "skill_seekers.mcp.server_fastmcp"]
    }
  }
}
```

**Safety Features:**
- ✅ Creates timestamped backups before modifying
- ✅ Detects if skill-seeker already exists
- ✅ Asks for confirmation before overwriting
- ✅ Validates JSON after writing

## HTTP Server Management

### Starting the Server

**Option 1: During setup (recommended)**
```bash
./setup_mcp.sh
# Choose option 1 when prompted for HTTP server
```

**Option 2: Manual start**
```bash
# Foreground (for testing)
python3 -m skill_seekers.mcp.server_fastmcp --http --port 3000

# Background (for production)
nohup python3 -m skill_seekers.mcp.server_fastmcp --http --port 3000 > /tmp/skill-seekers-mcp.log 2>&1 &
```

### Monitoring the Server

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "healthy",
  "server": "skill-seeker-mcp",
  "version": "2.6.0",
  "transport": "http"
}
```

**View Logs:**
```bash
tail -f /tmp/skill-seekers-mcp.log
```

**Stop Server:**
```bash
# If you know the PID
kill 12345

# Find and kill
pkill -f "skill_seekers.mcp.server_fastmcp"
```

## Troubleshooting

### Agent Not Detected

**Problem:** Your agent is installed but not detected.

**Solution:**
1. Check if the agent's config directory exists:
   ```bash
   # Claude Code (macOS)
   ls ~/Library/Application\ Support/Claude/

   # Cursor (Linux)
   ls ~/.cursor/
   ```

2. If directory doesn't exist, the agent may not be installed or uses a different path.

3. Manual configuration:
   - Note the actual config path
   - Create the directory if needed
   - Use manual configuration examples from setup script output

### Config Merge Failed

**Problem:** Error merging with existing config.

**Solution:**
1. Check the backup file:
   ```bash
   cat ~/.config/claude-code/mcp.json.backup.20251223_143022
   ```

2. Manually edit the config:
   ```bash
   nano ~/.config/claude-code/mcp.json
   ```

3. Ensure valid JSON:
   ```bash
   jq empty ~/.config/claude-code/mcp.json
   ```

### HTTP Server Won't Start

**Problem:** HTTP server fails to start on configured port.

**Solution:**
1. Check if port is already in use:
   ```bash
   lsof -i :3000
   ```

2. Kill process using the port:
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

3. Use a different port:
   ```bash
   python3 -m skill_seekers.mcp.server_fastmcp --http --port 8080
   ```

4. Update agent configs with new port.

### Agent Can't Connect to HTTP Server

**Problem:** HTTP-based agent shows connection errors.

**Solution:**
1. Verify server is running:
   ```bash
   curl http://localhost:3000/health
   ```

2. Check server logs:
   ```bash
   tail -f /tmp/skill-seekers-mcp.log
   ```

3. Restart the server:
   ```bash
   pkill -f skill_seekers.mcp.server_fastmcp
   python3 -m skill_seekers.mcp.server_fastmcp --http --port 3000 &
   ```

4. Check firewall settings (if remote connection).

## Testing the Setup

After setup completes:

### 1. Restart Your Agent(s)

**Important:** Completely quit and reopen (don't just close window).

### 2. Test Basic Functionality

Try these commands in your agent:

```
List all available configs
```

Expected: List of 24+ preset configurations

```
Generate config for React at https://react.dev
```

Expected: Generated React configuration

### 3. Verify HTTP Transport (if applicable)

```bash
# Check server health
curl http://localhost:3000/health

# Expected output:
{
  "status": "healthy",
  "server": "skill-seeker-mcp",
  "version": "2.6.0",
  "transport": "http"
}
```

## Next Steps

After successful setup:

1. **Read the MCP Setup Guide**: [MCP Setup](/docs/guides/mcp-setup)
2. **Learn HTTP Transport**: [HTTP Transport](/docs/guides/http-transport)
3. **Try the Quick Start**: [Quick Start](/docs/getting-started/quickstart)
4. **Explore Features**: [Features Overview](/docs/features/three-stream-architecture)

## Support

For issues or questions:
- **GitHub Issues**: https://github.com/yusufkaraaslan/Skill_Seekers/issues
- **GitHub Discussions**: https://github.com/yusufkaraaslan/Skill_Seekers/discussions
- **MCP Documentation**: https://modelcontextprotocol.io/
