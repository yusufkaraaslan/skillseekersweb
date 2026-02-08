---
title: "从任何源到 RAG 管道只需 5 分钟"
description: "学习如何使用 Skill Seekers v3.0.0 将文档、GitHub 仓库、PDF 或代码库转换为 LangChain + Chroma RAG 管道"
pubDate: 2026-02-12
author: "Skill Seekers 团队"
authorTwitter: "@skillseekers"
tags: ["教程", "rag", "langchain", "chroma", "react"]
---

# 从任何源到 RAG 管道只需 5 分钟

在本教程中，您将学习如何将任何源转换为 RAG 管道：
1. 抓取 React 文档（或任何源）
2. 将其转换为 LangChain 文档
3. 存储在 Chroma 向量数据库中
4. 使用自然语言查询

## 先决条件

```bash
pip install skill-seekers langchain chromadb openai
```

## 第 1 步：抓取您的源

### 从文档
```bash
skill-seekers scrape --format langchain --config configs/react.json
```

### 从 GitHub 仓库
```bash
skill-seekers scrape --format langchain --github https://github.com/facebook/react
```

### 从 PDF
```bash
skill-seekers scrape --format langchain --pdf ./react-docs.pdf
```

### 从本地代码库
```bash
skill-seekers analyze --directory ./my-react-project --format langchain
```

这将：
- 从您选择的源提取内容
- 将页面转换为 LangChain 文档
- 保存到 `output/react-langchain/`

## 第 2 步：加载文档

```python
from skill_seekers.cli.adaptors import get_adaptor

adaptor = get_adaptor('langchain')
documents = adaptor.load_documents("output/react-langchain/")

print(f"加载了 {len(documents)} 个文档")
```

## 第 3 步：存储到 Chroma

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# 初始化嵌入
embeddings = OpenAIEmbeddings()

# 创建向量存储
vectorstore = Chroma.from_documents(
    documents, 
    embeddings,
    collection_name="react-docs",
    persist_directory="./chroma_db"
)

print("文档已存储到 Chroma！")
```

## 第 4 步：查询

```python
# 搜索 React hooks 信息
results = vectorstore.similarity_search("如何使用 useState？")
print(results[0].page_content)

# 带过滤器搜索
results = vectorstore.similarity_search(
    "useEffect 清理",
    filter={"category": "hooks"}
)
```

## 完整脚本

```python
#!/usr/bin/env python3
"""从任何源的 RAG 管道。"""

from skill_seekers.cli.adaptors import get_adaptor
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# 加载文档
adaptor = get_adaptor('langchain')
documents = adaptor.load_documents("output/react-langchain/")

# 存储到 Chroma
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents, 
    embeddings,
    collection_name="react-docs",
    persist_directory="./chroma_db"
)

# 查询
query = "如何使用 useState？"
results = vectorstore.similarity_search(query, k=3)

print(f"查询：{query}\n")
for i, doc in enumerate(results, 1):
    print(f"结果 {i}：")
    print(doc.page_content[:500] + "...")
    print()
```

## 高级：其他向量数据库

Skill Seekers v3.0.0 支持 6 种向量数据库：

```bash
# Weaviate
skill-seekers scrape --format weaviate --config react.json

# Qdrant
skill-seekers scrape --format qdrant --config react.json

# FAISS
skill-seekers scrape --format faiss --config react.json

# Pinecone（通过 Markdown 导出）
skill-seekers scrape --target markdown --config react.json
```

## 下一步

- 尝试使用 GitHub 仓库
- 处理 PDF 手册
- 分析您自己的代码库
- 试验不同的分块大小
- 添加元数据过滤
- 使用云存储部署到生产环境

就是这样！您现在拥有了一个适用于任何源的 RAG 管道。
