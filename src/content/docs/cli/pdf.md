---
title: pdf - PDF Extraction
description: Extract text, code, and tables from PDF files including OCR support for scanned documents and parallel processing
section: cli
order: 4
---

# pdf - PDF Extraction

Extract content from PDF files and convert to AI skills.

## Basic Usage

```bash
skill-seekers pdf [OPTIONS]
```

## Quick Examples

```bash
# Basic PDF extraction
skill-seekers pdf --pdf docs/manual.pdf --name myskill

# Scanned PDFs with OCR
skill-seekers pdf --pdf docs/scanned.pdf --name myskill --ocr

# Password-protected PDFs
skill-seekers pdf --pdf docs/encrypted.pdf --name myskill --password mypassword

# Advanced features
skill-seekers pdf --pdf docs/manual.pdf --name myskill \
    --extract-tables \
    --parallel \
    --workers 8
```

## Options

### Required

- `--pdf FILE` - Path to PDF file
- `--name NAME` - Skill name

### Optional

- `--description DESC` - Skill description
- `--ocr` - Enable OCR for scanned PDFs
- `--password PASS` - Password for encrypted PDFs
- `--extract-tables` - Extract complex tables
- `--parallel` - Enable parallel processing (3x faster)
- `--workers N` - Number of CPU cores to use (default: 4)
- `--output DIR` - Output directory

## Features

### Basic Extraction

- ✅ **Text Extraction** - All text content
- ✅ **Code Detection** - Recognizes code blocks in 20+ languages
- ✅ **Image Extraction** - Embedded images
- ✅ **Metadata** - Title, author, creation date

### Advanced Features

- ✅ **OCR Support** - For scanned documents
- ✅ **Password Protection** - Handle encrypted PDFs
- ✅ **Table Extraction** - Complex table structures
- ✅ **Parallel Processing** - 3x faster for large PDFs
- ✅ **Intelligent Caching** - 50% faster on re-runs

## OCR Support

### Prerequisites

```bash
# Install OCR dependencies
pip install pytesseract Pillow

# Install Tesseract OCR engine
# macOS
brew install tesseract

# Linux
sudo apt install tesseract-ocr

# Windows
# Download from: https://github.com/UB-Mannheim/tesseract/wiki
```

### Usage

```bash
skill-seekers pdf --pdf scanned_manual.pdf --name myskill --ocr
```

## Parallel Processing

For large PDFs, enable parallel processing:

```bash
# Use all CPU cores
skill-seekers pdf --pdf large_manual.pdf --name myskill --parallel

# Specify worker count
skill-seekers pdf --pdf large_manual.pdf --name myskill --parallel --workers 16
```

**Performance:**
- Without parallel: 15-20 minutes for 500-page PDF
- With parallel (8 cores): 5-7 minutes for 500-page PDF
- **3x faster!**

## Table Extraction

Extract complex tables from PDFs:

```bash
skill-seekers pdf --pdf data_report.pdf --name myskill --extract-tables
```

**Supports:**
- Multi-column tables
- Merged cells
- Nested headers
- Formatted data (numbers, dates, currency)

## Output Structure

```
output/
└── {name}/
    ├── SKILL.md              # Main content
    ├── references/
    │   ├── index.md
    │   ├── extracted_text.md
    │   ├── tables.md         # If --extract-tables
    │   └── code_blocks.md
    └── assets/
        ├── image_001.png     # Extracted images
        └── ...
```

## Advanced Examples

### Complete Extraction

```bash
skill-seekers pdf --pdf technical_manual.pdf --name technical \
    --description "Technical manual from PDF" \
    --ocr \
    --extract-tables \
    --parallel \
    --workers 8 \
    --output output/technical
```

### Password-Protected PDF

```bash
skill-seekers pdf --pdf encrypted.pdf --name secure \
    --password "my-secure-password" \
    --extract-tables
```

### Batch Processing

```bash
# Process multiple PDFs
for pdf in docs/*.pdf; do
    name=$(basename "$pdf" .pdf)
    skill-seekers pdf --pdf "$pdf" --name "$name" --parallel
done
```

## Time Estimates

| PDF Size | Pages | Without Parallel | With Parallel (8 cores) |
|----------|-------|------------------|-------------------------|
| Small | 10-50 | 1-2 min | 30 sec - 1 min |
| Medium | 100-200 | 5-10 min | 2-3 min |
| Large | 500+ | 15-20 min | 5-7 min |

## Troubleshooting

### OCR Not Working

```bash
# Check Tesseract installation
tesseract --version

# If not found, install:
# macOS: brew install tesseract
# Linux: sudo apt install tesseract-ocr
```

### Tables Not Extracting

Some PDFs use images for tables. Enable OCR:

```bash
skill-seekers pdf --pdf doc.pdf --name myskill --ocr --extract-tables
```

### Memory Issues

For very large PDFs, reduce workers:

```bash
skill-seekers pdf --pdf huge.pdf --name myskill --parallel --workers 2
```

## Next Steps

- [Unified Command](/docs/cli/unified) - Combine PDFs with other sources
- [Package Command](/docs/cli/package) - Package your skills
- [Features: PDF](/docs/features/pdf-scraping) - Advanced PDF features
