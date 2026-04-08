---
title: 功能概览
description: Skill Seekers v3.5.0 功能完整概览 — 17 种源类型、12+ AI 平台、代理无关增强、市场发布、40 个 MCP 工具和 UML 架构
section: about
order: 2
---

# 功能概览

Skill Seekers v3.5.0 是一个综合工具包，用于将任何知识来源转换为结构化 AI 技能和 RAG 就绪知识。

## 输入源（17 种类型）

### 文档抓取
- **HTML 网站** — 抓取任何文档站点（React、Vue、Django、Godot 等）
- **智能 SPA 发现**（v3.5.0）— 三层引擎：sitemap.xml、llms.txt 和浏览器渲染
- **浏览器渲染**（v3.5.0）— 基于 Playwright 的 SPA 站点渲染
- **无限页面** — 无页面限制，处理 40K+ 页面文档站点

### GitHub 仓库分析
- **无限本地分析** — 无 API 速率限制（v3.5.0 移除了 50 文件限制）
- **三流获取器** — 代码 + 文档 + 问题流
- **C3.x 深度分析** — 跨 27+ 种语言的 AST 解析，包括 Kotlin（v3.5.0）

### PDF 和文档提取
- **PDF** — OCR 后备的文本提取
- **Word (.docx)**（v3.2.0）— 完整文档提取
- **EPUB**（v3.3.0）— 章节提取、DRM 检测
- **PowerPoint (.pptx)**（v3.3.0）— 幻灯片文本、演讲稿、代码块检测
- **AsciiDoc**（v3.3.0）— 标题、代码块、表格、提示

### 媒体和 API 源
- **视频**（v3.2.0）— YouTube 和本地视频提取
- **Jupyter 笔记本**（v3.3.0）— 代码单元格、输出、Markdown
- **OpenAPI/Swagger**（v3.3.0）— 端点提取、模式解析
- **RSS/Atom 源**（v3.3.0）— 文章提取
- **本地 HTML**（v3.3.0）— 智能内容检测
- **Man 手册**（v3.3.0）— 结构化章节解析

### 协作和 Wiki 源
- **Confluence**（v3.3.0）— REST API 或 HTML 导出
- **Notion**（v3.3.0）— API 或 Markdown 导出
- **Slack/Discord**（v3.3.0）— 工作区导出或实时 API

## 输出平台（12+）

| 类别 | 平台 |
|------|------|
| **AI 技能** | Claude、Gemini、OpenAI、Kimi、DeepSeek、Qwen、OpenRouter、Together、Fireworks、MiniMax、OpenCode |
| **RAG/向量** | LangChain、LlamaIndex、Pinecone、Chroma、FAISS、Haystack、Qdrant、Weaviate |
| **AI 编码** | Cursor、Windsurf、Cline、Continue.dev、Roo、Aider、Bolt、Kilo |
| **通用** | Markdown、JSON、YAML |

## 代理无关增强（v3.5.0）

所有 5 个增强器通过统一的 `AgentClient` 支持多个 AI 代理：

```bash
skill-seekers create https://react.dev --agent kimi
skill-seekers create https://react.dev --agent codex
skill-seekers create https://react.dev --agent-cmd "my-custom-agent run"
```

## MCP 集成（40 个工具）

跨 10 个类别的 40 个 MCP 工具，支持 Claude Code Desktop、Cursor 和其他代理。

## 架构文档（v3.4.0）

- **21 张 UML 图** — 类图、序列图、活动图、组件图
- [查看架构图](/architecture)
- [完整 API 参考](/api-docs)

## 质量和测试

- **3194+ 个测试通过**
- 涵盖所有 17 种源类型的全面覆盖
