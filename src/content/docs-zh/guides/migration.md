---
title: 迁移指南
description: 从 v2.x 迁移到 v3.0.0。破坏性变更和升级步骤。
section: guides
order: 3
---

# 迁移指南

从 **v2.x 迁移到 v3.0.0**。

## 概览

v3.0.0 对基本使用**向后兼容**。所有 v2.x 配置和命令均无需更改即可工作。

## 新功能

| 特性 | v2.x | v3.0.0 |
|---------|------|--------|
| 输出格式 | 4 | 16 |
| MCP 工具 | 9 | 26 |
| 输入源 | 3 | 4 (+本地代码库) |
| 云存储 | ❌ | ✅ S3/GCS/Azure |
| 多代理 | ❌ | ✅ Claude/Copilot/Codex |
| Godot 支持 | ❌ | ✅ 信号流分析 |
| 测试 | 700+ | 1,852 |

## 升级步骤

### 1. 更新包

```bash
pip install --upgrade skill-seekers
```

### 2. 验证安装

```bash
skill-seekers --version
# 应显示 3.0.0
```

### 3. 测试现有配置

```bash
# 你的 v2.x 配置仍然有效
skill-seekers scrape --config configs/react.json
```

## 值得尝试的新功能

### 本地代码库分析

```bash
# v3.0.0 新增
skill-seekers analyze --directory ./my-project --format langchain
```

### 云上传

```bash
# v3.0.0 新增
skill-seekers cloud upload output/react/ --provider s3 --bucket my-bucket
```

### 多代理支持

```bash
# v3.0.0 新增
skill-seekers enhance --agent copilot
```

## 已弃用功能

无！v3.0.0 仅添加功能。

## 故障排除

### 问题：找不到命令

```bash
# 重新安装
pip uninstall skill-seekers
pip install skill-seekers
```

### 问题：配置验证失败

```bash
# 更新配置模式
skill-seekers config --wizard
```

## 下一步

- [探索新集成](/docs/integrations) - 16 种输出格式
- [尝试云存储](/docs/deployments/production) - S3/GCS/Azure
