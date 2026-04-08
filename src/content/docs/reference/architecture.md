---
title: Architecture & UML Diagrams
description: Skill Seekers architecture documentation with 21 UML diagrams — class, sequence, activity, and component diagrams
section: reference
order: 10
---

# Architecture & UML Diagrams

Skill Seekers v3.4.0 introduced comprehensive UML architecture documentation with 21 diagrams created in StarUML and synced from source code.

## Interactive Documentation

- **[Architecture Diagrams](/architecture)** — Browse all 21 UML diagrams with descriptions
- **[Full API Reference](/api-docs)** — Complete class/method documentation from StarUML export

## Architecture Overview

Skill Seekers follows a **layered module design** with 8 core modules and 5 utility modules:

### Core Modules
1. **CLICore** — Git-style command dispatcher, entry point for all commands
2. **Scrapers** — 18 converter classes for 17 source types (Template Method + Factory pattern)
3. **Adaptors** — Strategy+Factory for 20+ output platforms
4. **Analysis** — C3.x codebase analysis pipeline (AST, 10 GoF pattern detectors)
5. **Enhancement** — AI-powered skill improvement via `AgentClient` (API + LOCAL modes)
6. **Packaging** — Package, upload, and install skills to AI agent directories
7. **MCP** — FastMCP server exposing 40 tools via stdio/HTTP transport
8. **Sync** — Documentation change detection and re-scraping triggers

### Utility Modules
- **Parsers** — 18 SubcommandParser subclasses
- **Storage** — Cloud storage (S3, GCS, Azure)
- **Embedding** — Multi-provider vector embedding (OpenAI, Sentence Transformers, Voyage AI)
- **Benchmark** — Performance measurement framework
- **Utilities** — 16 shared helpers (RAGChunker, LanguageDetector, ConfigValidator, etc.)

## Key Design Patterns

| Pattern | Where |
|---------|-------|
| Strategy + Factory | Adaptors, Storage, Embedding |
| Template Method + Factory | Scrapers (18 converters) |
| Singleton | ExecutionContext (Pydantic model) |
| Command | CLI Dispatch via COMMAND_MODULES |
| Template Method | Pattern Detection, Parsers |

## StarUML Project

The StarUML project file is at `docs/UML/skill_seekers.mdj` in the main repository. Diagram exports are at `docs/UML/exports/*.png`.
