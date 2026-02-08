---
title: FAISS
description: Facebook AI 相似性搜索——高性能本地向量搜索。
section: integrations
subsection: rag
order: 8
---

# FAISS

**Facebook AI 相似性搜索**——高性能本地向量搜索。

## 快速开始

```bash
skill-seekers scrape --format faiss --config configs/react.json
```

## 设置

```bash
pip install faiss-cpu  # 或 faiss-gpu
```

## Python 示例

```python
import faiss
import numpy as np
import json

# 加载数据
with open("output/react-faiss.json") as f:
    data = json.load(f)

# 构建索引
dimension = 1536  # OpenAI 嵌入大小
index = faiss.IndexFlatL2(dimension)

# 添加向量
vectors = np.array([d['vector'] for d in data]).astype('float32')
index.add(vectors)

# 搜索
query = np.random.random((1, dimension)).astype('float32')
distances, indices = index.search(query, k=5)

print(f"最近邻: {indices[0]}")
```

## 功能特性

- ✅ **本地且快速** - 无网络延迟
- ✅ **GPU 支持** - CUDA 加速
- ✅ **多种索引** - IVF、HNSW 等
- ✅ **数十亿向量** - 可扩展架构
