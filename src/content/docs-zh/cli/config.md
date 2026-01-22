---
title: config - 配置管理
description: GitHub 令牌、API 密钥、速率限制设置和恢复首选项的交互式配置向导
section: cli
order: 9
---

# config - 配置管理

用于管理 Skill Seekers 配置的交互式向导，包括 GitHub 令牌、API 密钥和系统设置。

## 基本用法

```bash
skill-seekers config [OPTIONS]
```

## 快速示例

```bash
# 启动交互式配置菜单
skill-seekers config

# 直接进入 GitHub 令牌设置
skill-seekers config --github

# 设置 API 密钥
skill-seekers config --api-keys

# 查看当前配置
skill-seekers config --show

# 测试所有连接
skill-seekers config --test
```

## 选项

### 可选标志

- `--github` - 直接进入 GitHub 令牌设置
- `--api-keys` - 直接进入 API 密钥配置
- `--show` - 显示当前配置
- `--test` - 测试所有已配置的连接
- `--clean` - 清理旧的进度文件

## 交互式菜单

主配置菜单提供 7 个选项：

### 1. GitHub 令牌设置

管理多个 GitHub 配置文件以灵活管理令牌：

```bash
skill-seekers config --github
```

**功能：**
- 添加/删除 GitHub 配置文件（个人、工作、OSS 等）
- 设置默认配置文件
- 为每个配置文件配置速率限制策略
- 浏览器集成 - 打开 GitHub 令牌创建页面
- 令牌验证和格式检查
- 自动超时配置

**速率限制策略：**
- `prompt` - 询问用户该做什么（默认，交互式）
- `wait` - 使用倒计时器自动等待
- `switch` - 自动尝试另一个配置文件
- `fail` - 立即失败并显示清晰的错误

### 2. API 密钥配置

设置用于 AI 增强的 API 密钥：

```bash
skill-seekers config --api-keys
```

**支持的平台：**
- **Claude（Anthropic）** - 用于 AI 增强
- **Google Gemini** - 用于 Gemini 平台导出
- **OpenAI ChatGPT** - 用于 OpenAI 平台导出

**功能：**
- 浏览器集成 - 打开 API 密钥创建页面
- 环境变量回退支持
- 安全配置文件存储（600 权限）
- 设置后测试连接

### 3. 速率限制设置

配置速率限制行为：

**选项：**
- 默认速率限制策略（prompt/wait/switch/fail）
- 每个配置文件的超时（默认：30 分钟）
- CI/CD 的非交互模式

### 4. 恢复设置

配置可恢复作业首选项：

**选项：**
- 自动保存间隔（默认：60 秒）
- 自动清理年龄（默认：7 天）
- 进度文件位置

### 5. 查看当前配置

显示所有当前设置：

```bash
skill-seekers config --show
```

**显示：**
- GitHub 配置文件和默认值
- API 密钥（为安全起见已屏蔽）
- 速率限制策略
- 恢复设置
- 配置文件位置

### 6. 测试连接

验证所有已配置的令牌和 API 密钥：

```bash
skill-seekers config --test
```

**测试：**
- GitHub 令牌有效性和速率限制
- API 密钥身份验证
- 网络连接
- 权限范围

### 7. 清理旧进度文件

删除旧的可恢复作业文件：

```bash
skill-seekers config --clean
```

删除早于配置的清理年龄（默认：7 天）的进度文件。

## 配置存储

### 配置文件位置

```
~/.config/skill-seekers/config.json
```

**权限：** 600（仅所有者读/写）

### 配置文件结构

```json
{
  "github_profiles": {
    "personal": {
      "token": "ghp_...",
      "description": "个人项目",
      "rate_limit_strategy": "prompt",
      "timeout": 1800
    },
    "work": {
      "token": "github_pat_...",
      "description": "工作项目",
      "rate_limit_strategy": "switch",
      "timeout": 900
    }
  },
  "default_github_profile": "personal",
  "api_keys": {
    "anthropic": "sk-ant-...",
    "google": "AIza...",
    "openai": "sk-..."
  },
  "resume": {
    "auto_save_interval": 60,
    "auto_cleanup_days": 7
  }
}
```

### 环境变量回退

如果不在配置文件中，Skill Seekers 会检查这些环境变量：

```bash
# GitHub 令牌
export GITHUB_TOKEN=ghp_your_token_here

# API 密钥
export ANTHROPIC_API_KEY=sk-ant-...
export GOOGLE_API_KEY=AIza...
export OPENAI_API_KEY=sk-...
```

## GitHub 令牌设置

### 创建 GitHub 令牌

1. 运行 `skill-seekers config --github`
2. 选择「添加新配置文件」
3. 浏览器打开：https://github.com/settings/tokens
4. 点击「生成新令牌（经典）」
5. **必需范围：**
   - `repo` - 完全控制私有仓库
   - 或 `public_repo` - 访问公共仓库（如果仅使用公共仓库）
6. 复制令牌并粘贴到向导中
7. 设置配置文件描述和速率限制策略

### 令牌格式

Skill Seekers 接受这些 GitHub 令牌格式：

- **经典 PAT：** `ghp_...`（40 个字符）
- **细粒度 PAT：** `github_pat_...`（93+ 个字符）

### 速率限制

**无令牌：** 60 次请求/小时
**有令牌：** 5000 次请求/小时

如果未配置令牌，配置向导会提前显示警告。

## 多配置文件工作流

### 用例：个人 + 工作帐户

```bash
# 添加配置文件
skill-seekers config --github

# 配置文件 1：个人（无限超时，prompt 策略）
name: personal
token: ghp_personal_token
strategy: prompt
timeout: unlimited

# 配置文件 2：工作（15 分钟超时，自动切换）
name: work
token: ghp_work_token
strategy: switch
timeout: 900

# 设置默认
default: personal
```

### 配置文件切换

当配置文件达到速率限制时：

1. **prompt 策略** - 询问用户该做什么
2. **wait 策略** - 显示倒计时器，等待重置
3. **switch 策略** - 自动尝试下一个可用配置文件
4. **fail 策略** - 立即退出并显示错误

### 选择配置文件

```bash
# 使用特定配置文件
skill-seekers github --repo owner/repo --profile work

# 使用默认配置文件（来自配置）
skill-seekers github --repo owner/repo
```

## API 密钥设置

### Claude（Anthropic）

```bash
skill-seekers config --api-keys
# 选择「Claude（Anthropic）」
# 浏览器打开：https://console.anthropic.com/settings/keys
```

**用于：**
- 使用 Claude API 的 AI 增强
- LOCAL 增强的替代方案

### Google Gemini

```bash
skill-seekers config --api-keys
# 选择「Google Gemini」
# 浏览器打开：https://aistudio.google.com/app/apikey
```

**用于：**
- Gemini 平台导出
- 使用 Gemini API 的 AI 增强

### OpenAI ChatGPT

```bash
skill-seekers config --api-keys
# 选择「OpenAI ChatGPT」
# 浏览器打开：https://platform.openai.com/api-keys
```

**用于：**
- OpenAI 平台导出
- 使用 GPT-4o 的 AI 增强

## 首次运行体验

首次安装时，Skill Seekers 会显示带有设置选项的欢迎消息：

```
欢迎使用 Skill Seekers！🎯

选择您的安装配置文件：
1. 仅 CLI（无 MCP 依赖）
2. MCP 集成（完整 Claude Code 支持）
3. 所有功能（启用所有功能）

运行 'skill-seekers config' 以设置 GitHub 令牌和 API 密钥。
```

存储在：`~/.config/skill-seekers/.setup_shown`

## 测试配置

### 测试所有连接

```bash
skill-seekers config --test
```

**输出：**
```
测试 GitHub 令牌：
✓ personal（ghp_...）- 剩余 4,987/5,000 次请求
✓ work（github_pat_...）- 剩余 4,999/5,000 次请求

测试 API 密钥：
✓ Claude（Anthropic）- 已连接
✓ Google Gemini - 已连接
× OpenAI ChatGPT - 未配置

测试网络：
✓ GitHub API - 可达
✓ Anthropic API - 可达
✓ Google AI API - 可达
```

### 测试单个连接

交互式菜单为每个服务提供实时连接测试。

## CI/CD 模式

对于自动化管道，使用环境变量而不是交互式配置：

```bash
# GitHub Actions 示例
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

# 在非交互模式下运行
skill-seekers github --repo owner/repo --non-interactive
```

**非交互模式：**
- 在速率限制时快速失败（无提示）
- 自动使用 `fail` 策略
- 日志的清晰错误消息
- 管道集成的退出代码

## 故障排除

### 找不到配置文件

```bash
# 创建配置目录
mkdir -p ~/.config/skill-seekers

# 运行配置向导
skill-seekers config
```

### 权限错误

```bash
# 修复配置文件权限
chmod 600 ~/.config/skill-seekers/config.json
```

### 令牌验证失败

```bash
# 手动测试令牌
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.github.com/user

# 重新运行配置向导
skill-seekers config --github
```

### API 密钥不工作

```bash
# 测试连接
skill-seekers config --test

# 删除并重新添加密钥
skill-seekers config --api-keys
```

## 安全最佳实践

1. **永远不要提交令牌**到版本控制
2. **尽可能使用细粒度令牌**（最小权限）
3. **设置令牌过期时间**以提高安全性
4. **为不同项目使用单独的配置文件**
5. **将令牌存储在配置文件中**（生产中不使用环境变量）
6. **将文件权限设置为 600**（仅所有者读/写）
7. **定期轮换令牌**（建议每 90 天）

## 另见

- [resume 命令](/docs/cli/resume) - 恢复中断的作业
- [github 命令](/docs/cli/github) - GitHub 仓库抓取
- [多令牌配置指南](/docs/guides/multi-token-config) - 详细配置指南
- [速率限制管理指南](/docs/guides/rate-limit-management) - 速率限制处理策略
