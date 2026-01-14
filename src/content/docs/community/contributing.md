---
title: Contributing to Skill Seekers
description: Complete guide for contributing to Skill Seekers - branch workflow, development setup, testing, coding standards, and pull request process
section: community
order: 1
---

# Contributing to Skill Seekers

First off, thank you for considering contributing to Skill Seekers! It's people like you that make Skill Seekers such a great tool.

## Table of Contents

- [Branch Workflow](#branch-workflow)
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Branch Workflow

**⚠️ IMPORTANT:** Skill Seekers uses a two-branch workflow.

### Branch Structure

```
main (production)
  ↑
  │ (only maintainer merges)
  │
development (integration) ← default branch for PRs
  ↑
  │ (all contributor PRs go here)
  │
feature branches
```

### Branches

- **`main`** - Production branch
  - Always stable
  - Only receives merges from `development` by maintainers
  - Protected: requires tests + 1 review

- **`development`** - Integration branch
  - **Default branch for all PRs**
  - Active development happens here
  - Protected: requires tests to pass
  - Gets merged to `main` by maintainers

- **Feature branches** - Your work
  - Created from `development`
  - Named descriptively (e.g., `add-github-scraping`)
  - Merged back to `development` via PR

### Workflow Example

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/Skill_Seekers.git
cd Skill_Seekers

# 2. Add upstream
git remote add upstream https://github.com/yusufkaraaslan/Skill_Seekers.git

# 3. Create feature branch from development
git checkout development
git pull upstream development
git checkout -b my-feature

# 4. Make changes, commit, push
git add .
git commit -m "Add my feature"
git push origin my-feature

# 5. Create PR targeting 'development' branch
```

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. Please be respectful and constructive in all interactions.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/yusufkaraaslan/Skill_Seekers/issues) to avoid duplicates.

When creating a bug report, include:
- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, Python version, etc.)
- **Error messages** and stack traces

**Example:**
```markdown
**Bug:** MCP tool fails when config has no categories

**Steps to Reproduce:**
1. Create config with empty categories: `"categories": {}`
2. Run `skill-seekers scrape --config configs/test.json`
3. See error

**Expected:** Should use auto-inferred categories
**Actual:** Crashes with KeyError

**Environment:**
- OS: Ubuntu 22.04
- Python: 3.10.5
- Version: v2.6.0
```

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/yusufkaraaslan/Skill_Seekers/issues).

Include:
- **Clear title** describing the enhancement
- **Detailed description** of the proposed functionality
- **Use cases** that would benefit from this enhancement
- **Examples** of how it would work
- **Alternatives considered**

### Adding New Framework Configs

We welcome new framework configurations! To add one:

1. Create a config file in `configs/`
2. Test it thoroughly with different page counts
3. Submit a PR with:
   - The config file
   - Brief description of the framework
   - Test results (number of pages scraped, categories found)

**Example PR:**
```markdown
**Add Svelte Documentation Config**

Adds configuration for Svelte documentation (https://svelte.dev/docs).

- Config: `configs/svelte.json`
- Tested with max_pages: 100
- Successfully categorized: getting_started, components, api, advanced
- Total pages available: ~150
```

### Pull Requests

We actively welcome your pull requests!

**⚠️ IMPORTANT:** All PRs must target the `development` branch, not `main`.

1. Fork the repo and create your branch from `development`
2. If you've added code, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows our coding standards
6. Issue that pull request to `development` branch!

---

## Development Setup

### Prerequisites

- Python 3.10 or higher (required for MCP integration)
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Skill_Seekers.git
   cd Skill_Seekers
   ```

2. **Install dependencies**
   ```bash
   pip install -e ".[dev,test]"
   ```

3. **Create a feature branch from development**
   ```bash
   git checkout development
   git pull upstream development
   git checkout -b feature/my-awesome-feature
   ```

4. **Make your changes**
   ```bash
   # Edit files...
   ```

5. **Run tests**
   ```bash
   pytest
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add awesome feature"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/my-awesome-feature
   ```

8. **Create a Pull Request**

---

## Pull Request Process

### Before Submitting

- [ ] Tests pass locally (`pytest`)
- [ ] Code follows PEP 8 style guidelines
- [ ] Documentation is updated if needed
- [ ] CHANGELOG.md is updated (if applicable)
- [ ] Commit messages are clear and descriptive

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Review Process

1. A maintainer will review your PR within 3-5 business days
2. Address any feedback or requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release!

---

## Coding Standards

### Python Style Guide

We follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) with some modifications:

- **Line length:** 100 characters (not 79)
- **Indentation:** 4 spaces
- **Quotes:** Double quotes for strings
- **Naming:**
  - Functions/variables: `snake_case`
  - Classes: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`

### Code Organization

```python
# 1. Standard library imports
import os
import sys
from pathlib import Path

# 2. Third-party imports
import requests
from bs4 import BeautifulSoup

# 3. Local application imports
from skill_seekers.cli.utils import open_folder

# 4. Constants
MAX_PAGES = 1000
DEFAULT_RATE_LIMIT = 0.5

# 5. Functions and classes
def my_function():
    """Docstring describing what this function does."""
    pass
```

### Documentation

- All functions should have docstrings
- Use type hints where appropriate
- Add comments for complex logic

```python
def scrape_page(url: str, selectors: dict) -> dict:
    """
    Scrape a single page and extract content.

    Args:
        url: The URL to scrape
        selectors: Dictionary of CSS selectors

    Returns:
        Dictionary containing extracted content

    Raises:
        RequestException: If page cannot be fetched
    """
    pass
```

---

## Testing

### Running Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_mcp_server.py

# Run with coverage
pytest --cov=skill_seekers --cov-report=html
```

### Writing Tests

- Tests go in the `tests/` directory
- Test files should start with `test_`
- Use descriptive test names

```python
def test_config_validation_with_missing_fields():
    """Test that config validation fails when required fields are missing."""
    config = {"name": "test"}  # Missing base_url
    result = validate_config(config)
    assert result is False
```

### Test Coverage

- Aim for >80% code coverage
- Critical paths should have 100% coverage
- Add tests for bug fixes to prevent regressions

---

## Documentation

### Where to Document

- **README.md** - Overview, quick start, basic usage
- **docs/** - Detailed guides and tutorials
- **CHANGELOG.md** - All notable changes
- **Code comments** - Complex logic and non-obvious decisions

### Documentation Style

- Use clear, simple language
- Include code examples
- Add screenshots for UI-related features
- Keep it up to date with code changes

---

## Project Structure

```
Skill_Seekers/
├── src/
│   └── skill_seekers/
│       ├── cli/              # CLI tools
│       │   ├── doc_scraper.py
│       │   ├── package_skill.py
│       │   └── utils.py
│       └── mcp/              # MCP server
│           ├── server.py
│           └── tools/
├── configs/                  # Framework configs
├── docs/                     # Documentation
├── tests/                    # Test suite
└── pyproject.toml           # Project configuration
```

---

## Release Process

Releases are managed by maintainers:

1. Update version in relevant files
2. Update CHANGELOG.md
3. Create and push version tag
4. GitHub Actions will create the release
5. Announce on relevant channels

---

## Questions?

- 💬 [Open a discussion](https://github.com/yusufkaraaslan/Skill_Seekers/discussions)
- 🐛 [Report a bug](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
- 📧 Contact: yusufkaraaslan.yk@pm.me

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for each release
- GitHub contributors page

Thank you for contributing to Skill Seekers! 🎉
