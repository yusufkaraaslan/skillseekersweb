---
title: scrape - 文档抓取
description: 抓取文档网站并将其转换为 Claude AI 技能，具有自动分类和代码检测功能
section: cli
order: 2
---

# scrape - 文档抓取

抓取文档网站并将其转换为 AI 技能。

## 基本用法

```bash
skill-seekers scrape [OPTIONS]
```

## 快速示例

```bash
# 使用预设配置（最简单）
skill-seekers scrape --config configs/react.json

# 无配置快速抓取
skill-seekers scrape --url https://react.dev --name react

# 交互模式
skill-seekers scrape --interactive

# 使用异步模式（快 3 倍）
skill-seekers scrape --config configs/godot.json --async --workers 8
```

## 选项

### 必需（选择一个）

- `--config CONFIG` - 从文件加载配置
- `--url URL` - 基础文档 URL（与 --name 一起使用）
- `--interactive, -i` - 交互式配置向导

### 可选

- `--name NAME` - 技能名称
- `--description DESC` - 技能描述
- `--max-pages N` - 最大抓取页数
- `--skip-scrape` - 跳过抓取，使用缓存数据
- `--dry-run` - 预览而不实际抓取
- `--async` - 启用异步模式（快 3 倍）
- `--workers N` - 并行工作者数量（默认：4）
- `--enhance` - 抓取后使用 Claude API 增强
- `--enhance-local` - 使用 Claude Code 增强（免费）

## 预设配置

Skill Seekers 包含 24+ 个即用配置：

```bash
# 游戏引擎
skill-seekers scrape --config configs/godot.json
skill-seekers scrape --config configs/unity.json

# Web 框架
skill-seekers scrape --config configs/react.json
skill-seekers scrape --config configs/vue.json
skill-seekers scrape --config configs/django.json
skill-seekers scrape --config configs/fastapi.json

# 还有 18+ 个...
```

## 输出结构

```
output/
├── {name}_data/              # 缓存的抓取数据
│   ├── pages/
│   │   ├── page_0.json
│   │   └── ...
│   └── summary.json
│
└── {name}/                   # 构建的技能
    ├── SKILL.md             # 主技能文件
    ├── references/          # 分类的文档
    │   ├── index.md
    │   ├── getting_started.md
    │   ├── api.md
    │   └── ...
    ├── scripts/
    └── assets/
```

## 高级用法

### 自定义配置文件

```json
{
  "name": "myframework",
  "base_url": "https://docs.myframework.com/",
  "description": "我的框架文档",
  "start_urls": [
    "https://docs.myframework.com/getting-started",
    "https://docs.myframework.com/api"
  ],
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "url_patterns": {
    "include": ["/docs/", "/api/"],
    "exclude": ["/blog/", "/community/"]
  },
  "categories": {
    "getting_started": ["intro", "tutorial", "quickstart"],
    "api": ["reference", "api"],
    "guides": ["guide", "how-to"]
  },
  "rate_limit": 0.5,
  "max_pages": 300
}
```

### 带增强

```bash
# 本地增强（免费，使用 Claude Code）
skill-seekers scrape --config configs/react.json --enhance-local

# API 增强（需要 ANTHROPIC_API_KEY）
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers scrape --config configs/react.json --enhance
```

### 异步模式

```bash
# 使用异步模式快 3 倍
skill-seekers scrape --config configs/godot.json --async --workers 8

# 根据 CPU 核心数调整工作者
skill-seekers scrape --config configs/react.json --async --workers 16
```

## 功能

- ✅ **llms.txt 支持** - 自动检测并使用 LLM 就绪文档（快 10 倍）
- ✅ **智能分类** - 按主题组织内容
- ✅ **代码检测** - 识别 20+ 种编程语言
- ✅ **异步抓取** - 并行工作者快 3 倍
- ✅ **智能缓存** - 重新运行快 50%

## 时间估算

- 小型站点（50 页）：2-5 分钟
- 中型站点（200 页）：10-20 分钟
- 大型站点（500 页）：30-40 分钟
- 使用异步：约快 3 倍

## 下一步

- [Enhance 命令](/docs/cli/enhance) - AI 增强您的技能
- [Package 命令](/docs/cli/package) - 为平台打包
- [使用指南](/docs/guides/usage) - 完整使用指南
