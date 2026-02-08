---
title: Multi-Agent Setup
description: Configure Skill Seekers with Claude, Copilot, Codex, and custom agents.
section: guides
order: 4
---

# Multi-Agent Setup

Configure Skill Seekers with **Claude, Copilot, Codex**, and custom agents.

## Supported Agents

| Agent | CLI Flag | Requirements |
|-------|----------|--------------|
| **Claude Code** | `--agent claude` | Claude Max subscription |
| **GitHub Copilot** | `--agent copilot` | Copilot subscription |
| **OpenAI Codex** | `--agent codex` | OpenAI API key |
| **OpenCode** | `--agent opencode` | OpenCode CLI |
| **Custom** | `--agent custom` | Custom command |

## Quick Setup

### Claude Code (Default)

```bash
# Already installed with MCP
skill-seekers enhance output/react/ --agent claude
```

### GitHub Copilot

```bash
# Install Copilot CLI
gh extension install github/copilot

# Use with Skill Seekers
skill-seekers enhance output/react/ --agent copilot
```

### OpenAI Codex

```bash
# Set API key
export OPENAI_API_KEY=sk-...

# Use Codex
skill-seekers enhance output/react/ --agent codex
```

### Custom Agent

```bash
# Any CLI tool
skill-seekers enhance output/react/ \
  --agent custom \
  --agent-cmd "my-ai-tool {prompt_file}"
```

## Environment Variables

```bash
# Default agent
export SKILL_SEEKER_AGENT=claude

# Custom command
export SKILL_SEEKER_AGENT_CMD="my-tool {prompt_file}"
```

## CI/CD Integration

```yaml
# GitHub Actions with different agents
strategy:
  matrix:
    agent: [claude, copilot, codex]
    
steps:
  - run: skill-seekers enhance output/ --agent ${{ matrix.agent }}
```

## Comparison

| Feature | Claude | Copilot | Codex | OpenCode |
|---------|--------|---------|-------|----------|
| **Cost** | Max sub | Copilot sub | API pay | Free |
| **Speed** | Fast | Fast | Medium | Medium |
| **Quality** | High | High | High | Medium |
| **Offline** | ✅ | ❌ | ❌ | ✅ |
