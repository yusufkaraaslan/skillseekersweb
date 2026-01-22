---
title: 测试示例提取（C3.2）
description: 通过提取 9 种编程语言中的真实 API 使用模式，将测试文件转换为文档资产
section: manual
subsection: codebase-analysis
order: 7
---

# 测试示例提取（C3.2）

**通过提取真实 API 使用模式将测试文件转换为文档资产**

## 概述

测试示例提取器分析测试文件以自动提取有意义的使用示例，展示：

- **对象实例化**：真实的参数值和配置
- **方法调用**：预期行为和返回值
- **配置示例**：有效的配置字典
- **设置模式**：来自 setUp() 方法和 pytest fixtures 的初始化
- **多步骤工作流**：集成测试序列

### 支持的语言（9 种）

| 语言 | 提取方法 | 支持的功能 |
|----------|------------------|-------------------|
| **Python** | 基于 AST（深度） | 所有类别，高准确性 |
| JavaScript | 正则表达式模式 | 实例化、断言、配置 |
| TypeScript | 正则表达式模式 | 实例化、断言、配置 |
| Go | 正则表达式模式 | 表测试、断言 |
| Rust | 正则表达式模式 | 测试宏、断言 |
| Java | 正则表达式模式 | JUnit 模式 |
| C# | 正则表达式模式 | xUnit 模式 |
| PHP | 正则表达式模式 | PHPUnit 模式 |
| Ruby | 正则表达式模式 | RSpec 模式 |

## 快速开始

### CLI 用法

```bash
# 从目录提取
skill-seekers extract-test-examples tests/ --language python

# 从单个文件提取
skill-seekers extract-test-examples --file tests/test_scraper.py

# JSON 输出
skill-seekers extract-test-examples tests/ --json > examples.json

# Markdown 输出
skill-seekers extract-test-examples tests/ --markdown > examples.md

# 按置信度过滤
skill-seekers extract-test-examples tests/ --min-confidence 0.7

# 限制每个文件的示例数
skill-seekers extract-test-examples tests/ --max-per-file 5
```

### MCP 工具用法

```python
# 从 Claude Code
extract_test_examples(directory="tests/", language="python")

# 单文件 JSON 输出
extract_test_examples(file="tests/test_api.py", json=True)

# 仅高置信度
extract_test_examples(directory="tests/", min_confidence=0.7)
```

### 代码库集成

```bash
# 与代码库分析结合
skill-seekers analyze --directory . --extract-test-examples
```

## 输出格式

### JSON 架构

```json
{
  "total_examples": 42,
  "examples_by_category": {
    "instantiation": 15,
    "method_call": 12,
    "config": 8,
    "setup": 4,
    "workflow": 3
  },
  "examples_by_language": {
    "Python": 42
  },
  "avg_complexity": 0.65,
  "high_value_count": 28,
  "examples": [
    {
      "example_id": "a3f2b1c0",
      "test_name": "test_database_connection",
      "category": "instantiation",
      "code": "db = Database(host=\"localhost\", port=5432)",
      "language": "Python",
      "description": "Instantiate Database: Test database connection",
      "expected_behavior": "self.assertTrue(db.connect())",
      "setup_code": null,
      "file_path": "tests/test_db.py",
      "line_start": 15,
      "line_end": 15,
      "complexity_score": 0.6,
      "confidence": 0.85,
      "tags": ["unittest"],
      "dependencies": ["unittest", "database"]
    }
  ]
}
```

### Markdown 格式

```markdown
# Test Example Extraction Report

**Total Examples**: 42
**High Value Examples** (confidence > 0.7): 28
**Average Complexity**: 0.65

## Examples by Category

- **instantiation**: 15
- **method_call**: 12
- **config**: 8
- **setup**: 4
- **workflow**: 3

## Extracted Examples

### test_database_connection

**Category**: instantiation
**Description**: Instantiate Database: Test database connection
**Expected**: self.assertTrue(db.connect())
**Confidence**: 0.85
**Tags**: unittest

```python
db = Database(host="localhost", port=5432)
```

*Source: tests/test_db.py:15*
```

## 提取类别

### 1. 实例化

**提取**：使用真实参数创建对象

```python
# 测试中的示例
db = Database(
    host="localhost",
    port=5432,
    user="admin",
    password="secret"
)
```

**用例**：显示有效的初始化参数

### 2. 方法调用

**提取**：方法调用后跟断言

```python
# 测试中的示例
response = api.get("/users/1")
assert response.status_code == 200
```

**用例**：演示预期行为

### 3. 配置

**提取**：配置字典（2+ 个键）

```python
# 测试中的示例
config = {
    "debug": True,
    "database_url": "postgresql://localhost/test",
    "cache_enabled": False
}
```

**用例**：显示有效的配置示例

### 4. 设置

**提取**：setUp() 方法和 pytest fixtures

```python
# setUp 中的示例
self.client = APIClient(api_key="test-key")
self.client.connect()
```

**用例**：演示初始化序列

### 5. 工作流

**提取**：多步骤集成测试（3+ 步）

```python
# 工作流示例
user = User(name="John", email="john@example.com")
user.save()
user.verify()
session = user.login(password="secret")
assert session.is_active
```

**用例**：显示完整的使用模式

## 质量过滤

### 置信度评分（0.0 - 1.0）

- **实例化**：0.8（高 - 清晰的对象创建）
- **方法调用 + 断言**：0.85（非常高 - 行为已证明）
- **配置字典**：0.75（良好 - 清晰的配置）
- **工作流**：0.9（优秀 - 完整模式）

### 自动过滤

**移除**：
- 琐碎的模式：`assertTrue(True)`、`assertEqual(1, 1)`
- 仅模拟代码：`Mock()`、`MagicMock()`
- 太短：< 20 个字符
- 空构造函数：没有参数的 `MyClass()`

**可调整的阈值**：
```bash
# 仅高置信度（0.7+）
--min-confidence 0.7

# 允许较低置信度用于发现
--min-confidence 0.4
```

## 用例

### 1. 增强的文档

**问题**：文档通常缺少真实的使用示例

**解决方案**：从工作测试中提取示例

```bash
# 为 SKILL.md 生成示例
skill-seekers extract-test-examples tests/ --markdown >> SKILL.md
```

### 2. API 理解

**问题**：新开发者难以理解 API 使用

**解决方案**：展示 API 实际上是如何测试的

### 3. 教程生成

**问题**：创建分步指南很耗时

**解决方案**：使用工作流示例作为教程步骤

### 4. 配置示例

**问题**：有效配置不清楚

**解决方案**：从测试中提取配置字典

## 架构

### 核心组件

```
TestExampleExtractor（编排器）
├── PythonTestAnalyzer（基于 AST）
│   ├── extract_from_test_class()
│   ├── extract_from_test_function()
│   ├── _find_instantiations()
│   ├── _find_method_calls_with_assertions()
│   ├── _find_config_dicts()
│   └── _find_workflows()
├── GenericTestAnalyzer（基于正则表达式）
│   └── PATTERNS（每种语言的正则表达式）
└── ExampleQualityFilter
    ├── filter()
    └── _is_trivial()
```

### 数据流

1. **查找测试文件**：Glob 模式（test_*.py、*_test.go 等）
2. **检测语言**：文件扩展名映射
3. **提取示例**：
   - Python → PythonTestAnalyzer（AST）
   - 其他 → GenericTestAnalyzer（正则表达式）
4. **应用质量过滤**：移除琐碎模式
5. **限制每个文件**：按置信度排名前 N
6. **生成报告**：JSON 或 Markdown

## 限制

### 当前范围

- **Python**：基于完整 AST 的提取（所有类别）
- **其他语言**：基于正则表达式（限于常见模式）
- **重点**：仅测试文件（非生产代码）
- **复杂度**：简单到中等的测试模式

### 未提取

- 复杂的模拟设置
- 参数化测试（部分支持）
- 嵌套的辅助函数
- 动态生成的测试

### 未来增强（路线图 C3.3-C3.5）

- C3.3：从工作流示例构建操作指南
- C3.4：提取配置模式
- C3.5：从测试覆盖率生成架构概述

## 故障排除

### 未提取示例

**症状**：`total_examples: 0`

**原因**：
1. 未找到测试文件（检查模式：test_*.py、*_test.go）
2. 置信度阈值太高
3. 不支持的语言

**解决方案**：
```bash
# 降低置信度阈值
--min-confidence 0.3

# 检查测试文件检测
ls tests/test_*.py

# 验证语言支持
--language python  # 使用支持的语言
```

### 低质量示例

**症状**：许多琐碎或不完整的示例

**原因**：
1. 测试使用大量模拟
2. 测试太简单
3. 置信度阈值太低

**解决方案**：
```bash
# 提高置信度阈值
--min-confidence 0.7

# 减少每个文件的示例（仅获取最佳）
--max-per-file 3
```

### 解析错误

**症状**：`Failed to parse` 警告

**原因**：
1. 测试文件中的语法错误
2. 不兼容的 Python 版本
3. 动态代码生成

**解决方案**：
- 修复测试文件中的语法错误
- 确保测试是有效的 Python/JS/Go 代码
- 错误已记录但不会停止提取

## 示例

### Python unittest

```python
# tests/test_database.py
import unittest

class TestDatabase(unittest.TestCase):
    def test_connection(self):
        """Test database connection with real params"""
        db = Database(
            host="localhost",
            port=5432,
            user="admin",
            timeout=30
        )
        self.assertTrue(db.connect())
```

**提取**：
- 类别：实例化
- 代码：`db = Database(host="localhost", port=5432, user="admin", timeout=30)`
- 置信度：0.8
- 预期：`self.assertTrue(db.connect())`

### Python pytest

```python
# tests/test_api.py
import pytest

@pytest.fixture
def client():
    return APIClient(base_url="https://api.test.com")

def test_get_user(client):
    """Test fetching user data"""
    response = client.get("/users/123")
    assert response.status_code == 200
    assert response.json()["id"] == 123
```

**提取**：
- 类别：方法调用
- 设置：`# Fixtures: client`
- 代码：`response = client.get("/users/123")\nassert response.status_code == 200`
- 置信度：0.85

### Go 表测试

```go
// add_test.go
func TestAdd(t *testing.T) {
    calc := Calculator{mode: "basic"}
    result := calc.Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}
```

**提取**：
- 类别：实例化
- 代码：`calc := Calculator{mode: "basic"}`
- 置信度：0.6

## 性能

| 指标 | 值 |
|--------|-------|
| 处理速度 | 约 100 个文件/秒（Python AST） |
| 内存使用 | 1000 个测试文件约 50MB |
| 示例质量 | 80%+ 高置信度（>0.7） |
| 假阳性 | <5%（使用默认过滤） |

## 集成点

### 1. 独立 CLI

```bash
skill-seekers extract-test-examples tests/
```

### 2. 代码库分析

```bash
codebase-scraper --directory . --extract-test-examples
```

### 3. MCP 服务器

```python
# 通过 Claude Code
extract_test_examples(directory="tests/")
```

### 4. Python API

```python
from skill_seekers.cli.test_example_extractor import TestExampleExtractor

extractor = TestExampleExtractor(min_confidence=0.6)
report = extractor.extract_from_directory("tests/")

print(f"Found {report.total_examples} examples")
for example in report.examples:
    print(f"- {example.test_name}: {example.code[:50]}...")
```

## 下一步

- [模式检测（C3.1）](/docs/features/pattern-detection) - 检测设计模式
- [操作指南生成（C3.3）](/docs/features/how-to-guides) - 从工作流构建指南
- [C3.x 代码库分析](/docs/features/c3x-codebase-analysis) - 完整分析套件

---

**状态**：✅ 在 v2.6.0 中实现
**Issue**：#TBD（C3.2）
**相关任务**：C3.1（模式检测）、C3.3-C3.5（未来增强）
