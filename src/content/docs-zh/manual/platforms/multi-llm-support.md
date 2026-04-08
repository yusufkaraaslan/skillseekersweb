---
title: 概述
description: 将技能部署到 12+ AI 平台 — Claude、Gemini、OpenAI、Kimi、DeepSeek、Qwen 等
section: manual
subsection: platforms
order: 1
---

# 多 LLM 平台支持

**自 v2.5.0 起可用**

Skill Seekers 开箱即支持 4 个 LLM 平台。抓取一次文档，到处部署。

## 支持的平台

| 平台 | 格式 | 自动上传 | AI 增强 | 包大小 | 需要 API 密钥 |
|------|------|----------|---------|--------|---------------|
| **Claude AI** | ZIP + YAML | ✅ 是 | ✅ 是 | 优化 | ANTHROPIC_API_KEY |
| **Google Gemini** | tar.gz | ✅ 是 | ✅ 是 | 压缩 | GOOGLE_API_KEY |
| **OpenAI ChatGPT** | ZIP + Vector Store | ✅ 是 | ✅ 是 | 索引 | OPENAI_API_KEY |
| **通用 Markdown** | ZIP | ❌ 手动 | ❌ 否 | 通用 | 无 |

## 安装选项

### 仅安装核心包

```bash
# 默认安装（仅支持 Claude）
pip install skill-seekers
```

### 安装特定平台支持

```bash
# Google Gemini 支持
pip install skill-seekers[gemini]

# OpenAI ChatGPT 支持
pip install skill-seekers[openai]

# 所有 LLM 平台
pip install skill-seekers[all-llms]

# 开发依赖项（包括测试）
pip install skill-seekers[dev]
```

### 从源码安装

```bash
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
cd Skill_Seekers

# 使用所有平台的可编辑安装
pip install -e .[all-llms]
```

## Claude AI（默认）

Claude AI 是默认且功能最丰富的平台。

### 安装

```bash
# 默认包含 Claude 支持
pip install skill-seekers
```

### 设置

```bash
# 设置您的 Anthropic API 密钥
export ANTHROPIC_API_KEY="your-api-key-here"

# 或添加到 ~/.bashrc 以持久化
echo 'export ANTHROPIC_API_KEY="your-key"' >> ~/.bashrc
source ~/.bashrc
```

### 用法

```bash
# 抓取文档
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# 为 Claude 打包（默认）
skill-seekers package output/astro/

# 上传到 Claude
skill-seekers upload astro.zip
```

### 功能

- ✅ **YAML 前置元数据** - 带元数据的技能
- ✅ **引用文件夹** - 有组织的文档结构
- ✅ **自动分类** - 智能内容组织
- ✅ **AI 增强** - Claude Sonnet 用于技能改进
- ✅ **版本跟踪** - 技能版本支持

### 输出结构

```
astro.zip
├── skill.yaml
├── SKILL.md
└── references/
    ├── getting-started.md
    ├── guides.md
    ├── api-reference.md
    └── examples.md
```

## Google Gemini

Google Gemini 支持 tar.gz 格式。

### 安装

```bash
# 安装 Gemini 支持
pip install skill-seekers[gemini]

# 或安装所有平台
pip install skill-seekers[all-llms]
```

### 设置

```bash
# 从以下获取 API 密钥：https://makersuite.google.com/app/apikey
export GOOGLE_API_KEY="your-google-api-key"
```

### 用法

```bash
# 抓取文档（与 Claude 相同）
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# 为 Gemini 打包
skill-seekers package output/astro/ --target gemini

# 上传到 Gemini
skill-seekers upload astro-gemini.tar.gz --target gemini
```

### 功能

- ✅ **tar.gz 格式** - Gemini 的首选格式
- ✅ **上下文缓存** - 高效的令牌使用
- ✅ **长上下文** - 高达 2M 令牌
- ✅ **AI 增强** - Gemini Pro 用于改进
- ✅ **多模态** - 支持文档中的图像

### 输出结构

```
astro-gemini.tar.gz
├── metadata.json
├── content/
│   ├── main.md
│   └── sections/
│       ├── 01-getting-started.md
│       ├── 02-guides.md
│       └── 03-api.md
```

## OpenAI ChatGPT

OpenAI ChatGPT 与向量存储集成。

### 安装

```bash
# 安装 OpenAI 支持
pip install skill-seekers[openai]

# 或安装所有平台
pip install skill-seekers[all-llms]
```

### 设置

```bash
# 从以下获取 API 密钥：https://platform.openai.com/api-keys
export OPENAI_API_KEY="your-openai-api-key"
```

### 用法

```bash
# 抓取文档（相同过程）
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# 为 OpenAI 打包
skill-seekers package output/astro/ --target openai

# 上传到 OpenAI（创建向量存储）
skill-seekers upload astro-openai.zip --target openai
```

### 功能

- ✅ **向量存储** - 自动嵌入
- ✅ **语义搜索** - 通过含义查找相关内容
- ✅ **文件搜索** - GPT-4 文件搜索功能
- ✅ **AI 增强** - GPT-4 用于改进
- ✅ **Assistants API** - 为自定义 GPT 做好准备

### 输出结构

```
astro-openai.zip
├── manifest.json
├── content.md
└── embeddings/
    └── vectors.json
```

## 通用 Markdown

任何平台的通用 markdown 导出。

### 安装

```bash
# 默认包含
pip install skill-seekers
```

### 用法

```bash
# 抓取文档
skill-seekers scrape \
  --url https://docs.astro.build \
  --output-dir output/astro

# 打包为通用 markdown
skill-seekers package output/astro/ --target markdown
```

### 功能

- ✅ **通用格式** - 适用于任何 LLM
- ✅ **干净的 markdown** - 无平台特定元数据
- ✅ **可移植** - 复制粘贴友好
- ✅ **Git 友好** - 人类可读
- ❌ **无自动上传** - 需要手动导入
- ❌ **无 AI 增强** - 仅原始内容

### 输出结构

```
astro-markdown.zip
├── README.md
├── getting-started/
│   ├── introduction.md
│   └── installation.md
├── guides/
│   ├── routing.md
│   └── components.md
└── api/
    └── reference.md
```

## 完整工作流程示例

### 工作流程 1：Claude AI（默认）

```bash
# 1. 抓取
skill-seekers scrape --config configs/react.json

# 2. 增强（可选但推荐）
skill-seekers enhance output/react/

# 3. 打包
skill-seekers package output/react/

# 4. 上传
skill-seekers upload react.zip

# 访问：https://claude.ai/skills
```

### 工作流程 2：Google Gemini

```bash
# 设置（一次性）
pip install skill-seekers[gemini]
export GOOGLE_API_KEY=AIzaSy...

# 1. 抓取（通用）
skill-seekers scrape --config configs/react.json

# 2. 为 Gemini 增强
skill-seekers enhance output/react/ --target gemini

# 3. 为 Gemini 打包
skill-seekers package output/react/ --target gemini

# 4. 上传到 Gemini
skill-seekers upload react-gemini.tar.gz --target gemini

# 访问：https://aistudio.google.com/files/
```

### 工作流程 3：OpenAI ChatGPT

```bash
# 设置（一次性）
pip install skill-seekers[openai]
export OPENAI_API_KEY=sk-proj-...

# 1. 抓取（通用）
skill-seekers scrape --config configs/react.json

# 2. 使用 GPT-4o 增强
skill-seekers enhance output/react/ --target openai

# 3. 为 OpenAI 打包
skill-seekers package output/react/ --target openai

# 4. 上传（创建 Assistant + Vector Store）
skill-seekers upload react-openai.zip --target openai

# 访问：https://platform.openai.com/assistants/
```

### 工作流程 4：导出到所有平台

```bash
# 安装所有平台
pip install skill-seekers[all-llms]

# 抓取一次
skill-seekers scrape --config configs/react.json

# 为所有平台打包
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown

# 结果：
# - react.zip（Claude）
# - react-gemini.tar.gz（Gemini）
# - react-openai.zip（OpenAI）
# - react-markdown.zip（通用）
```

## 比较

### 功能矩阵

| 功能 | Claude AI | Gemini | OpenAI | Markdown |
|------|-----------|--------|--------|----------|
| 自动上传 | ✅ | ✅ | ✅ | ❌ |
| AI 增强 | ✅ | ✅ | ✅ | ❌ |
| 结构化格式 | ✅ | ✅ | ✅ | ✅ |
| 元数据 | ✅ | ✅ | ✅ | ❌ |
| 版本控制 | ✅ | ✅ | ✅ | ❌ |
| 上下文优化 | ✅ | ✅ | ✅ | ❌ |
| 多源 | ✅ | ✅ | ✅ | ✅ |
| GitHub 集成 | ✅ | ✅ | ✅ | ✅ |
| 三流 | ✅ | ✅ | ✅ | ✅ |

### 成本比较

| 平台 | 增强成本 | 上传成本 | 上下文大小 | 最适合 |
|------|----------|----------|------------|--------|
| **Claude** | $3-7 每技能 | 免费 | 200K 令牌 | 开发、编码 |
| **Gemini** | $1-3 每技能 | 免费 | 2M 令牌 | 大型文档、长上下文 |
| **OpenAI** | $5-10 每技能 | 嵌入 | 128K 令牌 | 语义搜索 |
| **Markdown** | 免费 | 不适用 | 无限 | 自托管、自定义 |

## 配置

### 配置文件中的平台选择

```json
{
  "name": "astro",
  "description": "Astro web 框架文档",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.astro.build"
    }
  ],
  "packaging": {
    "targets": ["claude", "gemini", "openai", "markdown"]
  },
  "enhancement": {
    "enabled": true,
    "provider": "anthropic"  // 或 "google"、"openai"
  }
}
```

### 为多个平台构建

```bash
# 一次为所有平台打包
skill-seekers package output/astro/ \
  --target claude \
  --target gemini \
  --target openai \
  --target markdown
```

**输出：**
- `astro.zip`（Claude）
- `astro-gemini.tar.gz`（Gemini）
- `astro-openai.zip`（OpenAI）
- `astro-markdown.zip`（通用）

## 故障排除

### 缺少依赖项

**错误：** `ModuleNotFoundError: No module named 'google.generativeai'`

**解决方案：**
```bash
pip install skill-seekers[gemini]
```

**错误：** `ModuleNotFoundError: No module named 'openai'`

**解决方案：**
```bash
pip install skill-seekers[openai]
```

### API 密钥问题

**错误：** `Invalid API key format`

**解决方案：** 检查您的 API 密钥格式：
- Claude：`sk-ant-...`
- Gemini：`AIza...`
- OpenAI：`sk-proj-...` 或 `sk-...`

设置环境变量：

```bash
export ANTHROPIC_API_KEY="your-key"  # Claude
export GOOGLE_API_KEY="your-key"     # Gemini
export OPENAI_API_KEY="your-key"     # OpenAI
```

### 包格式错误

**错误：** `Not a tar.gz file: react.zip`

**解决方案：** 使用正确的 --target 标志：
```bash
# Gemini 需要 tar.gz
skill-seekers package output/react/ --target gemini

# OpenAI 和 Claude 使用 ZIP
skill-seekers package output/react/ --target openai
```

## 常见问题

**问：我可以对所有平台使用相同的抓取数据吗？**

答：可以！抓取阶段是通用的。只有打包和上传是平台特定的。

**问：我需要为每个平台使用单独的 API 密钥吗？**

答：是的，每个平台需要自己的 API 密钥。将它们设置为环境变量。

**问：我可以使用不同的模型进行增强吗？**

答：可以，每个平台使用自己的增强模型：
- Claude：Claude Sonnet 4
- Gemini：Gemini 2.0 Flash
- OpenAI：GPT-4o

**问：如果我不想自动上传怎么办？**

答：使用 `package` 命令而不使用 `upload`。您将获得打包的文件以手动上传。

**问：markdown 导出是否与所有 LLM 兼容？**

答：是的！通用 markdown 导出创建适用于任何 LLM 或文档系统的通用文档。

## 下一步

- [三流架构](/docs/features/three-stream-architecture) - 多源抓取
- [AI 增强](/docs/features/ai-enhancement) - 使用 AI 改进技能
- [CLI 参考：package](/docs/cli/package) - package 命令详情
- [CLI 参考：upload](/docs/cli/upload) - upload 命令详情
