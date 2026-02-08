---
title: 多代理设置
description: 配置 Skill Seekers 与 Claude、Copilot、Codex 和自定义代理。
section: guides
order: 4
---

# 多代理设置

配置 Skill Seekers 与 **Claude、Copilot、Codex** 和自定义代理。

## 支持的代理

| 代理 | CLI 标志 | 要求 |
|-------|----------|--------------|
| **Claude Code** | `--agent claude` | Claude Max 订阅 |
| **GitHub Copilot** | `--agent copilot` | Copilot 订阅 |
| **OpenAI Codex** | `--agent codex` | OpenAI API 密钥 |
| **OpenCode** | `--agent opencode` | OpenCode CLI |
| **自定义** | `--agent custom` | 自定义命令 |

## 快速设置

### Claude Code (默认)

```bash
# 已随 MCP 安装
skill-seekers enhance output/react/ --agent claude
```

### GitHub Copilot

```bash
# 安装 Copilot CLI
gh extension install github/copilot

# 与 Skill Seekers 一起使用
skill-seekers enhance output/react/ --agent copilot
```

### OpenAI Codex

```bash
# 设置 API 密钥
export OPENAI_API_KEY=sk-...

# 使用 Codex
skill-seekers enhance output/react/ --agent codex
```

### 自定义代理

```bash
# 任何 CLI 工具
skill-seekers enhance output/react/ \
  --agent custom \
  --agent-cmd "my-ai-tool {prompt_file}"
```

## 环境变量

```bash
# 默认代理
export SKILL_SEEKER_AGENT=claude

# 自定义命令
export SKILL_SEEKER_AGENT_CMD="my-tool {prompt_file}"
```

## CI/CD 集成

```yaml
# 使用不同代理的 GitHub Actions
strategy:
  matrix:
    agent: [claude, copilot, codex]
    
steps:
  - run: skill-seekers enhance output/ --agent ${{ matrix.agent }}
```

## 比较

| 特性 | Claude | Copilot | Codex | OpenCode |
|---------|--------|---------|-------|----------|
| **成本** | Max 订阅 | Copilot 订阅 | API 付费 | 免费 |
| **速度** | 快 | 快 | 中等 | 中等 |
| **质量** | 高 | 高 | 高 | 中等 |
| **离线** | ✅ | ❌ | ❌ | ✅ |
