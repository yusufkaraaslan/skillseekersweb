---
title: Chroma
description: Direct export to Chroma vector database for local development.
section: integrations
subsection: rag
order: 4
---

# Chroma

Direct export to **Chroma** vector database—perfect for local development.

## Quick Start

```bash
skill-seekers scrape --format chroma --config configs/react.json
```

## Features

- ✅ **Local vector storage** - No cloud required
- ✅ **Embeddings included** - Uses default embedding model
- ✅ **Metadata filtering** - Filter by category, source, language
- ✅ **Persistent storage** - Data saved between sessions

## Python Example

```python
import chromadb

# Connect to Chroma
client = chromadb.PersistentClient(path="./chroma_db")

# Get collection
collection = client.get_collection("react-docs")

# Query
results = collection.query(
    query_texts=["How do I use useState?"],
    n_results=3
)

print(results['documents'][0])
```

## With LangChain

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

vectorstore = Chroma(
    collection_name="react-docs",
    embedding_function=OpenAIEmbeddings(),
    persist_directory="./chroma_db"
)

results = vectorstore.similarity_search("React Hooks")
```

## Next Steps

- [LangChain](/docs/integrations/rag/langchain) - Combine with LangChain
- [Pinecone](/docs/integrations/rag/pinecone) - For production
