---
title: Understanding Skills
description: Learn how Skill Seekers skills work - from extraction to packaging, understand the anatomy of a skill
section: getting-started
order: 5
---

# Understanding Skills

To get the most out of Skill Seekers, it helps to understand what a "skill" actually is and how the system creates one. This guide explains the internals without getting too technical.

---

## What Is a Skill?

A **skill** is structured knowledge packaged for AI systems. Think of it like this:

| Analogy | Explanation |
|---------|-------------|
| **A book** | Just as you read a book to learn, AI reads a skill to gain knowledge |
| **A database** | Organized information that can be queried efficiently |
| **Expertise** | The distilled knowledge of a framework, library, or codebase |

**Real-world example:** A "React" skill contains:
- Component patterns and when to use them
- Hook usage with real examples
- Common pitfalls and solutions
- API reference with context
- Best practices from the documentation

When you ask Claude about React with this skill loaded, it responds with **accurate, context-aware answers** instead of general training data.

---

## The Skill Creation Pipeline

Skill Seekers transforms raw sources into AI-ready skills through a 5-phase pipeline:

```
Raw Source → Extract → Analyze → Organize → Package → AI Skill
     ↓          ↓         ↓          ↓          ↓         ↓
   HTML/     Content   Patterns   Structured  Platform  Ready
   GitHub    + Meta    + Code     Reference   Format    to Use
   PDF/      Data      Detection  Files                  
   Code
```

### Phase 1: Extract

**What happens:** Skill Seekers connects to your source and extracts raw content.

**For documentation websites:**
- Crawls pages using BFS (breadth-first search)
- Respects `max_pages` limits
- Detects `llms.txt` for optimized extraction
- Handles pagination and navigation

**For GitHub repos:**
- Three-stream fetcher (v3.0+): Code + Docs + Issues
- C3.x analysis for patterns and examples
- README extraction from all directories
- Optional issue/PR analysis

**For PDFs:**
- Text extraction with layout preservation
- OCR for scanned documents
- Table structure detection
- Page range selection

**For local codebases:**
- File tree traversal
- Language detection (27+ languages)
- C3.x comprehensive analysis
- Pattern and architecture detection

### Phase 2: Analyze

**What happens:** Raw content is analyzed for structure, patterns, and meaning.

**Smart detection:**
- **Code blocks:** Identifies language and preserves formatting
- **Categories:** Groups related content automatically
- **Examples:** Finds practical usage patterns
- **APIs:** Extracts function signatures and parameters

**C3.x Analysis (for code):**
- **C3.1:** Design patterns (Singleton, Factory, Observer, etc.)
- **C3.2:** Test examples (real usage from test files)
- **C3.3:** How-to guides (step-by-step tutorials)
- **C3.4:** Config patterns (JSON, YAML, ENV analysis)
- **C3.7:** Architecture patterns (MVC, MVVM, etc.)

### Phase 3: Organize

**What happens:** Analyzed content is structured into a consistent format.

**Output structure:**
```
skill-name/
├── SKILL.md              # Main entry point (overview + navigation)
├── references/           # Detailed documentation
│   ├── category-1/
│   │   ├── topic-a.md
│   │   └── topic-b.md
│   └── category-2/
│       └── topic-c.md
└── examples/             # Code examples and patterns
    ├── example-1.md
    └── example-2.md
```

**SKILL.md components:**
- **Title & description** - What this skill covers
- **Quick reference** - Common patterns at a glance
- **When to use** - Guidance for AI on relevance
- **Navigation** - How to find specific information
- **Key concepts** - Core ideas explained

### Phase 4: Enhance (Optional)

**What happens:** AI improves the skill's quality and completeness.

**v3.1.0 Workflow Enhancement:**
- Applies configurable enhancement strategies
- Uses workflow presets (`default`, `api-documentation`, etc.)
- Supports custom YAML workflow definitions
- Can chain multiple workflows

**What enhancement adds:**
- Better explanations of complex concepts
- Extracted best practices
- Common pitfalls and solutions
- Curated code examples
- Improved organization

**Before enhancement:** 3/10 quality (raw extraction)
**After enhancement:** 9/10 quality (AI-curated)

**Cost:** FREE with Claude Code, or ~$0.15-$0.30 via API

### Phase 5: Package

**What happens:** The skill is converted to platform-specific formats.

**Supported formats:**
- **Claude AI:** ZIP with YAML frontmatter
- **Google Gemini:** tar.gz format
- **OpenAI ChatGPT:** ZIP with vector store
- **LangChain:** Document objects with metadata
- **LlamaIndex:** TextNode objects
- **Vector DBs:** Direct Chroma, Weaviate, Qdrant, FAISS export
- **AI Coding:** `.cursorrules`, `.windsurfrules`, `.clinerules`

---

## Skill Anatomy Deep Dive

Let's look at what's inside a skill:

### SKILL.md (The Entry Point)

```markdown
---
title: "React"
description: "A JavaScript library for building user interfaces"
version: "18.2.0"
sources:
  - "https://react.dev"
created: "2026-01-15"
---

# React Skill

## Quick Reference

### Common Patterns

**Functional Component:**
```jsx
function MyComponent({ prop1, prop2 }) {
  return <div>{prop1}</div>;
}
```

**useEffect Hook:**
```jsx
useEffect(() => {
  // Side effect
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

## When to Use This Skill

Use this skill when:
- Building React components
- Managing state with hooks
- Implementing routing with React Router
- Optimizing performance

## Navigation Guide

- **Getting Started:** See `references/getting-started/`
- **Hooks:** See `references/hooks/`
- **Components:** See `references/components/`

## Key Concepts

### Virtual DOM
React uses a virtual representation of the DOM...
```

### References Directory

Contains detailed documentation organized by topic:

```
references/
├── getting-started/
│   ├── installation.md
│   ├── thinking-in-react.md
│   └── quick-start.md
├── hooks/
│   ├── useState.md
│   ├── useEffect.md
│   └── useContext.md
└── components/
    ├── functional-components.md
    └── class-components.md
```

### Examples Directory

Contains practical code examples:

```
examples/
├── todo-app.md
├── fetch-data.md
├── form-handling.md
└── context-provider.md
```

---

## How AI Uses Skills

Different AI systems use skills differently:

### Claude AI
- Loads SKILL.md as conversation context
- References files when needed
- Uses "When to Use" triggers for relevance
- Maintains context across conversation

### AI Coding Assistants (Cursor, Windsurf, Cline)
- `.cursorrules` file loaded at project start
- Provides persistent framework knowledge
- Suggests patterns based on context
- No manual prompting needed

### RAG Systems (LangChain, LlamaIndex)
- Documents indexed with embeddings
- Semantic search retrieves relevant chunks
- Source metadata for citations
- Efficient token usage

### Vector Databases (Chroma, Weaviate, Qdrant)
- Direct import into database
- Query with vector similarity
- Combine with other data sources
- Production-ready retrieval

---

## Skill Quality Factors

What makes a good skill?

| Factor | Good | Bad |
|--------|------|-----|
| **Coverage** | Complete API + examples | Incomplete or outdated |
| **Organization** | Clear categories | Random structure |
| **Examples** | Working, practical code | Contrived or broken |
| **Freshness** | Matches latest version | Old API versions |
| **Enhancement** | AI-curated insights | Raw extraction only |

**Skill Seekers helps with all of these:**
- ✅ Automatic extraction ensures coverage
- ✅ Smart categorization provides organization
- ✅ Test extraction finds working examples
- ✅ Easy updates keep content fresh
- ✅ AI enhancement adds insights

---

## Managing Skills

### Updating Skills

When documentation changes:

```bash
# Re-create with same settings
skill-seekers create https://react.dev --target claude

# Upload new version
skill-seekers upload react-claude.zip --target claude
```

**CI/CD Automation:**
```yaml
# .github/workflows/update-skills.yml
name: Update Skills
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install skill-seekers
      - run: skill-seekers create https://react.dev --target claude
      - run: skill-seekers upload react-claude.zip --target claude
```

### Versioning Skills

Skills include version metadata:

```yaml
---
title: "React"
version: "18.2.0"  # Source version
created: "2026-01-15"  # Skill creation date
sources:
  - "https://react.dev"
---
```

Track versions for your team:
- `react-18.2.0-claude.zip`
- `react-18.3.0-claude.zip`

---

## Next Steps

Now that you understand how skills work:

- [Next Steps](/docs/getting-started/next-steps) - Where to go from here
- [Tutorials](/docs/tutorials/docs/scraping-websites) - Master specific use cases
- [Manual](/docs/manual/concepts/architecture) - Deep dive into architecture
