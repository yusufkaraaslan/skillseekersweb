---
title: 概览
description: 了解 Skill Seekers 是什么以及它如何将文档转换为 AI 技能
section: getting-started
order: 1
---

# 什么是 Skill Seekers？

Skill Seekers 是一个自动化工具，可将文档网站、GitHub 仓库和 PDF 文件转换为生产就绪的 Claude AI 技能。无需手动阅读和总结文档，Skill Seekers 可以：

1. **抓取**多个来源（文档、GitHub 仓库、PDF）的内容
2. **分析**代码仓库，进行深度 AST 解析
3. **检测**文档和代码实现之间的冲突
4. **组织**内容为分类的参考文件
5. **增强**使用 AI 提取最佳示例和关键概念
6. **打包**所有内容为可上传到 Claude 的文件

**结果：** 20-40 分钟内获得任何框架、API 或工具的全面 Claude 技能，而不是数小时的手动工作。

## 为什么使用 Skill Seekers？

- 🎯 **为开发者**: 从文档 + GitHub 仓库创建技能，带有冲突检测
- 🎮 **为游戏开发者**: 为游戏引擎生成技能（Godot 文档 + GitHub、Unity 等）
- 🔧 **为团队**: 将内部文档 + 代码仓库合并为单一信息源
- 📚 **为学习者**: 从文档、代码示例和 PDF 构建全面技能
- 🔍 **为开源项目**: 分析仓库以发现文档空白和过时示例

## 快速示例

```bash
# 安装
pip install skill-seekers

# 抓取文档
skill-seekers scrape https://docs.astro.build/en/getting-started/

# 为 Claude 打包
skill-seekers package output/astro/

# 上传到 Claude
skill-seekers upload astro.zip
```

就是这样！您现在在 Claude 中拥有了一个全面的 Astro 技能。

## 核心功能

### 多源支持
- 文档网站（任何带有文档的网站）
- GitHub 仓库（带有深度 C3.x 分析）
- PDF 文件（支持 OCR）
- 从多个来源组合的统一技能

### 三流架构 (v2.6.0)
- **流 1: 代码** - 深度 C3.x 分析（模式、示例、架构）
- **流 2: 文档** - 仓库文档（README、docs/）
- **流 3: 洞察** - GitHub issues（常见问题 + 解决方案）
- 文档和代码之间的自动冲突检测
- 来自 GitHub 的真实用户问题和解决方案

### C3.x 代码库分析 (v2.6.0)
- **C3.1:** 设计模式检测（策略、工厂等）
- **C3.2:** 测试示例提取（来自测试的工作代码）
- **C3.3:** 操作指南生成（自动化教程）
- **C3.4:** 配置分析（9 种格式，带安全扫描）
- **C3.7:** 架构模式检测（MVC、微服务等）

### 多平台导出
- **Claude AI**（默认）- ZIP + YAML 格式
- **Google Gemini** - tar.gz，带平台优化
- **OpenAI ChatGPT** - ZIP，带向量存储
- **通用 Markdown** - 通用 Markdown 格式

### 智能处理
- 自动内容分类
- 代码语言检测（Python、JS、C++、GDScript 等）
- 文档和代码之间的冲突检测
- AI 增强和摘要
- 智能缓存加快重新运行（50% 提速）

## v2.7.0 新功能

**智能速率限制管理和多令牌配置：**
- 多配置文件 GitHub 令牌管理，自动切换
- 交互式配置向导（`skill-seekers config`）
- 智能速率限制处理，四种策略（提示、等待、切换、失败）
- 中断任务的恢复命令（`skill-seekers resume`）
- CI/CD 流水线的非交互模式

**自托管和引导功能：**
- 将 Skill Seekers 生成为 Claude Code 技能
- 使用 `./scripts/bootstrap_skill.sh` 一键引导
- MCP 现在是可选的 - 使用 `pip install skill-seekers[mcp]` 安装

**增强的测试和质量：**
- 1200+ 测试通过（从 700+ 增加）
- 使用 ruff 零 linting 错误
- 引导的全面 E2E 测试

[阅读完整的 v2.7.0 更新日志 →](/docs/community/changelog)

## 下一步

- [安装指南](/docs/getting-started/installation) - 设置 Skill Seekers v2.7.0
- [快速开始](/docs/getting-started/quick-start) - 5 分钟内创建您的第一个技能
- [浏览配置](/configs) - 探索 24 个预构建配置
