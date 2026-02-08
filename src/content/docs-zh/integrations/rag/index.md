---
title: RAG 与向量数据库
description: 使用 LangChain、LlamaIndex 和向量数据库构建生产级 RAG 系统。将任何来源转换为可搜索的知识库。
section: integrations
subsection: rag
order: 0
---

# RAG 与向量数据库

构建**生产级 RAG 系统**，将任何来源转换为可搜索的知识库。

## 什么是 RAG？

**检索增强生成（Retrieval-Augmented Generation）** = 向量数据库 + 检索 + 大语言模型

**问题所在：** 70% 的 RAG 开发时间都花在数据预处理上。

**解决方案：** Skill Seekers 自动化整个流程——提取、分块、嵌入、存储。

## 快速选择器

| 您的目标 | 集成方案 | 最佳适用场景 |
|-----------|-------------|----------|
| Python RAG 管道 | [LangChain](/docs/integrations/rag/langchain) | 最流行，灵活易用 |
| 查询/聊天引擎 | [LlamaIndex](/docs/integrations/rag/llamaindex) | 专注文档问答 |
| 本地开发 | [Chroma](/docs/integrations/rag/chroma) | 易于设置，内置嵌入 |
| 生产云环境 | [Pinecone](/docs/integrations/rag/pinecone) | 无服务器，可扩展 |
| 企业自托管 | [Weaviate](/docs/integrations/rag/weaviate) | GraphQL，模块化 AI |
| 高性能需求 | [Qdrant](/docs/integrations/rag/qdrant) | Rust 引擎，支持过滤 |
| GPU 加速 | [FAISS](/docs/integrations/rag/faiss) | Facebook AI，支持数十亿向量 |
| 企业级 NLP | [Haystack](/docs/integrations/rag/haystack) | 管道化，代理框架 |

## 一条命令，任意来源

```bash
# 从文档获取
skill-seekers scrape --format langchain --config react.json

# 从 GitHub 仓库获取
skill-seekers scrape --format langchain --github owner/repo

# 从 PDF 获取
skill-seekers scrape --format langchain --pdf manual.pdf

# 从代码库获取
skill-seekers analyze --format langchain --directory ./project
```

## 工作原理

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌─────────┐
│   来源      │────▶│Skill Seekers │────▶│ 向量数据库   │────▶│  大语言模型 │
│(任意来源)   │     │(分块/嵌入)   │     │(Pinecone/  │     │(生成答案)  │
└─────────────┘     └──────────────┘     │ Chroma 等)  │     └─────────┘
                                          └─────────────┘
```

## 教程

[5 分钟构建 RAG 管道 →](/blog/2026-02-12-rag-tutorial)

## 下一步

- [LangChain](/docs/integrations/rag/langchain) - 开始使用 Python 构建 RAG
- [选择向量数据库](/docs/integrations/rag/chroma) - 存储您的嵌入向量
