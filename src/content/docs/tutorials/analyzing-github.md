---
title: "Tutorial: Analyzing GitHub Repositories"
description: Step-by-step tutorial for analyzing GitHub repositories with C3.x codebase analysis suite
section: tutorials
order: 2
---

# Tutorial: Analyzing GitHub Repositories

Learn how to analyze GitHub repositories and generate comprehensive codebase documentation with C3.x analysis.

**Time:** 20 minutes | **Level:** Intermediate | **Result:** Complete codebase skill with patterns, examples, and architecture

---

## What You'll Learn

- How to scrape GitHub repositories
- How to use C3.x codebase analysis (patterns, test extraction, how-to guides)
- How to combine GitHub + local codebase analysis
- How to generate ARCHITECTURE.md

## Step 1: Basic GitHub Scraping

```bash
skill-seekers github \
  --repository facebook/react \
  --output output/react-repo/
```

## Step 2: Add Local Analysis (Unlimited!)

```bash
# Clone repo locally first
git clone https://github.com/facebook/react.git /tmp/react

# Analyze with C3.x features
skill-seekers github \
  --repository facebook/react \
  --local-repo-path /tmp/react \
  --output output/react-complete/
```

**What you get:**
- Pattern detection (Singleton, Factory, Observer, etc.)
- Test example extraction
- How-to guide generation
- Configuration analysis
- Architectural overview (ARCHITECTURE.md)

## Step 3: Review Generated Files

```
output/react-complete/
├── SKILL.md
├── ARCHITECTURE.md              # NEW: Comprehensive overview
├── references/
│   ├── api_reference.md
│   ├── dependencies.md
│   └── codebase_analysis/
│       ├── patterns/            # Design patterns detected
│       ├── examples/            # Test examples extracted
│       ├── guides/              # How-to tutorials generated
│       └── configuration/       # Config files analyzed
```

**See:** [GitHub Analysis Manual](/docs/manual/scraping/github) for complete details.
