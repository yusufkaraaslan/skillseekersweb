---
title: C3.x Codebase Analysis
description: Deep AST analysis extracting patterns, examples, guides, and configurations from code
section: features
order: 2
---

# C3.x Codebase Analysis

**Available in v2.6.0**

C3.x is Skill Seekers' deep codebase analysis system that uses Abstract Syntax Tree (AST) parsing to extract comprehensive knowledge from source code. It goes far beyond simple scraping to understand how code actually works.

## What is C3.x?

C3.x stands for **Comprehensive Codebase Context Extraction** with 7 analysis modules:

- **C3.1:** Design Pattern Detection
- **C3.2:** Test Example Extraction
- **C3.3:** How-To Guide Generation
- **C3.4:** Configuration Pattern Analysis
- **C3.5:** (Reserved for future use)
- **C3.6:** (Reserved for future use)
- **C3.7:** Architectural Pattern Detection

## Supported Languages

C3.x analyzes code through AST parsing for:

| Language | Parser | Patterns | Examples | Configs |
|----------|--------|----------|----------|---------|
| Python | ast module | ✅ | ✅ | ✅ |
| JavaScript | babel | ✅ | ✅ | ✅ |
| TypeScript | typescript | ✅ | ✅ | ✅ |
| Java | javalang | ✅ | ✅ | ✅ |
| C++ | clang | ✅ | ✅ | ❌ |
| Go | go/parser | ✅ | ✅ | ✅ |
| Rust | syn | ✅ | ✅ | ✅ |

## C3.1: Design Pattern Detection

Automatically detects common design patterns in your codebase.

### Patterns Detected

**Creational Patterns:**
- Singleton
- Factory Method
- Abstract Factory
- Builder
- Prototype

**Structural Patterns:**
- Adapter
- Bridge
- Composite
- Decorator
- Facade
- Proxy

**Behavioral Patterns:**
- Strategy
- Observer
- Command
- Template Method
- Iterator
- State

### Example Output

```json
{
  "pattern": "Strategy",
  "confidence": 0.95,
  "location": "src/providers/oauth_provider.py",
  "line_number": 42,
  "context": {
    "interface": "OAuthProvider",
    "implementations": [
      "GoogleProvider",
      "AzureProvider",
      "GitHubProvider"
    ],
    "usage_count": 206
  },
  "explanation": "Strategy pattern allows runtime selection of OAuth provider implementation"
}
```

### Real-World Results

From analyzing `fastmcp` repository:

- **905 pattern instances** detected
- **206 Strategy patterns** (OAuth providers)
- **142 Factory patterns** (provider creation)
- **87 Decorator patterns** (async tools)

## C3.2: Test Example Extraction

Extracts working code examples from test files.

### Why Test Files?

Test files contain:
- ✅ Complete, working examples
- ✅ Real use cases
- ✅ Expected behavior
- ✅ Edge cases handled

### Example Output

```json
{
  "title": "OAuth with Google Provider",
  "source": "tests/test_oauth.py:23-45",
  "language": "python",
  "code": "def test_google_oauth():\n    provider = GoogleProvider(\n        client_id='test-id',\n        client_secret='test-secret',\n        redirect_uri='http://localhost:8000/callback'\n    )\n    \n    auth_url = provider.get_authorization_url()\n    assert 'accounts.google.com' in auth_url",
  "description": "Configure Google OAuth provider with credentials and generate authorization URL",
  "category": "authentication",
  "complexity": "medium",
  "confidence": 0.92
}
```

### Real-World Results

From `fastmcp` repository:

- **723 test examples** extracted
- Categories: authentication (150), async (80), testing (60)
- All examples verified to compile/run
- Includes setup, execution, and assertions

## C3.3: How-To Guide Generation

Generates step-by-step tutorials from code patterns.

### Generation Process

1. **Pattern Detection** - Find repeated code patterns
2. **Context Analysis** - Understand what pattern does
3. **Example Selection** - Choose best examples
4. **Guide Generation** - Create step-by-step instructions

### Example Output

```markdown
# How to Implement OAuth Authentication

## Overview
This guide shows how to add OAuth authentication using the Strategy pattern.

## Prerequisites
- Provider credentials (client_id, client_secret)
- Redirect URI configured

## Step 1: Create Provider Instance
\`\`\`python
from fastmcp import GoogleProvider

provider = GoogleProvider(
    client_id="your-client-id",
    client_secret="your-secret",
    redirect_uri="http://localhost:8000/callback"
)
\`\`\`

## Step 2: Generate Authorization URL
\`\`\`python
auth_url = provider.get_authorization_url()
# Redirect user to auth_url
\`\`\`

## Step 3: Handle Callback
\`\`\`python
token = provider.exchange_code(request.params['code'])
user_info = provider.get_user_info(token)
\`\`\`

## Common Issues
- **Redirect URI mismatch:** Ensure URI matches exactly in provider console
- **Invalid credentials:** Double-check client_id and client_secret
```

## C3.4: Configuration Pattern Analysis

Analyzes configuration files to understand setup patterns.

### Supported Formats

| Format | Extension | Security Scan | Validation |
|--------|-----------|---------------|------------|
| JSON | `.json` | ✅ | ✅ |
| YAML | `.yml`, `.yaml` | ✅ | ✅ |
| TOML | `.toml` | ✅ | ✅ |
| INI | `.ini`, `.cfg` | ✅ | ✅ |
| ENV | `.env` | ✅ | ✅ |
| XML | `.xml` | ✅ | ✅ |
| Properties | `.properties` | ✅ | ✅ |
| HCL | `.hcl`, `.tf` | ✅ | ✅ |
| Dotenv | `.env.*` | ✅ | ✅ |

### AI-Powered Security Analysis

Automatically scans for:

- ❌ Hardcoded secrets
- ❌ Exposed API keys
- ❌ Insecure defaults
- ❌ Missing validation
- ❌ Weak encryption settings

### Example Output

```json
{
  "file": "config/settings.json",
  "format": "json",
  "structure": {
    "database": {
      "host": "localhost",
      "port": 5432,
      "name": "myapp_db"
    },
    "oauth": {
      "providers": ["google", "github"],
      "redirect_uri": "/auth/callback"
    }
  },
  "security_issues": [
    {
      "severity": "high",
      "issue": "Hardcoded database password",
      "line": 5,
      "recommendation": "Use environment variables"
    }
  ],
  "best_practices": [
    {
      "category": "security",
      "suggestion": "Add secrets rotation policy"
    }
  ]
}
```

## C3.7: Architectural Pattern Detection

Identifies high-level architecture patterns.

### Architectures Detected

| Pattern | Description | Indicators |
|---------|-------------|------------|
| **Layered** | Horizontal layers (presentation, business, data) | Clear separation by folder structure |
| **Microservices** | Independent services | Multiple entry points, separate configs |
| **Service Layer** | Business logic in services | Service classes between controllers and models |
| **Repository** | Data access abstraction | Repository pattern for database |
| **MVC** | Model-View-Controller | Clear separation of concerns |
| **MVVM** | Model-View-ViewModel | ViewModels mediating between views and models |
| **Hexagonal** | Ports and adapters | Core domain separated from infrastructure |
| **Event-Driven** | Asynchronous messaging | Event emitters and listeners |

### Example Output

```json
{
  "primary_pattern": "Service Layer",
  "confidence": 0.89,
  "indicators": {
    "service_classes": 47,
    "repository_classes": 23,
    "controller_classes": 31,
    "pattern_consistency": 0.92
  },
  "architecture_description": "Application follows Service Layer pattern with 47 service classes handling business logic, 23 repositories for data access, and 31 controllers for HTTP handling.",
  "recommendations": [
    "Consider extracting common service logic into base class",
    "Add service interface layer for better testing"
  ]
}
```

## Usage

### Basic C3.x Analysis

```bash
skill-seekers unified \
  --source /path/to/project \
  --depth c3x \
  --output-dir output/my-project
```

### With GitHub Repository

```bash
skill-seekers unified \
  --repo-url https://github.com/fastapi/fastapi \
  --depth c3x \
  --fetch-github-metadata \
  --output-dir output/fastapi
```

### Configuration File

```json
{
  "name": "my-framework",
  "sources": [
    {
      "type": "codebase",
      "source": "https://github.com/org/my-framework",
      "analysis_depth": "c3x",
      "c3x_modules": {
        "patterns": true,
        "examples": true,
        "guides": true,
        "configs": true,
        "architecture": true
      }
    }
  ]
}
```

### Selective Module Analysis

Enable only specific modules:

```json
{
  "c3x_modules": {
    "patterns": true,    // C3.1
    "examples": true,    // C3.2
    "guides": false,     // C3.3 (skip)
    "configs": true,     // C3.4
    "architecture": true // C3.7
  }
}
```

## Performance

### Analysis Time

| Repo Size | Files | Basic | C3.x Full |
|-----------|-------|-------|-----------|
| Small | < 100 | 10s | 2-5 min |
| Medium | 100-500 | 30s | 10-20 min |
| Large | 500-1000 | 1 min | 20-40 min |
| Very Large | 1000+ | 2 min | 40-60 min |

### Caching

C3.x uses intelligent caching:

- **File-level cache** - Reanalyze only changed files
- **Module cache** - Skip unchanged modules
- **50% faster** on re-runs

Example:
```bash
# First run: 30 minutes
skill-seekers unified --source /my/project --depth c3x

# After changing 5 files: 3 minutes
skill-seekers unified --source /my/project --depth c3x
```

## Output Structure

```
output/my-framework_unified_data/
├── c3_analysis_temp/
│   ├── patterns/
│   │   └── detected_patterns.json        (C3.1)
│   ├── test_examples/
│   │   └── test_examples.json            (C3.2)
│   ├── how_to_guides/
│   │   └── guides.json                   (C3.3)
│   ├── config_patterns/
│   │   └── config_patterns.json          (C3.4)
│   └── architecture/
│       └── architectural_patterns.json    (C3.7)
│
├── references/
│   ├── patterns.md
│   ├── examples.md
│   ├── guides.md
│   └── architecture.md
│
└── SKILL.md                               (Final skill file)
```

## AI Enhancement

After C3.x analysis, you can enhance with AI:

```bash
skill-seekers enhance \
  --input output/my-framework_unified_data \
  --ai-provider anthropic \
  --enhancement-mode comprehensive
```

**What AI adds:**
- Better pattern explanations
- More context for examples
- Improved guide formatting
- Best practices recommendations
- Security advisory details

## Best Practices

### For Small Projects (< 100 files)

```json
{
  "analysis_depth": "c3x",
  "c3x_modules": {
    "patterns": true,
    "examples": true,
    "guides": true,
    "configs": true,
    "architecture": true
  }
}
```

**Time:** 2-5 minutes

### For Large Projects (1000+ files)

```json
{
  "analysis_depth": "c3x",
  "c3x_modules": {
    "patterns": true,      // Essential
    "examples": true,      // Essential
    "guides": false,       // Skip (time-consuming)
    "configs": true,       // Essential
    "architecture": true   // Quick, keep it
  },
  "max_examples_per_category": 50  // Limit output
}
```

**Time:** 20-30 minutes

### For Quick Overview

Use `basic` mode instead:

```bash
skill-seekers unified \
  --source /my/project \
  --depth basic
```

**Time:** 1-2 minutes
**Gets:** File structure, imports, entry points (no C3.x)

## Troubleshooting

### "Analysis taking too long"

- Use `--depth basic` for quick overview
- Disable C3.3 (guides) module
- Limit examples: `--max-examples-per-category 50`
- Exclude test folders: `--exclude-dirs tests,docs`

### "Not enough patterns detected"

- Check language support (Python, JS, TS best supported)
- Ensure code follows standard patterns
- Lower confidence threshold: `--min-pattern-confidence 0.7`

### "Missing examples"

- Ensure test files are included (don't exclude `tests/`)
- Check test naming conventions (`test_*.py`, `*.test.js`)
- Lower example confidence: `--min-example-confidence 0.8`

## Next Steps

- [Three-Stream Architecture](/docs/features/three-stream-architecture) - Combine C3.x with GitHub insights
- [Multi-LLM Support](/docs/features/multi-llm-support) - Deploy to Claude, Gemini, OpenAI
- [AI Enhancement](/docs/features/ai-enhancement) - Improve C3.x output with AI
- [CLI Reference: unified](/docs/cli/unified) - Complete CLI documentation
