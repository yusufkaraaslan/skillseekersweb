---
title: AI 编程助手
description: 为您的 IDE 注入专家级框架知识。Cursor、Windsurf、Cline、Continue.dev 集成。
section: integrations
subsection: coding
order: 0
---

# AI 编程助手

为您的 **IDE 注入专家级框架知识**。将文档、仓库和代码库转换为 AI 编程规则。

## 问题所在

您的 AI 编程助手不了解您使用的框架：
- ❌ 通用的代码建议
- ❌ 缺乏框架特定的模式
- ❌ 缺少 API 知识
- ❌ 过时的最佳实践

## 解决方案

将任何来源转换为 `.cursorrules`、`.windsurfrules` 等格式：

```bash
# 从文档获取
skill-seekers scrape --target claude --config react.json
cp output/react-claude/.cursorrules ./

# 从 GitHub 仓库获取（推荐！）
skill-seekers scrape --target claude --github facebook/react
cp output/react-claude/.cursorrules ./
```

## 快速选择器

| 您的 IDE | 集成方案 | 类型 |
|----------|-------------|------|
| Cursor IDE | [Cursor](/docs/integrations/coding/cursor) | VS Code 分支 |
| Windsurf | [Windsurf](/docs/integrations/coding/windsurf) | Codeium IDE |
| VS Code | [Cline](/docs/integrations/coding/cline) | 扩展 + MCP |
| 任意 IDE | [Continue.dev](/docs/integrations/coding/continue) | 通用插件 |

## 效果对比：之前 → 之后

### 之前（通用）
```javascript
function handleClick() {
  // 通用建议...
}
```

### 之后（框架感知）
```javascript
function Counter() {
  const [count, setCount] = useState(0);  // 建议使用 useState
  
  useEffect(() => {  // 了解生命周期
    document.title = `Count: ${count}`;
  }, [count]);
  
  return <button onClick={() => setCount(c => c + 1)}>  // 了解设计模式
    Count: {count}
  </button>;
}
```

## 对比

| 功能特性 | Cursor | Windsurf | Cline | Continue.dev |
|---------|--------|----------|-------|--------------|
| **IDE** | 仅限 Cursor | 仅限 Windsurf | 仅限 VS Code | 任意 IDE |
| **限制** | 无 | 12K 字符 | 无 | 无 |
| **MCP** | ✅ | ✅ | ✅ | ✅ |
| **最佳适用** | Cursor 用户 | Cascade 工作流 | VS Code + MCP | 多 IDE 团队 |

## 教程

[让 Cursor 掌握框架知识 →](/blog/2026-02-14-ai-coding-guide)

## 下一步

- [Cursor 设置](/docs/integrations/coding/cursor) - 最受欢迎
- [Cline + MCP](/docs/integrations/coding/cline) - VS Code 用户
- [Continue.dev](/docs/integrations/coding/continue) - 通用选项
