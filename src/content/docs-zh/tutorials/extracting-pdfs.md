---
title: "教程：提取 PDF"
description: 从 PDF 中提取文本的分步教程，包括 OCR、表格和受密码保护的文件
section: tutorials
order: 3
---

# 教程：提取 PDF

学习如何从 PDF 中提取技术文档并创建可搜索的 AI 技能。

**时间：** 10 分钟 | **级别：** 初学者 | **结果：** 基于 PDF 的技能

---

## 基本 PDF 提取

```bash
skill-seekers pdf \
  --input /path/to/manual.pdf \
  --output output/manual/
```

## 扫描 PDF 的 OCR

```bash
# 先安装 Tesseract
# Ubuntu: sudo apt-get install tesseract-ocr
# macOS: brew install tesseract

skill-seekers pdf \
  --input /path/to/scanned.pdf \
  --output output/scanned/ \
  --ocr
```

## 受密码保护的 PDF

```bash
skill-seekers pdf \
  --input /path/to/encrypted.pdf \
  --output output/encrypted/ \
  --password "your-password"
```

## 提取表格

```bash
skill-seekers pdf \
  --input /path/to/spec.pdf \
  --output output/spec/ \
  --extract-tables
```

## 并行处理（快 3 倍）

```bash
skill-seekers pdf \
  --input /path/to/large.pdf \
  --output output/large/ \
  --parallel \
  --workers 8
```

**参见：** [PDF 抓取手册](/docs/manual/scraping/pdf)获取完整指南。
