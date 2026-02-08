---
title: 更新日志
description: Skill Seekers 从 v0.1.0 到 v3.0.0 的完整版本历史，记录所有功能、更改、修复和破坏性更改
section: community
order: 4
---

# 更新日志

Skill Seeker 的所有显著更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)，
本项目遵循[语义化版本控制](https://semver.org/spec/v2.0.0.html)。

## [未发布]

### 新增

### 更改

### 修复

### 删除

---

## [3.0.0] - 2026-02-10

### 🚀 "通用智能平台" - 主要版本

**主题：** 将任何文档转换为适用于任何 AI 系统的结构化知识。

### 新增

- **16 个平台适配器**（从 4 个增加）
  - RAG/向量：LangChain、LlamaIndex、Chroma、FAISS、Haystack、Qdrant、Weaviate
  - AI 平台：Claude、Gemini、OpenAI
  - AI 编码：Cursor、Windsurf、Cline、Continue.dev
  - 通用：Markdown
- **26 个 MCP 工具**（从 9 个增加）
  - 配置工具（3 个）：generate_config、list_configs、validate_config
  - 抓取工具（8 个）：estimate_pages、scrape_docs、scrape_github、scrape_pdf、scrape_codebase、detect_patterns、extract_test_examples、build_how_to_guides
  - 打包工具（4 个）：package_skill、upload_skill、enhance_skill、install_skill
  - 源工具（5 个）：fetch_config、submit_config、add/remove_config_source、list_config_sources
  - 拆分工具（2 个）：split_config、generate_router
  - 向量数据库工具（4 个）：export_to_weaviate、export_to_chroma、export_to_faiss、export_to_qdrant
- **云存储支持**
  - AWS S3，支持分块上传和预签名 URL
  - Google Cloud Storage，带签名 URL
  - Azure Blob Storage，带 SAS 令牌
- **CI/CD 就绪**
  - 用于自动生成技能的 GitHub Action
  - 官方 Docker 镜像支持
  - 带调度的自动化管道
- **Godot 游戏引擎支持**
  - 完整的 Godot 4.x 分析
  - 信号流检测（208 个信号、634 个连接、298 个发射）
  - 模式检测（EventBus、Observer、事件链）
  - GDScript 测试提取（GUT、gdUnit4）
- **7 种新编程语言**
  - Dart（Flutter）、Scala、SCSS/SASS、Elixir、Lua、Perl
  - 总计：支持 27+ 编程语言
- **多代理支持**
  - Claude Code（默认）
  - GitHub Copilot CLI
  - OpenAI Codex CLI
  - OpenCode CLI
  - 自定义代理支持
- **RAG 分块**
  - 语义文档拆分
  - 最佳块大小（512 个令牌）
  - 丰富的元数据保留

### 统计数据

- 1,852 个测试通过（从 700+ 增加）
- 100 个测试文件
- 58,512 行 Python 代码
- 80+ 个文档文件
- 12 个示例项目

### 迁移

v3.0.0 完全向后兼容。所有 v2.x 配置和命令保持不变。

---

## [2.7.0] - 2026-01-18

### 🔐 智能速率限制管理和多令牌配置

这个**次要功能版本**引入了智能 GitHub 速率限制处理、多配置文件令牌管理和全面的配置系统。告别无限期等待和令人困惑的令牌设置！

### 新增

- **🎯 多令牌配置系统** - 灵活的 GitHub 令牌管理与配置文件
  - **安全配置存储**位于 `~/.config/skill-seekers/config.json`，权限为 600
  - **多个 GitHub 配置文件**支持（个人、工作、OSS 等）
    - 每个配置文件的速率限制策略：`prompt`、`wait`、`switch`、`fail`
    - 每个配置文件可配置超时（默认：30 分钟）
    - 自动检测和智能回退链
    - 速率受限时的配置文件切换
  - **API 密钥管理**用于 Claude、Gemini、OpenAI
    - 环境变量回退（ANTHROPIC_API_KEY、GOOGLE_API_KEY、OPENAI_API_KEY）
    - 具有安全权限的配置文件存储
  - **进度跟踪**用于可恢复的作业
    - 可配置间隔的自动保存（默认：60 秒）
    - 作业元数据：命令、进度、检查点、时间戳
    - 存储在 `~/.local/share/skill-seekers/progress/`
  - **自动清理**旧进度文件（默认：7 天，可配置）
  - **首次运行体验**，带有欢迎消息和快速设置
  - **ConfigManager 类**，采用单例模式进行全局访问

- **🧙 交互式配置向导** - 用于轻松设置的漂亮终端 UI
  - **主菜单**，包含 7 个选项：
    1. GitHub 令牌设置
    2. API 密钥（Claude、Gemini、OpenAI）
    3. 速率限制设置
    4. 恢复设置
    5. 查看当前配置
    6. 测试连接
    7. 清理旧进度文件
  - **GitHub 令牌管理**：
    - 添加/删除带有描述的配置文件
    - 设置默认配置文件
    - 浏览器集成 - 打开 GitHub 令牌创建页面
    - 令牌验证，格式检查（ghp_*、github_pat_*）
    - 每个配置文件的策略选择
  - **API 密钥设置**，每个提供商的浏览器集成
  - **连接测试**以验证令牌和 API 密钥
  - **配置显示**，当前状态和来源
  - **CLI 命令**：
    - `skill-seekers config` - 主菜单
    - `skill-seekers config --github` - 直接到 GitHub 设置
    - `skill-seekers config --api-keys` - 直接到 API 密钥
    - `skill-seekers config --show` - 显示当前配置
    - `skill-seekers config --test` - 测试连接

- **🚦 智能速率限制处理程序** - 智能 GitHub API 速率限制管理
  - **预先警告**令牌状态（60/小时 vs 5000/小时）
  - **实时检测** GitHub API 响应的速率限制
    - 解析 X-RateLimit-* 标头
    - 检测 403 速率限制错误
    - 从时间戳计算重置时间
  - **实时倒计时器**，进度显示
  - **自动配置文件切换** - 速率受限时尝试下一个可用配置文件
  - **四种速率限制策略**：
    - `prompt` - 询问用户该怎么做（默认，交互式）
    - `wait` - 使用倒计时器自动等待
    - `switch` - 自动尝试另一个配置文件
    - `fail` - 立即失败，并显示清晰的错误
  - **非交互模式**用于 CI/CD（快速失败，无提示）
  - **可配置超时**每个配置文件（防止无限期等待）
  - **RateLimitHandler 类**，采用策略模式
  - **集成点**：GitHub 获取器、GitHub 抓取器

- **📦 恢复命令** - 恢复中断的抓取作业
  - **列出可恢复作业**，进度详细信息：
    - 作业 ID、开始时间、命令
    - 当前阶段和文件计数
    - 上次更新时间戳
  - **从检查点恢复**（框架已实现，准备集成）
  - **自动清理**旧作业（尊重配置设置）
  - **CLI 命令**：
    - `skill-seekers resume --list` - 列出所有可恢复作业
    - `skill-seekers resume <job-id>` - 恢复特定作业
    - `skill-seekers resume --clean` - 清理旧作业
  - **进度存储**在 `~/.local/share/skill-seekers/progress/<job-id>.json`

- **⚙️ CLI 增强** - 新标志和改进的用户体验
  - **--non-interactive 标志**用于 CI/CD 模式
    - 可用于：`skill-seekers github`
    - 在速率限制时快速失败，而不是提示
    - 非常适合自动化管道
  - **--profile 标志**选择特定的 GitHub 配置文件
    - 可用于：`skill-seekers github`
    - 使用 `~/.config/skill-seekers/config.json` 中配置的配置文件
    - 覆盖环境变量和默认值
  - **入口点**用于新命令：
    - `skill-seekers-config` - 直接配置命令访问
    - `skill-seekers-resume` - 直接恢复命令访问

- **🧪 全面的测试套件** - 新功能的完整测试覆盖
  - **16 个新测试**在 `test_rate_limit_handler.py` 中
  - **测试覆盖**：
    - 标头创建（有/无令牌）
    - 处理程序初始化（令牌、策略、配置）
    - 速率限制检测和提取
    - 预先检查（交互式和非交互式）
    - 响应检查（200、403、速率限制）
    - 策略处理（fail、wait、switch、prompt）
    - 配置管理器集成
    - 配置文件管理（添加、检索、切换）
  - **所有测试通过** ✅（16/16）
  - **测试实用程序**：模拟响应、配置隔离、临时目录

- **🎯 Bootstrap 技能功能** - 自托管能力（PR #249）
  - **自 Bootstrap**：将 skill-seekers 生成为 Claude Code 技能
    - `./scripts/bootstrap_skill.sh` - 一键 bootstrap
    - 将手动标头与自动生成的代码库分析相结合
    - 输出：`output/skill-seekers/` 准备用于 Claude Code
    - 安装：`cp -r output/skill-seekers ~/.claude/skills/`
  - **强大的 Frontmatter 检测**：
    - 动态 YAML frontmatter 边界检测（非硬编码行数）
    - 如果未找到 frontmatter，则回退到第 6 行
    - 未来对 frontmatter 字段添加的证明
  - **SKILL.md 验证**：
    - 文件存在和非空检查
    - Frontmatter 分隔符存在
    - 必填字段验证（name、description）
    - 验证失败时退出，并显示清晰的错误消息
  - **全面的错误处理**：
    - UV 依赖项检查，安装说明
    - 输出目录的权限检查
    - 缺少标头文件时的优雅降级

- **🔧 MCP 现在可选** - 用户选择安装配置文件
  - **仅 CLI**：`pip install skill-seekers` - 无 MCP 依赖项
  - **MCP 集成**：`pip install skill-seekers[mcp]` - 完整的 MCP 支持
  - **所有功能**：`pip install skill-seekers[all]` - 启用所有内容
  - **延迟加载**：未安装 MCP 时，优雅失败，并显示有用的错误消息
  - **交互式设置向导**：
    - 首次运行时显示所有安装选项
    - 存储在 `~/.config/skill-seekers/.setup_shown`
    - 可通过 `skill-seekers-setup` 命令访问
  - **入口点**：`skill-seekers-setup` 用于手动访问

- **🧪 Bootstrap 的 E2E 测试** - 全面的端到端测试
  - **6 个核心测试**验证 bootstrap 工作流：
    - 输出结构创建
    - 标头前置
    - YAML frontmatter 验证
    - 行数健全性检查
    - 虚拟环境可安装性
    - 平台适配器兼容性
  - **Pytest 标记**：@pytest.mark.e2e、@pytest.mark.venv、@pytest.mark.slow
  - **执行模式**：
    - 快速测试：`pytest -k "not venv"`（约 2-3 分钟）
    - 完整套件：`pytest -m "e2e"`（约 5-10 分钟）
  - **测试实用程序**：项目根、bootstrap 运行器、输出目录的 fixture

- **📚 全面的文档改革** - 完整的 v2.7.0 文档更新
  - **7 个新文档文件**（总计约 3,750 行）：
    - `docs/reference/API_REFERENCE.md`（750 行）- 用于 Python 开发人员的程序化使用指南
    - `docs/features/BOOTSTRAP_SKILL.md`（450 行）- 自托管能力文档
    - `docs/reference/CODE_QUALITY.md`（550 行）- 代码质量标准和 ruff linting 指南
    - `docs/guides/TESTING_GUIDE.md`（750 行）- 完整的测试参考（1200+ 测试套件）
    - `docs/QUICK_REFERENCE.md`（300 行）- 快速命令查找的单页备忘单
    - `docs/guides/MIGRATION_GUIDE.md`（400 行）- 版本升级指南（v1.0.0 → v2.7.0）
    - `docs/FAQ.md`（550 行）- 常见用户问题的综合问答
  - **10 个现有文件已更新**：
    - `README.md` - 更新测试计数徽章（700+ → 1200+ 测试）、v2.7.0 标注
    - `ROADMAP.md` - 添加 v2.7.0 完成部分，任务状态
    - `CONTRIBUTING.md` - 添加到 CODE_QUALITY.md 参考的链接
    - `docs/README.md` - 按用例快速链接、最近更新部分
    - `docs/guides/MCP_SETUP.md` - 修复 server_fastmcp 引用（PR #252）
    - `docs/QUICK_REFERENCE.md` - 更新 MCP 服务器引用（server.py → server_fastmcp.py）
    - `CLAUDE_INTEGRATION.md` - 更新版本引用
    - 3 个其他文档文件，v2.7.0 更新
  - **版本一致性**：所有版本引用标准化为 v2.7.0
  - **测试计数**：标准化为 1200+ 测试（在某些文档中不一致为 700+）
  - **MCP 工具计数**：更新为 18 个工具（从 17 个）

- **📦 配置管理的 Git 子模块** - 改进的配置组织和 API 部署
  - **Configs 作为 git 子模块**位于 `api/configs_repo/`，用于更清洁的仓库
  - **生产配置**：添加官方生产就绪配置预设
  - **删除重复项**：从主仓库清理所有重复配置
  - **测试过滤**：从 API 端点过滤掉 test-example 配置
  - **CI/CD 集成**：GitHub Actions 现在自动初始化子模块
  - **API 部署**：更新 render.yaml 以使用 git 子模块用于 configs_repo
  - **优势**：更清洁的主仓库、更好的配置版本控制、生产/测试分离

- **🔍 配置发现增强** - 改进的配置列表
  - **--all 标志**用于估算命令：`skill-seekers estimate --all`
  - 列出所有可用的预设配置及其描述
  - 帮助用户在抓取之前发现支持的框架
  - 显示配置名称、框架和文档 URL

### 更改

- **GitHub Fetcher** - 集成速率限制处理程序
  - 修改 `github_fetcher.py` 以使用 `RateLimitHandler`
  - 在开始之前添加预先速率限制检查
  - 检查所有 API 调用的响应是否有速率限制
  - 从配置自动检测配置文件
  - 当速率限制无法处理时引发 `RateLimitError`
  - 构造函数现在接受 `interactive` 和 `profile_name` 参数

- **GitHub Scraper** - 添加速率限制支持
  - 新的 `--non-interactive` 标志用于 CI/CD 模式
  - 新的 `--profile` 标志选择 GitHub 配置文件
  - 配置现在支持 `interactive` 和 `github_profile` 键
  - CLI 参数传递用于非交互式和配置文件选项

- **主 CLI** - 使用新命令增强
  - 添加 `config` 子命令，选项（--github、--api-keys、--show、--test）
  - 添加 `resume` 子命令，选项（--list、--clean）
  - 更新 GitHub 子命令，--non-interactive 和 --profile 标志
  - 更新命令文档字符串
  - 版本提升到 2.7.0

- **pyproject.toml** - 新入口点和依赖项重组
  - 添加 `skill-seekers-config` 入口点
  - 添加 `skill-seekers-resume` 入口点
  - 添加 `skill-seekers-setup` 入口点用于设置向导
  - **MCP 移至可选依赖项** - 现在需要 `pip install skill-seekers[mcp]`
  - 更新 pytest 标记：e2e、venv、bootstrap、slow
  - 版本更新为 2.7.0

- **install_skill.py** - 延迟 MCP 加载
  - Try/except ImportError 用于 MCP 导入
  - 未安装 MCP 时优雅失败，并显示有用的错误消息
  - 建议替代方案：scrape + package 工作流
  - 维护现有 MCP 用户的向后兼容性

### 修复

- **代码质量改进** - 修复代码库中所有 21 个 ruff linting 错误
  - SIM102：使用 `and` 运算符组合嵌套 if 语句（7 个修复）
  - SIM117：将多个 `with` 语句组合为单个多上下文 `with`（9 个修复）
  - B904：为正确的错误上下文添加 `from e` 到异常链（1 个修复）
  - SIM113：删除未使用的枚举计数器变量（1 个修复）
  - B007：将未使用的循环变量更改为 `_`（1 个修复）
  - ARG002：删除测试 fixture 中未使用的方法参数（1 个修复）
  - 受影响的文件：config_extractor.py、config_validator.py、doc_scraper.py、pattern_recognizer.py（3）、test_example_extractor.py（3）、unified_skill_builder.py、pdf_scraper.py 和 6 个测试文件
  - 结果：零 linting 错误、更清洁的代码、更好的可维护性

- **版本同步** - 修复整个包的版本不匹配（Issue #248）
  - 所有 `__init__.py` 文件现在正确显示版本 2.7.0（在 4 个文件中为 2.5.2）
  - 更新的文件：`src/skill_seekers/__init__.py`、`src/skill_seekers/cli/__init__.py`、`src/skill_seekers/mcp/__init__.py`、`src/skill_seekers/mcp/tools/__init__.py`
  - 确保 `skill-seekers --version` 显示准确的版本号
  - **关键**：防止 PyPI 显示错误版本的错误（Issue #248）

- **安装工作流中的不区分大小写正则表达式** - 修复安装工作流失败（Issue #236）
  - 使用 `(?i)` 标志使正则表达式模式不区分大小写
  - 模式现在匹配"Saved to:"和"saved to:"（以及任何大小写变化）
  - 文件：`src/skill_seekers/mcp/tools/packaging_tools.py`（第 529、668 行）
  - 影响：install_skill 工作流现在无论输出格式如何都能可靠工作

- **测试 Fixture 错误** - 修复 bootstrap skill 测试中的 pytest fixture 错误
  - 删除导致 fixture 查找错误的未使用的 `tmp_path` 参数
  - 文件：`tests/test_bootstrap_skill.py:54`
  - 结果：所有 CI 测试运行现在都通过，没有 fixture 错误

- **MCP 设置现代化** - 更新 MCP 服务器配置（PR #252，@MiaoDX）
  - 修复 docs/guides/MCP_SETUP.md 中 `server_fastmcp_fastmcp` → `server_fastmcp` 拼写错误的 41 个实例
  - 更新所有 12 个文件以使用 `skill_seekers.mcp.server_fastmcp` 模块
  - 使用自动 venv 检测（.venv、venv、$VIRTUAL_ENV）增强 setup_mcp.sh
  - 更新测试以接受 `-e ".[mcp]"` 格式和模块引用
  - 文件：.claude/mcp_config.example.json、CLAUDE.md、README.md、docs/guides/*.md、setup_mcp.sh、tests/test_setup_scripts.py
  - 优势：消除"找不到模块"错误、干净的依赖项隔离、为 v3.0.0 做准备

- **速率限制无限期等待** - 不再无限等待
  - 每个配置文件可配置超时（默认：30 分钟）
  - 超时时清晰的错误消息
  - 优雅退出，并提供有用的后续步骤
  - 中断作业的恢复能力

- **令牌设置混乱** - 清晰、引导式设置过程
  - 具有浏览器集成的交互式向导
  - 令牌验证，有用的错误消息
  - 所需范围的清晰文档
  - 测试连接功能以验证令牌工作

- **CI/CD 失败** - 非交互模式支持
  - `--non-interactive` 标志快速失败，而不是挂起
  - 非交互模式下没有用户提示
  - 自动化日志的清晰错误消息
  - 管道集成的退出代码

- **codebase_scraper.py 中的 AttributeError** - 修复不正确的标志检查（PR #249）
  - 将 `if args.build_api_reference:` 更改为 `if not args.skip_api_reference:`
  - 与 v2.5.2 选择退出标志策略一致（--skip-* 而不是 --build-*）
  - 在 codebase_scraper.py 的第 1193 行修复

### 技术细节

- **架构**：速率限制处理的策略模式、配置管理器的单例模式
- **修改的文件**：6（github_fetcher.py、github_scraper.py、main.py、pyproject.toml、install_skill.py、codebase_scraper.py）
- **新文件**：6（config_manager.py 约 490 行、config_command.py 约 400 行、rate_limit_handler.py 约 450 行、resume_command.py 约 150 行、setup_wizard.py 约 95 行、test_bootstrap_skill_e2e.py 约 169 行）
- **Bootstrap 脚本**：2（增强的 bootstrap_skill.sh、skill_header.md）
- **测试**：添加 22 个测试，全部通过（16 个速率限制 + 6 个 E2E bootstrap）
- **依赖项**：MCP 移至可选，无新的必需依赖项
- **向后兼容性**：完全向后兼容，通过 pip extras 实现 MCP 可选性
- **致谢**：Bootstrap 功能由 @MiaoDX 贡献（PR #249）

### 迁移指南

**现有用户** - 无需迁移！一切都像以前一样工作。

**MCP 用户** - 如果您使用 MCP 集成功能：
```bash
# 使用 MCP 支持重新安装
pip install -U skill-seekers[mcp]

# 或安装所有内容
pip install -U skill-seekers[all]
```

**新的安装配置文件**：
```bash
# 仅 CLI（无 MCP）
pip install skill-seekers

# 使用 MCP 集成
pip install skill-seekers[mcp]

# 使用多 LLM 支持（Gemini、OpenAI）
pip install skill-seekers[all-llms]

# 所有内容
pip install skill-seekers[all]

# 查看所有选项
skill-seekers-setup
```

**使用新功能**：
```bash
# 设置 GitHub 令牌（一次性）
skill-seekers config --github

# 添加多个配置文件
skill-seekers config
# → 选择"1. GitHub Token Setup"
# → 选择"1. Add New Profile"

# 使用特定配置文件
skill-seekers github --repo owner/repo --profile work

# CI/CD 模式
skill-seekers github --repo owner/repo --non-interactive

# 查看配置
skill-seekers config --show

# Bootstrap skill-seekers 作为 Claude Code 技能
./scripts/bootstrap_skill.sh
cp -r output/skill-seekers ~/.claude/skills/
```

### 破坏性更改

无 - 此版本完全向后兼容。

---

## [2.6.0] - 2026-01-13

### 🚀 代码库分析增强和文档重组

这个**次要功能版本**通过代码库抓取器的独立 SKILL.md 生成完成了 C3.x 代码库分析套件，添加了全面的文档重组，并包括设置和测试的生活质量改进。

### 新增
- **C3.8 独立代码库抓取器 SKILL.md 生成** - 独立代码库分析的完整技能结构
- **使用 FastMCP 的全局设置脚本** - setup.sh 用于最终用户全局安装
- **全面的文档重组** - 文档结构的完全改革
- **测试配置** - AstroValley 统一配置用于测试
- **增强的 LOCAL 增强模式** - 高级增强执行选项
- **C3.1 设计模式检测** - 检测代码中 10 个常见设计模式
- **C3.2 测试示例提取** - 从测试文件中提取实际使用示例
- **C3.3 全面 AI 增强的操作指南生成** - 将测试工作流转换为分步教育指南
- **C3.4 使用 AI 增强的配置模式提取** - 分析和记录配置文件
- **C3.5 架构概述和技能集成器** - 所有 C3.x 代码库分析的全面集成
- **C3.6 AI 增强** - 用于模式和测试示例的 AI 驱动洞察
- **C3.7 架构模式检测** - 检测高级架构模式

### 更改
- **破坏性：分析功能现在默认开启** - 改进代码库分析的用户体验

### 修复
- **代码库抓取器语言统计** - 修复 `_get_language_stats()` 中的字典格式处理

---

## [2.5.2] - 2025-12-31

### 🔧 包配置改进

这个**补丁版本**通过从手动包列表切换到自动包发现来改进打包配置。

### 更改
- **包发现**：从 pyproject.toml 中的手动包列表切换到自动发现

---

## [2.5.1] - 2025-12-30

### 🐛 关键错误修复 - PyPI 包损坏

这个**补丁版本**修复了一个关键的打包错误，该错误使 v2.5.0 对 PyPI 用户完全无法使用。

### 修复
- **关键**：将缺少的 `skill_seekers.cli.adaptors` 模块添加到 pyproject.toml 中的包列表

---

## [2.5.0] - 2025-12-28

### 🚀 多平台功能平价 - 支持 4 个 LLM 平台

这个**主要功能版本**为 Claude AI、Google Gemini、OpenAI ChatGPT 和通用 Markdown 导出添加了完整的多平台支持。

### 🎯 主要功能

#### 多 LLM 平台支持
- **支持 4 个平台**：Claude AI、Google Gemini、OpenAI ChatGPT、通用 Markdown
- **完整的功能平价**：所有技能模式适用于所有平台
- **平台适配器**：具有平台特定实现的干净架构
- **统一工作流**：相同的抓取输出适用于所有平台

### 新增
- **平台适配器** - 基类和 4 个实现（Claude、Gemini、OpenAI、Markdown）
- **CLI 工具** - 多平台打包、上传和增强
- **MCP 工具** - `enhance_skill`（新）、更新的 `package_skill` 和 `upload_skill`
- **文档** - FEATURE_MATRIX.md、更新的 UPLOAD_GUIDE.md
- **可选依赖项** - `[gemini]`、`[openai]`、`[all-llms]` extras
- **测试** - 700 个总测试通过（从 427 个增加）

---

## [2.4.0] - 2025-12-25

### 🚀 MCP 2025 升级 - 多代理支持和 HTTP 传输

这个**主要版本**将 MCP 基础设施升级到 2025 规范，支持 5 个 AI 编码代理。

### 🎯 主要功能

#### MCP SDK v1.25.0 升级
- **从 v1.18.0 升级到 v1.25.0** - 最新的 MCP 协议规范
- **FastMCP 框架** - 基于装饰器的工具注册，减少 68% 代码
- **增强的可靠性** - 更好的错误处理、自动模式生成

#### 双传输支持
- **stdio 传输**（默认）- 用于 Claude Code、VS Code + Cline 的标准输入/输出
- **HTTP 传输**（新）- 用于 Cursor、Windsurf、IntelliJ IDEA 的服务器发送事件
- **健康检查端点** - `GET /health` 用于监控
- **SSE 端点** - `GET /sse` 用于实时通信

#### 多代理自动配置
- **支持 5 个 AI 代理**：Claude Code、Cursor、Windsurf、VS Code + Cline、IntelliJ IDEA
- **自动检测** - `agent_detector.py` 扫描已安装的代理
- **一键设置** - `./setup_mcp.sh` 配置所有检测到的代理

#### 扩展的工具套件（17 个工具）
- **配置工具（3）**：generate_config、list_configs、validate_config
- **抓取工具（4）**：estimate_pages、scrape_docs、scrape_github、scrape_pdf
- **打包工具（3）**：package_skill、upload_skill、install_skill
- **拆分工具（2）**：split_config、generate_router
- **源工具（5）**：fetch_config、submit_config、add_config_source、list_config_sources、remove_config_source

---

## [2.3.0] - 2025-12-22

### 🤖 多代理安装支持

此版本通过单个命令将自动技能安装添加到 10+ AI 编码代理。

### 新增
- **多代理安装支持** - 新的 `install-agent` 命令
- 支持 10+ 代理：Claude Code、Cursor、VS Code、Amp、Goose、OpenCode、Letta、Aide、Windsurf
- `--agent all` 标志一次安装到所有代理
- 智能路径解析和模糊匹配

---

## [2.2.0] - 2025-12-21

### 🚀 私有配置仓库 - 团队协作解锁

这个主要版本添加了**基于 git 的配置源**，使团队能够从私有/团队仓库获取配置。

### 🎯 主要功能

#### 基于 Git 的配置源
- **多源配置管理** - 从 API、git URL 或命名源获取
- **私有仓库支持** - GitHub、GitLab、Bitbucket、Gitea
- **团队协作** - 通过版本控制跨团队共享配置
- **安全身份验证** - 仅环境变量令牌
- **智能缓存** - 浅克隆、自动拉取更新
- **离线模式** - 离线时使用缓存的仓库

#### 新的 MCP 工具
- **`add_config_source`** - 将 git 仓库注册为配置源
- **`list_config_sources`** - 查看所有已注册的源
- **`remove_config_source`** - 注销源
- **增强的 `fetch_config`** - 三种模式（命名源、git URL、API）

---

## [2.1.1] - 2025-11-30

### 修复
- **submit_config MCP 工具** - 全面验证和格式支持
- 验证名称格式、URL 格式、选择器、模式
- 支持旧版和统一配置格式
- 增强的多源配置类别检测

---

## [2.1.0] - 2025-11-29

### 🚀 GitHub 仓库分析增强

此版本通过无限本地分析显著改进了 GitHub 仓库抓取。

### 新增
- 用于本地仓库分析的**可配置目录排除**
- 通过 `local_repo_path` 配置的**无限本地仓库分析**
- 虚拟环境、构建工件和缓存目录的**自动排除**
- **跳过 llms.txt 选项** - 强制 HTML 抓取

### 修复
- 修复日志记录器初始化错误
- 修复发布标签解析中的 3 个 NoneType 可下标错误
- 修复相对导入路径
- 修复硬编码的 50 个文件分析限制
- 修复 AST 解析器"不可迭代"错误

### 改进
- 将代码分析覆盖率从 14% 提高到 93.6%
- 将文件发现从 140 个提高到 345 个
- 将类提取从 55 个提高到 585 个
- 将函数提取从 512 个提高到 2,784 个

---

## [2.1.0] - 2025-11-12

### 🎉 重大增强：质量保证 + 竞态条件修复

此版本侧重于质量和可靠性改进。

### 🚀 主要功能

#### 全面的质量检查器
- **打包前自动质量检查** - 验证技能质量
- **质量评分系统** - 0-100 分，A-F 等级
- **增强验证** - 检查模板文本、代码示例
- **结构验证** - 验证 SKILL.md、references/ 目录
- **链接验证** - 验证内部 markdown 链接

#### 无头增强模式（默认）
- **无终端窗口** - 默认在后台运行增强
- **正确等待** - 主控制台等待增强完成
- **超时保护** - 默认 10 分钟超时
- **验证** - 检查 SKILL.md 是否实际更新

---

## [2.0.0] - 2025-11-11

### 🎉 主要版本：PyPI 发布 + 现代 Python 打包

**Skill Seekers 现已在 PyPI 上可用！** 使用以下方式安装：`pip install skill-seekers`

### 🚀 主要更改

#### PyPI 发布
- **发布到 PyPI** - https://pypi.org/project/skill-seekers/
- **安装：** `pip install skill-seekers` 或 `uv tool install skill-seekers`
- **无需克隆** - 在全局或虚拟环境中安装

#### 现代 Python 打包
- **基于 pyproject.toml 的配置** - 标准 PEP 621 元数据
- **src/ 布局结构** - 最佳实践包组织
- **入口点脚本** - `skill-seekers` 命令全局可用
- **正确的依赖项组** - 单独的 dev、test 和 MCP 依赖项

#### 统一的 CLI 接口
- **单个 `skill-seekers` 命令** - Git 风格的子命令
- **子命令：** `scrape`、`github`、`pdf`、`unified`、`enhance`、`package`、`upload`、`estimate`
- **一致的接口** - 所有工具都可通过一个入口点访问

---

## [1.3.0] - 2025-10-26

### 新增 - 重构和性能改进
- **并行抓取的 Async/Await 支持**（2-3 倍性能提升）
- **Python 包结构**（阶段 0 完成）
- **集中式配置模块**
- 多变体 llms.txt 检测：下载所有 3 个变体
- 自动 .txt → .md 文件扩展名转换

### 更改
- 测试计数从 207 个增加到 299 个（92 个新测试）
- 所有 print() 语句替换为日志记录
- 代码质量从 5.5/10 提高到 6.5/10

---

## [1.2.0] - 2025-10-23

### 🚀 PDF 高级功能版本

对 PDF 提取功能的重大增强。

### 新增

#### 优先级 2：支持更多 PDF 类型
- **扫描 PDF 的 OCR 支持** - 使用 Tesseract OCR 自动文本提取
- **密码保护的 PDF 支持** - 处理加密的 PDF
- **复杂表格提取** - 使用 PyMuPDF 的检测提取表格

#### 优先级 3：性能优化
- **并行页面处理** - 使用 ThreadPoolExecutor 3 倍更快的 PDF 提取
- **智能缓存** - 昂贵操作的内存缓存

---

## [1.1.0] - 2025-10-22

### 🌐 文档抓取增强

对文档抓取的重大改进。

### 新增

#### 无限抓取和性能
- **无限页面抓取** - 删除 500 页限制
- **并行抓取模式** - 同时处理多个页面
- **动态速率限制** - 智能速率限制控制

#### 新配置
- **Ansible Core 2.19** - 完整的 Ansible 文档配置
- **Claude Code** - 此工具本身的文档！
- **Laravel 9.x** - PHP 框架文档

---

## [1.0.0] - 2025-10-19

### 🎉 首个生产版本

这是具有完整功能集的第一个生产就绪版本。

### 新增

#### 智能自动上传功能
- 新的 `upload_skill.py` CLI 工具
- 增强的 `package_skill.py`，带有 `--upload` 标志
- 智能 API 密钥检测，优雅回退

#### MCP 集成增强
- **9 个 MCP 工具**（添加 `upload_skill` 工具）
- 更新所有 MCP 文档

---

## [0.4.0] - 2025-10-18

### 新增

#### 大型文档支持（40K+ 页）
- 配置拆分功能
- 路由器/集线器技能生成
- 检查点/恢复功能
- 并行抓取支持

---

## [0.3.0] - 2025-10-15

### 新增

#### MCP 服务器集成
- 完整的 MCP 服务器实现
- 用于 Claude Code 集成的 6 个 MCP 工具
- 自动化设置脚本
- 全面的文档

---

## [0.2.0] - 2025-10-10

### 新增

#### 测试和质量
- 全面的测试套件，71 个测试
- 100% 测试通过率
- 页面计数估算器

#### 新配置
- Kubernetes 文档配置
- Tailwind CSS 配置
- Astro 框架配置

---

## [0.1.0] - 2025-10-05

### 新增

#### 初始版本
- 基本文档抓取器功能
- 手动技能创建
- 框架配置（Godot、React、Vue、Django、FastAPI）
- 智能分类系统
- 代码语言检测
- 模式提取

---

## 发布链接

- [v2.6.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.6.0) - 代码库分析
- [v2.5.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.5.0) - 多平台支持
- [v2.4.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.4.0) - MCP 2025 升级
- [v2.3.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.3.0) - 多代理支持
- [v2.2.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.2.0) - Git 配置源
- [v2.0.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v2.0.0) - PyPI 发布
- [v1.0.0](https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v1.0.0) - 生产版本

---

## 版本历史摘要

| 版本 | 日期 | 亮点 |
|---------|------|------------|
| **2.6.0** | 2026-01-13 | 🧬 完整的 C3.x 代码库分析套件 |
| **2.5.0** | 2025-12-28 | 🌐 多平台支持（4 个 LLM） |
| **2.4.0** | 2025-12-25 | 🔌 MCP 2025 升级、多代理支持 |
| **2.3.0** | 2025-12-22 | 🤖 多代理安装 |
| **2.2.0** | 2025-12-21 | 🔐 私有 git 配置仓库 |
| **2.0.0** | 2025-11-11 | 📦 PyPI 发布 |
| **1.0.0** | 2025-10-19 | 🚀 生产版本 |

---

[未发布]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.5.2...v2.6.0
[2.5.2]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.5.1...v2.5.2
[2.5.1]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v2.1.1...v2.2.0
[2.0.0]: https://github.com/yusufkaraaslan/Skill_Seekers/compare/v1.3.0...v2.0.0
[1.0.0]: https://github.com/yusufkaraaslan/Skill_Seekers/releases/tag/v1.0.0
