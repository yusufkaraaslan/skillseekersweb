---
title: Changelog
description: Complete version history of Skill Seekers from v0.1.0 to v2.6.0 with all features, changes, fixes, and breaking changes documented
section: community
order: 4
---

# Changelog

All notable changes to Skill Seeker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

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
