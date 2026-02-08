---
title: Production Deployment
description: Best practices for deploying Skill Seekers in production environments.
section: deployments
order: 3
---

# Production Deployment

Best practices for deploying Skill Seekers in **production**.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Source    │────▶│Skill Seekers │────▶│ Vector DB   │
│(Docs/GitHub)│     │  (Processing)│     │(Pinecone/  │
└─────────────┘     └──────────────┘     │ Weaviate)   │
                                          └─────────────┘
```

## Checklist

### Security
- [ ] Use environment variables for API keys
- [ ] Store configs in secrets (K8s) or vault
- [ ] Limit network access to necessary sources
- [ ] Enable audit logging

### Performance
- [ ] Use async mode (`--async`)
- [ ] Enable caching
- [ ] Rate limit requests
- [ ] Monitor memory usage

### Reliability
- [ ] Set up health checks
- [ ] Configure retry logic
- [ ] Use persistent storage for output
- [ ] Schedule regular jobs

## Environment Variables

```bash
# Required
export ANTHROPIC_API_KEY=sk-...
export GITHUB_TOKEN=ghp_...

# Optional
export RATE_LIMIT=1.0
export MAX_PAGES=1000
export CACHE_DIR=/var/cache/skill-seekers
```

## Monitoring

```python
# Add to your pipeline
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

## Scaling

### Horizontal Scaling

```yaml
# Run multiple scrapers in parallel
apiVersion: batch/v1
kind: Job
metadata:
  name: skill-seekers-parallel
spec:
  parallelism: 5  # 5 concurrent jobs
  template:
    spec:
      containers:
      - name: scraper
        image: skillseekers/skill-seekers:latest
```

### Queue-Based

Use Celery or RQ for distributed processing:

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

## Backup & Recovery

```bash
# Backup vector database
kubectl exec -it pod/weaviate-0 -- weaviate-cli backup create

# Backup configs
kubectl get configmap skill-seekers-configs -o yaml > configs-backup.yaml
```

## Next Steps

- [Docker Deployment](/docs/deployments/docker) - Container basics
- [Kubernetes Deployment](/docs/deployments/kubernetes) - Orchestration
