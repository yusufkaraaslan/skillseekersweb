---
title: Installation
description: Step-by-step guide to installing Skill Seekers on your system
section: getting-started
order: 2
---

# Installation Guide

**Time:** 15-30 minutes total (including all installations)

**Result:** Working Skill Seekers installation ready to create your first Claude skill

## Prerequisites

Before starting, you need:
- A computer (macOS, Linux, or Windows with WSL)
- Internet connection
- 30 minutes of time

## Method 1: Install via PyPI (Recommended)

The easiest way to install Skill Seekers is through PyPI:

```bash
# Install base package
pip install skill-seekers

# Or install with specific LLM platform support
pip install skill-seekers[gemini]  # For Google Gemini
pip install skill-seekers[openai]  # For OpenAI ChatGPT
pip install skill-seekers[all]     # For all platforms
```

**Verify installation:**
```bash
skill-seekers --version
# Should show: skill-seekers 2.7.0 or higher
```

## Method 2: Install from Source

For development or the latest features:

### Step 1: Install Python (5 minutes)

#### Check if You Already Have Python

```bash
python3 --version
```

**✅ If you see:** `Python 3.10.x` or higher → **Skip to Step 2!**

**❌ If not installed:**

**macOS:**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python3
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

**Windows:**
1. Download Python from: https://www.python.org/downloads/
2. Run installer
3. **IMPORTANT:** Check "Add Python to PATH" during installation

### Step 2: Install Git (3 minutes)

```bash
git --version
```

**✅ If you see:** `git version 2.x.x` → **Skip to Step 3!**

**❌ If not installed:**

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git
```

**Windows:**
Download from: https://git-scm.com/download/win

### Step 3: Clone and Install (2 minutes)

```bash
# Create Projects directory
mkdir -p ~/Projects
cd ~/Projects

# Clone repository
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
cd Skill_Seekers

# Install in development mode
pip install -e .

# Or install with all dependencies
pip install -e ".[all]"
```

**Verify installation:**
```bash
skill-seekers --version
```

## Set Up API Keys

Skill Seekers can enhance skills using AI. Set up your API key:

### For Claude (Anthropic)

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

### For Google Gemini

```bash
export GOOGLE_API_KEY="your-api-key-here"
```

### For OpenAI

```bash
export OPENAI_API_KEY="your-api-key-here"
```

**Make it permanent (optional):**

Add the export command to your shell profile (`~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`):

```bash
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

## Troubleshooting

### "command not found: skill-seekers"

Make sure pip's bin directory is in your PATH:

```bash
# Find where pip installed it
pip show skill-seekers

# Add to PATH (adjust path as needed)
export PATH="$HOME/.local/bin:$PATH"
```

### "No module named 'skill_seekers'"

Install using pip instead of python:

```bash
pip install -e .
```

### Permission errors

Use `--user` flag:

```bash
pip install --user skill-seekers
```

## Next Steps

- [Quick Start Guide](/docs/getting-started/quick-start) - Create your first skill in 5 minutes
- [Browse Configs](/configs) - Explore pre-built configurations
- [Features Overview](/docs/about/features) - Learn what Skill Seekers can do
