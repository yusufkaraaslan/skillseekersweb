---
title: Migration Guide
description: Migrate from v2.x to v3.0.0. Breaking changes and upgrade steps.
section: guides
order: 3
---

# Migration Guide

Migrate from **v2.x to v3.0.0**.

## Overview

v3.0.0 is **backward compatible** for basic usage. All v2.x configs and commands work unchanged.

## What's New

| Feature | v2.x | v3.0.0 |
|---------|------|--------|
| Output formats | 4 | 16 |
| MCP tools | 9 | 26 |
| Input sources | 3 | 4 (+local codebases) |
| Cloud storage | ❌ | ✅ S3/GCS/Azure |
| Multi-agent | ❌ | ✅ Claude/Copilot/Codex |
| Godot support | ❌ | ✅ Signal flow analysis |
| Tests | 700+ | 1,852 |

## Upgrade Steps

### 1. Update Package

```bash
pip install --upgrade skill-seekers
```

### 2. Verify Installation

```bash
skill-seekers --version
# Should show 3.0.0
```

### 3. Test Existing Configs

```bash
# Your v2.x configs still work
skill-seekers scrape --config configs/react.json
```

## New Features to Try

### Local Codebase Analysis

```bash
# New in v3.0.0
skill-seekers analyze --directory ./my-project --format langchain
```

### Cloud Upload

```bash
# New in v3.0.0
skill-seekers cloud upload output/react/ --provider s3 --bucket my-bucket
```

### Multi-Agent Support

```bash
# New in v3.0.0
skill-seekers enhance --agent copilot
```

## Deprecated Features

None! v3.0.0 only adds features.

## Troubleshooting

### Issue: Command not found

```bash
# Reinstall
pip uninstall skill-seekers
pip install skill-seekers
```

### Issue: Config validation fails

```bash
# Update config schema
skill-seekers config --wizard
```

## Next Steps

- [Explore New Integrations](/docs/integrations) - 16 output formats
- [Try Cloud Storage](/docs/deployments/production) - S3/GCS/Azure
