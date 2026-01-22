---
title: Google Gemini
description: 创建并部署技能到 Google Gemini 的完整指南，使用 tar.gz 格式、Files API 和 grounding 支持
section: manual
subsection: platforms
order: 2
---

# Google Gemini 集成指南

使用 Skill Seekers 创建并部署技能到 Google Gemini 的完整指南。

## 概述

Skill Seekers 将文档打包成 Gemini 兼容格式，优化用于：
- **Gemini 2.0 Flash** 用于增强
- **Files API** 用于文档上传
- **Grounding** 用于准确的、基于源的响应

## 设置

### 1. 安装 Gemini 支持

```bash
# 安装 Gemini 依赖项
pip install skill-seekers[gemini]

# 验证安装
pip list | grep google-generativeai
```

### 2. 获取 Google API 密钥

1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 点击"获取 API 密钥"
3. 创建新的 API 密钥或使用现有密钥
4. 复制密钥（以 `AIza` 开头）

### 3. 配置 API 密钥

```bash
# 设置为环境变量（推荐）
export GOOGLE_API_KEY=AIzaSy...

# 或直接传递给命令
skill-seekers upload --target gemini --api-key AIzaSy...
```

## 完整工作流程

### 步骤 1：抓取文档

```bash
# 使用任何配置（抓取与平台无关）
skill-seekers scrape --config configs/react.json

# 或使用统一配置进行多源
skill-seekers unified --config configs/react_unified.json
```

**结果：** 带引用的 `output/react/` 技能目录

### 步骤 2：使用 Gemini 增强（可选但推荐）

```bash
# 使用 Gemini 2.0 Flash 增强 SKILL.md
skill-seekers enhance output/react/ --target gemini

# 指定 API 密钥
skill-seekers enhance output/react/ --target gemini --api-key AIzaSy...
```

**它做什么：**
- 分析所有参考文档
- 提取 5-10 个最佳代码示例
- 创建全面的快速参考
- 添加关键概念和使用指导
- 生成纯 markdown（无 YAML 前置元数据）

**时间：** 20-40 秒
**成本：** 约 $0.01-0.05（使用 Gemini 2.0 Flash）
**质量提升：** 3/10 → 9/10

### 步骤 3：为 Gemini 打包

```bash
# 为 Gemini 创建 tar.gz 包
skill-seekers package output/react/ --target gemini

# 结果：react-gemini.tar.gz
```

**包结构：**
```
react-gemini.tar.gz/
├── system_instructions.md  # 主文档（纯 markdown）
├── references/             # 单独的参考文件
│   ├── getting_started.md
│   ├── hooks.md
│   ├── components.md
│   └── ...
└── gemini_metadata.json    # 平台元数据
```

### 步骤 4：上传到 Gemini

```bash
# 上传到 Google AI Studio
skill-seekers upload react-gemini.tar.gz --target gemini

# 使用 API 密钥
skill-seekers upload react-gemini.tar.gz --target gemini --api-key AIzaSy...
```

**输出：**
```
✅ 上传成功！
技能 ID：files/abc123xyz
URL：https://aistudio.google.com/app/files/abc123xyz
已上传文件：15 个文件
```

### 步骤 5：在 Gemini 中使用

在 Google AI Studio 中访问您上传的文件：

1. 前往 [Google AI Studio](https://aistudio.google.com/)
2. 导航到 **Files** 部分
3. 查找您上传的技能文件
4. 与 Gemini API 或 AI Studio 一起使用

## Gemini 有什么不同？

### 格式：纯 Markdown（无 YAML）

**Claude 格式：**
```markdown
---
name: react
description: React 框架
---

# React 文档
...
```

**Gemini 格式：**
```markdown
# React 文档

**描述：** 用于构建用户界面的 React 框架

## 快速参考
...
```

无 YAML 前置元数据 - Gemini 使用纯 markdown 以获得更好的兼容性。

### 包：tar.gz 而不是 ZIP

Gemini 使用 `.tar.gz` 压缩以获得更好的 Unix 兼容性和更小的文件大小。

### 上传：Files API + Grounding

文件上传到 Google 的 Files API，并可用于 Gemini 响应中的 grounding。

## 使用您的 Gemini 技能

### 选项 1：Google AI Studio（Web UI）

1. 前往 [Google AI Studio](https://aistudio.google.com/)
2. 创建新聊天或应用
3. 在提示中引用您上传的文件：
   ```
   使用 React 文档文件，解释 hooks
   ```

### 选项 2：Gemini API（Python）

```python
import google.generativeai as genai

# 使用您的 API 密钥配置
genai.configure(api_key='AIzaSy...')

# 创建模型
model = genai.GenerativeModel('gemini-2.0-flash-exp')

# 与上传的文件一起使用（自动 grounding）
response = model.generate_content(
    "如何使用 React hooks？",
    # 文件通过 grounding 自动可用
)

print(response.text)
```

### 选项 3：带文件引用的 Gemini API

```python
import google.generativeai as genai

# 配置
genai.configure(api_key='AIzaSy...')

# 获取您上传的文件
files = genai.list_files()
react_file = next(f for f in files if 'react' in f.display_name.lower())

# 在生成中使用文件
model = genai.GenerativeModel('gemini-2.0-flash-exp')
response = model.generate_content([
    "详细解释 React hooks",
    react_file
])

print(response.text)
```

## 高级用法

### 使用自定义提示增强

可以通过修改适配器来自定义增强过程：

```python
from skill_seekers.cli.adaptors import get_adaptor
from pathlib import Path

# 获取 Gemini 适配器
adaptor = get_adaptor('gemini')

# 使用自定义参数增强
success = adaptor.enhance(
    skill_dir=Path('output/react'),
    api_key='AIzaSy...'
)
```

### 程序化上传

```python
from skill_seekers.cli.adaptors import get_adaptor
from pathlib import Path

# 获取适配器
gemini = get_adaptor('gemini')

# 打包技能
package_path = gemini.package(
    skill_dir=Path('output/react'),
    output_path=Path('output/react-gemini.tar.gz')
)

# 上传
result = gemini.upload(
    package_path=package_path,
    api_key='AIzaSy...'
)

if result['success']:
    print(f"✅ 已上传到：{result['url']}")
    print(f"技能 ID：{result['skill_id']}")
else:
    print(f"❌ 上传失败：{result['message']}")
```

### 手动包提取

如果您想检查或修改包：

```bash
# 提取 tar.gz
tar -xzf react-gemini.tar.gz -C extracted/

# 查看结构
tree extracted/

# 如需要修改文件
nano extracted/system_instructions.md

# 重新打包
tar -czf react-gemini-modified.tar.gz -C extracted .
```

## Gemini 特定功能

### 1. Grounding 支持

Gemini 自动在您上传的文档文件中 ground 响应，提供：
- 源归属
- 准确的引用
- 减少幻觉

### 2. 多模态能力

Gemini 可以处理：
- 文本文档
- 代码示例
- 图像（如果包含在 PDF 中）
- 表格和图表

### 3. 长上下文窗口

Gemini 2.0 Flash 支持：
- 高达 1M 令牌上下文
- 单个上下文中的整个文档集
- 更好地理解交叉引用

## 故障排除

### 问题：`google-generativeai not installed`

**解决方案：**
```bash
pip install skill-seekers[gemini]
```

### 问题：`Invalid API key format`

**错误：** API 密钥不以 `AIza` 开头

**解决方案：**
- 从 [Google AI Studio](https://aistudio.google.com/) 获取新密钥
- 验证您使用的是 Google API 密钥，而不是 GCP 服务帐户

### 问题：`Not a tar.gz file`

**错误：** 包格式错误

**解决方案：**
```bash
# 使用 --target gemini 获取 tar.gz 格式
skill-seekers package output/react/ --target gemini

# 不要：
skill-seekers package output/react/  # 创建 .zip（Claude 格式）
```

### 问题：`File upload failed`

**可能原因：**
- API 密钥缺少权限
- 文件太大（检查限制）
- 网络连接

**解决方案：**
```bash
# 验证 API 密钥有效
python3 -c "import google.generativeai as genai; genai.configure(api_key='AIza...'); print(list(genai.list_models())[:2])"

# 检查文件大小
ls -lh react-gemini.tar.gz

# 尝试详细输出
skill-seekers upload react-gemini.tar.gz --target gemini --verbose
```

### 问题：增强失败

**解决方案：**
```bash
# 检查 API 配额
# 访问：https://aistudio.google.com/apikey

# 尝试较小的技能
skill-seekers enhance output/react/ --target gemini --max-files 5

# 不使用增强
skill-seekers package output/react/ --target gemini
# （跳过增强步骤）
```

## 最佳实践

### 1. 组织文档

清晰地构建您的 SKILL.md：
- 从概述开始
- 添加快速参考部分
- 组合相关概念
- 包含实用示例

### 2. 优化文件数量

- 将相关主题合并到单个文件中
- 使用清晰的文件命名
- 保持总数在 100 个文件以下以获得最佳性能

### 3. 使用 Gemini 测试

上传后，使用示例问题测试：
```
1. 如何开始使用 [主题]？
2. 核心概念是什么？
3. 给我看一个实用示例
4. 常见陷阱是什么？
```

### 4. 定期更新

```bash
# 重新抓取更新的文档
skill-seekers scrape --config configs/react.json

# 重新增强和上传
skill-seekers enhance output/react/ --target gemini
skill-seekers package output/react/ --target gemini
skill-seekers upload react-gemini.tar.gz --target gemini
```

## 成本估算

**Gemini 2.0 Flash 定价：**
- 输入：$0.075 每 1M 令牌
- 输出：$0.30 每 1M 令牌

**典型技能增强：**
- 输入：约 50K-200K 令牌（文档）
- 输出：约 5K-10K 令牌（增强的 SKILL.md）
- 成本：每个技能 $0.01-0.05

**文件上传：** 免费（无按文件收费）

## 下一步

1. ✅ 安装 Gemini 支持：`pip install skill-seekers[gemini]`
2. ✅ 从 Google AI Studio 获取 API 密钥
3. ✅ 抓取您的文档
4. ✅ 使用 Gemini 增强
5. ✅ 为 Gemini 打包
6. ✅ 上传和测试

## 资源

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API 文档](https://ai.google.dev/docs)
- [Gemini 定价](https://ai.google.dev/pricing)
- [多 LLM 支持](/docs/features/multi-llm-support) - 平台比较

---

**状态**：✅ 生产就绪（v2.5.0+）

发现问题或有建议？[提出问题](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
