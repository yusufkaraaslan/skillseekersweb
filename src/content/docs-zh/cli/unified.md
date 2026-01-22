---
title: unified - 多源抓取
description: 将文档网站、GitHub 仓库和 PDF 组合成单个统一技能，具有自动冲突检测
section: cli
order: 5
---

# unified - 多源抓取

将多个源（文档 + GitHub + PDF）组合成一个统一技能，具有冲突检测功能。

## 基本用法

```bash
skill-seekers unified [OPTIONS]
```

## 快速示例

```bash
# 使用现有的统一配置
skill-seekers unified --config configs/react_unified.json
skill-seekers unified --config configs/django_unified.json
skill-seekers unified --config configs/fastapi_unified.json

# 使用三流架构分析 GitHub 仓库
skill-seekers unified \
    --repo-url https://github.com/facebook/react \
    --depth c3x \
    --fetch-github-metadata
```

## 为什么使用统一抓取？

**问题：** 文档和代码经常不同步。文档可能过时、缺少功能或记录已删除的功能。

**解决方案：** 统一抓取组合多个源并自动检测冲突。

## 三流架构

**v2.6.0 新功能** - GitHub 仓库被拆分为三个流：

1. **流 1：代码** - 深度 C3.x 分析（模式、示例、架构）
2. **流 2：文档** - 仓库文档（README、docs/*.md）
3. **流 3：洞察** - GitHub issues（常见问题 + 解决方案）

```bash
skill-seekers unified \
    --repo-url https://github.com/fastapi/fastapi \
    --depth c3x \
    --fetch-github-metadata \
    --output-dir output/fastapi
```

## 配置文件格式

```json
{
  "name": "myframework",
  "description": "来自文档 + 代码的完整框架知识",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.myframework.com/",
      "extract_api": true,
      "max_pages": 200
    },
    {
      "type": "github",
      "repo": "owner/myframework",
      "include_code": true,
      "code_analysis_depth": "deep"
    },
    {
      "type": "pdf",
      "pdf_path": "docs/manual.pdf",
      "extract_tables": true
    }
  ]
}
```

## 选项

### 必需（选择一个）

- `--config CONFIG` - 加载统一配置
- `--repo-url URL` - GitHub 仓库 URL

### 用于 GitHub 仓库

- `--depth DEPTH` - 分析深度：`basic` 或 `c3x`
- `--fetch-github-metadata` - 包含 issues、stars、forks
- `--output-dir DIR` - 输出目录

### 基于配置

- `--merge-mode MODE` - 冲突解决：`rule-based` 或 `ai-powered`

## 分析深度

### Basic（快速 - 1-2 分钟）

```bash
skill-seekers unified \
    --repo-url https://github.com/fastapi/fastapi \
    --depth basic
```

- 文件结构
- 导入关系
- 入口点
- GitHub 元数据（如果使用 --fetch-github-metadata）

### C3.x（全面 - 20-60 分钟）

```bash
skill-seekers unified \
    --repo-url https://github.com/fastapi/fastapi \
    --depth c3x \
    --fetch-github-metadata
```

- Basic 的所有内容
- **C3.1：** 设计模式检测
- **C3.2：** 测试示例提取
- **C3.3：** 操作指南生成
- **C3.4：** 配置分析
- **C3.7：** 架构模式
- GitHub issues 及解决方案

## 冲突检测

统一抓取自动检测 4 种类型的冲突：

### 1. 代码中缺失（🔴 高优先级）

```markdown
#### `initialize_auth(config: dict)`

🔴 **代码中缺失**：已记录但在实现中未找到

**文档：**
- 目的：初始化认证系统
- 参数：config（dict）- 认证配置
```

### 2. 文档中缺失（🟡 中等优先级）

```markdown
#### `initialize_auth(config: dict, timeout: int = 30)`

🟡 **文档中缺失**：已实现但未记录

**实现：**
- 文件：src/auth.py:45
- 有额外参数：timeout（int）= 30
```

### 3. 签名不匹配（⚠️ 警告）

```markdown
#### `move_local_x(delta: float)`

⚠️ **冲突**：文档签名与实现不同

**文档说：**
```python
def move_local_x(delta: float)
```

**代码实现：**
```python
def move_local_x(delta: float, snap: bool = False) -> None
```
```

### 4. 描述不匹配（ℹ️ 信息）

```markdown
#### `get_user_data()`

ℹ️ **冲突**：不同的描述

**文档：**「返回所有用户配置文件数据」
**代码文档字符串：**「返回用户数据，不包括敏感字段」
```

## 示例配置

### React（文档 + GitHub）

```json
{
  "name": "react",
  "description": "React 文档 + GitHub 仓库",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://react.dev/",
      "max_pages": 300
    },
    {
      "type": "github",
      "repo": "facebook/react",
      "code_analysis_depth": "deep"
    }
  ]
}
```

### FastAPI（文档 + GitHub + PDF）

```json
{
  "name": "fastapi",
  "description": "完整的 FastAPI 知识",
  "merge_mode": "ai-powered",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://fastapi.tiangolo.com/"
    },
    {
      "type": "github",
      "repo": "fastapi/fastapi",
      "include_issues": true,
      "max_issues": 100
    },
    {
      "type": "pdf",
      "pdf_path": "docs/fastapi_guide.pdf"
    }
  ]
}
```

## 输出结构

```
output/
└── {name}_unified_data/
    ├── SKILL.md                  # 带冲突标记的合并内容
    ├── references/
    │   ├── index.md
    │   ├── from_docs.md         # 文档内容
    │   ├── from_code.md         # 代码分析
    │   ├── from_pdf.md          # PDF 内容
    │   └── conflicts.md         # 冲突报告
    └── c3_analysis_temp/        # C3.x 分析数据
```

## 时间估算

| 配置 | 时间 |
|---------------|------|
| 仅文档 | 20-40 分钟 |
| 文档 + GitHub（basic） | 25-45 分钟 |
| 文档 + GitHub（c3x） | 40-80 分钟 |
| 文档 + GitHub（c3x）+ PDF | 50-90 分钟 |

## 下一步

- [三流架构](/docs/features/three-stream-architecture) - 了解架构
- [C3.x 分析](/docs/features/c3x-codebase-analysis) - 深度代码分析
- [Package 命令](/docs/cli/package) - 打包统一技能
