---
title: Windsurf
description: Give Windsurf IDE framework knowledge with .windsurfrules.
section: integrations
subsection: coding
order: 12
---

# Windsurf

Give **Windsurf IDE** framework knowledge with `.windsurfrules`.

## Quick Start

```bash
skill-seekers scrape --target claude --config configs/react.json
cp output/react-claude/.windsurfrules ./
```

## Setup

1. **Generate rules:**
```bash
skill-seekers scrape --config configs/react.json --target claude
```

2. **Copy to project:**
```bash
cp output/react-claude/.windsurfrules ./my-project/
```

3. **Restart Windsurf**

## Features

- ✅ **Codeium-powered** - Native AI integration
- ✅ **Framework expertise** - Context-aware suggestions
- ✅ **Cascade workflows** - Multi-step generation
- ⚠️ **12K character limit** - Per file

## Workaround for Large Frameworks

Windsurf has a 12K limit. For large frameworks:
- Use `.windsurfrules` for core concepts only
- Create multiple smaller files
- Or use [Continue.dev](/docs/integrations/coding/continue) (no limits)

## Next Steps

- [Cursor](/docs/integrations/coding/cursor) - No limits
- [Continue.dev](/docs/integrations/coding/continue) - Universal plugin
