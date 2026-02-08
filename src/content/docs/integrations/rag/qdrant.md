---
title: Qdrant
description: High-performance vector search with Qdrant—Rust engine, advanced filtering.
section: integrations
subsection: rag
order: 7
---

# Qdrant

High-performance vector search with **Qdrant**—Rust engine, advanced filtering.

## Quick Start

```bash
skill-seekers scrape --format qdrant --config configs/react.json
```

## Setup

```bash
pip install qdrant-client
```

## Python Example

```python
from qdrant_client import QdrantClient
import json

# Connect
client = QdrantClient(host="localhost", port=6333)

# Load and upload
with open("output/react-qdrant.json") as f:
    data = json.load(f)
    
client.upsert(
    collection_name="react-docs",
    points=data
)
```

## Query

```python
from qdrant_client.models import Filter, FieldCondition, Match

# Search with filter
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

## Features

- ✅ **Rust engine** - High performance
- ✅ **Advanced filtering** - Complex queries
- ✅ **Payload indexing** - Fast metadata search
- ✅ **Self-hosted or cloud** - Flexible deployment
