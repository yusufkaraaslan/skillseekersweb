---
title: Changelog
description: Complete version history of Skill Seekers from v0.1.0 to v3.5.0 — Grand Unification, agent-agnostic architecture, marketplace pipeline, and all features, changes, fixes, and breaking changes documented
section: community
order: 4
---

# Changelog

All notable changes to Skill Seeker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

## [3.5.0] - 2026-04-09

**Theme:** Grand Unification — one command, one interface, direct converters. Agent-agnostic architecture, marketplace pipeline, smart SPA discovery, and all content extraction enabled by default. 80+ files changed.

### Added
- **Grand Unification** — unified `create` command as single entry point for all 18 source types with auto-detection, direct converter invocation, and centralized enhancement (#346)
- **Agent-agnostic `AgentClient` abstraction** — all 5 enhancers now support Claude, Kimi, Codex, Copilot, OpenCode, and custom agents
- **Kimi CLI integration** with stdin piping and output parsing
- **MarketplacePublisher** — publish skills to Claude Code plugin marketplace repos
- **MarketplaceManager** — register and manage marketplace repositories
- **ConfigPublisher** — push configs to registered config source repos
- **Smart SPA discovery engine** — three-layer discovery: sitemap.xml, llms.txt, SPA nav rendering
- **`"browser": true` config support** for JavaScript SPA sites
- **Dynamic routing via `_build_argv()`** — added 7 missing CLI flags
- **Kotlin language support** for codebase analysis
- **Headless browser rendering** (`--browser` flag) via Playwright
- **`skill-seekers doctor` command** — 8 diagnostic checks
- **Prompt injection check workflow** — scans for injection patterns
- **Codex CLI plugin manifest** (`.codex-plugin/plugin.json`) for OpenAI Codex integration (#350)
- **6 behavioral UML diagrams** — sequence, activity, and component diagrams
- **134 new tests** (total: 3194+)

### Changed
- **All content extraction features enabled by default** — pattern detection, test examples, how-to guides, config extraction, and router generation no longer require explicit opt-in
- Renamed `claude-enhanced` merge mode to `ai-enhanced` (backward compat kept)
- Removed 118+ hardcoded Claude references across 60+ files
- Removed 50-file GitHub API analysis limit
- Removed 100-file config extraction limit
- Fixed unified scraper default `max_pages` from 100 to 500
- Centralized enhancement timeouts to 45min default with unlimited support
- Excluded slow MCP/e2e tests from CI coverage step to prevent timeouts

### Fixed
- Replaced `glob('*.md')` with `rglob('*.md')` in all adaptors — fixes packaging for nested skill directories (#349)
- GitHub language detection crashes with `TypeError` on non-integer metadata keys (#322)
- C3.x codebase analysis crashes with `TypeError` on removed `enhance_with_ai`/`ai_mode` kwargs (#323)

### Security
- Removed command injection via cloned repo script execution
- Replaced `git add -A` with targeted staging
- Clear auth tokens from cached `.git/config`
- Use `defusedxml` for sitemap XML parsing (XXE protection)
- Path traversal validation for config names

---

## [3.4.0] - 2026-03-21

### Added
- **OpenCode adaptor** (`--target opencode`)
- **6 new LLM platform adaptors**: Kimi, DeepSeek, Qwen, OpenRouter, Together, Fireworks (total: 12 targets)
- **7 new CLI agent install paths** (total: 18 agents)
- **Full UML architecture documentation** — 14 class diagrams synced from StarUML
- **StarUML HTML API reference** documentation export
- **Ecosystem section** in README

### Changed
- Platform count: 5 → 12 LLM targets
- Agent count: 11 → 18 install paths

---

## [3.3.0] - 2026-03-16

**Theme:** 10 new source types (17 total), EPUB integration, sync-config command, performance optimizations, 12 README translations, and 19 bug fixes.

### Added
- **10 new source types**: Jupyter, Local HTML, OpenAPI/Swagger, AsciiDoc, PowerPoint, RSS/Atom, Man Pages, Confluence, Notion, Slack/Discord
- **EPUB unified pipeline integration**
- **Generic merge system** for any combination of source types
- **18 source types in config validator**
- **`sync-config` command** — crawl doc sites and diff URLs
- **10 new CLI subcommands**, entry points, and optional dependency groups
- **MCP `scrape_generic` tool** — handles all new source types
- **77 new integration tests**

### Performance
- Pre-compiled regex and O(1) URL dedup in doc_scraper
- Bisect-based O(log n) line indexing
- O(1) tree traversal in github_scraper

---

## [3.2.0] - 2026-03-01

**Theme:** Video source support, Word document support, Pinecone adaptor. 94 files changed, +23,500 lines. 2,540 tests passing.

### Added
- **Video scraping pipeline** — YouTube and local video extraction with transcripts, visual OCR, code timeline
- **Word document (.docx) support**
- **Pinecone vector DB adaptor**

---

## [3.0.0] - 2026-02-10

### 🚀 "Universal Intelligence Platform" - Major Release

**Theme:** Transform any documentation into structured knowledge for any AI system.

### Added

- **16 Platform Adaptors** (up from 4)
  - RAG/Vectors: LangChain, LlamaIndex, Chroma, FAISS, Haystack, Qdrant, Weaviate
  - AI Platforms: Claude, Gemini, OpenAI
  - AI Coding: Cursor, Windsurf, Cline, Continue.dev
  - Generic: Markdown
- **26 MCP Tools** (up from 9)
  - Config tools (3): generate_config, list_configs, validate_config
  - Scraping tools (8): estimate_pages, scrape_docs, scrape_github, scrape_pdf, scrape_codebase, detect_patterns, extract_test_examples, build_how_to_guides
  - Packaging tools (4): package_skill, upload_skill, enhance_skill, install_skill
  - Source tools (5): fetch_config, submit_config, add/remove_config_source, list_config_sources
  - Splitting tools (2): split_config, generate_router
  - Vector DB tools (4): export_to_weaviate, export_to_chroma, export_to_faiss, export_to_qdrant
- **Cloud Storage Support**
  - AWS S3 with multipart upload and presigned URLs
  - Google Cloud Storage with signed URLs
  - Azure Blob Storage with SAS tokens
- **CI/CD Ready**
  - GitHub Action for automated skill generation
  - Docker support with official images
  - Automated pipelines with scheduling
- **Godot Game Engine Support**
  - Full Godot 4.x analysis
  - Signal flow detection (208 signals, 634 connections, 298 emissions)
  - Pattern detection (EventBus, Observer, Event Chains)
  - GDScript test extraction (GUT, gdUnit4)
- **7 New Programming Languages**
  - Dart (Flutter), Scala, SCSS/SASS, Elixir, Lua, Perl
  - Total: 27+ programming languages supported
- **Multi-Agent Support**
  - Claude Code (default)
  - GitHub Copilot CLI
  - OpenAI Codex CLI
  - OpenCode CLI
  - Custom agent support
- **RAG Chunking**
  - Semantic document splitting
  - Optimal chunk size (512 tokens)
  - Rich metadata preservation

### Statistics

- 1,852 tests passing (up from 700+)
- 100 test files
- 58,512 lines of Python code
- 80+ documentation files
- 12 example projects

### Migration

v3.0.0 is fully backward compatible. All v2.x configs and commands work unchanged.

---

## [2.7.0] - 2026-01-18

### 🔐 Smart Rate Limit Management & Multi-Token Configuration

This **minor feature release** introduces intelligent GitHub rate limit handling, multi-profile token management, and comprehensive configuration system. Say goodbye to indefinite waits and confusing token setup!

### Added

- **🎯 Multi-Token Configuration System** - Flexible GitHub token management with profiles
  - **Secure config storage** at `~/.config/skill-seekers/config.json` with 600 permissions
  - **Multiple GitHub profiles** support (personal, work, OSS, etc.)
    - Per-profile rate limit strategies: `prompt`, `wait`, `switch`, `fail`
    - Configurable timeout per profile (default: 30 minutes)
    - Auto-detection and smart fallback chain
    - Profile switching when rate limited
  - **API key management** for Claude, Gemini, OpenAI
    - Environment variable fallback (ANTHROPIC_API_KEY, GOOGLE_API_KEY, OPENAI_API_KEY)
    - Config file storage with secure permissions
  - **Progress tracking** for resumable jobs
    - Auto-save at configurable intervals (default: 60 seconds)
    - Job metadata: command, progress, checkpoints, timestamps
    - Stored at `~/.local/share/skill-seekers/progress/`
  - **Auto-cleanup** of old progress files (default: 7 days, configurable)
  - **First-run experience** with welcome message and quick setup
  - **ConfigManager class** with singleton pattern for global access

- **🧙 Interactive Configuration Wizard** - Beautiful terminal UI for easy setup
  - **Main menu** with 7 options:
    1. GitHub Token Setup
    2. API Keys (Claude, Gemini, OpenAI)
    3. Rate Limit Settings
    4. Resume Settings
    5. View Current Configuration
    6. Test Connections
    7. Clean Up Old Progress Files
  - **GitHub token management**:
    - Add/remove profiles with descriptions
    - Set default profile
    - Browser integration - opens GitHub token creation page
    - Token validation with format checking (ghp_*, github_pat_*)
    - Strategy selection per profile
  - **API keys setup** with browser integration for each provider
  - **Connection testing** to verify tokens and API keys
  - **Configuration display** with current status and sources
  - **CLI commands**:
    - `skill-seekers config` - Main menu
    - `skill-seekers config --github` - Direct to GitHub setup
    - `skill-seekers config --api-keys` - Direct to API keys
    - `skill-seekers config --show` - Show current config
    - `skill-seekers config --test` - Test connections

- **🚦 Smart Rate Limit Handler** - Intelligent GitHub API rate limit management
  - **Upfront warning** about token status (60/hour vs 5000/hour)
  - **Real-time detection** of rate limits from GitHub API responses
    - Parses X-RateLimit-* headers
    - Detects 403 rate limit errors
    - Calculates reset time from timestamps
  - **Live countdown timers** with progress display
  - **Automatic profile switching** - tries next available profile when rate limited
  - **Four rate limit strategies**:
    - `prompt` - Ask user what to do (default, interactive)
    - `wait` - Auto-wait with countdown timer
    - `switch` - Automatically try another profile
    - `fail` - Fail immediately with clear error
  - **Non-interactive mode** for CI/CD (fail fast, no prompts)
  - **Configurable timeouts** per profile (prevents indefinite waits)
  - **RateLimitHandler class** with strategy pattern
  - **Integration points**: GitHub fetcher, GitHub scraper

- **📦 Resume Command** - Resume interrupted scraping jobs
  - **List resumable jobs** with progress details:
    - Job ID, started time, command
    - Current phase and file counts
    - Last updated timestamp
  - **Resume from checkpoints** (skeleton implemented, ready for integration)
  - **Auto-cleanup** of old jobs (respects config settings)
  - **CLI commands**:
    - `skill-seekers resume --list` - List all resumable jobs
    - `skill-seekers resume <job-id>` - Resume specific job
    - `skill-seekers resume --clean` - Clean up old jobs
  - **Progress storage** at `~/.local/share/skill-seekers/progress/<job-id>.json`

- **⚙️ CLI Enhancements** - New flags and improved UX
  - **--non-interactive flag** for CI/CD mode
    - Available on: `skill-seekers github`
    - Fails fast on rate limits instead of prompting
    - Perfect for automated pipelines
  - **--profile flag** to select specific GitHub profile
    - Available on: `skill-seekers github`
    - Uses configured profile from `~/.config/skill-seekers/config.json`
    - Overrides environment variables and defaults
  - **Entry points** for new commands:
    - `skill-seekers-config` - Direct config command access
    - `skill-seekers-resume` - Direct resume command access

- **🧪 Comprehensive Test Suite** - Full test coverage for new features
  - **16 new tests** in `test_rate_limit_handler.py`
  - **Test coverage**:
    - Header creation (with/without token)
    - Handler initialization (token, strategy, config)
    - Rate limit detection and extraction
    - Upfront checks (interactive and non-interactive)
    - Response checking (200, 403, rate limit)
    - Strategy handling (fail, wait, switch, prompt)
    - Config manager integration
    - Profile management (add, retrieve, switch)
  - **All tests passing** ✅ (16/16)
  - **Test utilities**: Mock responses, config isolation, tmp directories

- **🎯 Bootstrap Skill Feature** - Self-hosting capability (PR #249)
  - **Self-Bootstrap**: Generate skill-seekers as a Claude Code skill
    - `./scripts/bootstrap_skill.sh` - One-command bootstrap
    - Combines manual header with auto-generated codebase analysis
    - Output: `output/skill-seekers/` ready for Claude Code
    - Install: `cp -r output/skill-seekers ~/.claude/skills/`
  - **Robust Frontmatter Detection**:
    - Dynamic YAML frontmatter boundary detection (not hardcoded line counts)
    - Fallback to line 6 if frontmatter not found
    - Future-proof against frontmatter field additions
  - **SKILL.md Validation**:
    - File existence and non-empty checks
    - Frontmatter delimiter presence
    - Required fields validation (name, description)
    - Exit with clear error messages on validation failures
  - **Comprehensive Error Handling**:
    - UV dependency check with install instructions
    - Permission checks for output directory
    - Graceful degradation on missing header file

- **🔧 MCP Now Optional** - User choice for installation profile
  - **CLI Only**: `pip install skill-seekers` - No MCP dependencies
  - **MCP Integration**: `pip install skill-seekers[mcp]` - Full MCP support
  - **All Features**: `pip install skill-seekers[all]` - Everything enabled
  - **Lazy Loading**: Graceful failure with helpful error messages when MCP not installed
  - **Interactive Setup Wizard**:
    - Shows all installation options on first run
    - Stored at `~/.config/skill-seekers/.setup_shown`
    - Accessible via `skill-seekers-setup` command
  - **Entry Point**: `skill-seekers-setup` for manual access

- **🧪 E2E Testing for Bootstrap** - Comprehensive end-to-end tests
  - **6 core tests** verifying bootstrap workflow:
    - Output structure creation
    - Header prepending
    - YAML frontmatter validation
    - Line count sanity checks
    - Virtual environment installability
    - Platform adaptor compatibility
  - **Pytest markers**: @pytest.mark.e2e, @pytest.mark.venv, @pytest.mark.slow
  - **Execution modes**:
    - Fast tests: `pytest -k "not venv"` (~2-3 min)
    - Full suite: `pytest -m "e2e"` (~5-10 min)
  - **Test utilities**: Fixtures for project root, bootstrap runner, output directory

- **📚 Comprehensive Documentation Overhaul** - Complete v2.7.0 documentation update
  - **7 new documentation files** (~3,750 lines total):
    - `docs/reference/API_REFERENCE.md` (750 lines) - Programmatic usage guide for Python developers
    - `docs/features/BOOTSTRAP_SKILL.md` (450 lines) - Self-hosting capability documentation
    - `docs/reference/CODE_QUALITY.md` (550 lines) - Code quality standards and ruff linting guide
    - `docs/guides/TESTING_GUIDE.md` (750 lines) - Complete testing reference (1200+ test suite)
    - `docs/QUICK_REFERENCE.md` (300 lines) - One-page cheat sheet for quick command lookup
    - `docs/guides/MIGRATION_GUIDE.md` (400 lines) - Version upgrade guides (v1.0.0 → v2.7.0)
    - `docs/FAQ.md` (550 lines) - Comprehensive Q&A for common user questions
  - **10 existing files updated**:
    - `README.md` - Updated test count badge (700+ → 1200+ tests), v2.7.0 callout
    - `ROADMAP.md` - Added v2.7.0 completion section with task statuses
    - `CONTRIBUTING.md` - Added link to CODE_QUALITY.md reference
    - `docs/README.md` - Quick links by use case, recent updates section
    - `docs/guides/MCP_SETUP.md` - Fixed server_fastmcp references (PR #252)
    - `docs/QUICK_REFERENCE.md` - Updated MCP server reference (server.py → server_fastmcp.py)
    - `CLAUDE_INTEGRATION.md` - Updated version references
    - 3 other documentation files with v2.7.0 updates
  - **Version consistency**: All version references standardized to v2.7.0
  - **Test counts**: Standardized to 1200+ tests (was inconsistent 700+ in some docs)
  - **MCP tool counts**: Updated to 18 tools (from 17)

- **📦 Git Submodules for Configuration Management** - Improved config organization and API deployment
  - **Configs as git submodule** at `api/configs_repo/` for cleaner repository
  - **Production configs**: Added official production-ready configuration presets
  - **Duplicate removal**: Cleaned up all duplicate configs from main repository
  - **Test filtering**: Filtered out test-example configs from API endpoints
  - **CI/CD integration**: GitHub Actions now initializes submodules automatically
  - **API deployment**: Updated render.yaml to use git submodule for configs_repo
  - **Benefits**: Cleaner main repo, better config versioning, production/test separation

- **🔍 Config Discovery Enhancements** - Improved config listing
  - **--all flag** for estimate command: `skill-seekers estimate --all`
  - Lists all available preset configurations with descriptions
  - Helps users discover supported frameworks before scraping
  - Shows config names, frameworks, and documentation URLs

### Changed

- **GitHub Fetcher** - Integrated rate limit handler
  - Modified `github_fetcher.py` to use `RateLimitHandler`
  - Added upfront rate limit check before starting
  - Check responses for rate limits on all API calls
  - Automatic profile detection from config
  - Raises `RateLimitError` when rate limit cannot be handled
  - Constructor now accepts `interactive` and `profile_name` parameters

- **GitHub Scraper** - Added rate limit support
  - New `--non-interactive` flag for CI/CD mode
  - New `--profile` flag to select GitHub profile
  - Config now supports `interactive` and `github_profile` keys
  - CLI argument passing for non-interactive and profile options

- **Main CLI** - Enhanced with new commands
  - Added `config` subcommand with options (--github, --api-keys, --show, --test)
  - Added `resume` subcommand with options (--list, --clean)
  - Updated GitHub subcommand with --non-interactive and --profile flags
  - Updated command documentation strings
  - Version bumped to 2.7.0

- **pyproject.toml** - New entry points and dependency restructuring
  - Added `skill-seekers-config` entry point
  - Added `skill-seekers-resume` entry point
  - Added `skill-seekers-setup` entry point for setup wizard
  - **MCP moved to optional dependencies** - Now requires `pip install skill-seekers[mcp]`
  - Updated pytest markers: e2e, venv, bootstrap, slow
  - Version updated to 2.7.0

- **install_skill.py** - Lazy MCP loading
  - Try/except ImportError for MCP imports
  - Graceful failure with helpful error message when MCP not installed
  - Suggests alternatives: scrape + package workflow
  - Maintains backward compatibility for existing MCP users

### Fixed

- **Code Quality Improvements** - Fixed all 21 ruff linting errors across codebase
  - SIM102: Combined nested if statements using `and` operator (7 fixes)
  - SIM117: Combined multiple `with` statements into single multi-context `with` (9 fixes)
  - B904: Added `from e` to exception chaining for proper error context (1 fix)
  - SIM113: Removed unused enumerate counter variable (1 fix)
  - B007: Changed unused loop variable to `_` (1 fix)
  - ARG002: Removed unused method argument in test fixture (1 fix)
  - Files affected: config_extractor.py, config_validator.py, doc_scraper.py, pattern_recognizer.py (3), test_example_extractor.py (3), unified_skill_builder.py, pdf_scraper.py, and 6 test files
  - Result: Zero linting errors, cleaner code, better maintainability

- **Version Synchronization** - Fixed version mismatch across package (Issue #248)
  - All `__init__.py` files now correctly show version 2.7.0 (was 2.5.2 in 4 files)
  - Files updated: `src/skill_seekers/__init__.py`, `src/skill_seekers/cli/__init__.py`, `src/skill_seekers/mcp/__init__.py`, `src/skill_seekers/mcp/tools/__init__.py`
  - Ensures `skill-seekers --version` shows accurate version number
  - **Critical**: Prevents bug where PyPI shows wrong version (Issue #248)

- **Case-Insensitive Regex in Install Workflow** - Fixed install workflow failures (Issue #236)
  - Made regex patterns case-insensitive using `(?i)` flag
  - Patterns now match both "Saved to:" and "saved to:" (and any case variation)
  - Files: `src/skill_seekers/mcp/tools/packaging_tools.py` (lines 529, 668)
  - Impact: install_skill workflow now works reliably regardless of output formatting

- **Test Fixture Error** - Fixed pytest fixture error in bootstrap skill tests
  - Removed unused `tmp_path` parameter causing fixture lookup errors
  - File: `tests/test_bootstrap_skill.py:54`
  - Result: All CI test runs now pass without fixture errors

- **MCP Setup Modernization** - Updated MCP server configuration (PR #252, @MiaoDX)
  - Fixed 41 instances of `server_fastmcp_fastmcp` → `server_fastmcp` typo in docs/guides/MCP_SETUP.md
  - Updated all 12 files to use `skill_seekers.mcp.server_fastmcp` module
  - Enhanced setup_mcp.sh with automatic venv detection (.venv, venv, $VIRTUAL_ENV)
  - Updated tests to accept `-e ".[mcp]"` format and module references
  - Files: .claude/mcp_config.example.json, CLAUDE.md, README.md, docs/guides/*.md, setup_mcp.sh, tests/test_setup_scripts.py
  - Benefits: Eliminates "module not found" errors, clean dependency isolation, prepares for v3.0.0

- **Rate limit indefinite wait** - No more infinite waiting
  - Configurable timeout per profile (default: 30 minutes)
  - Clear error messages when timeout exceeded
  - Graceful exit with helpful next steps
  - Resume capability for interrupted jobs

- **Token setup confusion** - Clear, guided setup process
  - Interactive wizard with browser integration
  - Token validation with helpful error messages
  - Clear documentation of required scopes
  - Test connection feature to verify tokens work

- **CI/CD failures** - Non-interactive mode support
  - `--non-interactive` flag fails fast instead of hanging
  - No user prompts in non-interactive mode
  - Clear error messages for automation logs
  - Exit codes for pipeline integration

- **AttributeError in codebase_scraper.py** - Fixed incorrect flag check (PR #249)
  - Changed `if args.build_api_reference:` to `if not args.skip_api_reference:`
  - Aligns with v2.5.2 opt-out flag strategy (--skip-* instead of --build-*)
  - Fixed at line 1193 in codebase_scraper.py

### Technical Details

- **Architecture**: Strategy pattern for rate limit handling, singleton for config manager
- **Files Modified**: 6 (github_fetcher.py, github_scraper.py, main.py, pyproject.toml, install_skill.py, codebase_scraper.py)
- **New Files**: 6 (config_manager.py ~490 lines, config_command.py ~400 lines, rate_limit_handler.py ~450 lines, resume_command.py ~150 lines, setup_wizard.py ~95 lines, test_bootstrap_skill_e2e.py ~169 lines)
- **Bootstrap Scripts**: 2 (bootstrap_skill.sh enhanced, skill_header.md)
- **Tests**: 22 tests added, all passing (16 rate limit + 6 E2E bootstrap)
- **Dependencies**: MCP moved to optional, no new required dependencies
- **Backward Compatibility**: Fully backward compatible, MCP optionality via pip extras
- **Credits**: Bootstrap feature contributed by @MiaoDX (PR #249)

### Migration Guide

**Existing users** - No migration needed! Everything works as before.

**MCP users** - If you use MCP integration features:
```bash
# Reinstall with MCP support
pip install -U skill-seekers[mcp]

# Or install everything
pip install -U skill-seekers[all]
```

**New installation profiles**:
```bash
# CLI only (no MCP)
pip install skill-seekers

# With MCP integration
pip install skill-seekers[mcp]

# With multi-LLM support (Gemini, OpenAI)
pip install skill-seekers[all-llms]

# Everything
pip install skill-seekers[all]

# See all options
skill-seekers-setup
```

**To use new features**:
```bash
# Set up GitHub token (one-time)
skill-seekers config --github

# Add multiple profiles
skill-seekers config
# → Select "1. GitHub Token Setup"
# → Select "1. Add New Profile"

# Use specific profile
skill-seekers github --repo owner/repo --profile work

# CI/CD mode
skill-seekers github --repo owner/repo --non-interactive

# View configuration
skill-seekers config --show

# Bootstrap skill-seekers as a Claude Code skill
./scripts/bootstrap_skill.sh
cp -r output/skill-seekers ~/.claude/skills/
```

### Breaking Changes

None - this release is fully backward compatible.

---

## [2.6.0] - 2026-01-13

### 🚀 Codebase Analysis Enhancements & Documentation Reorganization

This **minor feature release** completes the C3.x codebase analysis suite with standalone SKILL.md generation for codebase scraper, adds comprehensive documentation reorganization, and includes quality-of-life improvements for setup and testing.

### Added
- **C3.8 Standalone Codebase Scraper SKILL.md Generation** - Complete skill structure for standalone codebase analysis
- **Global Setup Script with FastMCP** - setup.sh for end-user global installation
- **Comprehensive Documentation Reorganization** - Complete overhaul of documentation structure
- **Test Configuration** - AstroValley unified config for testing
- **Enhanced LOCAL Enhancement Modes** - Advanced enhancement execution options
- **C3.1 Design Pattern Detection** - Detect 10 common design patterns in code
- **C3.2 Test Example Extraction** - Extract real usage examples from test files
- **C3.3 How-To Guide Generation with Comprehensive AI Enhancement** - Transform test workflows into step-by-step educational guides
- **C3.4 Configuration Pattern Extraction with AI Enhancement** - Analyze and document configuration files
- **C3.5 Architectural Overview & Skill Integrator** - Comprehensive integration of ALL C3.x codebase analysis
- **C3.6 AI Enhancement** - AI-powered insights for patterns and test examples
- **C3.7 Architectural Pattern Detection** - Detect high-level architectural patterns

### Changed
- **BREAKING: Analysis Features Now Default ON** - Improved UX for codebase analysis

### Fixed
- **Codebase Scraper Language Stats** - Fixed dict format handling in `_get_language_stats()`

---

## [2.5.2] - 2025-12-31

### 🔧 Package Configuration Improvement

This **patch release** improves the packaging configuration by switching from manual package listing to automatic package discovery.

### Changed
- **Package Discovery**: Switched from manual package listing to automatic discovery in pyproject.toml

---

## [2.5.1] - 2025-12-30

### 🐛 Critical Bug Fix - PyPI Package Broken

This **patch release** fixes a critical packaging bug that made v2.5.0 completely unusable for PyPI users.

### Fixed
- **CRITICAL**: Added missing `skill_seekers.cli.adaptors` module to packages list in pyproject.toml

---

## [2.5.0] - 2025-12-28

### 🚀 Multi-Platform Feature Parity - 4 LLM Platforms Supported

This **major feature release** adds complete multi-platform support for Claude AI, Google Gemini, OpenAI ChatGPT, and Generic Markdown export.

### 🎯 Major Features

#### Multi-LLM Platform Support
- **4 platforms supported**: Claude AI, Google Gemini, OpenAI ChatGPT, Generic Markdown
- **Complete feature parity**: All skill modes work with all platforms
- **Platform adaptors**: Clean architecture with platform-specific implementations
- **Unified workflow**: Same scraping output works for all platforms

### Added
- **Platform Adaptors** - Base class and 4 implementations (Claude, Gemini, OpenAI, Markdown)
- **CLI Tools** - Multi-platform packaging, upload, and enhancement
- **MCP Tools** - `enhance_skill` (NEW), updated `package_skill` and `upload_skill`
- **Documentation** - FEATURE_MATRIX.md, updated UPLOAD_GUIDE.md
- **Optional Dependencies** - `[gemini]`, `[openai]`, `[all-llms]` extras
- **Tests** - 700 total tests passing (up from 427)

---

## [2.4.0] - 2025-12-25

### 🚀 MCP 2025 Upgrade - Multi-Agent Support & HTTP Transport

This **major release** upgrades the MCP infrastructure to the 2025 specification with support for 5 AI coding agents.

### 🎯 Major Features

#### MCP SDK v1.25.0 Upgrade
- **Upgraded from v1.18.0 to v1.25.0** - Latest MCP protocol specification
- **FastMCP framework** - Decorator-based tool registration, 68% code reduction
- **Enhanced reliability** - Better error handling, automatic schema generation

#### Dual Transport Support
- **stdio transport** (default) - Standard input/output for Claude Code, VS Code + Cline
- **HTTP transport** (new) - Server-Sent Events for Cursor, Windsurf, IntelliJ IDEA
- **Health check endpoint** - `GET /health` for monitoring
- **SSE endpoint** - `GET /sse` for real-time communication

#### Multi-Agent Auto-Configuration
- **5 AI agents supported**: Claude Code, Cursor, Windsurf, VS Code + Cline, IntelliJ IDEA
- **Automatic detection** - `agent_detector.py` scans for installed agents
- **One-command setup** - `./setup_mcp.sh` configures all detected agents

#### Expanded Tool Suite (17 Tools)
- **Config Tools (3)**: generate_config, list_configs, validate_config
- **Scraping Tools (4)**: estimate_pages, scrape_docs, scrape_github, scrape_pdf
- **Packaging Tools (3)**: package_skill, upload_skill, install_skill
- **Splitting Tools (2)**: split_config, generate_router
- **Source Tools (5)**: fetch_config, submit_config, add_config_source, list_config_sources, remove_config_source

---

## [2.3.0] - 2025-12-22

### 🤖 Multi-Agent Installation Support

This release adds automatic skill installation to 10+ AI coding agents with a single command.

### Added
- **Multi-agent installation support** - New `install-agent` command
- Support for 10+ agents: Claude Code, Cursor, VS Code, Amp, Goose, OpenCode, Letta, Aide, Windsurf
- `--agent all` flag to install to all agents at once
- Intelligent path resolution and fuzzy matching

---

## [2.2.0] - 2025-12-21

### 🚀 Private Config Repositories - Team Collaboration Unlocked

This major release adds **git-based config sources**, enabling teams to fetch configs from private/team repositories.

### 🎯 Major Features

#### Git-Based Config Sources
- **Multi-source config management** - Fetch from API, git URL, or named sources
- **Private repository support** - GitHub, GitLab, Bitbucket, Gitea
- **Team collaboration** - Share configs across teams with version control
- **Secure authentication** - Environment variable tokens only
- **Intelligent caching** - Shallow clone, auto-pull updates
- **Offline mode** - Works with cached repos when offline

#### New MCP Tools
- **`add_config_source`** - Register git repositories as config sources
- **`list_config_sources`** - View all registered sources
- **`remove_config_source`** - Unregister sources
- **Enhanced `fetch_config`** - Three modes (named source, git URL, API)

---

## [2.1.1] - 2025-11-30

### Fixed
- **submit_config MCP tool** - Comprehensive validation and format support
- Validates name format, URL formats, selectors, patterns
- Supports both legacy and unified config formats
- Enhanced category detection for multi-source configs

---

## [2.1.0] - 2025-11-29

### 🚀 GitHub Repository Analysis Enhancements

This release significantly improves GitHub repository scraping with unlimited local analysis.

### Added
- **Configurable directory exclusions** for local repository analysis
- **Unlimited local repository analysis** via `local_repo_path` configuration
- **Auto-exclusion** of virtual environments, build artifacts, and cache directories
- **Skip llms.txt option** - Force HTML scraping

### Fixed
- Fixed logger initialization error
- Fixed 3 NoneType subscriptable errors in release tag parsing
- Fixed relative import paths
- Fixed hardcoded 50-file analysis limit
- Fixed AST parser "not iterable" errors

### Improved
- Increased code analysis coverage from 14% to 93.6%
- Improved file discovery from 140 to 345 files
- Improved class extraction from 55 to 585 classes
- Improved function extraction from 512 to 2,784 functions

---

## [2.1.0] - 2025-11-12

### 🎉 Major Enhancement: Quality Assurance + Race Condition Fixes

This release focuses on quality and reliability improvements.

### 🚀 Major Features

#### Comprehensive Quality Checker
- **Automatic quality checks before packaging** - Validates skill quality
- **Quality scoring system** - 0-100 score with A-F grades
- **Enhancement verification** - Checks for template text, code examples
- **Structure validation** - Validates SKILL.md, references/ directory
- **Link validation** - Validates internal markdown links

#### Headless Enhancement Mode (Default)
- **No terminal windows** - Runs enhancement in background by default
- **Proper waiting** - Main console waits for enhancement to complete
- **Timeout protection** - 10-minute default timeout
- **Verification** - Checks that SKILL.md was actually updated

---

## [2.0.0] - 2025-11-11

### 🎉 Major Release: PyPI Publication + Modern Python Packaging

**Skill Seekers is now available on PyPI!** Install with: `pip install skill-seekers`

### 🚀 Major Changes

#### PyPI Publication
- **Published to PyPI** - https://pypi.org/project/skill-seekers/
- **Installation:** `pip install skill-seekers` or `uv tool install skill-seekers`
- **No cloning required** - Install globally or in virtual environments

#### Modern Python Packaging
- **pyproject.toml-based configuration** - Standard PEP 621 metadata
- **src/ layout structure** - Best practice package organization
- **Entry point scripts** - `skill-seekers` command available globally
- **Proper dependency groups** - Separate dev, test, and MCP dependencies

#### Unified CLI Interface
- **Single `skill-seekers` command** - Git-style subcommands
- **Subcommands:** `scrape`, `github`, `pdf`, `unified`, `enhance`, `package`, `upload`, `estimate`
- **Consistent interface** - All tools accessible through one entry point

---

## [1.3.0] - 2025-10-26

### Added - Refactoring & Performance Improvements
- **Async/Await Support for Parallel Scraping** (2-3x performance boost)
- **Python Package Structure** (Phase 0 Complete)
- **Centralized Configuration Module**
- Multi-variant llms.txt detection: downloads all 3 variants
- Automatic .txt → .md file extension conversion

### Changed
- Test count increased from 207 to 299 (92 new tests)
- All print() statements replaced with logging
- Code quality improved from 5.5/10 to 6.5/10

---

## [1.2.0] - 2025-10-23

### 🚀 PDF Advanced Features Release

Major enhancement to PDF extraction capabilities.

### Added

#### Priority 2: Support More PDF Types
- **OCR Support for Scanned PDFs** - Automatic text extraction using Tesseract OCR
- **Password-Protected PDF Support** - Handle encrypted PDFs
- **Complex Table Extraction** - Extract tables using PyMuPDF's detection

#### Priority 3: Performance Optimizations
- **Parallel Page Processing** - 3x faster PDF extraction using ThreadPoolExecutor
- **Intelligent Caching** - In-memory cache for expensive operations

---

## [1.1.0] - 2025-10-22

### 🌐 Documentation Scraping Enhancements

Major improvements to documentation scraping.

### Added

#### Unlimited Scraping & Performance
- **Unlimited Page Scraping** - Removed 500-page limit
- **Parallel Scraping Mode** - Process multiple pages simultaneously
- **Dynamic Rate Limiting** - Smart rate limit control

#### New Configurations
- **Ansible Core 2.19** - Complete Ansible documentation config
- **Claude Code** - Documentation for this very tool!
- **Laravel 9.x** - PHP framework documentation

---

## [1.0.0] - 2025-10-19

### 🎉 First Production Release

This is the first production-ready release with complete feature set.

### Added

#### Smart Auto-Upload Feature
- New `upload_skill.py` CLI tool
- Enhanced `package_skill.py` with `--upload` flag
- Smart API key detection with graceful fallback

#### MCP Integration Enhancements
- **9 MCP tools** (added `upload_skill` tool)
- Updated all MCP documentation

---

## [0.4.0] - 2025-10-18

### Added

#### Large Documentation Support (40K+ Pages)
- Config splitting functionality
- Router/hub skill generation
- Checkpoint/resume feature
- Parallel scraping support

---

## [0.3.0] - 2025-10-15

### Added

#### MCP Server Integration
- Complete MCP server implementation
- 6 MCP tools for Claude Code integration
- Automated setup script
- Comprehensive documentation

---

## [0.2.0] - 2025-10-10

### Added

#### Testing & Quality
- Comprehensive test suite with 71 tests
- 100% test pass rate
- Page count estimator

#### New Configs
- Kubernetes documentation config
- Tailwind CSS config
- Astro framework config

---

## [0.1.0] - 2025-10-05

### Added

#### Initial Release
- Basic documentation scraper functionality
- Manual skill creation
- Framework configs (Godot, React, Vue, Django, FastAPI)
- Smart categorization system
- Code language detection
- Pattern extraction

---

## Release Links

- [v2.6.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.6.0) - Codebase Analysis
- [v2.5.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.5.0) - Multi-Platform Support
- [v2.4.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.4.0) - MCP 2025 Upgrade
- [v2.3.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.3.0) - Multi-Agent Support
- [v2.2.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.2.0) - Git Config Sources
- [v2.0.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.0.0) - PyPI Publication
- [v1.0.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v1.0.0) - Production Release

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|------------|
| **2.6.0** | 2026-01-13 | 🧬 Complete C3.x codebase analysis suite |
| **2.5.0** | 2025-12-28 | 🌐 Multi-platform support (4 LLMs) |
| **2.4.0** | 2025-12-25 | 🔌 MCP 2025 upgrade, multi-agent support |
| **2.3.0** | 2025-12-22 | 🤖 Multi-agent installation |
| **2.2.0** | 2025-12-21 | 🔐 Private git config repositories |
| **2.0.0** | 2025-11-11 | 📦 PyPI publication |
| **1.0.0** | 2025-10-19 | 🚀 Production release |

---

[Unreleased]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.5.2...v2.6.0
[2.5.2]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.5.1...v2.5.2
[2.5.1]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.1.1...v2.2.0
[2.0.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v1.3.0...v2.0.0
[1.0.0]: https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v1.0.0
