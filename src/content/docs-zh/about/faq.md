---
title: 常见问题
description: 关于 Skill Seekers 的常见问题 - 安装、使用、平台、定价和故障排除
section: about
order: 4
---

# 常见问题

## 一般问题

### 什么是 Skill Seekers？

Skill Seekers 是一个开源工具，可自动将文档网站、GitHub 仓库和 PDF 转换为针对 Claude、Gemini 和 OpenAI ChatGPT 优化的 AI 技能。

### 它是免费的吗？

是的！Skill Seekers 是 **100% 免费和开源**（MIT 许可证）。您只需支付：
- **Claude API**（如果使用 API 增强模式）- 每个技能约 $0.15-$0.30
- **您的 Claude Max 订阅**（如果使用本地增强 - 推荐！）
- **API 密钥**用于上传（如果使用自动上传）

**大多数功能完全免费**，包括使用 Claude Code 的本地 AI 增强。

### 支持哪些平台？

- **Claude AI** - 原生格式（带 YAML 前置元数据的 ZIP）
- **Google Gemini** - tar.gz，支持 1M 令牌上下文
- **OpenAI ChatGPT** - ZIP，带向量存储
- **通用 Markdown** - 适用于任何 LLM 的通用格式

所有功能在所有平台上都能使用，具有完整的功能对等性。

---

## 安装和设置

### 有什么要求？

- **Python 3.10+**（必需）
- **pip** 或 **uv** 包管理器
- **Git**（用于 GitHub 抓取）
- **Tesseract OCR**（可选，用于扫描的 PDF）

### 如何安装？

```bash
pip install skill-seekers
```

就是这样！详细说明请参阅[安装指南](/docs/getting-started/installation)。

### 我需要安装 Claude Code 吗？

不需要，但**强烈推荐**！使用 Claude Code，您可以使用免费的本地 AI 增强（使用您的 Claude Max 订阅，无 API 成本）。

没有 Claude Code，您仍然可以：
- 抓取文档（完美运行）
- 打包技能（完美运行）
- 手动上传（完美运行）
- 使用 API 增强（每个技能成本约 $0.30）

---

## 使用问题

### 创建技能需要多长时间？

**典型时间线：**
- 小型文档（50 页）：**2-3 分钟**
- 中型文档（200 页）：**5-10 分钟**
- 大型文档（1000+ 页）：**15-30 分钟**
- GitHub 仓库分析：**3-10 分钟**
- PDF 提取：**1-5 分钟**
- AI 增强：**30-60 秒**（本地）或 **10-30 秒**（API）

**React 文档总计：**从开始到结束约 12 分钟！

### 我可以在没有互联网的情况下使用吗？

部分可以：
- ✅ **可以离线工作：** PDF 提取、本地文件分析、使用本地模型增强
- ❌ **需要互联网：** 文档抓取、GitHub API 调用、API 增强、上传

### 抓取的准确性如何？

通过适当的配置**非常准确**：
- **智能选择器** - 自动检测内容与导航
- **类别检测** - 对结构良好的文档准确率 95%+
- **代码保留** - 代码块 100% 准确
- **链接解析** - 正确处理内部引用

**获得最佳结果的提示：**
- 使用交互模式测试选择器
- 首先检查现有配置（有 24 个预设）
- 在完整抓取前使用 `skill-seekers estimate` 验证

---

## 功能问题

### 本地增强和 API 增强有什么区别？

| 功能 | 本地（免费） | API |
|---------|-------------|-----|
| **成本** | 免费（使用 Claude Max） | 每个技能约 $0.15-$0.30 |
| **速度** | 30-60 秒 | 10-30 秒 |
| **质量** | 相同（Claude Sonnet 4.5） | 相同 |
| **要求** | 已安装 Claude Code | ANTHROPIC_API_KEY |
| **用例** | 单个技能、开发 | 批处理、CI/CD |

**建议：**开发使用本地模式，自动化使用 API。

### 我可以抓取私有文档吗？

可以！几个选项：
1. **VPN/网络访问** - 从内部网络抓取
2. **本地 HTML** - 在本地下载文档，然后抓取
3. **身份验证** - 配置自定义标头/cookie
4. **私有 GitHub** - 为私有仓库使用 GITHUB_TOKEN

详情请参阅 [GitHub 分析教程](/docs/tutorials/analyzing-github)。

### 如何处理大型文档（10K+ 页）？

使用**配置拆分**和**路由生成**：

```bash
# 自动拆分大型配置
skill-seekers split --config configs/large-docs.json

# 生成路由技能
skill-seekers router output/large-docs-*/
```

这将创建具有智能路由的专注子技能。详情请参阅[大型文档指南](/docs/manual/advanced/large-docs)。

### 我可以组合多个源吗？

可以！使用**统一抓取**：

```bash
skill-seekers unified --config configs/unified.json
```

将文档 + GitHub + PDF 组合成一个全面的技能。请参阅[多源教程](/docs/tutorials/multi-source-skills)。

---

## 平台特定问题

### 我需要为 Claude、Gemini 和 OpenAI 创建单独的技能吗？

不需要！创建一次，为任何平台打包：

```bash
# 创建技能（适用于所有平台）
skill-seekers scrape --config configs/react.json

# 为不同平台打包
skill-seekers package output/react/ --target claude
skill-seekers package output/react/ --target gemini
skill-seekers package output/react/ --target openai
```

### Claude AI 集成如何工作？

- **格式：** 带 YAML 前置元数据的 ZIP 文件
- **上传：** 通过 API 自动或通过 Claude.ai 手动
- **MCP：** 为 Claude Code Desktop 提供 18 个工具
- **质量：** 原生格式，最佳集成

### Gemini 集成如何工作？

- **格式：** 纯 markdown 的 tar.gz
- **上下文：** 支持 1M 令牌上下文窗口
- **上传：** 通过 Google Files API + Grounding 自动
- **增强：** 使用 Gemini 2.0 Flash

### OpenAI 集成如何工作？

- **格式：** 带助手说明的 ZIP
- **上传：** 通过 Assistants API + Vector Store 自动
- **搜索：** 启用文件搜索的语义搜索
- **增强：** 使用 GPT-4o

---

## 故障排除

### 为什么抓取很慢？

常见原因：
- **速率限制** - 在配置中增加 `rate_limit`（尝试 1.0 或 2.0）
- **同步模式** - 使用 `--async` 标志提速 2-3 倍
- **大页面** - 对于 1000+ 页的站点是正常的
- **网络问题** - 检查互联网连接

### 为什么有些页面缺失？

检查：
1. **max_pages 限制** - 删除或增加限制
2. **URL 模式** - 在配置中添加 `url_patterns`
3. **选择器** - 使用 `--interactive` 模式测试
4. **JavaScript 渲染** - 某些站点需要浏览器自动化

### 如何调试选择器问题？

```bash
# 交互模式显示提取的内容
skill-seekers scrape --config configs/test.json --interactive

# 在单个页面上测试
skill-seekers estimate --config configs/test.json
```

更多帮助请参阅[故障排除指南](/docs/manual/mcp/troubleshooting)。

### 为什么增强失败？

常见问题：
- **没有 ANTHROPIC_API_KEY** - 为 API 模式设置环境变量
- **未安装 Claude Code** - 为本地模式安装
- **超时** - 增加 `--timeout` 标志（默认：600 秒）
- **文件权限** - 检查输出目录的写权限

---

## MCP 问题

### 什么是 MCP？

MCP（模型上下文协议）是连接 AI 工具的标准。Skill Seekers 为 Claude Code Desktop 提供 18 个 MCP 工具，允许自然语言命令，如「创建 React 技能」。

### 如何设置 MCP？

```bash
# 自动设置（推荐）
cd /path/to/Skill_Seekers
./setup_mcp.sh

# 手动设置
# 编辑 ~/.claude/mcp_settings.json
```

详情请参阅 [MCP 设置指南](/docs/manual/mcp/setup)。

### 哪些 AI 代理支持 MCP？

- **Claude Code** - stdio 传输（原生）
- **Cursor** - HTTP 传输
- **Windsurf** - HTTP 传输
- **VS Code + Cline** - stdio 传输
- **IntelliJ IDEA** - HTTP 传输

设置脚本自动检测并配置所有已安装的代理。

---

## 高级问题

### 我可以自定义 AI 增强吗？

可以！增强使用可配置的提示。您可以：
- 在配置中修改增强说明
- 使用不同的 AI 模型（Claude、Gemini、GPT-4o）
- 完全跳过增强（`--skip-enhancement`）
- 稍后手动增强（`skill-seekers enhance output/skill/`）

### 我可以贡献配置吗？

当然！我们欢迎社区配置：

```bash
# 通过 MCP 提交
submit_config(config_json="...", description="...")

# 或创建 GitHub issue
# https://github.com/yusufkaraaslan/Skill_Seekers/issues
```

详情请参阅[贡献指南](/docs/community/contributing)。

### 有路线图吗？

有！请参阅[路线图](/docs/community/roadmap)了解计划的功能，参阅[更新日志](/docs/community/changelog)了解版本历史。

---

## 获取帮助

**找不到答案？**

- 📚 [文档](/docs/getting-started/overview) - 全面的指南
- 🐛 [GitHub Issues](https://github.com/yusufkaraaslan/Skill_Seekers/issues) - 报告错误
- 💬 [讨论](https://github.com/yusufkaraaslan/Skill_Seekers/discussions) - 提问
- 📧 [电子邮件](mailto:yusufkaraaslan.yk@pm.me) - 直接支持

**发现错误？**请报告时包含：
- 重现步骤
- 预期与实际行为
- 错误消息和堆栈跟踪
- 环境详细信息（OS、Python 版本、配置文件）
