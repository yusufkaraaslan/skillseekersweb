---
title: Multi-LLM Platform Support
description: Deploy skills to Claude AI, Google Gemini, OpenAI ChatGPT, or export as Markdown
section: features
order: 3
---

# Multi-LLM Platform Support

**Available since v2.5.0**

Skill Seekers supports 4 LLM platforms out of the box. Scrape documentation once, deploy everywhere.

## Supported Platforms

| Platform | Format | Auto Upload | AI Enhancement | Package Size |
|----------|--------|-------------|----------------|--------------|
| **Claude AI** | ZIP + YAML | ✅ Yes | ✅ Yes | Optimized |
| **Google Gemini** | tar.gz | ✅ Yes | ✅ Yes | Compressed |
| **OpenAI ChatGPT** | ZIP + Vector Store | ✅ Yes | ✅ Yes | Indexed |
| **Generic Markdown** | ZIP | ❌ Manual | ❌ No | Universal |

## Claude AI (Default)

Claude AI is the default and most feature-rich platform.

### Installation

```bash
# Claude support is included by default
pip install skill-seekers
```

### Setup

```bash
# Set your Anthropic API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Or add to ~/.bashrc for persistence
echo 'export ANTHROPIC_API_KEY="your-key"' >> ~/.bashrc
source ~/.bashrc
```

### Usage

```bash
# Scrape documentation
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# Package for Claude (default)
skill-seekers package output/astro/

# Upload to Claude
skill-seekers upload astro.zip
```

### Features

- ✅ **YAML frontmatter** - Skills with metadata
- ✅ **References folder** - Organized documentation structure
- ✅ **Auto-categorization** - Smart content organization
- ✅ **AI enhancement** - Claude Sonnet for skill improvement
- ✅ **Version tracking** - Skill versioning support

### Output Structure

```
astro.zip
├── skill.yaml
├── SKILL.md
└── references/
    ├── getting-started.md
    ├── guides.md
    ├── api-reference.md
    └── examples.md
```

## Google Gemini

Google Gemini support with tar.gz format.

### Installation

```bash
# Install with Gemini support
pip install skill-seekers[gemini]

# Or install all platforms
pip install skill-seekers[all-llms]
```

### Setup

```bash
# Get API key from: https://makersuite.google.com/app/apikey
export GOOGLE_API_KEY="your-google-api-key"
```

### Usage

```bash
# Scrape documentation (same as Claude)
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# Package for Gemini
skill-seekers package output/astro/ --target gemini

# Upload to Gemini
skill-seekers upload astro-gemini.tar.gz --target gemini
```

### Features

- ✅ **tar.gz format** - Gemini's preferred format
- ✅ **Context caching** - Efficient token usage
- ✅ **Long context** - Up to 2M tokens
- ✅ **AI enhancement** - Gemini Pro for improvements
- ✅ **Multimodal** - Supports images in docs

### Output Structure

```
astro-gemini.tar.gz
├── metadata.json
├── content/
│   ├── main.md
│   └── sections/
│       ├── 01-getting-started.md
│       ├── 02-guides.md
│       └── 03-api.md
```

## OpenAI ChatGPT

OpenAI ChatGPT with vector store integration.

### Installation

```bash
# Install with OpenAI support
pip install skill-seekers[openai]

# Or install all platforms
pip install skill-seekers[all-llms]
```

### Setup

```bash
# Get API key from: https://platform.openai.com/api-keys
export OPENAI_API_KEY="your-openai-api-key"
```

### Usage

```bash
# Scrape documentation (same process)
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# Package for OpenAI
skill-seekers package output/astro/ --target openai

# Upload to OpenAI (creates vector store)
skill-seekers upload astro-openai.zip --target openai
```

### Features

- ✅ **Vector store** - Automatic embeddings
- ✅ **Semantic search** - Find relevant content by meaning
- ✅ **File search** - GPT-4 file search capability
- ✅ **AI enhancement** - GPT-4 for improvements
- ✅ **Assistants API** - Ready for custom GPTs

### Output Structure

```
astro-openai.zip
├── manifest.json
├── content.md
└── embeddings/
    └── vectors.json
```

## Generic Markdown

Universal markdown export for any platform.

### Installation

```bash
# Included by default
pip install skill-seekers
```

### Usage

```bash
# Scrape documentation
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# Package as generic markdown
skill-seekers package output/astro/ --target markdown
```

### Features

- ✅ **Universal format** - Works with any LLM
- ✅ **Clean markdown** - No platform-specific metadata
- ✅ **Portable** - Copy-paste friendly
- ✅ **Git-friendly** - Human-readable
- ❌ **No auto-upload** - Manual import required
- ❌ **No AI enhancement** - Raw content only

### Output Structure

```
astro-markdown.zip
├── README.md
├── getting-started/
│   ├── introduction.md
│   └── installation.md
├── guides/
│   ├── routing.md
│   └── components.md
└── api/
    └── reference.md
```

## Comparison

### Feature Matrix

| Feature | Claude AI | Gemini | OpenAI | Markdown |
|---------|-----------|--------|--------|----------|
| Auto-upload | ✅ | ✅ | ✅ | ❌ |
| AI enhancement | ✅ | ✅ | ✅ | ❌ |
| Structured format | ✅ | ✅ | ✅ | ✅ |
| Metadata | ✅ | ✅ | ✅ | ❌ |
| Versioning | ✅ | ✅ | ✅ | ❌ |
| Context optimization | ✅ | ✅ | ✅ | ❌ |
| Multi-source | ✅ | ✅ | ✅ | ✅ |
| GitHub integration | ✅ | ✅ | ✅ | ✅ |
| Three-stream | ✅ | ✅ | ✅ | ✅ |

### Cost Comparison

| Platform | Enhancement Cost | Upload Cost | Context Size | Best For |
|----------|------------------|-------------|--------------|----------|
| **Claude** | $3-7 per skill | Free | 200K tokens | Development, coding |
| **Gemini** | $1-3 per skill | Free | 2M tokens | Large docs, long context |
| **OpenAI** | $5-10 per skill | Embeddings | 128K tokens | Semantic search |
| **Markdown** | Free | N/A | Unlimited | Self-hosting, custom |

## Configuration

### Platform Selection in Config File

```json
{
  "name": "astro",
  "description": "Astro web framework documentation",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.astro.build"
    }
  ],
  "packaging": {
    "targets": ["claude", "gemini", "openai", "markdown"]
  },
  "enhancement": {
    "enabled": true,
    "provider": "anthropic"  // or "google", "openai"
  }
}
```

### Build for Multiple Platforms

```bash
# Package for all platforms at once
skill-seekers package output/astro/ \
  --target claude \
  --target gemini \
  --target openai \
  --target markdown
```

**Output:**
- `astro.zip` (Claude)
- `astro-gemini.tar.gz` (Gemini)
- `astro-openai.zip` (OpenAI)
- `astro-markdown.zip` (Generic)

## AI Enhancement

### Enhancement Providers

```bash
# Use Claude for enhancement (default)
skill-seekers enhance \
  --input output/astro/ \
  --ai-provider anthropic

# Use Gemini for enhancement
skill-seekers enhance \
  --input output/astro/ \
  --ai-provider google

# Use OpenAI for enhancement
skill-seekers enhance \
  --input output/astro/ \
  --ai-provider openai
```

### Enhancement Modes

| Mode | Description | Time | Cost |
|------|-------------|------|------|
| **minimal** | Add examples only | 5 min | Low |
| **standard** | Examples + explanations | 10 min | Medium |
| **comprehensive** | Full enhancement + best practices | 20 min | High |

```bash
skill-seekers enhance \
  --input output/astro/ \
  --ai-provider anthropic \
  --enhancement-mode comprehensive
```

## Upload

### Upload to Multiple Platforms

```bash
# Upload to Claude
skill-seekers upload astro.zip

# Upload to Gemini
skill-seekers upload astro-gemini.tar.gz --target gemini

# Upload to OpenAI
skill-seekers upload astro-openai.zip --target openai
```

### Batch Upload

```bash
# Upload all generated packages
for target in claude gemini openai; do
  skill-seekers upload astro-${target}.* --target $target
done
```

## Advanced: Custom Platform

You can create custom packaging for your own platform:

```python
from skill_seekers.packaging import PackagingStrategy

class MyCustomPlatform(PackagingStrategy):
    """Custom packaging for my platform."""

    def package(self, input_dir: Path) -> Path:
        """Package skill for custom platform."""
        # Your custom logic here
        pass

    def format_content(self, content: str) -> str:
        """Format content for your platform."""
        # Your custom formatting
        pass
```

Register your strategy:

```python
from skill_seekers import registry

registry.register_packaging_strategy("custom", MyCustomPlatform)
```

Use it:

```bash
skill-seekers package output/astro/ --target custom
```

## Best Practices

### For Documentation Only

**Best choice:** Claude AI or Gemini

```bash
pip install skill-seekers[gemini]

skill-seekers scrape --url https://docs.framework.dev
skill-seekers package output/ --target gemini
skill-seekers upload framework-gemini.tar.gz --target gemini
```

**Why:** Long context (2M tokens), lower cost

### For Code + Docs

**Best choice:** Claude AI

```bash
skill-seekers unified \
  --repo-url https://github.com/org/framework \
  --depth c3x \
  --fetch-github-metadata

skill-seekers package output/ --target claude
skill-seekers upload framework.zip
```

**Why:** Best code understanding, GitHub integration

### For Semantic Search

**Best choice:** OpenAI

```bash
pip install skill-seekers[openai]

skill-seekers scrape --url https://docs.framework.dev
skill-seekers package output/ --target openai
skill-seekers upload framework-openai.zip --target openai
```

**Why:** Vector store, semantic search built-in

### For Self-Hosting

**Best choice:** Generic Markdown

```bash
skill-seekers package output/ --target markdown

# Host on your own system
python -m http.server -d framework-markdown/
```

**Why:** No API keys, full control, git-friendly

## Troubleshooting

### "API key not found"

Set environment variable:

```bash
export ANTHROPIC_API_KEY="your-key"  # Claude
export GOOGLE_API_KEY="your-key"     # Gemini
export OPENAI_API_KEY="your-key"     # OpenAI
```

### "Package upload failed"

Check API key is valid:

```bash
# Test Claude API
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-sonnet-20240229","max_tokens":10,"messages":[{"role":"user","content":"Hi"}]}'
```

### "Wrong format for platform"

Check target matches:

- Claude: `.zip`
- Gemini: `.tar.gz`
- OpenAI: `.zip`
- Markdown: `.zip`

## Next Steps

- [Three-Stream Architecture](/docs/features/three-stream-architecture) - Multi-source scraping
- [AI Enhancement](/docs/features/ai-enhancement) - Improve skills with AI
- [CLI Reference: package](/docs/cli/package) - Package command details
- [CLI Reference: upload](/docs/cli/upload) - Upload command details
