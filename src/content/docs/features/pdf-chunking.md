---
title: PDF Page Detection and Chunking
description: Intelligent page chunking and chapter detection for better processing and organization of large PDF documentation
section: features
order: 10
---

# PDF Page Detection and Chunking

Intelligent page chunking and chapter detection capabilities for processing large PDF documentation.

## Overview

The PDF extractor with intelligent page chunking and chapter detection allows large PDF documentation to be split into manageable, logical sections for better processing and organization.

## New Features

### ✅ 1. Page Chunking

Break large PDFs into smaller, manageable chunks:
- Configurable chunk size (default: 10 pages per chunk)
- Smart chunking that respects chapter boundaries
- Chunk metadata includes page ranges and chapter titles

**Usage:**
```bash
# Default chunking (10 pages per chunk)
python3 cli/pdf_extractor_poc.py input.pdf

# Custom chunk size (20 pages per chunk)
python3 cli/pdf_extractor_poc.py input.pdf --chunk-size 20

# Disable chunking (single chunk with all pages)
python3 cli/pdf_extractor_poc.py input.pdf --chunk-size 0
```

### ✅ 2. Chapter/Section Detection

Automatically detect chapter and section boundaries:
- Detects H1 and H2 headings as chapter markers
- Recognizes common chapter patterns:
  - "Chapter 1", "Chapter 2", etc.
  - "Part 1", "Part 2", etc.
  - "Section 1", "Section 2", etc.
  - Numbered sections like "1. Introduction"

**Chapter Detection Logic:**
1. Check for H1/H2 headings at page start
2. Pattern match against common chapter formats
3. Extract chapter title for metadata

### ✅ 3. Code Block Merging

Intelligently merge code blocks split across pages:
- Detects when code continues from one page to the next
- Checks language and detection method consistency
- Looks for continuation indicators:
  - Doesn't end with `}`, `;`
  - Ends with `,`, `\`
  - Incomplete syntax structures

**Example:**
```
Page 5:  def calculate_total(items):
             total = 0
             for item in items:

Page 6:         total += item.price
             return total
```

The merger will combine these into a single code block.

---

## Output Format

### Enhanced JSON Structure

The output now includes chunking and chapter information:

```json
{
  "source_file": "manual.pdf",
  "metadata": { ... },
  "total_pages": 150,
  "total_chunks": 15,
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
  ],
  "chunks": [
    {
      "chunk_number": 1,
      "start_page": 1,
      "end_page": 12,
      "chapter_title": "Getting Started",
      "pages": [ ... ]
    }
  ],
  "pages": [ ... ]
}
```

### Chunk Object

Each chunk contains:
- `chunk_number` - Sequential chunk identifier (1-indexed)
- `start_page` - First page in chunk (1-indexed)
- `end_page` - Last page in chunk (1-indexed)
- `chapter_title` - Detected chapter title (if any)
- `pages` - Array of page objects in this chunk

---

## Usage Examples

### Basic Chunking

```bash
# Extract with default 10-page chunks
python3 cli/pdf_extractor_poc.py manual.pdf -o manual.json

# Output includes chunks
cat manual.json | jq '.total_chunks'
# Output: 15
```

### Large PDF Processing

```bash
# Large PDF with bigger chunks (50 pages each)
python3 cli/pdf_extractor_poc.py large_manual.pdf --chunk-size 50 -o output.json -v

# Verbose output shows:
# 📦 Creating chunks (chunk_size=50)...
# 🔗 Merging code blocks across pages...
# ✅ Extraction complete:
#    Chunks created: 8
#    Chapters detected: 12
```

### No Chunking (Single Output)

```bash
# Process all pages as single chunk
python3 cli/pdf_extractor_poc.py small_doc.pdf --chunk-size 0 -o output.json
```

---

## Performance

### Chunking Performance

- **Chapter Detection:** ~0.1ms per page (negligible overhead)
- **Code Merging:** ~0.5ms per page (fast)
- **Chunk Creation:** ~1ms total (very fast)

**Total overhead:** < 1% of extraction time

### Memory Benefits

Chunking large PDFs helps reduce memory usage:
- **Without chunking:** Entire PDF loaded in memory
- **With chunking:** Process chunk-by-chunk (future enhancement)

**Current implementation** still loads entire PDF but provides structured output for chunked processing downstream.

---

## Limitations

### Current Limitations

1. **Chapter Pattern Matching**
   - Limited to common English chapter patterns
   - May miss non-standard chapter formats
   - No support for non-English chapters (e.g., "Capitulo", "Chapitre")

2. **Code Merging Heuristics**
   - Based on simple continuation indicators
   - May miss some edge cases
   - No AST-based validation

3. **Chunk Size**
   - Fixed page count (not by content size)
   - Doesn't account for page content volume
   - No auto-sizing based on memory constraints

---

## Comparison: Before vs After

| Feature | Before | After |
|---------|--------|--------|
| Page chunking | None | ✅ Configurable |
| Chapter detection | None | ✅ Auto-detect |
| Code spanning pages | Split | ✅ Merged |
| Large PDF handling | Difficult | ✅ Chunked |
| Memory efficiency | Poor | Better (structure for future) |
| Output organization | Flat | ✅ Hierarchical |

---

## Testing

### Test Chapter Detection

Create a test PDF with chapters:
1. Page 1: "Chapter 1: Introduction"
2. Page 15: "Chapter 2: Getting Started"
3. Page 30: "Chapter 3: API Reference"

```bash
python3 cli/pdf_extractor_poc.py test.pdf -o test.json --chunk-size 20 -v

# Verify chapters detected
cat test.json | jq '.chapters'
```

Expected output:
```json
[
  {
    "title": "Chapter 1: Introduction",
    "start_page": 1,
    "end_page": 14
  },
  {
    "title": "Chapter 2: Getting Started",
    "start_page": 15,
    "end_page": 29
  },
  {
    "title": "Chapter 3: API Reference",
    "start_page": 30,
    "end_page": 50
  }
]
```

---

## Integration with Skill Seeker

The chunking feature lays groundwork for:
1. **Memory-efficient processing** - Process PDFs chunk-by-chunk
2. **Better categorization** - Chapters become categories
3. **Improved SKILL.md** - Organize by detected chapters
4. **Large PDF support** - Handle 500+ page manuals

**Example workflow:**
```bash
# Extract large manual with chapters
python3 cli/pdf_extractor_poc.py large_manual.pdf --chunk-size 25 -o manual.json

# Future: Build skill from chunks
python3 cli/build_skill_from_pdf.py manual.json

# Result: SKILL.md organized by detected chapters
```

---

## Next Steps

- [PDF Scraping](/docs/features/pdf-scraping) - Main PDF scraping guide
- [PDF Advanced Features](/docs/features/pdf-advanced) - OCR, tables, parallel processing
- [CLI: pdf Command](/docs/cli/pdf) - Complete command reference
