---
title: "从任何源自动生成 AI 知识"
description: "使用 Skill Seekers GitHub Action 设置 CI/CD 管道，在文档、仓库或代码库更改时自动更新您的 AI 技能"
pubDate: 2026-02-16
author: "Skill Seekers 团队"
authorTwitter: "@skillseekers"
tags: ["github-actions", "ci-cd", "自动化", "devops"]
---

# 使用 GitHub Actions 自动生成 AI 知识

使用 Skill Seekers v3.0.0 GitHub Action 从任何源自动保持您的 AI 技能最新。

## 工作流程

```yaml
name: 更新 AI 技能
on:
  schedule:
    - cron: '0 0 * * 0'  # 每周
  workflow_dispatch:  # 手动触发

jobs:
  update-skills:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: 从文档更新 React 技能
        uses: skill-seekers/action@v1
        with:
          config: configs/react.json
          format: langchain
          output: skills/react/
          
      - name: 从仓库更新内部 API 技能
        run: |
          skill-seekers analyze --directory ./api --format langchain
          skill-seekers package output/api --target langchain
          
      - name: 提交更改
        run: |
          git config user.name "GitHub Action"
          git config user.email "action@github.com"
          git add skills/
          git commit -m "更新 AI 技能 - $(date +%Y-%m-%d)"
          git push
```

## 功能

### 多源支持

自动处理任何源：

- 📚 **文档** - 文档更改时自动更新
- 🐙 **GitHub 仓库** - 跟踪上游框架变更
- 📄 **PDF 文件** - 处理更新的手册
- 💻 **本地代码库** - 与您自己的代码同步

### 自动更新

- ⏰ **定时运行** - 每周、每天或自定义计划
- 🔄 **按需** - 需要时手动触发
- 📝 **自动提交** - 自动提交更改
- 📊 **通知** - 获取更新通知

### 多框架支持

```yaml
strategy:
  matrix:
    source: 
      - { type: config, name: react }
      - { type: config, name: vue }
      - { type: github, url: https://github.com/django/django }
      
steps:
  - uses: skill-seekers/action@v1
    with:
      config: configs/${{ matrix.source.name }}.json
      format: langchain
```

### 云存储集成

```yaml
- uses: skill-seekers/action@v1
  with:
    config: configs/react.json
    format: langchain
    cloud: s3
    bucket: my-knowledge-base
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_KEY }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET }}
```

## 完整示例

```yaml
name: AI 知识管道

on:
  schedule:
    - cron: '0 2 * * 0'  # 每周日凌晨 2 点
  workflow_dispatch:
  push:
    branches: [main]  # 代码库更改时也运行

jobs:
  build-skills:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        include:
          # 从文档
          - source: docs
            config: react
            format: langchain
          # 从 GitHub
          - source: github
            repo: https://github.com/vuejs/vue
            format: llamaindex
          # 从本地代码库
          - source: local
            directory: ./internal-api
            format: markdown
    
    steps:
      - name: 检出
        uses: actions/checkout@v4
        
      - name: 设置 Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          
      - name: 安装 Skill Seekers
        run: pip install skill-seekers
        
      - name: 从文档生成技能
        if: matrix.source == 'docs'
        run: |
          skill-seekers scrape \
            --config configs/${{ matrix.config }}.json \
            --format ${{ matrix.format }}
            
      - name: 从 GitHub 生成技能
        if: matrix.source == 'github'
        run: |
          skill-seekers scrape \
            --format ${{ matrix.format }} \
            --github ${{ matrix.repo }}
            
      - name: 从本地代码生成技能
        if: matrix.source == 'local'
        run: |
          skill-seekers analyze \
            --directory ${{ matrix.directory }} \
            --format ${{ matrix.format }}
            
      - name: 打包技能
        run: |
          skill-seekers package output/ --target ${{ matrix.format }}
            
      - name: 上传到云
        run: |
          skill-seekers cloud upload output/ \
            --provider s3 \
            --bucket team-knowledge
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET }}
```

## Docker 替代方案

```yaml
- name: 使用 Docker 生成
  run: |
    docker run -v $(pwd):/data \
      skill-seekers:latest \
      scrape --config /data/config.json
```

## 通知

技能更新时获取通知：

```yaml
- name: 通知 Slack
  if: success()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "🤖 AI 技能更新成功！"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

## 最佳实践

1. **多源** - 组合文档 + 仓库 + 您自己的代码
2. **明智安排** - 不要压垮文档服务器
3. **使用缓存** - 在运行之间缓存依赖项
4. **监控成本** - 云存储有费用
5. **版本控制** - 在 git 中跟踪技能更改
6. **先测试** - 计划之前手动运行

## 结果

您的 AI 知识从所有源保持新鲜，无需手动工作。非常适合：
- 团队知识库（文档 + 内部代码）
- 自动更新文档
- 跟踪上游框架变更
- CI/CD 集成工作流
- 多环境部署

今天开始自动化！
