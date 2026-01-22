---
title: "教程：抓取文档"
description: 使用 Skill Seekers 抓取文档网站并创建首个 AI 技能的分步教程
section: tutorials
order: 1
---

# 教程：抓取文档

在这个动手教程中学习如何抓取任何文档网站并创建 AI 技能。

**时间：** 15 分钟 | **级别：** 初学者 | **结果：** 可用的 React 文档技能

---

## 您将学到什么

- 如何使用预设配置
- 如何抓取文档网站
- 如何验证技能质量
- 如何增强和打包技能

## 前置要求

- 已安装 Skill Seekers（[安装指南](/docs/getting-started/installation)）
- 互联网连接
- 15 分钟时间

---

## 步骤 1：选择文档站点

在本教程中，我们将抓取 React 文档。Skill Seekers 包含 24 个流行框架的预设配置。

**查看可用预设：**
```bash
skill-seekers list-configs
```

**输出：**
```
可用配置：
- react.json        (React 文档)
- vue.json          (Vue.js 文档)
- django.json       (Django 框架)
- godot.json        (Godot 游戏引擎)
- fastapi.json      (FastAPI 框架)
... 还有 19 个
```

---

## 步骤 2：估算页数

抓取前，估算将处理多少页面：

```bash
skill-seekers estimate --config configs/react.json
```

**输出：**
```
📊 估算结果：
基础 URL：https://react.dev/learn
估算页数：约 180 页
估算时间：3-5 分钟
检测到的类别：4
```

---

## 步骤 3：抓取文档

使用 React 预设运行抓取器：

```bash
skill-seekers scrape --config configs/react.json --output output/react/
```

**发生的事情：**
1. **llms.txt 检查** - 查找 AI 优化文档（如果可用，快 10 倍）
2. **BFS 遍历** - 抓取所有文档页面
3. **智能分类** - 将内容组织成部分
4. **代码检测** - 识别并格式化代码示例
5. **SKILL.md 生成** - 创建主技能文件

**进度输出：**
```
🔍 检查 llms.txt...
✅ 找到 llms-full.txt（2.3 MB）
📥 下载中...
✅ 在 1.8 秒内下载完成
📝 创建技能结构...
✅ 技能已创建：output/react/SKILL.md
⚡ 节省时间：4m 32s vs 传统抓取
```

---

## 步骤 4：查看技能

检查创建的内容：

```bash
ls -lh output/react/
```

**输出：**
```
output/react/
├── SKILL.md                    # 主技能文件（200-500 行）
├── references/                 # 详细文档
│   ├── hooks.md
│   ├── components.md
│   ├── state-management.md
│   └── ...（50-100 个参考文件）
└── examples/                   # 代码示例
    ├── useState-example.md
    ├── useEffect-example.md
    └── ...
```

**预览 SKILL.md：**
```bash
head -50 output/react/SKILL.md
```

---

## 步骤 5：使用 AI 增强（可选）

使用 AI 将技能从基础（3/10）转换为全面（9/10）：

**选项 A：本地增强（使用 Claude Max 免费）**
```bash
skill-seekers enhance output/react/
```

这会在新终端中打开 Claude Code 并使用您的 Claude Max 订阅增强技能（无 API 成本！）。

**时间：** 30-60 秒

**选项 B：API 增强（快速）**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
skill-seekers enhance output/react/ --mode api
```

**成本：** 约 $0.15-$0.30

---

## 步骤 6：打包技能

为您首选的平台打包：

**为 Claude AI：**
```bash
skill-seekers package output/react/ --target claude
```

**为 Gemini：**
```bash
skill-seekers package output/react/ --target gemini
```

**为 OpenAI：**
```bash
skill-seekers package output/react/ --target openai
```

**输出：**
```
✅ 已打包：react-claude.zip（2.3 MB）
📦 格式：Claude AI（YAML 前置元数据）
📄 文件：1 个 SKILL.md + 87 个引用
🎯 准备上传！
```

---

## 步骤 7：上传到 AI 助手

**自动上传（推荐）：**
```bash
# 先设置 API 密钥
export ANTHROPIC_API_KEY="sk-ant-..."

# 上传
skill-seekers upload react-claude.zip --target claude
```

**手动上传：**
1. 打开 [Claude.ai](https://claude.ai)
2. 点击「添加知识」
3. 上传 `react-claude.zip`
4. 完成！

---

## 步骤 8：测试您的技能

**在 Claude 中尝试这些提示：**

```
「向我解释 React hooks」
「展示如何使用 useState 与数组」
「useEffect 和 useLayoutEffect 之间有什么区别？」
「使用 hooks 创建一个简单的计数器组件」
```

**结果：** Claude 基于官方 React 文档以准确、上下文感知的答案回应！

---

## 故障排除

### 问题：「找不到页面」

**解决方案：** 检查您的配置选择器：
```bash
skill-seekers scrape --config configs/react.json --interactive
```

交互模式显示提取的内容并让您测试选择器。

### 问题：「抓取太慢」

**解决方案：**
- 使用 `--async` 标志获得 2-3 倍加速
- 在配置中增加 `rate_limit`（尝试 1.0 或 2.0）
- 检查 llms.txt 是否可用（快 10 倍！）

### 问题：「增强失败」

**解决方案：**
- **本地模式：** 安装 Claude Code
- **API 模式：** 设置 `ANTHROPIC_API_KEY` 环境变量
- **超时：** 使用 `--timeout 1200`（20 分钟）增加

---

## 下一步

**您刚刚创建了第一个 AI 技能！🎉**

接下来尝试这些：

1. **抓取另一个框架：** [Django 教程](/docs/tutorials/analyzing-github)
2. **创建自定义配置：** [配置创建教程](/docs/tutorials/creating-configs)
3. **组合源：** [多源教程](/docs/tutorials/multi-source-skills)
4. **探索 MCP：** [MCP 设置](/docs/manual/mcp/setup)

---

## 总结

**您学到了：**
- ✅ 如何使用预设配置
- ✅ 如何估算和抓取文档
- ✅ 如何使用 AI 增强技能
- ✅ 如何为任何平台打包和上传
- ✅ 如何解决常见问题

**时间投入：** 15 分钟
**结果：** 专业质量的 AI 技能随时可用！

---

**另见：**
- [抓取手册](/docs/manual/scraping/documentation) - 高级抓取技术
- [增强指南](/docs/manual/enhancement/ai-enhancement) - AI 增强深入探讨
- [CLI 参考](/docs/cli/scrape) - 完整 scrape 命令参考
