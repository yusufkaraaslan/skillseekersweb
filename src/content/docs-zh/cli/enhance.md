---
title: enhance - AI 增强
description: 使用 AI 增强技能，使用 Claude API 或本地 Claude Code 改进质量、添加示例和扩展文档
section: cli
order: 8
---

# enhance - AI 增强

使用 AI 增强技能以改进质量并添加全面的示例。

## 基本用法

```bash
skill-seekers enhance INPUT_DIR [OPTIONS]
```

## 快速示例

```bash
# 本地增强（免费，使用 Claude Code）
skill-seekers enhance output/react/

# API 增强（需要 API 密钥）
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --api

# 使用特定提供者
skill-seekers enhance output/react/ --provider anthropic --mode api
skill-seekers enhance output/react/ --provider google --mode api
skill-seekers enhance output/react/ --provider openai --mode api
```

## 选项

- `--mode MODE` - 增强模式：`local` 或 `api`（默认：local）
- `--provider PROVIDER` - AI 提供者：anthropic、google、openai
- `--api-key KEY` - API 密钥（或使用环境变量）
- `--quality LEVEL` - 质量级别：minimal、standard、comprehensive

## 增强模式

### 本地模式（推荐 - 免费）

```bash
skill-seekers enhance output/react/
```

**工作原理：**
- 使用 Claude Code 打开新终端
- 使用您的 Claude Code Max 计划
- 无 API 成本
- 约需 60 秒

**要求：**
- 已安装 Claude Code
- 有效的 Claude Code Max 订阅

### API 模式

```bash
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --mode api
```

**工作原理：**
- 直接调用 Claude API
- 使用 Claude Sonnet 4
- 每个技能成本约 $0.01-0.10
- 约需 30-60 秒

**要求：**
- 来自 https://console.anthropic.com/ 的 API 密钥

## AI 提供者

### Anthropic（Claude）

```bash
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --provider anthropic --mode api
```

**模型：**
- Claude Sonnet 4（默认）
- 最适合代码和技术文档

### Google（Gemini）

```bash
pip install skill-seekers[gemini]
export GOOGLE_API_KEY=AIzaSy...
skill-seekers enhance output/react/ --provider google --mode api
```

**模型：**
- Gemini 2.0 Flash
- 适合长上下文（2M 令牌）

### OpenAI（GPT）

```bash
pip install skill-seekers[openai]
export OPENAI_API_KEY=sk-proj-...
skill-seekers enhance output/react/ --provider openai --mode api
```

**模型：**
- GPT-4o
- 适合一般增强

## 质量级别

### Minimal（快速 - 15-30 秒）

```bash
skill-seekers enhance output/react/ --quality minimal
```

**改进：**
- 添加代码示例
- 修复格式
- 基本解释

### Standard（默认 - 30-60 秒）

```bash
skill-seekers enhance output/react/
```

**改进：**
- Minimal 的所有内容
- 全面的解释
- 最佳实践
- 常见用例

### Comprehensive（彻底 - 1-2 分钟）

```bash
skill-seekers enhance output/react/ --quality comprehensive
```

**改进：**
- Standard 的所有内容
- 高级示例
- 故障排除指南
- 性能提示
- 安全注意事项

## 增强的内容

### SKILL.md 改进

**增强前：**
```markdown
# React 框架

React 是一个用于构建用户界面的 JavaScript 库。

## 主要功能
- 基于组件
- 虚拟 DOM
- JSX 语法
```

**增强后：**
```markdown
# React 框架

React 是一个用于构建用户界面的 JavaScript 库，由 Meta（前 Facebook）开发。它使开发者能够创建可重用的 UI 组件，这些组件根据数据变化高效地更新和渲染。

## 主要功能

### 基于组件的架构
React 应用程序使用管理自己状态的可重用组件构建，并组合以创建复杂的 UI。

**示例：**
```jsx
function Welcome({ name }) {
  return <h1>你好，{name}！</h1>;
}

function App() {
  return <Welcome name="React 开发者" />;
}
```

### 虚拟 DOM
React 使用 DOM 的虚拟表示来优化渲染性能...
```

### 增强包括

✅ **更好的解释**
- 自然语言描述
- 为什么/如何/何时的上下文
- 真实世界用例

✅ **代码示例**
- 可工作的代码片段
- 常见模式
- 最佳实践

✅ **故障排除**
- 常见错误
- 解决方案
- 调试技巧

✅ **前置要求**
- 要求
- 设置步骤
- 依赖项

✅ **下一步**
- 相关主题
- 学习路径
- 高级功能

## 工作流集成

### 抓取 + 增强

```bash
# 在一个命令中组合
skill-seekers scrape --config configs/react.json --enhance-local

# 或分别执行
skill-seekers scrape --config configs/react.json
skill-seekers enhance output/react/
```

### 增强 + 打包

```bash
# 增强然后打包
skill-seekers enhance output/react/
skill-seekers package output/react/
```

### 完整工作流

```bash
# 1. 抓取
skill-seekers scrape --config configs/react.json

# 2. 增强
skill-seekers enhance output/react/

# 3. 打包
skill-seekers package output/react/

# 4. 上传
skill-seekers upload output/react.zip
```

## 备份文件

增强会创建备份：

```
output/react/
├── SKILL.md                # 增强版本
├── SKILL.md.backup        # 原始版本
└── references/            # 也有备份
    └── *.md.backup
```

**恢复原始版本：**
```bash
cd output/react
cp SKILL.md.backup SKILL.md
```

## 成本估算

### 本地模式（免费）

- 无 API 成本
- 使用您的 Claude Code Max 计划
- 无限次增强

### API 模式

| 提供者 | 模型 | 每个技能成本 |
|----------|-------|----------------|
| Anthropic | Claude Sonnet 4 | $0.01-0.10 |
| Google | Gemini 2.0 Flash | $0.005-0.05 |
| OpenAI | GPT-4o | $0.02-0.15 |

*成本因技能大小和质量级别而异*

## 故障排除

### 本地模式不工作

确保 Claude Code 正在运行：
```bash
# macOS
open -a "Claude"

# 检查 Claude Code 是否在 PATH 中
which claude
```

### API 模式失败

验证 API 密钥：
```bash
echo $ANTHROPIC_API_KEY
# 应显示：sk-ant-...

# 或设置它
export ANTHROPIC_API_KEY=sk-ant-...
```

### 增强太慢

使用 minimal 质量：
```bash
skill-seekers enhance output/react/ --quality minimal
```

或使用本地模式（通常更快）：
```bash
skill-seekers enhance output/react/
```

## 下一步

- [Package 命令](/docs/cli/package) - 打包增强的技能
- [功能：AI 增强](/docs/features/ai-enhancement) - 增强详情
- [上传指南](/docs/guides/upload-guide) - 部署您的技能
