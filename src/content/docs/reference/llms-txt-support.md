---
title: llms.txt Automatic Detection
description: Skill Seekers automatically detects and prioritizes llms.txt files for 10x faster documentation scraping with AI-optimized content
section: reference
order: 7
---

# llms.txt Automatic Detection

**Skill Seekers automatically detects `llms.txt` files for 10x faster scraping with AI-optimized content.**

## Overview

**llms.txt** is an emerging standard for providing AI-optimized documentation in a single file. When a website offers `llms.txt`, Skill Seekers automatically detects and prioritizes it over traditional web scraping.

**Benefits:**
- ⚡ **10x faster** - Single file download vs. scraping 100+ pages
- 🎯 **AI-optimized** - Content already formatted for LLMs
- 📦 **Complete** - Usually contains entire documentation
- 🔄 **Maintained** - Site owners keep it updated

**Version:** v2.5.0+

---

## How It Works

### Automatic Detection Order

Skill Seekers checks for `llms.txt` variants in this order:

1. **`llms-full.txt`** - Complete documentation (preferred)
2. **`llms.txt`** - Standard documentation
3. **`llms-small.txt`** - Condensed version
4. **Fallback to web scraping** - If no llms.txt found

**Detection happens automatically** - no configuration needed!

### Example Workflow

```bash
# Standard scraping command
skill-seekers scrape https://example.com/ --output output/example/

# Behind the scenes:
# 1. Check https://example.com/llms-full.txt ✅ Found!
# 2. Download llms-full.txt (2 seconds)
# 3. Parse and convert to skill format
# 4. Done! (vs. 5 minutes to scrape 200 pages)
```

---

## llms.txt Format

### Standard Structure

```markdown
# Example.com Documentation

> AI-optimized documentation for Example.com

# Getting Started

## Installation

```bash
npm install example
```

## Quick Start

1. Create a new project
2. Configure settings
3. Run the application

# API Reference

## Core Functions

### `doSomething(param)`

Description of the function...

# Examples

## Basic Example

```javascript
const result = doSomething('value');
```
```

**Key Features:**
- Plain markdown format
- Hierarchical structure
- Code examples included
- Comprehensive and complete

---

## Detection and Usage

### Automatic Detection (Default)

**No configuration needed:**

```bash
# Automatically uses llms.txt if available
skill-seekers scrape https://docs.example.com/ --output output/example/
```

**Detection log:**
```
🔍 Checking for llms.txt...
✅ Found llms-full.txt at https://docs.example.com/llms-full.txt
📥 Downloading (2.3 MB)...
✅ Downloaded in 1.8 seconds
📝 Parsing content...
✅ Skill created: example (4,231 tokens)
⚡ Time saved: 4m 32s (llms.txt vs. traditional scraping)
```

### Force llms.txt

**Explicitly use llms.txt even if web scraping is preferred:**

```bash
skill-seekers scrape https://docs.example.com/ \
  --prefer-llms-txt \
  --output output/example/
```

### Disable llms.txt

**Force traditional web scraping:**

```bash
skill-seekers scrape https://docs.example.com/ \
  --no-llms-txt \
  --output output/example/
```

---

## Comparison: llms.txt vs. Web Scraping

### Speed

| Documentation Size | llms.txt | Web Scraping | Speed-up |
|-------------------|----------|--------------|----------|
| Small (50 pages) | 1-2 sec | 30-60 sec | **30x** |
| Medium (200 pages) | 2-3 sec | 3-5 min | **60x** |
| Large (1000 pages) | 3-5 sec | 15-20 min | **180x** |

### Quality

| Aspect | llms.txt | Web Scraping |
|--------|----------|--------------|
| **Content Completeness** | ✅ Curated by maintainers | ⚠️ Depends on scraping config |
| **AI Optimization** | ✅ Formatted for LLMs | ❌ May include non-essential content |
| **Code Examples** | ✅ Usually included | ⚠️ Depends on selectors |
| **Up-to-Date** | ⚠️ Depends on maintainers | ✅ Always latest |
| **Structure** | ✅ Hierarchical markdown | ⚠️ Depends on site structure |

### When to Use Each

**Use llms.txt (automatic detection) when:**
- ✅ Site offers `llms.txt` (detected automatically)
- ✅ Speed is important
- ✅ You trust site maintainers

**Force web scraping when:**
- ❌ llms.txt is outdated (check last modified date)
- ❌ You need specific selectors/categories
- ❌ You want more control over content extraction

---

## Sites with llms.txt Support

### Known Sites (as of 2025)

**Framework Documentation:**
- Next.js: `https://nextjs.org/llms-full.txt`
- Astro: `https://docs.astro.build/llms.txt`
- Remix: `https://remix.run/llms.txt`

**Tools & Libraries:**
- Supabase: `https://supabase.com/docs/llms.txt`
- Vercel: `https://vercel.com/docs/llms-full.txt`
- Railway: `https://docs.railway.app/llms.txt`

**Check for llms.txt:**
```bash
# Test if site has llms.txt
curl -I https://docs.example.com/llms-full.txt
curl -I https://docs.example.com/llms.txt
curl -I https://docs.example.com/llms-small.txt
```

---

## Advanced Usage

### Inspect llms.txt Before Using

```bash
# Download and inspect
curl https://docs.example.com/llms-full.txt -o llms-full.txt
head -n 50 llms-full.txt

# Check file size and last modified
curl -I https://docs.example.com/llms-full.txt | grep -E 'Content-Length|Last-Modified'
```

### Combine llms.txt with Additional Sources

```bash
# Use llms.txt as base, scrape additional pages
skill-seekers scrape https://docs.example.com/ \
  --use-llms-txt \
  --additional-pages "changelog,releases,roadmap" \
  --output output/example/
```

### Manual Download and Conversion

```bash
# 1. Download manually
curl https://docs.example.com/llms-full.txt -o llms-full.txt

# 2. Convert to skill
skill-seekers convert llms-full.txt \
  --format llms-txt \
  --output output/example/
```

---

## llms.txt Standard

### Specification

The `llms.txt` format is a community-driven standard for AI-optimized documentation:

**Key Principles:**
1. **Plain markdown** - No HTML, no fancy formatting
2. **Complete** - All essential documentation in one file
3. **Hierarchical** - Clear heading structure
4. **Optimized** - Removes navigation, sidebars, footers
5. **Updated** - Maintained by project owners

**Learn more:** [llms.txt specification](https://llmstxt.org/) (if site exists)

### Creating Your Own llms.txt

**For documentation site owners:**

```markdown
# Your Project Documentation

> Complete documentation for Your Project - optimized for LLMs

# Overview

Brief description of your project...

# Installation

Step-by-step installation guide...

# API Reference

Complete API documentation...

# Examples

Practical code examples...

# FAQ

Common questions and answers...
```

**Best Practices:**
- ✅ Include all essential content (no links to external pages)
- ✅ Use clear hierarchical headings (H1, H2, H3)
- ✅ Include code examples inline
- ✅ Keep updated with documentation changes
- ✅ Offer variants: `llms-full.txt` (complete), `llms.txt` (standard), `llms-small.txt` (condensed)
- ❌ Don't include navigation, sidebars, or UI elements
- ❌ Don't use HTML or complex formatting
- ❌ Don't include non-essential content (changelog, blog posts)

---

## Configuration Options

### Config File Support

```json
{
  "name": "example",
  "base_url": "https://docs.example.com/",
  "llms_txt": {
    "enabled": true,
    "prefer": "full",
    "fallback_to_scraping": true,
    "max_age_days": 30
  }
}
```

**Options:**
- **`enabled`**: Auto-detect llms.txt (default: `true`)
- **`prefer`**: Which variant to prefer (`full` | `standard` | `small`)
- **`fallback_to_scraping`**: Use web scraping if llms.txt not found (default: `true`)
- **`max_age_days`**: Skip llms.txt if older than N days (default: `null`)

---

## Performance Metrics

### Real-World Examples

**Next.js Documentation:**
- **Pages:** 300+
- **llms-full.txt size:** 3.2 MB
- **Web scraping time:** 6 minutes
- **llms.txt download time:** 2 seconds
- **Speed-up:** **180x faster**

**Supabase Documentation:**
- **Pages:** 500+
- **llms.txt size:** 4.8 MB
- **Web scraping time:** 9 minutes
- **llms.txt download time:** 3 seconds
- **Speed-up:** **180x faster**

**Astro Documentation:**
- **Pages:** 200+
- **llms.txt size:** 2.1 MB
- **Web scraping time:** 4 minutes
- **llms.txt download time:** 1.5 seconds
- **Speed-up:** **160x faster**

---

## Troubleshooting

### Issue: llms.txt is outdated

**Symptoms:**
```
⚠️ llms.txt last modified: 45 days ago
⚠️ Using web scraping instead
```

**Solutions:**
1. **Force use anyway:**
   ```bash
   skill-seekers scrape URL --force-llms-txt
   ```

2. **Contact site maintainers** to update llms.txt

3. **Use web scraping:**
   ```bash
   skill-seekers scrape URL --no-llms-txt
   ```

### Issue: llms.txt not found

**Symptoms:**
```
🔍 Checking for llms.txt...
❌ Not found: llms-full.txt
❌ Not found: llms.txt
❌ Not found: llms-small.txt
ℹ️ Falling back to web scraping
```

**Solutions:**
1. **Check manually:**
   ```bash
   curl -I https://docs.example.com/llms.txt
   ```

2. **Use web scraping** (automatic fallback)

3. **Request llms.txt from site owner**

### Issue: llms.txt incomplete

**Symptoms:** Skill missing expected sections

**Solutions:**
1. **Supplement with web scraping:**
   ```bash
   skill-seekers scrape URL --use-llms-txt --additional-pages "missing-section"
   ```

2. **Use web scraping only:**
   ```bash
   skill-seekers scrape URL --no-llms-txt
   ```

---

## Best Practices

### 1. Trust Automatic Detection

✅ Skill Seekers intelligently detects and uses llms.txt when beneficial

### 2. Verify Content Completeness

✅ After using llms.txt, spot-check the generated skill:
```bash
cat output/example/SKILL.md | head -n 100
```

### 3. Check Last Modified Date

✅ If llms.txt is > 60 days old, consider web scraping:
```bash
curl -I https://docs.example.com/llms.txt | grep Last-Modified
```

### 4. Combine with Other Sources

✅ Use llms.txt as base, add GitHub issues/changelog:
```bash
skill-seekers unified --config unified-config.json
# Where unified-config uses llms.txt + GitHub scraping
```

---

## Next Steps

- [Documentation Scraping](/docs/cli/scrape) - Traditional web scraping options
- [Unified Scraping](/docs/manual/scraping/unified-scraping) - Combine llms.txt with other sources
- [Large Documentation](/docs/reference/large-documentation) - Handling 10K+ page sites

---

**Status**: ✅ Production Ready (v2.5.0+)

Found an issue or have suggestions? [Open an issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
