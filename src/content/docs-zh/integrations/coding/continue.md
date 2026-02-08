---
title: Continue.dev
description: 适用于 VS Code、JetBrains、Vim 的通用 AI 编程插件。
section: integrations
subsection: coding
order: 14
---

# Continue.dev

适用于 **VS Code、JetBrains、Vim** 的 **通用 AI 编程插件**。

## 快速开始

```bash
skill-seekers scrape --target markdown --config configs/react.json
```

## 设置步骤

### 1. 安装 Continue.dev
从你的 IDE 插件市场安装。

### 2. 生成上下文
```bash
skill-seekers scrape --config configs/react.json --target markdown
```

### 3. 配置 Continue

添加到 `~/.continue/config.json`：

```json
{
  "contextProviders": [
    {
      "name": "react-docs",
      "type": "file",
      "file": "/path/to/output/react-markdown/SKILL.md"
    }
  ]
}
```

### 4. 在聊天中使用

在 Continue 聊天中输入 `@react-docs` 来引用框架知识。

## 功能特性

- ✅ **通用** - 在任何 IDE 中工作
- ✅ **无限制** - 完整的上下文可用
- ✅ **HTTP 上下文** - 动态加载
- ✅ **多模型** - Claude、GPT-4、本地模型

## 对比

| 特性 | Cursor | Windsurf | Cline | Continue.dev |
|---------|--------|----------|-------|--------------|
| **IDE** | 仅限 Cursor | 仅限 Windsurf | 仅限 VS Code | 任何 IDE |
| **限制** | 无 | 12K 字符 | 无 | 无 |
| **MCP** | ✅ | ✅ | ✅ | ✅ |

## 最适合

- **多 IDE 用户** - 在任何地方使用相同的规则
- **JetBrains/Vim** - 不限于 VS Code
- **大型框架** - 无字符限制

## 下一步

- [AI 编程指南](/blog/2026-02-14-ai-coding-guide) - 完整教程
- [RAG 管道](/docs/integrations/rag) - 用于知识库
