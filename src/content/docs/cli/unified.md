---
title: unified - Multi-Source Scraping
description: Combine documentation websites, GitHub repositories, and PDFs into a single unified skill with automatic conflict detection
section: cli
order: 5
---

# unified - Multi-Source Scraping

Combine multiple sources (docs + GitHub + PDF) into one unified skill with conflict detection.

## Basic Usage

```bash
skill-seekers unified [OPTIONS]
```

## Quick Examples

```bash
# Use existing unified configs
skill-seekers unified --config configs/react_unified.json
skill-seekers unified --config configs/django_unified.json
skill-seekers unified --config configs/fastapi_unified.json

# Analyze GitHub repo with three-stream architecture
skill-seekers unified \
    --repo-url https://github.com/facebook/react \
    --depth c3x \
    --fetch-github-metadata
```

## Why Use Unified Scraping?

**The Problem:** Documentation and code often drift apart. Docs might be outdated, missing features, or documenting removed features.

**The Solution:** Unified scraping combines multiple sources and automatically detects conflicts.

## Three-Stream Architecture

**New in v2.6.0** - GitHub repos are split into three streams:

1. **Stream 1: Code** - Deep C3.x analysis (patterns, examples, architecture)
2. **Stream 2: Docs** - Repository documentation (README, docs/*.md)
3. **Stream 3: Insights** - GitHub issues (common problems + solutions)

```bash
skill-seekers unified \
    --repo-url https://github.com/fastapi/fastapi \
    --depth c3x \
    --fetch-github-metadata \
    --output-dir output/fastapi
```

## Config File Format

```json
{
  "name": "myframework",
  "description": "Complete framework knowledge from docs + code",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.myframework.com/",
      "extract_api": true,
      "max_pages": 200
    },
    {
      "type": "github",
      "repo": "owner/myframework",
      "include_code": true,
      "code_analysis_depth": "deep"
    },
    {
      "type": "pdf",
      "pdf_path": "docs/manual.pdf",
      "extract_tables": true
    }
  ]
}
```

## Options

### Required (choose one)

- `--config CONFIG` - Load unified configuration
- `--repo-url URL` - GitHub repository URL

### For GitHub Repos

- `--depth DEPTH` - Analysis depth: `basic` or `c3x`
- `--fetch-github-metadata` - Include issues, stars, forks
- `--output-dir DIR` - Output directory

### Config-Based

- `--merge-mode MODE` - Conflict resolution: `rule-based` or `ai-powered`

## Analysis Depths

### Basic (Fast - 1-2 min)

```bash
skill-seekers unified \
    --repo-url https://github.com/fastapi/fastapi \
    --depth basic
```

- File structure
- Import relationships
- Entry points
- GitHub metadata (if --fetch-github-metadata)

### C3.x (Comprehensive - 20-60 min)

```bash
skill-seekers unified \
    --repo-url https://github.com/fastapi/fastapi \
    --depth c3x \
    --fetch-github-metadata
```

- Everything from basic
- **C3.1:** Design pattern detection
- **C3.2:** Test example extraction
- **C3.3:** How-to guide generation
- **C3.4:** Configuration analysis
- **C3.7:** Architectural patterns
- GitHub issues with solutions

## Conflict Detection

Unified scraping automatically detects 4 types of conflicts:

### 1. Missing in Code (🔴 High Priority)

```markdown
#### `initialize_auth(config: dict)`

🔴 **Missing in code**: Documented but not found in implementation

**Documentation:**
- Purpose: Initialize authentication system
- Parameters: config (dict) - Auth configuration
```

### 2. Missing in Docs (🟡 Medium Priority)

```markdown
#### `initialize_auth(config: dict, timeout: int = 30)`

🟡 **Missing in docs**: Implemented but not documented

**Implementation:**
- File: src/auth.py:45
- Has additional parameter: timeout (int) = 30
```

### 3. Signature Mismatch (⚠️ Warning)

```markdown
#### `move_local_x(delta: float)`

⚠️ **Conflict**: Documentation signature differs from implementation

**Documentation says:**
```python
def move_local_x(delta: float)
```

**Code implementation:**
```python
def move_local_x(delta: float, snap: bool = False) -> None
```
```

### 4. Description Mismatch (ℹ️ Info)

```markdown
#### `get_user_data()`

ℹ️ **Conflict**: Different descriptions

**Documentation:** "Returns all user profile data"
**Code docstring:** "Returns user data excluding sensitive fields"
```

## Example Configs

### React (Docs + GitHub)

```json
{
  "name": "react",
  "description": "React docs + GitHub repo",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://react.dev/",
      "max_pages": 300
    },
    {
      "type": "github",
      "repo": "facebook/react",
      "code_analysis_depth": "deep"
    }
  ]
}
```

### FastAPI (Docs + GitHub + PDF)

```json
{
  "name": "fastapi",
  "description": "Complete FastAPI knowledge",
  "merge_mode": "ai-powered",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://fastapi.tiangolo.com/"
    },
    {
      "type": "github",
      "repo": "fastapi/fastapi",
      "include_issues": true,
      "max_issues": 100
    },
    {
      "type": "pdf",
      "pdf_path": "docs/fastapi_guide.pdf"
    }
  ]
}
```

## Output Structure

```
output/
└── {name}_unified_data/
    ├── SKILL.md                  # Merged content with conflicts marked
    ├── references/
    │   ├── index.md
    │   ├── from_docs.md         # Documentation content
    │   ├── from_code.md         # Code analysis
    │   ├── from_pdf.md          # PDF content
    │   └── conflicts.md         # Conflict report
    └── c3_analysis_temp/        # C3.x analysis data
```

## Time Estimates

| Configuration | Time |
|---------------|------|
| Docs only | 20-40 min |
| Docs + GitHub (basic) | 25-45 min |
| Docs + GitHub (c3x) | 40-80 min |
| Docs + GitHub (c3x) + PDF | 50-90 min |

## Next Steps

- [Three-Stream Architecture](/docs/manual/advanced/three-stream-architecture) - Learn about the architecture
- [C3.x Analysis](/docs/manual/codebase-analysis/c3x-codebase-analysis) - Deep code analysis
- [Package Command](/docs/cli/package) - Package unified skills
