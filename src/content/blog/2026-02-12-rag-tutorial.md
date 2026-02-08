---
title: "From Any Source to RAG Pipeline in 5 Minutes"
description: "Learn how to transform documentation, GitHub repos, PDFs, or codebases into a LangChain + Chroma RAG pipeline with Skill Seekers v3.0.0"
pubDate: 2026-02-12
author: "Skill Seekers Team"
authorTwitter: "@skillseekers"
tags: ["tutorial", "rag", "langchain", "chroma", "react"]
---

# From Any Source to RAG Pipeline in 5 Minutes

In this tutorial, you'll learn how to transform any source into a RAG pipeline:
1. Scrape React documentation (or any source)
2. Convert it to LangChain Documents
3. Store in Chroma vector database
4. Query with natural language

## Prerequisites

```bash
pip install skill-seekers langchain chromadb openai
```

## Step 1: Scrape Your Source

### From Documentation
```bash
skill-seekers scrape --format langchain --config configs/react.json
```

### From GitHub Repository
```bash
skill-seekers scrape --format langchain --github https://github.com/facebook/react
```

### From PDF
```bash
skill-seekers scrape --format langchain --pdf ./react-docs.pdf
```

### From Local Codebase
```bash
skill-seekers analyze --directory ./my-react-project --format langchain
```

This will:
- Extract content from your chosen source
- Convert pages to LangChain Documents
- Save to `output/react-langchain/`

## Step 2: Load Documents

```python
from skill_seekers.cli.adaptors import get_adaptor

adaptor = get_adaptor('langchain')
documents = adaptor.load_documents("output/react-langchain/")

print(f"Loaded {len(documents)} documents")
```

## Step 3: Store in Chroma

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# Initialize embeddings
embeddings = OpenAIEmbeddings()

# Create vector store
vectorstore = Chroma.from_documents(
    documents, 
    embeddings,
    collection_name="react-docs",
    persist_directory="./chroma_db"
)

print("Documents stored in Chroma!")
```

## Step 4: Query

```python
# Search for React hooks information
results = vectorstore.similarity_search("How do I use useState?")
print(results[0].page_content)

# Search with filter
results = vectorstore.similarity_search(
    "useEffect cleanup",
    filter={"category": "hooks"}
)
```

## Complete Script

```python
#!/usr/bin/env python3
"""RAG pipeline from any source."""

from skill_seekers.cli.adaptors import get_adaptor
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# Load documents
adaptor = get_adaptor('langchain')
documents = adaptor.load_documents("output/react-langchain/")

# Store in Chroma
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents, 
    embeddings,
    collection_name="react-docs",
    persist_directory="./chroma_db"
)

# Query
query = "How do I use useState?"
results = vectorstore.similarity_search(query, k=3)

print(f"Query: {query}\n")
for i, doc in enumerate(results, 1):
    print(f"Result {i}:")
    print(doc.page_content[:500] + "...")
    print()
```

## Advanced: Other Vector Databases

Skill Seekers v3.0.0 supports 6 vector databases:

```bash
# Weaviate
skill-seekers scrape --format weaviate --config react.json

# Qdrant
skill-seekers scrape --format qdrant --config react.json

# FAISS
skill-seekers scrape --format faiss --config react.json

# Pinecone (via Markdown export)
skill-seekers scrape --target markdown --config react.json
```

## Next Steps

- Try with GitHub repositories
- Process PDF manuals
- Analyze your own codebase
- Experiment with different chunk sizes
- Add metadata filtering
- Deploy to production with cloud storage

That's it! You now have a RAG pipeline that works with any source.
