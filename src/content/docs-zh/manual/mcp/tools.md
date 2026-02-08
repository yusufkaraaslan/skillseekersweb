---
title: MCP 工具参考
description: Skill Seekers 中所有 26 个 MCP 工具的完整参考 - AI 代理的自然语言命令
section: manual
subsection: mcp
order: 2
---

# MCP 工具参考

Skill Seekers 为 Claude Code Desktop 和其他 AI 代理提供 **26 个 MCP（模型上下文协议）工具**。这些工具支持技能创建、代码库分析和知识管理的自然语言命令。

## 概述

MCP 工具允许 AI 代理：
- 从文档、代码和 PDF **创建技能**
- 使用 C3.x 模式检测 **分析代码库**
- 使用 AI 驱动的改进 **增强知识**
- **管理配置**以支持不同平台

所有工具都在 **5 个 AI 代理平台**上工作：Claude Code、Cursor、Windsurf、VS Code 和 IntelliJ。

---

## 工具类别

### 🎯 技能创建工具 (8)

用于从各种来源创建技能的工具：

| 工具 | 描述 | 示例命令 |
|------|------|----------|
| `scrape_docs` | 抓取文档网站 | "抓取 React 文档" |
| `scrape_github` | 分析 GitHub 仓库 | "分析 facebook/react" |
| `scrape_pdf` | 从 PDF 提取内容 | "提取 my-api.pdf" |
| `unified_scrape` | 多源技能创建 | "从文档 + GitHub 创建技能" |
| `create_skill` | 从本地文件创建技能 | "从 ./my-project 创建技能" |
| `clone_skill` | 复制现有技能 | "克隆我的 react 技能" |
| `merge_skills` | 合并多个技能 | "合并 react 和 redux 技能" |
| `split_skill` | 拆分大型技能 | "将技能拆分成更小的块" |

### 🔍 分析工具 (6)

C3.x 代码库分析功能：

| 工具 | 描述 | 示例命令 |
|------|------|----------|
| `analyze_codebase` | 完整代码库分析 | "分析这个代码库" |
| `detect_patterns` | 查找设计模式 | "检测 src/ 中的模式" |
| `extract_tests` | 提取测试示例 | "提取测试示例" |
| `generate_guides` | 创建操作指南 | "生成设置指南" |
| `analyze_config` | 配置模式提取 | "分析配置文件" |
| `generate_architecture` | 创建 ARCHITECTURE.md | "生成架构文档" |

### ✨ 增强工具 (4)

AI 驱动的技能改进：

| 工具 | 描述 | 示例命令 |
|------|------|----------|
| `enhance_skill` | AI 增强技能 | "增强我的技能" |
| `improve_descriptions` | 更好的技能描述 | "改进描述" |
| `add_examples` | 生成代码示例 | "添加 Python 示例" |
| `validate_skill` | 检查技能质量 | "验证这个技能" |

### 📦 打包工具 (4)

特定于平台的打包：

| 工具 | 描述 | 示例命令 |
|------|------|----------|
| `package_for_claude` | 为 Claude AI 打包 | "为 Claude 打包" |
| `package_for_langchain` | 为 LangChain 打包 | "为 LangChain 打包" |
| `package_for_llamaindex` | 为 LlamaIndex 打包 | "为 LlamaIndex 打包" |
| `package_for_coding` | 为 AI IDE 打包 | "为 Cursor 打包" |

### ⚙️ 配置工具 (4)

管理和实用工具：

| 工具 | 描述 | 示例命令 |
|------|------|----------|
| `list_configs` | 显示可用配置 | "列出所有配置" |
| `validate_config` | 检查配置语法 | "验证我的配置" |
| `estimate_job` | 估算时间/成本 | "估算 react 文档抓取" |
| `resume_job` | 恢复中断的作业 | "恢复上一个作业" |

---

## 详细工具参考

### scrape_docs

将文档网站抓取到结构化技能中。

**参数：**
```json
{
  "url": "https://react.dev",
  "max_pages": 100,
  "selectors": { "content": "article" },
  "output_dir": "./output/react"
}
```

**示例命令：**
- "抓取 React 文档"
- "抓取 https://vuejs.org，最多 50 页"
- "使用自定义选择器抓取 Django 文档"

**返回：** 创建的技能目录路径

---

### scrape_github

分析 GitHub 仓库的代码模式和结构。

**参数：**
```json
{
  "repo": "facebook/react",
  "include_issues": false,
  "include_tests": true,
  "output_dir": "./output/react-github"
}
```

**示例命令：**
- "分析 facebook/react"
- "抓取包含测试的 GitHub 仓库"
- "分析包含 issues 的 python/cpython"

**返回：** 创建的技能目录路径

---

### analyze_codebase

本地代码库的完整 C3.x 分析套件。

**参数：**
```json
{
  "directory": "./my-project",
  "comprehensive": true,
  "output_format": "claude"
}
```

**示例命令：**
- "全面分析这个代码库"
- "分析 src/ 中的模式"
- "在我的项目上运行 C3.x 套件"

**返回：** 包含模式、测试和指南的分析结果

---

### enhance_skill

AI 增强技能内容以提高质量。

**参数：**
```json
{
  "skill_path": "./output/react",
  "method": "local",
  "platform": "claude"
}
```

**示例命令：**
- "增强我的 react 技能"
- "对这个技能使用 API 增强"
- "使用 Gemini 而不是 Claude 进行增强"

**返回：** 增强后的技能路径

---

### package_for_claude

为 Claude AI 平台打包技能。

**参数：**
```json
{
  "skill_path": "./output/react",
  "include_router": true
}
```

**示例命令：**
- "为 Claude 打包"
- "创建带路由器的 Claude 技能"
- "为 Claude AI 打包我的技能"

**返回：** 准备上传的打包技能

---

### estimate_job

在运行前估算时间和成本。

**参数：**
```json
{
  "config": "configs/react.json",
  "include_enhancement": true
}
```

**示例命令：**
- "估算 React 文档抓取"
- "这需要多长时间？"
- "估算此作业的成本"

**返回：** 时间估算和成本明细

---

## 平台特定功能

### Claude Code
- **传输：** stdio（原生）
- **最适合：** 交互式技能创建
- **功能：** 完整的 26 个工具支持

### Cursor
- **传输：** HTTP
- **最适合：** 代码库分析
- **功能：** 18 个核心工具

### Windsurf
- **传输：** HTTP
- **最适合：** Web 开发技能
- **功能：** 18 个核心工具

### VS Code
- **传输：** stdio
- **最适合：** 开发工作流
- **功能：** 20 个工具

### IntelliJ
- **传输：** HTTP
- **最适合：** Java/Kotlin 项目
- **功能：** 18 个核心工具

---

## 常见工作流

### 工作流 1：快速技能创建
```
1. scrape_docs → 从文档创建技能
2. enhance_skill → AI 改进
3. package_for_claude → 平台打包
4. validate_skill → 质量检查
```

### 工作流 2：代码库分析
```
1. analyze_codebase → 完整分析
2. detect_patterns → 查找模式
3. extract_tests → 获取示例
4. generate_guides → 创建教程
5. package_for_coding → IDE 集成
```

### 工作流 3：多源技能
```
1. unified_scrape → 组合来源
2. merge_skills → 合并输出
3. enhance_skill → AI 增强
4. package_for_langchain → RAG 管道
```

---

## 故障排除

### 找不到工具
```bash
# 重新运行 MCP 设置
./setup_mcp.sh
```

### 权限错误
```bash
# 检查 MCP 设置文件
ls -la ~/.claude/mcp_settings.json
```

### 超时问题
- 在 MCP 设置中增加超时
- 对长时间操作使用 `--timeout` 标志

---

## 另请参阅

- [MCP 设置指南](/docs/manual/mcp/setup) - 安装和配置
- [多代理设置](/docs/guides/multi-agent) - 与不同 AI 代理一起使用
- [Claude 集成](/docs/reference/claude-integration) - Claude 特定功能
