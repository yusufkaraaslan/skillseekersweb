---
title: AI 增强
description: 使用 Claude Code Max（免费）或 Anthropic API 增强 SKILL.md 文件 - 添加代码示例、快速参考和最佳实践
section: manual
subsection: enhancement
order: 1
---

# AI 增强指南

使用 AI 增强将基本的 SKILL.md 文件转换为全面的生产质量文档。

---

## 概述

**问题：**
自动生成的 SKILL.md 文件通常过于通用：
- 空的快速参考部分
- 没有实用的代码示例
- 通用的"何时使用"触发器
- 缺少关键概念和最佳实践

**解决方案：**
让 Claude 分析您的参考文档并创建增强的 SKILL.md，包括：
- ✅ 从文档中提取的最佳代码示例
- ✅ 带有真实模式的实用快速参考
- ✅ 特定领域的指导
- ✅ 清晰的导航提示
- ✅ 解释的关键概念

---

## 快速开始

### 本地增强（推荐 - 免费）

使用您的 Claude Code Max 订阅 - 无 API 成本！

```bash
# 基本增强
skill-seekers enhance output/react/

# 使用自定义超时
skill-seekers enhance output/react/ --timeout 1200

# 后台模式（非阻塞）
skill-seekers enhance output/react/ --background

# 守护进程模式（终端关闭后仍存在）
skill-seekers enhance output/react/ --daemon
```

**要求：**
- Claude Code Max 计划
- 已安装 `claude` CLI

**时间：** 每个技能 30-60 秒

### API 增强（替代方案）

直接使用 Anthropic API（每个技能约 $0.15-$0.30）：

```bash
# 安装依赖项
pip install anthropic

# 设置 API 密钥
export ANTHROPIC_API_KEY=sk-ant-...

# 增强
skill-seekers enhance output/react/ --mode api
```

---

## 增强模式

Skill Seekers 支持 **4 种增强模式** 用于不同的工作流程：

### 1. 无头模式（默认）

**最适合：** CI/CD 管道、自动化脚本

```bash
# 在前台运行，等待完成
skill-seekers enhance output/react/

# 使用强制模式（无确认）
skill-seekers enhance output/react/ --force
```

**行为：**
- 直接运行 `claude` CLI
- **阻塞** 直到增强完成
- 显示进度输出
- 返回退出代码：0 = 成功，1 = 失败

### 2. 后台模式

**最适合：** 当您想继续工作时

```bash
# 在后台启动
skill-seekers enhance output/react/ --background

# 立即返回并创建状态文件
# 监控进度：
skill-seekers enhance-status output/react/

# 实时观察：
skill-seekers enhance-status output/react/ --watch
```

**行为：**
- 启动后台线程
- 立即返回
- 创建 `.enhancement_status.json` 用于监控
- 即使关闭终端，线程也会继续

### 3. 守护进程模式

**最适合：** 必须在父进程退出后存活的长时间运行任务

```bash
# 作为守护进程启动（完全分离）
skill-seekers enhance output/react/ --daemon

# 进程继续，即使您：
# - 关闭终端
# - 注销
# - SSH 会话结束

# 稍后检查状态：
skill-seekers enhance-status output/react/

# 查看日志：
tail -f output/react/.enhancement_daemon.log
```

**行为：**
- 使用 `nohup` 创建完全分离的进程
- 写入 `.enhancement_daemon.log`
- 创建带有 PID 的状态文件
- **在父进程退出后存活**

### 4. 终端模式（交互式）

**最适合：** 手动工作、调试

```bash
# 在新终端窗口中打开
skill-seekers enhance output/react/ --interactive-enhancement
```

**行为：**
- 打开新终端窗口（macOS）
- 可视化运行 Claude Code
- 完成后终端自动关闭
- 用于调试

---

## 模式比较

| 功能 | 无头 | 后台 | 守护进程 | 终端 |
|------|------|------|----------|------|
| **阻塞** | 是（等待） | 否（返回） | 否（返回） | 否（单独窗口） |
| **父进程退出后存活** | 否 | 否 | **是** | 是 |
| **进度监控** | 直接输出 | 状态文件 | 状态文件 + 日志 | 终端中可视化 |
| **强制模式** | ✅ 是 | ✅ 是 | ✅ 是 | ❌ 否 |
| **最适合** | CI/CD | 脚本 | 长任务 | 手动工作 |

---

## 增强做什么

1. **读取参考文件**（`references/*.md`）
2. **发送到 Claude** 并指示：
   - 提取 5-10 个最佳代码示例
   - 创建实用的快速参考
   - 编写特定领域的"何时使用"触发器
   - 添加有用的导航指导
3. **备份原始** SKILL.md 到 `SKILL.md.backup`
4. **保存增强版本** 作为新的 SKILL.md

---

## 增强示例

### 之前（自动生成）

```markdown
## 快速参考

### 常见模式

*在您使用技能时将添加快速参考模式。*
```

### 之后（AI 增强）

```markdown
## 快速参考

### 常见 API 模式

**授予促销物品：**
\`\`\`cpp
void CInventory::GrantPromoItems()
{
    SteamItemDef_t newItems[2];
    newItems[0] = 110;
    newItems[1] = 111;
    SteamInventory()->AddPromoItems( &s_GenerateRequestResult, newItems, 2 );
}
\`\`\`

**获取玩家库存中的所有物品：**
\`\`\`cpp
SteamInventoryResult_t resultHandle;
bool success = SteamInventory()->GetAllItems( &resultHandle );
\`\`\`

[... 8 个更多实用示例 ...]
```

---

## 多平台增强

### Claude AI（默认）

**本地模式（推荐 - 无需 API 密钥）：**
```bash
# 使用 Claude Code Max（无 API 成本）
skill-seekers enhance output/react/
```

**API 模式：**
```bash
# 需要 ANTHROPIC_API_KEY
export ANTHROPIC_API_KEY=sk-ant-...
skill-seekers enhance output/react/ --mode api
```

**模型：** Claude Sonnet 4
**格式：** 保持 YAML 前置元数据

### Google Gemini

```bash
# 安装 Gemini 支持
pip install skill-seekers[gemini]

# 设置 API 密钥
export GOOGLE_API_KEY=AIzaSy...

# 使用 Gemini 增强
skill-seekers enhance output/react/ --target gemini --mode api
```

**模型：** Gemini 2.0 Flash
**格式：** 转换为纯 markdown（无前置元数据）
**输出：** 更新 `system_instructions.md`

### OpenAI ChatGPT

```bash
# 安装 OpenAI 支持
pip install skill-seekers[openai]

# 设置 API 密钥
export OPENAI_API_KEY=sk-proj-...

# 使用 GPT-4o 增强
skill-seekers enhance output/react/ --target openai --mode api
```

**模型：** GPT-4o
**格式：** 转换为纯文本
**输出：** 更新 `assistant_instructions.txt`

### 平台比较

| 功能 | Claude | Gemini | OpenAI |
|------|--------|--------|--------|
| **本地模式** | ✅ 是（Claude Code Max） | ❌ 否 | ❌ 否 |
| **API 模式** | ✅ 是 | ✅ 是 | ✅ 是 |
| **模型** | Sonnet 4 | Gemini 2.0 Flash | GPT-4o |
| **格式** | YAML + MD | 纯 MD | 纯文本 |
| **成本（API）** | ~$0.15-0.30 | ~$0.10-0.25 | ~$0.20-0.35 |

**注意：** 本地模式是免费的，仅适用于 Claude AI。

---

## 监控后台任务

### 状态文件格式

使用 `--background` 或 `--daemon` 时，会创建状态文件：

**位置：** `{skill_directory}/.enhancement_status.json`

**格式：**
```json
{
  "status": "running",
  "message": "正在运行 Claude Code 增强...",
  "progress": 0.5,
  "timestamp": "2026-01-03T12:34:56.789012",
  "skill_dir": "/path/to/output/react",
  "error": null,
  "pid": 12345
}
```

**状态值：**
- `pending` - 任务已排队，未启动
- `running` - 当前正在执行
- `completed` - 成功完成
- `failed` - 发生错误

### 检查状态命令

```bash
# 一次性检查
skill-seekers enhance-status output/react/

# 输出：
# ============================================================
# 增强状态：运行中
# ============================================================
#
# 🔄 状态：运行中
#    消息：正在运行 Claude Code 增强...
#    进度：[██████████░░░░░░░░░░] 50%
#    PID：12345
```

### 观察模式（实时）

```bash
# 每 2 秒观察状态更新
skill-seekers enhance-status output/react/ --watch

# 自定义间隔
skill-seekers enhance-status output/react/ --watch --interval 5
```

### JSON 输出（用于脚本）

```bash
# 获取原始 JSON
skill-seekers enhance-status output/react/ --json

# 在脚本中使用
STATUS=$(skill-seekers enhance-status output/react/ --json | jq -r '.status')
if [ "$STATUS" = "completed" ]; then
    echo "增强完成！"
fi
```

---

## 高级工作流程

### 批量增强（多个技能）

```bash
#!/bin/bash
# 并行增强多个技能

skills=("react" "vue" "django" "fastapi")

for skill in "${skills[@]}"; do
    echo "开始增强：$skill"
    skill-seekers enhance output/$skill/ --background
done

echo "所有增强已在后台启动！"

# 监控所有
for skill in "${skills[@]}"; do
    skill-seekers enhance-status output/$skill/
done
```

### CI/CD 集成

```yaml
# GitHub Actions 示例
- name: 增强技能
  run: |
    # 无头模式（阻塞直到完成）
    skill-seekers enhance output/react/ --timeout 1200 --force

    # 检查增强是否成功
    if [ $? -eq 0 ]; then
      echo "✅ 增强成功"
    else
      echo "❌ 增强失败"
      exit 1
    fi
```

### 长时间运行的守护进程

```bash
# 为大型技能启动守护进程
skill-seekers enhance output/godot-large/ --daemon --timeout 3600

# 注销并稍后回来
# ...（几小时后）...

# 检查是否完成
skill-seekers enhance-status output/godot-large/
```

---

## 强制模式

**它做什么：** 跳过所有确认，自动回答"是"

**默认行为：** 强制模式**默认开启**以实现最大自动化

```bash
# 默认开启强制模式（无需标志）
skill-seekers enhance output/react/

# 如果您想要确认，则禁用强制模式
skill-seekers enhance output/react/ --no-force
```

**用例：**
- ✅ CI/CD 自动化（默认开启）
- ✅ 批量处理多个技能（默认开启）
- ✅ 无人值守执行（默认开启）
- ⚠️ 如果需要手动确认提示，请使用 `--no-force`

---

## 超时配置

默认超时：**600 秒（10 分钟）**

**根据技能大小调整：**

```bash
# 小技能（< 100 页）
skill-seekers enhance output/hono/ --timeout 300

# 中等技能（100-1000 页）
skill-seekers enhance output/react/ --timeout 600

# 大型技能（1000+ 页）
skill-seekers enhance output/godot/ --timeout 1200

# 超大型（带 PDF/GitHub 源）
skill-seekers enhance output/django-unified/ --timeout 1800
```

**超时时会发生什么：**
- 无头：立即返回错误
- 后台：状态标记为 `failed`
- 守护进程：状态标记为 `failed`
- 终端：Claude Code 继续运行（用户可以看到）

---

## 成本估算（API 模式）

- **输入**：约 50,000-100,000 个令牌（参考文档）
- **输出**：约 4,000 个令牌（增强的 SKILL.md）
- **模型**：claude-sonnet-4-20250514
- **估计成本**：每个技能 $0.15-$0.30

---

## 真实世界结果

**测试案例：steam-economy 技能**
- **之前：** 75 行，通用模板，空的快速参考
- **之后：** 570 行，10 个实用 API 示例，关键概念已解释
- **时间：** 60 秒
- **质量评级：** 9/10

增强成功地：
- 从 24 页文档中提取了最佳 HTTP/JSON 示例
- 解释了领域概念（资产类、上下文 ID、交易生命周期）
- 为初学者到高级用户创建了导航指导
- 添加了安全性、经济设计和 API 集成的最佳实践

---

## 文件工件

增强创建这些文件：

```
output/react/
├── SKILL.md                    # 增强文件
├── SKILL.md.backup             # 原始备份
├── .enhancement_status.json    # 状态（仅后台/守护进程）
├── .enhancement_daemon.log     # 日志（仅守护进程）
└── .enhancement_daemon.py      # 守护进程脚本（仅守护进程）
```

**清理：**
```bash
# 完成后删除状态文件
rm output/react/.enhancement_status.json
rm output/react/.enhancement_daemon.log
rm output/react/.enhancement_daemon.py
```

---

## 故障排除

### 工具不工作

**"找不到 claude 命令"**
```bash
# 安装 Claude Code CLI
# 参见：https://docs.claude.com/claude-code
```

**"增强超时"**
```bash
# 增加超时
skill-seekers enhance output/react/ --timeout 1200
```

**"SKILL.md 未更新"**
```bash
# 检查引用是否存在
ls output/react/references/

# 尝试终端模式查看发生了什么
skill-seekers enhance output/react/ --interactive-enhancement
```

### 后台任务问题

**后台任务没有进展：**
```bash
# 检查状态
skill-seekers enhance-status output/react/ --json

# 如果卡住，检查进程
ps aux | grep claude

# 如需要则杀死
kill -9 <PID>
```

**守护进程未启动：**
```bash
# 检查日志
cat output/react/.enhancement_daemon.log

# 检查状态文件
cat output/react/.enhancement_status.json

# 尝试不使用强制模式
skill-seekers enhance output/react/ --daemon --no-force
```

**状态文件显示错误：**
```bash
# 读取错误详情
skill-seekers enhance-status output/react/ --json | jq -r '.error'

# 常见修复：
# 1. 增加超时
# 2. 检查引用是否存在
# 3. 尝试终端模式进行调试
```

### API 模式问题

**"未提供 API 密钥"**
```bash
export ANTHROPIC_API_KEY=sk-ant-...
# 或
skill-seekers enhance output/react/ --mode api --api-key sk-ant-...
```

**"未找到引用文件"**
```bash
# 确保您已先运行抓取器
skill-seekers scrape --config configs/react.json
```

**"未安装 anthropic 包"**
```bash
pip install anthropic
```

**不喜欢结果？**
```bash
# 恢复原始
mv output/react/SKILL.md.backup output/react/SKILL.md

# 再试一次（可能生成不同的内容）
skill-seekers enhance output/react/
```

---

## 最佳实践

1. **默认使用无头** - 简单可靠
2. **脚本使用后台** - 当您需要做其他工作时
3. **大任务使用守护进程** - 当任务可能需要数小时时
4. **在 CI/CD 中使用强制** - 避免在确认上挂起
5. **始终设置超时** - 防止无限等待
6. **监控后台任务** - 使用 enhance-status 检查进度
7. **审查输出** - AI 很好但不完美
8. **保留备份** - 原始保存为 SKILL.md.backup

---

## 何时使用增强

**使用增强当：**
- 您想快速获得高质量的 SKILL.md
- 处理大型文档（50+ 页）
- 为不熟悉的框架创建技能
- 需要提取实用的代码示例
- 希望多个技能之间的质量保持一致

**跳过增强当：**
- 预算受限（使用 API 模式手动编辑）
- 非常小的文档（<10 页）
- 您非常了解框架
- 文档没有代码示例

---

## 模式选择指南

| 用例 | 推荐模式 | 原因 |
|------|----------|------|
| **CI/CD 管道** | 无头 + 强制 | 阻塞直到完成，无提示 |
| **手动使用** | 无头 | 简单，显示进度 |
| **批量处理** | 后台 | 非阻塞，并行处理 |
| **SSH/远程** | 守护进程 | 在 SSH 断开后存活 |
| **调试** | 终端 | 视觉反馈 |
| **大型技能** | 守护进程 + 高超时 | 不会被中断 |

---

## 与手动编辑的比较

| 方面 | 手动编辑 | 本地增强 | API 增强 |
|------|----------|----------|----------|
| 时间 | 15-30 分钟 | 30-60 秒 | 30-60 秒 |
| 代码示例 | 您选择 | AI 选择最佳 | AI 选择最佳 |
| 快速参考 | 自己写 | 自动生成 | 自动生成 |
| 领域指导 | 您的知识 | 来自文档 | 来自文档 |
| 一致性 | 不同 | 一致 | 一致 |
| 成本 | 免费（您的时间） | 免费（Max 计划） | 每个技能约 $0.20 |
| 设置 | 无 | 无 | 需要 API 密钥 |
| 质量 | 高（如果是专家） | 9/10 | 9/10 |
| **推荐？** | 仅专家 | ✅ **是** | 如果没有 Max 计划 |

---

## 下一步

**教程：**
- [抓取文档](/docs/tutorials/scraping-docs) - 创建要增强的技能
- [多源技能](/docs/tutorials/multi-source-skills) - 增强前组合源

**手册：**
- [多平台支持](/docs/manual/platforms/overview) - 平台特定的增强
- [MCP 设置](/docs/manual/mcp/setup) - 通过 MCP 使用增强

**CLI 参考：**
- [enhance 命令](/docs/cli/enhance) - 完整命令参考
- [enhance-status 命令](/docs/cli/enhance-status) - 监控参考
