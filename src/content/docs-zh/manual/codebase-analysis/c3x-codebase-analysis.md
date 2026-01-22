---
title: C3.x 代码库分析
description: 深度 AST 分析，从代码中提取模式、示例、指南和配置
section: manual
subsection: codebase-analysis
order: 2
---

# C3.x 代码库分析

**v2.6.0 新增**

C3.x 是 Skill Seekers 的深度代码库分析系统，使用抽象语法树（AST）解析从源代码中提取全面的知识。它远远超越简单的抓取，能够理解代码的实际工作方式。

## 什么是 C3.x？

C3.x 代表**全面代码库上下文提取**，包含 7 个分析模块：

- **C3.1：** 设计模式检测
- **C3.2：** 测试示例提取
- **C3.3：** 操作指南生成
- **C3.4：** 配置模式分析
- **C3.5：**（保留供将来使用）
- **C3.6：**（保留供将来使用）
- **C3.7：** 架构模式检测

## 支持的语言

C3.x 通过 AST 解析分析以下语言的代码：

| 语言 | 解析器 | 模式 | 示例 | 配置 |
|----------|--------|----------|----------|---------|
| Python | ast 模块 | ✅ | ✅ | ✅ |
| JavaScript | babel | ✅ | ✅ | ✅ |
| TypeScript | typescript | ✅ | ✅ | ✅ |
| Java | javalang | ✅ | ✅ | ✅ |
| C++ | clang | ✅ | ✅ | ❌ |
| Go | go/parser | ✅ | ✅ | ✅ |
| Rust | syn | ✅ | ✅ | ✅ |

## C3.1：设计模式检测

自动检测代码库中的常见设计模式。

### 检测的模式

**创建型模式：**
- 单例模式
- 工厂方法
- 抽象工厂
- 建造者模式
- 原型模式

**结构型模式：**
- 适配器模式
- 桥接模式
- 组合模式
- 装饰器模式
- 外观模式
- 代理模式

**行为型模式：**
- 策略模式
- 观察者模式
- 命令模式
- 模板方法
- 迭代器模式
- 状态模式

### 输出示例

```json
{
  "pattern": "Strategy",
  "confidence": 0.95,
  "location": "src/providers/oauth_provider.py",
  "line_number": 42,
  "context": {
    "interface": "OAuthProvider",
    "implementations": [
      "GoogleProvider",
      "AzureProvider",
      "GitHubProvider"
    ],
    "usage_count": 206
  },
  "explanation": "Strategy pattern allows runtime selection of OAuth provider implementation"
}
```

### 真实世界结果

从分析 `fastmcp` 仓库得到：

- **905 个模式实例**检测
- **206 个策略模式**（OAuth 提供商）
- **142 个工厂模式**（提供商创建）
- **87 个装饰器模式**（异步工具）

## C3.2：测试示例提取

从测试文件中提取可工作的代码示例。

### 为什么使用测试文件？

测试文件包含：
- ✅ 完整的、可工作的示例
- ✅ 真实的用例
- ✅ 预期行为
- ✅ 已处理的边界情况

### 输出示例

```json
{
  "title": "OAuth with Google Provider",
  "source": "tests/test_oauth.py:23-45",
  "language": "python",
  "code": "def test_google_oauth():\n    provider = GoogleProvider(\n        client_id='test-id',\n        client_secret='test-secret',\n        redirect_uri='http://localhost:8000/callback'\n    )\n    \n    auth_url = provider.get_authorization_url()\n    assert 'accounts.google.com' in auth_url",
  "description": "Configure Google OAuth provider with credentials and generate authorization URL",
  "category": "authentication",
  "complexity": "medium",
  "confidence": 0.92
}
```

### 真实世界结果

从 `fastmcp` 仓库得到：

- **723 个测试示例**提取
- 分类：身份验证（150）、异步（80）、测试（60）
- 所有示例都经过验证可编译/运行
- 包括设置、执行和断言

## C3.3：操作指南生成

从代码模式生成分步教程。

### 生成过程

1. **模式检测** - 查找重复的代码模式
2. **上下文分析** - 理解模式的作用
3. **示例选择** - 选择最佳示例
4. **指南生成** - 创建分步说明

### 输出示例

```markdown
# How to Implement OAuth Authentication

## Overview
This guide shows how to add OAuth authentication using the Strategy pattern.

## Prerequisites
- Provider credentials (client_id, client_secret)
- Redirect URI configured

## Step 1: Create Provider Instance
\`\`\`python
from fastmcp import GoogleProvider

provider = GoogleProvider(
    client_id="your-client-id",
    client_secret="your-secret",
    redirect_uri="http://localhost:8000/callback"
)
\`\`\`

## Step 2: Generate Authorization URL
\`\`\`python
auth_url = provider.get_authorization_url()
# Redirect user to auth_url
\`\`\`

## Step 3: Handle Callback
\`\`\`python
token = provider.exchange_code(request.params['code'])
user_info = provider.get_user_info(token)
\`\`\`

## Common Issues
- **Redirect URI mismatch:** Ensure URI matches exactly in provider console
- **Invalid credentials:** Double-check client_id and client_secret
```

## C3.4：配置模式分析

分析配置文件以理解设置模式。

### 支持的格式

| 格式 | 扩展名 | 安全扫描 | 验证 |
|--------|-----------|---------------|------------|
| JSON | `.json` | ✅ | ✅ |
| YAML | `.yml`, `.yaml` | ✅ | ✅ |
| TOML | `.toml` | ✅ | ✅ |
| INI | `.ini`, `.cfg` | ✅ | ✅ |
| ENV | `.env` | ✅ | ✅ |
| XML | `.xml` | ✅ | ✅ |
| Properties | `.properties` | ✅ | ✅ |
| HCL | `.hcl`, `.tf` | ✅ | ✅ |
| Dotenv | `.env.*` | ✅ | ✅ |

### AI 驱动的安全分析

自动扫描：

- ❌ 硬编码的密钥
- ❌ 暴露的 API 密钥
- ❌ 不安全的默认值
- ❌ 缺少验证
- ❌ 弱加密设置

### 输出示例

```json
{
  "file": "config/settings.json",
  "format": "json",
  "structure": {
    "database": {
      "host": "localhost",
      "port": 5432,
      "name": "myapp_db"
    },
    "oauth": {
      "providers": ["google", "github"],
      "redirect_uri": "/auth/callback"
    }
  },
  "security_issues": [
    {
      "severity": "high",
      "issue": "Hardcoded database password",
      "line": 5,
      "recommendation": "Use environment variables"
    }
  ],
  "best_practices": [
    {
      "category": "security",
      "suggestion": "Add secrets rotation policy"
    }
  ]
}
```

## C3.7：架构模式检测

识别高级架构模式。

### 检测的架构

| 模式 | 描述 | 指标 |
|---------|-------------|------------|
| **分层架构** | 水平分层（表示层、业务层、数据层） | 按文件夹结构清晰分离 |
| **微服务** | 独立服务 | 多个入口点、独立配置 |
| **服务层** | 服务中的业务逻辑 | 控制器和模型之间的服务类 |
| **仓储模式** | 数据访问抽象 | 数据库的仓储模式 |
| **MVC** | 模型-视图-控制器 | 清晰的关注点分离 |
| **MVVM** | 模型-视图-视图模型 | ViewModel 在视图和模型之间进行中介 |
| **六边形架构** | 端口和适配器 | 核心领域与基础设施分离 |
| **事件驱动** | 异步消息传递 | 事件发射器和监听器 |

### 输出示例

```json
{
  "primary_pattern": "Service Layer",
  "confidence": 0.89,
  "indicators": {
    "service_classes": 47,
    "repository_classes": 23,
    "controller_classes": 31,
    "pattern_consistency": 0.92
  },
  "architecture_description": "Application follows Service Layer pattern with 47 service classes handling business logic, 23 repositories for data access, and 31 controllers for HTTP handling.",
  "recommendations": [
    "Consider extracting common service logic into base class",
    "Add service interface layer for better testing"
  ]
}
```

## 用法

### 基本 C3.x 分析

```bash
skill-seekers unified \
  --source /path/to/project \
  --depth c3x \
  --output-dir output/my-project
```

### 使用 GitHub 仓库

```bash
skill-seekers unified \
  --repo-url https://github.com/fastapi/fastapi \
  --depth c3x \
  --fetch-github-metadata \
  --output-dir output/fastapi
```

### 配置文件

```json
{
  "name": "my-framework",
  "sources": [
    {
      "type": "codebase",
      "source": "https://github.com/org/my-framework",
      "analysis_depth": "c3x",
      "c3x_modules": {
        "patterns": true,
        "examples": true,
        "guides": true,
        "configs": true,
        "architecture": true
      }
    }
  ]
}
```

### 选择性模块分析

仅启用特定模块：

```json
{
  "c3x_modules": {
    "patterns": true,    // C3.1
    "examples": true,    // C3.2
    "guides": false,     // C3.3（跳过）
    "configs": true,     // C3.4
    "architecture": true // C3.7
  }
}
```

## 性能

### 分析时间

| 仓库大小 | 文件数 | 基本模式 | C3.x 完整 |
|-----------|-------|-------|-----------|
| 小型 | < 100 | 10秒 | 2-5 分钟 |
| 中型 | 100-500 | 30秒 | 10-20 分钟 |
| 大型 | 500-1000 | 1 分钟 | 20-40 分钟 |
| 超大型 | 1000+ | 2 分钟 | 40-60 分钟 |

### 缓存

C3.x 使用智能缓存：

- **文件级缓存** - 仅重新分析更改的文件
- **模块缓存** - 跳过未更改的模块
- **快 50%** - 重新运行时

示例：
```bash
# 首次运行：30 分钟
skill-seekers unified --source /my/project --depth c3x

# 更改 5 个文件后：3 分钟
skill-seekers unified --source /my/project --depth c3x
```

## 输出结构

```
output/my-framework_unified_data/
├── c3_analysis_temp/
│   ├── patterns/
│   │   └── detected_patterns.json        (C3.1)
│   ├── test_examples/
│   │   └── test_examples.json            (C3.2)
│   ├── how_to_guides/
│   │   └── guides.json                   (C3.3)
│   ├── config_patterns/
│   │   └── config_patterns.json          (C3.4)
│   └── architecture/
│       └── architectural_patterns.json    (C3.7)
│
├── references/
│   ├── patterns.md
│   ├── examples.md
│   ├── guides.md
│   └── architecture.md
│
└── SKILL.md                               (最终技能文件)
```

## AI 增强

在 C3.x 分析之后，您可以使用 AI 增强：

```bash
skill-seekers enhance \
  --input output/my-framework_unified_data \
  --ai-provider anthropic \
  --enhancement-mode comprehensive
```

**AI 添加的内容：**
- 更好的模式解释
- 为示例提供更多上下文
- 改进的指南格式
- 最佳实践建议
- 安全咨询详情

## 最佳实践

### 小型项目（< 100 个文件）

```json
{
  "analysis_depth": "c3x",
  "c3x_modules": {
    "patterns": true,
    "examples": true,
    "guides": true,
    "configs": true,
    "architecture": true
  }
}
```

**时间：** 2-5 分钟

### 大型项目（1000+ 个文件）

```json
{
  "analysis_depth": "c3x",
  "c3x_modules": {
    "patterns": true,      // 必需
    "examples": true,      // 必需
    "guides": false,       // 跳过（耗时）
    "configs": true,       // 必需
    "architecture": true   // 快速，保留
  },
  "max_examples_per_category": 50  // 限制输出
}
```

**时间：** 20-30 分钟

### 快速概览

改用 `basic` 模式：

```bash
skill-seekers unified \
  --source /my/project \
  --depth basic
```

**时间：** 1-2 分钟
**获得：** 文件结构、导入、入口点（无 C3.x）

## 故障排除

### "分析时间过长"

- 使用 `--depth basic` 进行快速概览
- 禁用 C3.3（指南）模块
- 限制示例：`--max-examples-per-category 50`
- 排除测试文件夹：`--exclude-dirs tests,docs`

### "检测到的模式不够多"

- 检查语言支持（Python、JS、TS 支持最好）
- 确保代码遵循标准模式
- 降低置信度阈值：`--min-pattern-confidence 0.7`

### "缺少示例"

- 确保包含测试文件（不要排除 `tests/`）
- 检查测试命名约定（`test_*.py`、`*.test.js`）
- 降低示例置信度：`--min-example-confidence 0.8`

## 下一步

- [三流架构](/docs/features/three-stream-architecture) - 将 C3.x 与 GitHub 洞察结合
- [多 LLM 支持](/docs/features/multi-llm-support) - 部署到 Claude、Gemini、OpenAI
- [AI 增强](/docs/features/ai-enhancement) - 使用 AI 改进 C3.x 输出
- [CLI 参考：unified](/docs/cli/unified) - 完整 CLI 文档
