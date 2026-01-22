---
title: AI 技能标准和最佳实践
description: 为 Claude、Gemini、OpenAI 和通用 LLM 创建跨平台 AI 技能的完整标准，包括质量评分标准和最佳实践
section: reference
order: 1
---

# AI 技能标准和最佳实践（2026）

**版本：** 1.0
**最后更新：** 2026-01-11
**范围：** 适用于 Claude、Gemini、OpenAI 和通用 LLM 的跨平台 AI 技能

## 目录

1. [简介](#简介)
2. [通用标准](#通用标准)
3. [平台特定指南](#平台特定指南)
4. [知识库设计模式](#知识库设计模式)
5. [质量评分标准](#质量评分标准)
6. [常见陷阱](#常见陷阱)
7. [面向未来](#面向未来)

---

## 简介

### 什么是 AI 技能？

**AI 技能**是一个专注的知识包，可增强 AI 代理在特定领域的能力。技能包括：
- **指令**：如何使用知识
- **上下文**：技能适用的时机
- **资源**：参考文档、示例、模式
- **元数据**：发现、版本控制、平台兼容性

### 设计理念

现代 AI 技能遵循三个核心原则：

1. **渐进式披露**：仅在需要时加载信息（元数据 → 指令 → 资源）
2. **上下文经济**：每个令牌都与对话历史竞争
3. **跨平台可移植性**：为开放的 Agent Skills 标准设计

---

## 通用标准

这些标准适用于**所有平台**（Claude、Gemini、OpenAI、通用）。

### 1. 命名约定

**格式**：动名词形式（动词 + -ing）

**原因**：清楚地描述技能提供的活动或能力。

**示例**：
- ✅ "Building React Applications"
- ✅ "Working with Django REST Framework"
- ✅ "Analyzing Godot 4.x Projects"
- ❌ "React Documentation"（被动，不清楚）
- ❌ "Django Guide"（模糊）

**实现**：
```yaml
name: building-react-applications  # kebab-case，动名词形式
description: Building modern React applications with hooks, routing, and state management
```

### 2. 描述字段（对发现至关重要）

**格式**：第三人称、可操作、包括"是什么"和"何时使用"

**原因**：注入系统提示；不一致的视角会导致发现问题。

**结构**：
```
[它做什么]。在[特定触发器/场景]时使用。
```

**示例**：
- ✅ "Building modern React applications with TypeScript, hooks, and routing. Use when implementing React components, managing state, or configuring build tools."
- ✅ "Analyzing Godot 4.x game projects with GDScript patterns. Use when debugging game logic, optimizing performance, or implementing new features in Godot."
- ❌ "I will help you with React"（第一人称，模糊）
- ❌ "Documentation for Django"（无 when 子句）

### 3. 令牌预算（渐进式披露）

**令牌分配**：
- **元数据加载**：约 100 个令牌（YAML 前置元数据 + 描述）
- **完整指令**：<5,000 个令牌（主 SKILL.md，不包括引用）
- **捆绑资源**：仅按需加载

**原因**：令牌效率至关重要——未使用的上下文浪费容量。

**最佳实践**：
```markdown
## Quick Reference
*30 秒概览，包含最常见的模式*

[核心内容 - 3,000-4,500 个令牌]

## Extended Reference
*完整 API 文档请参见 references/api.md*
```

### 4. 简洁性和相关性

**原则**：
- 每句话都必须提供**独特价值**
- 删除冗余、填充和"最好有"的信息
- 优先考虑**可操作**而非**解释性**内容
- 使用渐进式披露：快速参考 → 深入探讨 → 引用

**示例转换**：

**之前**（130 个令牌）：
```
React is a popular JavaScript library for building user interfaces.
It was created by Facebook and is now maintained by Meta and the
open-source community. React uses a component-based architecture
where you build encapsulated components that manage their own state.
```

**之后**（35 个令牌）：
```
Component-based UI library. Build reusable components with local
state, compose them into complex UIs, and efficiently update the
DOM via virtual DOM reconciliation.
```

### 5. 结构和组织

**必需部分**（按顺序）：

```markdown
---
name: skill-name
description: [第三人称的 What + When]
---

# Skill Title

[1-2 句电梯演讲]

## 💡 When to Use This Skill

[3-5 个带触发短语的特定场景]

## ⚡ Quick Reference

[30 秒概览，最常见模式]

## 📝 Code Examples

[真实世界、经过测试、可复制粘贴]

## 🔧 API Reference

[核心 API、签名、参数 - 链接到完整参考]

## 🏗️ Architecture

[关键模式、设计决策、权衡]

## ⚠️ Common Issues

[已知问题、变通方法、注意事项]

## 📚 References

[链接到更深入的文档]
```

**可选部分**：
- Installation
- Configuration
- Testing Patterns
- Migration Guides
- Performance Tips

### 6. 代码示例质量

**标准**：
- **已测试**：来自官方文档、测试套件或生产代码
- **完整**：可复制粘贴，不是片段
- **带注释**：简要说明是什么/为什么，而不是如何（代码显示如何）
- **渐进式**：基础 → 中级 → 高级
- **多样化**：涵盖常见用例（80% 的用户需求）

**格式**：
```markdown
### Example: User Authentication

\```typescript
// Complete working example
import { useState } from 'react';
import { signIn } from './auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  );
}
\```

**Why this works**: Demonstrates state management, event handling, async operations, and TypeScript types in a real-world pattern.
```

### 7. 跨平台兼容性

**文件结构**（开放 Agent Skills 标准）：
```
skill-name/
├── SKILL.md                # 主指令（<5k 令牌）
├── skill.yaml              # 元数据（可选，与 frontmatter 重复）
├── references/             # 按需资源
│   ├── api.md
│   ├── patterns.md
│   ├── examples/
│   │   ├── basic.md
│   │   └── advanced.md
│   └── index.md
└── resources/              # 可选：脚本、配置、模板
    ├── .clinerules
    └── templates/
```

**YAML 前置元数据**（所有平台必需）：
```yaml
---
name: skill-name              # kebab-case，最多 64 个字符
description: >                # What + When，最多 1024 个字符
  Building modern React applications with TypeScript.
  Use when implementing React components or managing state.
version: 1.0.0                # 语义版本控制
platforms:                    # 测试过的平台
  - claude
  - gemini
  - openai
  - markdown
tags:                         # 发现关键词
  - react
  - typescript
  - frontend
  - web
---
```

---

## 平台特定指南

### Claude AI（Agent Skills）

**官方标准**：[Agent Skills Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

**主要区别**：
- **发现**：描述注入系统提示——必须是第三人称
- **令牌限制**：主 SKILL.md 约 5k 令牌（快速加载的硬限制）
- **加载行为**：当描述与用户意图匹配时，Claude 加载技能
- **资源访问**：通过文件读取按需加载引用

**最佳实践**：
- 在部分标题使用表情符号（提高可扫描性）：💡 ⚡ 📝 🔧 🏗️ ⚠️ 📚
- 在描述中包含"触发短语"："when implementing..."、"when debugging..."、"when configuring..."
- 保持快速参考超级简洁（用户首先看到这个）
- 明确链接到引用："See `references/api.md` for complete API"

**示例描述**：
```yaml
description: >
  Building modern React applications with TypeScript, hooks, and routing.
  Use when implementing React components, managing application state,
  configuring build tools, or debugging React applications.
```

### Google Gemini（Actions）

**官方标准**：[Grounding Best Practices](https://ai.google.dev/gemini-api/docs/google-search)

**主要区别**：
- **Grounding**：技能可以利用 Google 搜索获取实时信息
- **Temperature**：保持在 1.0（默认）以获得最佳 grounding 结果
- **格式**：支持 tar.gz 包（不是 ZIP）
- **限制**：Gemini 3 中没有 Maps grounding（如需要则使用 Gemini 2.5）

**Grounding 增强**：
```markdown
## When to Use This Skill

使用此技能当：
- 实现 React 组件（技能提供模式）
- 检查最新 React 版本（grounding 提供当前信息）
- 调试常见错误（技能 + grounding = 全面解决方案）
```

**注意**：截至 2026 年 1 月 5 日，Grounding 成本为每 1,000 次查询 14 美元。

### OpenAI（GPT Actions）

**官方标准**：[Key Guidelines for Custom GPTs](https://help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts)

**主要区别**：
- **多步骤指令**：分解为简单的原子步骤
- **触发器/指令对**：使用分隔符分隔场景
- **彻底性提示**：包括"take your time"、"take a deep breath"、"check your work"
- **不兼容**：GPT-5.1 推理模型尚不支持自定义操作

**格式**：
```markdown
## Instructions

### When user asks about React state management

1. First, identify the state management need (local vs global)
2. Then, recommend appropriate solution:
   - Local state → useState or useReducer
   - Global state → Context API or Redux
3. Provide code example matching their use case
4. Finally, explain trade-offs and alternatives

Take your time to understand the user's specific requirements before recommending a solution.

---

### When user asks about React performance

[Similar structured approach]
```

### 通用 Markdown（平台无关）

**用例**：文档网站、内部维基、非 LLM 工具

**格式**：带最少元数据的标准 markdown

**最佳实践**：关注人类可读性而非令牌经济

---

## 知识库设计模式

现代 AI 技能利用高级 RAG（检索增强生成）模式实现最佳知识交付。

### 1. Agentic RAG（2026+ 推荐）

**模式**：多查询、上下文感知检索与代理编排

**架构**：
```
用户查询 → 代理计划检索 → 多源获取 →
上下文综合 → 响应生成 → 自我验证
```

**优势**：
- **自适应**：代理根据对话上下文调整检索
- **准确**：多查询方法减少幻觉
- **高效**：仅检索当前查询所需的内容

**技能中的实现**：
```markdown
references/
├── index.md              # 导航中心
├── api/                  # API 引用（结构化）
│   ├── components.md
│   ├── hooks.md
│   └── utilities.md
├── patterns/             # 设计模式（按用例）
│   ├── state-management.md
│   └── performance.md
└── examples/             # 代码示例（按复杂度）
    ├── basic/
    ├── intermediate/
    └── advanced/
```

**原因**：代理可以导航结构以找到确切需要的内容。

**来源**：
- [Traditional RAG vs. Agentic RAG - NVIDIA](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/)
- [What is Agentic RAG? - IBM](https://www.ibm.com/think/topics/agentic-rag)

### 2. GraphRAG（高级用例）

**模式**：用于复杂推理的知识图结构

**用例**：大型代码库、互连概念、架构分析

**结构**：
```markdown
references/
├── entities/              # 知识图中的节点
│   ├── Component.md
│   ├── Hook.md
│   └── Context.md
├── relationships/         # 知识图中的边
│   ├── Component-uses-Hook.md
│   └── Context-provides-State.md
└── graph.json            # 机器可读图
```

**优势**：多跳推理、关系探索、复杂查询

**来源**：
- [Emerging Patterns in Building GenAI Products - Martin Fowler](https://martinfowler.com/articles/gen-ai-patterns/)

### 3. 多代理系统（企业规模）

**模式**：不同知识领域的专门代理

**架构**：
```
技能库
├── research-agent-skill/      # 探索信息空间
├── verification-agent-skill/  # 检查事实声明
├── synthesis-agent-skill/     # 组合发现
└── governance-agent-skill/    # 确保合规
```

**用例**：企业工作流、合规要求、多领域专业知识

**来源**：
- [4 Agentic AI Design Patterns - AIMultiple](https://research.aimultiple.com/agentic-ai-design-patterns/)

### 4. 反思模式（质量保证）

**模式**：在最终确定响应之前进行自我评估和改进

**实现**：
```markdown
## Usage Instructions

提供代码示例时：
1. 生成初始示例
2. 根据这些标准进行评估：
   - 完整性（用户可以复制粘贴并运行吗？）
   - 最佳实践（遵循框架约定吗？）
   - 安全性（没有漏洞吗？）
   - 性能（高效模式吗？）
3. 根据评估改进示例
4. 展示最终版本并附上解释
```

**优势**：更高质量的输出、更少的错误、更好地遵守标准

**来源**：
- [4 Agentic AI Design Patterns - AIMultiple](https://research.aimultiple.com/agentic-ai-design-patterns/)

### 5. 向量数据库集成

**模式**：对嵌入进行语义搜索以进行基于概念的检索

**用例**：大型文档集、概念查询、相似性搜索

**结构**：
- 将参考文档存储为嵌入
- 用户查询 → 嵌入 → 相似性搜索 → top-k 检索
- 代理综合检索到的块

**工具**：
- Pinecone、Weaviate、Chroma、Qdrant
- 模型上下文协议（MCP）用于标准化访问

**来源**：
- [Anatomy of an AI agent knowledge base - InfoWorld](https://www.infoworld.com/article/4091400/anatomy-of-an-ai-agent-knowledge-base.html)

---

## 质量评分标准

使用此标准在 **10 分制**上评估 AI 技能质量。

### 类别和权重

| 类别 | 权重 | 描述 |
|----------|--------|-------------|
| **发现和元数据** | 10% | 代理查找和加载技能的容易程度 |
| **简洁性和令牌经济** | 15% | 上下文窗口的高效使用 |
| **结构组织** | 15% | 逻辑流程、渐进式披露 |
| **代码示例质量** | 20% | 经过测试、完整、多样化的示例 |
| **准确性和正确性** | 20% | 事实正确、最新信息 |
| **可操作性** | 10% | 用户可以立即应用知识 |
| **跨平台兼容性** | 10% | 可在 Claude、Gemini、OpenAI 上运行 |

### 详细评分

#### 1. 发现和元数据（10%）

**10/10 - 优秀**：
- ✅ 名称使用动名词形式，清晰具体
- ✅ 描述：第三人称，what + when，<1024 个字符
- ✅ 与用户意图匹配的触发短语
- ✅ 适当的发现标签
- ✅ 存在版本和平台元数据

**7/10 - 良好**：
- ✅ 名称清晰但不是动名词形式
- ✅ 描述有 what + when 但冗长
- ⚠️ 缺少一些触发短语
- ✅ 存在标签

**4/10 - 差**：
- ⚠️ 名称模糊或被动
- ⚠️ 描述缺少"when"子句
- ⚠️ 没有触发短语
- ❌ 缺少标签

**1/10 - 不及格**：
- ❌ 没有元数据或名称难以理解
- ❌ 描述是第一人称或通用

#### 2. 简洁性和令牌经济（15%）

**10/10 - 优秀**：
- ✅ 主 SKILL.md <5,000 个令牌
- ✅ 没有冗余或填充内容
- ✅ 每句话都提供独特价值
- ✅ 渐进式披露（引用按需）
- ✅ 快速参考 <500 个令牌

**7/10 - 良好**：
- ✅ 主 SKILL.md <7,000 个令牌
- ⚠️ 轻微冗余（5-10% 浪费）
- ✅ 大部分内容有价值
- ⚠️ 一些引用内联而不是单独

**4/10 - 差**：
- ⚠️ 主 SKILL.md 7,000-10,000 个令牌
- ⚠️ 显著冗余（20%+ 浪费）
- ⚠️ 冗长的解释、填充词
- ⚠️ 引用组织不佳

**1/10 - 不及格**：
- ❌ 主 SKILL.md >10,000 个令牌
- ❌ 大量冗余、百科全书式内容
- ❌ 没有渐进式披露

#### 3. 结构组织（15%）

**10/10 - 优秀**：
- ✅ 清晰的层次结构：快速参考 → 核心 → 扩展 → 引用
- ✅ 逻辑流程（发现 → 使用 → 深入探讨）
- ✅ 表情符号提高可扫描性
- ✅ 正确使用标题（##、###）
- ✅ 长文档的目录

**7/10 - 良好**：
- ✅ 大部分部分存在
- ⚠️ 流程可以改进
- ✅ 标题使用正确
- ⚠️ 没有表情符号或目录

**4/10 - 差**：
- ⚠️ 缺少关键部分
- ⚠️ 不合逻辑的流程（高级先于基础）
- ⚠️ 标题级别不一致
- ❌ 大段文本，没有结构

**1/10 - 不及格**：
- ❌ 没有结构，单个大块
- ❌ 缺少必需部分

#### 4. 代码示例质量（20%）

**10/10 - 优秀**：
- ✅ 5-10 个示例涵盖 80% 的用例
- ✅ 所有示例经过测试/验证
- ✅ 完整（可复制粘贴）
- ✅ 渐进式复杂度（基础 → 高级）
- ✅ 带简要解释的注释
- ✅ 正确的语言检测
- ✅ 真实世界模式（不是玩具示例）

**7/10 - 良好**：
- ✅ 3-5 个示例
- ✅ 大部分经过测试
- ⚠️ 一些不完整（需要修改）
- ✅ 一些渐进
- ⚠️ 轻注释

**4/10 - 差**：
- ⚠️ 仅 1-2 个示例
- ⚠️ 未测试或损坏的示例
- ⚠️ 片段，不完整
- ⚠️ 所有相同复杂度级别
- ❌ 没有注释

**1/10 - 不及格**：
- ❌ 没有示例或全部损坏
- ❌ 不正确的语言标签
- ❌ 仅玩具示例

#### 5. 准确性和正确性（20%）

**10/10 - 优秀**：
- ✅ 所有信息事实正确
- ✅ 当前最佳实践（2026）
- ✅ 没有已弃用的模式
- ✅ 正确的 API 签名
- ✅ 准确的版本信息
- ✅ 没有幻觉功能

**7/10 - 良好**：
- ✅ 大部分准确
- ⚠️ 1-2 个小错误或过时细节
- ✅ 核心模式正确
- ⚠️ 一些版本歧义

**4/10 - 差**：
- ⚠️ 多个事实错误
- ⚠️ 已弃用模式呈现为当前
- ⚠️ API 签名不正确
- ⚠️ 混合版本

**1/10 - 不及格**：
- ❌ 根本不正确的信息
- ❌ 幻觉 API 或功能
- ❌ 危险或不安全的模式

#### 6. 可操作性（10%）

**10/10 - 优秀**：
- ✅ 用户可以立即应用知识
- ✅ 复杂任务的分步说明
- ✅ 记录常见工作流
- ✅ 故障排除指导
- ✅ 需要时链接到更深资源

**7/10 - 良好**：
- ✅ 大部分任务可操作
- ⚠️ 一些工作流缺少步骤
- ✅ 存在基本故障排除
- ⚠️ 一些死胡同引用

**4/10 - 差**：
- ⚠️ 理论知识，应用不清楚
- ⚠️ 缺少关键步骤
- ❌ 没有故障排除
- ⚠️ 损坏的链接

**1/10 - 不及格**：
- ❌ 纯参考，没有指导
- ❌ 没有外部帮助无法使用信息

#### 7. 跨平台兼容性（10%）

**10/10 - 优秀**：
- ✅ 遵循开放 Agent Skills 标准
- ✅ 可在 Claude、Gemini、OpenAI、Markdown 上运行
- ✅ 没有平台特定依赖
- ✅ 正确的文件结构
- ✅ 有效的 YAML 前置元数据

**7/10 - 良好**：
- ✅ 可在 2-3 个平台上运行
- ⚠️ 需要轻微的平台特定调整
- ✅ 标准结构

**4/10 - 差**：
- ⚠️ 仅在 1 个平台上运行
- ⚠️ 非标准结构
- ⚠️ 无效的 YAML

**1/10 - 不及格**：
- ❌ 平台锁定、专有格式
- ❌ 无法移植

### 总分计算

```
总分 = (发现 × 0.10) +
      (简洁性 × 0.15) +
      (结构 × 0.15) +
      (示例 × 0.20) +
      (准确性 × 0.20) +
      (可操作性 × 0.10) +
      (兼容性 × 0.10)
```

**等级映射**：
- **9.0-10.0**：A+（卓越、参考质量）
- **8.0-8.9**：A（优秀、生产就绪）
- **7.0-7.9**：B（良好、需要轻微改进）
- **6.0-6.9**：C（可接受、需要重大改进）
- **5.0-5.9**：D（差、需要重大返工）
- **0.0-4.9**：F（不及格、不可用）

---

## 常见陷阱

### 1. 百科全书式内容

**问题**：包含有关主题的所有内容，而不是专注于可操作的知识。

**示例**：
```markdown
❌ 不好：
React was created by Jordan Walke, a software engineer at Facebook,
in 2011. It was first deployed on Facebook's newsfeed in 2011 and
later on Instagram in 2012. It was open-sourced at JSConf US in May
2013. Over the years, React has evolved significantly...

✅ 好：
React is a component-based UI library. Build reusable components,
manage state with hooks, and efficiently update the DOM.
```

**修复**：关注**用户需要做什么**，而不是历史或背景。

### 2. 第一人称描述

**问题**：在元数据中使用"I"或"you"（破坏 Claude 发现）。

**示例**：
```yaml
❌ 不好：
description: I will help you build React applications with best practices

✅ 好：
description: Building modern React applications with TypeScript, hooks,
  and routing. Use when implementing components or managing state.
```

**修复**：描述字段始终使用第三人称。

### 3. 令牌浪费

**问题**：冗余解释、冗长措辞或填充内容。

**示例**：
```markdown
❌ 不好（85 个令牌）：
When you are working on a project and you need to manage state in your
React application, you have several different options available to you.
One option is to use the useState hook, which is great for managing
local component state. Another option is to use useReducer, which is
better for more complex state logic.

✅ 好（28 个令牌）：
State management options:
- Local state → useState (simple values)
- Complex logic → useReducer (state machines)
- Global state → Context API or Redux
```

**修复**：使用项目符号、删除填充、关注区别。

### 4. 未测试的示例

**问题**：无法编译或运行的代码示例。

**示例**：
```typescript
❌ 不好：
function Example() {
  const [data, setData] = useState();  // 没有类型，没有初始值
  useEffect(() => {
    fetchData();  // 函数不存在
  });  // 缺少依赖数组
  return <div>{data}</div>;  // TypeScript 错误
}

✅ 好：
interface User {
  id: number;
  name: string;
}

function Example() {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    fetch('/api/user')
      .then(r => r.json())
      .then(setData);
  }, []);  // 空 deps = 运行一次

  return <div>{data?.name ?? 'Loading...'}</div>;
}
```

**修复**：测试所有代码示例，确保它们编译/运行。

### 5. 缺少"何时使用"

**问题**：描述解释了是什么但不是何时使用。

**示例**：
```yaml
❌ 不好：
description: Documentation for React hooks and component patterns

✅ 好：
description: Building React applications with hooks and components.
  Use when implementing UI components, managing state, or optimizing
  React performance.
```

**修复**：始终包含"Use when..."或"Use for..."子句。

### 6. 平面引用结构

**问题**：所有引用在一个文件或目录中，没有组织。

**示例**：
```
❌ 不好：
references/
├── everything.md  (20,000+ 个令牌)

✅ 好：
references/
├── index.md
├── api/
│   ├── components.md
│   └── hooks.md
├── patterns/
│   ├── state-management.md
│   └── performance.md
└── examples/
    ├── basic/
    └── advanced/
```

**修复**：按类别组织，启用代理导航。

### 7. 过时信息

**问题**：包含已弃用的 API 或旧的最佳实践。

**示例**：
```markdown
❌ 不好（在 React 18 中已弃用）：
Use componentDidMount() and componentWillUnmount() for side effects.

✅ 好（截至 2026 年的当前）：
Use useEffect() hook for side effects in function components.
```

**修复**：定期更新技能，包含版本信息。

---

## 面向未来

### 新兴标准（2026-2030）

1. **模型上下文协议（MCP）**：标准化代理访问工具和数据的方式
   - 技能将与 MCP 服务器集成
   - 期望技能元数据中有 MCP 端点

2. **多模态技能**：超越文本（图像、音频、视频）
   - 包含图表引用、视频教程
   - 为具有视觉能力的代理做准备

3. **技能组合**：引用其他技能的技能
   - 模块化架构（React 技能导入 TypeScript 技能）
   - 技能的依赖管理

4. **实时 Grounding**：技能 + 实时数据源
   - Gemini 风格的 grounding 变得普遍
   - 技能提供上下文，grounding 提供当前数据

5. **联合技能库**：去中心化的技能发现
   - GitHub 风格的技能托管
   - 技能的版本控制、拉取请求

### 建议

- **版本化您的技能**：使用语义版本控制（1.0.0、1.1.0、2.0.0）
- **标记平台兼容性**：指定测试过哪些平台/版本
- **记录依赖项**：如果技能引用外部 API 或工具
- **提供迁移指南**：更新主要版本时
- **维护变更日志**：跟踪更改内容和原因

---

## 参考

### 官方文档

- [Claude Agent Skills Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [OpenAI Custom GPT Guidelines](https://help.openai.com/en/articles/9358033-key-guidelines-for-writing-instructions-for-custom-gpts)
- [Google Gemini Grounding Best Practices](https://ai.google.dev/gemini-api/docs/google-search)

### 行业标准

- [Agent Skills: Anthropic's Next Bid to Define AI Standards - The New Stack](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/)
- [Claude Skills and CLAUDE.md: a practical 2026 guide for teams](https://www.gend.co/blog/claude-skills-claude-md-guide)

### 设计模式

- [Emerging Patterns in Building GenAI Products - Martin Fowler](https://martinfowler.com/articles/gen-ai-patterns/)
- [4 Agentic AI Design Patterns - AIMultiple](https://research.aimultiple.com/agentic-ai-design-patterns/)
- [Traditional RAG vs. Agentic RAG - NVIDIA](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/)
- [What is Agentic RAG? - IBM](https://www.ibm.com/think/topics/agentic-rag)

### 知识库架构

- [Anatomy of an AI agent knowledge base - InfoWorld](https://www.infoworld.com/article/4091400/anatomy-of-an-ai-agent-knowledge-base.html)
- [The Next Frontier of RAG: Enterprise Knowledge Systems 2026-2030 - NStarX](https://nstarxinc.com/blog/the-next-frontier-of-rag-how-enterprise-knowledge-systems-will-evolve-2026-2030/)
- [RAG Architecture Patterns For Developers](https://customgpt.ai/rag-architecture-patterns/)

### 社区资源

- [awesome-claude-skills - GitHub](https://github.com/travisvn/awesome-claude-skills)
- [Claude Agent Skills: A First Principles Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)

---

**文档维护**：
- 每季度审查平台更新
- 使用新框架版本更新示例
- 跟踪 AI 代理领域的新兴模式
- 纳入社区反馈

**版本历史**：
- 1.0（2026-01-11）：基于 2026 标准的初始版本
