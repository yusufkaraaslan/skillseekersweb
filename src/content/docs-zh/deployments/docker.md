---
title: Docker 部署
description: 在 Docker 容器中运行 Skill Seekers。一致的、可移植的、生产就绪的解决方案。
section: deployments
order: 1
---

# Docker 部署

在 **Docker 容器** 中运行 Skill Seekers。一致的、可移植的、生产就绪的解决方案。

## 快速开始

```bash
# 拉取镜像
docker pull skillseekers/skill-seekers:latest

# 运行抓取
docker run -v $(pwd):/data skillseekers/skill-seekers:latest \
  scrape --config /data/config.json
```

## Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# 安装依赖
RUN pip install skill-seekers

# 复制配置
COPY configs/ /app/configs/

# 默认命令
CMD ["skill-seekers", "--help"]
```

## Docker Compose

```yaml
version: '3.8'

services:
  skill-seekers:
    image: skillseekers/skill-seekers:latest
    volumes:
      - ./configs:/app/configs
      - ./output:/app/output
      - ./.env:/app/.env
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - GITHUB_TOKEN=${GITHUB_TOKEN}
    command: scrape --config /app/configs/react.json
```

## 构建自定义镜像

```bash
# 构建
docker build -t my-skill-seekers .

# 运行
docker run -v $(pwd)/output:/app/output my-skill-seekers \
  scrape --config configs/react.json
```

## CI/CD 流水线

```yaml
# .github/workflows/skills.yml
name: Update Skills

on:
  schedule:
    - cron: '0 0 * * 0'  # 每周

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Generate Skills
        run: |
          docker run -v $(pwd):/data \
            skillseekers/skill-seekers:latest \
            scrape --config /data/configs/react.json
```

## 特性

- ✅ **一致的环境** - 处处使用相同的 Python 版本
- ✅ **可移植** - 在任何支持 Docker 的地方运行
- ✅ **隔离的** - 无系统依赖
- ✅ **CI/CD 就绪** - 完美适配 GitHub Actions
