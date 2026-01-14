---
title: PDF Advanced Features
description: OCR support for scanned PDFs, password protection, table extraction, parallel processing, and intelligent caching
section: features
order: 9
---

# PDF Advanced Features Guide

Comprehensive guide to advanced PDF extraction features.

## Overview

Skill Seeker's PDF extractor includes powerful advanced features for handling complex PDF scenarios:

**Priority 2 Features (More PDF Types):**
- ✅ OCR support for scanned PDFs
- ✅ Password-protected PDF support
- ✅ Complex table extraction

**Priority 3 Features (Performance Optimizations):**
- ✅ Parallel page processing
- ✅ Intelligent caching of expensive operations

---

## OCR Support

Extract text from scanned PDFs using Optical Character Recognition.

### Installation

```bash
# Install Tesseract OCR engine
# Ubuntu/Debian
sudo apt-get install tesseract-ocr

# macOS
brew install tesseract

# Install Python packages
pip install pytesseract Pillow
```

### Usage

```bash
# Basic OCR
python3 cli/pdf_extractor_poc.py scanned.pdf --ocr

# OCR with other options
python3 cli/pdf_extractor_poc.py scanned.pdf --ocr --verbose -o output.json

# Full skill creation with OCR
python3 cli/pdf_scraper.py --pdf scanned.pdf --name myskill --ocr
```

### How It Works

1. **Detection**: For each page, checks if text content is < 50 characters
2. **Fallback**: If low text detected and OCR enabled, renders page as image
3. **Processing**: Runs Tesseract OCR on the image
4. **Selection**: Uses OCR text if it's longer than extracted text
5. **Logging**: Shows OCR extraction results in verbose mode

### Example Output

```
📄 Extracting from: scanned.pdf
   Pages: 50
   OCR: ✅ enabled

  Page 1: 245 chars, 0 code blocks, 2 headings, 0 images, 0 tables
   OCR extracted 245 chars (was 12)
  Page 2: 389 chars, 1 code blocks, 3 headings, 0 images, 0 tables
   OCR extracted 389 chars (was 5)
```

### Limitations

- Requires Tesseract installed on system
- Slower than regular text extraction (~2-5 seconds per page)
- Quality depends on PDF scan quality
- Works best with high-resolution scans

### Best Practices

- Use `--parallel` with OCR for faster processing
- Combine with `--verbose` to see OCR progress
- Test on a few pages first before processing large documents

---

## Password-Protected PDFs

Handle encrypted PDFs with password protection.

### Usage

```bash
# Basic usage
python3 cli/pdf_extractor_poc.py encrypted.pdf --password mypassword

# With full workflow
python3 cli/pdf_scraper.py --pdf encrypted.pdf --name myskill --password mypassword
```

### How It Works

1. **Detection**: Checks if PDF is encrypted (`doc.is_encrypted`)
2. **Authentication**: Attempts to authenticate with provided password
3. **Validation**: Returns error if password is incorrect or missing
4. **Processing**: Continues normal extraction if authentication succeeds

### Example Output

```
📄 Extracting from: encrypted.pdf
   🔐 PDF is encrypted, trying password...
   ✅ Password accepted
   Pages: 100
   Metadata: {...}
```

### Error Handling

```
# Missing password
❌ PDF is encrypted but no password provided
   Use --password option to provide password

# Wrong password
❌ Invalid password
```

### Security Notes

- Password is passed via command line (visible in process list)
- For sensitive documents, consider environment variables
- Password is not stored in output JSON

---

## Table Extraction

Extract tables from PDFs and include them in skill references.

### Usage

```bash
# Extract tables
python3 cli/pdf_extractor_poc.py data.pdf --extract-tables

# With other options
python3 cli/pdf_extractor_poc.py data.pdf --extract-tables --verbose -o output.json

# Full skill creation with tables
python3 cli/pdf_scraper.py --pdf data.pdf --name myskill --extract-tables
```

### How It Works

1. **Detection**: Uses PyMuPDF's `find_tables()` method
2. **Extraction**: Extracts table data as 2D array (rows × columns)
3. **Metadata**: Captures bounding box, row count, column count
4. **Integration**: Tables included in page data and summary

### Example Output

```
📄 Extracting from: data.pdf
   Table extraction: ✅ enabled

  Page 5: 892 chars, 2 code blocks, 4 headings, 0 images, 2 tables
   Found table 0: 10x4
   Found table 1: 15x6

✅ Extraction complete:
   Tables found: 25
```

### Integration with Skills

Tables are automatically included in reference files when building skills:

```markdown
## Data Tables

### Table 1 (Page 5)
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

### Limitations

- Quality depends on PDF table structure
- Works best with well-formatted tables
- Complex merged cells may not extract correctly

---

## Parallel Processing

Process pages in parallel for 3x faster extraction.

### Usage

```bash
# Enable parallel processing (auto-detects CPU count)
python3 cli/pdf_extractor_poc.py large.pdf --parallel

# Specify worker count
python3 cli/pdf_extractor_poc.py large.pdf --parallel --workers 8

# With full workflow
python3 cli/pdf_scraper.py --pdf large.pdf --name myskill --parallel --workers 8
```

### How It Works

1. **Worker Pool**: Creates ThreadPoolExecutor with N workers
2. **Distribution**: Distributes pages across workers
3. **Extraction**: Each worker processes pages independently
4. **Collection**: Results collected and merged
5. **Threshold**: Only activates for PDFs with > 5 pages

### Example Output

```
📄 Extracting from: large.pdf
   Pages: 500
   Parallel processing: ✅ enabled (8 workers)

🚀 Extracting 500 pages in parallel (8 workers)...

✅ Extraction complete:
   Total characters: 1,250,000
   Code blocks found: 450
```

### Performance

| Pages | Sequential | Parallel (4 workers) | Parallel (8 workers) |
|-------|-----------|---------------------|---------------------|
| 50    | 25s       | 10s (2.5x)          | 8s (3.1x)           |
| 100   | 50s       | 18s (2.8x)          | 15s (3.3x)          |
| 500   | 4m 10s    | 1m 30s (2.8x)       | 1m 15s (3.3x)       |
| 1000  | 8m 20s    | 3m 00s (2.8x)       | 2m 30s (3.3x)       |

### Best Practices

- Use `--workers` equal to CPU core count
- Combine with `--no-cache` for first-time processing
- Monitor system resources (RAM, CPU)
- Not recommended for very large images (memory intensive)

---

## Caching

Intelligent caching of expensive operations for faster re-extraction.

### Usage

```bash
# Caching enabled by default
python3 cli/pdf_extractor_poc.py input.pdf

# Disable caching
python3 cli/pdf_extractor_poc.py input.pdf --no-cache
```

### How It Works

1. **Cache Key**: Each page cached by page number
2. **Check**: Before extraction, checks cache for page data
3. **Store**: After extraction, stores result in cache
4. **Reuse**: On re-run, returns cached data instantly

### What Gets Cached

- Page text and markdown
- Code block detection results
- Language detection results
- Quality scores
- Image extraction results
- Table extraction results

### Cache Lifetime

- In-memory only (cleared when process exits)
- Useful for:
  - Testing extraction parameters
  - Re-running with different filters
  - Development and debugging

---

## Combined Usage

### Maximum Performance

```bash
python3 cli/pdf_scraper.py \
  --pdf docs/manual.pdf \
  --name myskill \
  --extract-images \
  --extract-tables \
  --parallel \
  --workers 8 \
  --min-quality 5.0
```

### Scanned PDF with Tables

```bash
python3 cli/pdf_scraper.py \
  --pdf docs/scanned.pdf \
  --name myskill \
  --ocr \
  --extract-tables \
  --parallel \
  --workers 4
```

### Encrypted PDF with All Features

```bash
python3 cli/pdf_scraper.py \
  --pdf docs/encrypted.pdf \
  --name myskill \
  --password mypassword \
  --extract-images \
  --extract-tables \
  --parallel \
  --workers 8 \
  --verbose
```

---

## Performance Benchmarks

### Test Setup

- **Hardware**: 8-core CPU, 16GB RAM
- **PDF**: 500-page technical manual
- **Content**: Mixed text, code, images, tables

### Results

| Configuration | Time | Speedup |
|--------------|------|---------|
| Basic (sequential) | 4m 10s | 1.0x (baseline) |
| + Caching | 2m 30s | 1.7x |
| + Parallel (4 workers) | 1m 30s | 2.8x |
| + Parallel (8 workers) | 1m 15s | 3.3x |
| + All optimizations | 1m 10s | 3.6x |

### Feature Overhead

| Feature | Time Impact | Memory Impact |
|---------|------------|---------------|
| OCR | +2-5s per page | +50MB per page |
| Table extraction | +0.5s per page | +10MB |
| Image extraction | +0.2s per image | Varies |
| Parallel (8 workers) | -66% total time | +8x memory |
| Caching | -50% on re-run | +100MB |

---

## Best Practices

### For Large PDFs (500+ pages)

1. Use parallel processing
2. Extract to JSON first, then build skill
3. Monitor system resources

### For Scanned PDFs

1. Use OCR with parallel processing
2. Test on sample pages first
3. Use `--verbose` to monitor OCR performance

### For Encrypted PDFs

1. Use environment variable for password
2. Clear history after use

### For PDFs with Tables

1. Enable table extraction
2. Check table quality in output JSON
3. Manual review recommended for critical data

---

## Next Steps

- [PDF Scraping](/docs/features/pdf-scraping) - Main PDF scraping guide
- [PDF Chunking](/docs/features/pdf-chunking) - Chapter detection
- [CLI: pdf Command](/docs/cli/pdf) - Complete command reference
