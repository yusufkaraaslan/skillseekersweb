---
title: 设计模式检测
description: 使用 C3.1 分析在 9 种编程语言中自动检测 10 种常见设计模式
section: manual
subsection: codebase-analysis
order: 6
---

# 设计模式检测指南

**功能**：C3.1 - 检测代码库中的常见设计模式
**版本**：2.6.0+
**状态**：生产就绪 ✅

## 目录

- [概述](#概述)
- [支持的模式](#支持的模式)
- [检测级别](#检测级别)
- [用法](#用法)
- [语言支持](#语言支持)
- [输出格式](#输出格式)
- [示例](#示例)
- [准确性](#准确性)

---

## 概述

模式检测功能在 9 种编程语言中自动识别代码库中的常见设计模式。它使用三层检测系统（surface/deep/full）来平衡速度和准确性，并针对特定语言进行调整以提高精度。

**主要优势：**
- 🔍 **理解陌生代码** - 立即识别架构模式
- 📚 **从优秀代码中学习** - 查看模式的实现方式
- 🛠️ **指导重构** - 检测模式应用的机会
- 📊 **生成更好的文档** - 向 API 文档添加模式徽章

---

## 支持的模式

### 创建型模式（3 种）
1. **单例模式（Singleton）** - 确保类只有一个实例
2. **工厂模式（Factory）** - 创建对象而不指定确切的类
3. **建造者模式（Builder）** - 逐步构造复杂对象

### 结构型模式（2 种）
4. **装饰器模式（Decorator）** - 动态地向对象添加职责
5. **适配器模式（Adapter）** - 将一个接口转换为另一个

### 行为型模式（5 种）
6. **观察者模式（Observer）** - 通知依赖项状态变化
7. **策略模式（Strategy）** - 封装算法以实现可互换性
8. **命令模式（Command）** - 将请求封装为对象
9. **模板方法（Template Method）** - 在基类中定义算法骨架
10. **责任链模式（Chain of Responsibility）** - 沿处理器链传递请求

---

## 检测级别

### 表面检测（快速，约 60-70% 置信度）
- **方式**：分析命名约定
- **速度**：每个类 <5ms
- **准确性**：适合明显的模式
- **示例**：名为"DatabaseSingleton"的类 → 单例模式

```bash
skill-seekers-patterns --file db.py --depth surface
```

### 深度检测（平衡，约 80-90% 置信度）⭐ 默认
- **方式**：结构分析（方法、参数、关系）
- **速度**：每个类约 10ms
- **准确性**：大多数用例的最佳平衡
- **示例**：具有 getInstance() + 私有构造函数的类 → 单例模式

```bash
skill-seekers-patterns --file db.py --depth deep
```

### 完全检测（彻底，约 90-95% 置信度）
- **方式**：行为分析（代码模式、实现细节）
- **速度**：每个类约 20ms
- **准确性**：最高精度
- **示例**：检查实例缓存、线程安全 → 单例模式

```bash
skill-seekers-patterns --file db.py --depth full
```

---

## 用法

### CLI 用法

```bash
# 单文件分析
skill-seekers-patterns --file src/database.py

# 目录分析
skill-seekers-patterns --directory src/

# 完整分析并输出 JSON
skill-seekers-patterns --directory src/ --depth full --json --output patterns/

# 多个文件
skill-seekers-patterns --file src/db.py --file src/api.py
```

**CLI 选项：**
- `--file` - 要分析的单个文件（可以多次指定）
- `--directory` - 要分析的目录（所有源文件）
- `--output` - JSON 结果的输出目录
- `--depth` - 检测深度：surface、deep（默认）、full
- `--json` - 输出 JSON 格式
- `--verbose` - 启用详细输出

### 代码库抓取器集成

`--detect-patterns` 标志与代码库分析集成：

```bash
# 分析代码库 + 检测模式
skill-seekers-codebase --directory src/ --detect-patterns

# 与其他功能一起使用
skill-seekers-codebase \
  --directory src/ \
  --detect-patterns \
  --build-api-reference \
  --build-dependency-graph
```

**输出**：`output/codebase/patterns/detected_patterns.json`

### MCP 工具

用于 Claude Code 和其他 MCP 客户端：

```python
# 通过 MCP
await use_mcp_tool('detect_patterns', {
    'file': 'src/database.py',
    'depth': 'deep'
})

# 目录分析
await use_mcp_tool('detect_patterns', {
    'directory': 'src/',
    'output': 'patterns/',
    'json': true
})
```

### Python API

```python
from skill_seekers.cli.pattern_recognizer import PatternRecognizer

# 创建识别器
recognizer = PatternRecognizer(depth='deep')

# 分析文件
with open('database.py', 'r') as f:
    content = f.read()

report = recognizer.analyze_file('database.py', content, 'Python')

# 打印结果
for pattern in report.patterns:
    print(f"{pattern.pattern_type}: {pattern.class_name} (confidence: {pattern.confidence:.2f})")
    print(f"  Evidence: {pattern.evidence}")
```

---

## 语言支持

| 语言 | 支持 | 注释 |
|----------|---------|-------|
| Python | ⭐⭐⭐ | 基于 AST，最高准确性 |
| JavaScript | ⭐⭐ | 基于正则表达式，良好准确性 |
| TypeScript | ⭐⭐ | 基于正则表达式，良好准确性 |
| C++ | ⭐⭐ | 基于正则表达式 |
| C | ⭐⭐ | 基于正则表达式 |
| C# | ⭐⭐ | 基于正则表达式 |
| Go | ⭐⭐ | 基于正则表达式 |
| Rust | ⭐⭐ | 基于正则表达式 |
| Java | ⭐⭐ | 基于正则表达式 |
| Ruby | ⭐ | 基本支持 |
| PHP | ⭐ | 基本支持 |

**特定语言的调整：**
- **Python**：检测 `@decorator` 语法、`__new__` 单例
- **JavaScript**：识别模块模式、EventEmitter
- **Java/C#**：识别基于接口的模式
- **Go**：检测 `sync.Once` 单例惯用法
- **Rust**：识别 `lazy_static`、trait 适配器

---

## 输出格式

### 人类可读输出

```
============================================================
PATTERN DETECTION RESULTS
============================================================
Files analyzed: 15
Files with patterns: 8
Total patterns detected: 12
============================================================

Pattern Summary:
  Singleton: 3
  Factory: 4
  Observer: 2
  Strategy: 2
  Decorator: 1

Detected Patterns:

src/database.py:
  • Singleton - Database
    Confidence: 0.85
    Category: Creational
    Evidence: Has getInstance() method

  • Factory - ConnectionFactory
    Confidence: 0.70
    Category: Creational
    Evidence: Has create() method
```

### JSON 输出（`--json`）

```json
{
  "total_files_analyzed": 15,
  "files_with_patterns": 8,
  "total_patterns_detected": 12,
  "reports": [
    {
      "file_path": "src/database.py",
      "language": "Python",
      "patterns": [
        {
          "pattern_type": "Singleton",
          "category": "Creational",
          "confidence": 0.85,
          "location": "src/database.py",
          "class_name": "Database",
          "method_name": null,
          "line_number": 10,
          "evidence": [
            "Has getInstance() method",
            "Private constructor detected"
          ],
          "related_classes": []
        }
      ],
      "total_classes": 3,
      "total_functions": 15,
      "analysis_depth": "deep",
      "pattern_summary": {
        "Singleton": 1,
        "Factory": 1
      }
    }
  ]
}
```

---

## 示例

### 示例 1：单例检测

```python
# database.py
class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def connect(self):
        pass
```

**命令：**
```bash
skill-seekers-patterns --file database.py
```

**输出：**
```
Detected Patterns:

database.py:
  • Singleton - Database
    Confidence: 0.90
    Category: Creational
    Evidence: Python __new__ idiom, Instance caching pattern
```

### 示例 2：工厂模式

```python
# vehicle_factory.py
class VehicleFactory:
    def create_vehicle(self, vehicle_type):
        if vehicle_type == 'car':
            return Car()
        elif vehicle_type == 'truck':
            return Truck()
        return None

    def create_bike(self):
        return Bike()
```

**输出：**
```
  • Factory - VehicleFactory
    Confidence: 0.80
    Category: Creational
    Evidence: Has create_vehicle() method, Multiple factory methods
```

### 示例 3：观察者模式

```python
# event_system.py
class EventManager:
    def __init__(self):
        self.listeners = []

    def attach(self, listener):
        self.listeners.append(listener)

    def detach(self, listener):
        self.listeners.remove(listener)

    def notify(self, event):
        for listener in self.listeners:
            listener.update(event)
```

**输出：**
```
  • Observer - EventManager
    Confidence: 0.95
    Category: Behavioral
    Evidence: Has attach/detach/notify triplet, Observer collection detected
```

---

## 准确性

### 基准测试结果

在 100 个带有手动标记模式的真实 Python 项目上进行测试：

| 模式 | 精确度 | 召回率 | F1 分数 |
|---------|-----------|--------|----------|
| Singleton | 92% | 85% | 88% |
| Factory | 88% | 82% | 85% |
| Observer | 94% | 88% | 91% |
| Strategy | 85% | 78% | 81% |
| Decorator | 90% | 83% | 86% |
| Builder | 86% | 80% | 83% |
| Adapter | 84% | 77% | 80% |
| Command | 87% | 81% | 84% |
| Template Method | 83% | 75% | 79% |
| Chain of Responsibility | 81% | 74% | 77% |
| **总体平均** | **87%** | **80%** | **83%** |

**主要见解：**
- 观察者模式具有最高准确性（事件驱动代码具有明确的特征）
- 责任链模式最低（类似于中间件/过滤器）
- 基于 Python AST 的分析比基于正则表达式的分析高 10-15% 的准确性
- 语言适配提高了 5-10% 的置信度

### 已知限制

1. **假阳性**（约 13%）：
   - 名为"Handler"的类可能被标记为责任链模式
   - 具有 `create*` 方法的实用程序类被标记为工厂
   - **缓解措施**：使用 `--depth full` 进行更严格的检查

2. **假阴性**（约 20%）：
   - 非常规的模式实现
   - 大量混淆或生成的代码
   - **缓解措施**：提供清晰的命名约定

3. **语言限制**：
   - 基于正则表达式的语言准确性低于 Python
   - 动态语言更难以静态分析
   - **缓解措施**：与运行时分析工具结合使用

---

## 与其他功能的集成

### API 参考构建器（未来）

模式检测结果将增强 API 文档：

```markdown
## Database Class

**Design Pattern**: 🏛️ Singleton (Confidence: 0.90)

The Database class implements the Singleton pattern to ensure...
```

### 依赖分析器（未来）

将模式检测与依赖分析结合：
- 检测观察者模式中的循环依赖
- 验证工厂模式依赖
- 检查策略模式组合

---

## 故障排除

### 未检测到模式

**问题**：分析完成但未找到模式

**解决方案：**
1. 检查文件语言是否受支持：`skill-seekers-patterns --file test.py --verbose`
2. 尝试较低深度：`--depth surface`
3. 验证代码包含实际模式（并非所有代码都使用模式！）

### 低置信度分数

**问题**：检测到的模式置信度 <0.5

**解决方案：**
1. 使用更严格的检测：`--depth full`
2. 检查代码是否遵循传统的模式结构
3. 查看证据字段以了解检测到的内容

### 性能问题

**问题**：大型代码库分析时间过长

**解决方案：**
1. 使用更快的检测：`--depth surface`
2. 分析特定目录：`--directory src/models/`
3. 按语言过滤：使用 `--languages Python` 配置代码库抓取器

---

## 未来增强（路线图）

- **C3.6**：跨文件模式检测（检测跨多个文件的模式）
- **C3.7**：自定义模式定义（定义您自己的模式）
- **C3.8**：反模式检测（检测代码异味和反模式）
- **C3.9**：模式使用统计和趋势
- **C3.10**：交互式模式重构建议

---

## 技术细节

### 架构

```
PatternRecognizer
├── CodeAnalyzer（重用现有基础设施）
├── 10 个模式检测器
│   ├── BasePatternDetector（抽象类）
│   ├── detect_surface() → 命名分析
│   ├── detect_deep() → 结构分析
│   └── detect_full() → 行为分析
└── LanguageAdapter（特定语言调整）
```

### 性能

- **内存**：约 50MB 基准 + 每 1000 个类约 5MB
- **速度**：
  - Surface：约 200 个类/秒
  - Deep：约 100 个类/秒
  - Full：约 50 个类/秒

### 测试

- **测试套件**：24 个全面测试
- **覆盖率**：所有 10 种模式 + 多语言支持
- **CI**：每次提交时运行

---

## 参考

- **四人帮（GoF）**：设计模式书
- **模式类别**：创建型、结构型、行为型
- **支持的语言**：9 种（Python、JavaScript、TypeScript、C++、C、C#、Go、Rust、Java）
- **实现**：`src/skill_seekers/cli/pattern_recognizer.py`（约 1,900 行）
- **测试**：`tests/test_pattern_recognizer.py`（24 个测试，100% 通过）

---

**状态**：✅ 生产就绪（v2.6.0+）
**下一步**：开始使用模式检测来理解和改进您的代码库！

## 下一步

- [C3.x 代码库分析](/docs/features/c3x-codebase-analysis) - 完整的 C3 套件
- [测试示例提取](/docs/features/test-extraction) - C3.2 功能
- [操作指南生成](/docs/features/how-to-guides) - C3.3 功能
