---
title: 集成
description: 将 Skill Seekers 连接至 16+ AI 系统。RAG 管道、AI 编程助手和 LLM 平台。
section: integrations
order: 0
---

# 集成

将 Skill Seekers 连接至 **16+ AI 系统**，按使用场景分类整理。

## 🗂️ 按使用场景分类

### 1. RAG 与知识系统
构建生产级搜索和问答系统。

**RAG 框架：**
- [LangChain](/docs/integrations/langchain) - Python RAG（最受欢迎）
- [LlamaIndex](/docs/integrations/llamaindex) - 查询引擎

**向量数据库：**
- [Chroma](/docs/integrations/chroma) - 本地开发
- [Pinecone](/docs/integrations/pinecone) - 生产云环境
- [Weaviate](/docs/integrations/weaviate) - 企业级/GraphQL
- [Qdrant](/docs/integrations/qdrant) - 高性能
- [FAISS](/docs/integrations/faiss) - GPU 加速
- [Haystack](/docs/integrations/haystack) - 企业级 NLP

[→ RAG 概述](/docs/integrations/rag)

---

### 2. AI 编程助手
为您的 IDE 注入框架专业知识。

- [Cursor](/docs/integrations/cursor) - VS Code 分支（最受欢迎）
- [Windsurf](/docs/integrations/windsurf) - Codeium IDE
- [Cline](/docs/integrations/cline) - VS Code + MCP
- [Continue.dev](/docs/integrations/continue) - 通用插件

[→ AI 编程概述](/docs/integrations/coding)

---

## ⚡ 快速选择器

| 我想要... | 使用这个 |
|--------------|----------|
| 构建问答机器人 | [LangChain](/docs/integrations/langchain) + [Pinecone](/docs/integrations/pinecone) |
| 让 Cursor 了解 React | [Cursor](/docs/integrations/cursor) 集成 |
| 搜索我的文档 | [LlamaIndex](/docs/integrations/llamaindex) |
| 在 JetBrains 中使用 AI 编程 | [Continue.dev](/docs/integrations/continue) |
| 生产级 RAG 管道 | [Haystack](/docs/integrations/haystack) |

## 一条命令，任意集成

```bash
# 相同来源，不同输出
skill-seekers scrape --config react.json --format langchain
skill-seekers scrape --config react.json --format llama-index
skill-seekers scrape --config react.json --target claude  # 用于 Cursor
```

## 教程

- [5 分钟 RAG 管道](/blog/2026-02-12-rag-tutorial)
- [Cursor 框架指南](/blog/2026-02-14-ai-coding-guide)
