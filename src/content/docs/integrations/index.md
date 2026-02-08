---
title: Integrations
description: Connect Skill Seekers to 16+ AI systems. RAG pipelines, AI coding assistants, and LLM platforms.
section: integrations
subsection: overview
order: 0
---

# Integrations

Connect Skill Seekers to **16+ AI systems** organized by use case.

## 🗂️ By Use Case

### 1. RAG & Knowledge Systems
Build production search and Q&A systems.

**RAG Frameworks:**
- [LangChain](/docs/integrations/rag/langchain) - Python RAG (most popular)
- [LlamaIndex](/docs/integrations/rag/llamaindex) - Query engines

**Vector Databases:**
- [Chroma](/docs/integrations/rag/chroma) - Local development
- [Pinecone](/docs/integrations/rag/pinecone) - Production cloud
- [Weaviate](/docs/integrations/rag/weaviate) - Enterprise/GraphQL
- [Qdrant](/docs/integrations/rag/qdrant) - High-performance
- [FAISS](/docs/integrations/rag/faiss) - GPU acceleration
- [Haystack](/docs/integrations/rag/haystack) - Enterprise NLP

[→ RAG Overview](/docs/integrations/rag)

---

### 2. AI Coding Assistants
Give your IDE framework expertise.

- [Cursor](/docs/integrations/coding/cursor) - VS Code fork (most popular)
- [Windsurf](/docs/integrations/coding/windsurf) - Codeium IDE
- [Cline](/docs/integrations/coding/cline) - VS Code + MCP
- [Continue.dev](/docs/integrations/coding/continue) - Universal plugin

[→ AI Coding Overview](/docs/integrations/coding)

---

## ⚡ Quick Selector

| I Want To... | Use This |
|--------------|----------|
| Build a Q&A bot | [LangChain](/docs/integrations/rag/langchain) + [Pinecone](/docs/integrations/rag/pinecone) |
| Make Cursor know React | [Cursor](/docs/integrations/coding/cursor) integration |
| Search my documentation | [LlamaIndex](/docs/integrations/rag/llamaindex) |
| Code with AI in JetBrains | [Continue.dev](/docs/integrations/coding/continue) |
| Production RAG pipeline | [Haystack](/docs/integrations/rag/haystack) |

## One Command, Any Integration

```bash
# Same source, different outputs
skill-seekers scrape --config react.json --format langchain
skill-seekers scrape --config react.json --format llama-index
skill-seekers scrape --config react.json --target claude  # For Cursor
```

## Tutorials

- [5-Min RAG Pipeline](/blog/2026-02-12-rag-tutorial)
- [Cursor Framework Guide](/blog/2026-02-14-ai-coding-guide)
