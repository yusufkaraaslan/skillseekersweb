---
title: 概览
description: 了解 Skill Seekers 是什么以及它如何将文档、GitHub 仓库、PDF 和代码库转换为适用于任何 AI 系统的结构化知识
section: getting-started
order: 1
---

# 什么是 Skill Seekers？

Skill Seekers 是**AI 系统的通用预处理器**。它将**文档网站、GitHub 仓库、PDF 文件和本地代码库**转换为适用于 RAG 管道、AI 编码助手、Claude 技能和任何 LLM 平台的结构化知识。

**70% 的 RAG 开发时间花在数据预处理上**——抓取、清理、分块和结构化文档。**我们将其全部自动化。**

无需手动预处理数据，Skill Seekers：

1. **提取**自任何源——文档、GitHub 仓库、PDF、本地代码库
2. **分析**使用深度解析（代码使用 AST，PDF 使用 OCR，语义分块）
3. **检测**文档和代码实现之间的冲突
4. **组织**内容为分类的参考文件，带有丰富的元数据
5. **增强**使用 AI 提取最佳示例和关键概念
6. **打包**为 16+ 种格式适用于任何 AI 系统

**结果：**生产就绪的 AI 知识只需 15-45 分钟，而不是数天的手动工作。

## 为什么使用 Skill Seekers？

### 为 RAG 构建者和 AI 工程师
- 🤖 **RAG 系统**：构建生产级 Q&A 机器人、聊天机器人、文档门户
- 🚀 **速度快 99%**：数天的预处理 → 15-45 分钟
- ✅ **经过实战检验**：1,852 个测试，24+ 框架预设，生产就绪
- 🔄 **多源**：自动组合文档 + GitHub + PDF + 代码库
- 🌐 **平台无关**：导出到 LangChain、LlamaIndex、Pinecone 或自定义

### 为 AI 编码助手用户
- 💻 **Cursor、Windsurf、Cline、Continue.dev**：生成 `.cursorrules` 提供框架专业知识
- 🎯 **持久上下文**：AI "了解" 您的框架，无需手动提示
- 📚 **始终保持最新**：框架更改时 5 分钟更新规则

### 为游戏开发者
- 🎮 **Godot 4.x**：信号流分析（208 个信号，634 个连接）
- 🕹️ **Unity/Unreal**：使用模式检测进行 C# 和 C++ 代码分析
- 📖 **自动生成文档**：从代码生成架构文档

### 为团队
- 🔧 **内部知识**：将文档 + 代码仓库组合成单一信息源
- 👥 **共享配置**：团队配置的私有 git 仓库
- 🔄 **CI/CD 就绪**：GitHub Actions 自动更新知识

## 快速示例

```bash
# 安装
pip install skill-seekers

# 从文档
skill-seekers scrape --config configs/react.json

# 从 GitHub 仓库
skill-seekers scrape --github https://github.com/owner/repo --format langchain

# 从 PDF
skill-seekers scrape --pdf ./manual.pdf --format llamaindex

# 从本地代码库
skill-seekers analyze --directory ./my-project --format langchain

# 打包为任何平台
skill-seekers package output/ --target langchain
```

就是这样！您现在拥有来自任何源的 RAG 就绪文档。

## 核心功能

### 4 种输入源
- **文档网站** - 任何 HTML 文档（Docusaurus、GitBook、ReadTheDocs）
- **GitHub 仓库** - 公共和私有，深度 C3.x 分析
- **PDF 文件** - 扫描文档、手册、研究论文，支持 OCR
- **本地代码库** - 您的项目（27+ 语言、游戏引擎）

### 16 种输出格式
| 类别 | 平台 |
|------|------|
| **RAG/向量** | LangChain、LlamaIndex、Chroma、FAISS、Haystack、Qdrant、Weaviate |
| **AI 平台** | Claude、Gemini、OpenAI |
| **AI 编码** | Cursor、Windsurf、Cline、Continue.dev |
| **通用** | Markdown、JSON、YAML |

### C3.x 代码库分析
- **C3.1：** 设计模式检测（策略、工厂等）
- **C3.2：** 测试示例提取（来自测试的工作代码）
- **C3.3：** 操作指南生成（自动化教程）
- **C3.4：** 配置分析（9 种格式，带安全扫描）
- **C3.9：** 信号流分析（Godot、游戏引擎）
- **C3.10：** 多代理 LOCAL 模式支持

### 多代理支持
- **Claude Code**（默认）- 原生 stdio 传输
- **GitHub Copilot CLI** - 企业集成
- **OpenAI Codex CLI** - OpenAI 集成
- **OpenCode CLI** - 开源替代方案
- **自定义代理** - 任何 CLI 工具

### 智能处理
- **智能分块** - 保留代码块，保持上下文（512 令牌分块）
- **27+ 语言** - Python、JavaScript、Go、Rust、C++、C#、GDScript 等
- **Godot 支持** - 信号流检测和模式分析
- **云存储** - 直接上传到 S3、GCS、Azure
- **CI/CD 就绪** - GitHub Actions + Docker

## v3.0.0 新增功能

**通用智能平台：**

- **16 个平台适配器**（从 4 个增加）- LangChain、LlamaIndex、Chroma、FAISS、Haystack、Qdrant、Weaviate、Pinecone、Claude、Gemini、OpenAI、Cursor、Windsurf、Cline、Continue.dev
- **26 个 MCP 工具**（从 9 个增加）- AI 代理准备自己的知识
- **云存储** - AWS S3、Google Cloud Storage、Azure Blob Storage
- **CI/CD 就绪** - GitHub Action + Docker 支持
- **Godot 游戏引擎** - 完整的 4.x 分析，带信号流检测
- **7 种新语言** - Dart、Scala、SCSS/SASS、Elixir、Lua、Perl（共 27+）
- **多代理支持** - Claude、Copilot、Codex、OpenCode
- **1,852 个测试**（从 700+ 增加）- 生产就绪质量

[阅读完整的 v3.0.0 更新日志 →](/docs/community/changelog)

## 下一步

- [安装指南](/docs/getting-started/installation) - 设置 Skill Seekers v3.0.0
- [快速开始](/docs/getting-started/first-skill) - 5 分钟创建您的第一个技能
- [浏览配置](/configs) - 探索 24 个预构建配置
