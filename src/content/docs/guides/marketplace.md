---
title: Marketplace Publishing
description: Publish skills to Claude Code plugin marketplace repos and manage config sources
section: guides
order: 6
---

# Marketplace Publishing

Skill Seekers v3.5.0 introduced marketplace and config publishing capabilities, enabling you to share skills and configs with the community.

## MarketplacePublisher

Publish skills to Claude Code plugin marketplace repositories:

```bash
# Via MCP tool
# The push_config MCP tool handles automated config publishing
```

### How It Works

1. **MarketplaceManager** — Register and manage marketplace repository URLs
2. **MarketplacePublisher** — Clone marketplace repo, add skill files, commit and push
3. **ConfigPublisher** — Push configs to registered config source repos

### Security

- Uses targeted `git add` (not `git add -A`) to prevent accidental inclusions
- Clears auth tokens from cached `.git/config` after clone
- Path traversal validation for config names

## Config Sources

Share configs via the community config repository at [skill-seekers-configs](https://github.com/yusufkaraaslan/skill-seekers-configs).

You can also:
- Submit configs via the [website gallery](/configs)
- Push configs to any registered source repo
- Use the `push_config` MCP tool for automated publishing
