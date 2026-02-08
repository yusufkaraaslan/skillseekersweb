---
title: LangChain
description: 将任何来源转换为用于 RAG 流水线的 LangChain 文档。
section: integrations
subsection: rag
order: 2
---

# LangChain

将任何来源转换为用于 RAG 流水线的 **LangChain 文档**。

## 快速开始

```bash
# 从文档获取
skill-seekers scrape --format langchain --config configs/react.json

# 从 GitHub 仓库获取
skill-seekers scrape --format langchain --github https://github.com/facebook/react

# 从 PDF 获取
skill-seekers scrape --format langchain --pdf ./manual.pdf

# 从本地代码库获取
skill-seekers analyze --directory ./my-project --format langchain
```

## 您会得到什么

- 完整的元数据的 **LangChain Document 对象**
- **分类内容**（API、指南、教程等）
- **来源追踪**（URL、文件路径、章节）
- 带有语言检测的 **代码示例**
- 用于过滤和检索的 **丰富元数据**

## Python 示例

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.schema import Document
import json

# 从 Skill Seekers 输出加载文档
def load_documents(output_dir):
    """从 Skill Seekers LangChain 输出加载文档。"""
    documents = []
    with open(f"{output_dir}/documents.json", "r") as f:
        data = json.load(f)
        for doc in data:
            documents.append(Document(
                page_content=doc["content"],
                metadata=doc["metadata"]
            ))
    return documents

# 加载文档
documents = load_documents("output/react-langchain/")
print(f"已加载 {len(documents)} 个文档")

# 创建向量存储
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents,
    embeddings,
    collection_name="react-docs"
)

# 查询
results = vectorstore.similarity_search("How do I use useState?")
print(results[0].page_content)
```

## 文档结构

每个文档包含：

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

## 完整的 RAG 流水线

```python
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

# 使用现代 ChatOpenAI 创建 QA 链
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4o"),
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# 提问
response = qa_chain.invoke({"query": "What are React Hooks?"})
print(response["result"])
```

## 下一步

- [Chroma](/docs/integrations/rag/chroma) - 本地向量存储
- [Pinecone](/docs/integrations/rag/pinecone) - 生产级云服务
- [RAG 教程](/blog/2026-02-12-rag-tutorial) - 5 分钟入门指南
