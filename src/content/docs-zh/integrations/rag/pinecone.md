---
title: Pinecone
description: 使用 Pinecone 云数据库进行生产级向量搜索。
section: integrations
subsection: rag
order: 5
---

# Pinecone

使用 **Pinecone** 云数据库进行生产级向量搜索。

## 快速开始

```bash
skill-seekers scrape --format pinecone --config configs/react.json
```

## 设置

1. 从 [Pinecone 控制台](https://app.pinecone.io) 获取 API 密钥

2. **安装依赖：**
```bash
pip install pinecone-client
```

3. **上传到 Pinecone：**
```python
from pinecone import Pinecone, ServerlessSpec
import json

# 初始化
pc = Pinecone(api_key="your-api-key")

# 创建索引
index = pc.Index("react-docs")

# 加载并插入数据
with open("output/react-pinecone.json") as f:
    data = json.load(f)
    
index.upsert(vectors=data)
```

## 功能特性

- ✅ **无服务器** - 按需付费
- ✅ **元数据过滤** - 按类别、来源过滤
- ✅ **混合搜索** - 结合语义和关键词
- ✅ **高可用性** - 生产级 SLA

## 查询示例

```python
# 查询
results = index.query(
    vector=embedding,
    top_k=5,
    filter={"category": "api"}
)
```

## 下一步

- [RAG 流水线](/docs/integrations/rag) - 完整示例
- [生产部署](/docs/deployments/production) - 最佳实践
