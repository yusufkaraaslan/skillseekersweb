---
title: 为 Skill Seekers 做贡献
description: 为 Skill Seekers 做贡献的完整指南 - 分支工作流、开发设置、测试、编码标准和拉取请求流程
section: community
order: 1
---

# 为 Skill Seekers 做贡献

首先，感谢您考虑为 Skill Seekers 做贡献！正是像您这样的人使 Skill Seekers 成为如此出色的工具。

## 目录

- [分支工作流](#分支工作流)
- [行为准则](#行为准则)
- [我如何贡献？](#我如何贡献)
- [开发设置](#开发设置)
- [拉取请求流程](#拉取请求流程)
- [编码标准](#编码标准)
- [测试](#测试)
- [文档](#文档)

---

## 分支工作流

**⚠️ 重要：** Skill Seekers 使用两分支工作流。

### 分支结构

```
main（生产）
  ↑
  │（仅维护者合并）
  │
development（集成）← PR 的默认分支
  ↑
  │（所有贡献者 PR 到这里）
  │
功能分支
```

### 分支

- **`main`** - 生产分支
  - 始终稳定
  - 仅接收维护者从 `development` 的合并
  - 受保护：需要测试 + 1 个审查

- **`development`** - 集成分支
  - **所有 PR 的默认分支**
  - 活跃开发在这里进行
  - 受保护：需要测试通过
  - 由维护者合并到 `main`

- **功能分支** - 您的工作
  - 从 `development` 创建
  - 描述性命名（例如，`add-github-scraping`）
  - 通过 PR 合并回 `development`

### 工作流示例

```bash
# 1. Fork 并克隆
git clone https://github.com/YOUR_USERNAME/Skill_Seekers.git
cd Skill_Seekers

# 2. 添加上游
git remote add upstream https://github.com/yusufkaraaslan/Skill_Seekers.git

# 3. 从 development 创建功能分支
git checkout development
git pull upstream development
git checkout -b my-feature

# 4. 进行更改、提交、推送
git add .
git commit -m "Add my feature"
git push origin my-feature

# 5. 创建针对 'development' 分支的 PR
```

---

## 行为准则

本项目和参与其中的每个人都致力于营造开放和欢迎的环境。请在所有互动中保持尊重和建设性。

---

## 我如何贡献？

### 报告错误

在创建错误报告之前，请检查[现有 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues) 以避免重复。

创建错误报告时，包括：
- **清晰的标题和描述**
- **重现问题的步骤**
- **预期行为** vs 实际行为
- **截图**（如果适用）
- **环境详细信息**（操作系统、Python 版本等）
- **错误消息**和堆栈跟踪

**示例：**
```markdown
**错误：** 当配置没有类别时 MCP 工具失败

**重现步骤：**
1. 创建空类别的配置：`"categories": {}`
2. 运行 `skill-seekers scrape --config configs/test.json`
3. 查看错误

**预期：** 应该使用自动推断的类别
**实际：** 崩溃并显示 KeyError

**环境：**
- OS: Ubuntu 22.04
- Python: 3.10.5
- 版本：v3.0.0
```

### 建议增强功能

增强建议作为 [GitHub issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues) 跟踪。

包括：
- 描述增强功能的**清晰标题**
- 建议功能的**详细描述**
- 将从此增强中受益的**用例**
- 它如何工作的**示例**
- **考虑的替代方案**

### 添加新的框架配置

我们欢迎新的框架配置！要添加一个：

1. 在 `configs/` 中创建配置文件
2. 使用不同的页面计数彻底测试
3. 提交包含以下内容的 PR：
   - 配置文件
   - 框架的简要描述
   - 测试结果（抓取的页面数、找到的类别）

**示例 PR：**
```markdown
**添加 Svelte 文档配置**

添加 Svelte 文档（https://svelte.dev/docs）的配置。

- 配置：`configs/svelte.json`
- 使用 max_pages 测试：100
- 成功分类：getting_started、components、api、advanced
- 可用总页数：约 150
```

### 拉取请求

我们积极欢迎您的拉取请求！

**⚠️ 重要：** 所有 PR 必须针对 `development` 分支，而不是 `main`。

1. Fork 仓库并从 `development` 创建分支
2. 如果您添加了代码，请添加测试
3. 如果您更改了 API，请更新文档
4. 确保测试套件通过
5. 确保您的代码遵循我们的编码标准
6. 向 `development` 分支发出拉取请求！

---

## 开发设置

### 先决条件

- Python 3.10 或更高版本（MCP 集成所需）
- Git

### 设置步骤

1. **Fork 并克隆仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Skill_Seekers.git
   cd Skill_Seekers
   ```

2. **安装依赖项**
   ```bash
   pip install -e ".[dev,test]"
   ```

3. **从 development 创建功能分支**
   ```bash
   git checkout development
   git pull upstream development
   git checkout -b feature/my-awesome-feature
   ```

4. **进行更改**
   ```bash
   # 编辑文件...
   ```

5. **运行测试**
   ```bash
   pytest
   ```

6. **提交更改**
   ```bash
   git add .
   git commit -m "Add awesome feature"
   ```

7. **推送到您的 fork**
   ```bash
   git push origin feature/my-awesome-feature
   ```

8. **创建拉取请求**

---

## 拉取请求流程

### 提交之前

- [ ] 测试在本地通过（`pytest`）
- [ ] 代码遵循 PEP 8 样式指南
- [ ] 如果需要，文档已更新
- [ ] CHANGELOG.md 已更新（如果适用）
- [ ] 提交消息清晰且具有描述性

### PR 模板

```markdown
## 描述
此 PR 的简要描述。

## 更改类型
- [ ] 错误修复（修复问题的非破坏性更改）
- [ ] 新功能（添加功能的非破坏性更改）
- [ ] 破坏性更改（导致现有功能无法按预期工作的修复或功能）
- [ ] 文档更新

## 如何测试？
描述您运行以验证更改的测试。

## 检查清单
- [ ] 我的代码遵循本项目的样式指南
- [ ] 我已对自己的代码进行自我审查
- [ ] 我已在难以理解的区域注释我的代码
- [ ] 我已对文档进行相应的更改
- [ ] 我的更改不会产生新的警告
- [ ] 我已添加证明我的修复有效或我的功能有效的测试
- [ ] 新的和现有的单元测试在我的更改下在本地通过
```

### 审查流程

1. 维护者将在 3-5 个工作日内审查您的 PR
2. 解决任何反馈或请求的更改
3. 获得批准后，维护者将合并您的 PR
4. 您的贡献将包含在下一个版本中！

---

## 编码标准

### Python 样式指南

我们遵循 [PEP 8](https://www.python.org/dev/peps/pep-0008/)，并进行一些修改：

- **行长度：** 100 个字符（不是 79）
- **缩进：** 4 个空格
- **引号：** 字符串使用双引号
- **命名：**
  - 函数/变量：`snake_case`
  - 类：`PascalCase`
  - 常量：`UPPER_SNAKE_CASE`

### 代码组织

```python
# 1. 标准库导入
import os
import sys
from pathlib import Path

# 2. 第三方导入
import requests
from bs4 import BeautifulSoup

# 3. 本地应用程序导入
from skill_seekers.cli.utils import open_folder

# 4. 常量
MAX_PAGES = 1000
DEFAULT_RATE_LIMIT = 0.5

# 5. 函数和类
def my_function():
    """描述此函数的 docstring。"""
    pass
```

### 文档

- 所有函数都应该有 docstring
- 在适当的地方使用类型提示
- 为复杂逻辑添加注释

```python
def scrape_page(url: str, selectors: dict) -> dict:
    """
    抓取单个页面并提取内容。

    Args:
        url: 要抓取的 URL
        selectors: CSS 选择器字典

    Returns:
        包含提取内容的字典

    Raises:
        RequestException: 如果无法获取页面
    """
    pass
```

---

## 测试

### 运行测试

```bash
# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_mcp_server.py

# 使用覆盖率运行
pytest --cov=skill_seekers --cov-report=html
```

### 编写测试

- 测试放在 `tests/` 目录中
- 测试文件应以 `test_` 开头
- 使用描述性测试名称

```python
def test_config_validation_with_missing_fields():
    """测试当缺少必需字段时配置验证失败。"""
    config = {"name": "test"}  # 缺少 base_url
    result = validate_config(config)
    assert result is False
```

### 测试覆盖率

- 目标是 >80% 代码覆盖率
- 关键路径应该有 100% 覆盖率
- 为错误修复添加测试以防止回归

---

## 文档

### 在哪里记录

- **README.md** - 概述、快速入门、基本用法
- **docs/** - 详细指南和教程
- **CHANGELOG.md** - 所有显著更改
- **代码注释** - 复杂逻辑和不明显的决策

### 文档风格

- 使用清晰、简单的语言
- 包含代码示例
- 为 UI 相关功能添加截图
- 随代码更改保持最新

---

## 项目结构

```
Skill_Seekers/
├── src/
│   └── skill_seekers/
│       ├── cli/              # CLI 工具
│       │   ├── doc_scraper.py
│       │   ├── package_skill.py
│       │   └── utils.py
│       └── mcp/              # MCP 服务器
│           ├── server.py
│           └── tools/
├── configs/                  # 框架配置
├── docs/                     # 文档
├── tests/                    # 测试套件
└── pyproject.toml           # 项目配置
```

---

## 发布流程

发布由维护者管理：

1. 更新相关文件中的版本
2. 更新 CHANGELOG.md
3. 创建并推送版本标签
4. GitHub Actions 将创建发布
5. 在相关渠道上宣布

---

## 有问题？

- 💬 [打开讨论](https://github.com/yusufkaraaslan/Skill_Seekers/discussions)
- 🐛 [报告错误](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
- 📧 联系：yusufkaraaslan.yk@pm.me

---

## 认可

贡献者将在以下地方得到认可：
- README.md 贡献者部分
- 每个版本的 CHANGELOG.md
- GitHub 贡献者页面

感谢您为 Skill Seekers 做出贡献！🎉
