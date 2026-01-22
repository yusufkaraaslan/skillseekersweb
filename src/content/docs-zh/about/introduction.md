---
title: 什么是 Skill Seekers？
description: Skill Seekers 简介 - 从文档网站、GitHub 仓库和 PDF 为 Claude、Gemini 和 OpenAI 创建 AI 技能的最快方式
section: about
order: 1
---

# 什么是 Skill Seekers？

**Skill Seekers** 是一个强大的文档到 AI 技能转换器，可自动将任何知识源转换为针对 Claude、Gemini 和 OpenAI ChatGPT 等 AI 助手优化的技能。

## 问题所在

现代 AI 助手功能强大，但它们不了解您的特定工具、框架或内部系统。您需要手动向它们提供文档，这会导致：
- ⏰ **耗时** - 复制粘贴文档需要数小时
- 📉 **不完整** - 容易遗漏重要部分
- 🔄 **重复** - 每次对话都需要重复
- 😞 **令人沮丧** - 上下文窗口限制意味着信息被截断

## 解决方案

Skill Seekers 自动化整个过程：
1. **抓取**文档网站、GitHub 仓库或 PDF
2. **分析**内容，进行智能分类和代码检测
3. **增强**使用 AI 添加解释和最佳实践
4. **打包**为特定平台格式（Claude、Gemini、OpenAI 或通用 Markdown）
5. **上传**直接到您的 AI 助手

**结果：** 您的 AI 助手在几分钟内（而不是几小时）成为任何框架或工具的专家。

## 核心功能

### 多种输入源
- **文档网站** - 抓取任何 HTML 文档（React、Vue、Django 等）
- **GitHub 仓库** - 分析代码结构、模式和示例
- **PDF 文件** - 从技术 PDF 中提取文本，支持 OCR
- **多源技能** - 将文档 + GitHub + PDF 组合成统一技能

### 智能处理
- **智能分类** - 自动将内容组织成逻辑部分
- **代码检测** - 识别并格式化带有语言标签的代码示例
- **模式识别** - 检测代码库中的设计模式（C3.x 分析）
- **测试提取** - 从测试文件中提取真实使用示例
- **操作指南生成** - 从工作流示例创建分步教程

### AI 增强
- **本地增强** - 使用 Claude Code（Claude Max 订阅免费）
- **API 增强** - 使用 Claude API 进行批处理
- **质量改进** - 将基础文档转换为全面指南（质量从 3/10 提升到 9/10）
- **上下文感知** - 添加解释、最佳实践和故障排除

### 多平台支持
- **Claude AI** - 带 YAML 前置元数据的原生格式
- **Google Gemini** - tar.gz，支持 1M 令牌上下文
- **OpenAI ChatGPT** - ZIP，集成向量存储
- **通用 Markdown** - 适用于任何 LLM 的通用格式

### MCP 集成
- **18 个 MCP 工具** 适用于 Claude Code Desktop
- **支持 5 个 AI 编码代理**（Claude Code、Cursor、Windsurf、VS Code、IntelliJ）
- **一键工作流** - 自动获取、抓取、增强、打包、上传

## 版本

当前版本：**v2.7.0**（2026 年 1 月）

## 谁应该使用 Skill Seekers？

- **开发者** 使用现代框架构建（React、Vue、Django、FastAPI 等）
- **技术文档作者** 创建 AI 就绪文档
- **团队** 在组织间共享内部知识
- **教育工作者** 为 AI 助手准备教学材料
- **研究人员** 组织技术知识库

## 快速示例

```bash
# 安装
pip install skill-seekers

# 从 React 文档创建技能
skill-seekers scrape --config configs/react.json

# 使用 AI 增强（Claude Max 免费）
skill-seekers enhance output/react/

# 打包并上传到 Claude
skill-seekers package output/react/ --upload
```

**结果：** Claude 现在理解 React hooks、组件、路由和最佳实践！

## 下一步

- [安装指南](/docs/getting-started/installation) - 安装 Skill Seekers
- [您的第一个技能](/docs/getting-started/first-skill) - 3 步创建您的第一个 AI 技能
- [功能概览](/docs/about/features) - 探索所有功能

---

**开源** - MIT 许可证 | **社区驱动** - 欢迎贡献！
