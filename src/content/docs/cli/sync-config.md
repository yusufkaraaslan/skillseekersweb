---
title: sync-config — URL Synchronization
description: The sync-config command crawls documentation sites and syncs URL lists in your config files
section: cli
order: 11
---

# `skill-seekers sync-config`

The `sync-config` command (v3.3.0) crawls a documentation site's navigation, diffs discovered URLs against a config's `start_urls`, and optionally writes the updated list back.

## Usage

```bash
skill-seekers sync-config --config <path> [--apply] [--depth <n>] [--max-pages <n>]
```

## How It Works

1. BFS link discovery starting from config's base URL
2. Configurable depth (default: 2) and max-pages
3. Respects `url_patterns.include/exclude` from config
4. Supports optional `nav_seed_urls` config field
5. Works with both unified (sources array) and legacy flat config formats

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--config <path>` | Path to config file | Required |
| `--apply` | Write updated URLs back to config | Dry-run only |
| `--depth <n>` | BFS crawl depth | 2 |
| `--max-pages <n>` | Maximum pages to crawl | 100 |
| `--rate-limit <n>` | Requests per second | 2 |

## Example

```bash
# Preview URL changes (dry-run)
skill-seekers sync-config --config configs/react.json

# Apply changes to config file
skill-seekers sync-config --config configs/react.json --apply
```

Also available as the `sync_config` MCP tool.
