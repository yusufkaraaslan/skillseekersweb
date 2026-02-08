---
title: Chroma
description: 直接导出到 Chroma 向量数据库，适用于本地开发。
section: integrations
subsection: rag
order: 4
---

# Chroma

直接导出到 **Chroma** 向量数据库——非常适合本地开发。

## 快速开始

```bash
skill-seekers scrape --format chroma --config configs/react.json
```

## 功能特性

- ✅ **本地向量存储** - 无需云服务
- ✅ **包含嵌入** - 使用默认嵌入模型
- ✅ **元数据过滤** - 按类别、来源、语言过滤
- ✅ **持久化存储** - 会话间数据保存

## Python 示例

```python
import chromadb

# 连接 Chroma
client = chromadb.PersistentClient(path="./chroma_db")

# 获取集合
collection = client.get_collection("react-docs")

# 查询
results = collection.query(
    query_texts=["How do I use useState?"],
    n_results=3
)

print(results['documents'][0])
```

## 与 LangChain 配合使用

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

vectorstore = Chroma(
    collection_name="react-docs",
    embedding_function=OpenAIEmbeddings(),
    persist_directory="./chroma_db"
)

results = vectorstore.similarity_search("React Hooks")
```

## 下一步

- [LangChain](/docs/integrations/rag/langchain) - 与 LangChain 结合使用
- [Pinecone](/docs/integrations/rag/pinecone) - 用于生产环境
