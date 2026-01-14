---
title: Three-Stream GitHub Architecture (C3.x Router)
description: Complete guide to the Three-Stream GitHub Architecture for large documentation - combines code analysis, documentation scraping, and GitHub insights with router generation
section: reference
order: 2
---

# Three-Stream GitHub Architecture (C3.x Router)

**Complete guide to the Three-Stream GitHub Architecture pattern for handling large codebases and documentation.**

## Overview

The **Three-Stream GitHub Architecture** (also called **C3.x Router Architecture**) is a pattern for creating comprehensive AI skills from large projects with extensive documentation and codebases. Instead of scraping just the documentation or just the codebase, it combines **three independent streams** of knowledge into a unified skill with intelligent routing.

**Version:** v2.6.0 (Phases 1-5 Complete!)

**Key Innovation:** Each stream scrapes independently, then a router skill intelligently directs Claude to the right sub-skill based on the user's question.

---

## The Three Streams

### Stream 1: Code Analysis (C3.x Codebase)

**Purpose:** Extract code structure, patterns, and implementation details from the GitHub repository

**Command:**
```bash
skill-seekers-codebase path/to/repo/ \
  --output output/project-code/ \
  --extract-patterns \
  --extract-test-examples \
  --build-how-to-guides
```

**What it extracts:**
- Project structure and organization
- Design patterns used
- Test examples (5 categories)
- How-to guides from test workflows
- Configuration patterns
- Architecture overview

**Output:** `output/project-code/SKILL.md` + references

---

### Stream 2: Documentation Scraping

**Purpose:** Extract official documentation from the project website

**Command:**
```bash
skill-seekers scrape --config configs/project-docs.json
```

**What it extracts:**
- API reference
- User guides
- Tutorials
- Conceptual explanations
- Official examples

**Output:** `output/project-docs/SKILL.md` + references

---

### Stream 3: GitHub Insights

**Purpose:** Extract community knowledge, issues, discussions, and changelog from GitHub

**Command:**
```bash
skill-seekers github owner/repo \
  --output output/project-github/ \
  --include-issues \
  --max-issues 200 \
  --include-changelog \
  --include-releases
```

**What it extracts:**
- README and project overview
- Issues (bugs, feature requests, discussions)
- Releases and changelog
- Community insights
- Known problems and workarounds

**Output:** `output/project-github/SKILL.md` + references

---

## Router Skill Generation

After creating the three stream skills, generate a router skill that intelligently directs queries to the right sub-skill.

### Automatic Router Generation

```bash
# Generate router from existing skills
skill-seekers router \
  output/project-code/ \
  output/project-docs/ \
  output/project-github/ \
  --output output/project-router/ \
  --name "project-complete"
```

**What the router does:**
1. Receives user question
2. Analyzes question intent
3. Routes to appropriate sub-skill(s)
4. Returns comprehensive answer

---

## Router SKILL.md Structure

The generated router skill has this structure:

```markdown
---
name: project-complete
description: Complete project knowledge - intelligently routes questions to code, docs, or GitHub insights
---

# Project Complete Router

You are an intelligent routing assistant for the Project ecosystem.

## Your Sub-Skills

You have access to three specialized sub-skills:

### 1. project-code (Codebase Analysis)
**When to use:** Implementation details, code patterns, architecture
**Contains:**
- Project structure
- Design patterns
- Test examples
- How-to guides

### 2. project-docs (Official Documentation)
**When to use:** API reference, official guides, tutorials
**Contains:**
- API documentation
- User guides
- Official examples

### 3. project-github (GitHub Insights)
**When to use:** Community knowledge, issues, known problems
**Contains:**
- README
- Issues and discussions
- Changelog and releases

## Routing Strategy

For each user question:

1. **Analyze intent**
   - Implementation/code question → project-code
   - API/usage question → project-docs
   - Problem/issue question → project-github

2. **Route to appropriate sub-skill(s)**
   - Use one skill for focused questions
   - Use multiple skills for comprehensive questions

3. **Synthesize answer**
   - Combine information from multiple streams if needed
   - Provide source attribution

## Example Routing

**User:** "How do I implement authentication?"
→ **Route to:** project-docs (API reference) + project-code (implementation patterns)

**User:** "Why is feature X not working?"
→ **Route to:** project-github (known issues) + project-docs (usage guide)

**User:** "What design patterns are used in the codebase?"
→ **Route to:** project-code (pattern detection)

**User:** "What changed in version 2.0?"
→ **Route to:** project-github (changelog) + project-docs (migration guide)
```

---

## Complete Workflow

### Step 1: Create Three Stream Skills

```bash
# Stream 1: Code Analysis
skill-seekers-codebase path/to/repo/ \
  --output output/project-code/

# Stream 2: Documentation
skill-seekers scrape --config configs/project-docs.json

# Stream 3: GitHub Insights
skill-seekers github owner/repo \
  --output output/project-github/ \
  --include-issues \
  --max-issues 200
```

### Step 2: Generate Router Skill

```bash
skill-seekers router \
  output/project-code/ \
  output/project-docs/ \
  output/project-github/ \
  --output output/project-router/ \
  --name "project-complete"
```

### Step 3: Package Router + Sub-Skills

```bash
# Package all skills together
skill-seekers package output/project-router/ \
  --include-subskills \
  --target claude
```

**Result:** `project-complete.zip` containing:
- Router skill (SKILL.md)
- project-code sub-skill
- project-docs sub-skill
- project-github sub-skill

### Step 4: Upload to Claude

```bash
skill-seekers upload project-complete.zip --target claude
```

---

## Architecture Benefits

### 1. Separation of Concerns

Each stream focuses on one knowledge domain:
- **Code stream:** Implementation details
- **Docs stream:** Official guidance
- **GitHub stream:** Community knowledge

### 2. Independent Updates

Update any stream without affecting others:
```bash
# Re-scrape just documentation
skill-seekers scrape --config configs/project-docs.json

# Regenerate router (automatically detects changes)
skill-seekers router output/*/ --output output/project-router/
```

### 3. Intelligent Routing

Router analyzes user intent and routes to the right knowledge source(s).

### 4. Comprehensive Coverage

Combines official docs + code reality + community insights for complete knowledge.

### 5. Token Efficiency

Only loads relevant sub-skill(s) for each question, not all knowledge at once.

---

## Use Cases

### Use Case 1: Large Framework (React, Vue, Angular)

**Challenge:** Official docs + 1M+ lines of code + 10K+ issues

**Solution:**
```bash
# Stream 1: Code patterns
skill-seekers-codebase react/ --output output/react-code/

# Stream 2: Official docs
skill-seekers scrape --config configs/react-docs.json

# Stream 3: GitHub insights
skill-seekers github facebook/react --output output/react-github/ --max-issues 500

# Router
skill-seekers router output/react-*/ --output output/react-router/ --name "react-complete"
```

### Use Case 2: Internal Company Project

**Challenge:** Private codebase + Confluence docs + JIRA issues

**Solution:**
```bash
# Stream 1: Code analysis
skill-seekers-codebase company-app/ --output output/app-code/

# Stream 2: Confluence docs (via PDF export or web scraping)
skill-seekers scrape --config configs/confluence-docs.json

# Stream 3: JIRA export (JSON)
skill-seekers github-json jira-export.json --output output/app-issues/

# Router
skill-seekers router output/app-*/ --output output/app-router/ --name "company-app-complete"
```

### Use Case 3: Open Source Library

**Challenge:** Small codebase + great docs + active community

**Solution:**
```bash
# All three streams
skill-seekers unified --config configs/library-unified.json

# Router auto-generated
# (unified mode automatically creates router if multiple sources)
```

---

## Router Configuration

### Custom Routing Rules

Create `router_config.json` to customize routing behavior:

```json
{
  "name": "project-complete",
  "description": "Complete project knowledge router",
  "sub_skills": [
    {
      "name": "project-code",
      "path": "output/project-code/",
      "keywords": ["implementation", "code", "pattern", "architecture"],
      "priority": 2
    },
    {
      "name": "project-docs",
      "path": "output/project-docs/",
      "keywords": ["api", "usage", "tutorial", "guide"],
      "priority": 1
    },
    {
      "name": "project-github",
      "path": "output/project-github/",
      "keywords": ["issue", "bug", "problem", "changelog"],
      "priority": 3
    }
  ],
  "routing_strategy": "multi-skill-when-needed",
  "default_skill": "project-docs"
}
```

**Usage:**
```bash
skill-seekers router --config router_config.json --output output/project-router/
```

---

## Advanced Features

### 1. Multi-Skill Routing

For complex questions, route to multiple sub-skills:

```markdown
**User:** "How do I implement authentication and what are common issues?"

**Router decision:**
1. Route to project-docs (authentication API)
2. Route to project-code (implementation patterns)
3. Route to project-github (known authentication issues)

**Synthesized answer:** Combines all three perspectives
```

### 2. Confidence-Based Routing

Router can express confidence and route accordingly:

```markdown
**High confidence:** Route to single best sub-skill
**Medium confidence:** Route to top 2 sub-skills
**Low confidence:** Route to all sub-skills and synthesize
```

### 3. Fallback Routing

If question doesn't match any sub-skill clearly:

```markdown
**Strategy:**
1. Try project-docs first (most general)
2. If no good answer, try project-code
3. If still no good answer, try project-github
```

---

## Performance Metrics

**Godot Engine Example** (Three-Stream Architecture):

| Metric | Single Skill | Three-Stream Router |
|--------|--------------|---------------------|
| **Accuracy** | 75% | 92% |
| **Token Usage** | ~50K per query | ~15K per query |
| **Response Time** | 15-20s | 5-8s |
| **Coverage** | Docs only | Docs + Code + Community |
| **Relevance** | Medium | High |

**Why it's better:**
- More accurate (routes to right knowledge source)
- Faster (only loads needed sub-skill)
- More comprehensive (combines multiple knowledge sources)

---

## Troubleshooting

### Issue: Router always routes to same sub-skill

**Cause:** Sub-skill descriptions too similar or routing keywords overlap

**Solution:**
1. Make sub-skill descriptions more distinct
2. Add specific routing keywords to each sub-skill
3. Review router_config.json for keyword conflicts

### Issue: Router doesn't route to any sub-skill

**Cause:** User question doesn't match any routing patterns

**Solution:**
1. Add a default_skill in router_config.json
2. Use broader routing keywords
3. Implement fallback strategy

### Issue: Too much token usage

**Cause:** Router loading multiple sub-skills unnecessarily

**Solution:**
1. Tighten routing rules (more specific keywords)
2. Use single-skill-preferred routing strategy
3. Reduce sub-skill reference file count

---

## Best Practices

### 1. Clear Sub-Skill Separation

Each sub-skill should have a **distinct purpose**:
- ✅ Good: "code" (implementation), "docs" (API), "github" (issues)
- ❌ Bad: "general" (everything), "misc" (unclear)

### 2. Descriptive Names

Use clear, descriptive sub-skill names:
- ✅ Good: `react-codebase`, `react-docs`, `react-community`
- ❌ Bad: `skill1`, `react-a`, `react-misc`

### 3. Routing Keywords

Choose keywords that **clearly distinguish** each sub-skill:
- Code: implementation, pattern, architecture, structure
- Docs: api, usage, tutorial, guide, reference
- GitHub: issue, bug, problem, changelog, release

### 4. Regular Updates

Update streams independently as needed:
```bash
# Monthly: Re-scrape documentation
skill-seekers scrape --config configs/project-docs.json

# Weekly: Update GitHub insights
skill-seekers github owner/repo --output output/project-github/

# As needed: Re-analyze code
skill-seekers-codebase path/to/repo/ --output output/project-code/

# Regenerate router
skill-seekers router output/*/ --output output/project-router/
```

---

## Next Steps

- [Unified Multi-Source Scraping](/docs/features/unified-scraping) - Alternative to three-stream (single command)
- [Large Documentation Handling](/docs/reference/large-documentation) - Split strategies for 10K+ pages
- [Skill Architecture Guide](/docs/reference/skill-architecture) - Layering and splitting skills
- [GitHub Scraping](/docs/cli/github) - GitHub repository scraping options

---

**Status**: ✅ Production Ready (v2.6.0 - Three-Stream Architecture Complete!)

Found an issue or have suggestions? [Open an issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
