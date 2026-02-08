---
title: "Give Cursor Complete Framework Knowledge with Skill Seekers"
description: "How to convert docs, repos, PDFs, or codebases into Cursor AI rules for better code completion and understanding"
pubDate: 2026-02-14
author: "Skill Seekers Team"
authorTwitter: "@skillseekers"
tags: ["cursor", "ai-coding", "tutorial", "windsurf", "cline"]
---

# Give Cursor Complete Framework Knowledge

## The Problem

Cursor doesn't know your framework's API by default. You get generic suggestions that don't leverage framework-specific patterns and best practices.

## The Solution

Convert any source into `.cursorrules` with Skill Seekers v3.0.0:

```bash
# From documentation
skill-seekers scrape --target claude --config react.json
cp output/react-claude/.cursorrules ./

# From GitHub repo
skill-seekers scrape --target claude --github https://github.com/facebook/react
cp output/react-claude/.cursorrules ./

# From local codebase
skill-seekers analyze --directory ./my-project --target claude
cp output/my-project-claude/.cursorrules ./
```

## How It Works

1. **Extract** from docs, repos, PDFs, or codebases
2. **Convert** to Claude-compatible format
3. **Copy** `.cursorrules` to your project
4. **Enjoy** framework-aware AI suggestions

## Supported AI Coding Assistants

| Tool | Command | File | Works With |
|------|---------|------|------------|
| **Cursor** | `--target claude` | `.cursorrules` | Docs, repos, codebases |
| **Windsurf** | `--target claude` | `.windsurfrules` | Docs, repos, codebases |
| **Cline** | `--target claude` | `.clinerules` | Docs, repos, codebases |
| **Continue.dev** | `--target claude` | `.continuerules` | Docs, repos, codebases |

## Real Example: React from GitHub

### Before (Generic Suggestions)

```javascript
// Cursor suggests generic function
function handleClick() {
  // Generic suggestion...
}
```

### After (React-Aware from Real Code)

```javascript
// Cursor knows React patterns from the actual React repo
function Counter() {
  const [count, setCount] = useState(0);  // Suggests useState
  
  useEffect(() => {  // Suggests useEffect for side effects
    document.title = `Count: ${count}`;
    return () => {  // Suggests cleanup
      document.title = 'My App';
    };
  }, [count]);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>  // Knows callback pattern
      Count: {count}
    </button>
  );
}
```

## Quick Start

```bash
# 1. Install Skill Seekers
pip install skill-seekers

# 2. Extract from any source
skill-seekers scrape --target claude --config configs/react.json
# OR from GitHub
skill-seekers scrape --target claude --github https://github.com/owner/repo
# OR from local code
skill-seekers analyze --directory ./my-project --target claude

# 3. Copy rules file
cp output/*-claude/.cursorrules ./

# 4. Restart Cursor
# Your AI now knows the framework!
```

## Creating Custom Configs

For sources without presets:

```json
{
  "name": "my-framework",
  "url": "https://docs.myframework.com",
  "target": "claude",
  "selectors": {
    "content": "article.main-content",
    "title": "h1",
    "code": "pre code"
  }
}
```

Then:
```bash
skill-seekers scrape --config my-framework.json --target claude
```

## Tips for Best Results

1. **Use real code** - GitHub repos give better examples than docs alone
2. **Keep rules updated** - Re-scrape when framework changes
3. **Combine sources** - Merge docs + repo rules for comprehensive knowledge
4. **Project-specific** - Add your own `.cursorrules` on top
5. **Version control** - Commit `.cursorrules` to repo

## Results

- ✅ Better code completion
- ✅ Framework-aware suggestions
- ✅ Pattern recognition from real code
- ✅ Best practice reminders

Transform your AI coding experience today!
