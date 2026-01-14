---
title: PDF Scraping MCP Tool
description: MCP tool for scraping PDF documentation through Claude Code and other MCP clients with three usage modes
section: features
order: 11
---

# PDF Scraping MCP Tool

The `scrape_pdf` MCP tool makes PDF documentation scraping available through the Model Context Protocol for Claude Code and other MCP clients.

## Overview

The `scrape_pdf` MCP tool allows PDF documentation scraping directly through the Model Context Protocol, integrating seamlessly with Claude Code workflows.

## Features

### ✅ MCP Tool Integration

- **Tool name:** `scrape_pdf`
- **Description:** Scrape PDF documentation and build Claude skill
- **Supports:** All three usage modes (config, direct, from-json)
- **Integration:** Uses `cli/pdf_scraper.py` backend

### ✅ Three Usage Modes

1. **Config File Mode** - Use PDF config JSON
2. **Direct PDF Mode** - Quick conversion from PDF file
3. **From JSON Mode** - Build from pre-extracted data

---

## Usage

### Mode 1: Config File

```python
# Through MCP
result = await mcp.call_tool("scrape_pdf", {
    "config_path": "configs/manual_pdf.json"
})
```

**Example config** (`configs/manual_pdf.json`):
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
    "api": ["api", "reference"],
    "tutorial": ["tutorial", "example"]
  }
}
```

**Output:**
```
🔍 Extracting from PDF: docs/manual.pdf
📄 Extracting from: docs/manual.pdf
   Pages: 150
   ...
✅ Extraction complete

🏗️  Building skill: mymanual
📋 Categorizing content...
✅ Created 3 categories

📝 Generating reference files...
   Generated: output/mymanual/references/getting_started.md
   Generated: output/mymanual/references/api.md
   Generated: output/mymanual/references/tutorial.md

✅ Skill built successfully: output/mymanual/

📦 Next step: Package with: python3 cli/package_skill.py output/mymanual/
```

### Mode 2: Direct PDF

```python
# Through MCP
result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "manual.pdf",
    "name": "mymanual",
    "description": "My Manual Docs"
})
```

**Uses default settings:**
- Chunk size: 10
- Min quality: 5.0
- Extract images: true
- Chapter-based categorization

### Mode 3: From Extracted JSON

```python
# Step 1: Extract to JSON (separate tool or CLI)
# python3 cli/pdf_extractor_poc.py manual.pdf -o manual_extracted.json

# Step 2: Build skill from JSON via MCP
result = await mcp.call_tool("scrape_pdf", {
    "from_json": "output/manual_extracted.json"
})
```

**Benefits:**
- Separate extraction and building
- Fast iteration on skill structure
- No re-extraction needed

---

## MCP Tool Definition

### Input Schema

```json
{
  "name": "scrape_pdf",
  "description": "Scrape PDF documentation and build Claude skill. Extracts text, code, and images from PDF files (NEW in B1.7).",
  "inputSchema": {
    "type": "object",
    "properties": {
      "config_path": {
        "type": "string",
        "description": "Path to PDF config JSON file (e.g., configs/manual_pdf.json)"
      },
      "pdf_path": {
        "type": "string",
        "description": "Direct PDF path (alternative to config_path)"
      },
      "name": {
        "type": "string",
        "description": "Skill name (required with pdf_path)"
      },
      "description": {
        "type": "string",
        "description": "Skill description (optional)"
      },
      "from_json": {
        "type": "string",
        "description": "Build from extracted JSON file (e.g., output/manual_extracted.json)"
      }
    },
    "required": []
  }
}
```

### Return Format

Returns `TextContent` with:
- Success: stdout from `pdf_scraper.py`
- Failure: stderr + stdout for debugging

---

## Integration with MCP Workflow

### Complete Workflow Through MCP

```python
# 1. Create PDF config (optional - can use direct mode)
config_result = await mcp.call_tool("generate_config", {
    "name": "api_manual",
    "url": "N/A",  # Not used for PDF
    "description": "API Manual from PDF"
})

# 2. Scrape PDF
scrape_result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "docs/api_manual.pdf",
    "name": "api_manual",
    "description": "API Manual Documentation"
})

# 3. Package skill
package_result = await mcp.call_tool("package_skill", {
    "skill_dir": "output/api_manual/",
    "auto_upload": True  # Upload if ANTHROPIC_API_KEY set
})

# 4. Upload (if not auto-uploaded)
if "ANTHROPIC_API_KEY" in os.environ:
    upload_result = await mcp.call_tool("upload_skill", {
        "skill_zip": "output/api_manual.zip"
    })
```

### Combined with Web Scraping

```python
# Scrape web documentation
web_result = await mcp.call_tool("scrape_docs", {
    "config_path": "configs/framework.json"
})

# Scrape PDF supplement
pdf_result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "docs/framework_api.pdf",
    "name": "framework_pdf"
})

# Package both
await mcp.call_tool("package_skill", {"skill_dir": "output/framework/"})
await mcp.call_tool("package_skill", {"skill_dir": "output/framework_pdf/"})
```

---

## Error Handling

### Common Errors

**Error 1: Missing required parameters**
```
❌ Error: Must specify --config, --pdf + --name, or --from-json
```
**Solution:** Provide one of the three modes

**Error 2: PDF file not found**
```
Error: [Errno 2] No such file or directory: 'manual.pdf'
```
**Solution:** Check PDF path is correct

**Error 3: PyMuPDF not installed**
```
ERROR: PyMuPDF not installed
Install with: pip install PyMuPDF
```
**Solution:** Install PyMuPDF: `pip install PyMuPDF`

**Error 4: Invalid JSON config**
```
Error: json.decoder.JSONDecodeError: Expecting value: line 1 column 1
```
**Solution:** Check config file is valid JSON

---

## Testing

### Test MCP Tool

```bash
# 1. Start MCP server
python3 skill_seeker_mcp/server.py

# 2. Test with MCP client or via Claude Code

# 3. Verify tool is listed
# Should see "scrape_pdf" in available tools
```

### Test All Modes

**Mode 1: Config**
```python
result = await mcp.call_tool("scrape_pdf", {
    "config_path": "configs/example_pdf.json"
})
assert "✅ Skill built successfully" in result[0].text
```

**Mode 2: Direct**
```python
result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "test.pdf",
    "name": "test_skill"
})
assert "✅ Skill built successfully" in result[0].text
```

**Mode 3: From JSON**
```python
# First extract
subprocess.run(["python3", "cli/pdf_extractor_poc.py", "test.pdf", "-o", "test.json"])

# Then build via MCP
result = await mcp.call_tool("scrape_pdf", {
    "from_json": "test.json"
})
assert "✅ Skill built successfully" in result[0].text
```

---

## Comparison with Other MCP Tools

| Tool | Input | Output | Use Case |
|------|-------|--------|----------|
| `scrape_docs` | HTML URL | Skill | Web documentation |
| `scrape_pdf` | PDF file | Skill | PDF documentation |
| `generate_config` | URL | Config | Create web config |
| `package_skill` | Skill dir | .zip | Package for upload |
| `upload_skill` | .zip file | Upload | Send to Claude |

---

## Performance

### MCP Tool Overhead

- **MCP overhead:** ~50-100ms
- **Extraction time:** Same as CLI (15s-5m depending on PDF)
- **Building time:** Same as CLI (5s-45s)

**Total:** MCP adds negligible overhead (<1%)

---

## Next Steps

- [PDF Scraping](/docs/features/pdf-scraping) - Main PDF scraping guide
- [PDF Advanced Features](/docs/features/pdf-advanced) - OCR, tables, parallel processing
- [MCP Setup](/docs/guides/mcp-setup) - MCP server configuration
