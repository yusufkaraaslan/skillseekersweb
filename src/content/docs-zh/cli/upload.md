---
title: upload - 上传技能
description: 将打包的技能上传到 Claude AI、Google Gemini 或 OpenAI ChatGPT，具有自动 API 集成
section: cli
order: 7
---

# upload - 上传技能

将打包的技能上传到 LLM 平台。

## 基本用法

```bash
skill-seekers upload PACKAGE_FILE [OPTIONS]
```

## 快速示例

```bash
# 上传到 Claude（默认）
skill-seekers upload output/react.zip

# 上传到特定平台
skill-seekers upload output/react-gemini.tar.gz --target gemini
skill-seekers upload output/react-openai.zip --target openai

# 明确指定目标
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers upload output/react.zip --target claude
```

## 选项

- `--target PLATFORM` - 目标平台（claude、gemini、openai）

## 前置要求

### Claude AI

```bash
# 设置 API 密钥（用于自动上传）
export ANTHROPIC_API_KEY=sk-ant-...

# 从此处获取密钥：https://console.anthropic.com/
```

**或手动上传：**
1. 访问 https://claude.ai/skills
2. 点击「上传技能」
3. 选择 `.zip` 文件

### Google Gemini

```bash
# 安装 Gemini 支持
pip install skill-seekers[gemini]

# 设置 API 密钥
export GOOGLE_API_KEY=AIzaSy...

# 从此处获取密钥：https://aistudio.google.com/
```

### OpenAI ChatGPT

```bash
# 安装 OpenAI 支持
pip install skill-seekers[openai]

# 设置 API 密钥
export OPENAI_API_KEY=sk-proj-...

# 从此处获取密钥：https://platform.openai.com/
```

## 平台特定用法

### Claude AI

```bash
# 自动上传（使用 API 密钥）
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers upload output/react.zip

# 手动上传（无 API 密钥）
# 1. 访问 https://claude.ai/skills
# 2. 点击「上传技能」
# 3. 选择 output/react.zip
```

**发生的事情：**
- 上传到 Claude Skills API
- 立即在 claude.ai 中可用
- 在 Claude Code 和 Claude Desktop 中工作

### Google Gemini

```bash
# 上传到 Gemini
export GOOGLE_API_KEY=AIzaSy...
skill-seekers upload output/react-gemini.tar.gz --target gemini
```

**发生的事情：**
- 上传到 Google Files API
- 创建 grounding 资源
- 在 Google AI Studio 中可用

**访问：**
- 访问 https://aistudio.google.com/
- 您的技能显示为 grounding 数据

### OpenAI ChatGPT

```bash
# 上传到 OpenAI
export OPENAI_API_KEY=sk-proj-...
skill-seekers upload output/react-openai.zip --target openai
```

**发生的事情：**
- 通过 Assistants API 创建 OpenAI Assistant
- 为语义搜索创建 Vector Store
- 将文件上传到向量存储
- 启用 `file_search` 工具

**访问：**
- 访问 https://platform.openai.com/assistants/
- 您的助手以技能名称列出

## 完整工作流

```bash
# 1. 抓取文档
skill-seekers scrape --config configs/react.json

# 2. 增强
skill-seekers enhance output/react/

# 3. 为平台打包
skill-seekers package output/react/ --target claude

# 4. 上传
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers upload output/react.zip
```

## 多平台上传

```bash
# 设置所有 API 密钥
export ANTHROPIC_API_KEY=sk-ant-...
export GOOGLE_API_KEY=AIzaSy...
export OPENAI_API_KEY=sk-proj-...

# 上传到所有平台
skill-seekers upload output/react.zip --target claude
skill-seekers upload output/react-gemini.tar.gz --target gemini
skill-seekers upload output/react-openai.zip --target openai
```

## API 密钥管理

### 获取 API 密钥

**Claude（Anthropic）：**
1. 访问 https://console.anthropic.com/
2. 创建 API 密钥
3. 复制密钥（以 `sk-ant-` 开头）

**Gemini（Google）：**
1. 访问 https://aistudio.google.com/
2. 获取 API 密钥
3. 复制密钥（以 `AIza` 开头）

**OpenAI：**
1. 访问 https://platform.openai.com/
2. 创建 API 密钥
3. 复制密钥（以 `sk-proj-` 开头）

### 持久化 API 密钥

添加到 shell 配置文件：

```bash
# macOS/Linux（bash）
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.bashrc
echo 'export GOOGLE_API_KEY=AIzaSy...' >> ~/.bashrc
echo 'export OPENAI_API_KEY=sk-proj-...' >> ~/.bashrc
source ~/.bashrc

# macOS（zsh）
echo 'export ANTHROPIC_API_KEY=sk-ant-...' >> ~/.zshrc
echo 'export GOOGLE_API_KEY=AIzaSy...' >> ~/.zshrc
echo 'export OPENAI_API_KEY=sk-proj-...' >> ~/.zshrc
source ~/.zshrc
```

## 故障排除

### "API key not set"

设置相应的环境变量：

```bash
# Claude
export ANTHROPIC_API_KEY=sk-ant-...

# Gemini
export GOOGLE_API_KEY=AIzaSy...

# OpenAI
export OPENAI_API_KEY=sk-proj-...
```

### "Package not found"

确保先进行打包：

```bash
skill-seekers package output/react/ --target claude
skill-seekers upload output/react.zip
```

### 上传失败

如果 API 上传失败，使用手动上传：

- **Claude：** https://claude.ai/skills
- **Gemini：** https://aistudio.google.com/
- **OpenAI：** https://platform.openai.com/assistants/

### 错误的文件格式

每个平台需要特定格式：

- Claude：`react.zip`
- Gemini：`react-gemini.tar.gz`
- OpenAI：`react-openai.zip`

## 验证

上传后，验证您的技能：

**Claude AI：**
```
# 在 Claude Code 或 claude.ai 中
询问 Claude：「你有哪些技能？」
```

**Google Gemini：**
```
# 访问 https://aistudio.google.com/
# 检查 Files 部分查看您的技能
```

**OpenAI：**
```
# 访问 https://platform.openai.com/assistants/
# 您的助手应该被列出
```

## 下一步

- [上传指南](/docs/guides/upload-guide) - 完整上传指南
- [多 LLM 支持](/docs/features/multi-llm-support) - 平台比较
- [Package 命令](/docs/cli/package) - 为平台打包
