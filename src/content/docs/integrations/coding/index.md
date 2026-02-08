---
title: AI Coding Assistants
description: Give your IDE expert framework knowledge. Cursor, Windsurf, Cline, Continue.dev integration.
section: integrations
subsection: coding
order: 10
---

# AI Coding Assistants

Give your **IDE expert framework knowledge**. Transform docs, repos, and codebases into AI coding rules.

## The Problem

Your AI coding assistant doesn't know your frameworks:
- ❌ Generic code suggestions
- ❌ No framework-specific patterns
- ❌ Missing API knowledge
- ❌ Outdated best practices

## The Solution

Convert any source into `.cursorrules`, `.windsurfrules`, etc.:

```bash
# From documentation
skill-seekers scrape --target claude --config react.json
cp output/react-claude/.cursorrules ./

# From GitHub repo (better!)
skill-seekers scrape --target claude --github facebook/react
cp output/react-claude/.cursorrules ./
```

## Quick Selector

| Your IDE | Integration | Type |
|----------|-------------|------|
| Cursor IDE | [Cursor](/docs/integrations/coding/cursor) | VS Code fork |
| Windsurf | [Windsurf](/docs/integrations/coding/windsurf) | Codeium IDE |
| VS Code | [Cline](/docs/integrations/coding/cline) | Extension + MCP |
| Any IDE | [Continue.dev](/docs/integrations/coding/continue) | Universal plugin |

## Result: Before → After

### Before (Generic)
```javascript
function handleClick() {
  // Generic suggestion...
}
```

### After (Framework-Aware)
```javascript
function Counter() {
  const [count, setCount] = useState(0);  // Suggests useState
  
  useEffect(() => {  // Knows lifecycle
    document.title = `Count: ${count}`;
  }, [count]);
  
  return <button onClick={() => setCount(c => c + 1)}>  // Knows patterns
    Count: {count}
  </button>;
}
```

## Comparison

| Feature | Cursor | Windsurf | Cline | Continue.dev |
|---------|--------|----------|-------|--------------|
| **IDE** | Cursor only | Windsurf only | VS Code only | Any IDE |
| **Limit** | None | 12K chars | None | None |
| **MCP** | ✅ | ✅ | ✅ | ✅ |
| **Best For** | Cursor users | Cascade workflows | VS Code + MCP | Multi-IDE teams |

## Tutorial

[Give Cursor Framework Knowledge →](/blog/2026-02-14-ai-coding-guide)

## Next Steps

- [Cursor Setup](/docs/integrations/coding/cursor) - Most popular
- [Cline + MCP](/docs/integrations/coding/cline) - VS Code users
- [Continue.dev](/docs/integrations/coding/continue) - Universal option
