---
title: Multi-Platform Upload Guide
description: Upload skills to Claude AI, Google Gemini, OpenAI ChatGPT, or export as universal Markdown - complete guide for all 4 platforms
section: guides
order: 5
---

# Multi-Platform Upload Guide

Skill Seekers supports uploading to **4 LLM platforms**: Claude AI, Google Gemini, OpenAI ChatGPT, and Generic Markdown export.

## Quick Platform Selection

| Platform | Best For | Upload Method | API Key Required |
|----------|----------|---------------|------------------|
| **Claude AI** | General use, MCP integration | API or Manual | ANTHROPIC_API_KEY |
| **Google Gemini** | Long context (1M tokens) | API | GOOGLE_API_KEY |
| **OpenAI ChatGPT** | Vector search, Assistants API | API | OPENAI_API_KEY |
| **Generic Markdown** | Universal compatibility, offline | Manual distribution | None |

---

## Claude AI (Default)

### Prerequisites

```bash
# Option 1: Set API key for automatic upload
export ANTHROPIC_API_KEY=sk-ant-...

# Option 2: No API key (manual upload)
# No setup needed - just package and upload manually
```

### Package for Claude

```bash
# Claude uses ZIP format (default)
skill-seekers package output/react/
```

**Output:** `output/react.zip`

### Upload to Claude

**Option 1: Automatic (with API key)**
```bash
skill-seekers upload output/react.zip
```

**Option 2: Manual (no API key)**
1. Go to https://claude.ai/skills
2. Click "Upload Skill" or "Add Skill"
3. Select `output/react.zip`
4. Done!

**Option 3: MCP (easiest)**
```
In Claude Code, just say:
"Package and upload the React skill"
```

---

## Google Gemini

### Prerequisites

```bash
# Install Gemini support
pip install skill-seekers[gemini]

# Set API key
export GOOGLE_API_KEY=AIzaSy...
```

### Package for Gemini

```bash
# Gemini uses tar.gz format
skill-seekers package output/react/ --target gemini
```

**Output:** `output/react-gemini.tar.gz`

### Upload to Gemini

```bash
skill-seekers upload output/react-gemini.tar.gz --target gemini
```

**What happens:**
- Uploads to Google Files API
- Creates grounding resource
- Available in Google AI Studio

**Access your skill:**
- Go to https://aistudio.google.com/
- Your skill is available as grounding data

---

## OpenAI ChatGPT

### Prerequisites

```bash
# Install OpenAI support
pip install skill-seekers[openai]

# Set API key
export OPENAI_API_KEY=sk-proj-...
```

### Package for OpenAI

```bash
# OpenAI uses ZIP format with vector store
skill-seekers package output/react/ --target openai
```

**Output:** `output/react-openai.zip`

### Upload to OpenAI

```bash
skill-seekers upload output/react-openai.zip --target openai
```

**What happens:**
- Creates OpenAI Assistant via Assistants API
- Creates Vector Store for semantic search
- Uploads reference files to vector store
- Enables `file_search` tool automatically

**Access your assistant:**
- Go to https://platform.openai.com/assistants/
- Your assistant is listed with name based on skill

---

## Generic Markdown (Universal Export)

### Package for Markdown

```bash
# Generic markdown for manual distribution
skill-seekers package output/react/ --target markdown
```

**Output:** `output/react-markdown.zip`

### Distribution

**No upload API available** - Use for manual distribution:
- Share ZIP file directly
- Upload to documentation hosting
- Include in git repositories
- Use with any LLM that accepts markdown

---

## Complete Workflow

### Single Platform (Claude)

```bash
# 1. Scrape documentation
skill-seekers scrape --config configs/react.json

# 2. Enhance (recommended)
skill-seekers enhance output/react/

# 3. Package for Claude (default)
skill-seekers package output/react/

# 4. Upload to Claude
skill-seekers upload output/react.zip
```

### Multi-Platform (Same Skill)

```bash
# 1. Scrape once (universal)
skill-seekers scrape --config configs/react.json

# 2. Enhance once
skill-seekers enhance output/react/

# 3. Package for ALL platforms
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown

# 4. Upload to platforms
export ANTHROPIC_API_KEY=sk-ant-...
export GOOGLE_API_KEY=AIzaSy...
export OPENAI_API_KEY=sk-proj-...

skill-seekers upload output/react.zip --target claude
skill-seekers upload output/react-gemini.tar.gz --target gemini
skill-seekers upload output/react-openai.zip --target openai

# Result:
# - react.zip (Claude)
# - react-gemini.tar.gz (Gemini)
# - react-openai.zip (OpenAI)
# - react-markdown.zip (Universal)
```

---

## Troubleshooting

### "API key not set"

**Claude:**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

**Gemini:**
```bash
export GOOGLE_API_KEY=AIzaSy...
pip install skill-seekers[gemini]
```

**OpenAI:**
```bash
export OPENAI_API_KEY=sk-proj-...
pip install skill-seekers[openai]
```

### Upload fails

If API upload fails, you can always use manual upload:
- **Claude:** https://claude.ai/skills
- **Gemini:** https://aistudio.google.com/
- **OpenAI:** https://platform.openai.com/assistants/

### Wrong file format

Each platform requires specific format:
- Claude/OpenAI/Markdown: `.zip` file
- Gemini: `.tar.gz` file

Make sure to use `--target` parameter when packaging.

---

## API Key Setup

### Get API Keys

**Claude (Anthropic):**
1. Go to https://console.anthropic.com/
2. Create API key
3. Copy key (starts with `sk-ant-`)
4. `export ANTHROPIC_API_KEY=sk-ant-...`

**Gemini (Google):**
1. Go to https://aistudio.google.com/
2. Get API key
3. Copy key (starts with `AIza`)
4. `export GOOGLE_API_KEY=AIzaSy...`

**OpenAI:**
1. Go to https://platform.openai.com/
2. Create API key
3. Copy key (starts with `sk-proj-`)
4. `export OPENAI_API_KEY=sk-proj-...`

### Persist API Keys

Add to shell profile to keep them set:
```bash
# macOS/Linux (bash)
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.bashrc
echo 'export GOOGLE_API_KEY=AIzaSy...' >> ~/.bashrc
echo 'export OPENAI_API_KEY=sk-proj-...' >> ~/.bashrc

# macOS (zsh)
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.zshrc
echo 'export GOOGLE_API_KEY=AIzaSy...' >> ~/.zshrc
echo 'export OPENAI_API_KEY=sk-proj-...' >> ~/.zshrc
```

Then restart your terminal or run:
```bash
source ~/.bashrc  # or ~/.zshrc
```

---

## See Also

- [Multi-LLM Support](/docs/features/multi-llm-support) - Multi-platform details
- [CLI Reference: package](/docs/cli/package) - Package command
- [CLI Reference: upload](/docs/cli/upload) - Upload command
