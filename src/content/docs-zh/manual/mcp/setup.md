---
title: MCP 设置
description: 使用 Claude Code 和其他 AI 编码代理设置 Skill Seekers MCP 服务器的完整指南 - 支持 5 个代理并自动配置
section: manual
subsection: mcp
order: 1
---

# MCP 设置指南

设置 Skill Seekers MCP 服务器，通过模型上下文协议（Model Context Protocol）在 Claude Code 和其他 AI 编码代理中使用所有功能。

---

## 概述

Skill Seekers MCP 服务器通过模型上下文协议提供 18 个工具，支持使用自然语言与所有 Skill Seekers 功能交互。

**支持的功能：**
- ✅ **26 个 MCP 工具** - 完整的 Skill Seekers 功能
- ✅ **5 个 AI 代理** - Claude Code、Cursor、Windsurf、VS Code + Cline、IntelliJ IDEA
- ✅ **双传输** - stdio（默认）和 HTTP 模式
- ✅ **自动配置** - 一行设置脚本
- ✅ **多代理支持** - 一次配置所有代理

---

## 快速开始

### 一键设置（推荐）

```bash
# 克隆仓库
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
cd Skill_Seekers

# 运行设置脚本
./setup_mcp.sh
```

脚本自动：
1. 检查 Python 版本（需要 3.10+）
2. 安装依赖项
3. 检测已安装的 AI 代理
4. 配置所有检测到的代理
5. 如需要则启动 HTTP 服务器
6. 验证一切正常

**时间：** 2-3 分钟

---

## 支持的代理

| 代理 | 传输 | 自动检测 | 配置路径 |
|-------|-----------|-------------|-------------|
| **Claude Code** | stdio | ✅ | `~/Library/Application Support/Claude/mcp.json` |
| **Cursor** | HTTP | ✅ | `~/Library/Application Support/Cursor/mcp_settings.json` |
| **Windsurf** | HTTP | ✅ | `~/Library/Application Support/Windsurf/mcp_config.json` |
| **VS Code + Cline** | stdio | ✅ | `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json` |
| **IntelliJ IDEA** | HTTP | ✅ | `~/Library/Application Support/JetBrains/IntelliJIdea2024.3/mcp.xml` |

**注意：** 显示的路径是 macOS 的路径。Linux 和 Windows 路径会自动检测。

---

## 手动安装

如果您更喜欢手动设置或脚本不起作用：

### 步骤 1：安装依赖项

```bash
# 创建虚拟环境（推荐）
python3 -m venv venv
source venv/bin/activate  # Windows：venv\Scripts\activate

# 安装带 MCP 支持的 Skill Seekers
pip install -e ".[mcp]"

# 或单独安装 MCP 依赖项
pip install mcp anthropic-mcp fastmcp
```

### 步骤 2：测试服务器

```bash
# 测试 stdio 模式（默认）
python -m skill_seekers.mcp.server_fastmcp

# 应显示：
# MCP Server running in stdio mode
# Connected to client...
# (Press Ctrl+C to exit)

# 测试 HTTP 模式
python -m skill_seekers.mcp.server_fastmcp --http --port 3000

# 应显示：
# MCP Server running in HTTP mode on http://localhost:3000
# Health check: http://localhost:3000/health
# SSE endpoint: http://localhost:3000/sse
```

### 步骤 3：配置您的代理

#### Claude Code（stdio）

编辑 `~/Library/Application Support/Claude/mcp.json`：
```json
{
  "mcpServers": {
    "skill-seeker": {
      "command": "python",
      "args": ["-m", "skill_seekers.mcp.server_fastmcp"]
    }
  }
}
```

#### Cursor（HTTP）

编辑 `~/Library/Application Support/Cursor/mcp_settings.json`：
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

**注意：** 对于基于 HTTP 的代理，首先启动服务器：
```bash
# 在后台启动
python -m skill_seekers.mcp.server_fastmcp --http --port 3000 &
```

---

## 传输模式

### Stdio 传输（默认）

**最适合：** Claude Code、VS Code + Cline

**优点：**
- 无需网络配置
- 更安全（仅本地）
- 启动更快（约 100ms）
- 每个代理都有独立的进程

**配置：**
```json
{
  "mcpServers": {
    "skill-seeker": {
      "command": "python",
      "args": ["-m", "skill_seekers.mcp.server_fastmcp"]
    }
  }
}
```

### HTTP 传输

**最适合：** Cursor、Windsurf、IntelliJ IDEA

**优点：**
- 多个同时连接
- 支持基于 Web 的客户端
- 健康监控端点
- 远程访问（谨慎使用）

**配置：**
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

**启动 HTTP 服务器：**
```bash
# 前台
python -m skill_seekers.mcp.server_fastmcp --http --port 3000

# 后台（macOS/Linux）
python -m skill_seekers.mcp.server_fastmcp --http --port 3000 &

# 使用自定义端口
python -m skill_seekers.mcp.server_fastmcp --http --port 8080

# 使用调试日志
python -m skill_seekers.mcp.server_fastmcp --http --log-level DEBUG
```

### HTTP 端点

在 HTTP 模式下运行时：

**健康检查：**
```bash
curl http://localhost:3000/health
```

**响应：**
```json
{
  "status": "healthy",
  "server": "skill-seeker-mcp",
  "version": "2.7.0",
  "transport": "http",
  "tools": 18
}
```

**SSE 端点：**
```
http://localhost:3000/sse
```

---

## 可用的 MCP 工具

### 配置工具（3 个）

**`generate_config`** - 为任何文档网站生成配置
```python
result = await mcp.call_tool("generate_config", {
    "name": "myframework",
    "url": "https://docs.myframework.com/",
    "description": "My Framework documentation"
})
```

**`list_configs`** - 列出所有可用的预设配置
```python
result = await mcp.call_tool("list_configs", {})
```

**`validate_config`** - 验证配置文件结构
```python
result = await mcp.call_tool("validate_config", {
    "config_path": "configs/myframework.json"
})
```

### 抓取工具（4 个）

**`estimate_pages`** - 抓取前估计页面数
```python
result = await mcp.call_tool("estimate_pages", {
    "config_path": "configs/react.json"
})
```

**`scrape_docs`** - 抓取文档并构建技能
```python
result = await mcp.call_tool("scrape_docs", {
    "config_path": "configs/react.json"
})
```

**`scrape_github`** - 抓取 GitHub 仓库
```python
result = await mcp.call_tool("scrape_github", {
    "repository": "facebook/react",
    "local_repo_path": "/path/to/react"
})
```

**`scrape_pdf`** - 从 PDF 文件提取内容
```python
result = await mcp.call_tool("scrape_pdf", {
    "pdf_path": "manual.pdf",
    "name": "mymanual"
})
```

### 打包工具（4 个）

**`package_skill`** - 为平台打包技能
```python
result = await mcp.call_tool("package_skill", {
    "skill_dir": "output/react/",
    "target": "claude"  # 或 "gemini"、"openai"、"markdown"
})
```

**`upload_skill`** - 上传到 LLM 平台
```python
result = await mcp.call_tool("upload_skill", {
    "skill_zip": "output/react.zip",
    "target": "claude"
})
```

**`enhance_skill`** - AI 增强 SKILL.md
```python
result = await mcp.call_tool("enhance_skill", {
    "skill_dir": "output/react/",
    "mode": "local"  # 或 "api"
})
```

**`install_skill`** - 完整安装工作流
```python
result = await mcp.call_tool("install_skill", {
    "config_path": "configs/react.json",
    "target": "claude",
    "enhance": true
})
```

### 源工具（5 个）

**`fetch_config`** - 从源获取配置
```python
result = await mcp.call_tool("fetch_config", {
    "name": "custom_framework",
    "source": "community"
})
```

**`submit_config`** - 提交新配置
```python
result = await mcp.call_tool("submit_config", {
    "config_path": "configs/myframework.json",
    "description": "My Framework documentation config"
})
```

**`add_config_source`** - 注册私有 git 仓库
```python
result = await mcp.call_tool("add_config_source", {
    "name": "company_configs",
    "url": "https://github.com/company/configs.git",
    "type": "git"
})
```

**`list_config_sources`** - 列出所有注册的源
```python
result = await mcp.call_tool("list_config_sources", {})
```

**`remove_config_source`** - 删除注册的源
```python
result = await mcp.call_tool("remove_config_source", {
    "name": "company_configs"
})
```

### 拆分工具（2 个）

**`split_config`** - 拆分大型文档配置
```python
result = await mcp.call_tool("split_config", {
    "config_path": "configs/large_docs.json",
    "split_by": "category"
})
```

**`generate_router`** - 生成路由器/中心技能
```python
result = await mcp.call_tool("generate_router", {
    "sub_skills": ["react_basics", "react_hooks", "react_routing"]
})
```

---

## 验证

### 在 Claude Code 中测试

1. 配置后重启 Claude Code
2. 输入提示词，例如：
   ```
   "为 Vue.js 文档生成技能"
   ```
3. Claude 应自动使用 MCP 工具

### 检查工具可用性

在 Claude Code 中，工具在相关时出现在工具使用面板中。您也可以询问：
```
"您可以访问哪些 Skill Seekers 工具？"
```

### 手动工具测试

```bash
# 使用 MCP 检查器测试（如已安装）
npx @modelcontextprotocol/inspector python -m skill_seekers.mcp.server_fastmcp

# 或直接测试
python -m skill_seekers.mcp.server_fastmcp
# （将等待 MCP 客户端连接）
```

---

## 多代理配置

### 一次配置所有代理

设置脚本检测所有已安装的代理：

```bash
./setup_mcp.sh
```

**示例输出：**
```
🔍 Detecting installed AI agents...

Found the following agents:
✓ Claude Code (stdio)
✓ Cursor (HTTP)
✓ VS Code + Cline (stdio)

Would you like to configure all agents? (Y/n): Y

✅ Configured Claude Code
✅ Configured Cursor
✅ Configured VS Code + Cline
🚀 Starting HTTP server for Cursor...

All agents configured successfully!
```

### 代理特定说明

**Claude Code：**
- 配置后重启 Claude Code
- 工具在相关时自动出现
- 无需 HTTP 服务器

**Cursor：**
- HTTP 服务器必须运行
- 使用以下命令启动：`python -m skill_seekers.mcp.server_fastmcp --http --port 3000`
- 配置后重启 Cursor

**Windsurf：**
- HTTP 服务器必须运行
- 与 Cursor 使用相同端口（代理可以共享服务器）
- 配置后重启 Windsurf

**VS Code + Cline：**
- 无需 HTTP 服务器（使用 stdio）
- 配置后重启 VS Code
- 工具在 Cline 扩展中可用

**IntelliJ IDEA：**
- HTTP 服务器必须运行
- XML 配置格式
- 配置后重启 IntelliJ

---

## 故障排除

### 工具未出现

**问题：** MCP 工具未在 Claude Code 中显示

**解决方案：**
```bash
# 1. 检查配置文件是否存在
cat ~/Library/Application\ Support/Claude/mcp.json

# 2. 完全重启 Claude Code

# 3. 手动测试服务器
python -m skill_seekers.mcp.server_fastmcp
# 应显示 "MCP Server running in stdio mode"

# 4. 检查 Python 路径
which python3
# 确保它与配置中的路径匹配
```

### HTTP 服务器未启动

**问题：** HTTP 服务器无法启动

**解决方案：**
```bash
# 检查端口未被使用
lsof -i :3000

# 使用不同端口
python -m skill_seekers.mcp.server_fastmcp --http --port 8080

# 检查防火墙设置
# 确保 localhost:3000 未被阻止
```

### 权限错误

**问题：** 无法写入配置文件

**解决方案：**
```bash
# 检查文件权限
ls -la ~/Library/Application\ Support/Claude/mcp.json

# 如果目录缺失则创建
mkdir -p ~/Library/Application\ Support/Claude/

# 如需要则创建空配置
echo '{"mcpServers":{}}' > ~/Library/Application\ Support/Claude/mcp.json
```

### 导入错误

**问题：** `ModuleNotFoundError: No module named 'mcp'`

**解决方案：**
```bash
# 安装 MCP 依赖项
pip install -e ".[mcp]"

# 或单独安装
pip install mcp anthropic-mcp fastmcp

# 验证安装
python -c "import mcp; print(mcp.__version__)"
```

### 未检测到代理

**问题：** 设置脚本未检测到您的代理

**解决方案：**
```bash
# 1. 检查代理是否已安装
# 2. 手动查找配置文件
# 3. 手动添加配置（参见手动安装）
# 4. 报告问题并提供代理详情
```

---

## 高级配置

### 自定义端口

```bash
# 在自定义端口启动 HTTP 服务器
python -m skill_seekers.mcp.server_fastmcp --http --port 8080
```

更新代理配置以使用新端口：
```json
{
  "mcpServers": {
    "skill-seeker": {
      "url": "http://localhost:8080/sse"
    }
  }
}
```

### 调试日志

```bash
# 启用调试日志
python -m skill_seekers.mcp.server_fastmcp --http --log-level DEBUG

# 日志显示：
# - 工具调用
# - 请求/响应详情
# - 错误堆栈跟踪
```

### 多个实例

在不同端口上运行多个服务器：

```bash
# 终端 1 - Cursor
python -m skill_seekers.mcp.server_fastmcp --http --port 3000

# 终端 2 - Windsurf
python -m skill_seekers.mcp.server_fastmcp --http --port 3001
```

### 环境变量

```bash
# 设置默认端口
export MCP_HTTP_PORT=3000

# 设置日志级别
export MCP_LOG_LEVEL=DEBUG

# 然后启动服务器
python -m skill_seekers.mcp.server_fastmcp --http
```

---

## 下一步

**教程：**
- [抓取文档](/docs/tutorials/scraping-docs) - 使用 MCP 工具抓取文档
- [创建配置](/docs/tutorials/creating-configs) - 使用 MCP 生成配置

**手册：**
- [MCP 工具参考](/docs/manual/mcp/tools) - 完整的工具文档
- [多平台支持](/docs/manual/platforms/overview) - 平台特定功能

**CLI 参考：**
- [scrape 命令](/docs/cli/scrape) - MCP 工具的 CLI 等效项
- [package 命令](/docs/cli/package) - 打包选项
