---
title: 创建您的第一个技能
description: 使用 Skill Seekers 在 5 分钟内创建第一个 AI 技能的快速实践教程
section: getting-started
order: 3
---

# 创建您的第一个技能

边学边做!本教程将指导您在短短 5 分钟内从文档创建您的第一个 AI 技能。

**前提条件:** 已安装 Skill Seekers ([安装指南](/docs/getting-started/installation))

**时间:** 5 分钟 | **结果:** 准备上传的可用 Claude 技能

---

## 我们要构建什么

我们将从 **Tailwind CSS 文档**创建一个技能,因为它:
- 小型(约 50 页) - 快速抓取
- 结构良好 - 展示良好效果
- 实用 - 一个您真正会使用的技能

**最终结果:** 一个了解 Tailwind CSS 工具类、组件和最佳实践的 Claude 技能。

---

## 步骤 1: 检查您的安装

确保 Skill Seekers 已准备好:

```bash
skill-seekers --version
```

您应该看到类似这样的内容: `Skill Seekers v3.0.0`

**如果未安装:** 请参阅[安装指南](/docs/getting-started/installation)

---

## 步骤 2: 抓取文档

运行这个单一命令:

```bash
skill-seekers scrape https://tailwindcss.com/docs/installation --max-pages 50
```

**发生的过程:**
1. **llms.txt 检查** - 查找 AI 优化的文档(如果可用,速度快 10 倍)
2. **BFS 遍历** - 爬取所有文档页面
3. **智能分类** - 将内容组织到各个部分
4. **代码检测** - 识别和格式化代码示例
5. **SKILL.md 生成** - 创建主技能文件

**进度输出:**
```
🔍 检查 llms.txt...
📥 抓取文档中...
   ├─ 第 1/50 页: Installation
   ├─ 第 2/50 页: Editor Setup
   ├─ 第 3/50 页: Utility-First Fundamentals
   ...
   └─ 第 50/50 页: Plugin API

✅ 技能已创建: output/tailwindcss/SKILL.md
📊 统计:
   - 页面: 50
   - 代码示例: 127
   - 类别: 8
   - 时间: 45 秒
```

---

## 步骤 3: 查看创建的内容

检查输出:

```bash
ls output/tailwindcss/
```

**您应该看到:**
```
output/tailwindcss/
├── SKILL.md                    # 主技能文件 (250-400 行)
├── references/                 # 详细文档
│   ├── utilities/
│   │   ├── layout.md
│   │   ├── flexbox.md
│   │   └── spacing.md
│   ├── components/
│   │   └── forms.md
│   └── configuration/
│       └── theme.md
└── examples/                   # 提取的代码示例
    ├── custom-colors.md
    └── responsive-design.md
```

**预览技能:**
```bash
head -50 output/tailwindcss/SKILL.md
```

---

## 步骤 4: 使用 AI 增强(可选)

从基础(3/10)转变为综合(9/10):

**选项 A: 本地增强(使用 Claude Max 免费)**
```bash
skill-seekers enhance output/tailwindcss/
```

使用您的 Claude Max 订阅 - 无 API 费用!

**选项 B: API 增强(快速)**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
skill-seekers enhance output/tailwindcss/ --mode api
```

**成本:** 约 $0.10-$0.20

**增强功能:**
- 总结关键概念
- 提取最佳实践
- 识别常见模式
- 创建快速参考部分
- 改进组织

**时间:** 30-60 秒

---

## 步骤 5: 打包技能

为 Claude AI 打包:

```bash
skill-seekers package output/tailwindcss/ --target claude
```

**输出:**
```
✅ 已打包: tailwindcss-claude.zip (1.8 MB)
📦 格式: Claude AI (YAML frontmatter)
📄 文件: 1 个 SKILL.md + 45 个参考文件
🎯 准备上传!
```

**对于其他平台:**
```bash
# Google Gemini
skill-seekers package output/tailwindcss/ --target gemini

# OpenAI ChatGPT
skill-seekers package output/tailwindcss/ --target openai

# 通用 Markdown
skill-seekers package output/tailwindcss/ --target markdown
```

---

## 步骤 6: 上传到 Claude

**自动上传:**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
skill-seekers upload tailwindcss-claude.zip --target claude
```

**手动上传:**
1. 打开 [Claude.ai](https://claude.ai)
2. 开始新对话
3. 点击"添加知识"(📎 图标)
4. 上传 `tailwindcss-claude.zip`
5. 完成!

---

## 步骤 7: 测试您的技能

在 Claude 中尝试这些提示:

```
"Tailwind 的间距工具类有哪些?"

"展示如何使用 Tailwind 创建响应式导航栏"

"px-4 和 p-4 有什么区别?"

"使用 Tailwind 工具类创建卡片组件"
```

**结果:** Claude 根据官方 Tailwind 文档提供准确、上下文感知的答案!

---

## 您刚刚学到了什么

**涵盖的技能:**
- ✅ 如何抓取文档网站
- ✅ 如何审查生成的技能
- ✅ 如何使用 AI 增强(可选)
- ✅ 如何为不同平台打包
- ✅ 如何上传到 Claude

**时间投入:** 5 分钟(增强需 10-15 分钟)

**结果:** 可随时使用的生产质量 AI 技能!

---

## 接下来尝试这些

现在您已经了解了基础知识,尝试:

### 1. 使用预设配置

Skill Seekers 包含 24 个流行框架的预设:

```bash
# 列出可用预设
skill-seekers list-configs

# 尝试 React
skill-seekers scrape --config react --max-pages 100

# 尝试 Vue
skill-seekers scrape --config vue --max-pages 100

# 尝试 Django
skill-seekers scrape --config django --max-pages 150
```

### 2. 抓取 GitHub 仓库

为您的技能添加代码分析:

```bash
skill-seekers github facebook/react --local-repo-path /path/to/react
```

**参见:** [分析 GitHub 教程](/docs/tutorials/analyzing-github)

### 3. 从 PDF 提取

将技术 PDF 转换为可搜索的技能:

```bash
skill-seekers pdf --input manual.pdf --ocr
```

**参见:** [提取 PDF 教程](/docs/tutorials/extracting-pdfs)

### 4. 创建多源技能

结合文档 + GitHub + PDF:

```bash
skill-seekers unified --config django-complete.json
```

**参见:** [多源教程](/docs/tutorials/multi-source-skills)

---

## 常见问题

### "未找到页面"

**问题:** 抓取器找不到内容

**解决方案:** 使用交互模式测试选择器:
```bash
skill-seekers scrape https://your-site.com/docs --interactive
```

### "抓取太慢"

**解决方案:**
```bash
# 使用异步模式(快 2-3 倍)
skill-seekers scrape URL --async

# 减少页面进行测试
skill-seekers scrape URL --max-pages 10

# 检查 llms.txt 是否可用(快 10 倍!)
curl https://your-site.com/llms.txt
```

### "增强失败"

**解决方案:**
- **本地模式:** 确保已安装 Claude Code
- **API 模式:** 设置 `ANTHROPIC_API_KEY` 环境变量
- **超时:** 使用 `--timeout 1200` 增加(20 分钟)

**完整故障排除:** [故障排除指南](/docs/guides/troubleshooting)

---

## 快速参考

**您的典型工作流程:**
```bash
# 1. 抓取
skill-seekers scrape https://docs.site.com/ --max-pages 50

# 2. 增强(可选)
skill-seekers enhance output/sitename/

# 3. 打包
skill-seekers package output/sitename/ --target claude

# 4. 上传
skill-seekers upload sitename-claude.zip

# 完成! 🎉
```

**时间估计:**
- 小型技能(10-50 页): 1-2 分钟
- 中型技能(100-200 页): 3-5 分钟
- 大型技能(500+ 页): 15-30 分钟

---

## 下一步

**教程:**
- [抓取文档](/docs/tutorials/scraping-docs) - 完整分步指南
- [分析 GitHub](/docs/tutorials/analyzing-github) - 添加代码分析
- [提取 PDF](/docs/tutorials/extracting-pdfs) - 处理 PDF 文档
- [多源技能](/docs/tutorials/multi-source-skills) - 组合多个来源

**手册:**
- [文档抓取](/docs/manual/scraping/documentation) - 高级技术
- [AI 增强](/docs/manual/enhancement/ai-enhancement) - 深入了解增强
- [多平台支持](/docs/manual/platforms/overview) - 特定平台指南

**CLI 参考:**
- [scrape 命令](/docs/cli/scrape) - 完整命令参考
- [package 命令](/docs/cli/package) - 打包选项
- [upload 命令](/docs/cli/upload) - 上传自动化

---

**有问题?** 提交 issue: https://github.com/yusufkaraaslan/Skill_Seekers/issues
