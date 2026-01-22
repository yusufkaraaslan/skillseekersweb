---
title: Claude AI 集成技术参考
description: 将 Skill Seekers 与 Claude AI 集成的完整技术参考，包括技能格式、API 使用、MCP 集成和开发工作流
section: reference
order: 3
---

# Claude AI 集成技术参考

**创建、打包和部署技能到 Claude AI 的完整技术指南。**

## 概述

Skill Seekers 被设计为 Claude AI 的 **官方技能创建工具包**。本指南涵盖技术架构、文件格式、API 集成和开发工作流。

**版本：** v2.6.0（三流 GitHub 架构 - 阶段 1-5 完成！）

---

## 技能文件格式

### SKILL.md 结构

Claude AI 技能使用 **带有 YAML frontmatter 的 Markdown 文件**：

```markdown
---
name: skill-name
description: 何时使用此技能（1-2 句）
tags:
  - tag1
  - tag2
custom_instructions: |
  可选：Claude 使用此技能时的特定指令
---

# 技能名称

技能的综合文档...

## 快速参考

关键 API、命令或概念...

## 示例

实用的代码示例...

## 参考

官方文档链接...
```

### Frontmatter 字段

| 字段 | 必需 | 描述 |
|-------|----------|-------------|
| `name` | ✅ 是 | 技能标识符（小写，连字符） |
| `description` | ✅ 是 | 何时使用此技能（显示在 Claude UI 中） |
| `tags` | ❌ 可选 | 分类标签 |
| `custom_instructions` | ❌ 可选 | 特定行为指令 |
| `version` | ❌ 可选 | 技能版本（例如，"1.0.0"） |
| `author` | ❌ 可选 | 技能创建者 |

---

## 包结构

### 标准包（ZIP）

```
skill-name.zip
├── SKILL.md                    # 主技能文件
├── references/                 # 支持文档
│   ├── api/
│   │   └── api-reference.md
│   ├── guides/
│   │   └── getting-started.md
│   └── examples/
│       └── code-examples.md
├── scripts/                    # 可选的辅助脚本
│   └── setup.sh
└── assets/                     # 可选的图像/图表
    └── architecture.png
```

**创建：**
```bash
skill-seekers package output/skill-name/ --target claude
```

**结果：** `skill-name.zip`（Claude AI 格式）

### 路由器包（多技能）

```
project-router.zip
├── SKILL.md                    # 路由器技能
├── sub-skills/
│   ├── project-code/
│   │   ├── SKILL.md
│   │   └── references/
│   ├── project-docs/
│   │   ├── SKILL.md
│   │   └── references/
│   └── project-github/
│       ├── SKILL.md
│       └── references/
└── metadata.json               # 包元数据
```

**创建：**
```bash
skill-seekers router output/*/ --output output/project-router/
skill-seekers package output/project-router/ --include-subskills
```

---

## Claude AI Skills API

### 手动上传（浏览器）

1. 访问 [Claude.ai](https://claude.ai/)
2. 导航到 **技能** 部分
3. 点击 **创建技能**
4. 上传 `skill-name.zip`
5. 在对话中测试

### 程序化上传（API）

**注意：** 官方 Skills API 正在开发中。目前推荐手动上传。

**未来 API（计划中）：**
```python
from anthropic import Anthropic

client = Anthropic(api_key="sk-ant-...")

# 上传技能
skill = client.skills.create(
    file=open("skill-name.zip", "rb"),
    name="skill-name",
    description="何时使用此技能"
)

print(f"Skill ID: {skill.id}")
```

---

## 开发工作流

### 1. 从文档创建技能

```bash
# 抓取文档
skill-seekers scrape --config configs/react.json

# 结果：output/react/SKILL.md + references/
```

### 2. AI 增强（可选）

```bash
# 使用 Claude Code Max（免费、本地模式）
skill-seekers enhance output/react/ --enhance-local

# 或使用 API 模式（需要 ANTHROPIC_API_KEY）
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --enhance
```

### 3. 为 Claude 打包

```bash
skill-seekers package output/react/ --target claude
# 结果：react.zip
```

### 4. 上传到 Claude AI

```bash
# 手动上传（推荐）
# 1. 访问 claude.ai/skills
# 2. 上传 react.zip

# 或使用 MCP 工具（如果可用）
skill-seekers upload react.zip --target claude
```

---

## MCP 集成

### Skill Seekers MCP 服务器

**18 个技能开发工具：**

**设置：**
```bash
# 安装
pip install skill-seekers[mcp]

# 添加到 Claude Desktop 配置
# 文件：~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
# 文件：%APPDATA%/Claude/claude_desktop_config.json (Windows)

{
  "mcpServers": {
    "skill-seekers": {
      "command": "uvx",
      "args": ["skill-seekers-mcp"]
    }
  }
}
```

**重启 Claude Desktop** 以激活 MCP 工具。

### 可用的 MCP 工具

**文档抓取：**
1. `scrape_docs` - 抓取文档网站
2. `scrape_github` - 抓取 GitHub 仓库
3. `scrape_pdf` - 从 PDF 文件提取
4. `unified_scrape` - 多源抓取

**技能管理：**
5. `package_skill` - 为平台打包技能
6. `upload_skill` - 上传到 Claude/Gemini/OpenAI
7. `enhance_skill` - AI 增强
8. `validate_skill` - 验证技能结构

**代码库分析（C3.x）：**
9. `analyze_codebase` - 完整代码库分析
10. `extract_patterns` - 设计模式检测
11. `extract_test_examples` - 测试示例提取
12. `build_how_to_guides` - 生成教程

**Git 配置源：**
13. `add_git_source` - 添加基于 git 的配置
14. `list_git_sources` - 列出源
15. `remove_git_source` - 删除源
16. `fetch_git_sources` - 获取更新

**实用工具：**
17. `list_presets` - 显示可用预设
18. `get_preset` - 获取预设配置

### 在 Claude 中使用 MCP 工具

**示例对话：**

```
您：从官方文档创建 React 技能

Claude：我将使用 MCP 工具创建 React 技能。

[Claude 调用 scrape_docs 工具]
{
  "config_path": "configs/react.json"
}

[抓取完成]

[Claude 调用 package_skill 工具]
{
  "skill_dir": "output/react",
  "target": "claude"
}

完成！我已创建 react.zip。您可以将其上传到 claude.ai/skills。
```

---

## 三流 GitHub 架构

用于具有大型代码库和文档的大型项目。

### 架构概述

```
┌─────────────────────────────────────────────────────┐
│ 路由器技能（智能查询路由）                           │
│ - 分析用户问题                                       │
│ - 路由到适当的子技能                                 │
│ - 综合全面的答案                                     │
└─────────────────────────────────────────────────────┘
         │
         ├──────────────┬──────────────┬──────────────┐
         │              │              │              │
         ▼              ▼              ▼              ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ 代码流         │ │ 文档流         │ │ GitHub 流      │
│ (C3.x)         │ │ (抓取器)       │ │ (Issues 等)    │
│                │ │                │ │                │
│ - 结构         │ │ - API 参考     │ │ - README       │
│ - 模式         │ │ - 指南         │ │ - Issues       │
│ - 测试         │ │ - 教程         │ │ - Changelog    │
│ - 操作指南     │ │ - 示例         │ │ - Releases     │
└────────────────┘ └────────────────┘ └────────────────┘
```

### 实现

```bash
# 流 1：代码分析
skill-seekers-codebase react/ --output output/react-code/

# 流 2：文档
skill-seekers scrape --config configs/react-docs.json

# 流 3：GitHub 洞察
skill-seekers github facebook/react --output output/react-github/

# 生成路由器
skill-seekers router output/react-*/ --output output/react-router/ --name "react-complete"

# 打包所有
skill-seekers package output/react-router/ --include-subskills --target claude
```

**另请参阅：** [三流 GitHub 架构](/zh/docs/reference/c3x-router-architecture)

---

## 测试和验证

### 本地测试

**上传到 Claude 之前：**

```bash
# 1. 验证技能结构
skill-seekers validate output/react/

# 预期输出：
# ✅ SKILL.md 存在
# ✅ Frontmatter 有效
# ✅ 名称字段存在
# ✅ 描述字段存在
# ✅ 参考目录存在
# ✅ 没有损坏的链接
# ✅ 令牌数：45,231（在限制内）

# 2. 在本地使用 Claude Code 测试
cd output/react/
cat SKILL.md | claude --stdin "解释 React hooks"
```

### 质量检查

**打包前运行：**

```bash
# 检查令牌数
skill-seekers validate output/react/ --check-tokens

# 验证链接
skill-seekers validate output/react/ --check-links

# 检查格式
skill-seekers validate output/react/ --check-format
```

---

## 平台特定功能

### Claude AI 独有功能

**1. 自定义指令**

```yaml
---
name: react
description: React 框架文档
custom_instructions: |
  在回答 React 问题时：
  1. 始终优先使用函数组件而不是类组件
  2. 推荐基于 hooks 的状态管理
  3. 尽可能使用 TypeScript 示例
  4. 为复杂示例显示 JavaScript 和 TypeScript 变体
---
```

**2. 子技能（路由器模式）**

Claude AI 支持带有智能路由的分层技能。

**3. 对话上下文**

技能可以访问对话历史并在多个回合中保持上下文。

---

## 高级配置

### 技能元数据（metadata.json）

用于包信息的可选元数据文件：

```json
{
  "name": "react",
  "version": "18.2.0",
  "author": "Skill Seekers",
  "created": "2025-01-14T12:00:00Z",
  "updated": "2025-01-14T12:00:00Z",
  "platform": "claude",
  "description": "完整的 React 框架知识",
  "tags": ["react", "javascript", "frontend", "framework"],
  "token_count": 45231,
  "file_count": 24,
  "source_url": "https://react.dev/",
  "enhancement_applied": true,
  "enhancement_mode": "local"
}
```

**在打包期间自动生成。**

### 自定义打包脚本

**创建自定义包布局：**

```python
from skill_seekers.packaging import SkillPackager

packager = SkillPackager(
    skill_dir="output/react",
    target="claude"
)

# 自定义包
packager.add_file("custom-guide.md", "references/guides/")
packager.exclude_pattern("*.tmp")
packager.set_metadata({
    "author": "Your Name",
    "custom_field": "value"
})

# 构建包
packager.build("react-custom.zip")
```

---

## 令牌预算指南

### Claude AI 令牌限制

| 层级 | 上下文窗口 | 推荐技能大小 |
|------|----------------|------------------------|
| **免费** | 200K 令牌 | < 50K 令牌/技能 |
| **专业版** | 200K 令牌 | < 100K 令牌/技能 |
| **API** | 200K 令牌 | < 100K 令牌/技能 |

**最佳实践：**
- 将主 SKILL.md 保持在 20K 令牌以下
- 使用 references/ 存放详细文档
- 将大型技能拆分为路由器 + 子技能
- 对 100K+ 文档使用智能分块

**另请参阅：** [大型文档处理](/zh/docs/reference/large-documentation)

---

## 技能发现

### Claude 如何找到您的技能

Claude AI 根据以下内容将技能匹配到对话：

1. **技能描述** - 主要匹配信号
2. **标签** - 次要分类
3. **SKILL.md 内容** - 关键字匹配
4. **用户选择** - 手动技能激活

**优化发现：**

```yaml
---
name: react
description: 用于 React 框架问题 - hooks、组件、状态管理、路由、测试
tags:
  - react
  - javascript
  - jsx
  - frontend
  - web-development
  - hooks
  - components
---
```

---

## 故障排除

### 问题：技能未出现在 Claude 中

**可能原因：**
- 描述太笼统
- 缺少必需的 frontmatter 字段
- ZIP 损坏

**解决方案：**
1. 验证技能：`skill-seekers validate output/skill/`
2. 检查描述是否具体明确
3. 重新打包：`skill-seekers package output/skill/ --target claude`

### 问题：技能提供过时信息

**原因：** 自技能创建以来文档已更改

**解决方案：**
```bash
# 重新抓取文档
skill-seekers scrape --config configs/project.json

# 重新增强（可选）
skill-seekers enhance output/project/ --enhance-local

# 重新打包并重新上传
skill-seekers package output/project/ --target claude
```

### 问题：超出令牌限制

**原因：** 技能对 Claude 上下文窗口来说太大

**解决方案：**
```bash
# 使用路由器模式拆分技能
skill-seekers router output/project/ --max-tokens 50000
```

**另请参阅：** [技能架构指南](/zh/docs/reference/skill-architecture)

---

## 下一步

- [AI 技能标准](/zh/docs/reference/ai-skill-standards) - 所有平台的最佳实践
- [三流架构](/zh/docs/reference/c3x-router-architecture) - 大型项目模式
- [多 LLM 支持](/zh/docs/features/multi-llm-support) - 平台比较
- [MCP 设置指南](/zh/docs/guides/mcp-setup) - 安装 MCP 集成

---

**状态**：✅ 生产就绪（v2.6.0）

发现问题或有建议？[打开 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
