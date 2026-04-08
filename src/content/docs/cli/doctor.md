---
title: doctor — Diagnostics
description: The doctor command runs 8 diagnostic checks to verify your Skill Seekers installation
section: cli
order: 10
---

# `skill-seekers doctor`

The `doctor` command (v3.5.0) runs 8 diagnostic checks to verify your installation is working correctly.

## Usage

```bash
skill-seekers doctor [--verbose]
```

## Checks Performed

| # | Check | What it verifies |
|---|-------|------------------|
| 1 | Python version | Python 3.10+ is installed |
| 2 | Package install | skill-seekers is properly installed |
| 3 | Git | Git is available for GitHub operations |
| 4 | Core dependencies | Required packages are importable |
| 5 | Optional dependencies | Browser, video, notebook, etc. extras |
| 6 | API keys | Anthropic, OpenAI, Gemini, Kimi keys configured |
| 7 | MCP server | MCP server is functional |
| 8 | Output directory | Output directory is writable |

Each check reports **pass**, **warn**, or **fail** status.

## Example Output

```
$ skill-seekers doctor
[PASS] Python version: 3.12.0
[PASS] Package: skill-seekers 3.5.0
[PASS] Git: available
[PASS] Core dependencies: all OK
[WARN] Optional: browser not installed (pip install "skill-seekers[browser]")
[PASS] API keys: ANTHROPIC_API_KEY set
[PASS] MCP server: functional
[PASS] Output directory: writable

7/8 checks passed, 1 warning
```

Use `--verbose` for detailed output including dependency versions and paths.
