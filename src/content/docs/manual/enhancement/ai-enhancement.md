---
title: AI Enhancement
description: Enhance SKILL.md files with AI using Claude Code Max (free) or Anthropic API - adds code examples, quick references, and best practices
section: manual
subsection: enhancement
order: 1
---

# AI Enhancement Guide

Transform basic SKILL.md files into comprehensive, production-quality documentation using AI enhancement.

---

## Overview

**The Problem:**
Auto-generated SKILL.md files are often too generic:
- Empty Quick Reference sections
- No practical code examples
- Generic "When to Use" triggers
- Missing key concepts and best practices

**The Solution:**
Let Claude analyze your reference documentation and create enhanced SKILL.md with:
- ✅ Best code examples extracted from documentation
- ✅ Practical quick reference with real patterns
- ✅ Domain-specific guidance
- ✅ Clear navigation tips
- ✅ Key concepts explained

---

## Quick Start

### LOCAL Enhancement (Recommended - FREE)

Uses your Claude Code Max subscription - no API costs!

```bash
# Basic enhancement
skill-seekers enhance output/react/

# With custom timeout
skill-seekers enhance output/react/ --timeout 1200

# Background mode (non-blocking)
skill-seekers enhance output/react/ --background

# Daemon mode (survives terminal close)
skill-seekers enhance output/react/ --daemon
```

**Requirements:**
- Claude Code Max plan
- `claude` CLI installed

**Time:** 30-60 seconds per skill

### API Enhancement (Alternative)

Uses Anthropic API directly (~$0.15-$0.30 per skill):

```bash
# Install dependencies
pip install anthropic

# Set API key
export ANTHROPIC_API_KEY=sk-ant-...

# Enhance
skill-seekers enhance output/react/ --mode api
```

---

## Enhancement Modes

Skill Seekers supports **4 enhancement modes** for different workflows:

### 1. Headless Mode (Default)

**Best for:** CI/CD pipelines, automation scripts

```bash
# Runs in foreground, waits for completion
skill-seekers enhance output/react/

# With force mode (no confirmations)
skill-seekers enhance output/react/ --force
```

**Behavior:**
- Runs `claude` CLI directly
- **BLOCKS** until enhancement completes
- Shows progress output
- Returns exit code: 0 = success, 1 = failure

### 2. Background Mode

**Best for:** When you want to continue working

```bash
# Start in background
skill-seekers enhance output/react/ --background

# Returns immediately with status file created
# Monitor progress:
skill-seekers enhance-status output/react/

# Watch in real-time:
skill-seekers enhance-status output/react/ --watch
```

**Behavior:**
- Starts background thread
- Returns immediately
- Creates `.enhancement_status.json` for monitoring
- Thread continues even if you close terminal

### 3. Daemon Mode

**Best for:** Long-running tasks that must survive parent process exit

```bash
# Start as daemon (fully detached)
skill-seekers enhance output/react/ --daemon

# Process continues even if you:
# - Close the terminal
# - Logout
# - SSH session ends

# Check status later:
skill-seekers enhance-status output/react/

# View logs:
tail -f output/react/.enhancement_daemon.log
```

**Behavior:**
- Creates fully detached process using `nohup`
- Writes to `.enhancement_daemon.log`
- Creates status file with PID
- **Survives parent process exit**

### 4. Terminal Mode (Interactive)

**Best for:** Manual work, debugging

```bash
# Open in new terminal window
skill-seekers enhance output/react/ --interactive-enhancement
```

**Behavior:**
- Opens new terminal window (macOS)
- Runs Claude Code visually
- Terminal auto-closes when done
- Useful for debugging

---

## Mode Comparison

| Feature | Headless | Background | Daemon | Terminal |
|---------|----------|------------|--------|----------|
| **Blocks** | Yes (waits) | No (returns) | No (returns) | No (separate window) |
| **Survives parent exit** | No | No | **Yes** | Yes |
| **Progress monitoring** | Direct output | Status file | Status file + logs | Visual in terminal |
| **Force mode** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Best for** | CI/CD | Scripts | Long tasks | Manual work |

---

## What Enhancement Does

1. **Reads reference files** (`references/*.md`)
2. **Sends to Claude** with instructions to:
   - Extract 5-10 best code examples
   - Create practical quick reference
   - Write domain-specific "When to Use" triggers
   - Add helpful navigation guidance
3. **Backs up original** SKILL.md to `SKILL.md.backup`
4. **Saves enhanced version** as new SKILL.md

---

## Example Enhancement

### Before (Auto-Generated)

```markdown
## Quick Reference

### Common Patterns

*Quick reference patterns will be added as you use the skill.*
```

### After (AI-Enhanced)

```markdown
## Quick Reference

### Common API Patterns

**Granting promotional items:**
\`\`\`cpp
void CInventory::GrantPromoItems()
{
    SteamItemDef_t newItems[2];
    newItems[0] = 110;
    newItems[1] = 111;
    SteamInventory()->AddPromoItems( &s_GenerateRequestResult, newItems, 2 );
}
\`\`\`

**Getting all items in player inventory:**
\`\`\`cpp
SteamInventoryResult_t resultHandle;
bool success = SteamInventory()->GetAllItems( &resultHandle );
\`\`\`

[... 8 more practical examples ...]
```

---

## Multi-Platform Enhancement

### Claude AI (Default)

**Local Mode (Recommended - No API Key):**
```bash
# Uses Claude Code Max (no API costs)
skill-seekers enhance output/react/
```

**API Mode:**
```bash
# Requires ANTHROPIC_API_KEY
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --mode api
```

**Model:** Claude Sonnet 4
**Format:** Maintains YAML frontmatter

### Google Gemini

```bash
# Install Gemini support
pip install skill-seekers[gemini]

# Set API key
export GOOGLE_API_KEY=AIzaSy...

# Enhance with Gemini
skill-seekers enhance output/react/ --target gemini --mode api
```

**Model:** Gemini 2.0 Flash
**Format:** Converts to plain markdown (no frontmatter)
**Output:** Updates `system_instructions.md`

### OpenAI ChatGPT

```bash
# Install OpenAI support
pip install skill-seekers[openai]

# Set API key
export OPENAI_API_KEY=sk-proj-...

# Enhance with GPT-4o
skill-seekers enhance output/react/ --target openai --mode api
```

**Model:** GPT-4o
**Format:** Converts to plain text
**Output:** Updates `assistant_instructions.txt`

### Platform Comparison

| Feature | Claude | Gemini | OpenAI |
|---------|--------|--------|--------|
| **Local Mode** | ✅ Yes (Claude Code Max) | ❌ No | ❌ No |
| **API Mode** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Model** | Sonnet 4 | Gemini 2.0 Flash | GPT-4o |
| **Format** | YAML + MD | Plain MD | Plain Text |
| **Cost (API)** | ~$0.15-0.30 | ~$0.10-0.25 | ~$0.20-0.35 |

**Note:** Local mode is FREE and only available for Claude AI.

---

## Monitoring Background Tasks

### Status File Format

When using `--background` or `--daemon`, a status file is created:

**Location:** `{skill_directory}/.enhancement_status.json`

**Format:**
```json
{
  "status": "running",
  "message": "Running Claude Code enhancement...",
  "progress": 0.5,
  "timestamp": "2026-01-03T12:34:56.789012",
  "skill_dir": "/path/to/output/react",
  "error": null,
  "pid": 12345
}
```

**Status values:**
- `pending` - Task queued, not started
- `running` - Currently executing
- `completed` - Finished successfully
- `failed` - Error occurred

### Check Status Command

```bash
# One-time check
skill-seekers enhance-status output/react/

# Output:
# ============================================================
# ENHANCEMENT STATUS: RUNNING
# ============================================================
#
# 🔄 Status: RUNNING
#    Message: Running Claude Code enhancement...
#    Progress: [██████████░░░░░░░░░░] 50%
#    PID: 12345
```

### Watch Mode (Real-time)

```bash
# Watch status updates every 2 seconds
skill-seekers enhance-status output/react/ --watch

# Custom interval
skill-seekers enhance-status output/react/ --watch --interval 5
```

### JSON Output (For Scripts)

```bash
# Get raw JSON
skill-seekers enhance-status output/react/ --json

# Use in scripts
STATUS=$(skill-seekers enhance-status output/react/ --json | jq -r '.status')
if [ "$STATUS" = "completed" ]; then
    echo "Enhancement complete!"
fi
```

---

## Advanced Workflows

### Batch Enhancement (Multiple Skills)

```bash
#!/bin/bash
# Enhance multiple skills in parallel

skills=("react" "vue" "django" "fastapi")

for skill in "${skills[@]}"; do
    echo "Starting enhancement: $skill"
    skill-seekers enhance output/$skill/ --background
done

echo "All enhancements started in background!"

# Monitor all
for skill in "${skills[@]}"; do
    skill-seekers enhance-status output/$skill/
done
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Enhance skill
  run: |
    # Headless mode (blocks until done)
    skill-seekers enhance output/react/ --timeout 1200 --force

    # Check if enhancement succeeded
    if [ $? -eq 0 ]; then
      echo "✅ Enhancement successful"
    else
      echo "❌ Enhancement failed"
      exit 1
    fi
```

### Long-running Daemon

```bash
# Start daemon for large skill
skill-seekers enhance output/godot-large/ --daemon --timeout 3600

# Logout and come back later
# ... (hours later) ...

# Check if it completed
skill-seekers enhance-status output/godot-large/
```

---

## Force Mode

**What it does:** Skips ALL confirmations, auto-answers "yes" to everything

**Default behavior:** Force mode is **ON by default** for maximum automation

```bash
# Force mode is ON by default (no flag needed)
skill-seekers enhance output/react/

# Disable force mode if you want confirmations
skill-seekers enhance output/react/ --no-force
```

**Use cases:**
- ✅ CI/CD automation (default ON)
- ✅ Batch processing multiple skills (default ON)
- ✅ Unattended execution (default ON)
- ⚠️ Use `--no-force` if you need manual confirmation prompts

---

## Timeout Configuration

Default timeout: **600 seconds (10 minutes)**

**Adjust based on skill size:**

```bash
# Small skills (< 100 pages)
skill-seekers enhance output/hono/ --timeout 300

# Medium skills (100-1000 pages)
skill-seekers enhance output/react/ --timeout 600

# Large skills (1000+ pages)
skill-seekers enhance output/godot/ --timeout 1200

# Extra large (with PDF/GitHub sources)
skill-seekers enhance output/django-unified/ --timeout 1800
```

**What happens on timeout:**
- Headless: Returns error immediately
- Background: Status marked as `failed`
- Daemon: Status marked as `failed`
- Terminal: Claude Code keeps running (user can see it)

---

## Cost Estimate (API Mode)

- **Input**: ~50,000-100,000 tokens (reference docs)
- **Output**: ~4,000 tokens (enhanced SKILL.md)
- **Model**: claude-sonnet-4-20250514
- **Estimated cost**: $0.15-$0.30 per skill

---

## Real-World Results

**Test Case: steam-economy skill**
- **Before:** 75 lines, generic template, empty Quick Reference
- **After:** 570 lines, 10 practical API examples, key concepts explained
- **Time:** 60 seconds
- **Quality Rating:** 9/10

The enhancement successfully:
- Extracted best HTTP/JSON examples from 24 pages of documentation
- Explained domain concepts (Asset Classes, Context IDs, Transaction Lifecycle)
- Created navigation guidance for beginners through advanced users
- Added best practices for security, economy design, and API integration

---

## File Artifacts

Enhancement creates these files:

```
output/react/
├── SKILL.md                    # Enhanced file
├── SKILL.md.backup             # Original backup
├── .enhancement_status.json    # Status (background/daemon only)
├── .enhancement_daemon.log     # Logs (daemon only)
└── .enhancement_daemon.py      # Daemon script (daemon only)
```

**Cleanup:**
```bash
# Remove status files after completion
rm output/react/.enhancement_status.json
rm output/react/.enhancement_daemon.log
rm output/react/.enhancement_daemon.py
```

---

## Troubleshooting

### Tools Not Working

**"claude command not found"**
```bash
# Install Claude Code CLI
# See: https://docs.claude.com/claude-code
```

**"Enhancement timed out"**
```bash
# Increase timeout
skill-seekers enhance output/react/ --timeout 1200
```

**"SKILL.md was not updated"**
```bash
# Check if references exist
ls output/react/references/

# Try terminal mode to see what's happening
skill-seekers enhance output/react/ --interactive-enhancement
```

### Background Task Issues

**Background task not progressing:**
```bash
# Check status
skill-seekers enhance-status output/react/ --json

# If stuck, check process
ps aux | grep claude

# Kill if needed
kill -9 <PID>
```

**Daemon not starting:**
```bash
# Check logs
cat output/react/.enhancement_daemon.log

# Check status file
cat output/react/.enhancement_status.json

# Try without force mode
skill-seekers enhance output/react/ --daemon --no-force
```

**Status file shows error:**
```bash
# Read error details
skill-seekers enhance-status output/react/ --json | jq -r '.error'

# Common fixes:
# 1. Increase timeout
# 2. Check references exist
# 3. Try terminal mode to debug
```

### API Mode Issues

**"No API key provided"**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
# or
skill-seekers enhance output/react/ --mode api --api-key sk-ant-...
```

**"No reference files found"**
```bash
# Make sure you've run the scraper first
skill-seekers scrape --config configs/react.json
```

**"anthropic package not installed"**
```bash
pip install anthropic
```

**Don't like the result?**
```bash
# Restore original
mv output/react/SKILL.md.backup output/react/SKILL.md

# Try again (may generate different content)
skill-seekers enhance output/react/
```

---

## Best Practices

1. **Use headless by default** - Simple and reliable
2. **Use background for scripts** - When you need to do other work
3. **Use daemon for large tasks** - When task might take hours
4. **Use force in CI/CD** - Avoid hanging on confirmations
5. **Always set timeout** - Prevent infinite waits
6. **Monitor background tasks** - Use enhance-status to check progress
7. **Review the output** - AI is good but not perfect
8. **Keep the backup** - Original saved as SKILL.md.backup

---

## When to Use Enhancement

**Use enhancement when:**
- You want high-quality SKILL.md quickly
- Working with large documentation (50+ pages)
- Creating skills for unfamiliar frameworks
- Need practical code examples extracted
- Want consistent quality across multiple skills

**Skip enhancement when:**
- Budget constrained (use manual editing with API mode)
- Very small documentation (<10 pages)
- You know the framework intimately
- Documentation has no code examples

---

## Mode Selection Guide

| Use Case | Recommended Mode | Why |
|----------|------------------|-----|
| **CI/CD Pipeline** | Headless + Force | Blocks until done, no prompts |
| **Manual Use** | Headless | Simple, shows progress |
| **Batch Processing** | Background | Non-blocking, parallel processing |
| **SSH/Remote** | Daemon | Survives SSH disconnect |
| **Debugging** | Terminal | Visual feedback |
| **Large Skills** | Daemon + High Timeout | Won't get interrupted |

---

## Comparison with Manual Editing

| Aspect | Manual Edit | LOCAL Enhancement | API Enhancement |
|--------|-------------|-------------------|-----------------|
| Time | 15-30 minutes | 30-60 seconds | 30-60 seconds |
| Code examples | You pick | AI picks best | AI picks best |
| Quick reference | Write yourself | Auto-generated | Auto-generated |
| Domain guidance | Your knowledge | From docs | From docs |
| Consistency | Varies | Consistent | Consistent |
| Cost | Free (your time) | Free (Max plan) | ~$0.20 per skill |
| Setup | None | None | API key needed |
| Quality | High (if expert) | 9/10 | 9/10 |
| **Recommended?** | For experts only | ✅ **Yes** | If no Max plan |

---

## Next Steps

**Tutorials:**
- [Scraping Documentation](/docs/tutorials/scraping-docs) - Create skills to enhance
- [Multi-Source Skills](/docs/tutorials/multi-source-skills) - Combine sources before enhancing

**Manual:**
- [Multi-Platform Support](/docs/manual/platforms/overview) - Platform-specific enhancement
- [MCP Setup](/docs/manual/mcp/setup) - Use enhancement through MCP

**CLI Reference:**
- [enhance command](/docs/cli/enhance) - Complete command reference
- [enhance-status command](/docs/cli/enhance-status) - Monitoring reference
