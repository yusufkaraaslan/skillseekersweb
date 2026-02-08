---
title: Weaviate
description: 使用 Weaviate 进行企业级向量搜索——GraphQL 接口和模块化 AI。
section: integrations
subsection: rag
order: 6
---

# Weaviate

使用 **Weaviate** 进行企业级向量搜索——GraphQL 接口和模块化 AI。

## 快速开始

```bash
skill-seekers scrape --format weaviate --config configs/react.json
```

## 设置

```bash
pip install weaviate-client>=4.0.0
```

## Python 示例（v4 API）

```python
import weaviate
import json

# 连接本地 Weaviate
client = weaviate.connect_to_local()

# 加载数据
with open("output/react-weaviate.json") as f:
    data = json.load(f)

# 如果集合不存在则创建
from weaviate.classes.config import Configure, Property, DataType

if not client.collections.exists("ReactDoc"):
    client.collections.create(
        name="ReactDoc",
        vectorizer_config=Configure.Vectorizer.none(),  # 我们将提供向量
        properties=[
            Property(name="content", data_type=DataType.TEXT),
            Property(name="category", data_type=DataType.TEXT),
            Property(name="source", data_type=DataType.TEXT),
        ]
    )

# 获取集合
collection = client.collections.get("ReactDoc")

# 导入带有嵌入的数据
with collection.batch.dynamic() as batch:
    for item in data:
        batch.add_object(
            properties={
                "content": item["content"],
                "category": item.get("category", ""),
                "source": item.get("source", "")
            },
            vector=item["embedding"]
        )

client.close()
```

## 使用 v4 API 查询

```python
import weaviate

client = weaviate.connect_to_local()
collection = client.collections.get("ReactDoc")

# 向量搜索
response = collection.query.near_text(
    query="React Hooks",
    limit=3,
    return_properties=["content", "category", "source"]
)

for obj in response.objects:
    print(f"内容: {obj.properties['content'][:200]}...")
    print(f"类别: {obj.properties['category']}")
    print("---")

client.close()
```

## 混合搜索

```python
# 结合向量和关键词搜索
response = collection.query.hybrid(
    query="React Hooks useState",
    alpha=0.5,  # 向量与关键词之间的平衡
    limit=5,
    return_properties=["content", "category"]
)
```

## 功能特性

- ✅ **GraphQL 接口** - 灵活的查询
- ✅ **模块化 AI** - 选择您的向量化器
- ✅ **多租户** - 企业级安全
- ✅ **实时更新** - 即时更新
- ✅ **混合搜索** - 向量 + 关键词

## Weaviate Cloud

用于生产环境，使用 Weaviate Cloud：

```python
import weaviate

client = weaviate.connect_to_weaviate_cloud(
    cluster_url="https://your-cluster.weaviate.cloud",
    auth_credentials=weaviate.auth.AuthApiKey("your-api-key")
)
```

## 下一步

- [RAG 概览](/docs/integrations/rag) - 了解更多
- [LangChain](/docs/integrations/rag/langchain) - 与 LangChain 结合使用
