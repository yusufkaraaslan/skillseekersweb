---
title: 快速开始
description: 在 5 分钟内启动并运行 Skill Seekers v3.5.0 — 从 18 种源类型中的任何一种创建 AI 技能
section: getting-started
order: 2
---

# 快速开始

在 **5 分钟** 内启动并运行 Skill Seekers v3.5.0。本指南将引导您创建您的第一个 AI 技能。

## 先决条件

在开始之前，请确保您已准备好：

- 已安装 Python 3.10 或更高版本
- 终端/命令提示符
- 您首选的 LLM 平台的 API 密钥（Claude、Gemini 或 OpenAI）

## 第 1 步：安装 Skill Seekers

```bash
pip install skill-seekers
```

或使用 uv（更快）：

```bash
uv tool install skill-seekers
```

验证安装：

```bash
skill-seekers --version
```

您应该看到：`Skill Seekers v3.0.0`

## 第 2 步：配置您的 API 密钥

设置您的 LLM 平台 API 密钥：

```bash
skill-seekers config
```

这个交互式向导将：
1. 提示输入您的 API 密钥
2. 测试连接
3. 安全保存配置

或直接设置：

```bash
export CLAUDE_API_KEY="your-api-key-here"
```

## 第 3 步：创建您的第一个技能

让我们抓取一个流行框架的文档。本示例使用 React：

```bash
skill-seekers scrape https://react.dev --output react-skill/
```

**会发生什么：**
- Skill Seekers 抓取 React 文档
- 从约 50-100 个页面提取内容
- 为 AI 消费构建结构
- 根据网站大小需要 15-30 分钟

**为了更快的结果**，尝试一个较小的网站：

```bash
skill-seekers scrape https://docs.python-requests.org --output requests-skill/
```

## 第 4 步：使用 AI 增强

将抓取的内容转换为生产就绪的技能：

```bash
skill-seekers enhance react-skill/ --platform claude
```

**增强包括：**
- ✨ AI 优化的描述
- 🏷️ 智能标签
- 📚 精选示例
- 🔍 更好的可搜索性

## 第 5 步：上传到您的平台

将技能部署到您的 AI 平台：

```bash
skill-seekers upload react-skill/ --platform claude
```

**结果：** 您的技能现在可以在 Claude AI 中立即使用。

## 替代方案：GitHub 仓库

更喜欢分析代码？从 GitHub 仓库提取技能：

```bash
skill-seekers github https://github.com/owner/repo --output my-skill/
```

## 下一步

现在您已经创建了第一个技能：

- **[创建您的第一个技能](/docs/getting-started/first-skill)** - 深入了解技能创建
- **[抓取教程](/docs/tutorials/scraping-docs)** - 掌握文档抓取
- **[CLI 参考](/docs/cli/overview)** - 探索所有命令
- **[配置指南](/docs/cli/config)** - 自定义 Skill Seekers

## 常见问题

### "找不到 API 密钥"
```bash
skill-seekers config
# 或设置环境变量：
export CLAUDE_API_KEY="your-key"
```

### "网站需要身份验证"
使用 `--selector` 选项和自定义 CSS 选择器，或检查网站是否提供 `llms.txt` 以加快访问速度。

### "API 积分不足"
尝试本地增强（免费）：
```bash
skill-seekers enhance my-skill/ --method local
```

## 一行命令完整工作流程

对于 impatient，这里是一个包含所有内容的命令：

```bash
skill-seekers scrape https://docs.python-requests.org --output requests/ && \
skill-seekers enhance requests/ --platform claude && \
skill-seekers upload requests/ --platform claude
```

**总时间：** 约 20 分钟完成一个生产就绪的技能。

---

💡 **专业提示：** 检查您的目标网站是否有 `llms.txt` 文件（例如 `https://docs.example.com/llms.txt`）。这提供预构建的文档，处理速度 **快 10 倍**！
