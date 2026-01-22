---
title: 统一多源抓取
description: 将文档、GitHub 仓库和 PDF 组合成单个全面技能，具有智能冲突检测和合并功能
section: manual
subsection: scraping
order: 13
---

# 统一多源抓取

**版本：** 2.0（截至 2025 年 10 月功能完整）

## 概述

统一多源抓取允许您将来自多个源的知识组合成一个全面的 Claude 技能。您现在可以提取并智能合并来自所有源的信息，而不是在文档、GitHub 仓库或 PDF 手册之间进行选择。

## 为什么需要统一抓取？

**问题**：文档和代码经常随着时间的推移而分离。官方文档可能已过时，缺少代码中存在的功能，或记录已删除的功能。分别抓取文档和代码会创建两个不完整的技能。

**解决方案**：统一抓取：
- 从多个源（文档、GitHub、PDF）提取信息
- **检测冲突** 在文档和实际代码实现之间
- **智能合并** 冲突信息并保持透明
- **突出显示差异** 使用内联警告（⚠️）
- 创建一个显示完整图景的单一全面技能

## 快速开始

### 1. 创建统一配置

创建具有多个源的配置文件：

```json
{
  "name": "react",
  "description": "来自文档 + 代码库的完整 React 知识",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://react.dev/",
      "extract_api": true,
      "max_pages": 200
    },
    {
      "type": "github",
      "repo": "facebook/react",
      "include_code": true,
      "code_analysis_depth": "surface",
      "max_issues": 100
    }
  ]
}
```

### 2. 抓取和构建

```bash
python3 cli/unified_scraper.py --config configs/react_unified.json
```

该工具将：
1. ✅ **阶段 1**：抓取所有源（文档 + GitHub）
2. ✅ **阶段 2**：检测源之间的冲突
3. ✅ **阶段 3**：智能合并冲突
4. ✅ **阶段 4**：构建具有冲突透明度的统一技能

### 3. 打包和上传

```bash
python3 cli/package_skill.py output/react/
```

## 配置格式

### 统一配置结构

```json
{
  "name": "skill-name",
  "description": "何时使用此技能",
  "merge_mode": "rule-based|claude-enhanced",
  "sources": [
    {
      "type": "documentation|github|pdf",
      ...源特定字段...
    }
  ]
}
```

### 文档源

```json
{
  "type": "documentation",
  "base_url": "https://docs.example.com/",
  "extract_api": true,
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "url_patterns": {
    "include": [],
    "exclude": ["/blog/"]
  },
  "categories": {
    "getting_started": ["intro", "tutorial"],
    "api": ["api", "reference"]
  },
  "rate_limit": 0.5,
  "max_pages": 200
}
```

### GitHub 源

```json
{
  "type": "github",
  "repo": "owner/repo",
  "github_token": "ghp_...",
  "include_issues": true,
  "max_issues": 100,
  "include_changelog": true,
  "include_releases": true,
  "include_code": true,
  "code_analysis_depth": "surface|deep|full",
  "file_patterns": [
    "src/**/*.js",
    "lib/**/*.ts"
  ]
}
```

**代码分析深度**：
- `surface`（默认）：基本结构，无代码分析
- `deep`：提取类/函数签名、参数、返回类型
- `full`：完整的 AST 分析（昂贵）

### PDF 源

```json
{
  "type": "pdf",
  "path": "/path/to/manual.pdf",
  "extract_tables": false,
  "ocr": false,
  "password": "optional-password"
}
```

## 冲突检测

统一抓取器自动检测 4 种类型的冲突：

### 1. 文档中缺失

**严重性**：中等
**描述**：API 存在于代码中但未记录

**示例**：
```python
# 代码有此方法：
def move_local_x(self, delta: float, snap: bool = False) -> None:
    """沿局部 X 轴移动节点"""

# 但文档没有提到它
```

**建议**：为此 API 添加文档

### 2. 代码中缺失

**严重性**：高
**描述**：API 已记录但在代码库中未找到

**示例**：
```python
# 文档说：
def rotate(angle: float) -> None

# 但代码没有此函数
```

**建议**：更新文档以删除此 API，或将其添加到代码库

### 3. 签名不匹配

**严重性**：中高
**描述**：API 在两者中都存在但签名不同

**示例**：
```python
# 文档说：
def move_local_x(delta: float)

# 代码有：
def move_local_x(delta: float, snap: bool = False)
```

**建议**：更新文档以匹配实际签名

### 4. 描述不匹配

**严重性**：低
**描述**：不同的描述/文档字符串

## 合并模式

### 基于规则的合并（默认）

使用预定义规则进行快速、确定性的合并：

1. **如果 API 仅在文档中** → 包含带 `[DOCS_ONLY]` 标签
2. **如果 API 仅在代码中** → 包含带 `[UNDOCUMENTED]` 标签
3. **如果两者完全匹配** → 正常包含
4. **如果存在冲突** → 优先使用代码签名，保留文档描述

**何时使用**：
- 快速合并（< 1 秒）
- 自动化工作流程
- 您不需要人工监督

**示例**：
```bash
python3 cli/unified_scraper.py --config config.json --merge-mode rule-based
```

### Claude 增强合并

使用本地 Claude Code 进行 AI 驱动的协调：

1. 使用 Claude Code 打开新终端
2. 提供冲突上下文和说明
3. Claude 分析并创建协调的 API 参考
4. 人类可以在最终确定之前审查和调整

**何时使用**：
- 需要判断的复杂冲突
- 您想要最高质量的合并
- 您有时间进行人工监督

**示例**：
```bash
python3 cli/unified_scraper.py --config config.json --merge-mode claude-enhanced
```

## 技能输出结构

统一抓取器创建此结构：

```
output/skill-name/
├── SKILL.md                     # 带合并 API 的主技能文件
├── references/
│   ├── documentation/           # 文档参考
│   │   └── index.md
│   ├── github/                  # GitHub 参考
│   │   ├── README.md
│   │   ├── issues.md
│   │   └── releases.md
│   ├── pdf/                     # PDF 参考（如果适用）
│   │   └── index.md
│   ├── api/                     # 合并的 API 参考
│   │   └── merged_api.md
│   └── conflicts.md             # 详细的冲突报告
├── scripts/                     # 空（用于用户脚本）
└── assets/                      # 空（用于用户资产）
```

### SKILL.md 格式

```markdown
# React

结合官方文档和 React 代码库见解的完整 React 知识库。

## 📚 源

此技能结合了来自多个源的知识：

- ✅ **文档**：https://react.dev/
  - 页数：200
- ✅ **GitHub 仓库**：facebook/react
  - 代码分析：surface
  - 问题：100

## ⚠️ 数据质量

**检测到 5 个冲突** 在源之间。

**冲突细分：**
- missing_in_docs：3
- missing_in_code：2

请参阅 `references/conflicts.md` 获取详细的冲突信息。

## 🔧 API 参考

*从文档和代码分析合并*

### ✅ 已验证的 API

*文档和代码一致*

#### `useState(initialValue)`

...

### ⚠️ 有冲突的 API

*文档和代码不同*

#### `useEffect(callback, deps?)`

⚠️ **冲突**：文档签名与代码实现不同

**文档说：**
```
useEffect(callback: () => void, deps: any[])
```

**代码实现：**
```
useEffect(callback: () => void | (() => void), deps?: readonly any[])
```

*源：both*

---
```

## 示例

### 示例 1：React（文档 + GitHub）

```json
{
  "name": "react",
  "description": "完整的 React 框架知识",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://react.dev/",
      "extract_api": true,
      "max_pages": 200
    },
    {
      "type": "github",
      "repo": "facebook/react",
      "include_code": true,
      "code_analysis_depth": "surface"
    }
  ]
}
```

### 示例 2：Django（文档 + GitHub）

```json
{
  "name": "django",
  "description": "完整的 Django 框架知识",
  "merge_mode": "rule-based",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.djangoproject.com/en/stable/",
      "extract_api": true,
      "max_pages": 300
    },
    {
      "type": "github",
      "repo": "django/django",
      "include_code": true,
      "code_analysis_depth": "deep",
      "file_patterns": [
        "django/db/**/*.py",
        "django/views/**/*.py"
      ]
    }
  ]
}
```

### 示例 3：混合源（文档 + GitHub + PDF）

```json
{
  "name": "godot",
  "description": "完整的 Godot 引擎知识",
  "merge_mode": "claude-enhanced",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.godotengine.org/en/stable/",
      "extract_api": true,
      "max_pages": 500
    },
    {
      "type": "github",
      "repo": "godotengine/godot",
      "include_code": true,
      "code_analysis_depth": "deep"
    },
    {
      "type": "pdf",
      "path": "/path/to/godot_manual.pdf",
      "extract_tables": true
    }
  ]
}
```

## 命令参考

### 统一抓取器

```bash
# 基本用法
python3 cli/unified_scraper.py --config configs/react_unified.json

# 覆盖合并模式
python3 cli/unified_scraper.py --config configs/react_unified.json --merge-mode claude-enhanced

# 使用缓存数据（跳过重新抓取）
python3 cli/unified_scraper.py --config configs/react_unified.json --skip-scrape
```

## MCP 集成

统一抓取器与 MCP 完全集成。`scrape_docs` 工具自动检测统一与传统配置，并路由到适当的抓取器。

```python
# MCP 工具用法
{
  "name": "scrape_docs",
  "arguments": {
    "config_path": "configs/react_unified.json",
    "merge_mode": "rule-based"  # 可选覆盖
  }
}
```

该工具将：
1. 自动检测统一格式
2. 路由到 `unified_scraper.py`
3. 应用指定的合并模式
4. 返回全面的输出

## 向后兼容性

**传统配置仍然有效！** 系统自动检测传统单源配置并路由到原始 `doc_scraper.py`。

```json
// 传统配置（仍然有效）
{
  "name": "react",
  "base_url": "https://react.dev/",
  ...
}

// 自动检测为传统格式
// 路由到 doc_scraper.py
```

## 架构

### 组件

1. **config_validator.py**：验证统一和传统配置
2. **code_analyzer.py**：以可配置的深度提取代码签名
3. **conflict_detector.py**：检测源之间的 API 冲突
4. **merge_sources.py**：实现基于规则和 Claude 增强的合并
5. **unified_scraper.py**：主协调器
6. **unified_skill_builder.py**：生成最终技能结构
7. **skill_seeker_mcp/server.py**：具有自动检测的 MCP 集成

### 数据流

```
统一配置
     ↓
ConfigValidator（验证格式）
     ↓
UnifiedScraper.run()
     ↓
┌────────────────────────────────────┐
│ 阶段 1：抓取所有源                  │
│  - 文档 → doc_scraper              │
│  - GitHub → github_scraper         │
│  - PDF → pdf_scraper               │
└────────────────────────────────────┘
     ↓
┌────────────────────────────────────┐
│ 阶段 2：检测冲突                    │
│  - ConflictDetector                │
│  - 比较文档 API 与代码 API          │
│  - 按类型和严重性分类               │
└────────────────────────────────────┘
     ↓
┌────────────────────────────────────┐
│ 阶段 3：合并源                      │
│  - RuleBasedMerger（快速）         │
│  - 或 ClaudeEnhancedMerger（AI）   │
│  - 创建统一的 API 参考              │
└────────────────────────────────────┘
     ↓
┌────────────────────────────────────┐
│ 阶段 4：构建技能                    │
│  - UnifiedSkillBuilder             │
│  - 生成带冲突的 SKILL.md            │
│  - 创建参考结构                     │
│  - 生成冲突报告                     │
└────────────────────────────────────┘
     ↓
统一技能（.zip 就绪）
```

## 最佳实践

### 1. 从基于规则的合并开始

基于规则的合并快速且适用于大多数情况。只有在需要人工监督时才使用 Claude 增强。

### 2. 使用表面级代码分析

`code_analysis_depth: "surface"` 通常就足够了。深度分析昂贵且很少需要。

### 3. 限制 GitHub 问题

`max_issues: 100` 是一个很好的默认值。超过 200 个问题很少增加价值。

### 4. 对文件模式要具体

```json
"file_patterns": [
  "src/**/*.js",     // 好：特定路径
  "lib/**/*.ts"
]

// 不推荐：
"file_patterns": ["**/*.js"]  // 太宽泛，慢
```

### 5. 监控冲突报告

始终查看 `references/conflicts.md` 以了解源之间的差异。

## 故障排除

### 未检测到冲突

**可能原因**：
- 文档源中的 `extract_api: false`
- GitHub 源中的 `include_code: false`
- 代码分析未找到 API（检查 `code_analysis_depth`）

**解决方案**：确保两个源都启用了 API 提取

### 冲突太多

**可能原因**：
- 模糊匹配阈值太严格
- 文档使用不同的命名约定
- 旧文档版本

**解决方案**：手动审查冲突并调整合并策略

### 合并时间太长

**可能原因**：
- 使用 `code_analysis_depth: "full"`（非常慢）
- 文件模式太多
- 大型仓库

**解决方案**：
- 使用 `"surface"` 或 `"deep"` 分析
- 缩小文件模式
- 增加 `rate_limit`

## 未来增强

计划的功能：
- [ ] 自动冲突解决策略
- [ ] 跨版本的冲突趋势分析
- [ ] 多版本比较（文档 v1 与 v2）
- [ ] 自定义合并规则 DSL
- [ ] 冲突置信度分数

## 下一步

- [三流架构](/docs/features/three-stream-architecture) - 多源架构概述
- [PDF 抓取](/docs/features/pdf-scraping) - PDF 提取功能
- [GitHub 抓取](/docs/cli/github) - GitHub 仓库抓取
- [AI 增强](/docs/features/ai-enhancement) - AI 驱动的改进

---

**更新日志**

**v2.0（2025 年 10 月）**：统一多源抓取功能完整
- ✅ 统一格式的配置验证
- ✅ 使用 AST 解析的深度代码分析
- ✅ 冲突检测（4 种类型，3 个严重级别）
- ✅ 基于规则的合并
- ✅ Claude 增强合并
- ✅ 具有内联冲突警告的统一技能构建器
- ✅ 具有自动检测的 MCP 集成
- ✅ 与传统配置的向后兼容性
- ✅ 全面的测试和文档
