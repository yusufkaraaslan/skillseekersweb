---
title: Pinecone
description: Production-ready vector search with Pinecone cloud database.
section: integrations
subsection: rag
order: 5
---

# Pinecone

Production-ready vector search with **Pinecone** cloud database.

## Quick Start

```bash
skill-seekers scrape --format pinecone --config configs/react.json
```

## Setup

1. **Get API Key** from [Pinecone Console](https://app.pinecone.io)

2. **Install dependencies:**
```bash
pip install pinecone-client
```

3. **Upload to Pinecone:**
```python
from pinecone import Pinecone, ServerlessSpec
import json

# Initialize
pc = Pinecone(api_key="your-api-key")

# Create index
index = pc.Index("react-docs")

# Load and upsert data
with open("output/react-pinecone.json") as f:
    data = json.load(f)
    
index.upsert(vectors=data)
```

## Features

- ✅ **Serverless** - Pay only for what you use
- ✅ **Metadata filtering** - Filter by category, source
- ✅ **Hybrid search** - Combine semantic + keyword
- ✅ **High availability** - Production-ready SLA

## Query Example

```python
# Query
results = index.query(
    vector=embedding,
    top_k=5,
    filter={"category": "api"}
)
```

## Next Steps

- [RAG Pipelines](/docs/integrations/rag) - Complete examples
- [Production Deployment](/docs/deployments/production) - Best practices
