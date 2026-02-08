---
title: 什么是 Skill Seekers？
description: Skill Seekers 简介 - AI 系统的通用数据层。将文档、GitHub 仓库、PDF 和代码库转换为适用于任何 AI 平台的结构化知识。
section: about
order: 1
---

# 什么是 Skill Seekers？

**Skill Seekers** 是**AI 系统的通用数据层**。它自动将**文档网站、GitHub 仓库、PDF 文件和本地代码库**转换为适用于 RAG 管道、AI 编码助手、Claude 技能和任何 LLM 平台的生产就绪格式。

## 问题所在

每个 AI 项目都需要数据预处理：

- **RAG 管道**：70% 的开发时间花在抓取、清理和分块数据上
- **AI 编码工具**：IDE 在没有手动上下文注入的情况下不了解您的框架
- **知识库**：组合文档 + 代码 + PDF 需要复杂的集成
- **不同的 AI 系统**：每个都需要不同的格式（LangChain、LlamaIndex、Cursor、Claude）

**结果：**每个人都在重复构建相同的基础设施。**停止重复造轮子。开始使用。**

## 解决方案

Skill Seekers 自动化整个数据预处理流程：

1. **提取**自任何源——文档、GitHub 仓库、PDF、本地代码库
2. **处理**使用智能分块、分类和元数据提取
3. **增强**使用 AI 添加解释、示例和最佳实践
4. **打包**为 16+ 种输出格式（RAG 管道、AI 编码助手、Claude 技能）
5. **部署**到任何 AI 系统只需一个命令

**结果：**从任何源到生产就绪的 AI 知识只需 15-45 分钟，而不是几天。

## 核心功能

### 4 种输入源
- **文档网站** - 抓取任何 HTML 文档（Docusaurus、GitBook、ReadTheDocs）
- **GitHub 仓库** - 分析代码结构、模式和示例（公共和私有）
- **PDF 文件** - 从技术 PDF 中提取文本，支持 OCR（扫描文档、手册、研究论文）
- **本地代码库** - 分析您自己的项目、游戏引擎或内部代码（27+ 语言）

### 16 种输出格式
| 类别 | 平台 |
|------|------|
| **RAG/向量** | LangChain、LlamaIndex、Chroma、FAISS、Haystack、Qdrant、Weaviate |
| **AI 平台** | Claude、Gemini、OpenAI |
| **AI 编码** | Cursor、Windsurf、Cline、Continue.dev |
| **通用** | Markdown、JSON、YAML |

### 智能处理
- **智能分类** - 自动将内容组织成逻辑部分
- **代码检测** - 识别并格式化带有语言标签的代码示例（27+ 语言）
- **模式识别** - 检测代码库中的设计模式（C3.x 分析）
- **测试提取** - 从测试文件中提取真实使用示例
- **操作指南生成** - 从工作流示例创建分步教程
- **信号流分析** - Godot 游戏引擎事件检测

### AI 增强
- **本地增强** - 使用 Claude Code（Claude Max 订阅免费）
- **API 增强** - 使用 Claude API 进行批处理
- **质量改进** - 将基础文档转换为全面指南（质量从 3/10 提升到 9/10）
- **上下文感知** - 添加解释、最佳实践和故障排除

### MCP 集成
- **26 个 MCP 工具** 适用于 Claude Code Desktop
- **多代理支持** - Claude Code、Cursor、Windsurf、VS Code、IntelliJ
- **一键工作流** - 自动获取、抓取、增强、打包、上传

## 版本

当前版本：**v3.0.0**（2026 年 2 月）

## 谁应该使用 Skill Seekers？

- **RAG 工程师** 构建生产 Q&A 系统 - 预处理速度提升 99%
- **AI 编码助手用户** - 为 Cursor、Windsurf、Cline 提供框架专业知识
- **游戏开发者** - 使用信号流检测分析 Godot、Unity、Unreal 项目
- **团队** - 将内部文档 + 代码组合成统一知识库
- **开发者** - 从任何框架文档 + GitHub 仓库创建技能

## 快速示例

```bash
# 安装
pip install skill-seekers

# 从文档
skill-seekers scrape --config configs/react.json

# 从 GitHub 仓库
skill-seekers scrape --format langchain --github https://github.com/facebook/react

# 从 PDF
skill-seekers scrape --format langchain --pdf ./manual.pdf

# 从本地代码库
skill-seekers analyze --directory ./my-project --format langchain

# 打包为任何平台
skill-seekers package output/react/ --target langchain
```

**结果：**您现在拥有来自任何源的 RAG 就绪 LangChain 文档！

## 下一步

- [安装指南](/docs/getting-started/installation) - 安装 Skill Seekers
- [您的第一个技能](/docs/getting-started/first-skill) - 3 步创建您的第一个 AI 技能
- [功能概览](/docs/about/features) - 探索所有功能

---

**开源** - MIT 许可证 | **社区驱动** - 欢迎贡献！
