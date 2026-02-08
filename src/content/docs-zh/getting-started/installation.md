---
title: 安装指南
description: 在您的系统上安装 Skill Seekers 的分步指南
section: getting-started
order: 2
---

# 安装指南

**时间:** 总共 15-30 分钟(包括所有安装)

**结果:** 准备好创建您的第一个 Claude 技能的可用 Skill Seekers 安装

## 前提条件

开始之前,您需要:
- 一台计算机(macOS、Linux 或安装了 WSL 的 Windows)
- 互联网连接
- 30 分钟的时间

## 方法 1: 通过 PyPI 安装(推荐)

安装 Skill Seekers 最简单的方法是通过 PyPI:

```bash
# 安装基础包
pip install skill-seekers

# 或安装特定 LLM 平台支持
pip install skill-seekers[gemini]  # 用于 Google Gemini
pip install skill-seekers[openai]  # 用于 OpenAI ChatGPT
pip install skill-seekers[all]     # 用于所有平台
```

**验证安装:**
```bash
skill-seekers --version
# 应该显示: skill-seekers 2.7.0 或更高版本
```

## 方法 2: 从源代码安装

用于开发或获取最新功能:

### 步骤 1: 安装 Python (5 分钟)

#### 检查您是否已安装 Python

```bash
python3 --version
```

**✅ 如果您看到:** `Python 3.10.x` 或更高版本 → **跳到步骤 2!**

**❌ 如果未安装:**

**macOS:**
```bash
# 安装 Homebrew (如果未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python3
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

**Windows:**
1. 从以下地址下载 Python: https://www.python.org/downloads/
2. 运行安装程序
3. **重要:** 安装过程中勾选"Add Python to PATH"

### 步骤 2: 安装 Git (3 分钟)

```bash
git --version
```

**✅ 如果您看到:** `git version 2.x.x` → **跳到步骤 3!**

**❌ 如果未安装:**

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git
```

**Windows:**
从以下地址下载: https://git-scm.com/download/win

### 步骤 3: 克隆并安装 (2 分钟)

```bash
# 创建项目目录
mkdir -p ~/Projects
cd ~/Projects

# 克隆仓库
git clone https://github.com/yusufkaraaslan/Skill_Seekers.git
cd Skill_Seekers

# 以开发模式安装
pip install -e .

# 或安装所有依赖项
pip install -e ".[all]"
```

**验证安装:**
```bash
skill-seekers --version
```

## 设置 API 密钥

Skill Seekers 可以使用 AI 增强技能。设置您的 API 密钥:

### 对于 Claude (Anthropic)

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 对于 Google Gemini

```bash
export GOOGLE_API_KEY="your-api-key-here"
```

### 对于 OpenAI

```bash
export OPENAI_API_KEY="your-api-key-here"
```

**使其永久生效(可选):**

将导出命令添加到您的 shell 配置文件(`~/.bashrc`、`~/.zshrc` 或 `~/.bash_profile`):

```bash
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

## 故障排除

### "command not found: skill-seekers"

确保 pip 的 bin 目录在您的 PATH 中:

```bash
# 查找 pip 的安装位置
pip show skill-seekers

# 添加到 PATH (根据需要调整路径)
export PATH="$HOME/.local/bin:$PATH"
```

### "No module named 'skill_seekers'"

使用 pip 而不是 python 进行安装:

```bash
pip install -e .
```

### 权限错误

使用 `--user` 标志:

```bash
pip install --user skill-seekers
```

## 下一步

- [快速入门指南](/docs/getting-started/quick-start) - 5 分钟创建您的第一个技能
- [浏览配置](/configs) - 探索预构建的配置
- [功能概述](/docs/about/features) - 了解 Skill Seekers 可以做什么
