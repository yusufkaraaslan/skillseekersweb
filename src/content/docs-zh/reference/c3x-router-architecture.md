---
title: 三流 GitHub 架构（C3.x 路由器）
description: 大型文档的三流 GitHub 架构完整指南 - 结合代码分析、文档抓取和 GitHub 洞察以及路由器生成
section: reference
order: 2
---

# 三流 GitHub 架构（C3.x 路由器）

**处理大型代码库和文档的三流 GitHub 架构模式的完整指南。**

## 概述

**三流 GitHub 架构**（也称为 **C3.x 路由器架构**）是一种从具有大量文档和代码库的大型项目创建全面 AI 技能的模式。它不是仅抓取文档或仅抓取代码库，而是将 **三个独立的知识流** 组合成一个具有智能路由的统一技能。

**版本：** v2.6.0（阶段 1-5 完成！）

**关键创新：** 每个流独立抓取，然后路由器技能根据用户的问题智能地引导 Claude 到正确的子技能。

---

## 三个流

### 流 1：代码分析（C3.x 代码库）

**目的：** 从 GitHub 仓库中提取代码结构、模式和实现细节

**命令：**
```bash
skill-seekers-codebase path/to/repo/ \
  --output output/project-code/ \
  --extract-patterns \
  --extract-test-examples \
  --build-how-to-guides
```

**提取内容：**
- 项目结构和组织
- 使用的设计模式
- 测试示例（5 个类别）
- 来自测试工作流的操作指南
- 配置模式
- 架构概述

**输出：** `output/project-code/SKILL.md` + 参考

---

### 流 2：文档抓取

**目的：** 从项目网站提取官方文档

**命令：**
```bash
skill-seekers scrape --config configs/project-docs.json
```

**提取内容：**
- API 参考
- 用户指南
- 教程
- 概念解释
- 官方示例

**输出：** `output/project-docs/SKILL.md` + 参考

---

### 流 3：GitHub 洞察

**目的：** 从 GitHub 提取社区知识、issues、讨论和 changelog

**命令：**
```bash
skill-seekers github owner/repo \
  --output output/project-github/ \
  --include-issues \
  --max-issues 200 \
  --include-changelog \
  --include-releases
```

**提取内容：**
- README 和项目概述
- Issues（错误、功能请求、讨论）
- Releases 和 changelog
- 社区洞察
- 已知问题和变通方法

**输出：** `output/project-github/SKILL.md` + 参考

---

## 路由器技能生成

创建三个流技能后，生成一个路由器技能，智能地将查询引导到正确的子技能。

### 自动路由器生成

```bash
# 从现有技能生成路由器
skill-seekers router \
  output/project-code/ \
  output/project-docs/ \
  output/project-github/ \
  --output output/project-router/ \
  --name "project-complete"
```

**路由器的功能：**
1. 接收用户问题
2. 分析问题意图
3. 路由到适当的子技能
4. 返回全面的答案

---

## 路由器 SKILL.md 结构

生成的路由器技能具有此结构：

```markdown
---
name: project-complete
description: 完整的项目知识 - 智能地将问题路由到代码、文档或 GitHub 洞察
---

# 项目完整路由器

您是项目生态系统的智能路由助手。

## 您的子技能

您可以访问三个专门的子技能：

### 1. project-code（代码库分析）
**何时使用：** 实现细节、代码模式、架构
**包含：**
- 项目结构
- 设计模式
- 测试示例
- 操作指南

### 2. project-docs（官方文档）
**何时使用：** API 参考、官方指南、教程
**包含：**
- API 文档
- 用户指南
- 官方示例

### 3. project-github（GitHub 洞察）
**何时使用：** 社区知识、issues、已知问题
**包含：**
- README
- Issues 和讨论
- Changelog 和 releases

## 路由策略

对于每个用户问题：

1. **分析意图**
   - 实现/代码问题 → project-code
   - API/使用问题 → project-docs
   - 问题/issue 问题 → project-github

2. **路由到适当的子技能**
   - 对于专注的问题使用一个技能
   - 对于全面的问题使用多个技能

3. **综合答案**
   - 如果需要，组合多个流的信息
   - 提供来源归属

## 路由示例

**用户：** "如何实现身份验证？"
→ **路由到：** project-docs（API 参考）+ project-code（实现模式）

**用户：** "为什么功能 X 无法工作？"
→ **路由到：** project-github（已知问题）+ project-docs（使用指南）

**用户：** "代码库中使用了哪些设计模式？"
→ **路由到：** project-code（模式检测）

**用户：** "版本 2.0 中有什么变化？"
→ **路由到：** project-github（changelog）+ project-docs（迁移指南）
```

---

## 完整工作流

### 步骤 1：创建三个流技能

```bash
# 流 1：代码分析
skill-seekers-codebase path/to/repo/ \
  --output output/project-code/

# 流 2：文档
skill-seekers scrape --config configs/project-docs.json

# 流 3：GitHub 洞察
skill-seekers github owner/repo \
  --output output/project-github/ \
  --include-issues \
  --max-issues 200
```

### 步骤 2：生成路由器技能

```bash
skill-seekers router \
  output/project-code/ \
  output/project-docs/ \
  output/project-github/ \
  --output output/project-router/ \
  --name "project-complete"
```

### 步骤 3：打包路由器 + 子技能

```bash
# 将所有技能打包在一起
skill-seekers package output/project-router/ \
  --include-subskills \
  --target claude
```

**结果：** `project-complete.zip` 包含：
- 路由器技能（SKILL.md）
- project-code 子技能
- project-docs 子技能
- project-github 子技能

### 步骤 4：上传到 Claude

```bash
skill-seekers upload project-complete.zip --target claude
```

---

## 架构优势

### 1. 关注点分离

每个流专注于一个知识领域：
- **代码流：** 实现细节
- **文档流：** 官方指南
- **GitHub 流：** 社区知识

### 2. 独立更新

在不影响其他流的情况下更新任何流：
```bash
# 仅重新抓取文档
skill-seekers scrape --config configs/project-docs.json

# 重新生成路由器（自动检测更改）
skill-seekers router output/*/ --output output/project-router/
```

### 3. 智能路由

路由器分析用户意图并路由到正确的知识源。

### 4. 全面覆盖

结合官方文档 + 代码实际 + 社区洞察以获得完整知识。

### 5. 令牌效率

每个问题仅加载相关的子技能，而不是一次加载所有知识。

---

## 用例

### 用例 1：大型框架（React、Vue、Angular）

**挑战：** 官方文档 + 1M+ 行代码 + 10K+ issues

**解决方案：**
```bash
# 流 1：代码模式
skill-seekers-codebase react/ --output output/react-code/

# 流 2：官方文档
skill-seekers scrape --config configs/react-docs.json

# 流 3：GitHub 洞察
skill-seekers github facebook/react --output output/react-github/ --max-issues 500

# 路由器
skill-seekers router output/react-*/ --output output/react-router/ --name "react-complete"
```

### 用例 2：内部公司项目

**挑战：** 私有代码库 + Confluence 文档 + JIRA issues

**解决方案：**
```bash
# 流 1：代码分析
skill-seekers-codebase company-app/ --output output/app-code/

# 流 2：Confluence 文档（通过 PDF 导出或网页抓取）
skill-seekers scrape --config configs/confluence-docs.json

# 流 3：JIRA 导出（JSON）
skill-seekers github-json jira-export.json --output output/app-issues/

# 路由器
skill-seekers router output/app-*/ --output output/app-router/ --name "company-app-complete"
```

### 用例 3：开源库

**挑战：** 小型代码库 + 出色的文档 + 活跃的社区

**解决方案：**
```bash
# 所有三个流
skill-seekers unified --config configs/library-unified.json

# 路由器自动生成
# （如果有多个源，统一模式会自动创建路由器）
```

---

## 路由器配置

### 自定义路由规则

创建 `router_config.json` 以自定义路由行为：

```json
{
  "name": "project-complete",
  "description": "完整的项目知识路由器",
  "sub_skills": [
    {
      "name": "project-code",
      "path": "output/project-code/",
      "keywords": ["实现", "代码", "模式", "架构"],
      "priority": 2
    },
    {
      "name": "project-docs",
      "path": "output/project-docs/",
      "keywords": ["api", "使用", "教程", "指南"],
      "priority": 1
    },
    {
      "name": "project-github",
      "path": "output/project-github/",
      "keywords": ["issue", "bug", "问题", "changelog"],
      "priority": 3
    }
  ],
  "routing_strategy": "multi-skill-when-needed",
  "default_skill": "project-docs"
}
```

**用法：**
```bash
skill-seekers router --config router_config.json --output output/project-router/
```

---

## 高级功能

### 1. 多技能路由

对于复杂问题，路由到多个子技能：

```markdown
**用户：** "如何实现身份验证以及有哪些常见问题？"

**路由器决策：**
1. 路由到 project-docs（身份验证 API）
2. 路由到 project-code（实现模式）
3. 路由到 project-github（已知的身份验证问题）

**综合答案：** 结合所有三个视角
```

### 2. 基于置信度的路由

路由器可以表达置信度并相应路由：

```markdown
**高置信度：** 路由到单个最佳子技能
**中等置信度：** 路由到前 2 个子技能
**低置信度：** 路由到所有子技能并综合
```

### 3. 后备路由

如果问题不清楚地匹配任何子技能：

```markdown
**策略：**
1. 首先尝试 project-docs（最通用）
2. 如果没有好的答案，尝试 project-code
3. 如果仍然没有好的答案，尝试 project-github
```

---

## 性能指标

**Godot 引擎示例**（三流架构）：

| 指标 | 单个技能 | 三流路由器 |
|--------|--------------|---------------------|
| **准确性** | 75% | 92% |
| **令牌使用** | 每次查询约 50K | 每次查询约 15K |
| **响应时间** | 15-20 秒 | 5-8 秒 |
| **覆盖率** | 仅文档 | 文档 + 代码 + 社区 |
| **相关性** | 中等 | 高 |

**为什么更好：**
- 更准确（路由到正确的知识源）
- 更快（仅加载所需的子技能）
- 更全面（结合多个知识源）

---

## 故障排除

### 问题：路由器总是路由到同一个子技能

**原因：** 子技能描述太相似或路由关键字重叠

**解决方案：**
1. 使子技能描述更加独特
2. 为每个子技能添加特定的路由关键字
3. 检查 router_config.json 中的关键字冲突

### 问题：路由器不路由到任何子技能

**原因：** 用户问题不匹配任何路由模式

**解决方案：**
1. 在 router_config.json 中添加 default_skill
2. 使用更广泛的路由关键字
3. 实施后备策略

### 问题：令牌使用过多

**原因：** 路由器不必要地加载多个子技能

**解决方案：**
1. 收紧路由规则（更具体的关键字）
2. 使用单技能优先路由策略
3. 减少子技能参考文件数

---

## 最佳实践

### 1. 清晰的子技能分离

每个子技能应该有一个 **明确的目的**：
- ✅ 好：代码（实现）、文档（API）、github（issues）
- ❌ 差：通用（所有内容）、杂项（不清楚）

### 2. 描述性名称

使用清晰、描述性的子技能名称：
- ✅ 好：`react-codebase`、`react-docs`、`react-community`
- ❌ 差：`skill1`、`react-a`、`react-misc`

### 3. 路由关键字

选择 **清楚区分** 每个子技能的关键字：
- 代码：实现、模式、架构、结构
- 文档：api、使用、教程、指南、参考
- GitHub：issue、bug、问题、changelog、release

### 4. 定期更新

根据需要独立更新流：
```bash
# 每月：重新抓取文档
skill-seekers scrape --config configs/project-docs.json

# 每周：更新 GitHub 洞察
skill-seekers github owner/repo --output output/project-github/

# 根据需要：重新分析代码
skill-seekers-codebase path/to/repo/ --output output/project-code/

# 重新生成路由器
skill-seekers router output/*/ --output output/project-router/
```

---

## 下一步

- [统一多源抓取](/zh/docs/features/unified-scraping) - 三流的替代方案（单个命令）
- [大型文档处理](/zh/docs/reference/large-documentation) - 10K+ 页的拆分策略
- [技能架构指南](/zh/docs/reference/skill-architecture) - 技能的分层和拆分
- [GitHub 抓取](/zh/docs/cli/github) - GitHub 仓库抓取选项

---

**状态**：✅ 生产就绪（v2.6.0 - 三流架构完成！）

发现问题或有建议？[打开 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
