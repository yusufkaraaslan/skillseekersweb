---
title: Overview
description: Deploy skills to Claude AI, Google Gemini, OpenAI ChatGPT, or export as Markdown
section: manual
subsection: platforms
order: 1
---

# Multi-LLM Platform Support

**Available since v2.5.0**

Skill Seekers supports 4 LLM platforms out of the box. Scrape documentation once, deploy everywhere.

## Supported Platforms

| Platform | Format | Auto Upload | AI Enhancement | Package Size | API Key Required |
|----------|--------|-------------|----------------|--------------|------------------|
| **Claude AI** | ZIP + YAML | ✅ Yes | ✅ Yes | Optimized | ANTHROPIC_API_KEY |
| **Google Gemini** | tar.gz | ✅ Yes | ✅ Yes | Compressed | GOOGLE_API_KEY |
| **OpenAI ChatGPT** | ZIP + Vector Store | ✅ Yes | ✅ Yes | Indexed | OPENAI_API_KEY |
| **Generic Markdown** | ZIP | ❌ Manual | ❌ No | Universal | None |

## Installation Options

### Install Core Package Only

```bash
# Default installation (Claude support only)
pip install skill-seekers
```

### Install with Specific Platform Support

```bash
# Google Gemini support
pip install skill-seekers[gemini]

# OpenAI ChatGPT support
pip install skill-seekers[openai]

# All LLM platforms
pip install skill-seekers[all-llms]

# Development dependencies (includes testing)
pip install skill-seekers[dev]
```

### Install from Source

```bash
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
cd Skill_Seekers

# Editable install with all platforms
pip install -e .[all-llms]
```

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

## Complete Workflow Examples

### Workflow 1: Claude AI (Default)

```bash
# 1. Scrape
skill-seekers scrape --config configs/react.json

# 2. Enhance (optional but recommended)
skill-seekers enhance output/react/

# 3. Package
skill-seekers package output/react/

# 4. Upload
skill-seekers upload react.zip

# Access at: https://claude.ai/skills
```

### Workflow 2: Google Gemini

```bash
# Setup (one-time)
pip install skill-seekers[gemini]
export GOOGLE_API_KEY=AIzaSy...

# 1. Scrape (universal)
skill-seekers scrape --config configs/react.json

# 2. Enhance for Gemini
skill-seekers enhance output/react/ --target gemini

# 3. Package for Gemini
skill-seekers package output/react/ --target gemini

# 4. Upload to Gemini
skill-seekers upload react-gemini.tar.gz --target gemini

# Access at: https://aistudio.google.com/files/
```

### Workflow 3: OpenAI ChatGPT

```bash
# Setup (one-time)
pip install skill-seekers[openai]
export OPENAI_API_KEY=sk-proj-...

# 1. Scrape (universal)
skill-seekers scrape --config configs/react.json

# 2. Enhance with GPT-4o
skill-seekers enhance output/react/ --target openai

# 3. Package for OpenAI
skill-seekers package output/react/ --target openai

# 4. Upload (creates Assistant + Vector Store)
skill-seekers upload react-openai.zip --target openai

# Access at: https://platform.openai.com/assistants/
```

### Workflow 4: Export to All Platforms

```bash
# Install all platforms
pip install skill-seekers[all-llms]

# Scrape once
skill-seekers scrape --config configs/react.json

# Package for all platforms
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown

# Result:
# - react.zip (Claude)
# - react-gemini.tar.gz (Gemini)
# - react-openai.zip (OpenAI)
# - react-markdown.zip (Universal)
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

## Advanced Usage

### Custom Enhancement Models

Each platform uses its default enhancement model, but you can customize:

```bash
# Use specific model for enhancement (if supported)
skill-seekers enhance output/react/ --target gemini --model gemini-2.0-flash-exp
skill-seekers enhance output/react/ --target openai --model gpt-4o
```

### Programmatic Usage

```python
from skill_seekers.cli.adaptors import get_adaptor

# Get platform-specific adaptor
gemini = get_adaptor('gemini')
openai = get_adaptor('openai')
claude = get_adaptor('claude')

# Package for specific platform
gemini_package = gemini.package(skill_dir, output_path)
openai_package = openai.package(skill_dir, output_path)

# Upload with API key
result = gemini.upload(gemini_package, api_key)
print(f"Uploaded to: {result['url']}")
```

### Platform Detection

Check which platforms are available:

```python
from skill_seekers.cli.adaptors import list_platforms, is_platform_available

# List all registered platforms
platforms = list_platforms()
print(platforms)  # ['claude', 'gemini', 'openai', 'markdown']

# Check if platform is available
if is_platform_available('gemini'):
    print("Gemini adaptor is available")
```

### Custom Platform

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

## Backward Compatibility

**100% backward compatible** with existing workflows:

- All existing Claude commands work unchanged
- Default behavior remains Claude-focused
- Optional `--target` flag adds multi-platform support
- No breaking changes to existing configs or workflows

## Troubleshooting

### Missing Dependencies

**Error:** `ModuleNotFoundError: No module named 'google.generativeai'`

**Solution:**
```bash
pip install skill-seekers[gemini]
```

**Error:** `ModuleNotFoundError: No module named 'openai'`

**Solution:**
```bash
pip install skill-seekers[openai]
```

### API Key Issues

**Error:** `Invalid API key format`

**Solution:** Check your API key format:
- Claude: `sk-ant-...`
- Gemini: `AIza...`
- OpenAI: `sk-proj-...` or `sk-...`

Set environment variable:

```bash
export ANTHROPIC_API_KEY="your-key"  # Claude
export GOOGLE_API_KEY="your-key"     # Gemini
export OPENAI_API_KEY="your-key"     # OpenAI
```

### Package Format Errors

**Error:** `Not a tar.gz file: react.zip`

**Solution:** Use correct --target flag:
```bash
# Gemini requires tar.gz
skill-seekers package output/react/ --target gemini

# OpenAI and Claude use ZIP
skill-seekers package output/react/ --target openai
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

## FAQ

**Q: Can I use the same scraped data for all platforms?**

A: Yes! The scraping phase is universal. Only packaging and upload are platform-specific.

**Q: Do I need separate API keys for each platform?**

A: Yes, each platform requires its own API key. Set them as environment variables.

**Q: Can I enhance with different models?**

A: Yes, each platform uses its own enhancement model:
- Claude: Claude Sonnet 4
- Gemini: Gemini 2.0 Flash
- OpenAI: GPT-4o

**Q: What if I don't want to upload automatically?**

A: Use the `package` command without `upload`. You'll get the packaged file to upload manually.

**Q: Is the markdown export compatible with all LLMs?**

A: Yes! The generic markdown export creates universal documentation that works with any LLM or documentation system.

## Next Steps

- [Three-Stream Architecture](/docs/features/three-stream-architecture) - Multi-source scraping
- [AI Enhancement](/docs/features/ai-enhancement) - Improve skills with AI
- [CLI Reference: package](/docs/cli/package) - Package command details
- [CLI Reference: upload](/docs/cli/upload) - Upload command details
