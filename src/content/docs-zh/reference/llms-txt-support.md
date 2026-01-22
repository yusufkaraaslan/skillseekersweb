---
title: llms.txt 自动检测
description: Skill Seekers 自动检测并优先使用 llms.txt 文件，以 10 倍速度抓取 AI 优化的文档内容
section: reference
order: 7
---

# llms.txt 自动检测

**Skill Seekers 自动检测 `llms.txt` 文件，以 10 倍速度抓取 AI 优化的内容。**

## 概述

**llms.txt** 是一个新兴的标准，用于在单个文件中提供 AI 优化的文档。当网站提供 `llms.txt` 时，Skill Seekers 会自动检测并优先使用它而不是传统的网页抓取。

**优势：**
- ⚡ **快 10 倍** - 单文件下载 vs. 抓取 100+ 页
- 🎯 **AI 优化** - 内容已为 LLM 格式化
- 📦 **完整** - 通常包含整个文档
- 🔄 **维护** - 网站所有者保持更新

**版本：** v2.5.0+

---

## 工作原理

### 自动检测顺序

Skill Seekers 按以下顺序检查 `llms.txt` 变体：

1. **`llms-full.txt`** - 完整文档（首选）
2. **`llms.txt`** - 标准文档
3. **`llms-small.txt`** - 精简版本
4. **回退到网页抓取** - 如果未找到 llms.txt

**检测自动发生** - 无需配置！

### 示例工作流

```bash
# 标准抓取命令
skill-seekers scrape https://example.com/ --output output/example/

# 幕后：
# 1. 检查 https://example.com/llms-full.txt ✅ 找到！
# 2. 下载 llms-full.txt（2 秒）
# 3. 解析并转换为技能格式
# 4. 完成！（vs. 5 分钟抓取 200 页）
```

---

## llms.txt 格式

### 标准结构

```markdown
# Example.com 文档

> Example.com 的 AI 优化文档

# 入门

## 安装

```bash
npm install example
```

## 快速开始

1. 创建新项目
2. 配置设置
3. 运行应用程序

# API 参考

## 核心函数

### `doSomething(param)`

函数描述...

# 示例

## 基本示例

```javascript
const result = doSomething('value');
```
```

**主要特点：**
- 纯 markdown 格式
- 分层结构
- 包含代码示例
- 全面和完整

---

## 检测和使用

### 自动检测（默认）

**无需配置：**

```bash
# 如果可用，自动使用 llms.txt
skill-seekers scrape https://docs.example.com/ --output output/example/
```

**检测日志：**
```
🔍 检查 llms.txt...
✅ 在 https://docs.example.com/llms-full.txt 找到 llms-full.txt
📥 下载中（2.3 MB）...
✅ 1.8 秒内下载完成
📝 解析内容...
✅ 技能已创建：example（4,231 令牌）
⚡ 节省时间：4 分 32 秒（llms.txt vs. 传统抓取）
```

### 强制使用 llms.txt

**即使首选网页抓取也显式使用 llms.txt：**

```bash
skill-seekers scrape https://docs.example.com/ \
  --prefer-llms-txt \
  --output output/example/
```

### 禁用 llms.txt

**强制使用传统网页抓取：**

```bash
skill-seekers scrape https://docs.example.com/ \
  --no-llms-txt \
  --output output/example/
```

---

## 比较：llms.txt vs. 网页抓取

### 速度

| 文档大小 | llms.txt | 网页抓取 | 加速 |
|-------------------|----------|--------------|----------|
| 小型（50 页） | 1-2 秒 | 30-60 秒 | **30 倍** |
| 中型（200 页） | 2-3 秒 | 3-5 分钟 | **60 倍** |
| 大型（1000 页） | 3-5 秒 | 15-20 分钟 | **180 倍** |

### 质量

| 方面 | llms.txt | 网页抓取 |
|--------|----------|--------------|
| **内容完整性** | ✅ 由维护者策划 | ⚠️ 取决于抓取配置 |
| **AI 优化** | ✅ 为 LLM 格式化 | ❌ 可能包含非必要内容 |
| **代码示例** | ✅ 通常包含 | ⚠️ 取决于选择器 |
| **最新** | ⚠️ 取决于维护者 | ✅ 始终最新 |
| **结构** | ✅ 分层 markdown | ⚠️ 取决于网站结构 |

### 何时使用每种方法

**使用 llms.txt（自动检测）当：**
- ✅ 网站提供 `llms.txt`（自动检测）
- ✅ 速度很重要
- ✅ 您信任网站维护者

**强制使用网页抓取当：**
- ❌ llms.txt 已过时（检查最后修改日期）
- ❌ 您需要特定的选择器/类别
- ❌ 您想要更多控制内容提取

---

## 支持 llms.txt 的网站

### 已知网站（截至 2025 年）

**框架文档：**
- Next.js: `https://nextjs.org/llms-full.txt`
- Astro: `https://docs.astro.build/llms.txt`
- Remix: `https://remix.run/llms.txt`

**工具和库：**
- Supabase: `https://supabase.com/docs/llms.txt`
- Vercel: `https://vercel.com/docs/llms-full.txt`
- Railway: `https://docs.railway.app/llms.txt`

**检查 llms.txt：**
```bash
# 测试网站是否有 llms.txt
curl -I https://docs.example.com/llms-full.txt
curl -I https://docs.example.com/llms.txt
curl -I https://docs.example.com/llms-small.txt
```

---

## 高级用法

### 使用前检查 llms.txt

```bash
# 下载并检查
curl https://docs.example.com/llms-full.txt -o llms-full.txt
head -n 50 llms-full.txt

# 检查文件大小和最后修改时间
curl -I https://docs.example.com/llms-full.txt | grep -E 'Content-Length|Last-Modified'
```

### 将 llms.txt 与其他源结合

```bash
# 使用 llms.txt 作为基础，抓取其他页面
skill-seekers scrape https://docs.example.com/ \
  --use-llms-txt \
  --additional-pages "changelog,releases,roadmap" \
  --output output/example/
```

### 手动下载和转换

```bash
# 1. 手动下载
curl https://docs.example.com/llms-full.txt -o llms-full.txt

# 2. 转换为技能
skill-seekers convert llms-full.txt \
  --format llms-txt \
  --output output/example/
```

---

## llms.txt 标准

### 规范

`llms.txt` 格式是 AI 优化文档的社区驱动标准：

**主要原则：**
1. **纯 markdown** - 没有 HTML，没有花哨的格式
2. **完整** - 一个文件中的所有基本文档
3. **分层** - 清晰的标题结构
4. **优化** - 删除导航、侧边栏、页脚
5. **更新** - 由项目所有者维护

**了解更多：** [llms.txt 规范](https://llmstxt.org/)（如果网站存在）

### 创建您自己的 llms.txt

**对于文档网站所有者：**

```markdown
# 您的项目文档

> 您的项目的完整文档 - 为 LLM 优化

# 概述

项目的简要描述...

# 安装

分步安装指南...

# API 参考

完整的 API 文档...

# 示例

实用的代码示例...

# 常见问题

常见问题和答案...
```

**最佳实践：**
- ✅ 包含所有基本内容（没有外部页面的链接）
- ✅ 使用清晰的分层标题（H1、H2、H3）
- ✅ 内联包含代码示例
- ✅ 随文档更改保持更新
- ✅ 提供变体：`llms-full.txt`（完整）、`llms.txt`（标准）、`llms-small.txt`（精简）
- ❌ 不要包含导航、侧边栏或 UI 元素
- ❌ 不要使用 HTML 或复杂的格式
- ❌ 不要包含非必要内容（changelog、博客文章）

---

## 配置选项

### 配置文件支持

```json
{
  "name": "example",
  "base_url": "https://docs.example.com/",
  "llms_txt": {
    "enabled": true,
    "prefer": "full",
    "fallback_to_scraping": true,
    "max_age_days": 30
  }
}
```

**选项：**
- **`enabled`**：自动检测 llms.txt（默认：`true`）
- **`prefer`**：首选哪个变体（`full` | `standard` | `small`）
- **`fallback_to_scraping`**：如果未找到 llms.txt，使用网页抓取（默认：`true`）
- **`max_age_days`**：如果早于 N 天，跳过 llms.txt（默认：`null`）

---

## 性能指标

### 真实世界示例

**Next.js 文档：**
- **页面：** 300+
- **llms-full.txt 大小：** 3.2 MB
- **网页抓取时间：** 6 分钟
- **llms.txt 下载时间：** 2 秒
- **加速：** **快 180 倍**

**Supabase 文档：**
- **页面：** 500+
- **llms.txt 大小：** 4.8 MB
- **网页抓取时间：** 9 分钟
- **llms.txt 下载时间：** 3 秒
- **加速：** **快 180 倍**

**Astro 文档：**
- **页面：** 200+
- **llms.txt 大小：** 2.1 MB
- **网页抓取时间：** 4 分钟
- **llms.txt 下载时间：** 1.5 秒
- **加速：** **快 160 倍**

---

## 故障排除

### 问题：llms.txt 已过时

**症状：**
```
⚠️ llms.txt 最后修改：45 天前
⚠️ 改为使用网页抓取
```

**解决方案：**
1. **仍强制使用：**
   ```bash
   skill-seekers scrape URL --force-llms-txt
   ```

2. **联系网站维护者** 以更新 llms.txt

3. **使用网页抓取：**
   ```bash
   skill-seekers scrape URL --no-llms-txt
   ```

### 问题：未找到 llms.txt

**症状：**
```
🔍 检查 llms.txt...
❌ 未找到：llms-full.txt
❌ 未找到：llms.txt
❌ 未找到：llms-small.txt
ℹ️ 回退到网页抓取
```

**解决方案：**
1. **手动检查：**
   ```bash
   curl -I https://docs.example.com/llms.txt
   ```

2. **使用网页抓取**（自动回退）

3. **向网站所有者请求 llms.txt**

### 问题：llms.txt 不完整

**症状：** 技能缺少预期部分

**解决方案：**
1. **使用网页抓取补充：**
   ```bash
   skill-seekers scrape URL --use-llms-txt --additional-pages "missing-section"
   ```

2. **仅使用网页抓取：**
   ```bash
   skill-seekers scrape URL --no-llms-txt
   ```

---

## 最佳实践

### 1. 信任自动检测

✅ Skill Seekers 智能地检测并在有益时使用 llms.txt

### 2. 验证内容完整性

✅ 使用 llms.txt 后，抽查生成的技能：
```bash
cat output/example/SKILL.md | head -n 100
```

### 3. 检查最后修改日期

✅ 如果 llms.txt > 60 天，考虑网页抓取：
```bash
curl -I https://docs.example.com/llms.txt | grep Last-Modified
```

### 4. 与其他源结合

✅ 使用 llms.txt 作为基础，添加 GitHub issues/changelog：
```bash
skill-seekers unified --config unified-config.json
# 其中 unified-config 使用 llms.txt + GitHub 抓取
```

---

## 下一步

- [文档抓取](/zh/docs/cli/scrape) - 传统网页抓取选项
- [统一抓取](/zh/docs/features/unified-scraping) - 将 llms.txt 与其他源结合
- [大型文档](/zh/docs/reference/large-documentation) - 处理 10K+ 页网站

---

**状态**：✅ 生产就绪（v2.5.0+）

发现问题或有建议？[打开 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
