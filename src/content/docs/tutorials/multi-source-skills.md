---
title: "Tutorial: Multi-Source Skills"
description: Step-by-step tutorial for combining documentation, GitHub repos, and PDFs into unified comprehensive skills
section: tutorials
order: 4
---

# Tutorial: Multi-Source Skills (Unified Scraping)

Learn how to combine multiple sources (docs + GitHub + PDFs) into one comprehensive skill.

**Time:** 25 minutes | **Level:** Advanced | **Result:** Unified skill with complete knowledge

---

## Why Unified Skills?

**Problem:** Documentation alone doesn't show real usage. Code alone doesn't explain concepts. PDFs have specs but no examples.

**Solution:** Combine all sources into one skill!

## Step 1: Create Unified Config

```json
{
  "name": "django-complete",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.djangoproject.com/en/stable/",
      "max_pages": 500,
      "priority": 1
    },
    {
      "type": "github",
      "repository": "django/django",
      "local_repo_path": "/path/to/django",
      "include_issues": true,
      "priority": 2
    },
    {
      "type": "pdf",
      "directory": "/path/to/django-books/",
      "priority": 3
    }
  ],
  "conflict_resolution": "priority"
}
```

## Step 2: Run Unified Scraper

```bash
skill-seekers unified \
  --config configs/django-complete.json \
  --output output/django-unified/
```

## Step 3: Review Conflict Detection

Skill Seekers automatically detects and resolves duplicate content:

```
⚠️ Conflict Detection Report:
- 23 duplicate pages found
- 18 resolved by priority
- 5 merged (complementary content)
✅ Final skill: 892 unique pages
```

## Step 4: Enhance and Package

```bash
# Enhance
skill-seekers enhance output/django-unified/

# Package
skill-seekers package output/django-unified/ --target claude
```

**Result:** Complete Django knowledge - concepts, examples, patterns, and specifications - all in one skill!

**See:** [Unified Scraping Manual](/docs/manual/scraping/unified) for advanced techniques.
