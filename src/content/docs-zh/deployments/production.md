---
title: 生产环境部署
description: 在生产环境中部署 Skill Seekers 的最佳实践。
section: deployments
order: 3
---

# 生产环境部署

在**生产环境**中部署 Skill Seekers 的最佳实践。

## 架构

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Source    │────▶│Skill Seekers │────▶│ Vector DB   │
│(Docs/GitHub)│     │  (Processing)│     │(Pinecone/  │
└─────────────┘     └──────────────┘     │ Weaviate)   │
                                          └─────────────┘
```

## 检查清单

### 安全性
- [ ] 使用环境变量存储 API 密钥
- [ ] 将配置存储在 secrets (K8s) 或 vault 中
- [ ] 限制网络访问仅限必要的来源
- [ ] 启用审计日志

### 性能
- [ ] 使用异步模式 (`--async`)
- [ ] 启用缓存
- [ ] 限制请求速率
- [ ] 监控内存使用

### 可靠性
- [ ] 设置健康检查
- [ ] 配置重试逻辑
- [ ] 为输出使用持久化存储
- [ ] 调度定期任务

## 环境变量

```bash
# 必需
export ANTHROPIC_API_KEY=sk-...
export GITHUB_TOKEN=ghp_...

# 可选
export RATE_LIMIT=1.0
export MAX_PAGES=1000
export CACHE_DIR=/var/cache/skill-seekers
```

## 监控

```python
# 添加到你的管道
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/var/log/skill-seekers.log'),
        logging.StreamHandler()
    ]
)
```

## 扩展

### 水平扩展

```yaml
# 并行运行多个抓取器
apiVersion: batch/v1
kind: Job
metadata:
  name: skill-seekers-parallel
spec:
  parallelism: 5  # 5 个并发任务
  template:
    spec:
      containers:
      - name: scraper
        image: skillseekers/skill-seekers:latest
```

### 基于队列

使用 Celery 或 RQ 进行分布式处理：

```python
from celery import Celery

app = Celery('skill-seekers')

@app.task
def scrape_task(config_path):
    subprocess.run([
        'skill-seekers', 'scrape',
        '--config', config_path
    ])
```

## 备份与恢复

```bash
# 备份向量数据库
kubectl exec -it pod/weaviate-0 -- weaviate-cli backup create

# 备份配置
kubectl get configmap skill-seekers-configs -o yaml > configs-backup.yaml
```

## 下一步

- [Docker 部署](/docs/deployments/docker) - 容器基础
- [Kubernetes 部署](/docs/deployments/kubernetes) - 编排
