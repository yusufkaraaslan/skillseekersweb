---
title: Kubernetes Deployment
description: Run Skill Seekers on Kubernetes. Scalable, resilient, production-grade.
section: deployments
order: 2
---

# Kubernetes Deployment

Run Skill Seekers on **Kubernetes**. Scalable, resilient, production-grade.

## Quick Start

```bash
# Apply manifests
kubectl apply -f k8s/

# Check status
kubectl get pods -l app=skill-seekers
```

## Helm Chart

```bash
# Add repo
helm repo add skillseekers https://charts.skillseekers.io

# Install
helm install skill-seekers skillseekers/skill-seekers \
  --set config.name=react \
  --set schedule="0 0 * * 0"
```

## CronJob for Scheduled Scraping

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: skill-seekers-scrape
spec:
  schedule: "0 2 * * 0"  # Weekly
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: skill-seekers
            image: skillseekers/skill-seekers:latest
            command:
              - skill-seekers
              - scrape
              - --config
              - /config/react.json
            volumeMounts:
              - name: config
                mountPath: /config
              - name: output
                mountPath: /output
          volumes:
            - name: config
              configMap:
                name: skill-seekers-configs
            - name: output
              persistentVolumeClaim:
                claimName: skill-seekers-output
          restartPolicy: OnFailure
```

## ConfigMap for Configurations

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: skill-seekers-configs
data:
  react.json: |
    {
      "name": "react",
      "url": "https://react.dev",
      "target": "langchain"
    }
```

## Features

- ✅ **Scalable** - Run multiple jobs in parallel
- ✅ **Resilient** - Automatic retries and failover
- ✅ **Scheduled** - CronJobs for automation
- ✅ **Monitored** - Prometheus metrics available
