---
title: Kubernetes 部署
description: 在 Kubernetes 上运行 Skill Seekers。可扩展、有弹性、生产级。
section: deployments
order: 2
---

# Kubernetes 部署

在 **Kubernetes** 上运行 Skill Seekers。可扩展、有弹性、生产级。

## 快速开始

```bash
# 应用清单
kubectl apply -f k8s/

# 检查状态
kubectl get pods -l app=skill-seekers
```

## Helm 图表

```bash
# 添加仓库
helm repo add skillseekers https://charts.skillseekers.io

# 安装
helm install skill-seekers skillseekers/skill-seekers \
  --set config.name=react \
  --set schedule="0 0 * * 0"
```

## 用于定时抓取的 CronJob

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: skill-seekers-scrape
spec:
  schedule: "0 2 * * 0"  # 每周
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

## 用于配置的 ConfigMap

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

## 特性

- ✅ **可扩展** - 并行运行多个任务
- ✅ **有弹性** - 自动重试和故障转移
- ✅ **定时调度** - 用于自动化的 CronJobs
- ✅ **可监控** - 提供 Prometheus 指标
