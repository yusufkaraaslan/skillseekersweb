---
title: 什么是 Skill Seekers？
description: Skill Seekers 简介 — AI 系统的数据层。将 18 种源类型转换为结构化 AI 技能和 RAG 知识，支持 Claude、Gemini、OpenAI、LangChain、Cursor 等 12+ AI 平台。
section: about
order: 1
---

# 什么是 Skill Seekers？

**Skill Seekers** 是 **AI 系统的数据层**。它将 **18 种源类型** — 文档网站、GitHub 仓库、PDF、视频、Jupyter 笔记本、Word/EPUB 文档、OpenAPI 规范、Confluence wiki、Notion 页面等 — 转换为结构化 AI 技能和 RAG 就绪知识，支持 **12+ AI 平台**。

## 问题所在

构建真正理解某个领域的 AI 系统需要大量准备工作：

- **AI 技能开发**：70% 的时间花在预处理上 — 抓取文档、分析代码、提取模式
- **代码库入门**：理解新项目需要数周的手动分析
- **AI 助手专业知识**：没有手动上下文准备，通用 AI 响应缺乏深入的框架知识
- **多格式需求**：不同的 AI 系统需要不同的格式（技能、RAG、编码规则）

## 解决方案

Skill Seekers 自动化 AI 技能创建和知识预处理：

1. **提取** — 从 18 种源类型中的任何一种提取
2. **分析** — 跨 27+ 种语言的深度代码解析（AST 分析、模式检测、架构映射）
3. **增强** — 使用任何 AI 代理 — Claude、Kimi、Codex、Copilot、OpenCode 或自定义代理
4. **打包** — 导出到 12+ 输出平台
5. **部署** — 一条命令部署到任何 AI 系统

**结果：** 从任何来源到生产就绪的 AI 技能，只需 15-45 分钟。

## 17 种输入源

| # | 源 | CLI |
|---|-----|-----|
| 1 | 文档网站 | `skill-seekers create <url>` |
| 2 | GitHub 仓库 | `skill-seekers create owner/repo` |
| 3 | PDF 文件 | `skill-seekers create file.pdf` |
| 4 | 本地代码库 | `skill-seekers create ./path` |
| 5 | 视频 | `skill-seekers video --url <url>` |
| 6 | Word (.docx) | `skill-seekers create file.docx` |
| 7 | EPUB 电子书 | `skill-seekers create book.epub` |
| 8 | Jupyter 笔记本 | `skill-seekers create file.ipynb` |
| 9 | OpenAPI/Swagger | `skill-seekers create spec.yaml` |
| 10 | AsciiDoc | `skill-seekers create file.adoc` |
| 11 | PowerPoint | `skill-seekers create file.pptx` |
| 12 | 本地 HTML | `skill-seekers create file.html` |
| 13 | RSS/Atom 源 | `skill-seekers create feed.rss` |
| 14 | Man 手册 | `skill-seekers create curl.1` |
| 15 | Confluence | `skill-seekers confluence --space KEY` |
| 16 | Notion | `skill-seekers notion --database-id ID` |
| 17 | Slack/Discord | `skill-seekers chat --export-path dir/` |

## 12+ 输出平台

| 类别 | 平台 |
|------|------|
| **AI 技能** | Claude、Gemini、OpenAI、Kimi、DeepSeek、Qwen、OpenRouter、Together、Fireworks、MiniMax、OpenCode |
| **RAG/向量** | LangChain、LlamaIndex、Pinecone、Chroma、FAISS、Haystack、Qdrant、Weaviate |
| **AI 编码** | Cursor、Windsurf、Cline、Continue.dev、Roo、Aider、Bolt、Kilo |
| **通用** | Markdown、JSON、YAML |

## 版本

当前版本：**v3.5.0**（2026 年 4 月）

- 大一统 — 一个命令、直接转换器（v3.5.0）
- 代理无关架构（v3.5.0）
- 市场和配置发布（v3.5.0）
- 智能 SPA 发现引擎（v3.5.0）
- 默认启用所有内容提取功能（v3.5.0）
- 12 个 LLM 平台目标（v3.4.0）
- 21 张 UML 架构图（v3.4.0）
- 17 种源类型（v3.3.0）→ 18 种（v3.5.0）
- **3194+ 个测试通过**

## 快速示例

```bash
# 安装
pip install skill-seekers

# 从任何源创建技能
skill-seekers create https://react.dev --target claude
skill-seekers create facebook/react --target langchain
skill-seekers create manual.pdf --target openai

# 使用不同的 AI 代理
skill-seekers create https://react.dev --agent kimi

# 运行诊断
skill-seekers doctor
```

## 下一步

- [安装指南](/zh/docs/getting-started/installation) — 安装 Skill Seekers
- [你的第一个技能](/zh/docs/getting-started/first-skill) — 3 步创建你的第一个 AI 技能
- [功能概览](/zh/docs/about/features) — 探索所有功能
- [架构](/architecture) — 查看 21 张 UML 架构图

---

**开源** — MIT 许可证 | **社区驱动** — 欢迎贡献！
