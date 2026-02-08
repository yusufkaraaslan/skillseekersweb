---
title: Windsurf
description: 通过 .windsurfrules 让 Windsurf IDE 掌握框架知识。
section: integrations
subsection: coding
order: 12
---

# Windsurf

通过 **`.windsurfrules`** 让 **Windsurf IDE** 掌握框架知识。

## 快速开始

```bash
skill-seekers scrape --target claude --config configs/react.json
cp output/react-claude/.windsurfrules ./
```

## 设置步骤

1. **生成规则：**
```bash
skill-seekers scrape --config configs/react.json --target claude
```

2. **复制到项目：**
```bash
cp output/react-claude/.windsurfrules ./my-project/
```

3. **重启 Windsurf**

## 功能特性

- ✅ **Codeium 驱动** - 原生 AI 集成
- ✅ **框架专业知识** - 上下文感知建议
- ✅ **Cascade 工作流** - 多步骤代码生成
- ⚠️ **12K 字符限制** - 每个文件

## 大型框架的解决方案

Windsurf 有 12K 字符限制。对于大型框架：
- 仅在 `.windsurfrules` 中保留核心概念
- 创建多个较小的文件
- 或使用 [Continue.dev](/docs/integrations/coding/continue)（无限制）

## 下一步

- [Cursor](/docs/integrations/coding/cursor) - 无限制
- [Continue.dev](/docs/integrations/coding/continue) - 通用插件
