---
title: github - Repository Scraping
description: Scrape GitHub repositories with deep code analysis, API extraction, and conflict detection between docs and code
section: cli
order: 3
---

# github - Repository Scraping

Scrape GitHub repositories and analyze code with deep AST parsing.

## Basic Usage

```bash
skill-seekers github [OPTIONS]
```

## Quick Examples

```bash
# Basic repository scraping
skill-seekers github --repo facebook/react

# Using a config file
skill-seekers github --config configs/react_github.json

# With authentication (higher rate limits)
export GITHUB_TOKEN=ghp_your_token_here
skill-seekers github --repo facebook/react

# Include issues and changelog
skill-seekers github --repo django/django \
    --include-issues \
    --max-issues 100 \
    --include-changelog \
    --include-releases
```

## Options

### Required

- `--repo OWNER/REPO` - GitHub repository (e.g., facebook/react)
- OR `--config CONFIG` - Load configuration from file

### Optional

- `--include-issues` - Extract GitHub Issues
- `--max-issues N` - Limit issue count (default: 50)
- `--include-changelog` - Extract CHANGELOG.md
- `--include-releases` - Extract GitHub Releases
- `--code-analysis-depth DEPTH` - Analysis depth: surface, medium, deep
- `--output DIR` - Output directory

### Authentication

```bash
# Set GitHub token for higher rate limits
export GITHUB_TOKEN=ghp_your_token_here
```

## Features

### Code Analysis

- ✅ **Deep AST Parsing** - Python, JavaScript, TypeScript, Java, C++, Go
- ✅ **API Extraction** - Functions, classes, methods with parameters
- ✅ **Type Detection** - Automatic type inference
- ✅ **Conflict Detection** - Compare docs vs code implementation

### Repository Metadata

- ✅ **README** - Automatic extraction
- ✅ **File Tree** - Complete directory structure
- ✅ **Language Breakdown** - By file count and bytes
- ✅ **Stars/Forks** - Repository statistics

### GitHub Features

- ✅ **Issues & PRs** - Open/closed with labels
- ✅ **CHANGELOG** - Version history
- ✅ **Releases** - GitHub releases with notes
- ✅ **Milestones** - Project planning

## Analysis Depths

### Surface (Fast - 1-2 min)

```bash
skill-seekers github --repo facebook/react --code-analysis-depth surface
```

- File structure
- Import relationships
- Entry points
- Basic metadata

### Medium (Standard - 5-10 min)

```bash
skill-seekers github --repo facebook/react --code-analysis-depth medium
```

- Everything from surface
- Function/class signatures
- API documentation
- Common patterns

### Deep (Comprehensive - 20-60 min)

```bash
skill-seekers github --repo facebook/react --code-analysis-depth deep
```

- Everything from medium
- Design pattern detection (C3.1)
- Test example extraction (C3.2)
- How-to guide generation (C3.3)
- Configuration analysis (C3.4)
- Architectural patterns (C3.7)

## Output Structure

```
output/
└── {repo-name}/
    ├── SKILL.md
    ├── references/
    │   ├── index.md
    │   ├── api_reference.md
    │   ├── code_examples.md
    │   └── github_issues.md
    └── c3_analysis_temp/    # C3.x analysis data
        ├── patterns/
        ├── test_examples/
        └── config_patterns/
```

## Advanced Examples

### With All Features

```bash
export GITHUB_TOKEN=ghp_...

skill-seekers github --repo fastapi/fastapi \
    --code-analysis-depth deep \
    --include-issues \
    --max-issues 200 \
    --include-changelog \
    --include-releases \
    --output output/fastapi
```

### Config File

```json
{
  "name": "fastapi",
  "type": "github",
  "repo": "fastapi/fastapi",
  "include_code": true,
  "code_analysis_depth": "deep",
  "include_issues": true,
  "max_issues": 100,
  "include_changelog": true,
  "include_releases": true
}
```

## Time Estimates

- Surface analysis: 1-2 minutes
- Medium analysis: 5-10 minutes
- Deep analysis (C3.x): 20-60 minutes

## Next Steps

- [Unified Command](/docs/cli/unified) - Multi-source scraping
- [C3.x Analysis](/docs/features/c3x-codebase-analysis) - Deep code analysis
- [Three-Stream Architecture](/docs/features/three-stream-architecture) - Advanced features
