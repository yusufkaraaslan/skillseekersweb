---
title: PDF Scraping
description: Extract text, code, images, and tables from PDF documentation files - OCR support, password protection, parallel processing
section: features
order: 8
---

# PDF Scraper CLI Tool

Extract content from PDF documentation and convert to Claude AI skills.

## Overview

The PDF scraper (`pdf_scraper.py`) is a complete CLI tool that converts PDF documentation into Claude AI skills. It integrates all PDF extraction features with the Skill Seeker workflow to produce packaged, uploadable skills.

## Features

### ✅ Complete Workflow

1. **Extract** - Uses `pdf_extractor_poc.py` for extraction
2. **Categorize** - Organizes content by chapters or keywords
3. **Build** - Creates skill structure (SKILL.md, references/)
4. **Package** - Ready for `package_skill.py`

### ✅ Three Usage Modes

1. **Config File** - Use JSON configuration (recommended)
2. **Direct PDF** - Quick conversion from PDF file
3. **From JSON** - Build skill from pre-extracted data

### ✅ Automatic Categorization

- Chapter-based (from PDF structure)
- Keyword-based (configurable)
- Fallback to single category

### ✅ Quality Filtering

- Uses quality scores from extraction
- Extracts top code examples
- Filters by minimum quality threshold

---

## Usage

### Mode 1: Config File (Recommended)

```bash
# Create config file
cat > configs/my_manual.json <<EOF
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
EOF

# Run scraper
python3 cli/pdf_scraper.py --config configs/my_manual.json
```

**Output:**
```
🔍 Extracting from PDF: docs/manual.pdf
📄 Extracting from: docs/manual.pdf
   Pages: 150
   ...
✅ Extraction complete

💾 Saved extracted data to: output/mymanual_extracted.json

🏗️  Building skill: mymanual
📋 Categorizing content...
✅ Created 3 categories
   - Getting Started: 25 pages
   - Api: 80 pages
   - Tutorial: 45 pages

📝 Generating reference files...
   Generated: output/mymanual/references/getting_started.md
   Generated: output/mymanual/references/api.md
   Generated: output/mymanual/references/tutorial.md
   Generated: output/mymanual/references/index.md
   Generated: output/mymanual/SKILL.md

✅ Skill built successfully: output/mymanual/

📦 Next step: Package with: python3 cli/package_skill.py output/mymanual/
```

### Mode 2: Direct PDF

```bash
# Quick conversion without config file
python3 cli/pdf_scraper.py --pdf manual.pdf --name mymanual --description "My Manual Docs"
```

**Uses default settings:**
- Chunk size: 10
- Min quality: 5.0
- Extract images: true
- Min image size: 100px
- No custom categories (chapter-based)

### Mode 3: From Extracted JSON

```bash
# Step 1: Extract only (saves JSON)
python3 cli/pdf_extractor_poc.py manual.pdf -o manual_extracted.json --extract-images

# Step 2: Build skill from JSON (fast, can iterate)
python3 cli/pdf_scraper.py --from-json manual_extracted.json
```

**Benefits:**
- Separate extraction and building
- Iterate on skill structure without re-extracting
- Faster development cycle

---

## Config File Format

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
    "min_image_size": 200
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
    ],
    "2d": [
      "2d",
      "sprite",
      "tilemap",
      "animation"
    ],
    "api": [
      "api",
      "class reference",
      "method",
      "property"
    ]
  }
}
```

### Field Reference

#### Required Fields

- **`name`** (string): Skill identifier
  - Used for directory names
  - Should be lowercase, no spaces
  - Example: `"python_guide"`

- **`pdf_path`** (string): Path to PDF file
  - Absolute or relative to working directory
  - Example: `"docs/manual.pdf"`

#### Optional Fields

- **`description`** (string): Skill description
  - Shows in SKILL.md
  - Explains when to use the skill
  - Default: `"Documentation skill for {name}"`

- **`extract_options`** (object): Extraction settings
  - `chunk_size` (number): Pages per chunk (default: 10)
  - `min_quality` (number): Minimum code quality 0-10 (default: 5.0)
  - `extract_images` (boolean): Extract images to files (default: true)
  - `min_image_size` (number): Minimum image dimension in pixels (default: 100)

- **`categories`** (object): Keyword-based categorization
  - Keys: Category names (will be sanitized for filenames)
  - Values: Arrays of keywords to match
  - If omitted: Uses chapter-based categorization from PDF

---

## Output Structure

### Generated Files

```
output/
├── mymanual_extracted.json          # Raw extraction data
└── mymanual/                        # Skill directory
    ├── SKILL.md                     # Main skill file
    ├── references/                  # Reference documentation
    │   ├── index.md                 # Category index
    │   ├── getting_started.md       # Category 1
    │   ├── api.md                   # Category 2
    │   └── tutorial.md              # Category 3
    ├── scripts/                     # Empty (for user scripts)
    └── assets/                      # Assets directory
        └── images/                  # Extracted images (if enabled)
            ├── mymanual_page5_img1.png
            └── mymanual_page12_img2.jpeg
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

```python
def initialize_system():
    config = load_config()
    setup_logging(config)
    return System(config)
```

**Example 2** (Quality: 8.2/10):

```javascript
const app = createApp({
  data() {
    return { count: 0 }
  }
})
```

## Navigation

See `references/index.md` for complete documentation structure.

## Languages Covered

- python: 45 examples
- javascript: 32 examples
- shell: 8 examples
```

---

## Categorization Logic

### Chapter-Based (Automatic)

If PDF has detectable chapters:

1. Extract chapter titles and page ranges
2. Create one category per chapter
3. Assign pages to chapters by page number

**Advantages:**
- Automatic, no config needed
- Respects document structure
- Accurate page assignment

**Example chapters:**
- "Chapter 1: Introduction" → `chapter_1_introduction.md`
- "Part 2: Advanced Topics" → `part_2_advanced_topics.md`

### Keyword-Based (Configurable)

If `categories` config is provided:

1. Score each page against keyword lists
2. Assign to highest-scoring category
3. Fall back to "other" if no match

**Advantages:**
- Flexible, customizable
- Works with PDFs without clear chapters
- Can combine related sections

**Scoring:**
- Keyword in page text: +1 point
- Keyword in page heading: +2 points
- Assigned to category with highest score

---

## Integration with Skill Seeker

### Complete Workflow

```bash
# 1. Create PDF config
cat > configs/api_manual.json <<EOF
{
  "name": "api_manual",
  "pdf_path": "docs/api.pdf",
  "extract_options": {
    "min_quality": 7.0,
    "extract_images": true
  }
}
EOF

# 2. Run PDF scraper
python3 cli/pdf_scraper.py --config configs/api_manual.json

# 3. Package skill
python3 cli/package_skill.py output/api_manual/

# 4. Upload to Claude (if ANTHROPIC_API_KEY set)
python3 cli/package_skill.py output/api_manual/ --upload

# Result: api_manual.zip ready for Claude!
```

### Enhancement (Optional)

```bash
# After building, enhance with AI
python3 cli/enhance_skill_local.py output/api_manual/

# Or with API
export ANTHROPIC_API_KEY=sk-ant-...
python3 cli/enhance_skill.py output/api_manual/
```

---

## Performance

### Benchmark

| PDF Size | Pages | Extraction | Building | Total |
|----------|-------|------------|----------|-------|
| Small | 50 | 30s | 5s | 35s |
| Medium | 200 | 2m | 15s | 2m 15s |
| Large | 500 | 5m | 45s | 5m 45s |

**Extraction**: PDF → JSON (cpu-intensive)
**Building**: JSON → Skill (fast, i/o-bound)

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

---

## Troubleshooting

### No Categories Created

**Problem:** Only "content" or "other" category

**Possible causes:**
1. No chapters detected in PDF
2. Keywords don't match content
3. Config has empty categories

**Solution:**
```bash
# Check extracted chapters
cat output/mymanual_extracted.json | jq '.chapters'

# If empty, add keyword categories to config
# Or let it create single "content" category (OK for small PDFs)
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
    "extract_images": true,  // Enable extraction
    "min_image_size": 50     // Lower threshold
  }
}
```

---

## Next Steps

- [PDF Advanced Features](/docs/features/pdf-advanced) - OCR, tables, parallel processing
- [PDF Chunking](/docs/features/pdf-chunking) - Chapter detection and page chunking
- [CLI: pdf Command](/docs/cli/pdf) - Complete command reference
- [Unified Scraping](/docs/features/unified-scraping) - Combine PDF with docs and GitHub
