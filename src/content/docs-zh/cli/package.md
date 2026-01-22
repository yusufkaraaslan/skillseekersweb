---
title: package - 打包技能
description: 为多个平台打包技能 - Claude AI、Google Gemini、OpenAI ChatGPT 或通用 Markdown 导出
section: cli
order: 6
---

# package - 打包技能

为部署到多个 LLM 平台打包技能。

## 基本用法

```bash
skill-seekers package INPUT_DIR [OPTIONS]
```

## 快速示例

```bash
# 为 Claude 打包（默认）
skill-seekers package output/react/

# 为特定平台打包
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown

# 为所有平台打包
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown
```

## 选项

- `--target PLATFORM` - 目标平台（claude、gemini、openai、markdown）
- `--output FILE` - 自定义输出文件名

## 支持的平台

### Claude AI（默认）

```bash
skill-seekers package output/react/
# 创建：output/react.zip
```

**格式：**
- ZIP 存档
- SKILL.md 中的 YAML 前置元数据
- References 文件夹结构

**用于：** Claude Code、Claude Desktop、claude.ai

### Google Gemini

```bash
skill-seekers package output/react/ --target gemini
# 创建：output/react-gemini.tar.gz
```

**前置要求：**
```bash
pip install skill-seekers[gemini]
```

**格式：**
- tar.gz 存档
- 纯 markdown（无 YAML）
- 使用 `system_instructions.md` 而非 SKILL.md
- Gemini 特定元数据

**用于：** Google AI Studio、Gemini API

### OpenAI ChatGPT

```bash
skill-seekers package output/react/ --target openai
# 创建：output/react-openai.zip
```

**前置要求：**
```bash
pip install skill-seekers[openai]
```

**格式：**
- ZIP 存档
- 纯文本说明
- 向量存储文件
- OpenAI Assistant 配置

**用于：** ChatGPT、OpenAI Assistants API

### 通用 Markdown

```bash
skill-seekers package output/react/ --target markdown
# 创建：output/react-markdown.zip
```

**格式：**
- ZIP 存档
- 纯 markdown（无前置元数据）
- 通用兼容性
- 包含元数据的 Manifest.json

**用于：** 任何 LLM、离线文档、自托管

## 平台比较

| 功能 | Claude | Gemini | OpenAI | Markdown |
|---------|--------|--------|--------|----------|
| **格式** | ZIP | tar.gz | ZIP | ZIP |
| **前置元数据** | ✅ YAML | ❌ | ❌ | ❌ |
| **大小** | 优化 | 压缩 | 索引 | 通用 |
| **上传 API** | ✅ | ✅ | ✅ | ❌ |

## 输出文件

### Claude AI

```
react.zip
├── SKILL.md              # YAML 前置元数据 + markdown
└── references/
    ├── index.md
    ├── getting-started.md
    └── api-reference.md
```

### Google Gemini

```
react-gemini.tar.gz
├── system_instructions.md    # 纯 markdown
├── references/
│   └── ...
└── gemini_metadata.json
```

### OpenAI ChatGPT

```
react-openai.zip
├── assistant_instructions.txt    # 纯文本
├── vector_store_files/
│   └── ...
└── openai_metadata.json
```

### 通用 Markdown

```
react-markdown.zip
├── README.md
├── DOCUMENTATION.md
├── references/
│   └── ...
└── manifest.json
```

## 多平台工作流

```bash
# 1. 抓取一次
skill-seekers scrape --config configs/react.json

# 2. 增强一次
skill-seekers enhance output/react/

# 3. 为所有平台打包
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
skill-seekers package output/react/ --target markdown

# 结果：
# - output/react.zip（Claude）
# - output/react-gemini.tar.gz（Gemini）
# - output/react-openai.zip（OpenAI）
# - output/react-markdown.zip（通用）
```

## 文件大小

典型技能大小：

| 大小类别 | 页数 | 典型大小 | 示例 |
|---------------|-------|--------------|---------|
| 小 | 10-50 | 5-20 KB | 教程文档 |
| 中 | 50-200 | 20-100 KB | 框架文档 |
| 大 | 200-500 | 100-500 KB | 完整 API |

检查大小：
```bash
ls -lh output/react*.zip
```

## 平台限制

| 平台 | 最大文件大小 | 典型大小 |
|----------|--------------|--------------|
| Claude AI | ~25 MB | 10-500 KB |
| Google Gemini | ~100 MB | 10-500 KB |
| OpenAI ChatGPT | ~512 MB 向量存储 | 10-500 KB |
| 通用 Markdown | 无限制 | 10-500 KB |

## 故障排除

### "SKILL.md not found"

确保先进行抓取：
```bash
skill-seekers scrape --config configs/react.json
skill-seekers package output/react/
```

### "Invalid target platform"

使用有效的平台：
```bash
# 有效
--target claude
--target gemini
--target openai
--target markdown

# 无效
--target anthropic  ❌
--target google     ❌
```

### 错误的文件格式

每个平台需要特定格式：
- Claude/OpenAI/Markdown：`.zip`
- Gemini：`.tar.gz`

正确使用 `--target` 参数。

## 下一步

- [Upload 命令](/docs/cli/upload) - 上传到平台
- [多 LLM 支持](/docs/features/multi-llm-support) - 平台详情
- [上传指南](/docs/guides/upload-guide) - 完整上传指南
