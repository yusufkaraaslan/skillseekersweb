---
title: upload - Upload Skills
description: Upload packaged skills to Claude AI, Google Gemini, or OpenAI ChatGPT with automatic API integration
section: cli
order: 7
---

# upload - Upload Skills

Upload packaged skills to LLM platforms.

## Basic Usage

```bash
skill-seekers upload PACKAGE_FILE [OPTIONS]
```

## Quick Examples

```bash
# Upload to Claude (default)
skill-seekers upload output/react.zip

# Upload to specific platform
skill-seekers upload output/react-gemini.tar.gz --target gemini
skill-seekers upload output/react-openai.zip --target openai

# With explicit target
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers upload output/react.zip --target claude
```

## Options

- `--target PLATFORM` - Target platform (claude, gemini, openai)

## Prerequisites

### Claude AI

```bash
# Set API key (for automatic upload)
export ANTHROPIC_API_KEY=sk-ant-...

# Get key from: https://console.anthropic.com/
```

**OR manually upload:**
1. Go to https://claude.ai/skills
2. Click "Upload Skill"
3. Select `.zip` file

### Google Gemini

```bash
# Install Gemini support
pip install skill-seekers[gemini]

# Set API key
export GOOGLE_API_KEY=AIzaSy...

# Get key from: https://aistudio.google.com/
```

### OpenAI ChatGPT

```bash
# Install OpenAI support
pip install skill-seekers[openai]

# Set API key
export OPENAI_API_KEY=sk-proj-...

# Get key from: https://platform.openai.com/
```

## Platform-Specific Usage

### Claude AI

```bash
# Automatic upload (with API key)
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers upload output/react.zip

# Manual upload (no API key)
# 1. Go to https://claude.ai/skills
# 2. Click "Upload Skill"
# 3. Select output/react.zip
```

**What happens:**
- Uploads to Claude Skills API
- Available in claude.ai immediately
- Works in Claude Code and Claude Desktop

### Google Gemini

```bash
# Upload to Gemini
export GOOGLE_API_KEY=AIzaSy...
skill-seekers upload output/react-gemini.tar.gz --target gemini
```

**What happens:**
- Uploads to Google Files API
- Creates grounding resource
- Available in Google AI Studio

**Access:**
- Go to https://aistudio.google.com/
- Your skill appears as grounding data

### OpenAI ChatGPT

```bash
# Upload to OpenAI
export OPENAI_API_KEY=sk-proj-...
skill-seekers upload output/react-openai.zip --target openai
```

**What happens:**
- Creates OpenAI Assistant via Assistants API
- Creates Vector Store for semantic search
- Uploads files to vector store
- Enables `file_search` tool

**Access:**
- Go to https://platform.openai.com/assistants/
- Your assistant is listed with skill name

## Complete Workflow

```bash
# 1. Scrape documentation
skill-seekers scrape --config configs/react.json

# 2. Enhance
skill-seekers enhance output/react/

# 3. Package for platform
skill-seekers package output/react/ --target claude

# 4. Upload
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers upload output/react.zip
```

## Multi-Platform Upload

```bash
# Set all API keys
export ANTHROPIC_API_KEY=sk-ant-...
export GOOGLE_API_KEY=AIzaSy...
export OPENAI_API_KEY=sk-proj-...

# Upload to all platforms
skill-seekers upload output/react.zip --target claude
skill-seekers upload output/react-gemini.tar.gz --target gemini
skill-seekers upload output/react-openai.zip --target openai
```

## API Key Management

### Get API Keys

**Claude (Anthropic):**
1. Visit https://console.anthropic.com/
2. Create API key
3. Copy key (starts with `sk-ant-`)

**Gemini (Google):**
1. Visit https://aistudio.google.com/
2. Get API key
3. Copy key (starts with `AIza`)

**OpenAI:**
1. Visit https://platform.openai.com/
2. Create API key
3. Copy key (starts with `sk-proj-`)

### Persist API Keys

Add to shell profile:

```bash
# macOS/Linux (bash)
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.bashrc
echo 'export GOOGLE_API_KEY=AIzaSy...' >> ~/.bashrc
echo 'export OPENAI_API_KEY=sk-proj-...' >> ~/.bashrc
source ~/.bashrc

# macOS (zsh)
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.zshrc
echo 'export GOOGLE_API_KEY=AIzaSy...' >> ~/.zshrc
echo 'export OPENAI_API_KEY=sk-proj-...' >> ~/.zshrc
source ~/.zshrc
```

## Troubleshooting

### "API key not set"

Set the appropriate environment variable:

```bash
# Claude
export ANTHROPIC_API_KEY=sk-ant-...

# Gemini
export GOOGLE_API_KEY=AIzaSy...

# OpenAI
export OPENAI_API_KEY=sk-proj-...
```

### "Package not found"

Make sure you packaged first:

```bash
skill-seekers package output/react/ --target claude
skill-seekers upload output/react.zip
```

### Upload fails

If API upload fails, use manual upload:

- **Claude:** https://claude.ai/skills
- **Gemini:** https://aistudio.google.com/
- **OpenAI:** https://platform.openai.com/assistants/

### Wrong file format

Each platform requires specific format:

- Claude: `react.zip`
- Gemini: `react-gemini.tar.gz`
- OpenAI: `react-openai.zip`

## Verification

After upload, verify your skill:

**Claude AI:**
```
# In Claude Code or claude.ai
Ask Claude: "What skills do you have?"
```

**Google Gemini:**
```
# Visit https://aistudio.google.com/
# Check Files section for your skill
```

**OpenAI:**
```
# Visit https://platform.openai.com/assistants/
# Your assistant should be listed
```

## Next Steps

- [Upload Guide](/docs/guides/upload-guide) - Complete upload guide
- [Multi-LLM Support](/docs/features/multi-llm-support) - Platform comparison
- [Package Command](/docs/cli/package) - Package for platforms
