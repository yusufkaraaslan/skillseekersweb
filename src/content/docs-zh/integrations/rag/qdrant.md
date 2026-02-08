---
title: Qdrant
description: 使用 Qdrant 进行高性能向量搜索——Rust 引擎，高级过滤。
section: integrations
subsection: rag
order: 7
---

# Qdrant

使用 **Qdrant** 进行高性能向量搜索——Rust 引擎，高级过滤。

## 快速开始

```bash
skill-seekers scrape --format qdrant --config configs/react.json
```

## 设置

```bash
pip install qdrant-client
```

## Python 示例

```python
from qdrant_client import QdrantClient
import json

# 连接
client = QdrantClient(host="localhost", port=6333)

# 加载并上传
with open("output/react-qdrant.json") as f:
    data = json.load(f)
    
client.upsert(
    collection_name="react-docs",
    points=data
)
```

## 查询

```python
from qdrant_client.models import Filter, FieldCondition, Match

# 带过滤的搜索
results = client.search(
    collection_name="react-docs",
    query_vector=embedding,
    query_filter=Filter(
        must=[FieldCondition(
            key="category",
            match=Match(value="api")
        )]
    ),
    limit=5
)
```

## 功能特性

- ✅ **Rust 引擎** - 高性能
- ✅ **高级过滤** - 复杂查询
- ✅ **Payload 索引** - 快速元数据搜索
- ✅ **自托管或云** - 灵活部署
