---
title: "如何提交配置"
description: 验证并提交自定义配置文件到 Skill Seekers 社区的完整指南
section: guides
order: 4
---

# 如何提交配置

了解如何验证并将自定义配置文件提交到官方 Skill Seekers 配置仓库。

---

## 概述

Skill Seekers 社区欢迎任何框架、库或文档站点的配置贡献。您的配置可以帮助其他开发者快速为他们的工具创建 AI 技能。

**您需要准备：**
- 有效的 JSON 配置文件（参见[配置架构参考](/docs/reference/config-schema)）
- GitHub 帐户
- 5-10 分钟

---

## 提交流程

### 1. 创建您的配置

使用[统一格式](/docs/reference/config-schema)创建配置文件：

```json
{
  "name": "your-framework",
  "description": "结合文档和代码库的完整框架知识。",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.yourframework.com",
      "selectors": {
        "main_content": "article",
        "title": "h1",
        "code_blocks": "pre code"
      },
      "rate_limit": 0.5,
      "max_pages": 200
    }
  ]
}
```

**提示：**
- 从[交互模式](/docs/getting-started/first-skill#interactive-mode)开始：`skill-seekers scrape --interactive`
- 使用[现有配置](/configs)作为模板
- 遵循所有字段的[配置架构](/docs/reference/config-schema)

### 2. 测试您的配置

提交前，在本地测试您的配置：

```bash
# 验证配置结构
skill-seekers validate configs/your-framework.json

# 测试抓取
skill-seekers scrape configs/your-framework.json

# 检查输出
ls output/your-framework/
```

**验证：**
- 配置验证无错误
- 抓取成功完成
- 内容正确提取
- 代码块被捕获

### 3. 在线验证

访问 [skillseekersweb.com/configs](https://skillseekersweb.com/configs) 并滚动到验证器：

1. **将您的配置 JSON 粘贴**到文本区域
2. **点击「验证配置」**检查错误
3. **修复出现的任何验证错误**
4. **看到绿色勾选标记时继续提交**

验证器检查：
- 必需字段（name、description、sources）
- 源类型有效性（documentation、github、pdf）
- 字段类型和格式
- URL 模式和选择器

### 4. 提交到 GitHub

验证通过后，有两种提交方法：

#### 方法 A：自动提交（推荐）

1. 验证通过后点击**「提交配置」**按钮
2. 配置自动作为 GitHub issue 提交
3. 您将收到一个链接来跟踪提交
4. 等待审核（通常 24-48 小时）

#### 方法 B：手动提交

如果自动提交不起作用：

1. 复制您的已验证 JSON
2. 访问 [GitHub Issues](https://github.com/yusufkaraaslan/skill-seekers-configs/issues/new)
3. 选择「配置提交」模板
4. 填写：
   - **标题：** `[CONFIG] 您的框架名称`
   - **正文：** 粘贴您的 JSON 配置
5. 添加标签：`config-submission`、`needs-review`
6. 提交 issue

---

## 接下来会发生什么？

### 审核流程

1. **自动检查**（5 分钟）
   - 配置结构验证
   - 源可访问性测试
   - 命名约定检查

2. **人工审核**（24-48 小时）
   - 内容质量检查
   - 抓取测试运行
   - 重复检测
   - 类别分配

3. **批准**（48 小时）
   - 配置添加到[官方仓库](https://github.com/yusufkaraaslan/skill-seekers-configs)
   - 出现在[配置画廊](/configs)中
   - 您的 GitHub 个人资料被列为贡献者

### 审核标准

如果您的配置满足以下条件，将被批准：

✅ 验证无错误
✅ 抓取成功
✅ 提取有意义的内容
✅ 遵循命名约定
✅ 不重复现有配置
✅ 具有准确的选择器
✅ 遵守速率限制

**常见拒绝原因：**
❌ 无效的 JSON 语法
❌ 缺少必需字段
❌ 不正确的选择器（未提取内容）
❌ 与现有配置重复
❌ 速率限制过于激进
❌ URL 损坏或无法访问

---

## 配置类别

配置在画廊中按类别组织：

### Web 框架
React、Vue、Angular、Svelte、Astro 等

### 后端框架
Django、FastAPI、Express、Laravel、Rails 等

### 游戏引擎
Godot、Unity、Unreal 等

### DevOps 工具
Kubernetes、Docker、Ansible、Terraform 等

### 开发工具
Git、VS Code、Claude Code 等

### 移动框架
React Native、Flutter、Ionic 等

### 数据与机器学习
TensorFlow、PyTorch、Pandas 等

### 测试框架
Jest、Pytest、Cypress、Playwright 等

**您的配置适合哪里？** 在提交中提及类别以加快处理速度。

---

## 高级提交技巧

### 多源配置

提交具有多个源的配置时：

```json
{
  "name": "advanced-framework",
  "description": "来自文档、GitHub 和 PDF 手册的完整知识。",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.framework.com"
    },
    {
      "type": "github",
      "repo": "company/framework",
      "enable_codebase_analysis": true,
      "code_analysis_depth": "deep"
    },
    {
      "type": "pdf",
      "path": "https://framework.com/manual.pdf"
    }
  ]
}
```

**在提交中解释：**
- 为什么需要多个源
- 它们如何互补
- 合并策略的理由

### 私有/企业配置

对于私有文档或内部工具：

1. 创建带身份验证要求的配置
2. 提交时注明：「需要身份验证」
3. 提供无凭据的示例
4. 包含设置说明

即使我们无法测试抓取，我们也会批准结构。

### 大型文档站点

对于有 500+ 页的站点：

```json
{
  "max_pages": 500,
  "rate_limit": 1.0,
  "url_patterns": {
    "include": ["/getting-started/", "/api/", "/guides/"],
    "exclude": ["/blog/", "/changelog/", "/community/"]
  }
}
```

**建议：**
- 设置激进的排除规则
- 限制为基本页面
- 使用 `max_pages` 上限
- 更高的速率限制（1-2 秒）

---

## 获取帮助

### 配置不工作？

1. **先在本地测试：** 提交前运行 `skill-seekers scrape`
2. **检查选择器：** 访问示例页面并检查元素
3. **验证 URL：** 确保 `base_url` 可访问
4. **查看日志：** 在抓取输出中查找错误

### 有问题？

- **GitHub 讨论：** [Skill Seekers 讨论](https://github.com/yusufkaraaslan/Skill_Seekers/discussions)
- **GitHub Issues：** [报告问题](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
- **文档：** [配置架构参考](/docs/reference/config-schema)

### 示例配置

浏览 [27+ 预设配置](/configs)获取灵感：
- 简单单源：[Vue](https://github.com/yusufkaraaslan/skill-seekers-configs/blob/main/official/web-frameworks/vue.json)
- 多源：[Astro](https://github.com/yusufkaraaslan/skill-seekers-configs/blob/main/official/web-frameworks/astro.json)
- GitHub 分析：[Godot](https://github.com/yusufkaraaslan/skill-seekers-configs/blob/main/official/game-engines/godot.json)

---

## 社区指南

### 尊重他人
- 遵守网站速率限制
- 不要抓取付费/高级内容
- 遵循 robots.txt 指南
- 注明原始文档来源

### 质量标准
- 提交前测试
- 使用准确的描述
- 选择适当的类别
- 遵循命名约定

### 协作
- 帮助审核其他人的配置
- 提出改进建议
- 报告损坏的配置
- 维护已提交的配置

---

## 认可

贡献者在以下位置得到认可：
- GitHub 仓库贡献者列表
- 配置文件元数据（`submitted_by` 字段）
- 社区排行榜（即将推出）
- 年度贡献者致谢

**顶级贡献者获得：**
- 特殊 GitHub 徽章
- 未来提交的优先审核
- 新功能的早期访问

---

## 快速参考

### 验证清单

提交前，确保：

- [ ] 配置在线验证（绿色勾选标记）
- [ ] 使用 `skill-seekers scrape` 在本地测试
- [ ] 名称为小写并带连字符
- [ ] 描述解释何时使用技能
- [ ] 选择器正确提取内容
- [ ] 速率限制合理（0.5-2.0 秒）
- [ ] 没有现有配置的重复
- [ ] 类别有意义（如果多源）

### 提交 URL

- **验证：** [skillseekersweb.com/configs](/configs)
- **画廊：** [skillseekersweb.com/configs](/configs)
- **提交 Issue：** [GitHub Issues](https://github.com/yusufkaraaslan/skill-seekers-configs/issues/new)
- **跟踪状态：** 提交期间创建的 GitHub issue

---

## 另见

- [配置架构参考](/docs/reference/config-schema) - 完整字段文档
- [创建自定义配置教程](/docs/tutorials/creating-configs) - 分步指南
- [配置画廊](/configs) - 浏览 27+ 预设配置
- [故障排除](/docs/guides/troubleshooting) - 常见配置问题

---

**有问题？** 打开 [GitHub 讨论](https://github.com/yusufkaraaslan/Skill_Seekers/discussions)或 [Issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)。
