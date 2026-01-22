---
title: pdf - PDF 提取
description: 从 PDF 文件中提取文本、代码和表格，包括对扫描文档的 OCR 支持和并行处理
section: cli
order: 4
---

# pdf - PDF 提取

从 PDF 文件中提取内容并转换为 AI 技能。

## 基本用法

```bash
skill-seekers pdf [OPTIONS]
```

## 快速示例

```bash
# 基本 PDF 提取
skill-seekers pdf --pdf docs/manual.pdf --name myskill

# 带 OCR 的扫描 PDF
skill-seekers pdf --pdf docs/scanned.pdf --name myskill --ocr

# 受密码保护的 PDF
skill-seekers pdf --pdf docs/encrypted.pdf --name myskill --password mypassword

# 高级功能
skill-seekers pdf --pdf docs/manual.pdf --name myskill \
    --extract-tables \
    --parallel \
    --workers 8
```

## 选项

### 必需

- `--pdf FILE` - PDF 文件路径
- `--name NAME` - 技能名称

### 可选

- `--description DESC` - 技能描述
- `--ocr` - 为扫描 PDF 启用 OCR
- `--password PASS` - 加密 PDF 的密码
- `--extract-tables` - 提取复杂表格
- `--parallel` - 启用并行处理（快 3 倍）
- `--workers N` - 使用的 CPU 核心数（默认：4）
- `--output DIR` - 输出目录

## 功能

### 基本提取

- ✅ **文本提取** - 所有文本内容
- ✅ **代码检测** - 识别 20+ 种语言的代码块
- ✅ **图像提取** - 嵌入的图像
- ✅ **元数据** - 标题、作者、创建日期

### 高级功能

- ✅ **OCR 支持** - 用于扫描文档
- ✅ **密码保护** - 处理加密 PDF
- ✅ **表格提取** - 复杂表格结构
- ✅ **并行处理** - 大型 PDF 快 3 倍
- ✅ **智能缓存** - 重新运行快 50%

## OCR 支持

### 前置要求

```bash
# 安装 OCR 依赖
pip install pytesseract Pillow

# 安装 Tesseract OCR 引擎
# macOS
brew install tesseract

# Linux
sudo apt install tesseract-ocr

# Windows
# 从此处下载：https://github.com/UB-Mannheim/tesseract/wiki
```

### 用法

```bash
skill-seekers pdf --pdf scanned_manual.pdf --name myskill --ocr
```

## 并行处理

对于大型 PDF，启用并行处理：

```bash
# 使用所有 CPU 核心
skill-seekers pdf --pdf large_manual.pdf --name myskill --parallel

# 指定工作者数量
skill-seekers pdf --pdf large_manual.pdf --name myskill --parallel --workers 16
```

**性能：**
- 无并行：500 页 PDF 需 15-20 分钟
- 并行（8 核）：500 页 PDF 需 5-7 分钟
- **快 3 倍！**

## 表格提取

从 PDF 中提取复杂表格：

```bash
skill-seekers pdf --pdf data_report.pdf --name myskill --extract-tables
```

**支持：**
- 多列表格
- 合并单元格
- 嵌套标题
- 格式化数据（数字、日期、货币）

## 输出结构

```
output/
└── {name}/
    ├── SKILL.md              # 主要内容
    ├── references/
    │   ├── index.md
    │   ├── extracted_text.md
    │   ├── tables.md         # 如果使用 --extract-tables
    │   └── code_blocks.md
    └── assets/
        ├── image_001.png     # 提取的图像
        └── ...
```

## 高级示例

### 完整提取

```bash
skill-seekers pdf --pdf technical_manual.pdf --name technical \
    --description "PDF 技术手册" \
    --ocr \
    --extract-tables \
    --parallel \
    --workers 8 \
    --output output/technical
```

### 受密码保护的 PDF

```bash
skill-seekers pdf --pdf encrypted.pdf --name secure \
    --password "my-secure-password" \
    --extract-tables
```

### 批量处理

```bash
# 处理多个 PDF
for pdf in docs/*.pdf; do
    name=$(basename "$pdf" .pdf)
    skill-seekers pdf --pdf "$pdf" --name "$name" --parallel
done
```

## 时间估算

| PDF 大小 | 页数 | 无并行 | 并行（8 核） |
|----------|-------|------------------|-------------------------|
| 小 | 10-50 | 1-2 分钟 | 30 秒 - 1 分钟 |
| 中 | 100-200 | 5-10 分钟 | 2-3 分钟 |
| 大 | 500+ | 15-20 分钟 | 5-7 分钟 |

## 故障排除

### OCR 不工作

```bash
# 检查 Tesseract 安装
tesseract --version

# 如果未找到，安装：
# macOS: brew install tesseract
# Linux: sudo apt install tesseract-ocr
```

### 表格未提取

某些 PDF 使用图像作为表格。启用 OCR：

```bash
skill-seekers pdf --pdf doc.pdf --name myskill --ocr --extract-tables
```

### 内存问题

对于非常大的 PDF，减少工作者数量：

```bash
skill-seekers pdf --pdf huge.pdf --name myskill --parallel --workers 2
```

## 下一步

- [Unified 命令](/docs/cli/unified) - 将 PDF 与其他源组合
- [Package 命令](/docs/cli/package) - 打包您的技能
- [功能：PDF](/docs/features/pdf-scraping) - 高级 PDF 功能
