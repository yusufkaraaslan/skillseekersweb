---
title: OpenAI ChatGPT
description: 创建并部署技能到 OpenAI ChatGPT 的完整指南，使用 Assistants API、Vector Store 和 file_search 工具
section: manual
subsection: platforms
order: 3
---

# OpenAI ChatGPT 集成指南

使用 Skill Seekers 创建并部署技能到 OpenAI ChatGPT 的完整指南。

## 概述

Skill Seekers 将文档打包成 OpenAI 兼容格式，优化用于：
- **Assistants API** 用于自定义 AI 助手
- **Vector Store + File Search** 用于准确检索
- **GPT-4o** 用于增强和响应

## 设置

### 1. 安装 OpenAI 支持

```bash
# 安装 OpenAI 依赖项
pip install skill-seekers[openai]

# 验证安装
pip list | grep openai
```

### 2. 获取 OpenAI API 密钥

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 导航到 **API keys** 部分
3. 点击"Create new secret key"
4. 复制密钥（以 `sk-proj-` 或 `sk-` 开头）

### 3. 配置 API 密钥

```bash
# 设置为环境变量（推荐）
export OPENAI_API_KEY=sk-proj-...

# 或直接传递给命令
skill-seekers upload --target openai --api-key sk-proj-...
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

### 步骤 2：使用 GPT-4o 增强（可选但推荐）

```bash
# 使用 GPT-4o 增强 SKILL.md
skill-seekers enhance output/react/ --target openai

# 指定 API 密钥
skill-seekers enhance output/react/ --target openai --api-key sk-proj-...
```

**它做什么：**
- 分析所有参考文档
- 提取 5-10 个最佳代码示例
- 创建全面的助手指令
- 添加响应指南和搜索策略
- 格式化为纯文本（无 YAML 前置元数据）

**时间：** 20-40 秒
**成本：** 约 $0.15-0.30（使用 GPT-4o）
**质量提升：** 3/10 → 9/10

### 步骤 3：为 OpenAI 打包

```bash
# 为 OpenAI Assistants 创建 ZIP 包
skill-seekers package output/react/ --target openai

# 结果：react-openai.zip
```

**包结构：**
```
react-openai.zip/
├── assistant_instructions.txt  # Assistant 的主指令
├── vector_store_files/        # Vector Store + file_search 的文件
│   ├── getting_started.md
│   ├── hooks.md
│   ├── components.md
│   └── ...
└── openai_metadata.json       # 平台元数据
```

### 步骤 4：上传到 OpenAI（创建 Assistant）

```bash
# 上传并使用 Vector Store 创建 Assistant
skill-seekers upload react-openai.zip --target openai

# 使用 API 密钥
skill-seekers upload react-openai.zip --target openai --api-key sk-proj-...
```

**它做什么：**
1. 为文档创建 Vector Store
2. 将参考文件上传到 Vector Store
3. 使用 file_search 工具创建 Assistant
4. 将 Vector Store 链接到 Assistant

**输出：**
```
✅ 上传成功！
Assistant ID：asst_abc123xyz
URL：https://platform.openai.com/assistants/asst_abc123xyz
消息：已使用 15 个知识文件创建 Assistant
```

### 步骤 5：使用您的 Assistant

在 OpenAI Platform 中访问您的 assistant：

1. 前往 [OpenAI Platform](https://platform.openai.com/assistants)
2. 在列表中找到您的 assistant
3. 在 Playground 中测试或通过 API 使用

## OpenAI 有什么不同？

### 格式：Assistant 指令（纯文本）

**Claude 格式：**
```markdown
---
name: react
---

# React 文档
...
```

**OpenAI 格式：**
```text
您是 React 的专家助手。

您的知识库：
- 入门指南
- React hooks 参考
- 组件 API

当用户询问有关 React 的问题时：
1. 搜索知识文件
2. 提供代码示例
...
```

为 Assistant API 优化的纯文本指令。

### 架构：Assistant + Vector Store

OpenAI 使用两部分系统：
1. **Assistant** - 带有指令和工具的 AI 代理
2. **Vector Store** - 用于语义搜索的嵌入文档

### 工具：file_search

Assistant 使用 `file_search` 工具来：
- 语义搜索文档
- 查找相关代码示例
- 提供准确的、基于源的答案

## 使用您的 OpenAI Assistant

### 选项 1：OpenAI Playground（Web UI）

1. 前往 [OpenAI Platform](https://platform.openai.com/assistants)
2. 选择您的 assistant
3. 点击"Test in Playground"
4. 询问有关您文档的问题

### 选项 2：Assistants API（Python）

```python
from openai import OpenAI

# 初始化客户端
client = OpenAI(api_key='sk-proj-...')

# 创建线程
thread = client.beta.threads.create()

# 发送消息
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="如何使用 React hooks？"
)

# 运行 assistant
run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id='asst_abc123xyz'  # 您的 assistant ID
)

# 等待完成
while run.status != 'completed':
    run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

# 获取响应
messages = client.beta.threads.messages.list(thread_id=thread.id)
print(messages.data[0].content[0].text.value)
```

### 选项 3：流式响应

```python
from openai import OpenAI

client = OpenAI(api_key='sk-proj-...')

# 创建线程和消息
thread = client.beta.threads.create()
client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="解释 React hooks"
)

# 流式响应
with client.beta.threads.runs.stream(
    thread_id=thread.id,
    assistant_id='asst_abc123xyz'
) as stream:
    for event in stream:
        if event.event == 'thread.message.delta':
            print(event.data.delta.content[0].text.value, end='')
```

## 高级用法

### 更新 Assistant 指令

```python
from openai import OpenAI

client = OpenAI(api_key='sk-proj-...')

# 更新 assistant
client.beta.assistants.update(
    assistant_id='asst_abc123xyz',
    instructions="""
您是 React 专家助手。

专注于使用以下内容的现代最佳实践：
- React 18+ 功能
- 函数式组件
- 基于 Hooks 的模式

回答时：
1. 首先搜索知识文件
2. 提供可工作的代码示例
3. 解释"为什么"而不仅仅是"是什么"
"""
)
```

### 向 Vector Store 添加更多文件

```python
from openai import OpenAI

client = OpenAI(api_key='sk-proj-...')

# 上传新文件
with open('new_guide.md', 'rb') as f:
    file = client.files.create(file=f, purpose='assistants')

# 添加到 vector store
client.beta.vector_stores.files.create(
    vector_store_id='vs_abc123',
    file_id=file.id
)
```

### 程序化打包和上传

```python
from skill_seekers.cli.adaptors import get_adaptor
from pathlib import Path

# 获取适配器
openai_adaptor = get_adaptor('openai')

# 打包技能
package_path = openai_adaptor.package(
    skill_dir=Path('output/react'),
    output_path=Path('output/react-openai.zip')
)

# 上传（创建 Assistant + Vector Store）
result = openai_adaptor.upload(
    package_path=package_path,
    api_key='sk-proj-...'
)

if result['success']:
    print(f"✅ Assistant 已创建！")
    print(f"ID：{result['skill_id']}")
    print(f"URL：{result['url']}")
else:
    print(f"❌ 上传失败：{result['message']}")
```

## OpenAI 特定功能

### 1. 语义搜索（file_search）

Assistant 使用嵌入来：
- 查找语义相似的内容
- 理解意图而不是关键词
- 自动显示相关示例

### 2. 引用和来源

Assistants 可以提供：
- 源归属
- 文件引用
- 引用提取

### 3. 函数调用（可选）

使用自定义工具扩展您的 assistant：

```python
client.beta.assistants.update(
    assistant_id='asst_abc123xyz',
    tools=[
        {"type": "file_search"},
        {"type": "function", "function": {
            "name": "run_code_example",
            "description": "执行 React 代码示例",
            "parameters": {...}
        }}
    ]
)
```

### 4. 多模态支持

在文档中包含图像：
- 截图
- 图表
- 架构图

## 故障排除

### 问题：`openai not installed`

**解决方案：**
```bash
pip install skill-seekers[openai]
```

### 问题：`Invalid API key format`

**错误：** API 密钥不以 `sk-` 开头

**解决方案：**
- 从 [OpenAI Platform](https://platform.openai.com/api-keys) 获取新密钥
- 验证您使用的是 API 密钥，而不是组织 ID

### 问题：`Not a ZIP file`

**错误：** 包格式错误

**解决方案：**
```bash
# 使用 --target openai 获取 ZIP 格式
skill-seekers package output/react/ --target openai

# 不要：
skill-seekers package output/react/ --target gemini  # 创建 .tar.gz
```

### 问题：`Assistant creation failed`

**可能原因：**
- API 密钥缺少权限
- 超过速率限制
- 文件太大

**解决方案：**
```bash
# 验证 API 密钥
python3 -c "from openai import OpenAI; print(OpenAI(api_key='sk-proj-...').models.list())"

# 检查速率限制
# 访问：https://platform.openai.com/account/limits

# 减少文件数量
skill-seekers package output/react/ --target openai --max-files 20
```

### 问题：增强失败

**解决方案：**
```bash
# 检查 API 配额和账单
# 访问：https://platform.openai.com/account/billing

# 尝试较小的技能
skill-seekers enhance output/react/ --target openai --max-files 5

# 不使用增强
skill-seekers package output/react/ --target openai
# （跳过增强步骤）
```

### 问题：file_search 不工作

**症状：** Assistant 不引用文档

**解决方案：**
- 验证 Vector Store 有文件
- 检查 Assistant 工具配置
- 使用明确的指令测试："搜索知识文件以获取有关 hooks 的信息"

## 最佳实践

### 1. 编写清晰的 Assistant 指令

专注于：
- 角色定义
- 知识库描述
- 响应指南
- 搜索策略

### 2. 组织 Vector Store 文件

- 保持文件在 512KB 以下
- 使用清晰、描述性的文件名
- 使用标题构建内容
- 包含代码示例

### 3. 测试 Assistant 行为

使用各种问题测试：
```
1. 简单事实："什么是 React？"
2. 操作问题："如何创建组件？"
3. 最佳实践："管理状态的最佳方式是什么？"
4. 故障排除："为什么我的 hook 不工作？"
```

### 4. 监控令牌使用

```python
# 跟踪 API 响应中的令牌
run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
print(f"输入令牌：{run.usage.prompt_tokens}")
print(f"输出令牌：{run.usage.completion_tokens}")
```

### 5. 定期更新

```bash
# 重新抓取更新的文档
skill-seekers scrape --config configs/react.json

# 重新增强和上传（创建新的 Assistant）
skill-seekers enhance output/react/ --target openai
skill-seekers package output/react/ --target openai
skill-seekers upload react-openai.zip --target openai
```

## 成本估算

**GPT-4o 定价（截至 2024 年）：**
- 输入：$2.50 每 1M 令牌
- 输出：$10.00 每 1M 令牌

**典型技能增强：**
- 输入：约 50K-200K 令牌（文档）
- 输出：约 5K-10K 令牌（增强的指令）
- 成本：每个技能 $0.15-0.30

**Vector Store：**
- 每天每 GB $0.10（存储）
- 典型技能：< 100MB = 每天约 $0.01

**API 使用：**
- 因问题量而异
- 每次对话约 $0.01-0.05

## 下一步

1. ✅ 安装 OpenAI 支持：`pip install skill-seekers[openai]`
2. ✅ 从 OpenAI Platform 获取 API 密钥
3. ✅ 抓取您的文档
4. ✅ 使用 GPT-4o 增强
5. ✅ 为 OpenAI 打包
6. ✅ 上传并创建 Assistant
7. ✅ 在 Playground 中测试

## 资源

- [OpenAI Platform](https://platform.openai.com/)
- [Assistants API 文档](https://platform.openai.com/docs/assistants/overview)
- [OpenAI 定价](https://openai.com/pricing)
- [多 LLM 支持](/docs/features/multi-llm-support) - 平台比较

---

**状态**：✅ 生产就绪（v2.5.0+）

发现问题或有建议？[提出问题](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
