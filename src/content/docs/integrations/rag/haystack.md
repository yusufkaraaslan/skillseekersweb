---
title: Haystack
description: Enterprise RAG with Haystack 2.x—production NLP pipelines.
section: integrations
subsection: rag
order: 9
---

# Haystack

Enterprise RAG with **Haystack 2.x**—production NLP pipelines.

## Quick Start

```bash
skill-seekers scrape --format haystack --config configs/react.json
```

## Setup

```bash
pip install haystack-ai>=2.0.0
```

## Python Example (Haystack 2.x)

```python
from haystack import Document, Pipeline
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.components.retrievers import InMemoryBM25Retriever
from haystack.components.generators import OpenAIGenerator
from haystack.components.builders import PromptBuilder
import json

# Load documents from Skill Seekers output
def load_documents(output_dir):
    documents = []
    with open(f"{output_dir}/documents.json", "r") as f:
        data = json.load(f)
        for item in data:
            documents.append(Document(
                content=item["content"],
                meta=item.get("metadata", {})
            ))
    return documents

# Create document store and load documents
document_store = InMemoryDocumentStore()
docs = load_documents("output/react-haystack/")
document_store.write_documents(docs)

# Create RAG pipeline
prompt_template = """
Given these documents, answer the question.
Documents:
{% for doc in documents %}
  {{ doc.content }}
{% endfor %}

Question: {{question}}
Answer:
"""

retriever = InMemoryBM25Retriever(document_store=document_store)
prompt_builder = PromptBuilder(template=prompt_template)
llm = OpenAIGenerator(model="gpt-4o")

# Build pipeline
rag_pipeline = Pipeline()
rag_pipeline.add_component("retriever", retriever)
rag_pipeline.add_component("prompt_builder", prompt_builder)
rag_pipeline.add_component("llm", llm)

# Connect components
rag_pipeline.connect("retriever.documents", "prompt_builder.documents")
rag_pipeline.connect("prompt_builder.prompt", "llm.prompt")

# Query
result = rag_pipeline.run(
    {
        "retriever": {"query": "What are React Hooks?"},
        "prompt_builder": {"question": "What are React Hooks?"}
    }
)
print(result["llm"]["replies"][0])
```

## Embedding Retriever Example

For semantic search with embeddings:

```python
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.components.retrievers import InMemoryEmbeddingRetriever

# Create embedding retriever pipeline
embedding_pipeline = Pipeline()
embedding_pipeline.add_component("embedder", OpenAIDocumentEmbedder())
embedding_pipeline.add_component("retriever", InMemoryEmbeddingRetriever(document_store=document_store))

# First, embed documents
docs_with_embeddings = embedding_pipeline.run({"documents": docs})
document_store.write_documents(docs_with_embeddings["retriever"]["documents"])

# Query with embeddings
query_pipeline = Pipeline()
query_pipeline.add_component("text_embedder", OpenAITextEmbedder())
query_pipeline.add_component("retriever", InMemoryEmbeddingRetriever(document_store=document_store))
query_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")

result = query_pipeline.run({"text_embedder": {"text": "React Hooks"}})
for doc in result["retriever"]["documents"]:
    print(f"Score: {doc.score:.3f} - {doc.content[:200]}...")
```

## Features

- ✅ **Haystack 2.x** - Modern component-based architecture
- ✅ **Enterprise RAG** - Production pipelines
- ✅ **Multiple retrievers** - BM25, embedding, hybrid
- ✅ **Generator models** - OpenAI, Cohere, local models
- ✅ **Agent framework** - Complex workflows

## Next Steps

- [RAG Overview](/docs/integrations/rag) - Learn more
- [LangChain](/docs/integrations/rag/langchain) - Alternative framework
