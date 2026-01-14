---
title: Claude AI Integration Technical Reference
description: Complete technical reference for integrating Skill Seekers with Claude AI, including skill formats, API usage, MCP integration, and development workflows
section: reference
order: 3
---

# Claude AI Integration Technical Reference

**Complete technical guide for creating, packaging, and deploying skills to Claude AI.**

## Overview

Skill Seekers is designed as the **official skill creation toolkit** for Claude AI. This guide covers the technical architecture, file formats, API integration, and development workflows.

**Version:** v2.6.0 (Three-Stream GitHub Architecture - Phases 1-5 Complete!)

---

## Skill File Format

### SKILL.md Structure

Claude AI skills use a **markdown file with YAML frontmatter**:

```markdown
---
name: skill-name
description: When to use this skill (1-2 sentences)
tags:
  - tag1
  - tag2
custom_instructions: |
  Optional: Specific instructions for Claude when using this skill
---

# Skill Name

Comprehensive documentation for the skill...

## Quick Reference

Key APIs, commands, or concepts...

## Examples

Practical code examples...

## References

Links to official documentation...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ Yes | Skill identifier (lowercase, hyphens) |
| `description` | ✅ Yes | When to use this skill (shown in Claude UI) |
| `tags` | ❌ Optional | Categorization tags |
| `custom_instructions` | ❌ Optional | Specific behavior instructions |
| `version` | ❌ Optional | Skill version (e.g., "1.0.0") |
| `author` | ❌ Optional | Skill creator |

---

## Package Structure

### Standard Package (ZIP)

```
skill-name.zip
├── SKILL.md                    # Main skill file
├── references/                 # Supporting documentation
│   ├── api/
│   │   └── api-reference.md
│   ├── guides/
│   │   └── getting-started.md
│   └── examples/
│       └── code-examples.md
├── scripts/                    # Optional helper scripts
│   └── setup.sh
└── assets/                     # Optional images/diagrams
    └── architecture.png
```

**Create with:**
```bash
skill-seekers package output/skill-name/ --target claude
```

**Result:** `skill-name.zip` (Claude AI format)

### Router Package (Multi-Skill)

```
project-router.zip
├── SKILL.md                    # Router skill
├── sub-skills/
│   ├── project-code/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── project-docs/
│   │   ├── SKILL.md
│   │   └── references/
│   └── project-github/
│       ├── SKILL.md
│       └── references/
└── metadata.json               # Package metadata
```

**Create with:**
```bash
skill-seekers router output/*/ --output output/project-router/
skill-seekers package output/project-router/ --include-subskills
```

---

## Claude AI Skills API

### Manual Upload (Browser)

1. Go to [Claude.ai](https://claude.ai/)
2. Navigate to **Skills** section
3. Click **Create Skill**
4. Upload `skill-name.zip`
5. Test in conversation

### Programmatic Upload (API)

**Note:** Official Skills API is in development. Manual upload recommended for now.

**Future API (planned):**
```python
from anthropic import Anthropic

client = Anthropic(api_key="sk-ant-...")

# Upload skill
skill = client.skills.create(
    file=open("skill-name.zip", "rb"),
    name="skill-name",
    description="When to use this skill"
)

print(f"Skill ID: {skill.id}")
```

---

## Development Workflow

### 1. Create Skill from Documentation

```bash
# Scrape documentation
skill-seekers scrape --config configs/react.json

# Result: output/react/SKILL.md + references/
```

### 2. Enhance with AI (Optional)

```bash
# Use Claude Code Max (FREE, LOCAL mode)
skill-seekers enhance output/react/ --enhance-local

# Or use API mode (requires ANTHROPIC_API_KEY)
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --enhance
```

### 3. Package for Claude

```bash
skill-seekers package output/react/ --target claude
# Result: react.zip
```

### 4. Upload to Claude AI

```bash
# Manual upload (recommended)
# 1. Go to claude.ai/skills
# 2. Upload react.zip

# Or use MCP tool (if available)
skill-seekers upload react.zip --target claude
```

---

## MCP Integration

### Skill Seekers MCP Server

**18 tools for skill development:**

**Setup:**
```bash
# Install
pip install skill-seekers[mcp]

# Add to Claude Desktop config
# File: ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
# File: %APPDATA%/Claude/claude_desktop_config.json (Windows)

{
  "mcpServers": {
    "skill-seekers": {
      "command": "uvx",
      "args": ["skill-seekers-mcp"]
    }
  }
}
```

**Restart Claude Desktop** to activate MCP tools.

### Available MCP Tools

**Documentation Scraping:**
1. `scrape_docs` - Scrape documentation website
2. `scrape_github` - Scrape GitHub repository
3. `scrape_pdf` - Extract from PDF files
4. `unified_scrape` - Multi-source scraping

**Skill Management:**
5. `package_skill` - Package skill for platform
6. `upload_skill` - Upload to Claude/Gemini/OpenAI
7. `enhance_skill` - AI enhancement
8. `validate_skill` - Validate skill structure

**Codebase Analysis (C3.x):**
9. `analyze_codebase` - Full codebase analysis
10. `extract_patterns` - Design pattern detection
11. `extract_test_examples` - Test example extraction
12. `build_how_to_guides` - Generate tutorials

**Git Config Sources:**
13. `add_git_source` - Add git-based config
14. `list_git_sources` - List sources
15. `remove_git_source` - Remove source
16. `fetch_git_sources` - Fetch updates

**Utilities:**
17. `list_presets` - Show available presets
18. `get_preset` - Get preset config

### Using MCP Tools in Claude

**Example conversation:**

```
You: Create a React skill from the official documentation

Claude: I'll use the MCP tools to create a React skill.

[Claude calls scrape_docs tool]
{
  "config_path": "configs/react.json"
}

[Scraping completes]

[Claude calls package_skill tool]
{
  "skill_dir": "output/react",
  "target": "claude"
}

Done! I've created react.zip. You can upload it to claude.ai/skills.
```

---

## Three-Stream GitHub Architecture

For large projects with extensive codebases and documentation.

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│ Router Skill (Intelligent Query Routing)            │
│ - Analyzes user question                            │
│ - Routes to appropriate sub-skill(s)                │
│ - Synthesizes comprehensive answer                  │
└─────────────────────────────────────────────────────┘
         │
         ├──────────────┬──────────────┬──────────────┐
         │              │              │              │
         ▼              ▼              ▼              ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ Code Stream    │ │ Docs Stream    │ │ GitHub Stream  │
│ (C3.x)         │ │ (Scraper)      │ │ (Issues etc)   │
│                │ │                │ │                │
│ - Structure    │ │ - API Ref      │ │ - README       │
│ - Patterns     │ │ - Guides       │ │ - Issues       │
│ - Tests        │ │ - Tutorials    │ │ - Changelog    │
│ - How-Tos      │ │ - Examples     │ │ - Releases     │
└────────────────┘ └────────────────┘ └────────────────┘
```

### Implementation

```bash
# Stream 1: Code Analysis
skill-seekers-codebase react/ --output output/react-code/

# Stream 2: Documentation
skill-seekers scrape --config configs/react-docs.json

# Stream 3: GitHub Insights
skill-seekers github facebook/react --output output/react-github/

# Generate Router
skill-seekers router output/react-*/ --output output/react-router/ --name "react-complete"

# Package All
skill-seekers package output/react-router/ --include-subskills --target claude
```

**See also:** [Three-Stream GitHub Architecture](/docs/reference/c3x-router-architecture)

---

## Testing and Validation

### Local Testing

**Before uploading to Claude:**

```bash
# 1. Validate skill structure
skill-seekers validate output/react/

# Expected output:
# ✅ SKILL.md exists
# ✅ Frontmatter valid
# ✅ Name field present
# ✅ Description field present
# ✅ References directory exists
# ✅ No broken links
# ✅ Token count: 45,231 (within limits)

# 2. Test with Claude Code locally
cd output/react/
cat SKILL.md | claude --stdin "Explain React hooks"
```

### Quality Checks

**Run before packaging:**

```bash
# Check token count
skill-seekers validate output/react/ --check-tokens

# Validate links
skill-seekers validate output/react/ --check-links

# Check formatting
skill-seekers validate output/react/ --check-format
```

---

## Platform-Specific Features

### Claude AI Exclusive Features

**1. Custom Instructions**

```yaml
---
name: react
description: React framework documentation
custom_instructions: |
  When answering React questions:
  1. Always prefer functional components over class components
  2. Recommend hooks-based state management
  3. Use TypeScript examples when possible
  4. Show both JavaScript and TypeScript variants for complex examples
---
```

**2. Sub-Skills (Router Pattern)**

Claude AI supports hierarchical skills with intelligent routing.

**3. Conversation Context**

Skills can access conversation history and maintain context across turns.

---

## Advanced Configuration

### Skill Metadata (metadata.json)

Optional metadata file for package info:

```json
{
  "name": "react",
  "version": "18.2.0",
  "author": "Skill Seekers",
  "created": "2025-01-14T12:00:00Z",
  "updated": "2025-01-14T12:00:00Z",
  "platform": "claude",
  "description": "Complete React framework knowledge",
  "tags": ["react", "javascript", "frontend", "framework"],
  "token_count": 45231,
  "file_count": 24,
  "source_url": "https://react.dev/",
  "enhancement_applied": true,
  "enhancement_mode": "local"
}
```

**Auto-generated during packaging.**

### Custom Packaging Scripts

**Create custom package layouts:**

```python
from skill_seekers.packaging import SkillPackager

packager = SkillPackager(
    skill_dir="output/react",
    target="claude"
)

# Customize package
packager.add_file("custom-guide.md", "references/guides/")
packager.exclude_pattern("*.tmp")
packager.set_metadata({
    "author": "Your Name",
    "custom_field": "value"
})

# Build package
packager.build("react-custom.zip")
```

---

## Token Budget Guidelines

### Claude AI Token Limits

| Tier | Context Window | Recommended Skill Size |
|------|----------------|------------------------|
| **Free** | 200K tokens | < 50K tokens per skill |
| **Pro** | 200K tokens | < 100K tokens per skill |
| **API** | 200K tokens | < 100K tokens per skill |

**Best Practices:**
- Keep main SKILL.md under 20K tokens
- Use references/ for detailed documentation
- Split large skills into router + sub-skills
- Use intelligent chunking for 100K+ documentation

**See also:** [Large Documentation Handling](/docs/reference/large-documentation)

---

## Skill Discovery

### How Claude Finds Your Skill

Claude AI matches skills to conversations based on:

1. **Skill Description** - Primary matching signal
2. **Tags** - Secondary categorization
3. **SKILL.md Content** - Keyword matching
4. **User Selection** - Manual skill activation

**Optimize for discovery:**

```yaml
---
name: react
description: Use for React framework questions - hooks, components, state management, routing, testing
tags:
  - react
  - javascript
  - jsx
  - frontend
  - web-development
  - hooks
  - components
---
```

---

## Troubleshooting

### Issue: Skill not appearing in Claude

**Possible causes:**
- Description too generic
- Missing required frontmatter fields
- ZIP corruption

**Solution:**
1. Validate skill: `skill-seekers validate output/skill/`
2. Check description is specific and clear
3. Re-package: `skill-seekers package output/skill/ --target claude`

### Issue: Skill giving outdated information

**Cause:** Documentation changed since skill creation

**Solution:**
```bash
# Re-scrape documentation
skill-seekers scrape --config configs/project.json

# Re-enhance (optional)
skill-seekers enhance output/project/ --enhance-local

# Re-package and re-upload
skill-seekers package output/project/ --target claude
```

### Issue: Token limit exceeded

**Cause:** Skill too large for Claude context window

**Solution:**
```bash
# Use router pattern to split skill
skill-seekers router output/project/ --max-tokens 50000
```

**See also:** [Skill Architecture Guide](/docs/reference/skill-architecture)

---

## Next Steps

- [AI Skill Standards](/docs/reference/ai-skill-standards) - Best practices for all platforms
- [Three-Stream Architecture](/docs/reference/c3x-router-architecture) - Large project pattern
- [Multi-LLM Support](/docs/features/multi-llm-support) - Platform comparison
- [MCP Setup Guide](/docs/guides/mcp-setup) - Install MCP integration

---

**Status**: ✅ Production Ready (v2.6.0)

Found an issue or have suggestions? [Open an issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
