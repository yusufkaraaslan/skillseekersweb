---
title: 故障排除指南
description: 使用 Skill Seekers 时的常见问题和解决方案 - 安装、运行时、MCP 设置和平台特定修复
section: guides
order: 1
---

# 故障排除指南

使用 Skill Seeker 时的常见问题和解决方案。

---

## 安装问题

### 找不到 Python

**错误：**
```
python3: command not found
```

**解决方案：**
1. **检查是否安装了 Python：**
   ```bash
   which python3
   python --version  # 尝试不带 3
   ```

2. **安装 Python：**
   - **macOS：** `brew install python3`
   - **Linux：** `sudo apt install python3 python3-pip`
   - **Windows：** 从 python.org 下载，勾选「添加到 PATH」

3. **使用 python 而不是 python3：**
   ```bash
   python cli/doc_scraper.py --help
   ```

### 找不到模块

**错误：**
```
ModuleNotFoundError: No module named 'requests'
ModuleNotFoundError: No module named 'bs4'
ModuleNotFoundError: No module named 'mcp'
```

**解决方案：**
1. **安装依赖：**
   ```bash
   pip3 install requests beautifulsoup4
   pip3 install -r mcp/requirements.txt  # 用于 MCP
   ```

2. **如果权限被拒绝，使用 --user 标志：**
   ```bash
   pip3 install --user requests beautifulsoup4
   ```

3. **检查 pip 是否正常工作：**
   ```bash
   pip3 --version
   ```

### 权限被拒绝

**错误：**
```
Permission denied: '/usr/local/lib/python3.x/...'
```

**解决方案：**
1. **使用 --user 标志：**
   ```bash
   pip3 install --user requests beautifulsoup4
   ```

2. **使用 sudo（不推荐）：**
   ```bash
   sudo pip3 install requests beautifulsoup4
   ```

3. **使用虚拟环境（最佳实践）：**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install requests beautifulsoup4
   ```

---

## 运行时问题

### 找不到文件

**错误：**
```
FileNotFoundError: [Errno 2] No such file or directory: 'cli/doc_scraper.py'
```

**解决方案：**
1. **检查您是否在 Skill_Seekers 目录中：**
   ```bash
   pwd
   # 应显示：.../Skill_Seekers

   ls
   # 应显示：README.md、cli/、mcp/、configs/
   ```

2. **切换到正确的目录：**
   ```bash
   cd ~/Projects/Skill_Seekers  # 调整路径
   ```

### 找不到配置文件

**错误：**
```
FileNotFoundError: configs/react.json
```

**解决方案：**
1. **检查配置是否存在：**
   ```bash
   ls configs/
   # 应显示：godot.json、react.json、vue.json 等
   ```

2. **使用完整路径：**
   ```bash
   skill-seekers scrape --config $(pwd)/configs/react.json
   ```

3. **创建缺失的配置：**
   ```bash
   skill-seekers scrape --interactive
   ```

---

## MCP 设置问题

### MCP 服务器未加载

**症状：**
- 工具未出现在 Claude Code 中
- 「列出所有可用配置」不起作用

**解决方案：**

1. **检查配置文件：**
   ```bash
   cat ~/.config/claude-code/mcp.json
   ```

2. **验证路径是绝对路径（不是占位符）：**
   ```json
   {
     "mcpServers": {
       "skill-seeker": {
         "args": [
           "/Users/yourname/Projects/Skill_Seekers/mcp/server.py"
         ]
       }
     }
   }
   ```
   ❌ **错误：** `$REPO_PATH` 或 `/path/to/Skill_Seekers`
   ✅ **正确：** `/Users/john/Projects/Skill_Seekers`

3. **手动测试服务器：**
   ```bash
   cd ~/Projects/Skill_Seekers
   python3 mcp/server.py
   # 应该无错误启动（Ctrl+C 停止）
   ```

4. **重新运行设置脚本：**
   ```bash
   ./setup_mcp.sh
   # 为自动配置选择「y」
   ```

5. **完全重启 Claude Code：**
   - 退出（不只是关闭窗口）
   - 重新打开

### 配置中的占位符路径

**问题：** 配置中有 `$REPO_PATH` 或 `/Users/username/` 而不是真实路径

**解决方案：**
```bash
# 获取您的实际路径
cd ~/Projects/Skill_Seekers
pwd
# 复制此路径

# 编辑配置
nano ~/.config/claude-code/mcp.json

# 将占位符的所有实例替换为您的实际路径
# 保存（Ctrl+O、Enter、Ctrl+X）

# 重启 Claude Code
```

### 工具出现但不工作

**症状：**
- 工具已列出但命令失败
- 「执行工具时出错」消息

**解决方案：**

1. **检查工作目录：**
   ```json
   {
     "cwd": "/FULL/PATH/TO/Skill_Seekers"
   }
   ```

2. **验证文件存在：**
   ```bash
   ls cli/doc_scraper.py
   ls mcp/server.py
   ```

3. **直接测试 CLI 工具：**
   ```bash
   skill-seekers scrape --help
   ```

---

## 抓取问题

### 缓慢或挂起

**解决方案：**

1. **检查网络连接：**
   ```bash
   ping google.com
   curl -I https://docs.yoursite.com
   ```

2. **使用较小的 max_pages 进行测试：**
   ```bash
   skill-seekers scrape --config configs/test.json --max-pages 5
   ```

3. **在配置中增加 rate_limit：**
   ```json
   {
     "rate_limit": 1.0  // 从 0.5 增加
   }
   ```

### 未提取内容

**问题：** 页面已抓取但内容为空

**解决方案：**

1. **检查配置中的选择器：**
   ```bash
   # 使用浏览器开发工具测试
   # 查找：article、main、div[role="main"]、div.content
   ```

2. **验证网站是否可访问：**
   ```bash
   curl https://docs.example.com
   ```

3. **尝试不同的选择器：**
   ```json
   {
     "selectors": {
       "main_content": "article"  // 尝试：main、div.content 等
     }
   }
   ```

### 速率限制 / 429 错误

**错误：**
```
HTTP Error 429: Too Many Requests
```

**解决方案：**

1. **增加 rate_limit：**
   ```json
   {
     "rate_limit": 2.0  // 请求之间等待 2 秒
   }
   ```

2. **减少 max_pages：**
   ```json
   {
     "max_pages": 50  // 抓取更少的页面
   }
   ```

3. **稍后重试：**
   ```bash
   # 等待一小时后重试
   ```

---

## 平台特定问题

### macOS

**问题：** 无法运行 `./setup_mcp.sh`

**解决方案：**
```bash
chmod +x setup_mcp.sh
./setup_mcp.sh
```

**问题：** 未安装 Homebrew

**解决方案：**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Linux

**问题：** 找不到 pip3

**解决方案：**
```bash
sudo apt update
sudo apt install python3-pip
```

**问题：** 权限错误

**解决方案：**
```bash
# 使用 --user 标志
pip3 install --user requests beautifulsoup4
```

### Windows（WSL）

**问题：** Python 不在 PATH 中

**解决方案：**
1. 重新安装 Python
2. 勾选「将 Python 添加到 PATH」
3. 或手动添加到 PATH

**问题：** 行尾错误

**解决方案：**
```bash
dos2unix setup_mcp.sh
./setup_mcp.sh
```

---

## 验证命令

使用这些命令检查您的设置：

```bash
# 1. 检查 Python
python3 --version  # 应为 3.10+

# 2. 检查依赖
pip3 list | grep requests
pip3 list | grep beautifulsoup4
pip3 list | grep mcp

# 3. 检查文件存在
ls cli/doc_scraper.py
ls mcp/server.py
ls configs/

# 4. 检查 MCP 配置
cat ~/.config/claude-code/mcp.json

# 5. 测试抓取器
skill-seekers scrape --help

# 6. 测试 MCP 服务器
timeout 3 python3 mcp/server.py || echo "服务器正常"

# 7. 检查 git 仓库
git status
git log --oneline -5
```

---

## 获取帮助

如果这些解决方案都不起作用：

1. **检查现有 issues：**
   https://github.com/yusufkaraaslan/Skill_Seekers/issues

2. **打开新 issue 并提供：**
   - 您的操作系统（macOS 13、Ubuntu 22.04 等）
   - Python 版本（`python3 --version`）
   - 完整的错误消息
   - 您运行的命令
   - 上述验证命令的输出

3. **包含此调试信息：**
   ```bash
   # 系统信息
   uname -a
   python3 --version
   pip3 --version

   # Skill Seeker 信息
   cd ~/Projects/Skill_Seekers  # 您的路径
   pwd
   git log --oneline -1
   ls -la cli/ mcp/ configs/

   # MCP 配置（如果使用 MCP）
   cat ~/.config/claude-code/mcp.json
   ```

---

## 快速修复清单

- [ ] 在 Skill_Seekers 目录中吗？（`pwd`）
- [ ] 安装了 Python 3.10+ 吗？（`python3 --version`）
- [ ] 安装了依赖吗？（`pip3 list | grep requests`）
- [ ] 配置文件存在吗？（`ls configs/yourconfig.json`）
- [ ] 互联网连接正常吗？（`ping google.com`）
- [ ] 对于 MCP：配置使用绝对路径吗？（不是 `$REPO_PATH`）
- [ ] 对于 MCP：重启了 Claude Code 吗？（退出并重新打开）

---

**仍然卡住？** 打开 issue：https://github.com/yusufkaraaslan/Skill_Seekers/issues/new

## 下一步

- [MCP 设置指南](/docs/guides/mcp-setup) - 设置 MCP 集成
- [快速入门](/docs/getting-started/quickstart) - 快速开始
- [安装指南](/docs/getting-started/installation) - 详细安装说明
