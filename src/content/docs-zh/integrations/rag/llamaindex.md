---
title: LlamaIndex
description: 将任何来源转换为用于查询引擎和聊天机器人的 LlamaIndex TextNodes。
section: integrations
subsection: rag
order: 3
---

# LlamaIndex

将任何来源转换为用于查询引擎和聊天机器人的 **LlamaIndex TextNodes**。

## 快速开始

```bash
# 从任何来源获取
skill-seekers scrape --format llama-index --config configs/react.json
```

## 您会得到什么

- **LlamaIndex TextNode 对象**
- 带有重叠的**自动文本分割**
- **节点关系**（父/子）
- 用于过滤的**元数据**

## Python 示例

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 加载文档
reader = SimpleDirectoryReader("output/react-llama-index/")
documents = reader.load_data()

# 创建索引
index = VectorStoreIndex.from_documents(documents)

# 创建查询引擎
query_engine = index.as_query_engine()

# 查询
response = query_engine.query("What are React Hooks?")
print(response)
```

## 聊天引擎

```python
# 直接从索引访问聊天引擎
chat_engine = index.as_chat_engine()
response = chat_engine.chat("Explain useEffect")
print(response)
```

## 下一步

- [向量数据库](/docs/integrations/rag/chroma) - 存储您的索引
- [RAG 教程](/blog/2026-02-12-rag-tutorial) - 完整示例
