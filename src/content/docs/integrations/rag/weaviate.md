---
title: Weaviate
description: Enterprise vector search with Weaviate—GraphQL interface and modular AI.
section: integrations
subsection: rag
order: 6
---

# Weaviate

Enterprise vector search with **Weaviate**—GraphQL interface and modular AI.

## Quick Start

```bash
skill-seekers scrape --format weaviate --config configs/react.json
```

## Setup

```bash
pip install weaviate-client>=4.0.0
```

## Python Example (v4 API)

```python
import weaviate
import json

# Connect to local Weaviate
client = weaviate.connect_to_local()

# Load data
with open("output/react-weaviate.json") as f:
    data = json.load(f)

# Create collection if it doesn't exist
from weaviate.classes.config import Configure, Property, DataType

if not client.collections.exists("ReactDoc"):
    client.collections.create(
        name="ReactDoc",
        vectorizer_config=Configure.Vectorizer.none(),  # We'll provide vectors
        properties=[
            Property(name="content", data_type=DataType.TEXT),
            Property(name="category", data_type=DataType.TEXT),
            Property(name="source", data_type=DataType.TEXT),
        ]
    )

# Get collection
collection = client.collections.get("ReactDoc")

# Import data with embeddings
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

## Query with v4 API

```python
import weaviate

client = weaviate.connect_to_local()
collection = client.collections.get("ReactDoc")

# Vector search
response = collection.query.near_text(
    query="React Hooks",
    limit=3,
    return_properties=["content", "category", "source"]
)

for obj in response.objects:
    print(f"Content: {obj.properties['content'][:200]}...")
    print(f"Category: {obj.properties['category']}")
    print("---")

client.close()
```

## Hybrid Search

```python
# Combine vector and keyword search
response = collection.query.hybrid(
    query="React Hooks useState",
    alpha=0.5,  # Balance between vector and keyword
    limit=5,
    return_properties=["content", "category"]
)
```

## Features

- ✅ **GraphQL interface** - Flexible queries
- ✅ **Modular AI** - Choose your vectorizer
- ✅ **Multi-tenancy** - Enterprise security
- ✅ **Real-time** - Instant updates
- ✅ **Hybrid search** - Vector + keyword

## Weaviate Cloud

For production, use Weaviate Cloud:

```python
import weaviate

client = weaviate.connect_to_weaviate_cloud(
    cluster_url="https://your-cluster.weaviate.cloud",
    auth_credentials=weaviate.auth.AuthApiKey("your-api-key")
)
```

## Next Steps

- [RAG Overview](/docs/integrations/rag) - Learn more
- [LangChain](/docs/integrations/rag/langchain) - Combine with LangChain
