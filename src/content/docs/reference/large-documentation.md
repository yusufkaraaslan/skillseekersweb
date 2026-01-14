---
title: Large Documentation Handling
description: Complete guide for handling documentation sites with 10,000+ pages using split strategies, parallel scraping, checkpointing, and router patterns
section: reference
order: 6
---

# Large Documentation Handling

**Strategies for scraping and managing documentation sites with 10,000+ pages.**

## Overview

Large documentation sites (10K+ pages) present unique challenges:
- **Token limits** - Single skill exceeds Claude/Gemini/OpenAI context windows
- **Scraping time** - 10K pages × 1 second = 3+ hours
- **Memory usage** - Storing 10K pages in memory
- **Skill usability** - Too much content makes skills slow and unfocused

**Solutions:**
1. **Split strategies** - Divide into category-based sub-skills
2. **Router pattern** - Intelligently route to right sub-skill
3. **Parallel scraping** - Multi-worker concurrent scraping
4. **Checkpointing** - Resume interrupted scrapes
5. **Size-based splitting** - Auto-split by token budget

**Version:** v2.0.0+

---

## When to Use Large Doc Strategies

### Size Thresholds

| Pages | Recommendation | Strategy |
|-------|----------------|----------|
| < 500 | Single skill | Standard scraping |
| 500-2000 | Single skill + optimization | Async scraping, selective content |
| 2000-5000 | Consider splitting | Category-based split |
| 5000-10000 | Split strongly recommended | Router + sub-skills |
| 10000+ | Must split | Router + parallel scraping |

### Indicators You Need Splitting

- ✅ Documentation organized into clear categories (API, Guides, Tutorials, etc.)
- ✅ Estimated token count > 100K
- ✅ Scraping estimated to take > 1 hour
- ✅ Different sections serve different use cases

---

## Split Strategies

### 1. Category-Based Split (Recommended)

**Best for:** Documentation with clear categorical organization

**How it works:** Scrape each category into separate sub-skill, create router

**Example: Kubernetes Docs**

```bash
# 1. Split by category
skill-seekers scrape --config configs/k8s-concepts.json --output output/k8s-concepts/
skill-seekers scrape --config configs/k8s-tasks.json --output output/k8s-tasks/
skill-seekers scrape --config configs/k8s-api.json --output output/k8s-api/

# 2. Create router
skill-seekers router \
  output/k8s-concepts/ \
  output/k8s-tasks/ \
  output/k8s-api/ \
  --output output/k8s-router/ \
  --name kubernetes-complete

# 3. Package
skill-seekers package output/k8s-router/ --include-subskills
```

**Config example (k8s-concepts.json):**
```json
{
  "name": "kubernetes-concepts",
  "base_url": "https://kubernetes.io/docs/concepts/",
  "url_patterns": {
    "include": ["concepts"],
    "exclude": []
  },
  "max_pages": 500
}
```

### 2. Size-Based Split (Automatic)

**Best for:** Unorganized docs or uniform structure

**How it works:** Auto-split when token budget exceeded

```bash
# Automatic splitting at 50K tokens per skill
skill-seekers scrape --config configs/large-docs.json \
  --auto-split \
  --max-tokens 50000 \
  --output output/large-docs/

# Creates:
# output/large-docs-part1/
# output/large-docs-part2/
# output/large-docs-part3/
# output/large-docs-router/  (automatically generated)
```

### 3. Router-First Split (Manual)

**Best for:** Pre-planned organization

**Config structure:**
```json
{
  "name": "django-complete",
  "router_mode": true,
  "sub_skills": [
    {
      "name": "django-tutorial",
      "base_url": "https://docs.djangoproject.com/en/stable/intro/",
      "max_pages": 200
    },
    {
      "name": "django-api",
      "base_url": "https://docs.djangoproject.com/en/stable/ref/",
      "max_pages": 1000
    },
    {
      "name": "django-topics",
      "base_url": "https://docs.djangoproject.com/en/stable/topics/",
      "max_pages": 500
    }
  ]
}
```

**Scrape:**
```bash
skill-seekers scrape --config configs/django-router.json
# Automatically scrapes all sub-skills and generates router
```

---

## Parallel Scraping

### Multi-Worker Scraping

**Speed up scraping with concurrent workers:**

```bash
# 4 parallel workers
skill-seekers scrape --config configs/large-docs.json \
  --workers 4 \
  --output output/large-docs/

# Performance:
# - 1 worker: 10,000 pages = 3 hours
# - 4 workers: 10,000 pages = 45 minutes
# - 8 workers: 10,000 pages = 25 minutes (diminishing returns)
```

**Optimal worker count:**
- **CPU-bound:** Number of CPU cores
- **Network-bound:** 4-8 workers (avoid rate limiting)
- **Large docs (10K+ pages):** 4-6 workers recommended

### Async Scraping

**Single-process async for moderate speedup:**

```bash
# Async mode (faster than sync, no parallelism overhead)
skill-seekers scrape --config configs/large-docs.json \
  --async \
  --output output/large-docs/

# 2-3x faster than synchronous mode
```

**When to use:**
- **Async mode:** 500-2000 pages, network-bound
- **Parallel mode:** 2000+ pages, need maximum speed
- **Sync mode:** < 500 pages, simple/stable

---

## Checkpointing and Resume

### Checkpoint Scraping

**Resume interrupted scrapes:**

```bash
# Enable checkpointing (saves progress every 100 pages)
skill-seekers scrape --config configs/large-docs.json \
  --checkpoint \
  --checkpoint-interval 100 \
  --output output/large-docs/

# If interrupted, resume from last checkpoint:
skill-seekers scrape --config configs/large-docs.json \
  --resume \
  --output output/large-docs/
```

**Checkpoint location:**
```
output/large-docs/.checkpoint/
├── progress.json       # Pages scraped, current URL, etc.
├── cache/              # Cached page content
└── metadata.json       # Scraping metadata
```

### Smart Resume

**Detect and skip already-scraped pages:**

```bash
# Resume automatically detects existing content
skill-seekers scrape --config configs/large-docs.json \
  --smart-resume \
  --output output/large-docs/

# Skips pages that:
# - Already exist in references/
# - Have not changed since last scrape (based on Last-Modified header)
# - Match content hash from previous scrape
```

---

## Router Pattern for Large Docs

### Router SKILL.md Example

**Kubernetes Router (4 sub-skills):**

```markdown
---
name: kubernetes-complete
description: Complete Kubernetes documentation with intelligent routing
---

# Kubernetes Complete Router

## Sub-Skills

### 1. kubernetes-concepts
**When to use:** Understanding Kubernetes architecture and concepts
**Contains:** Pods, Services, Deployments, ReplicaSets, etc.

### 2. kubernetes-tasks
**When to use:** Step-by-step how-to guides
**Contains:** Creating deployments, exposing services, scaling, etc.

### 3. kubernetes-api
**When to use:** API reference and specifications
**Contains:** API objects, fields, methods

### 4. kubernetes-tutorials
**When to use:** End-to-end learning guides
**Contains:** Hello Minikube, Stateless Applications, etc.

## Routing Strategy

1. **Conceptual questions** → kubernetes-concepts
2. **How-to questions** → kubernetes-tasks
3. **API reference questions** → kubernetes-api
4. **Learning questions** → kubernetes-tutorials

For complex questions requiring multiple perspectives, consult multiple sub-skills and synthesize answer.
```

**Benefits:**
- ✅ Focused sub-skills (500-2000 pages each)
- ✅ Fast routing (only load needed sub-skill)
- ✅ Better token efficiency (no 10K-page context)
- ✅ User-friendly (clear organization)

---

## Optimization Techniques

### 1. Selective Content Extraction

**Extract only essential content:**

```json
{
  "name": "large-docs",
  "base_url": "https://docs.example.com/",
  "selectors": {
    "main_content": "article",
    "exclude_selectors": [
      ".sidebar",
      ".footer",
      ".navigation",
      ".advertisement"
    ]
  },
  "extract_api": true,
  "extract_examples": true,
  "extract_navigation": false,
  "extract_metadata": false
}
```

**Reduce token count by 30-50%** by excluding non-essential content.

### 2. Smart Page Filtering

**Skip low-value pages:**

```json
{
  "url_patterns": {
    "include": ["docs"],
    "exclude": [
      "blog",
      "news",
      "changelog",
      "404",
      "search"
    ]
  },
  "min_content_length": 500,
  "skip_duplicate_content": true
}
```

### 3. Incremental Updates

**Update only changed pages:**

```bash
# First scrape (full)
skill-seekers scrape --config configs/docs.json --output output/docs/

# Later updates (incremental)
skill-seekers scrape --config configs/docs.json \
  --output output/docs/ \
  --incremental \
  --since "2025-01-01"

# Only re-scrapes pages modified after 2025-01-01
```

### 4. Content Deduplication

**Remove duplicate content:**

```bash
# Enable deduplication
skill-seekers scrape --config configs/docs.json \
  --deduplicate \
  --similarity-threshold 0.9

# Skips pages with > 90% similarity to already-scraped pages
```

---

## Case Studies

### Case Study 1: Kubernetes (10,000+ pages)

**Challenge:** Comprehensive docs across 5 major sections

**Solution: Category-based split**

```bash
# Split into 5 sub-skills
skill-seekers scrape --config configs/k8s-concepts.json --workers 4
skill-seekers scrape --config configs/k8s-tasks.json --workers 4
skill-seekers scrape --config configs/k8s-api.json --workers 6
skill-seekers scrape --config configs/k8s-tutorials.json --workers 2
skill-seekers scrape --config configs/k8s-reference.json --workers 4

# Generate router
skill-seekers router output/k8s-*/ --output output/k8s-router/

# Package
skill-seekers package output/k8s-router/ --include-subskills
```

**Results:**
- 5 focused sub-skills (500-2500 pages each)
- Total scraping time: 1.5 hours (with 4-6 workers)
- Token count per sub-skill: 20K-60K
- Router overhead: ~5K tokens

### Case Study 2: Python Docs (4,000+ pages)

**Challenge:** Large, monolithic documentation

**Solution: Automatic size-based split**

```bash
# Auto-split at 50K tokens
skill-seekers scrape --config configs/python-docs.json \
  --auto-split \
  --max-tokens 50000 \
  --workers 4

# Creates:
# - python-stdlib (part 1)
# - python-tutorial (part 2)
# - python-reference (part 3)
# - python-howto (part 4)
# - python-router (auto-generated)
```

**Results:**
- 4 sub-skills automatically created
- Even distribution (~1000 pages each)
- Scraping time: 45 minutes

### Case Study 3: Internal Company Docs (20,000+ pages)

**Challenge:** Massive internal wiki with poor organization

**Solution: Hybrid approach**

```bash
# Phase 1: Category-based split (where possible)
skill-seekers scrape --config configs/company-api.json --workers 4
skill-seekers scrape --config configs/company-guides.json --workers 4

# Phase 2: Auto-split remaining unorganized docs
skill-seekers scrape --config configs/company-misc.json \
  --auto-split \
  --max-tokens 50000 \
  --workers 6

# Phase 3: Generate router
skill-seekers router output/company-*/ --output output/company-router/
```

**Results:**
- 2 manual categories + 3 auto-split parts = 5 sub-skills
- Scraping time: 3 hours (20K pages)
- Manageable sub-skills (50K-70K tokens each)

---

## Performance Guidelines

### Scraping Speed Estimates

| Pages | Workers | Sync | Async | Parallel (4 workers) |
|-------|---------|------|-------|----------------------|
| 100 | 1 | 2 min | 1 min | 30 sec |
| 500 | 1 | 8 min | 4 min | 2 min |
| 1000 | 1 | 17 min | 8 min | 4 min |
| 5000 | 1 | 1.5 hr | 45 min | 22 min |
| 10000 | 1 | 3 hr | 1.5 hr | 45 min |
| 20000 | 1 | 6 hr | 3 hr | 1.5 hr |

**Factors affecting speed:**
- **Network latency** - Higher latency = slower scraping
- **Rate limiting** - Respecting `robots.txt` and rate limits
- **Page complexity** - Heavy JavaScript, dynamic content
- **Content extraction** - Complex selectors slow down processing

### Memory Usage

| Pages | Memory (Sync) | Memory (Async) | Memory (Parallel 4x) |
|-------|---------------|----------------|----------------------|
| 100 | 50 MB | 80 MB | 200 MB |
| 500 | 200 MB | 300 MB | 800 MB |
| 1000 | 400 MB | 600 MB | 1.5 GB |
| 5000 | 2 GB | 3 GB | 7 GB |
| 10000 | 4 GB | 6 GB | 14 GB |

**Recommendations:**
- **< 1000 pages:** Any mode works
- **1000-5000 pages:** Use async or 2-4 workers
- **5000+ pages:** Use checkpointing + parallel workers
- **10000+ pages:** Split into sub-skills

---

## Advanced Configuration

### Multi-Stage Scraping

**Stage 1: Quick scan (get structure)**
```bash
skill-seekers scrape --config configs/docs.json \
  --scan-only \
  --output output/docs-scan/

# Creates URL map without full content extraction
```

**Stage 2: Analyze and plan split**
```bash
# Analyze structure
skill-seekers analyze output/docs-scan/ --suggest-split

# Outputs suggested categories and sizes
```

**Stage 3: Full scrape with split**
```bash
# Use suggested split
skill-seekers scrape --config configs/docs.json \
  --split-by-categories \
  --workers 4 \
  --output output/docs/
```

### Custom Router Logic

**Define custom routing rules:**

```json
{
  "router_config": {
    "name": "custom-router",
    "sub_skills": [
      {
        "name": "api-reference",
        "keywords": ["api", "method", "function", "class"],
        "priority": 1
      },
      {
        "name": "user-guide",
        "keywords": ["how to", "guide", "tutorial", "example"],
        "priority": 2
      },
      {
        "name": "concepts",
        "keywords": ["concept", "overview", "architecture"],
        "priority": 3
      }
    ],
    "default_skill": "user-guide",
    "multi_skill_threshold": 0.5
  }
}
```

---

## Troubleshooting

### Issue: Out of memory during scraping

**Symptoms:** Process killed, `MemoryError`

**Solutions:**
1. **Reduce batch size:**
   ```bash
   skill-seekers scrape --config X --batch-size 50
   ```

2. **Enable streaming mode:**
   ```bash
   skill-seekers scrape --config X --streaming
   ```

3. **Split into smaller sub-skills:**
   ```bash
   skill-seekers scrape --config X --auto-split --max-pages 1000
   ```

### Issue: Scraping too slow

**Symptoms:** Taking 5+ hours for 10K pages

**Solutions:**
1. **Use parallel workers:**
   ```bash
   skill-seekers scrape --config X --workers 4
   ```

2. **Enable async mode:**
   ```bash
   skill-seekers scrape --config X --async
   ```

3. **Skip low-value content:**
   ```json
   {
     "url_patterns": {
       "exclude": ["blog", "news", "search", "404"]
     }
   }
   ```

### Issue: Skill too large for Claude

**Symptoms:** Upload fails, "Token limit exceeded"

**Solutions:**
1. **Check token count:**
   ```bash
   skill-seekers validate output/skill/ --check-tokens
   ```

2. **Split into router + sub-skills:**
   ```bash
   skill-seekers router output/skill/ --max-tokens 50000
   ```

3. **Optimize content extraction:**
   ```json
   {
     "extract_navigation": false,
     "extract_metadata": false,
     "exclude_selectors": [".sidebar", ".footer"]
   }
   ```

---

## Best Practices

### 1. Plan Your Split Strategy

✅ **Before scraping**, analyze documentation structure:
```bash
skill-seekers analyze https://docs.example.com/ --suggest-split
```

### 2. Use Category-Based Split When Possible

✅ Clearer organization, better routing
❌ Avoid arbitrary size-based splits if categories exist

### 3. Test with Sample First

✅ Scrape small sample (100 pages) to validate config:
```bash
skill-seekers scrape --config X --max-pages 100 --output test/
```

### 4. Monitor Progress

✅ Enable verbose logging:
```bash
skill-seekers scrape --config X --verbose
```

### 5. Use Checkpointing for 5K+ Pages

✅ Always use `--checkpoint` for large scrapes
✅ Enables resume if interrupted

---

## Next Steps

- [Three-Stream GitHub Architecture](/docs/reference/c3x-router-architecture) - Router pattern for multi-source skills
- [Skill Architecture Guide](/docs/reference/skill-architecture) - Layering and splitting strategies
- [Unified Scraping](/docs/features/unified-scraping) - Multi-source scraping with conflict detection

---

**Status**: ✅ Production Ready (v2.0.0+)

Found an issue or have suggestions? [Open an issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
