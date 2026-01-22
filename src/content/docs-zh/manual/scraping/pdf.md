---
title: PDF 文档
description: 从 PDF 中提取文档的完整指南 - OCR、表格、密码保护、并行处理和 MCP 集成
section: manual
subsection: scraping
order: 3
---

# PDF 文档抓取

从 PDF 文档中提取内容并转换为 AI 技能，具有高级功能，包括 OCR、表格提取、并行处理和 MCP 集成。

---

## 概述

Skill Seekers 的 PDF 抓取器将 PDF 文档转换为 AI 技能，具有：
- **文本提取** 从任何 PDF 文档
- **代码检测** 具有语言识别和质量评分
- **图像提取** 具有可配置的大小过滤
- **表格提取** 从格式良好的表格
- **章节检测** 用于自动组织
- **OCR 支持** 用于扫描的 PDF
- **密码支持** 用于加密的 PDF
- **并行处理** 快 3 倍的提取

---

## 快速开始

### 基本用法

```bash
# 从 PDF 提取
skill-seekers pdf --input manual.pdf --output output/manual/

# 使用 OCR 处理扫描的 PDF
skill-seekers pdf --input scanned.pdf --output output/scanned/ --ocr

# 受密码保护的 PDF
skill-seekers pdf --input encrypted.pdf --password "your-password"

# 提取表格
skill-seekers pdf --input data.pdf --extract-tables

# 并行处理（快 3 倍）
skill-seekers pdf --input large.pdf --parallel --workers 8
```

### 完整工作流程

```bash
# 1. 从 PDF 提取
skill-seekers pdf --input manual.pdf --output output/manual/

# 2. 增强（可选）
skill-seekers enhance output/manual/

# 3. 打包
skill-seekers package output/manual/ --target claude

# 4. 上传
skill-seekers upload manual-claude.zip
```

---

## 使用模式

### 模式 1：直接 PDF（快速）

```bash
skill-seekers pdf \
  --input manual.pdf \
  --output output/manual/ \
  --extract-images \
  --min-quality 6.0
```

**使用默认设置：**
- 块大小：10 页
- 最小质量：5.0
- 提取图像：true
- 基于章节的分类

### 模式 2：配置文件（推荐）

创建 `configs/manual_pdf.json`：
```json
{
  "name": "mymanual",
  "description": "我的手册文档",
  "pdf_path": "docs/manual.pdf",
  "extract_options": {
    "chunk_size": 10,
    "min_quality": 6.0,
    "extract_images": true,
    "min_image_size": 150
  },
  "categories": {
    "getting_started": ["introduction", "setup"],
    "api": ["api", "reference", "function"],
    "tutorial": ["tutorial", "example", "guide"]
  }
}
```

运行抓取器：
```bash
skill-seekers pdf --config configs/manual_pdf.json
```

### 模式 3：从提取的 JSON（迭代）

```bash
# 步骤 1：提取到 JSON（一次）
skill-seekers pdf --input manual.pdf --extract-only --output manual.json

# 步骤 2：从 JSON 构建技能（快速，可以迭代）
skill-seekers pdf --from-json manual.json --output output/manual/
```

**好处：**
- 分离提取和构建
- 在分类上快速迭代
- 无需重新提取

---

## 高级功能

### 扫描 PDF 的 OCR

使用光学字符识别从扫描的 PDF 中提取文本：

**安装：**
```bash
# Ubuntu/Debian
sudo apt-get install tesseract-ocr

# macOS
brew install tesseract

# Python 包
pip install pytesseract Pillow
```

**用法：**
```bash
# 基本 OCR
skill-seekers pdf --input scanned.pdf --ocr

# OCR 与其他选项
skill-seekers pdf --input scanned.pdf --ocr --parallel --workers 4
```

**工作原理：**
1. 检查页面是否 < 50 个字符
2. 如果文本稀疏，将页面渲染为图像
3. 在图像上运行 Tesseract OCR
4. 如果 OCR 文本比提取的文本长，则使用 OCR 文本

**性能：** 每页约 2-5 秒

### 受密码保护的 PDF

处理加密的 PDF：

```bash
# 基本用法
skill-seekers pdf --input encrypted.pdf --password mypassword

# 环境变量（更安全）
export PDF_PASSWORD="mypassword"
skill-seekers pdf --input encrypted.pdf --password "$PDF_PASSWORD"
```

**安全注意：** 密码通过命令行传递（在进程列表中可见）。对于敏感文档，使用环境变量。

### 表格提取

从 PDF 中提取表格：

```bash
# 提取表格
skill-seekers pdf --input data.pdf --extract-tables

# 表格包含在输出中
# 格式化为引用文件中的 markdown 表格
```

**示例输出：**
```markdown
## 数据表格

### 表格 1（第 5 页）
| 标题 1 | 标题 2 | 标题 3 |
|--------|--------|--------|
| 数据 1 | 数据 2 | 数据 3 |
```

**最适合：** 格式良好的表格，不是复杂的合并单元格

### 并行处理

并行处理页面以实现 3 倍更快的提取：

```bash
# 自动检测 CPU 数量
skill-seekers pdf --input large.pdf --parallel

# 指定工作线程数量
skill-seekers pdf --input large.pdf --parallel --workers 8
```

**性能：**
| 页数 | 顺序  | 并行 (4)     | 并行 (8)     |
|------|-------|--------------|--------------|
| 50   | 25秒  | 10秒 (2.5倍) | 8秒 (3.1倍)  |
| 100  | 50秒  | 18秒 (2.8倍) | 15秒 (3.3倍) |
| 500  | 4分10秒| 1分30秒 (2.8倍)| 1分15秒 (3.3倍)|

**注意：** 仅对 > 5 页的 PDF 激活

---

## 页面分块和章节

### 自动章节检测

自动检测章节边界：
- 识别 H1/H2 标题
- 模式："第 1 章"、"第 2 部分"、"第 3 节"
- 编号章节："1. 介绍"

**章节输出：**
```json
{
  "chapters": [
    {
      "title": "入门",
      "start_page": 1,
      "end_page": 12
    },
    {
      "title": "API 参考",
      "start_page": 13,
      "end_page": 45
    }
  ]
}
```

### 页面分块

将大型 PDF 分解为可管理的块：

```bash
# 默认分块（每块 10 页）
skill-seekers pdf --input manual.pdf

# 自定义块大小
skill-seekers pdf --input manual.pdf --chunk-size 20

# 禁用分块
skill-seekers pdf --input manual.pdf --chunk-size 0
```

**好处：**
- 对大型 PDF 更好的内存效率
- 尊重章节边界
- 用于下游处理的结构化输出

### 代码块合并

智能合并跨页拆分的代码块：

**示例：**
```
第 5 页：def calculate_total(items):
            total = 0
            for item in items:

第 6 页：        total += item.price
            return total
```

**结果：** 合并为单个代码块

---

## 分类

### 基于章节（自动）

如果 PDF 有可检测的章节：
1. 提取章节标题和页面范围
2. 每章创建一个类别
3. 按页码分配页面

**优点：**
- 自动，无需配置
- 尊重文档结构

### 基于关键字（可配置）

在配置中提供自定义类别：

```json
{
  "categories": {
    "getting_started": [
      "introduction",
      "getting started",
      "installation"
    ],
    "scripting": [
      "gdscript",
      "scripting",
      "code"
    ],
    "api": [
      "api",
      "class reference",
      "method"
    ]
  }
}
```

**评分：**
- 页面文本中的关键字：+1 分
- 页面标题中的关键字：+2 分
- 分配给得分最高的类别

**优点：**
- 灵活，可定制
- 无需清晰的章节即可工作
- 组合相关部分

---

## 输出结构

### 生成的文件

```
output/
├── manual_extracted.json          # 原始提取数据
└── manual/                        # 技能目录
    ├── SKILL.md                   # 主技能文件
    ├── references/                # 参考文档
    │   ├── index.md               # 类别索引
    │   ├── getting_started.md     # 类别 1
    │   ├── api.md                 # 类别 2
    │   └── tutorial.md            # 类别 3
    ├── scripts/                   # 空（用于用户脚本）
    └── assets/                    # 资产目录
        └── images/                # 提取的图像
            ├── manual_page5_img1.png
            └── manual_page12_img2.jpeg
```

### SKILL.md 格式

```markdown
# Mymanual 文档技能

我的手册文档

## 何时使用此技能

当用户询问有关 mymanual 文档时使用此技能，
包括 API 参考、教程、示例和最佳实践。

## 包含内容

此技能包含：

- **入门**：25 页
- **Api**：80 页
- **教程**：45 页

## 快速参考

### 顶级代码示例

**示例 1**（质量：8.5/10）：

\`\`\`python
def initialize_system():
    config = load_config()
    setup_logging(config)
    return System(config)
\`\`\`

## 导航

请参阅 `references/index.md` 获取完整的文档结构。

## 涵盖的语言

- python：45 个示例
- javascript：32 个示例
- shell：8 个示例
```

---

## 配置文件参考

### 完整示例

```json
{
  "name": "godot_manual",
  "description": "从 PDF 手册获取的 Godot 引擎文档",
  "pdf_path": "docs/godot_manual.pdf",
  "extract_options": {
    "chunk_size": 15,
    "min_quality": 6.0,
    "extract_images": true,
    "min_image_size": 200,
    "ocr": false,
    "extract_tables": false,
    "parallel": false,
    "workers": 4
  },
  "categories": {
    "getting_started": [
      "introduction",
      "getting started",
      "installation",
      "first steps"
    ],
    "scripting": [
      "gdscript",
      "scripting",
      "code",
      "programming"
    ],
    "3d": [
      "3d",
      "spatial",
      "mesh",
      "shader"
    ]
  }
}
```

### 字段参考

#### 必需字段

- **`name`**（字符串）：技能标识符（小写，无空格）
- **`pdf_path`**（字符串）：PDF 文件路径

#### 可选字段

- **`description`**（字符串）：技能描述
- **`extract_options`**（对象）：
  - `chunk_size`（数字）：每块页数（默认：10）
  - `min_quality`（数字）：最小代码质量 0-10（默认：5.0）
  - `extract_images`（布尔值）：提取图像（默认：true）
  - `min_image_size`（数字）：最小图像像素（默认：100）
  - `ocr`（布尔值）：启用 OCR（默认：false）
  - `extract_tables`（布尔值）：提取表格（默认：false）
  - `parallel`（布尔值）：并行处理（默认：false）
  - `workers`（数字）：工作线程数量（默认：4）
- **`categories`**（对象）：基于关键字的分类

---

## MCP 集成

### 使用 MCP 工具

`scrape_pdf` MCP 工具通过模型上下文协议提供 PDF 抓取：

```python
# 模式 1：配置文件
result = await mcp.call_tool("scrape_pdf", {
    "config_path": "configs/manual_pdf.json"
})

# 模式 2：直接 PDF
result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "manual.pdf",
    "name": "mymanual",
    "description": "我的手册文档"
})

# 模式 3：从 JSON
result = await mcp.call_tool("scrape_pdf", {
    "from_json": "output/manual_extracted.json"
})
```

### 完整 MCP 工作流程

```python
# 1. 抓取 PDF
scrape_result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "docs/api_manual.pdf",
    "name": "api_manual"
})

# 2. 打包技能
package_result = await mcp.call_tool("package_skill", {
    "skill_dir": "output/api_manual/",
    "auto_upload": True
})
```

**参见：** [MCP 设置](/docs/manual/mcp/setup) 获取 MCP 服务器配置

---

## 组合使用示例

### 最大性能

```bash
skill-seekers pdf \
  --input docs/manual.pdf \
  --output output/manual/ \
  --extract-images \
  --extract-tables \
  --parallel \
  --workers 8 \
  --min-quality 5.0
```

### 带表格的扫描 PDF

```bash
skill-seekers pdf \
  --input docs/scanned.pdf \
  --output output/scanned/ \
  --ocr \
  --extract-tables \
  --parallel \
  --workers 4
```

### 具有所有功能的加密 PDF

```bash
skill-seekers pdf \
  --input docs/encrypted.pdf \
  --output output/encrypted/ \
  --password mypassword \
  --extract-images \
  --extract-tables \
  --parallel \
  --workers 8
```

---

## 性能

### 基准测试

| PDF 大小 | 页数 | 提取  | 构建 | 总计    |
|----------|------|-------|------|---------|
| 小       | 50   | 30秒  | 5秒  | 35秒    |
| 中       | 200  | 2分钟 | 15秒 | 2分15秒 |
| 大       | 500  | 5分钟 | 45秒 | 5分45秒 |

### 功能开销

| 功能              | 时间影响        | 内存影响        |
|-------------------|----------------|-----------------|
| OCR               | +每页 2-5秒    | +每页 50MB      |
| 表格提取          | +每页 0.5秒    | +10MB           |
| 图像提取          | +每图 0.2秒    | 不定            |
| 并行（8 个工作线程）| -总时间 66%   | +8倍内存        |
| 缓存              | -重新运行 50%  | +100MB          |

### 优化技巧

1. **使用 `--from-json` 进行迭代**
   - 提取一次，构建多次
   - 无需重新提取即可测试分类

2. **调整块大小**
   - 更大的块：更快的提取
   - 更小的块：更好的章节检测

3. **积极过滤**
   - 更高的 `min_quality`：更少的低质量代码块
   - 更高的 `min_image_size`：更少的小图像

4. **并行处理**
   - 使用 `--workers` 等于 CPU 核心数
   - 不建议用于非常大的图像（内存密集型）

---

## 故障排除

### 未创建类别

**问题：** 仅"content"或"other"类别

**解决方案：**
```bash
# 检查提取的章节
cat output/manual_extracted.json | jq '.chapters'

# 如果章节为空，将关键字类别添加到配置
# 或接受小型 PDF 的单个类别
```

### 低质量代码块

**问题：** 太多糟糕的代码示例

**解决方案：**
```json
{
  "extract_options": {
    "min_quality": 7.0  // 提高阈值
  }
}
```

### 图像未提取

**问题：** `assets/images/` 中没有图像

**解决方案：**
```json
{
  "extract_options": {
    "extract_images": true,
    "min_image_size": 50  // 降低阈值
  }
}
```

### OCR 不工作

**问题：** OCR 失败或给出糟糕的结果

**解决方案：**
```bash
# 检查 Tesseract 已安装
tesseract --version

# 如果缺少则安装
# Ubuntu: sudo apt-get install tesseract-ocr
# macOS: brew install tesseract

# 尝试详细模式
skill-seekers pdf --input scanned.pdf --ocr --verbose
```

### 密码错误

**问题：** 密码未被接受

**解决方案：**
```bash
# 检查密码是否正确
# 尝试使用引号
skill-seekers pdf --input file.pdf --password "my password"

# 使用环境变量
export PDF_PASSWORD="my password"
skill-seekers pdf --input file.pdf --password "$PDF_PASSWORD"
```

---

## 最佳实践

### 对于大型 PDF（500+ 页）

1. 使用 `--workers 8` 进行并行处理
2. 首先提取到 JSON，然后构建技能
3. 监控系统资源（RAM、CPU）
4. 使用更大的块大小（20-50 页）

### 对于扫描的 PDF

1. 使用 OCR 进行并行处理
2. 首先在示例页面上测试
3. 使用 `--verbose` 监控 OCR 性能
4. 预计处理速度慢 2-5 倍

### 对于加密的 PDF

1. 对密码使用环境变量
2. 使用后清除 shell 历史记录
3. 不要将密码提交到版本控制

### 对于带表格的 PDF

1. 使用 `--extract-tables` 启用表格提取
2. 检查输出 JSON 中的表格质量
3. 建议对关键数据进行人工审查
4. 最适合格式良好的表格

---

## 下一步

**教程：**
- [提取 PDF](/docs/tutorials/extracting-pdfs) - 分步教程
- [多源技能](/docs/tutorials/multi-source-skills) - 组合 PDF 与文档和 GitHub

**手册：**
- [统一抓取](/docs/manual/scraping/unified) - 与其他源组合 PDF
- [MCP 设置](/docs/manual/mcp/setup) - 配置 MCP 服务器

**CLI 参考：**
- [pdf 命令](/docs/cli/pdf) - 完整命令参考
