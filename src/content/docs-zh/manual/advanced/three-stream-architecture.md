---
title: 三流 GitHub 架构
description: 将 GitHub 仓库拆分为代码、文档和洞察流，以创建全面的 AI 技能
section: manual
subsection: advanced
order: 1
---

# 三流 GitHub 架构

**v2.6.0 新增**

三流架构是分析 GitHub 仓库的革命性方法，将其拆分为三个不同的流：代码、文档和洞察。这为 Claude AI 提供了对任何框架或库的完整理解。

## 什么是三流架构？

Skill Seekers 现在将 GitHub 仓库智能地拆分为三个独立的流，而不是将其视为单个整体源：

```
GitHub 仓库
  ↓
三流获取器
  ├─ 流 1：代码 → C3.x 分析（模式、示例）
  ├─ 流 2：文档 → README/docs/*.md（官方文档）
  └─ 流 3：洞察 → 常见问题 + 解决方案
```

## 三流解释

### 流 1：代码分析

对实际代码库的深度 C3.x 分析：

- **设计模式** - 检测架构模式（策略、工厂、单例等）
- **测试示例** - 从测试文件中提取真实的工作示例
- **操作指南** - 从代码模式生成教程
- **配置文件** - 分析 9 种配置格式
- **架构** - 映射整体系统设计

**时间：** 20-60 分钟（取决于仓库大小）

### 流 2：文档

来自仓库的官方文档：

- **README.md** - 快速入门指南和概述
- **CONTRIBUTING.md** - 开发指南
- **docs/** - 所有 markdown 文档文件
- **CHANGELOG.md** - 版本历史

**时间：** 1-2 分钟

### 流 3：GitHub 洞察

来自 GitHub 的社区知识：

- **开放问题** - 用户面临的常见问题
- **已关闭问题** - 已知解决方案
- **标签** - 主题分类
- **统计** - 星标、分叉、活动级别

**时间：** 1-2 分钟

## 为什么需要三流？

### 完整知识

**之前（单流）：**
- ❌ 仅代码或文档
- ❌ 无用户问题
- ❌ 无社区解决方案

**之后（三流）：**
- ✅ 代码实现（它做什么）
- ✅ 官方文档（它应该做什么）
- ✅ 真实用户问题（什么会出错）
- ✅ 已知解决方案（如何修复）

### 冲突检测

架构自动检测文档和代码不一致的情况：

```python
# 文档说：
GoogleProvider(app_id="...", app_secret="...")

# 但代码实际使用：
GoogleProvider(client_id="...", client_secret="...")
```

Skill Seekers 创建显示两个版本并带有警告的混合内容。

### 真实世界问题

从 GitHub 问题中，Claude 学习：

- 什么最让用户困惑
- 常见的设置问题
- 已知的变通方法
- 版本之间的破坏性更改

## 使用示例

### 基本三流分析

```bash
# 使用所有三个流分析 GitHub 仓库
skill-seekers unified \
  --repo-url https://github.com/facebook/react \
  --depth c3x \
  --fetch-github-metadata \
  --output-dir output/react
```

### 使用配置文件

```json
{
  "name": "react",
  "description": "完整 GitHub 分析的 React 框架",
  "sources": [
    {
      "type": "codebase",
      "source": "https://github.com/facebook/react",
      "analysis_depth": "c3x",
      "fetch_github_metadata": true,
      "split_docs": true,
      "max_issues": 100
    }
  ]
}
```

**结果：**
- ✅ 使用 C3.x 分析的代码
- ✅ 提取的 README 和文档
- ✅ 分析的前 100 个问题
- ✅ 所有数据合并到全面的技能

## 分析深度模式

### 基本模式（1-2 分钟）

```bash
skill-seekers unified \
  --repo-url https://github.com/fastapi/fastapi \
  --depth basic \
  --fetch-github-metadata
```

**包括：**
- 文件结构
- 导入关系
- 入口点
- GitHub 元数据
- 热门问题

**用于：** 快速概述、测试、小项目

### C3.x 模式（20-60 分钟）

```bash
skill-seekers unified \
  --repo-url https://github.com/fastapi/fastapi \
  --depth c3x \
  --fetch-github-metadata
```

**包括：**
- 基本模式的所有内容
- C3.1：设计模式（检测到数百个）
- C3.2：测试示例（真实工作代码）
- C3.3：操作指南（从模式生成）
- C3.4：配置分析（9 种格式）
- C3.7：架构模式

**用于：** 生产技能、全面理解

## 带三流的多源

将文档网站与 GitHub 分析结合：

```json
{
  "name": "fastapi",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://fastapi.tiangolo.com/",
      "max_pages": 200
    },
    {
      "type": "codebase",
      "source": "https://github.com/fastapi/fastapi",
      "analysis_depth": "c3x",
      "fetch_github_metadata": true,
      "max_issues": 100
    }
  ],
  "merge_mode": "conflict_detection"
}
```

**结果：** 官方文档 + 代码分析 + GitHub 洞察的完整组合

## 输出结构

```
output/react/
├── SKILL.md                          # 主技能文件（增强）
├── ARCHITECTURE.md                   # 新增：架构概述
├── references/
│   ├── documentation/                # 来自流 2
│   │   ├── README.md
│   │   ├── CONTRIBUTING.md
│   │   └── docs/
│   ├── codebase_analysis/            # 来自流 1（C3.x）
│   │   ├── patterns/                 # C3.1：设计模式
│   │   │   ├── strategy_patterns.md
│   │   │   └── factory_patterns.md
│   │   ├── examples/                 # C3.2：测试示例
│   │   │   ├── useState_examples.md
│   │   │   └── useEffect_examples.md
│   │   ├── guides/                   # C3.3：操作指南
│   │   │   ├── authentication.md
│   │   │   └── state_management.md
│   │   ├── configuration/            # C3.4：配置分析
│   │   │   └── webpack_configs.md
│   │   └── architecture/             # C3.7：架构
│   │       └── component_hierarchy.md
│   └── github_insights/              # 来自流 3
│       ├── common_issues.md
│       ├── known_solutions.md
│       └── community_stats.md
└── scripts/                          # 空（用于用户脚本）
```

## 真实世界结果

**测试案例：FastAPI（fastmcp 仓库）**

### 流 1：代码分析（C3.x）
- **905 个模式实例** 检测
- **206 个策略模式**（OAuth 提供商）
- **142 个工厂模式**（提供商创建）
- **87 个装饰器模式**（异步工具）
- **67 个操作指南** 生成
- **14 种配置格式** 分析

### 流 2：文档
- README.md（2,847 行）
- CONTRIBUTING.md（156 行）
- docs/ 目录（23 个文件）
- API 参考
- 示例和教程

### 流 3：GitHub 洞察
- 分析的前 100 个问题
- 识别的常见问题模式
- 已知解决方案
- 社区统计（4.2k 星标，312 分叉）

**总结：**
- 创建了包含 892 个唯一页面的技能
- 质量：9/10（全面）
- 时间：42 分钟

## 冲突检测示例

从 fastmcp 分析中：

```markdown
## GoogleProvider 配置

⚠️ **冲突检测**：文档和代码使用不同的参数名称。

### 文档版本：
\`\`\`python
GoogleProvider(
    app_id="your-app-id",
    app_secret="your-app-secret"
)
\`\`\`

### 代码实现：
\`\`\`python
GoogleProvider(
    client_id="your-client-id",
    client_secret="your-client-secret"
)
\`\`\`

**推荐：** 使用代码实现（client_id/client_secret）。
文档可能已过时。

*来源：代码分析 + 文档比较*
```

## 性能

| 仓库大小 | 基本模式 | C3.x 模式 | 完整（C3.x + Insights） |
|----------|----------|-----------|------------------------|
| 小（<100 个文件） | 30秒 | 3-5 分钟 | 4-6 分钟 |
| 中（100-1000 个文件） | 1 分钟 | 15-25 分钟 | 17-27 分钟 |
| 大（1000+ 个文件） | 2 分钟 | 40-60 分钟 | 42-62 分钟 |

## 最佳实践

### 1. 从基本模式开始

```bash
# 快速概述（1-2 分钟）
skill-seekers unified \
  --repo-url https://github.com/org/repo \
  --depth basic
```

### 2. 使用 C3.x 用于生产技能

```bash
# 全面分析（20-60 分钟）
skill-seekers unified \
  --repo-url https://github.com/org/repo \
  --depth c3x \
  --fetch-github-metadata
```

### 3. 限制问题数量

```bash
# 仅分析前 50 个问题
skill-seekers unified \
  --repo-url https://github.com/org/repo \
  --depth c3x \
  --max-issues 50
```

### 4. 组合文档 + 代码

```json
{
  "sources": [
    {"type": "documentation", "base_url": "https://docs.framework.dev"},
    {"type": "codebase", "source": "https://github.com/org/framework", "analysis_depth": "c3x"}
  ]
}
```

## 故障排除

### 问题：C3.x 分析太慢

**解决方案：**
- 使用 `--depth basic` 进行快速概述
- 限制文件模式：`--file-patterns "src/**/*.py"`
- 在较小的仓库上测试

### 问题：未检测到冲突

**原因：**
- 文档和代码使用相同的命名
- 未找到 API 引用
- 代码分析深度太浅

**解决方案：**
- 使用 `--depth c3x`
- 确保 `split_docs: true`
- 检查输出日志

### 问题：GitHub 速率限制

**解决方案：**
```bash
# 设置 GitHub 令牌
export GITHUB_TOKEN=ghp_...

# 重试分析
skill-seekers unified --repo-url https://github.com/org/repo
```

## 下一步

**教程：**
- [分析 GitHub 仓库](/docs/tutorials/analyzing-github) - 分步教程
- [多源技能](/docs/tutorials/multi-source-skills) - 组合文档 + 代码

**手册：**
- [C3.x 代码库分析](/docs/manual/codebase-analysis/c3x-codebase-analysis) - 深度 C3.x 指南
- [统一抓取](/docs/manual/scraping/unified) - 多源配置

**CLI 参考：**
- [unified 命令](/docs/cli/unified) - 完整命令参考

---

**状态**：✅ 生产就绪（v2.6.0+）

发现问题或有建议？[提出问题](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
