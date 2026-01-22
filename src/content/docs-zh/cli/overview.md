---
title: CLI 概述
description: 所有 Skill Seekers CLI 命令概述 - 抓取、增强、打包和上传技能到多个平台
section: cli
order: 1
---

# CLI 概述

Skill Seekers 提供全面的命令行界面,用于在多个平台上创建、增强和部署 AI 技能。

## 可用命令

### 核心命令

| 命令 | 用途 | 时间 | 示例 |
|---------|---------|------|---------|
| [`scrape`](/docs/cli/scrape) | 抓取文档网站 | 20-40 分钟 | `skill-seekers scrape --config configs/react.json` |
| [`github`](/docs/cli/github) | 抓取 GitHub 仓库 | 5-10 分钟 | `skill-seekers github --repo facebook/react` |
| [`pdf`](/docs/cli/pdf) | 从 PDF 提取内容 | 5-15 分钟 | `skill-seekers pdf --pdf manual.pdf --name myskill` |
| [`unified`](/docs/cli/unified) | 多源抓取 | 30-45 分钟 | `skill-seekers unified --config configs/react_unified.json` |

### 处理命令

| 命令 | 用途 | 时间 | 示例 |
|---------|---------|------|---------|
| [`enhance`](/docs/cli/enhance) | AI 增强技能 | 30-60 秒 | `skill-seekers enhance output/react/` |
| [`package`](/docs/cli/package) | 为平台打包 | 即时 | `skill-seekers package output/react/ --target claude` |
| [`upload`](/docs/cli/upload) | 上传到 LLM 平台 | 5-10 秒 | `skill-seekers upload output/react.zip` |

### 实用命令

| 命令 | 用途 | 时间 | 示例 |
|---------|---------|------|---------|
| [`config`](/docs/cli/config) | 配置令牌和设置 | 即时 | `skill-seekers config --github` |
| [`resume`](/docs/cli/resume) | 恢复中断的作业 | 可变 | `skill-seekers resume abc123` |
| `estimate` | 估计页面数量 | 1-2 分钟 | `skill-seekers estimate --config configs/react.json` |
| `validate` | 验证配置文件 | 即时 | `skill-seekers validate configs/react.json` |
| `install` | 一键安装 | 可变 | `skill-seekers install output/react.zip` |

## 快速参考

### 完整工作流程

```bash
# 1. 抓取文档
skill-seekers scrape --config configs/react.json

# 2. 使用 AI 增强
skill-seekers enhance output/react/

# 3. 为平台打包
skill-seekers package output/react/ --target claude

# 4. 上传到平台
skill-seekers upload output/react.zip
```

### 多平台工作流程

```bash
# 抓取一次
skill-seekers scrape --config configs/react.json

# 为所有平台打包
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown

# 上传到平台
skill-seekers upload output/react.zip --target claude
skill-seekers upload output/react-gemini.tar.gz --target gemini
skill-seekers upload output/react-openai.zip --target openai
```

## 命令类别

### 源命令

从各种来源提取内容:
- **scrape** - 文档网站
- **github** - GitHub 仓库
- **pdf** - PDF 文档
- **unified** - 多个来源组合

### 处理命令

转换和打包技能:
- **enhance** - AI 驱动的改进
- **package** - 特定平台打包
- **upload** - 部署到 LLM 平台

## 通用选项

大多数命令支持这些选项:

- `--config CONFIG` - 从文件加载配置
- `--name NAME` - 技能名称
- `--output DIR` - 输出目录
- `--help` - 显示命令帮助

## 配置管理 (v2.7.0)

v2.7.0 中的新功能: 交互式配置向导和作业恢复。

### 设置 GitHub 令牌

```bash
# 多配置文件令牌管理的交互式向导
skill-seekers config --github

# 设置多个配置文件(个人、工作等)
# 配置速率限制策略(prompt、wait、switch、fail)
# 测试连接并查看速率限制
```

### 配置 API 密钥

```bash
# 设置 AI 增强的 API 密钥
skill-seekers config --api-keys

# 支持: Claude (Anthropic)、Google Gemini、OpenAI ChatGPT
# 浏览器集成打开 API 密钥创建页面
# 具有 600 权限的安全存储
```

### 恢复中断的作业

```bash
# 列出所有可恢复的作业
skill-seekers resume --list

# 从检查点恢复特定作业
skill-seekers resume abc123def456

# 清理旧作业文件
skill-seekers resume --clean
```

**自动恢复功能:**
- 每 60 秒自动检查点(可配置)
- 从网络中断恢复
- 速率限制重置后继续
- 从系统崩溃恢复

## 获取帮助

```bash
# 常规帮助
skill-seekers --help

# 特定命令帮助
skill-seekers scrape --help
skill-seekers github --help
skill-seekers package --help
skill-seekers config --help
skill-seekers resume --help
```

## 下一步

**源命令:**
- [Scrape 命令](/docs/cli/scrape) - 文档抓取
- [GitHub 命令](/docs/cli/github) - 仓库抓取
- [Unified 命令](/docs/cli/unified) - 多源抓取

**处理命令:**
- [Enhance 命令](/docs/cli/enhance) - AI 增强
- [Package 命令](/docs/cli/package) - 多平台打包
- [Upload 命令](/docs/cli/upload) - 平台部署

**配置 (v2.7.0):**
- [Config 命令](/docs/cli/config) - 令牌和设置管理
- [Resume 命令](/docs/cli/resume) - 作业恢复
