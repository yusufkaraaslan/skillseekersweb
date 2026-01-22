---
title: "教程：多源技能"
description: 将文档、GitHub 仓库和 PDF 组合成统一全面技能的分步教程
section: tutorials
order: 4
---

# 教程：多源技能（统一抓取）

学习如何将多个源（文档 + GitHub + PDF）组合成一个全面的技能。

**时间：** 25 分钟 | **级别：** 高级 | **结果：** 具有完整知识的统一技能

---

## 为什么需要统一技能？

**问题：** 仅文档不显示实际用法。仅代码不解释概念。PDF 有规范但没有示例。

**解决方案：** 将所有源组合成一个技能！

## 步骤 1：创建统一配置

```json
{
  "name": "django-complete",
  "sources": [
    {
      "type": "documentation",
      "base_url": "https://docs.djangoproject.com/en/stable/",
      "max_pages": 500,
      "priority": 1
    },
    {
      "type": "github",
      "repository": "django/django",
      "local_repo_path": "/path/to/django",
      "include_issues": true,
      "priority": 2
    },
    {
      "type": "pdf",
      "directory": "/path/to/django-books/",
      "priority": 3
    }
  ],
  "conflict_resolution": "priority"
}
```

## 步骤 2：运行统一抓取器

```bash
skill-seekers unified \
  --config configs/django-complete.json \
  --output output/django-unified/
```

## 步骤 3：查看冲突检测

Skill Seekers 自动检测并解决重复内容：

```
⚠️ 冲突检测报告：
- 找到 23 个重复页面
- 按优先级解决了 18 个
- 合并了 5 个（互补内容）
✅ 最终技能：892 个唯一页面
```

## 步骤 4：增强和打包

```bash
# 增强
skill-seekers enhance output/django-unified/

# 打包
skill-seekers package output/django-unified/ --target claude
```

**结果：** 完整的 Django 知识 - 概念、示例、模式和规范 - 全部在一个技能中！

**参见：** [统一抓取手册](/docs/manual/scraping/unified)获取高级技术。
