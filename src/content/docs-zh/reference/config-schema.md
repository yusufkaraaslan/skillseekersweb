---
title: "配置架构参考"
description: Skill Seekers 统一配置格式（v2.6.0）的完整参考
section: reference
order: 1
---

# 配置架构参考

v2.6.0 中引入的 Skill Seekers 统一配置格式的完整参考。

---

## 概述

统一配置格式允许您将多个源（文档、GitHub、PDF）组合到单个 AI 技能中，并具有智能内容合并功能。

**架构版本：** v2.6.0
**格式：** JSON
**向后兼容：** 是（仍支持旧版配置）

---

## 顶级字段

### 必需字段

#### `name`（字符串）
**必需** - 配置的唯一标识符。

- 必须是小写字母数字，带连字符或下划线
- 用作技能文件名
- 模式：`^[a-z0-9-_]+$`

```json
{
  "name": "react"
}
```

#### `description`（字符串）
**必需** - 技能涵盖内容的可读描述。

- 应解释何时使用此技能
- 出现在技能元数据和画廊中
- 建议长度：1-2 句

```json
{
  "description": "结合官方文档和 React 代码库的完整 React 知识。在构建 React 应用程序或了解 React 内部时使用。"
}
```

#### `sources`（数组）
**必需** - 源配置数组（至少需要 1 个）。

- 支持 3 种源类型：`documentation`、`github`、`pdf`
- 多个源会智能合并
- 顺序对合并冲突解决很重要

```json
{
  "sources": [
    { "type": "documentation", "base_url": "..." },
    { "type": "github", "repo": "..." }
  ]
}
```

### 可选字段

#### `merge_mode`（字符串）
**可选** - 使用多个源时的内容合并策略。

- **值：** `"rule-based"`（默认）| `"claude-enhanced"`
- **rule-based：** 基于类别的确定性合并
- **claude-enhanced：** AI 驱动的智能合并

```json
{
  "merge_mode": "rule-based"
}
```

---

## 源类型

### 文档源

从文档网站提取内容。

#### 必需字段

- **`type`**（字符串）- 必须是 `"documentation"`
- **`base_url`**（字符串）- 文档站点的基础 URL（带有 `http://` 或 `https://`）

#### 可选字段

##### `extract_api`（布尔值）
默认：`false` - 是否单独提取 API 参考部分。

```json
{
  "extract_api": true
}
```

##### `start_urls`（字符串数组）
开始抓取的特定 URL（绕过自动发现）。

```json
{
  "start_urls": [
    "https://docs.example.com/getting-started/",
    "https://docs.example.com/api/"
  ]
}
```

##### `selectors`（对象）
用于提取内容的 CSS 选择器。

**字段：**
- `main_content`（字符串）- 主要文档内容
- `title`（字符串）- 页面标题
- `code_blocks`（字符串）- 代码示例

```json
{
  "selectors": {
    "main_content": "article.docs",
    "title": "h1",
    "code_blocks": "pre code"
  }
}
```

##### `url_patterns`（对象）
控制要包含/排除的 URL。

**字段：**
- `include`（字符串数组）- 要包含的 URL 模式
- `exclude`（字符串数组）- 要排除的 URL 模式

```json
{
  "url_patterns": {
    "include": ["/docs/", "/api/", "/guide/"],
    "exclude": ["/blog/", "/changelog/"]
  }
}
```

##### `categories`（对象）
对页面进行分类，以实现更好的组织和合并。

- 键：类别名称
- 值：关键字/模式数组

```json
{
  "categories": {
    "getting_started": ["intro", "installation", "quickstart"],
    "api": ["api", "reference", "methods"],
    "guides": ["tutorial", "guide", "how-to"]
  }
}
```

##### `rate_limit`（数字）
请求之间的延迟（以秒为单位）（防止速率限制）。

```json
{
  "rate_limit": 0.5
}
```

##### `max_pages`（数字或 null）
**可选** - 要抓取的最大页数。如果未指定，则默认为无限制。

- **省略字段：** 无限制抓取（推荐）
- **null：** 显式无限制
- **-1：** 显式无限制
- **数字：** 限制为特定页数

```json
{
  // 选项 1：省略以实现无限制（推荐）
  // "max_pages": 未指定

  // 选项 2：显式无限制
  "max_pages": null

  // 选项 3：限制为特定数量
  // "max_pages": 300
}
```

**注意：** 从 v2.6.0 开始，无限制抓取是默认设置。仅在需要限制页面以进行测试或速率限制问题时才指定 `max_pages`。

#### 完整的文档源示例

```json
{
  "type": "documentation",
  "base_url": "https://docs.astro.build/en/",
  "extract_api": true,
  "start_urls": [
    "https://docs.astro.build/en/getting-started/",
    "https://docs.astro.build/en/core-concepts/"
  ],
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "url_patterns": {
    "include": ["/en/getting-started/", "/en/core-concepts/", "/en/guides/"],
    "exclude": ["/en/community/", "/en/blog/"]
  },
  "categories": {
    "getting_started": ["getting-started", "install"],
    "core_concepts": ["project-structure", "components"],
    "integrations": ["integrations", "framework"]
  },
  "rate_limit": 0.5
}
```

---

### GitHub 源

从 GitHub 提取代码、issues 和仓库元数据。

#### 必需字段

- **`type`**（字符串）- 必须是 `"github"`
- **`repo`**（字符串）- 格式为 `owner/repo` 的仓库

#### 可选字段

##### `enable_codebase_analysis`（布尔值）
默认：`false` - 启用带有 AST 解析的 C3.x 代码库分析。

```json
{
  "enable_codebase_analysis": true
}
```

##### `code_analysis_depth`（字符串）
启用 C3.x 时的代码分析深度。

- **值：** `"surface"` | `"deep"` | `"full"`
- **surface：** 文件结构、导出、导入
- **deep：** 函数签名、类定义
- **full：** 完整的 AST 分析

```json
{
  "code_analysis_depth": "deep"
}
```

##### `fetch_issues`（布尔值）
默认：`false` - 在技能中包含 GitHub issues。

```json
{
  "fetch_issues": true
}
```

##### `max_issues`（数字）
要获取的最大 issues 数（需要 `fetch_issues: true`）。

```json
{
  "max_issues": 100
}
```

##### `fetch_changelog`（布尔值）
默认：`false` - 如果存在，提取 CHANGELOG.md。

```json
{
  "fetch_changelog": true
}
```

##### `fetch_releases`（布尔值）
默认：`false` - 包含 GitHub 发布。

```json
{
  "fetch_releases": true
}
```

##### `file_patterns`（字符串数组）
要分析的文件的 Glob 模式（需要代码库分析）。

```json
{
  "file_patterns": [
    "src/**/*.ts",
    "packages/**/*.ts",
    "core/**/*.js"
  ]
}
```

##### `ai_mode`（字符串）
C3.x 分析的 AI 增强模式。

- **值：** `"auto"` | `"api"` | `"local"` | `"none"`
- **auto：** 自动检测最佳模式
- **api：** 使用 Claude API 进行增强
- **local：** 使用本地模型
- **none：** 跳过 AI 增强

```json
{
  "ai_mode": "auto"
}
```

#### 完整的 GitHub 源示例

```json
{
  "type": "github",
  "repo": "withastro/astro",
  "enable_codebase_analysis": true,
  "code_analysis_depth": "deep",
  "fetch_issues": true,
  "max_issues": 100,
  "fetch_changelog": true,
  "fetch_releases": true,
  "file_patterns": [
    "packages/astro/src/**/*.ts",
    "packages/integrations/**/*.ts"
  ],
  "ai_mode": "auto"
}
```

---

### PDF 源

从 PDF 文档中提取内容。

#### 必需字段

- **`type`**（字符串）- 必须是 `"pdf"`
- **`path`**（字符串）- PDF 文件的路径（本地或远程 URL）

#### 可选字段

##### `ocr`（布尔值）
默认：`false` - 为扫描的 PDF 启用 OCR。

```json
{
  "ocr": true
}
```

##### `password`（字符串）
加密 PDF 的密码。

```json
{
  "password": "secret123"
}
```

##### `extract_tables`（布尔值）
默认：`false` - 将表格提取为结构化数据。

```json
{
  "extract_tables": true
}
```

##### `parallel`（布尔值）
默认：`false` - 并行处理页面以加快提取速度。

```json
{
  "parallel": true
}
```

#### 完整的 PDF 源示例

```json
{
  "type": "pdf",
  "path": "/path/to/manual.pdf",
  "ocr": true,
  "extract_tables": true,
  "parallel": true
}
```

---

## 完整示例

### 单源（仅文档）

```json
{
  "name": "vue",
  "description": "用于构建响应式 Web 应用程序的 Vue.js 3 文档。",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://vuejs.org/guide/",
      "selectors": {
        "main_content": "article",
        "title": "h1",
        "code_blocks": "pre code"
      },
      "rate_limit": 0.5
    }
  ]
}
```

### 多源（文档 + GitHub）

```json
{
  "name": "fastapi",
  "description": "结合文档和代码库分析的完整 FastAPI 知识。用于构建高性能 Python API。",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://fastapi.tiangolo.com/",
      "extract_api": true,
      "selectors": {
        "main_content": ".md-content",
        "title": "h1",
        "code_blocks": "pre code"
      },
      "categories": {
        "getting_started": ["tutorial", "first-steps"],
        "advanced": ["advanced", "security", "database"],
        "deployment": ["deployment", "docker", "server"]
      },
      "rate_limit": 0.5
    },
    {
      "type": "github",
      "repo": "tiangolo/fastapi",
      "enable_codebase_analysis": true,
      "code_analysis_depth": "deep",
      "fetch_issues": true,
      "max_issues": 50,
      "file_patterns": [
        "fastapi/**/*.py"
      ]
    }
  ]
}
```

### 多源（文档 + GitHub + PDF）

```json
{
  "name": "enterprise-system",
  "description": "来自多个源的完整企业系统文档。",
  "merge_mode": "claude-enhanced",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.enterprise.com/",
      "rate_limit": 1.0
    },
    {
      "type": "github",
      "repo": "company/enterprise-system",
      "enable_codebase_analysis": true,
      "code_analysis_depth": "full",
      "file_patterns": ["src/**/*.ts", "api/**/*.ts"]
    },
    {
      "type": "pdf",
      "path": "/docs/enterprise-manual-v2.pdf",
      "extract_tables": true,
      "parallel": true
    }
  ]
}
```

---

## 验证

### 使用 CLI

```bash
# 验证配置文件
skill-seekers validate configs/my-config.json

# 将旧版配置转换为统一格式
skill-seekers convert configs/legacy-config.json
```

### 使用 Web 验证器

访问 [skillseekersweb.com/configs](https://skillseekersweb.com/configs) 并滚动到"验证您的配置"部分：

1. 粘贴您的 JSON 配置
2. 点击"验证配置"
3. 修复任何错误
4. 有效时提交到 GitHub

---

## 旧版配置支持

Skill Seekers v2.6.0+ 仍支持旧版配置（单源格式）。

**旧版格式：**
```json
{
  "name": "example",
  "description": "Example docs",
  "base_url": "https://docs.example.com",
  "selectors": { "main_content": "article" }
}
```

**自动转换为：**
```json
{
  "name": "example",
  "description": "Example docs",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.example.com",
      "selectors": { "main_content": "article" }
    }
  ]
}
```

---

## 最佳实践

### 1. 命名约定
- 使用小写和连字符：`fast-api`、`react-router`
- 尽可能匹配官方框架名称
- 描述性：`godot-game-engine` 而不是 `godot`

### 2. 描述指南
- 解释技能涵盖的知识
- 包含何时使用技能
- 保持简洁（1-2 句）
- 使用动词："在构建...时使用"，"帮助..."

### 3. 多源配置
- 按权威性排序源（官方文档优先，然后是 GitHub）
- 使用 `merge_mode: "rule-based"` 以获得确定性结果
- 使用 `merge_mode: "claude-enhanced"` 进行复杂合并
- 定义明确的类别以实现更好的合并

### 4. 速率限制
- 从 `rate_limit: 0.5`（500ms 延迟）开始
- 如果受到速率限制，请增加
- 官方文档：0.5-1.0 秒
- 社区站点：1.0-2.0 秒

### 5. 页面限制
- **默认：** 无限制抓取（推荐用于完整文档）
- **何时限制：** 测试配置，遵守严格的速率限制
- **如何限制：** 设置 `"max_pages": 100` 以指定页数
- **无限制模式：** 省略字段，使用 `null` 或使用 `-1`

### 6. GitHub 代码库分析
- 大多数情况下使用 `code_analysis_depth: "deep"`
- 仅在关键框架分析时使用 `"full"`
- 将 `file_patterns` 限制为相关目录
- 设置 `max_issues` 以避免内容过多

---

## 从旧版配置迁移

如果您有旧版配置（v2.6.0 之前），您可以：

### 选项 1：自动转换
```bash
skill-seekers convert configs/legacy-config.json > configs/new-config.json
```

### 选项 2：手动迁移

**旧版：**
```json
{
  "name": "django",
  "base_url": "https://docs.djangoproject.com/en/stable/",
  "selectors": { "main_content": "div.document" }
}
```

**新版（统一）：**
```json
{
  "name": "django",
  "description": "Django Web 框架文档",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.djangoproject.com/en/stable/",
      "selectors": { "main_content": "div.document" }
    }
  ]
}
```

---

## 另请参阅

- [创建自定义配置教程](/zh/docs/tutorials/creating-configs) - 分步指南
- [统一抓取指南](/zh/docs/manual/scraping/unified-scraping) - 多源抓取
- [C3.x 代码库分析](/zh/docs/manual/codebase-analysis/c3x-codebase-analysis) - GitHub 分析功能
- [配置画廊](/configs) - 27+ 个预设配置

---

**架构版本：** v2.6.0
**最后更新：** 2026 年 1 月
**向后兼容：** 是（支持旧版配置）
