---
title: Cline
description: 支持 MCP 的 VS Code 扩展，用于高级 AI 编程。
section: integrations
subsection: coding
order: 13
---

# Cline

支持 **MCP** 的 **VS Code 扩展**，用于高级 AI 编程。

## 快速开始

```bash
skill-seekers scrape --target claude --config configs/react.json
cp output/react-claude/.clinerules ./
```

## 设置步骤

### 1. 安装 Cline
从 VS Code 扩展市场安装。

### 2. 生成规则
```bash
skill-seekers scrape --config configs/react.json --target claude
```

### 3. 复制规则
```bash
cp output/react-claude/.clinerules ./my-project/
```

### 4. MCP 设置（可选但推荐）
```bash
cd /path/to/Skill_Seekers
./setup_mcp.sh
```

这将在 Cline 中启用自然语言命令：
- "创建一个 React 组件技能"
- "抓取 Django 文档"

## 功能特性

- ✅ **VS Code 原生** - 无需切换 IDE
- ✅ **MCP 支持** - 26 个可用工具
- ✅ **无字符限制** - 完整的框架知识
- ✅ **多智能体** - Claude、GPT-4、本地模型

## MCP 命令

启用 MCP 后：
```
"从 Next.js 文档生成技能"
"分析这个 GitHub 仓库"
"从我的代码库中提取模式"
```

## 下一步

- [Continue.dev](/docs/integrations/coding/continue) - 在任何 IDE 中使用
- [MCP 设置](/docs/manual/mcp/setup) - 完整 MCP 指南
