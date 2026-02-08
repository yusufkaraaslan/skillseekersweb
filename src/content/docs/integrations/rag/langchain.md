---
title: LangChain
description: Transform any source into LangChain Documents for RAG pipelines.
section: integrations
subsection: rag
order: 2
---

# LangChain

Transform any source into **LangChain Documents** for RAG pipelines.

## Quick Start

```bash
# From documentation
skill-seekers scrape --format langchain --config configs/react.json

# From GitHub repo
skill-seekers scrape --format langchain --github https://github.com/facebook/react

# From PDF
skill-seekers scrape --format langchain --pdf ./manual.pdf

# From local codebase
skill-seekers analyze --directory ./my-project --format langchain
```

## What You Get

- **LangChain Document objects** with full metadata
- **Categorized content** (API, Guide, Tutorial, etc.)
- **Source tracking** (URL, file path, section)
- **Code examples** with language detection
- **Rich metadata** for filtering and retrieval

## Python Example

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.schema import Document
import json

# Load documents from Skill Seekers output
def load_documents(output_dir):
    """Load documents from Skill Seekers LangChain output."""
    documents = []
    with open(f"{output_dir}/documents.json", "r") as f:
        data = json.load(f)
        for doc in data:
            documents.append(Document(
                page_content=doc["content"],
                metadata=doc["metadata"]
            ))
    return documents

# Load documents
documents = load_documents("output/react-langchain/")
print(f"Loaded {len(documents)} documents")

# Create vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents,
    embeddings,
    collection_name="react-docs"
)

# Query
results = vectorstore.similarity_search("How do I use useState?")
print(results[0].page_content)
```

## Document Structure

Each document includes:

```python
{
  "page_content": "...",
  "metadata": {
    "source": "https://react.dev/docs/hooks-intro",
    "title": "Introducing Hooks",
    "category": "api",
    "language": "javascript"
  }
}
```

## Complete RAG Pipeline

```python
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

# Create QA chain with modern ChatOpenAI
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o"),
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# Ask questions
response = qa_chain.invoke({"query": "What are React Hooks?"})
print(response["result"])
```

## Next Steps

- [Chroma](/docs/integrations/rag/chroma) - Local vector storage
- [Pinecone](/docs/integrations/rag/pinecone) - Production cloud
- [RAG Tutorial](/blog/2026-02-12-rag-tutorial) - 5-minute walkthrough
