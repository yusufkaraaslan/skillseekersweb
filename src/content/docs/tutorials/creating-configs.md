---
title: "Tutorial: Creating Custom Configs"
description: Step-by-step tutorial for creating custom configuration files for any documentation website
section: tutorials
order: 5
---

# Tutorial: Creating Custom Configs

Learn how to create custom configuration files for documentation websites not covered by presets.

**Time:** 15 minutes | **Level:** Intermediate | **Result:** Working custom config

---

## Interactive Config Creation

The easiest way to create a config:

```bash
skill-seekers scrape --interactive
```

**Follow the prompts:**
1. Enter base URL
2. Test selectors on sample pages
3. Verify extracted content
4. Save config

## Manual Config Creation

Create `configs/my-framework.json`:

```json
{
  "name": "my-framework",
  "base_url": "https://docs.my-framework.com/",
  "selectors": {
    "content": "article.documentation",
    "title": "h1.page-title",
    "code": "pre code"
  },
  "url_patterns": [
    "^https://docs.my-framework.com/guide/",
    "^https://docs.my-framework.com/api/"
  ],
  "exclude_patterns": [
    "/changelog/",
    "/blog/"
  ],
  "max_pages": 200,
  "rate_limit": 0.5
}
```

## Test Your Config

```bash
# Estimate page count
skill-seekers estimate --config configs/my-framework.json

# Test on first 10 pages
skill-seekers scrape \
  --config configs/my-framework.json \
  --max-pages 10 \
  --output output/test/
```

## Share Your Config

```bash
# Submit to community
skill-seekers submit-config \
  --config configs/my-framework.json \
  --description "My Framework documentation config"
```

**See:** [Config Format Reference](/docs/class-reference/config-format) for all available options.
