# Skill Seekers Website Documentation Restructuring Plan

**Version:** 3.1.0  
**Date:** 2026-02-22  
**Status:** In Progress  

---

## Overview

This plan outlines the complete restructuring of the Skill Seekers website documentation to follow a user-centric model inspired by Godot documentation. The new structure guides users from discovery to mastery through clear learning paths organized by use case rather than features.

---

## New Documentation Structure

### 1. ABOUT (For Evaluators)
Help visitors understand if Skill Seekers is right for them.

| File | Title | Status | Notes |
|------|-------|--------|-------|
| `about/introduction.md` | Introduction to Skill Seekers | 🟡 Update | Port from current, add v3.0/3.1 features |
| `about/features.md` | Features Overview | 🟡 Update | Add 16 platforms, MCP tools, workflows |
| `about/use-cases.md` | Use Cases & Scenarios | 🟡 Update | Expand with real-world examples |
| `about/showcase.md` | Community Showcase | 🔴 Create | Community skills gallery |
| `about/faq.md` | Frequently Asked Questions | 🟡 Update | Add new v3.0/3.1 FAQs |

### 2. GETTING STARTED (For Beginners)
First successful experience within 15 minutes.

| File | Title | Status | Notes |
|------|-------|--------|-------|
| `getting-started/index.md` | Getting Started | 🔴 Create | Landing page with learning path |
| `getting-started/installation.md` | Installation | 🟢 Keep | Minor updates for Docker |
| `getting-started/first-skill.md` | Your First Skill | 🟡 Update | Update for `create` command |
| `getting-started/understanding-skills.md` | Understanding Skills | 🔴 Create | Core concepts explained |
| `getting-started/next-steps.md` | Next Steps | 🔴 Create | Guided path forward |

### 3. TUTORIALS (By Use Case)
Learn specific workflows based on what users want to achieve.

#### RAG Pipelines
| File | Title | Status | Notes |
|------|-------|--------|-------|
| `tutorials/rag/building-knowledge-base.md` | Building a Knowledge Base | 🔴 Create | Docs → Chroma/LlamaIndex |
| `tutorials/rag/enterprise-haystack.md` | Enterprise RAG with Haystack | 🔴 Create | Production pipeline |
| `tutorials/rag/vector-db-migration.md` | Vector DB Migration | 🔴 Create | Between Pinecone/Qdrant/etc |

#### AI Assistants
| File | Title | Status | Notes |
|------|-------|--------|-------|
| `tutorials/ai-assistants/claude-skill.md` | Creating Claude Skills | 🔴 Create | Claude Code integration |
| `tutorials/ai-assistants/custom-gpt.md` | Creating Custom GPTs | 🔴 Create | OpenAI GPT creation |
| `tutorials/ai-assistants/gemini-knowledge.md` | Gemini Knowledge Skills | 🔴 Create | Google Gemini integration |

#### AI Coding
| File | Title | Status | Notes |
|------|-------|--------|-------|
| `tutorials/coding/cursor-rules.md` | Cursor Rules for Projects | 🔴 Create | .cursorrules creation |
| `tutorials/coding/windsurf-context.md` | Windsurf Project Context | 🔴 Create | .windsurfrules setup |
| `tutorials/coding/codebase-analysis.md` | Codebase Analysis | 🟡 Move+Update | From current tutorials |

#### Documentation
| File | Title | Status | Notes |
|------|-------|--------|-------|
| `tutorials/docs/scraping-websites.md` | Scraping Documentation Sites | 🟡 Move+Update | From current scraping-docs.md |
| `tutorials/docs/github-repos.md` | Analyzing GitHub Repositories | 🟡 Move+Update | From current analyzing-github.md |
| `tutorials/docs/pdf-manuals.md` | Extracting PDF Manuals | 🟡 Move+Update | From current extracting-pdfs.md |
| `tutorials/docs/multi-source.md` | Multi-Source Skills | 🟢 Keep | Already good, minor updates |

#### Advanced
| File | Title | Status | Notes |
|------|-------|--------|-------|
| `tutorials/advanced/ai-enhancement.md` | AI Enhancement Guide | 🟡 Move+Update | From manual/enhancement/ |
| `tutorials/advanced/mcp-server.md` | Using MCP Server | 🔴 Create | MCP tools tutorial |
| `tutorials/advanced/ci-cd.md` | CI/CD Automation | 🔴 Create | GitHub Action setup |
| `tutorials/advanced/workflows.md` | Enhancement Workflows | 🔴 Create | **v3.1.0 - NEW** |

### 4. MANUAL (Deep Dives)
Comprehensive understanding of concepts.

| File | Title | Status | Notes |
|------|-------|--------|-------|
| `manual/concepts/architecture.md` | Architecture Overview | 🔴 Create | High-level system design |
| `manual/concepts/three-stream.md` | Three-Stream GitHub Architecture | 🔴 Create | Code+Docs+Issues streams |
| `manual/concepts/c3x-analysis.md` | C3.x Codebase Analysis | 🟡 Move+Update | From current reference/ |
| `manual/concepts/skill-format.md` | SKILL.md Format | 🟡 Move+Update | From current reference/ |
| `manual/scraping/overview.md` | Scraping Overview | 🔴 Create | Multi-source strategies |
| `manual/scraping/patterns.md` | URL Patterns & Selectors | 🔴 Create | CSS selectors, regex patterns |
| `manual/enhancement/overview.md` | AI Enhancement Concepts | 🟡 Move+Update | From current manual/ |
| `manual/enhancement/workflows.md` | Enhancement Workflows | 🔴 Create | **v3.1.0 - NEW** |
| `manual/enhancement/custom-workflows.md` | Creating Custom Workflows | 🔴 Create | **v3.1.0 - NEW** |
| `manual/packaging/adaptors.md` | Platform Adaptors | 🔴 Create | How adaptors work |
| `manual/packaging/creating-adaptor.md` | Creating Custom Adaptors | 🔴 Create | Build your own adaptor |

### 5. INTEGRATIONS (Platform Guides)
Platform-specific instructions.

| File | Title | Status | Notes |
|------|-------|--------|-------|
| `integrations/claude.md` | Claude AI | 🟡 Update | Expand current |
| `integrations/gemini.md` | Google Gemini | 🟡 Update | Expand current |
| `integrations/openai.md` | OpenAI ChatGPT | 🟡 Update | Expand current |
| `integrations/langchain.md` | LangChain | 🟡 Update | From current integrations/rag/ |
| `integrations/llamaindex.md` | LlamaIndex | 🟡 Update | From current integrations/rag/ |
| `integrations/pinecone.md` | Pinecone | 🟡 Update | From current integrations/rag/ |
| `integrations/chroma.md` | ChromaDB | 🟡 Update | From current integrations/rag/ |
| `integrations/weaviate.md` | Weaviate | 🟡 Update | From current integrations/rag/ |
| `integrations/qdrant.md` | Qdrant | 🟡 Update | From current integrations/rag/ |
| `integrations/faiss.md` | FAISS | 🟡 Update | From current integrations/rag/ |
| `integrations/haystack.md` | Haystack | 🟡 Update | From current integrations/rag/ |
| `integrations/cursor.md` | Cursor IDE | 🔴 Create | **NEW** |
| `integrations/windsurf.md` | Windsurf | 🔴 Create | **NEW** |
| `integrations/cline.md` | Cline | 🔴 Create | **NEW** |
| `integrations/continue.md` | Continue.dev | 🔴 Create | **NEW** |

### 6. CLI REFERENCE
Command documentation.

| File | Title | Status | Notes |
|------|-------|--------|-------|
| `cli/index.md` | CLI Overview | 🟡 Update | Update commands table |
| `cli/create.md` | create Command | 🔴 Create | **v3.0+ - NEW unified command** |
| `cli/workflows.md` | workflows Command | 🔴 Create | **v3.1.0 - NEW** |
| `cli/cloud.md` | cloud Command | 🔴 Create | **v3.0+ - NEW** |
| `cli/config.md` | config Command | 🟢 Keep | Already current |
| `cli/resume.md` | resume Command | 🟢 Keep | Already current |

### 7. REFERENCE
Technical specifications.

| File | Title | Status | Notes |
|------|-------|--------|-------|
| `reference/config-format.md` | Config File Format | 🔴 Create | JSON schema documentation |
| `reference/environment-variables.md` | Environment Variables | 🔴 Create | All env vars reference |
| `reference/mcp-tools.md` | MCP Tools Reference | 🟡 Move+Update | From current manual/mcp/ |
| `reference/api.md` | Python API | 🔴 Create | Programmatic usage |
| `reference/feature-matrix.md` | Platform Feature Matrix | 🟢 Keep | Already current |
| `reference/changelog.md` | Changelog | 🟡 Update | Add v3.0/3.1 entries |

### 8. COMMUNITY
Contributing & support.

| File | Title | Status | Notes |
|------|-------|--------|-------|
| `community/contributing.md` | Contributing | 🟢 Keep | Already current |
| `community/config-gallery.md` | Config Gallery | 🟢 Keep | Already current |
| `community/roadmap.md` | Roadmap | 🟢 Keep | Already current |

---

## Content Migration Map

### Files to Keep (Minor Updates)
- `getting-started/installation.md`
- `getting-started/quick-start.md`
- `cli/config.md`
- `cli/resume.md`
- `community/contributing.md`
- `community/roadmap.md`
- `reference/feature-matrix.md`

### Files to Update & Move
| From | To |
|------|-----|
| `about/introduction.md` | `about/introduction.md` |
| `about/features.md` | `about/features.md` |
| `about/use-cases.md` | `about/use-cases.md` |
| `about/faq.md` | `about/faq.md` |
| `getting-started/first-skill.md` | `getting-started/first-skill.md` |
| `tutorials/scraping-docs.md` | `tutorials/docs/scraping-websites.md` |
| `tutorials/analyzing-github.md` | `tutorials/docs/github-repos.md` |
| `tutorials/extracting-pdfs.md` | `tutorials/docs/pdf-manuals.md` |
| `tutorials/multi-source-skills.md` | `tutorials/docs/multi-source.md` |
| `manual/enhancement/ai-enhancement.md` | `tutorials/advanced/ai-enhancement.md` |
| `manual/platforms/gemini.md` | `integrations/gemini.md` |
| `manual/platforms/openai.md` | `integrations/openai.md` |
| `manual/platforms/multi-llm-support.md` | Reference content for integrations |
| `integrations/rag/*.md` | `integrations/*.md` (flatten) |
| `integrations/coding/cursor.md` | `integrations/cursor.md` |
| `reference/llms-txt-support.md` | Merge into relevant guides |
| `reference/skill-architecture.md` | `manual/concepts/skill-format.md` |
| `reference/c3x-router-architecture.md` | `manual/concepts/c3x-analysis.md` |

### Files to Deprecate/Remove
- `cli/scrape.md` → Merged into `cli/create.md`
- `cli/github.md` → Merged into `cli/create.md`
- `cli/pdf.md` → Merged into `cli/create.md`
- `cli/unified.md` → Merged into `cli/create.md`
- `cli/scrape.md` → Merged into `cli/create.md`
- `cli/package.md` → Merged into `cli/create.md`
- `cli/enhance.md` → Merged into workflows docs
- `manual/scraping/pdf.md` → Content moved to tutorials
- `manual/mcp/*.md` → Consolidated into reference
- `reference/claude-integration.md` → Merge into integrations
- `reference/ai-skill-standards.md` → Merge into skill-format
- `reference/large-documentation.md` → Merge into guides
- `reference/git-config-sources.md` → Merge into config-format

---

## Chinese Translation Plan

All new and updated documents will be translated to Chinese following the current pattern:
- English docs: `src/content/docs/**/*.md`
- Chinese docs: `src/content/docs-zh/**/*.md`

Translation workflow:
1. Create all English documentation first
2. Translate each document to Chinese
3. Maintain same structure in both languages

---

## Implementation Phases

### Phase 1: Foundation (Structure + Core Docs)
1. Create new directory structure
2. Create ABOUT section
3. Create GETTING STARTED section
4. Update sidebar configuration

### Phase 2: Tutorials (Use-Case Based)
1. Create RAG tutorials
2. Create AI Assistant tutorials
3. Create AI Coding tutorials
4. Migrate/update Documentation tutorials

### Phase 3: Manual & Integrations
1. Create Manual section
2. Create/update all Integration guides
3. Add missing AI coding assistants (Cursor, Windsurf, Cline, Continue)

### Phase 4: Reference & CLI
1. Create CLI reference (unified create command, workflows)
2. Create/update Reference docs
3. Update changelog with v3.0/3.1 features

### Phase 5: Chinese Translation
1. Translate all ABOUT docs
2. Translate all GETTING STARTED docs
3. Translate all TUTORIALS
4. Translate MANUAL & INTEGRATIONS
5. Translate CLI & REFERENCE

### Phase 6: Testing & Polish
1. Verify all internal links work
2. Check navigation flow
3. Mobile responsiveness check
4. Final review

---

## Notes

### Three-Stream vs C3.x
- **Three-Stream Architecture**: GitHub fetching system that splits repositories into Code, Docs, and Issues streams
- **C3.x Analysis**: Codebase analysis system with 7 levels (C3.1-C3.7) for pattern detection, test extraction, etc.

These are separate concepts that work together:
1. Three-Stream fetches GitHub repo data
2. C3.x analyzes the code stream for patterns
3. Router combines everything into modular skills

### v3.1.0 Workflow Feature
The new `skill-seekers workflows` command needs comprehensive documentation:
- List, show, copy, add, remove, validate subcommands
- Bundled presets: default, minimal, security-focus, architecture-comprehensive, api-documentation
- Custom workflow creation with YAML
- Multiple workflow chaining

---

## Success Criteria

- [ ] All 45+ documents created/updated
- [ ] All Chinese translations complete
- [ ] Navigation sidebar updated
- [ ] All internal links working
- [ ] Mobile responsive
- [ ] User testing passed
- [ ] Tests passing (npm test)
