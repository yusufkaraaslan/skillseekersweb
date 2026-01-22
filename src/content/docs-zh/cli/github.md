---
title: github - 仓库抓取
description: 抓取 GitHub 仓库，具有深度代码分析、API 提取以及文档与代码之间的冲突检测
section: cli
order: 3
---

# github - 仓库抓取

抓取 GitHub 仓库并使用深度 AST 解析分析代码。

## 基本用法

```bash
skill-seekers github [OPTIONS]
```

## 快速示例

```bash
# 基本仓库抓取
skill-seekers github --repo facebook/react

# 使用配置文件
skill-seekers github --config configs/react_github.json

# 带身份验证（更高速率限制）
export GITHUB_TOKEN=ghp_your_token_here
skill-seekers github --repo facebook/react

# 包含 issues 和更新日志
skill-seekers github --repo django/django \
    --include-issues \
    --max-issues 100 \
    --include-changelog \
    --include-releases
```

## 选项

### 必需

- `--repo OWNER/REPO` - GitHub 仓库（例如：facebook/react）
- 或 `--config CONFIG` - 从文件加载配置

### 可选

- `--include-issues` - 提取 GitHub Issues
- `--max-issues N` - 限制 issue 数量（默认：50）
- `--include-changelog` - 提取 CHANGELOG.md
- `--include-releases` - 提取 GitHub Releases
- `--code-analysis-depth DEPTH` - 分析深度：surface、medium、deep
- `--output DIR` - 输出目录

### 身份验证

```bash
# 设置 GitHub token 以获得更高速率限制
export GITHUB_TOKEN=ghp_your_token_here
```

## 功能

### 代码分析

- ✅ **深度 AST 解析** - Python、JavaScript、TypeScript、Java、C++、Go
- ✅ **API 提取** - 函数、类、方法及参数
- ✅ **类型检测** - 自动类型推断
- ✅ **冲突检测** - 比较文档与代码实现

### 仓库元数据

- ✅ **README** - 自动提取
- ✅ **文件树** - 完整目录结构
- ✅ **语言分类** - 按文件数量和字节数
- ✅ **Stars/Forks** - 仓库统计

### GitHub 功能

- ✅ **Issues 和 PR** - 开放/关闭及标签
- ✅ **CHANGELOG** - 版本历史
- ✅ **Releases** - GitHub 发布及说明
- ✅ **Milestones** - 项目规划

## 分析深度

### Surface（快速 - 1-2 分钟）

```bash
skill-seekers github --repo facebook/react --code-analysis-depth surface
```

- 文件结构
- 导入关系
- 入口点
- 基本元数据

### Medium（标准 - 5-10 分钟）

```bash
skill-seekers github --repo facebook/react --code-analysis-depth medium
```

- Surface 的所有内容
- 函数/类签名
- API 文档
- 常见模式

### Deep（全面 - 20-60 分钟）

```bash
skill-seekers github --repo facebook/react --code-analysis-depth deep
```

- Medium 的所有内容
- 设计模式检测（C3.1）
- 测试示例提取（C3.2）
- 操作指南生成（C3.3）
- 配置分析（C3.4）
- 架构模式（C3.7）

## 输出结构

```
output/
└── {repo-name}/
    ├── SKILL.md
    ├── references/
    │   ├── index.md
    │   ├── api_reference.md
    │   ├── code_examples.md
    │   └── github_issues.md
    └── c3_analysis_temp/    # C3.x 分析数据
        ├── patterns/
        ├── test_examples/
        └── config_patterns/
```

## 高级示例

### 带所有功能

```bash
export GITHUB_TOKEN=ghp_...

skill-seekers github --repo fastapi/fastapi \
    --code-analysis-depth deep \
    --include-issues \
    --max-issues 200 \
    --include-changelog \
    --include-releases \
    --output output/fastapi
```

### 配置文件

```json
{
  "name": "fastapi",
  "type": "github",
  "repo": "fastapi/fastapi",
  "include_code": true,
  "code_analysis_depth": "deep",
  "include_issues": true,
  "max_issues": 100,
  "include_changelog": true,
  "include_releases": true
}
```

## 时间估算

- Surface 分析：1-2 分钟
- Medium 分析：5-10 分钟
- Deep 分析（C3.x）：20-60 分钟

## 下一步

- [Unified 命令](/docs/cli/unified) - 多源抓取
- [C3.x 分析](/docs/features/c3x-codebase-analysis) - 深度代码分析
- [三流架构](/docs/features/three-stream-architecture) - 高级功能
