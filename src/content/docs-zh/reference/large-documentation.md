---
title: 大型文档处理
description: 使用拆分策略、并行抓取、检查点和路由器模式处理 10,000+ 页文档站点的完整指南
section: reference
order: 6
---

# 大型文档处理

**抓取和管理 10,000+ 页文档站点的策略。**

## 概述

大型文档站点（10K+ 页）带来独特的挑战：
- **令牌限制** - 单个技能超过 Claude/Gemini/OpenAI 上下文窗口
- **抓取时间** - 10K 页 × 1 秒 = 3+ 小时
- **内存使用** - 在内存中存储 10K 页
- **技能可用性** - 内容过多使技能变慢且失焦

**解决方案：**
1. **拆分策略** - 分成基于类别的子技能
2. **路由器模式** - 智能路由到正确的子技能
3. **并行抓取** - 多工作进程并发抓取
4. **检查点** - 恢复中断的抓取
5. **基于大小的拆分** - 按令牌预算自动拆分

**版本：** v2.0.0+

---

## 何时使用大型文档策略

### 大小阈值

| 页数 | 建议 | 策略 |
|-------|----------------|----------|
| < 500 | 单个技能 | 标准抓取 |
| 500-2000 | 单个技能 + 优化 | 异步抓取，选择性内容 |
| 2000-5000 | 考虑拆分 | 基于类别的拆分 |
| 5000-10000 | 强烈建议拆分 | 路由器 + 子技能 |
| 10000+ | 必须拆分 | 路由器 + 并行抓取 |

### 需要拆分的指标

- ✅ 文档组织成明确的类别（API、指南、教程等）
- ✅ 估计令牌数 > 100K
- ✅ 估计抓取时间 > 1 小时
- ✅ 不同部分服务于不同的用例

---

## 拆分策略

### 1. 基于类别的拆分（推荐）

**最适合：** 具有明确分类组织的文档

**工作原理：** 将每个类别抓取到单独的子技能中，创建路由器

**示例：Kubernetes 文档**

```bash
# 1. 按类别拆分
skill-seekers scrape --config configs/k8s-concepts.json --output output/k8s-concepts/
skill-seekers scrape --config configs/k8s-tasks.json --output output/k8s-tasks/
skill-seekers scrape --config configs/k8s-api.json --output output/k8s-api/

# 2. 创建路由器
skill-seekers router \
  output/k8s-concepts/ \
  output/k8s-tasks/ \
  output/k8s-api/ \
  --output output/k8s-router/ \
  --name kubernetes-complete

# 3. 打包
skill-seekers package output/k8s-router/ --include-subskills
```

**配置示例（k8s-concepts.json）：**
```json
{
  "name": "kubernetes-concepts",
  "base_url": "https://kubernetes.io/docs/concepts/",
  "url_patterns": {
    "include": ["concepts"],
    "exclude": []
  },
  "max_pages": 500
}
```

### 2. 基于大小的拆分（自动）

**最适合：** 无组织的文档或统一结构

**工作原理：** 超过令牌预算时自动拆分

```bash
# 每个技能自动拆分为 50K 令牌
skill-seekers scrape --config configs/large-docs.json \
  --auto-split \
  --max-tokens 50000 \
  --output output/large-docs/

# 创建：
# output/large-docs-part1/
# output/large-docs-part2/
# output/large-docs-part3/
# output/large-docs-router/  (自动生成)
```

### 3. 路由器优先拆分（手动）

**最适合：** 预先计划的组织

**配置结构：**
```json
{
  "name": "django-complete",
  "router_mode": true,
  "sub_skills": [
    {
      "name": "django-tutorial",
      "base_url": "https://docs.djangoproject.com/en/stable/intro/",
      "max_pages": 200
    },
    {
      "name": "django-api",
      "base_url": "https://docs.djangoproject.com/en/stable/ref/",
      "max_pages": 1000
    },
    {
      "name": "django-topics",
      "base_url": "https://docs.djangoproject.com/en/stable/topics/",
      "max_pages": 500
    }
  ]
}
```

**抓取：**
```bash
skill-seekers scrape --config configs/django-router.json
# 自动抓取所有子技能并生成路由器
```

---

## 并行抓取

### 多工作进程抓取

**通过并发工作进程加速抓取：**

```bash
# 4 个并行工作进程
skill-seekers scrape --config configs/large-docs.json \
  --workers 4 \
  --output output/large-docs/

# 性能：
# - 1 个工作进程：10,000 页 = 3 小时
# - 4 个工作进程：10,000 页 = 45 分钟
# - 8 个工作进程：10,000 页 = 25 分钟（收益递减）
```

**最佳工作进程数：**
- **CPU 密集型：** CPU 核心数
- **网络密集型：** 4-8 个工作进程（避免速率限制）
- **大型文档（10K+ 页）：** 推荐 4-6 个工作进程

### 异步抓取

**单进程异步，速度适度提升：**

```bash
# 异步模式（比同步快，无并行开销）
skill-seekers scrape --config configs/large-docs.json \
  --async \
  --output output/large-docs/

# 比同步模式快 2-3 倍
```

**何时使用：**
- **异步模式：** 500-2000 页，网络密集
- **并行模式：** 2000+ 页，需要最高速度
- **同步模式：** < 500 页，简单/稳定

---

## 检查点和恢复

### 检查点抓取

**恢复中断的抓取：**

```bash
# 启用检查点（每 100 页保存进度）
skill-seekers scrape --config configs/large-docs.json \
  --checkpoint \
  --checkpoint-interval 100 \
  --output output/large-docs/

# 如果中断，从最后一个检查点恢复：
skill-seekers scrape --config configs/large-docs.json \
  --resume \
  --output output/large-docs/
```

**检查点位置：**
```
output/large-docs/.checkpoint/
├── progress.json       # 已抓取的页面、当前 URL 等
├── cache/              # 缓存的页面内容
└── metadata.json       # 抓取元数据
```

### 智能恢复

**检测并跳过已抓取的页面：**

```bash
# 恢复自动检测现有内容
skill-seekers scrape --config configs/large-docs.json \
  --smart-resume \
  --output output/large-docs/

# 跳过以下页面：
# - 已存在于 references/ 中
# - 自上次抓取以来未更改（基于 Last-Modified 标头）
# - 与之前抓取的内容哈希匹配
```

---

## 大型文档的路由器模式

### 路由器 SKILL.md 示例

**Kubernetes 路由器（4 个子技能）：**

```markdown
---
name: kubernetes-complete
description: 具有智能路由的完整 Kubernetes 文档
---

# Kubernetes 完整路由器

## 子技能

### 1. kubernetes-concepts
**何时使用：** 了解 Kubernetes 架构和概念
**包含：** Pods、Services、Deployments、ReplicaSets 等

### 2. kubernetes-tasks
**何时使用：** 分步操作指南
**包含：** 创建部署、公开服务、扩展等

### 3. kubernetes-api
**何时使用：** API 参考和规范
**包含：** API 对象、字段、方法

### 4. kubernetes-tutorials
**何时使用：** 端到端学习指南
**包含：** Hello Minikube、无状态应用程序等

## 路由策略

1. **概念性问题** → kubernetes-concepts
2. **操作指南问题** → kubernetes-tasks
3. **API 参考问题** → kubernetes-api
4. **学习问题** → kubernetes-tutorials

对于需要多个视角的复杂问题，请咨询多个子技能并综合答案。
```

**优势：**
- ✅ 专注的子技能（每个 500-2000 页）
- ✅ 快速路由（仅加载所需的子技能）
- ✅ 更好的令牌效率（无 10K 页上下文）
- ✅ 用户友好（清晰的组织）

---

## 优化技术

### 1. 选择性内容提取

**仅提取基本内容：**

```json
{
  "name": "large-docs",
  "base_url": "https://docs.example.com/",
  "selectors": {
    "main_content": "article",
    "exclude_selectors": [
      ".sidebar",
      ".footer",
      ".navigation",
      ".advertisement"
    ]
  },
  "extract_api": true,
  "extract_examples": true,
  "extract_navigation": false,
  "extract_metadata": false
}
```

**通过排除非必要内容减少 30-50% 的令牌数。**

### 2. 智能页面过滤

**跳过低价值页面：**

```json
{
  "url_patterns": {
    "include": ["docs"],
    "exclude": [
      "blog",
      "news",
      "changelog",
      "404",
      "search"
    ]
  },
  "min_content_length": 500,
  "skip_duplicate_content": true
}
```

### 3. 增量更新

**仅更新更改的页面：**

```bash
# 首次抓取（完整）
skill-seekers scrape --config configs/docs.json --output output/docs/

# 后续更新（增量）
skill-seekers scrape --config configs/docs.json \
  --output output/docs/ \
  --incremental \
  --since "2025-01-01"

# 仅重新抓取 2025-01-01 之后修改的页面
```

### 4. 内容去重

**删除重复内容：**

```bash
# 启用去重
skill-seekers scrape --config configs/docs.json \
  --deduplicate \
  --similarity-threshold 0.9

# 跳过与已抓取页面 > 90% 相似的页面
```

---

## 案例研究

### 案例研究 1：Kubernetes（10,000+ 页）

**挑战：** 跨 5 个主要部分的综合文档

**解决方案：基于类别的拆分**

```bash
# 拆分为 5 个子技能
skill-seekers scrape --config configs/k8s-concepts.json --workers 4
skill-seekers scrape --config configs/k8s-tasks.json --workers 4
skill-seekers scrape --config configs/k8s-api.json --workers 6
skill-seekers scrape --config configs/k8s-tutorials.json --workers 2
skill-seekers scrape --config configs/k8s-reference.json --workers 4

# 生成路由器
skill-seekers router output/k8s-*/ --output output/k8s-router/

# 打包
skill-seekers package output/k8s-router/ --include-subskills
```

**结果：**
- 5 个专注的子技能（每个 500-2500 页）
- 总抓取时间：1.5 小时（使用 4-6 个工作进程）
- 每个子技能的令牌数：20K-60K
- 路由器开销：~5K 令牌

### 案例研究 2：Python 文档（4,000+ 页）

**挑战：** 大型单体文档

**解决方案：自动基于大小的拆分**

```bash
# 自动拆分为 50K 令牌
skill-seekers scrape --config configs/python-docs.json \
  --auto-split \
  --max-tokens 50000 \
  --workers 4

# 创建：
# - python-stdlib（第 1 部分）
# - python-tutorial（第 2 部分）
# - python-reference（第 3 部分）
# - python-howto（第 4 部分）
# - python-router（自动生成）
```

**结果：**
- 自动创建 4 个子技能
- 均匀分布（每个约 1000 页）
- 抓取时间：45 分钟

### 案例研究 3：内部公司文档（20,000+ 页）

**挑战：** 组织不佳的大型内部 wiki

**解决方案：混合方法**

```bash
# 阶段 1：基于类别的拆分（尽可能）
skill-seekers scrape --config configs/company-api.json --workers 4
skill-seekers scrape --config configs/company-guides.json --workers 4

# 阶段 2：自动拆分剩余未组织的文档
skill-seekers scrape --config configs/company-misc.json \
  --auto-split \
  --max-tokens 50000 \
  --workers 6

# 阶段 3：生成路由器
skill-seekers router output/company-*/ --output output/company-router/
```

**结果：**
- 2 个手动类别 + 3 个自动拆分部分 = 5 个子技能
- 抓取时间：3 小时（20K 页）
- 可管理的子技能（每个 50K-70K 令牌）

---

## 性能指南

### 抓取速度估算

| 页数 | 工作进程 | 同步 | 异步 | 并行（4 个工作进程） |
|-------|---------|------|-------|----------------------|
| 100 | 1 | 2 分钟 | 1 分钟 | 30 秒 |
| 500 | 1 | 8 分钟 | 4 分钟 | 2 分钟 |
| 1000 | 1 | 17 分钟 | 8 分钟 | 4 分钟 |
| 5000 | 1 | 1.5 小时 | 45 分钟 | 22 分钟 |
| 10000 | 1 | 3 小时 | 1.5 小时 | 45 分钟 |
| 20000 | 1 | 6 小时 | 3 小时 | 1.5 小时 |

**影响速度的因素：**
- **网络延迟** - 延迟越高 = 抓取越慢
- **速率限制** - 遵守 `robots.txt` 和速率限制
- **页面复杂性** - 大量 JavaScript、动态内容
- **内容提取** - 复杂的选择器会减慢处理速度

### 内存使用

| 页数 | 内存（同步） | 内存（异步） | 内存（并行 4x） |
|-------|---------------|----------------|----------------------|
| 100 | 50 MB | 80 MB | 200 MB |
| 500 | 200 MB | 300 MB | 800 MB |
| 1000 | 400 MB | 600 MB | 1.5 GB |
| 5000 | 2 GB | 3 GB | 7 GB |
| 10000 | 4 GB | 6 GB | 14 GB |

**建议：**
- **< 1000 页：** 任何模式都可以
- **1000-5000 页：** 使用异步或 2-4 个工作进程
- **5000+ 页：** 使用检查点 + 并行工作进程
- **10000+ 页：** 拆分为子技能

---

## 高级配置

### 多阶段抓取

**阶段 1：快速扫描（获取结构）**
```bash
skill-seekers scrape --config configs/docs.json \
  --scan-only \
  --output output/docs-scan/

# 创建 URL 映射而不进行完整内容提取
```

**阶段 2：分析并计划拆分**
```bash
# 分析结构
skill-seekers analyze output/docs-scan/ --suggest-split

# 输出建议的类别和大小
```

**阶段 3：完整抓取并拆分**
```bash
# 使用建议的拆分
skill-seekers scrape --config configs/docs.json \
  --split-by-categories \
  --workers 4 \
  --output output/docs/
```

### 自定义路由器逻辑

**定义自定义路由规则：**

```json
{
  "router_config": {
    "name": "custom-router",
    "sub_skills": [
      {
        "name": "api-reference",
        "keywords": ["api", "method", "function", "class"],
        "priority": 1
      },
      {
        "name": "user-guide",
        "keywords": ["how to", "guide", "tutorial", "example"],
        "priority": 2
      },
      {
        "name": "concepts",
        "keywords": ["concept", "overview", "architecture"],
        "priority": 3
      }
    ],
    "default_skill": "user-guide",
    "multi_skill_threshold": 0.5
  }
}
```

---

## 故障排除

### 问题：抓取期间内存不足

**症状：** 进程被杀死，`MemoryError`

**解决方案：**
1. **减小批次大小：**
   ```bash
   skill-seekers scrape --config X --batch-size 50
   ```

2. **启用流式模式：**
   ```bash
   skill-seekers scrape --config X --streaming
   ```

3. **拆分为更小的子技能：**
   ```bash
   skill-seekers scrape --config X --auto-split --max-pages 1000
   ```

### 问题：抓取太慢

**症状：** 10K 页需要 5+ 小时

**解决方案：**
1. **使用并行工作进程：**
   ```bash
   skill-seekers scrape --config X --workers 4
   ```

2. **启用异步模式：**
   ```bash
   skill-seekers scrape --config X --async
   ```

3. **跳过低价值内容：**
   ```json
   {
     "url_patterns": {
       "exclude": ["blog", "news", "search", "404"]
     }
   }
   ```

### 问题：技能对 Claude 来说太大

**症状：** 上传失败，"令牌限制超出"

**解决方案：**
1. **检查令牌数：**
   ```bash
   skill-seekers validate output/skill/ --check-tokens
   ```

2. **拆分为路由器 + 子技能：**
   ```bash
   skill-seekers router output/skill/ --max-tokens 50000
   ```

3. **优化内容提取：**
   ```json
   {
     "extract_navigation": false,
     "extract_metadata": false,
     "exclude_selectors": [".sidebar", ".footer"]
   }
   ```

---

## 最佳实践

### 1. 计划您的拆分策略

✅ **在抓取之前**，分析文档结构：
```bash
skill-seekers analyze https://docs.example.com/ --suggest-split
```

### 2. 尽可能使用基于类别的拆分

✅ 更清晰的组织，更好的路由
❌ 如果存在类别，避免任意基于大小的拆分

### 3. 首先使用样本测试

✅ 抓取小样本（100 页）以验证配置：
```bash
skill-seekers scrape --config X --max-pages 100 --output test/
```

### 4. 监控进度

✅ 启用详细日志记录：
```bash
skill-seekers scrape --config X --verbose
```

### 5. 为 5K+ 页使用检查点

✅ 始终为大型抓取使用 `--checkpoint`
✅ 如果中断，可以恢复

---

## 下一步

- [三流 GitHub 架构](/zh/docs/reference/c3x-router-architecture) - 多源技能的路由器模式
- [技能架构指南](/zh/docs/reference/skill-architecture) - 分层和拆分策略
- [统一抓取](/zh/docs/features/unified-scraping) - 带有冲突检测的多源抓取

---

**状态**：✅ 生产就绪（v2.0.0+）

发现问题或有建议？[打开 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
