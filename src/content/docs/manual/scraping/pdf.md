---
title: PDF Documentation
description: Complete guide to extracting documentation from PDFs - OCR, tables, password protection, parallel processing, and MCP integration
section: manual
subsection: scraping
order: 3
---

# PDF Documentation Scraping

Extract content from PDF documentation and convert to AI skills with advanced features including OCR, table extraction, parallel processing, and MCP integration.

---

## Overview

Skill Seekers' PDF scraper converts PDF documentation into AI skills with:
- **Text extraction** from any PDF document
- **Code detection** with language identification and quality scoring
- **Image extraction** with configurable size filtering
- **Table extraction** from well-formatted tables
- **Chapter detection** for automatic organization
- **OCR support** for scanned PDFs
- **Password support** for encrypted PDFs
- **Parallel processing** for 3x faster extraction

---

## Quick Start

### Basic Usage

```bash
# Extract from PDF
skill-seekers pdf --input manual.pdf --output output/manual/

# With OCR for scanned PDFs
skill-seekers pdf --input scanned.pdf --output output/scanned/ --ocr

# Password-protected PDF
skill-seekers pdf --input encrypted.pdf --password "your-password"

# Extract tables
skill-seekers pdf --input data.pdf --extract-tables

# Parallel processing (3x faster)
skill-seekers pdf --input large.pdf --parallel --workers 8
```

### Complete Workflow

```bash
# 1. Extract from PDF
skill-seekers pdf --input manual.pdf --output output/manual/

# 2. Enhance (optional)
skill-seekers enhance output/manual/

# 3. Package
skill-seekers package output/manual/ --target claude

# 4. Upload
skill-seekers upload manual-claude.zip
```

---

## Usage Modes

### Mode 1: Direct PDF (Quick)

```bash
skill-seekers pdf \
  --input manual.pdf \
  --output output/manual/ \
  --extract-images \
  --min-quality 6.0
```

**Uses default settings:**
- Chunk size: 10 pages
- Min quality: 5.0
- Extract images: true
- Chapter-based categorization

### Mode 2: Config File (Recommended)

Create `configs/manual_pdf.json`:
```json
{
  "name": "mymanual",
  "description": "My Manual documentation",
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

Run scraper:
```bash
skill-seekers pdf --config configs/manual_pdf.json
```

### Mode 3: From Extracted JSON (Iteration)

```bash
# Step 1: Extract to JSON (one time)
skill-seekers pdf --input manual.pdf --extract-only --output manual.json

# Step 2: Build skill from JSON (fast, can iterate)
skill-seekers pdf --from-json manual.json --output output/manual/
```

**Benefits:**
- Separate extraction and building
- Fast iteration on categorization
- No re-extraction needed

---

## Advanced Features

### OCR for Scanned PDFs

Extract text from scanned PDFs using Optical Character Recognition:

**Installation:**
```bash
# Ubuntu/Debian
sudo apt-get install tesseract-ocr

# macOS
brew install tesseract

# Python packages
pip install pytesseract Pillow
```

**Usage:**
```bash
# Basic OCR
skill-seekers pdf --input scanned.pdf --ocr

# OCR with other options
skill-seekers pdf --input scanned.pdf --ocr --parallel --workers 4
```

**How it works:**
1. Checks if page has < 50 characters
2. Renders page as image if text is sparse
3. Runs Tesseract OCR on the image
4. Uses OCR text if longer than extracted text

**Performance:** ~2-5 seconds per page

### Password-Protected PDFs

Handle encrypted PDFs:

```bash
# Basic usage
skill-seekers pdf --input encrypted.pdf --password mypassword

# Environment variable (more secure)
export PDF_PASSWORD="mypassword"
skill-seekers pdf --input encrypted.pdf --password "$PDF_PASSWORD"
```

**Security note:** Password is passed via command line (visible in process list). For sensitive documents, use environment variables.

### Table Extraction

Extract tables from PDFs:

```bash
# Extract tables
skill-seekers pdf --input data.pdf --extract-tables

# Tables included in output
# Formatted as markdown tables in reference files
```

**Example output:**
```markdown
## Data Tables

### Table 1 (Page 5)
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

**Best with:** Well-formatted tables, not complex merged cells

### Parallel Processing

Process pages in parallel for 3x faster extraction:

```bash
# Auto-detect CPU count
skill-seekers pdf --input large.pdf --parallel

# Specify worker count
skill-seekers pdf --input large.pdf --parallel --workers 8
```

**Performance:**
| Pages | Sequential | Parallel (4) | Parallel (8) |
|-------|-----------|--------------|--------------|
| 50    | 25s       | 10s (2.5x)   | 8s (3.1x)    |
| 100   | 50s       | 18s (2.8x)   | 15s (3.3x)   |
| 500   | 4m 10s    | 1m 30s (2.8x)| 1m 15s (3.3x)|

**Note:** Only activates for PDFs with > 5 pages

---

## Page Chunking and Chapters

### Automatic Chapter Detection

Detects chapter boundaries automatically:
- Recognizes H1/H2 headings
- Patterns: "Chapter 1", "Part 2", "Section 3"
- Numbered sections: "1. Introduction"

**Chapter output:**
```json
{
  "chapters": [
    {
      "title": "Getting Started",
      "start_page": 1,
      "end_page": 12
    },
    {
      "title": "API Reference",
      "start_page": 13,
      "end_page": 45
    }
  ]
}
```

### Page Chunking

Break large PDFs into manageable chunks:

```bash
# Default chunking (10 pages per chunk)
skill-seekers pdf --input manual.pdf

# Custom chunk size
skill-seekers pdf --input manual.pdf --chunk-size 20

# Disable chunking
skill-seekers pdf --input manual.pdf --chunk-size 0
```

**Benefits:**
- Better memory efficiency for large PDFs
- Respects chapter boundaries
- Structured output for downstream processing

### Code Block Merging

Intelligently merges code blocks split across pages:

**Example:**
```
Page 5:  def calculate_total(items):
             total = 0
             for item in items:

Page 6:         total += item.price
             return total
```

**Result:** Combined into single code block

---

## Categorization

### Chapter-Based (Automatic)

If PDF has detectable chapters:
1. Extracts chapter titles and page ranges
2. Creates one category per chapter
3. Assigns pages by page number

**Advantages:**
- Automatic, no config needed
- Respects document structure

### Keyword-Based (Configurable)

Provide custom categories in config:

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

**Scoring:**
- Keyword in page text: +1 point
- Keyword in page heading: +2 points
- Assigned to highest-scoring category

**Advantages:**
- Flexible, customizable
- Works without clear chapters
- Combines related sections

---

## Output Structure

### Generated Files

```
output/
├── manual_extracted.json          # Raw extraction data
└── manual/                        # Skill directory
    ├── SKILL.md                   # Main skill file
    ├── references/                # Reference documentation
    │   ├── index.md               # Category index
    │   ├── getting_started.md     # Category 1
    │   ├── api.md                 # Category 2
    │   └── tutorial.md            # Category 3
    ├── scripts/                   # Empty (for user scripts)
    └── assets/                    # Assets directory
        └── images/                # Extracted images
            ├── manual_page5_img1.png
            └── manual_page12_img2.jpeg
```

### SKILL.md Format

```markdown
# Mymanual Documentation Skill

My Manual documentation

## When to use this skill

Use this skill when the user asks about mymanual documentation,
including API references, tutorials, examples, and best practices.

## What's included

This skill contains:

- **Getting Started**: 25 pages
- **Api**: 80 pages
- **Tutorial**: 45 pages

## Quick Reference

### Top Code Examples

**Example 1** (Quality: 8.5/10):

\`\`\`python
def initialize_system():
    config = load_config()
    setup_logging(config)
    return System(config)
\`\`\`

## Navigation

See `references/index.md` for complete documentation structure.

## Languages Covered

- python: 45 examples
- javascript: 32 examples
- shell: 8 examples
```

---

## Config File Reference

### Complete Example

```json
{
  "name": "godot_manual",
  "description": "Godot Engine documentation from PDF manual",
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

### Field Reference

#### Required Fields

- **`name`** (string): Skill identifier (lowercase, no spaces)
- **`pdf_path`** (string): Path to PDF file

#### Optional Fields

- **`description`** (string): Skill description
- **`extract_options`** (object):
  - `chunk_size` (number): Pages per chunk (default: 10)
  - `min_quality` (number): Min code quality 0-10 (default: 5.0)
  - `extract_images` (boolean): Extract images (default: true)
  - `min_image_size` (number): Min image pixels (default: 100)
  - `ocr` (boolean): Enable OCR (default: false)
  - `extract_tables` (boolean): Extract tables (default: false)
  - `parallel` (boolean): Parallel processing (default: false)
  - `workers` (number): Worker count (default: 4)
- **`categories`** (object): Keyword-based categorization

---

## MCP Integration

### Using MCP Tool

The `scrape_pdf` MCP tool provides PDF scraping through Model Context Protocol:

```python
# Mode 1: Config file
result = await mcp.call_tool("scrape_pdf", {
    "config_path": "configs/manual_pdf.json"
})

# Mode 2: Direct PDF
result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "manual.pdf",
    "name": "mymanual",
    "description": "My Manual Docs"
})

# Mode 3: From JSON
result = await mcp.call_tool("scrape_pdf", {
    "from_json": "output/manual_extracted.json"
})
```

### Complete MCP Workflow

```python
# 1. Scrape PDF
scrape_result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "docs/api_manual.pdf",
    "name": "api_manual"
})

# 2. Package skill
package_result = await mcp.call_tool("package_skill", {
    "skill_dir": "output/api_manual/",
    "auto_upload": True
})
```

**See:** [MCP Setup](/docs/manual/mcp/setup) for MCP server configuration

---

## Combined Usage Examples

### Maximum Performance

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

### Scanned PDF with Tables

```bash
skill-seekers pdf \
  --input docs/scanned.pdf \
  --output output/scanned/ \
  --ocr \
  --extract-tables \
  --parallel \
  --workers 4
```

### Encrypted PDF with All Features

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

## Performance

### Benchmarks

| PDF Size | Pages | Extraction | Building | Total    |
|----------|-------|------------|----------|----------|
| Small    | 50    | 30s        | 5s       | 35s      |
| Medium   | 200   | 2m         | 15s      | 2m 15s   |
| Large    | 500   | 5m         | 45s      | 5m 45s   |

### Feature Overhead

| Feature             | Time Impact    | Memory Impact   |
|---------------------|----------------|-----------------|
| OCR                 | +2-5s per page | +50MB per page  |
| Table extraction    | +0.5s per page | +10MB           |
| Image extraction    | +0.2s per image| Varies          |
| Parallel (8 workers)| -66% total time| +8x memory      |
| Caching             | -50% on re-run | +100MB          |

### Optimization Tips

1. **Use `--from-json` for iteration**
   - Extract once, build many times
   - Test categorization without re-extraction

2. **Adjust chunk size**
   - Larger chunks: Faster extraction
   - Smaller chunks: Better chapter detection

3. **Filter aggressively**
   - Higher `min_quality`: Fewer low-quality code blocks
   - Higher `min_image_size`: Fewer small images

4. **Parallel processing**
   - Use `--workers` equal to CPU cores
   - Not recommended with very large images (memory intensive)

---

## Troubleshooting

### No Categories Created

**Problem:** Only "content" or "other" category

**Solutions:**
```bash
# Check extracted chapters
cat output/manual_extracted.json | jq '.chapters'

# Add keyword categories to config if chapters empty
# Or accept single category for small PDFs
```

### Low-Quality Code Blocks

**Problem:** Too many poor code examples

**Solution:**
```json
{
  "extract_options": {
    "min_quality": 7.0  // Increase threshold
  }
}
```

### Images Not Extracted

**Problem:** No images in `assets/images/`

**Solution:**
```json
{
  "extract_options": {
    "extract_images": true,
    "min_image_size": 50  // Lower threshold
  }
}
```

### OCR Not Working

**Problem:** OCR fails or gives poor results

**Solutions:**
```bash
# Check Tesseract installed
tesseract --version

# Install if missing
# Ubuntu: sudo apt-get install tesseract-ocr
# macOS: brew install tesseract

# Try with verbose mode
skill-seekers pdf --input scanned.pdf --ocr --verbose
```

### Password Errors

**Problem:** Password not accepted

**Solutions:**
```bash
# Check password is correct
# Try with quotes
skill-seekers pdf --input file.pdf --password "my password"

# Use environment variable
export PDF_PASSWORD="my password"
skill-seekers pdf --input file.pdf --password "$PDF_PASSWORD"
```

---

## Best Practices

### For Large PDFs (500+ pages)

1. Use parallel processing with `--workers 8`
2. Extract to JSON first, then build skill
3. Monitor system resources (RAM, CPU)
4. Use larger chunk sizes (20-50 pages)

### For Scanned PDFs

1. Use OCR with parallel processing
2. Test on sample pages first
3. Use `--verbose` to monitor OCR performance
4. Expect 2-5x slower processing

### For Encrypted PDFs

1. Use environment variable for password
2. Clear shell history after use
3. Don't commit passwords to version control

### For PDFs with Tables

1. Enable table extraction with `--extract-tables`
2. Check table quality in output JSON
3. Manual review recommended for critical data
4. Works best with well-formatted tables

---

## Next Steps

**Tutorials:**
- [Extracting PDFs](/docs/tutorials/extracting-pdfs) - Step-by-step tutorial
- [Multi-Source Skills](/docs/tutorials/multi-source-skills) - Combine PDF with docs and GitHub

**Manual:**
- [Unified Scraping](/docs/manual/scraping/unified) - Combine PDF with other sources
- [MCP Setup](/docs/manual/mcp/setup) - Configure MCP server

**CLI Reference:**
- [pdf command](/docs/cli/pdf) - Complete command reference
