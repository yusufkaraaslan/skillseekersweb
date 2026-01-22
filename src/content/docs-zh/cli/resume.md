---
title: resume - 恢复中断的作业
description: 从检查点恢复中断的抓取作业并管理可恢复作业历史记录
section: cli
order: 10
---

# resume - 恢复中断的作业

从保存的检查点恢复中断的抓取作业并管理作业历史记录。

## 基本用法

```bash
skill-seekers resume [OPTIONS] [JOB_ID]
```

## 快速示例

```bash
# 列出所有可恢复作业
skill-seekers resume --list

# 按 ID 恢复特定作业
skill-seekers resume abc123def456

# 清理旧作业文件
skill-seekers resume --clean

# 查看作业详情
skill-seekers resume --list --verbose
```

## 选项

### 操作

- `--list` - 列出所有可恢复作业及进度详情
- `--clean` - 清理旧作业文件（遵守配置设置）
- `JOB_ID` - 从检查点恢复特定作业

### 显示选项

- `--verbose` - 显示详细作业信息
- `--format FORMAT` - 输出格式：table、json、simple（默认：table）

## 恢复功能

### 何时保存作业

Skill Seekers 自动保存可恢复操作的进度：

**自动保存的操作：**
- 文档抓取（每 N 页检查点）
- GitHub 仓库分析（每个阶段后检查点）
- PDF 提取（每个文件后检查点）
- 多源统一抓取（每个源检查点）

**保存间隔：**
- 默认：60 秒
- 可配置：`skill-seekers config` → 恢复设置

### 进度存储

**位置：**
```
~/.local/share/skill-seekers/progress/<job-id>.json
```

**作业文件结构：**
```json
{
  "job_id": "abc123def456",
  "command": "skill-seekers github --repo facebook/react",
  "started_at": "2026-01-18T10:30:00Z",
  "last_updated": "2026-01-18T10:45:00Z",
  "progress": {
    "phase": "代码分析",
    "files_processed": 1234,
    "files_total": 2000,
    "percent_complete": 61.7
  },
  "checkpoints": {
    "scraping_complete": true,
    "analysis_phase_1": true,
    "analysis_phase_2": false
  },
  "metadata": {
    "repo": "facebook/react",
    "output_dir": "output/react"
  }
}
```

## 列出作业

### 基本列表

```bash
skill-seekers resume --list
```

**输出：**
```
可恢复作业（找到 3 个）
─────────────────────────────────────────────────────────────────

作业 ID：abc123def456
开始时间：2026-01-18 10:30:00
命令：skill-seekers github --repo facebook/react
进度：代码分析（61.7% - 1234/2000 个文件）
最后更新：2 分钟前

作业 ID：def456ghi789
开始时间：2026-01-17 15:20:00
命令：skill-seekers scrape https://docs.astro.build
进度：抓取（450/500 页）
最后更新：1 天前

作业 ID：ghi789jkl012
开始时间：2026-01-16 09:00:00
命令：skill-seekers unified --config configs/godot_full.json
进度：源 2/3（GitHub 分析）
最后更新：2 天前
```

### 详细列表

```bash
skill-seekers resume --list --verbose
```

**显示额外详情：**
- 带参数的完整命令
- 所有检查点状态
- 估计剩余时间
- 输出目录路径
- 错误日志（如果有）

### JSON 格式

```bash
skill-seekers resume --list --format json
```

**用例：**
- 脚本和自动化
- 与其他工具集成
- 在 CI/CD 管道中解析

## 恢复作业

### 按作业 ID 恢复

```bash
skill-seekers resume abc123def456
```

**发生的事情：**
1. 从进度文件加载作业元数据
2. 验证检查点完整性
3. 从最后一个成功的检查点恢复
4. 像往常一样继续操作
5. 自动更新进度文件

### 恢复最新作业

```bash
# 列出并恢复最近的作业
skill-seekers resume --list
skill-seekers resume $(skill-seekers resume --list --format json | jq -r '.[0].job_id')
```

### 速率限制后恢复

如果 GitHub 抓取作业达到速率限制：

```bash
# 检查作业状态
skill-seekers resume --list

# 等待速率限制重置或切换配置文件
skill-seekers config --github  # 添加另一个配置文件

# 使用不同的配置文件恢复
skill-seekers resume abc123def456 --profile work
```

## 清理

### 自动清理

在 `skill-seekers config` 中配置：

**默认设置：**
- 自动清理年龄：7 天
- 早于 7 天的作业在下次运行时自动删除

### 手动清理

```bash
# 删除所有早于配置年龄的作业
skill-seekers resume --clean
```

**输出：**
```
正在清理旧作业文件...
✓ 已删除 abc123def456（10 天前开始）
✓ 已删除 def456ghi789（15 天前开始）
保留 ghi789jkl012（2 天前开始）

清理了 2 个作业文件。
```

### 强制清理所有

```bash
# 删除所有作业文件，无论年龄如何
skill-seekers resume --clean --all
```

**警告：** 这会删除所有可恢复作业，包括最近的作业。

## 恢复场景

### 场景 1：网络中断

**问题：** 文档抓取期间互联网断开连接

```bash
# 原始命令
skill-seekers scrape https://docs.django.com --max-pages 1000

# ... 第 450 页网络中断 ...

# 网络恢复后恢复
skill-seekers resume --list
skill-seekers resume abc123def456
```

**结果：** 从第 450 页恢复，跳过已抓取的页面

### 场景 2：达到速率限制

**问题：** 仓库分析期间超过 GitHub API 速率限制

```bash
# 原始命令
skill-seekers github --repo microsoft/vscode

# ... 30 分钟后达到速率限制 ...

# 选项 1：等待并恢复
#（等待速率限制重置）
skill-seekers resume abc123def456

# 选项 2：切换配置文件并恢复
skill-seekers config --github  # 添加新配置文件
skill-seekers resume abc123def456 --profile work
```

**结果：** 从最后一个检查点继续分析

### 场景 3：系统崩溃

**问题：** 统一抓取期间计算机崩溃

```bash
# 原始命令
skill-seekers unified --config configs/godot_full.json

# ... 系统崩溃 ...

# 重启后，列出作业
skill-seekers resume --list

# 从检查点恢复
skill-seekers resume abc123def456
```

**结果：** 从最后一次自动保存恢复（默认：60 秒）

### 场景 4：手动取消

**问题：** 意外取消长时间运行的作业

```bash
# 执行期间按 Ctrl+C

# 稍后恢复
skill-seekers resume --list
skill-seekers resume abc123def456
```

**结果：** 从中断处继续

## 进度跟踪

### 理解进度

**阶段指示器：**
- `初始化` - 设置抓取环境
- `抓取` - 获取页面/文件
- `代码分析` - AST 解析（仅 GitHub 仓库）
- `C3.x 分析` - 设计模式、测试提取（如果启用）
- `增强` - AI 增强阶段
- `打包` - 完成技能包

**进度指标：**
- 已处理文件/页面与总数
- 完成百分比
- 当前阶段
- 估计时间（详细模式）

### 实时更新

运行时，恢复的作业显示进度：

```
正在恢复作业 abc123def456...
已加载检查点：代码分析（阶段 1 完成）

正在处理文件：[████████░░░░░░░░] 1500/2000（75%）
当前文件：src/components/Button.tsx
已用时间：45m 23s | 剩余时间：~15m 12s
```

## 恢复配置

在 `skill-seekers config` 中配置恢复行为：

### 自动保存间隔

**默认：** 60 秒

```bash
skill-seekers config
# → 选择「4. 恢复设置」
# → 选择「自动保存间隔」
# → 输入新值（建议 30-300 秒）
```

**权衡：**
- 较低间隔（30 秒）- 更频繁的保存，更好的恢复粒度，轻微的性能影响
- 较高间隔（120 秒）- 较少的保存，崩溃时可能丢失更多进度

### 自动清理年龄

**默认：** 7 天

```bash
skill-seekers config
# → 选择「4. 恢复设置」
# → 选择「自动清理年龄」
# → 输入新值（建议 1-30 天）
```

**建议：**
- 开发：7 天（默认）
- CI/CD：1 天（快速清理）
- 生产：14 天（保留更长历史）

## 限制

### 不可恢复

这些操作无法恢复：
- `enhance` 命令（基于 API 的增强）
- `package` 命令（快速操作）
- `upload` 命令（快速上传）

### 部分恢复

这些操作有限制地恢复：
- **AI 增强（LOCAL 模式）** - 按文件恢复，可能重新增强某些文件
- **并行抓取** - 可能重新抓取中断批次的页面

## 与其他命令集成

### GitHub 命令

```bash
# 开始 GitHub 抓取
skill-seekers github --repo facebook/react

# 如果中断，恢复它
skill-seekers resume <job-id>

# 使用不同选项恢复
skill-seekers resume <job-id> --profile work --non-interactive
```

### Unified 命令

```bash
# 开始多源抓取
skill-seekers unified --config configs/framework.json

# 如果在源 2 期间中断，恢复
skill-seekers resume <job-id>

# 从检查点继续：源 2 分析
```

## 故障排除

### 找不到作业

```bash
# 验证作业存在
skill-seekers resume --list

# 检查进度文件位置
ls -la ~/.local/share/skill-seekers/progress/

# 如果缺失，重新创建进度目录
mkdir -p ~/.local/share/skill-seekers/progress/
```

### 检查点损坏

```bash
# 如果恢复失败并显示「检查点已损坏」：

# 选项 1：重新开始
skill-seekers github --repo owner/repo --output output/repo_new

# 选项 2：删除损坏的检查点
rm ~/.local/share/skill-seekers/progress/<job-id>.json
```

### 权限错误

```bash
# 修复进度目录的权限
chmod 700 ~/.local/share/skill-seekers/progress/
chmod 600 ~/.local/share/skill-seekers/progress/*.json
```

## 最佳实践

1. **定期检查作业列表** - 使用 `--list` 查看待处理作业
2. **清理旧作业** - 每月运行 `--clean` 以释放磁盘空间
3. **调试时使用详细模式** - `--list --verbose` 显示完整详情
4. **及时恢复** - 早于清理年龄的作业会自动删除
5. **验证检查点** - Resume 命令在继续前验证完整性
6. **使用较短的自动保存间隔** - 用于不稳定的网络或系统
7. **保留作业历史** - 对于生产，将清理年龄增加到 14-30 天

## 另见

- [config 命令](/docs/cli/config) - 配置恢复设置
- [github 命令](/docs/cli/github) - GitHub 仓库抓取
- [速率限制管理](/docs/guides/rate-limit-management) - 使用 resume 处理速率限制
