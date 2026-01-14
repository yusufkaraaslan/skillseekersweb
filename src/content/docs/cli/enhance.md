---
title: enhance - AI Enhancement
description: Enhance skills with AI to improve quality, add examples, and expand documentation using Claude API or local Claude Code
section: cli
order: 8
---

# enhance - AI Enhancement

AI-enhance skills to improve quality and add comprehensive examples.

## Basic Usage

```bash
skill-seekers enhance INPUT_DIR [OPTIONS]
```

## Quick Examples

```bash
# Local enhancement (free, uses Claude Code)
skill-seekers enhance output/react/

# API enhancement (requires API key)
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --api

# With specific provider
skill-seekers enhance output/react/ --provider anthropic --mode api
skill-seekers enhance output/react/ --provider google --mode api
skill-seekers enhance output/react/ --provider openai --mode api
```

## Options

- `--mode MODE` - Enhancement mode: `local` or `api` (default: local)
- `--provider PROVIDER` - AI provider: anthropic, google, openai
- `--api-key KEY` - API key (or use environment variable)
- `--quality LEVEL` - Quality level: minimal, standard, comprehensive

## Enhancement Modes

### Local Mode (Recommended - FREE)

```bash
skill-seekers enhance output/react/
```

**How it works:**
- Opens new terminal with Claude Code
- Uses your Claude Code Max plan
- No API costs
- Takes ~60 seconds

**Requirements:**
- Claude Code installed
- Active Claude Code Max subscription

### API Mode

```bash
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --mode api
```

**How it works:**
- Calls Claude API directly
- Uses Claude Sonnet 4
- Costs ~$0.01-0.10 per skill
- Takes ~30-60 seconds

**Requirements:**
- API key from https://console.anthropic.com/

## AI Providers

### Anthropic (Claude)

```bash
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --provider anthropic --mode api
```

**Models:**
- Claude Sonnet 4 (default)
- Best for code and technical docs

### Google (Gemini)

```bash
pip install skill-seekers[gemini]
export GOOGLE_API_KEY=AIzaSy...
skill-seekers enhance output/react/ --provider google --mode api
```

**Models:**
- Gemini 2.0 Flash
- Good for long context (2M tokens)

### OpenAI (GPT)

```bash
pip install skill-seekers[openai]
export OPENAI_API_KEY=sk-proj-...
skill-seekers enhance output/react/ --provider openai --mode api
```

**Models:**
- GPT-4o
- Good for general enhancement

## Quality Levels

### Minimal (Fast - 15-30 sec)

```bash
skill-seekers enhance output/react/ --quality minimal
```

**Improvements:**
- Add code examples
- Fix formatting
- Basic explanations

### Standard (Default - 30-60 sec)

```bash
skill-seekers enhance output/react/
```

**Improvements:**
- Everything from minimal
- Comprehensive explanations
- Best practices
- Common use cases

### Comprehensive (Thorough - 1-2 min)

```bash
skill-seekers enhance output/react/ --quality comprehensive
```

**Improvements:**
- Everything from standard
- Advanced examples
- Troubleshooting guides
- Performance tips
- Security considerations

## What Gets Enhanced

### SKILL.md Improvements

**Before Enhancement:**
```markdown
# React Framework

React is a JavaScript library for building user interfaces.

## Key Features
- Component-based
- Virtual DOM
- JSX syntax
```

**After Enhancement:**
```markdown
# React Framework

React is a JavaScript library for building user interfaces, developed by Meta (formerly Facebook). It enables developers to create reusable UI components that efficiently update and render based on data changes.

## Key Features

### Component-Based Architecture
React applications are built using reusable components that manage their own state and compose to create complex UIs.

**Example:**
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function App() {
  return <Welcome name="React Developer" />;
}
```

### Virtual DOM
React uses a virtual representation of the DOM to optimize rendering performance...
```

### Enhancements Include

✅ **Better Explanations**
- Natural language descriptions
- Why/how/when context
- Real-world use cases

✅ **Code Examples**
- Working code snippets
- Common patterns
- Best practices

✅ **Troubleshooting**
- Common errors
- Solutions
- Debugging tips

✅ **Prerequisites**
- Requirements
- Setup steps
- Dependencies

✅ **Next Steps**
- Related topics
- Learning paths
- Advanced features

## Workflow Integration

### Scrape + Enhance

```bash
# Combined in one command
skill-seekers scrape --config configs/react.json --enhance-local

# Or separately
skill-seekers scrape --config configs/react.json
skill-seekers enhance output/react/
```

### Enhance + Package

```bash
# Enhance then package
skill-seekers enhance output/react/
skill-seekers package output/react/
```

### Complete Workflow

```bash
# 1. Scrape
skill-seekers scrape --config configs/react.json

# 2. Enhance
skill-seekers enhance output/react/

# 3. Package
skill-seekers package output/react/

# 4. Upload
skill-seekers upload output/react.zip
```

## Backup Files

Enhancement creates backups:

```
output/react/
├── SKILL.md                # Enhanced version
├── SKILL.md.backup        # Original version
└── references/            # Also backed up
    └── *.md.backup
```

**Restore original:**
```bash
cd output/react
cp SKILL.md.backup SKILL.md
```

## Cost Estimates

### Local Mode (FREE)

- No API costs
- Uses your Claude Code Max plan
- Unlimited enhancements

### API Mode

| Provider | Model | Cost per Skill |
|----------|-------|----------------|
| Anthropic | Claude Sonnet 4 | $0.01-0.10 |
| Google | Gemini 2.0 Flash | $0.005-0.05 |
| OpenAI | GPT-4o | $0.02-0.15 |

*Costs vary based on skill size and quality level*

## Troubleshooting

### Local Mode Not Working

Make sure Claude Code is running:
```bash
# macOS
open -a "Claude"

# Check if Claude Code is in PATH
which claude
```

### API Mode Fails

Verify API key:
```bash
echo $ANTHROPIC_API_KEY
# Should show: sk-ant-...

# Or set it
export ANTHROPIC_API_KEY=sk-ant-...
```

### Enhancement Too Slow

Use minimal quality:
```bash
skill-seekers enhance output/react/ --quality minimal
```

Or use local mode (usually faster):
```bash
skill-seekers enhance output/react/
```

## Next Steps

- [Package Command](/docs/cli/package) - Package enhanced skills
- [Features: AI Enhancement](/docs/features/ai-enhancement) - Enhancement details
- [Upload Guide](/docs/guides/upload-guide) - Deploy your skills
