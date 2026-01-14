---
title: Three-Stream GitHub Architecture
description: Split GitHub repositories into Code, Docs, and Insights streams for comprehensive AI skills
section: manual
subsection: advanced
order: 1
---

# Three-Stream GitHub Architecture

**New in v2.6.0**

The Three-Stream Architecture is a revolutionary approach to analyzing GitHub repositories that splits them into three distinct streams: Code, Documentation, and Insights. This provides Claude AI with a complete understanding of any framework or library.

## What is Three-Stream Architecture?

Instead of treating a GitHub repository as a single monolithic source, Skill Seekers now intelligently splits it into three separate streams:

```
GitHub Repository
  ↓
Three-Stream Fetcher
  ├─ Stream 1: CODE → C3.x Analysis (patterns, examples)
  ├─ Stream 2: DOCS → README/docs/*.md (official docs)
  └─ Stream 3: INSIGHTS → Common problems + solutions
```

## The Three Streams Explained

### Stream 1: Code Analysis

Deep C3.x analysis of the actual codebase:

- **Design Patterns** - Detects architectural patterns (Strategy, Factory, Singleton, etc.)
- **Test Examples** - Extracts real working examples from test files
- **How-To Guides** - Generates tutorials from code patterns
- **Configuration Files** - Analyzes 9 config formats
- **Architecture** - Maps the overall system design

**Time:** 20-60 minutes (depending on repo size)

### Stream 2: Documentation

Official documentation from the repository:

- **README.md** - Quick start guide and overview
- **CONTRIBUTING.md** - Development guidelines
- **docs/** - All markdown documentation files
- **CHANGELOG.md** - Version history

**Time:** 1-2 minutes

### Stream 3: GitHub Insights

Community knowledge from GitHub:

- **Open Issues** - Common problems users face
- **Closed Issues** - Known solutions
- **Labels** - Topic categorization
- **Stats** - Stars, forks, activity level

**Time:** 1-2 minutes

## Why Three Streams?

### Complete Knowledge

**Before (single stream):**
- ❌ Only code OR docs
- ❌ No user problems
- ❌ No community solutions

**After (three streams):**
- ✅ Code implementation (what it DOES)
- ✅ Official documentation (what it SHOULD do)
- ✅ Real user problems (what BREAKS)
- ✅ Known solutions (how to FIX it)

### Conflict Detection

The architecture automatically detects when documentation and code disagree:

```python
# Documentation says:
GoogleProvider(app_id="...", app_secret="...")

# But code actually uses:
GoogleProvider(client_id="...", client_secret="...")
```

Skill Seekers creates hybrid content showing BOTH versions with warnings.

### Real-World Problems

From GitHub issues, Claude learns:

- What confuses users most
- Common setup problems
- Known workarounds
- Breaking changes between versions

## Usage Example

### Basic Three-Stream Analysis

```bash
# Analyze a GitHub repo with all three streams
skill-seekers unified \
  --repo-url https://github.com/facebook/react \
  --depth c3x \
  --fetch-github-metadata \
  --output-dir output/react
```

### With Configuration File

```json
{
  "name": "react",
  "description": "React framework with complete GitHub analysis",
  "sources": [
    {
      "type": "codebase",
      "source": "https://github.com/facebook/react",
      "analysis_depth": "c3x",
      "fetch_github_metadata": true,
      "split_docs": true,
      "max_issues": 100
    }
  ]
}
```

**Result:**
- ✅ Code analyzed with C3.x
- ✅ README and docs extracted
- ✅ Top 100 issues analyzed
- ✅ All data merged into comprehensive skill

## Analysis Depth Modes

### Basic Mode (1-2 minutes)

```bash
skill-seekers unified \
  --repo-url https://github.com/fastapi/fastapi \
  --depth basic \
  --fetch-github-metadata
```

**Includes:**
- File structure
- Import relationships
- Entry points
- GitHub metadata
- Top issues

**Use for:** Quick overview, testing, small projects

### C3.x Mode (20-60 minutes)

```bash
skill-seekers unified \
  --repo-url https://github.com/fastapi/fastapi \
  --depth c3x \
  --fetch-github-metadata
```

**Includes:**
- Everything from basic mode
- C3.1: Design patterns (hundreds detected)
- C3.2: Test examples (real working code)
- C3.3: How-to guides (generated from patterns)
- C3.4: Configuration analysis (9 formats)
- C3.7: Architectural patterns

**Use for:** Production skills, comprehensive understanding

## Multi-Source with Three Streams

Combine documentation websites WITH GitHub analysis:

```json
{
  "name": "fastapi",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://fastapi.tiangolo.com/",
      "max_pages": 200
    },
    {
      "type": "codebase",
      "source": "https://github.com/fastapi/fastapi",
      "analysis_depth": "c3x",
      "fetch_github_metadata": true,
      "max_issues": 100
    }
  ],
  "merge_mode": "conflict_detection"
}
```

**You get 4 data sources:**
1. HTML documentation (scraped docs site)
2. Code analysis (C3.x from GitHub)
3. Repo documentation (README/docs)
4. GitHub insights (issues, stats)

## Router-Based Skills

With three streams, skills become router-based for better organization:

```
fastapi/                      # Main router skill
├── SKILL.md                  # Overview + top issues
└── references/
    ├── index.md
    └── common_issues.md      # From GitHub

fastapi-authentication/       # Auth sub-skill
├── SKILL.md                  # OAuth-focused content
└── references/
    ├── oauth_overview.md     # From C3.x + docs
    ├── oauth_patterns.md     # From C3.x patterns
    └── oauth_issues.md       # From GitHub issues
```

**Benefits:**
- 45% token reduction vs monolithic skills
- 100% content relevance (only load what you need)
- GitHub insights integrated per topic

## Real-World Example

### FastMCP Analysis

Analyzing `https://github.com/jlowin/fastmcp`:

**Stream 1 (Code):**
- 905 design patterns detected
- 723 test examples extracted
- Service Layer architecture identified
- 316 API documentation files generated

**Stream 2 (Docs):**
- README quick start guide
- OAuth setup documentation
- Async patterns guide
- API reference docs

**Stream 3 (Insights):**
- **Top Problem:** "OAuth setup fails" (Issue #42, 15 comments)
- **Solution:** Check redirect URI configuration
- **Labels:** oauth (15 issues), async (8 issues), testing (6 issues)
- **Stats:** 1,234 stars, 56 forks, 12 open issues

## Benefits

### For Developers
- Complete understanding of any framework
- Real user problems and solutions
- Conflict detection between docs and code
- No manual research needed

### For Teams
- Single source of truth (code + docs + community)
- Identify documentation gaps
- Learn from real user pain points
- Keep skills updated with latest issues

### For Open Source
- Understand common user problems
- Find documentation that needs updating
- See which features confuse users most
- Track issue patterns over time

## Advanced Configuration

### Limit Issue Fetching

```json
{
  "type": "codebase",
  "source": "https://github.com/django/django",
  "fetch_github_metadata": true,
  "max_issues": 50,
  "issue_labels": ["bug", "question"]  // Only fetch specific labels
}
```

### Disable Specific Streams

```json
{
  "type": "codebase",
  "source": "https://github.com/vuejs/vue",
  "analysis_depth": "c3x",
  "fetch_github_metadata": false,      // No insights stream
  "split_docs": false                   // Keep docs with code
}
```

### Local Repositories

Works with local paths too (no GitHub metadata):

```bash
skill-seekers unified \
  --source /path/to/local/project \
  --depth c3x
```

## Test Coverage

The Three-Stream Architecture has:
- **81 passing tests**
- **E2E validation** in 0.44 seconds
- **Comprehensive coverage** of all three streams

## Next Steps

- [C3.x Codebase Analysis](/docs/features/c3x-codebase-analysis) - Deep dive into code analysis
- [Multi-LLM Support](/docs/features/multi-llm-support) - Deploy to Claude, Gemini, OpenAI
- [Unified Scraping](/docs/features/unified-scraping) - Combine multiple sources
- [CLI Reference: unified](/docs/cli/unified) - Complete CLI documentation
