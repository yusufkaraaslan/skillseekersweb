---
title: LlamaIndex
description: Transform any source into LlamaIndex TextNodes for query engines and chatbots.
section: integrations
subsection: rag
order: 3
---

# LlamaIndex

Transform any source into **LlamaIndex TextNodes** for query engines and chatbots.

## Quick Start

```bash
# From any source
skill-seekers scrape --format llama-index --config configs/react.json
```

## What You Get

- **LlamaIndex TextNode objects**
- **Automatic text splitting** with overlap
- **Node relationships** (parent/child)
- **Metadata for filtering**

## Python Example

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# Load documents
reader = SimpleDirectoryReader("output/react-llama-index/")
documents = reader.load_data()

# Create index
index = VectorStoreIndex.from_documents(documents)

# Create query engine
query_engine = index.as_query_engine()

# Query
response = query_engine.query("What are React Hooks?")
print(response)
```

## Chat Engine

```python
# Chat engine is accessed directly from the index
chat_engine = index.as_chat_engine()
response = chat_engine.chat("Explain useEffect")
print(response)
```

## Next Steps

- [Vector Databases](/docs/integrations/rag/chroma) - Store your index
- [RAG Tutorial](/blog/2026-02-12-rag-tutorial) - Complete example
