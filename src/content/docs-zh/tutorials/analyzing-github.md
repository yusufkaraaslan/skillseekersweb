---
title: "教程：分析 GitHub 仓库"
description: 使用 C3.x 代码库分析套件分析 GitHub 仓库的分步教程
section: tutorials
order: 2
---

# 教程：分析 GitHub 仓库

学习如何使用 C3.x 分析分析 GitHub 仓库并生成全面的代码库文档。

**时间：** 20 分钟 | **级别：** 中级 | **结果：** 包含模式、示例和架构的完整代码库技能

---

## 您将学到什么

- 如何抓取 GitHub 仓库
- 如何使用 C3.x 代码库分析（模式、测试提取、操作指南）
- 如何组合 GitHub + 本地代码库分析
- 如何生成 ARCHITECTURE.md

## 步骤 1：基本 GitHub 抓取

```bash
skill-seekers github \
  --repository facebook/react \
  --output output/react-repo/
```

## 步骤 2：添加本地分析（无限制！）

```bash
# 先在本地克隆仓库
git clone https://github.com/facebook/react.git /tmp/react

# 使用 C3.x 功能分析
skill-seekers github \
  --repository facebook/react \
  --local-repo-path /tmp/react \
  --output output/react-complete/
```

**您将获得：**
- 模式检测（Singleton、Factory、Observer 等）
- 测试示例提取
- 操作指南生成
- 配置分析
- 架构概览（ARCHITECTURE.md）

## 步骤 3：查看生成的文件

```
output/react-complete/
├── SKILL.md
├── ARCHITECTURE.md              # 新增：全面概览
├── references/
│   ├── api_reference.md
│   ├── dependencies.md
│   └── codebase_analysis/
│       ├── patterns/            # 检测到的设计模式
│       ├── examples/            # 提取的测试示例
│       ├── guides/              # 生成的操作指南
│       └── configuration/       # 分析的配置文件
```

**参见：** [GitHub 分析手册](/docs/manual/scraping/github)获取完整详情。
