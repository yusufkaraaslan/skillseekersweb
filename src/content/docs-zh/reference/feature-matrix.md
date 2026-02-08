---
title: 功能支持矩阵和平台比较
description: Claude AI、Google Gemini、OpenAI ChatGPT 和通用 Markdown 的完整功能支持矩阵 - 比较平台、技能模式、CLI 命令和 MCP 工具
section: reference
order: 4
---

# 功能支持矩阵和平台比较

**Skill Seekers 在所有支持平台上的功能完整比较。**

## 平台概述

Skill Seekers 支持 **4 个目标平台**，具有不同的格式、API 和功能：

| 平台 | 格式 | API | 增强 | 状态 |
|----------|--------|-----|-------------|--------|
| **Claude AI** | ZIP，YAML frontmatter | Skills API（手动） | ✅ LOCAL + API | ✅ 生产就绪 |
| **Google Gemini** | tar.gz，纯 markdown | Files API | ✅ 仅 API | ✅ 生产就绪 |
| **OpenAI ChatGPT** | ZIP，assistant 指令 | Assistants API | ✅ 仅 API | ✅ 生产就绪 |
| **通用 Markdown** | ZIP，通用 markdown | 无 | ❌ 不适用 | ✅ 生产就绪 |

---

## 平台功能

### 文件格式

| 平台 | 包格式 | SKILL.md 格式 | 参考 |
|----------|----------------|-----------------|------------|
| **Claude AI** | `.zip` | Markdown + YAML frontmatter | `references/` 目录 |
| **Google Gemini** | `.tar.gz` | 纯 markdown（无 frontmatter） | `references/` 目录 |
| **OpenAI ChatGPT** | `.zip` | 纯文本（assistant 指令） | `vector_store_files/` |
| **通用 Markdown** | `.zip` | 通用 markdown | `references/` 目录 |

**命令：**
```bash
skill-seekers package output/skill/ --target [claude|gemini|openai|markdown]
```

### 增强支持

| 平台 | API 模式 | LOCAL 模式 | 成本 | 速度 |
|----------|----------|------------|------|-------|
| **Claude AI** | ✅ 是（Anthropic API） | ✅ 是（Claude Code Max） | $0.15-0.30 / 免费 | 快 / 中等 |
| **Google Gemini** | ✅ 是（Gemini API） | ❌ 否 | $0.01-0.05 | 快 |
| **OpenAI ChatGPT** | ✅ 是（OpenAI API） | ❌ 否 | $0.15-0.30 | 快 |
| **通用 Markdown** | ❌ 无 | ❌ 无 | 无 | 无 |

**命令：**
```bash
# Claude（API 模式）
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/skill/ --enhance

# Claude（LOCAL 模式 - 免费！）
skill-seekers enhance output/skill/ --enhance-local

# Gemini（API 模式）
export GOOGLE_API_KEY=AIza...
skill-seekers enhance output/skill/ --target gemini

# OpenAI（API 模式）
export OPENAI_API_KEY=sk-proj-...
skill-seekers enhance output/skill/ --target openai
```

### 上传方法

| 平台 | 手动上传 | 程序化上传 | MCP 工具 |
|----------|---------------|---------------------|----------|
| **Claude AI** | ✅ claude.ai/skills | 🚧 即将推出 | 🚧 即将推出 |
| **Google Gemini** | ✅ aistudio.google.com | ✅ Python API | ✅ 是 |
| **OpenAI ChatGPT** | ✅ platform.openai.com | ✅ Python API | ✅ 是 |
| **通用 Markdown** | ❌ 无 | ❌ 无 | ❌ 无 |

**命令：**
```bash
# Gemini（程序化）
skill-seekers upload skill-gemini.tar.gz --target gemini --api-key AIza...

# OpenAI（程序化）
skill-seekers upload skill-openai.zip --target openai --api-key sk-proj-...

# Claude（目前手动）
# 在 claude.ai/skills 上传 skill.zip
```

---

## 技能模式

### 单源技能

**所有平台支持：**

| 模式 | 命令 | 输出 | 平台 |
|------|---------|--------|-----------|
| **文档** | `skill-seekers scrape` | 来自文档的单个技能 | 全部 |
| **GitHub** | `skill-seekers github` | 来自仓库的单个技能 | 全部 |
| **PDF** | `skill-seekers pdf` | 来自 PDF 的单个技能 | 全部 |
| **代码库（C3.x）** | `skill-seekers-codebase` | 来自代码的单个技能 | 全部 |

### 多源技能

**平台特定支持：**

| 模式 | 命令 | 输出 | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|--------|----------|
| **统一** | `skill-seekers unified` | 合并的技能 | ✅ 是 | ✅ 是 | ✅ 是 | ✅ 是 |
| **路由器（三流）** | `skill-seekers router` | 路由器 + 子技能 | ✅ 是 | ⚠️ 有限 | ⚠️ 有限 | ❌ 否 |

**注意：**
- **统一模式：** 所有平台将多个源合并为一个技能
- **路由器模式：** Claude AI 具有原生子技能支持；其他平台需要手动子技能管理

---

## CLI 命令支持

### 抓取命令

| 命令 | 描述 | 所有平台 |
|---------|-------------|---------------|
| `skill-seekers scrape` | 文档抓取 | ✅ 是 |
| `skill-seekers github` | GitHub 仓库 | ✅ 是 |
| `skill-seekers pdf` | PDF 提取 | ✅ 是 |
| `skill-seekers unified` | 多源抓取 | ✅ 是 |
| `skill-seekers-codebase` | 代码库分析（C3.x） | ✅ 是 |

### 处理命令

| 命令 | 描述 | Claude | Gemini | OpenAI | Markdown |
|---------|-------------|--------|--------|--------|----------|
| `skill-seekers enhance` | AI 增强 | ✅ API + LOCAL | ✅ 仅 API | ✅ 仅 API | ❌ 无 |
| `skill-seekers package` | 打包技能 | ✅ 是 | ✅ 是 | ✅ 是 | ✅ 是 |
| `skill-seekers upload` | 上传到平台 | 🚧 手动 | ✅ 是 | ✅ 是 | ❌ 无 |
| `skill-seekers validate` | 验证结构 | ✅ 是 | ✅ 是 | ✅ 是 | ✅ 是 |
| `skill-seekers router` | 生成路由器 | ✅ 是 | ⚠️ 有限 | ⚠️ 有限 | ❌ 否 |

**图例：**
- ✅ 完全支持
- ⚠️ 部分支持
- 🚧 即将推出
- ❌ 不适用

---

## C3.x 代码库分析

### 功能支持

所有平台支持 C3.x 代码库分析功能：

| 功能 | 命令标志 | 输出 | 所有平台 |
|---------|--------------|--------|---------------|
| **模式检测** | `--extract-patterns` | 设计模式 | ✅ 是 |
| **测试提取** | `--extract-test-examples` | 5 个测试类别 | ✅ 是 |
| **操作指南** | `--build-how-to-guides` | 教程生成 | ✅ 是 |
| **配置模式** | `--extract-config-patterns` | 配置分析 | ✅ 是 |
| **架构** | `--generate-architecture` | 系统概述 | ✅ 是 |
| **AI 增强** | `--ai-mode [auto|api|local|none]` | 质量提升 | Claude：两者，其他：API |

**示例：**
```bash
# 适用于所有平台
skill-seekers-codebase path/to/repo/ \
  --output output/codebase/ \
  --extract-patterns \
  --extract-test-examples \
  --build-how-to-guides \
  --ai-mode auto
```

### AI 增强模式

| 模式 | Claude | Gemini | OpenAI | Markdown |
|------|--------|--------|--------|----------|
| **AUTO**（检测最佳） | ✅ 如果可用则 LOCAL，否则 API | ✅ API | ✅ API | ❌ 无 |
| **API** | ✅ Anthropic API | ✅ Gemini API | ✅ OpenAI API | ❌ 无 |
| **LOCAL** | ✅ Claude Code Max（免费！） | ❌ 否 | ❌ 否 | ❌ 无 |
| **NONE** | ✅ 基本输出 | ✅ 基本输出 | ✅ 基本输出 | ✅ 基本输出 |

---

## MCP 工具支持

### 可用的 MCP 工具

**26 个用于 Claude Desktop 集成的 MCP 工具：**

| 工具类别 | 工具名称 | 描述 |
|---------------|-----------|-------------|
| **抓取** | `scrape_docs` | 文档抓取 |
| | `scrape_github` | GitHub 仓库 |
| | `scrape_pdf` | PDF 提取 |
| | `unified_scrape` | 多源抓取 |
| **技能管理** | `package_skill` | 为平台打包 |
| | `upload_skill` | 上传到 Claude/Gemini/OpenAI |
| | `enhance_skill` | AI 增强 |
| | `validate_skill` | 验证结构 |
| **C3.x 分析** | `analyze_codebase` | 完整代码库分析 |
| | `extract_patterns` | 模式检测 |
| | `extract_test_examples` | 测试提取 |
| | `build_how_to_guides` | 教程生成 |
| **Git 源** | `add_git_source` | 添加 git 配置源 |
| | `list_git_sources` | 列出源 |
| | `remove_git_source` | 删除源 |
| | `fetch_git_sources` | 获取更新 |
| **实用工具** | `list_presets` | 显示预设 |
| | `get_preset` | 获取预设配置 |

**设置：**
```bash
pip install skill-seekers[mcp]

# 添加到 Claude Desktop 配置
# ~/.config/Claude/claude_desktop_config.json (Linux)
# ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
# %APPDATA%/Claude/claude_desktop_config.json (Windows)
```

**另请参阅：** [MCP 设置指南](/zh/docs/guides/mcp-setup)

---

## 工作流覆盖

### 工作流：文档 → 技能

| 步骤 | 命令 | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. 抓取 | `skill-seekers scrape` | ✅ | ✅ | ✅ | ✅ |
| 2. 增强 | `skill-seekers enhance` | ✅ API + LOCAL | ✅ API | ✅ API | ❌ |
| 3. 打包 | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 4. 上传 | `skill-seekers upload --target X` | 🚧 手动 | ✅ API | ✅ API | ❌ |

### 工作流：GitHub → 技能

| 步骤 | 命令 | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. 抓取 | `skill-seekers github` | ✅ | ✅ | ✅ | ✅ |
| 2. 打包 | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 3. 上传 | `skill-seekers upload --target X` | 🚧 手动 | ✅ API | ✅ API | ❌ |

### 工作流：代码库（C3.x）→ 技能

| 步骤 | 命令 | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. 分析 | `skill-seekers-codebase` | ✅ | ✅ | ✅ | ✅ |
| 2. 提取模式 | `--extract-patterns` | ✅ | ✅ | ✅ | ✅ |
| 3. 构建指南 | `--build-how-to-guides` | ✅ | ✅ | ✅ | ✅ |
| 4. AI 增强 | `--ai-mode auto` | ✅ LOCAL + API | ✅ API | ✅ API | ❌ |
| 5. 打包 | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 6. 上传 | `skill-seekers upload --target X` | 🚧 手动 | ✅ API | ✅ API | ❌ |

### 工作流：多源（统一）→ 技能

| 步骤 | 命令 | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. 统一抓取 | `skill-seekers unified` | ✅ | ✅ | ✅ | ✅ |
| 2. 冲突检测 | 自动 | ✅ | ✅ | ✅ | ✅ |
| 3. 合并 | `--merge-mode rule-based` | ✅ | ✅ | ✅ | ✅ |
| 4. 增强 | `skill-seekers enhance` | ✅ API + LOCAL | ✅ API | ✅ API | ❌ |
| 5. 打包 | `skill-seekers package --target X` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ✅ ZIP |
| 6. 上传 | `skill-seekers upload --target X` | 🚧 手动 | ✅ API | ✅ API | ❌ |

### 工作流：三流路由器 → 技能

| 步骤 | 命令 | Claude | Gemini | OpenAI | Markdown |
|------|---------|--------|--------|--------|----------|
| 1. 代码流 | `skill-seekers-codebase` | ✅ | ✅ | ✅ | ✅ |
| 2. 文档流 | `skill-seekers scrape` | ✅ | ✅ | ✅ | ✅ |
| 3. GitHub 流 | `skill-seekers github` | ✅ | ✅ | ✅ | ✅ |
| 4. 生成路由器 | `skill-seekers router` | ✅ 完全支持 | ⚠️ 单个技能 | ⚠️ 单个技能 | ❌ |
| 5. 打包全部 | `--include-subskills` | ✅ ZIP | ✅ tar.gz | ✅ ZIP | ❌ |
| 6. 上传 | `skill-seekers upload --target X` | 🚧 手动 | ✅ API | ✅ API | ❌ |

**注意：** Gemini 和 OpenAI 没有原生子技能路由，因此路由器会扁平化为单个综合技能。

---

## 平台特定功能

### Claude AI 独有

✅ **LOCAL 增强模式** - Claude Code Max 免费
✅ **子技能路由** - 原生分层技能支持
✅ **自定义指令** - YAML frontmatter 中的行为自定义
✅ **MCP 集成** - 用于 Claude Desktop 的 18 个工具

### Google Gemini 独有

✅ **Grounding 支持** - 自动源归属
✅ **长上下文窗口** - 高达 1M 令牌
✅ **低成本增强** - 每个技能 $0.01-0.05（Gemini 2.0 Flash）

### OpenAI ChatGPT 独有

✅ **Vector Store + file_search** - 内置语义搜索
✅ **函数调用** - 使用自定义工具扩展
✅ **流式响应** - 实时答案生成

### 通用 Markdown

✅ **通用兼容性** - 适用于任何 LLM
✅ **无平台锁定** - 纯 markdown 格式
✅ **版本控制友好** - 易于差异和跟踪更改

---

## 预设支持

**24 个内置预设**适用于所有平台：

| 类别 | 预设 | 所有平台 |
|----------|---------|---------------|
| **游戏引擎** | Godot、Unity、Unreal | ✅ 是 |
| **Web 框架** | React、Vue、Angular、Svelte、Next.js | ✅ 是 |
| **后端** | Django、FastAPI、Flask、Express、NestJS | ✅ 是 |
| **语言** | Python、TypeScript、Rust、Go | ✅ 是 |
| **工具** | Tailwind、Kubernetes、Docker、PostgreSQL | ✅ 是 |

**用法：**
```bash
# 列出所有预设
skill-seekers list-presets

# 使用预设（适用于所有平台）
skill-seekers scrape --preset react
skill-seekers package output/react/ --target [claude|gemini|openai|markdown]
```

---

## 成本比较

### 增强成本

| 平台 | 模型 | 输入成本 | 输出成本 | 典型技能 | 总成本 |
|----------|-------|------------|-------------|---------------|------------|
| **Claude AI（API）** | Claude Sonnet | $3/1M | $15/1M | 50K 输入，10K 输出 | $0.30 |
| **Claude AI（LOCAL）** | Claude Code Max | 免费 | 免费 | 任何大小 | **$0.00** 🎉 |
| **Google Gemini** | Gemini 2.0 Flash | $0.075/1M | $0.30/1M | 50K 输入，10K 输出 | $0.01 |
| **OpenAI ChatGPT** | GPT-4o | $2.50/1M | $10.00/1M | 50K 输入，10K 输出 | $0.23 |

### 存储/上传成本

| 平台 | 存储成本 | 上传成本 | 注意 |
|----------|--------------|-------------|-------|
| **Claude AI** | 免费 | 免费 | 手动上传（目前） |
| **Google Gemini** | $0.10/GB/天 | 免费 | Files API |
| **OpenAI ChatGPT** | $0.10/GB/天 | 免费 | Vector Store |
| **通用 Markdown** | 无 | 无 | 无上传 |

---

## 版本兼容性

| 功能 | 添加版本 | Claude | Gemini | OpenAI | Markdown |
|---------|---------------|--------|--------|--------|----------|
| **文档抓取** | v1.0.0 | ✅ | ✅ | ✅ | ✅ |
| **GitHub 抓取** | v1.5.0 | ✅ | ✅ | ✅ | ✅ |
| **PDF 提取** | v2.0.0 | ✅ | ✅ | ✅ | ✅ |
| **多 LLM 支持** | v2.5.0 | ✅ | ✅ | ✅ | ✅ |
| **C3.x 代码库分析** | v2.6.0 | ✅ | ✅ | ✅ | ✅ |
| **三流架构** | v2.6.0 | ✅ | ⚠️ | ⚠️ | ❌ |
| **AI 增强（API）** | v2.5.0 | ✅ | ✅ | ✅ | ❌ |
| **AI 增强（LOCAL）** | v2.6.0 | ✅ | ❌ | ❌ | ❌ |
| **统一抓取** | v2.0.0 | ✅ | ✅ | ✅ | ✅ |
| **MCP 集成** | v2.5.0 | ✅ | ⚠️ | ⚠️ | ❌ |

---

## 平台选择指南

### 选择 Claude AI 如果：
- ✅ 您有 Claude Code Max（免费 LOCAL 增强！）
- ✅ 您需要子技能路由（路由器模式）
- ✅ 您想要与 Claude Desktop 的 MCP 集成
- ✅ 您更喜欢 YAML frontmatter 结构

### 选择 Google Gemini 如果：
- ✅ 您想要最低的增强成本（$0.01-0.05）
- ✅ 您需要非常长的上下文窗口（1M 令牌）
- ✅ 您想要自动 grounding/引用
- ✅ 您更喜欢纯 markdown 格式

### 选择 OpenAI ChatGPT 如果：
- ✅ 您需要 Vector Store + 语义搜索
- ✅ 您想要函数调用功能
- ✅ 您需要流式响应
- ✅ 您正在构建自定义 GPT

### 选择通用 Markdown 如果：
- ✅ 您想要平台独立性
- ✅ 您需要版本控制友好的格式
- ✅ 您正在使用自定义/本地 LLM
- ✅ 您想要最大的可移植性

---

## 下一步

- [多 LLM 支持指南](/zh/docs/features/multi-llm-support) - 详细的平台比较
- [Claude 集成](/zh/docs/reference/claude-integration) - Claude 特定功能
- [Gemini 集成](/zh/docs/integrations/gemini) - Gemini 设置和使用
- [OpenAI 集成](/zh/docs/integrations/openai) - OpenAI 设置和使用

---

**状态**：✅ 完成（v2.6.0）

发现问题或有建议？[打开 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
