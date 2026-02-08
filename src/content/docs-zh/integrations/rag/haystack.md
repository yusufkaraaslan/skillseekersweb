---
title: Haystack
description: 使用 Haystack 2.x 进行企业级 RAG——生产 NLP 流水线。
section: integrations
subsection: rag
order: 9
---

# Haystack

使用 **Haystack 2.x** 进行企业级 RAG——生产 NLP 流水线。

## 快速开始

```bash
skill-seekers scrape --format haystack --config configs/react.json
```

## 设置

```bash
pip install haystack-ai>=2.0.0
```

## Python 示例（Haystack 2.x）

```python
from haystack import Document, Pipeline
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.components.retrievers import InMemoryBM25Retriever
from haystack.components.generators import OpenAIGenerator
from haystack.components.builders import PromptBuilder
import json

# 从 Skill Seekers 输出加载文档
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

# 创建文档存储并加载文档
document_store = InMemoryDocumentStore()
docs = load_documents("output/react-haystack/")
document_store.write_documents(docs)

# 创建 RAG 流水线
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

# 构建流水线
rag_pipeline = Pipeline()
rag_pipeline.add_component("retriever", retriever)
rag_pipeline.add_component("prompt_builder", prompt_builder)
rag_pipeline.add_component("llm", llm)

# 连接组件
rag_pipeline.connect("retriever.documents", "prompt_builder.documents")
rag_pipeline.connect("prompt_builder.prompt", "llm.prompt")

# 查询
result = rag_pipeline.run(
    {
        "retriever": {"query": "What are React Hooks?"},
        "prompt_builder": {"question": "What are React Hooks?"}
    }
)
print(result["llm"]["replies"][0])
```

## 嵌入检索器示例

用于带有嵌入的语义搜索：

```python
from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
from haystack.components.retrievers import InMemoryEmbeddingRetriever

# 创建嵌入检索器流水线
embedding_pipeline = Pipeline()
embedding_pipeline.add_component("embedder", OpenAIDocumentEmbedder())
embedding_pipeline.add_component("retriever", InMemoryEmbeddingRetriever(document_store=document_store))

# 首先，嵌入文档
docs_with_embeddings = embedding_pipeline.run({"documents": docs})
document_store.write_documents(docs_with_embeddings["retriever"]["documents"])

# 使用嵌入查询
query_pipeline = Pipeline()
query_pipeline.add_component("text_embedder", OpenAITextEmbedder())
query_pipeline.add_component("retriever", InMemoryEmbeddingRetriever(document_store=document_store))
query_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")

result = query_pipeline.run({"text_embedder": {"text": "React Hooks"}})
for doc in result["retriever"]["documents"]:
    print(f"分数: {doc.score:.3f} - {doc.content[:200]}...")
```

## 功能特性

- ✅ **Haystack 2.x** - 现代基于组件的架构
- ✅ **企业级 RAG** - 生产流水线
- ✅ **多种检索器** - BM25、嵌入、混合
- ✅ **生成器模型** - OpenAI、Cohere、本地模型
- ✅ **智能体框架** - 复杂工作流

## 下一步

- [RAG 概览](/docs/integrations/rag) - 了解更多
- [LangChain](/docs/integrations/rag/langchain) - 替代框架
