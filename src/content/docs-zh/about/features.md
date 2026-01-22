---
title: 功能概览
description: Skill Seekers 功能完整概览 - 抓取、分析、增强、多平台支持和 MCP 集成
section: about
order: 2
---

# 功能概览

Skill Seekers v2.7.0 提供从任何知识源创建 AI 技能的全面功能。

## 🌐 输入源

### 文档抓取
- **HTML 网站** - 抓取任何文档站点（React、Vue、Django、Godot 等）
- **llms.txt 支持** - 当站点提供 AI 优化文档时速度快 10 倍
- **无限页面** - 无页面限制，处理 40K+ 页面的文档站点
- **智能选择器** - 自动内容检测或自定义 CSS 选择器
- **类别检测** - 自动将内容组织成逻辑部分

### GitHub 仓库分析
- **无限本地分析** - 无 API 速率限制分析整个代码库
- **代码结构** - 提取类、函数、依赖项
- **README 提取** - 从所有目录提取 README 文件
- **问题跟踪** - 可选包含 GitHub issues 和发布
- **更新日志解析** - 提取版本历史和发布说明

### PDF 提取
- **文本提取** - 从技术 PDF 中提取文本
- **OCR 支持** - 使用 Tesseract OCR 处理扫描文档
- **密码保护** - 支持加密 PDF
- **表格提取** - 提取表格并保留结构
- **并行处理** - 多核支持速度快 3 倍

### 多源技能（统一抓取）
- **组合源** - 在一个技能中组合文档 + GitHub + PDF
- **冲突检测** - 识别并解决重复内容
- **优先级解析** - 可配置的源优先级
- **全面知识** - 创建框架/工具的完整图景

## 🧬 C3.x 代码库分析套件

用于理解代码库的高级代码分析功能：

### C3.1 模式检测
- **10 种设计模式** - 检测单例、工厂、观察者、策略、装饰器、构建器、适配器、命令、模板方法、责任链
- **9 种语言** - Python（基于 AST）、JavaScript、TypeScript、C++、C、C#、Go、Rust、Java
- **87% 精度** - 在 100 个真实项目上测试

### C3.2 测试示例提取
- **真实使用示例** - 从测试文件中提取示例
- **5 个类别** - 实例化、方法调用、配置、设置、工作流
- **质量过滤** - 删除琐碎模式，保留有意义的示例
- **80%+ 高置信度** - 仅包含清晰、有用的示例

### C3.3 操作指南生成
- **AI 增强教程** - 将测试工作流转换为分步指南
- **5 项自动改进** - 步骤描述、故障排除、先决条件、后续步骤、用例
- **双模式 AI** - API 模式（快速）或本地模式（Claude Max 免费）
- **95%+ 满意度** - 增强指南获得用户高度评价

### C3.4 配置模式提取
- **9 种配置格式** - JSON、YAML、TOML、ENV、INI、Python、JavaScript、Dockerfile、Docker Compose
- **7 种常见模式** - 数据库、API、日志、缓存、电子邮件、身份验证、服务器配置
- **安全分析** - 识别硬编码密钥和暴露的凭据
- **AI 增强洞察** - 解释、最佳实践、迁移建议

### C3.5 架构概览
- **ARCHITECTURE.md 生成** - 包含 8 个部分的全面架构概览
- **集成分析** - 将所有 C3.x 输出组合成统一技能
- **默认开启** - 提供 local_repo_path 时自动运行

### C3.7 架构模式检测
- **8 种模式** - MVC、MVVM、MVP、Repository、Service Layer、Layered、Clean Architecture
- **框架检测** - Django、Flask、Spring、ASP.NET、Rails、Laravel、Angular、React、Vue.js
- **基于证据** - 具有详细证据的置信度评分

## 🤖 AI 增强

### 本地增强（免费）
- **使用 Claude Code** - 无 API 成本！使用您的 Claude Max 订阅
- **4 种执行模式** - Headless（默认）、Background、Daemon、Interactive
- **30-60 秒** - 使用 Claude Sonnet 4.5 快速增强
- **质量从 3/10 提升到 9/10** - 将基础文档转换为全面指南

### API 增强
- **特定平台模型** - Claude Sonnet 4、Gemini 2.0 Flash、GPT-4o
- **批处理** - 高效的大规模增强
- **成本效益** - 每个技能约 $0.15-$0.30
- **质量验证** - 打包前自动检查

## 🌍 多平台支持

### 支持的平台
- **Claude AI** - 带 YAML 前置元数据的原生 ZIP 格式
- **Google Gemini** - tar.gz，支持 1M 令牌上下文
- **OpenAI ChatGPT** - ZIP，带向量存储和文件搜索
- **通用 Markdown** - 适用于任何 LLM 的通用格式

### 完整功能对等
- 所有技能模式适用于所有平台
- 所有 CLI 命令支持 `--target` 参数
- 所有 MCP 工具支持平台选择
- 跨平台的一致工作流

## 🔌 MCP 集成

### 18 个 Claude Code MCP 工具
- **配置管理** - generate_config、list_configs、validate_config
- **抓取** - scrape_docs、scrape_github、scrape_pdf、estimate_pages
- **处理** - enhance_skill、package_skill、upload_skill
- **工作流** - install_skill（完全自动化）
- **拆分** - split_config、generate_router（用于大型文档）
- **源** - fetch_config、add_config_source、list_config_sources、remove_config_source

### 多代理支持
- **5 个 AI 代理** - Claude Code、Cursor、Windsurf、VS Code + Cline、IntelliJ IDEA
- **双传输** - stdio（默认）和 HTTP（用于基于 Web 的代理）
- **自动配置** - `./setup_mcp.sh` 配置所有检测到的代理

## 📦 智能功能

### 自动 llms.txt 检测
- **速度快 10 倍** - 在可用时下载 AI 优化文档
- **3 种变体** - llms-full.txt、llms.txt、llms-small.txt
- **完整内容** - 无截断，保留完整文档

### 基于 Git 的配置源
- **私有仓库** - 从私有/团队仓库获取配置
- **团队协作** - 在组织间共享配置
- **版本控制** - 跟踪配置更改
- **安全认证** - 仅使用环境变量令牌

### 大型文档支持
- **40K+ 页面** - 处理大型文档站点
- **配置拆分** - 将大型站点分解为专注的子技能
- **路由生成** - 在子技能之间创建智能路由
- **检查点/恢复** - 恢复中断的抓取会话

### 质量保证
- **自动检查** - 打包前的质量评分（0-100 分，A-F 等级）
- **结构验证** - 验证 SKILL.md、references/ 目录
- **链接验证** - 检查所有内部 markdown 链接
- **增强验证** - 确保 AI 增强成功完成

## 🚀 性能

- **并行抓取** - 异步模式速度快 2-3 倍
- **智能缓存** - 重新运行速度快 50%
- **PDF 并行处理** - 多核支持速度快 3 倍
- **浅层 git 克隆** - 基于 git 的配置速度快 10-50 倍

## 📊 统计数据

- **1200+ 测试** - 全面的测试覆盖率，100% 通过
- **24 个预设配置** - 流行框架的即用配置
- **4 个平台** - 完整的多 LLM 支持
- **18 个 MCP 工具** - 完整的 Claude Code 集成
- **v2.7.0** - 最新版本（2026 年 1 月）

## 下一步

- [用例](/docs/about/use-cases) - 何时使用 Skill Seekers
- [常见问题](/docs/about/faq) - 常见问题解答
- [安装](/docs/getting-started/installation) - 立即开始
