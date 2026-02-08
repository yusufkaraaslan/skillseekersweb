---
title: FAISS
description: Facebook AI Similarity Search—high-performance local vector search.
section: integrations
subsection: rag
order: 8
---

# FAISS

**Facebook AI Similarity Search**—high-performance local vector search.

## Quick Start

```bash
skill-seekers scrape --format faiss --config configs/react.json
```

## Setup

```bash
pip install faiss-cpu  # or faiss-gpu
```

## Python Example

```python
import faiss
import numpy as np
import json

# Load data
with open("output/react-faiss.json") as f:
    data = json.load(f)

# Build index
dimension = 1536  # OpenAI embedding size
index = faiss.IndexFlatL2(dimension)

# Add vectors
vectors = np.array([d['vector'] for d in data]).astype('float32')
index.add(vectors)

# Search
query = np.random.random((1, dimension)).astype('float32')
distances, indices = index.search(query, k=5)

print(f"Nearest neighbors: {indices[0]}")
```

## Features

- ✅ **Local & fast** - No network latency
- ✅ **GPU support** - CUDA acceleration
- ✅ **Multiple indices** - IVF, HNSW, etc.
- ✅ **Billions of vectors** - Scalable architecture
