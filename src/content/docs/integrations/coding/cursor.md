---
title: Cursor
description: Give Cursor IDE complete framework knowledge with .cursorrules.
section: integrations
subsection: coding
order: 11
---

# Cursor

Give **Cursor IDE** complete framework knowledge with `.cursorrules`.

## Quick Start

```bash
# From documentation
skill-seekers scrape --target claude --config configs/react.json
cp output/react-claude/.cursorrules ./

# From GitHub repo (better!)
skill-seekers scrape --target claude --github https://github.com/facebook/react
cp output/react-claude/.cursorrules ./
```

## Setup

1. **Generate rules:**
```bash
skill-seekers scrape --config configs/react.json --target claude
```

2. **Copy to project:**
```bash
cp output/react-claude/.cursorrules ./my-project/
```

3. **Restart Cursor** - Rules take effect immediately

## What You Get

- ✅ **Framework-aware suggestions** - Cursor knows your APIs
- ✅ **Pattern recognition** - Best practices from real code
- ✅ **Contextual help** - Relevant docs in chat
- ✅ **No token limits** - Full framework knowledge

## Before & After

### Before (Generic)
```javascript
function handleClick() {
  // Generic suggestion...
}
```

### After (React-Aware)
```javascript
function Counter() {
  const [count, setCount] = useState(0);  // Suggests useState
  
  useEffect(() => {  // Knows lifecycle
    document.title = `Count: ${count}`;
  }, [count]);
  
  return <button onClick={() => setCount(c => c + 1)}>Count</button>;
}
```

## Tips

- **Use GitHub repos** - Real code > documentation
- **Keep updated** - Re-scrape when framework changes
- **Combine sources** - Docs + GitHub for best results

## Next Steps

- [AI Coding Guide](/blog/2026-02-14-ai-coding-guide) - Detailed tutorial
- [Windsurf](/docs/integrations/coding/windsurf) - Alternative IDE
