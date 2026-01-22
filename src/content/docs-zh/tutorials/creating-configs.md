---
title: "教程：创建自定义配置"
description: 为任何文档网站创建自定义配置文件的分步教程
section: tutorials
order: 5
---

# 教程：创建自定义配置

学习如何为预设未涵盖的文档网站创建自定义配置文件。

**时间：** 15 分钟 | **级别：** 中级 | **结果：** 可用的自定义配置

---

## 交互式配置创建

创建配置的最简单方法：

```bash
skill-seekers scrape --interactive
```

**按照提示操作：**
1. 输入基础 URL
2. 在示例页面上测试选择器
3. 验证提取的内容
4. 保存配置

## 手动配置创建

创建 `configs/my-framework.json`：

```json
{
  "name": "my-framework",
  "base_url": "https://docs.my-framework.com/",
  "selectors": {
    "content": "article.documentation",
    "title": "h1.page-title",
    "code": "pre code"
  },
  "url_patterns": [
    "^https://docs.my-framework.com/guide/",
    "^https://docs.my-framework.com/api/"
  ],
  "exclude_patterns": [
    "/changelog/",
    "/blog/"
  ],
  "max_pages": 200,
  "rate_limit": 0.5
}
```

## 测试您的配置

```bash
# 估算页数
skill-seekers estimate --config configs/my-framework.json

# 在前 10 页上测试
skill-seekers scrape \
  --config configs/my-framework.json \
  --max-pages 10 \
  --output output/test/
```

## 分享您的配置

```bash
# 提交到社区
skill-seekers submit-config \
  --config configs/my-framework.json \
  --description "My Framework 文档配置"
```

**参见：** [配置格式参考](/docs/class-reference/config-format)获取所有可用选项。
