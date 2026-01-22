---
title: 技能架构指南 - 分层和拆分
description: 使用路由器/分发器模式和 500 行指南架构复杂多技能系统的完整指南
section: reference
order: 8
---

# 技能架构指南：分层和拆分

**使用路由器/分发器模式架构复杂多技能系统的完整指南。**

## 概述

### 500 行指南

Claude 建议将技能文件保持在 **500 行以下** 以获得最佳性能。这个指南存在是因为：

- ✅ **更好的解析** - AI 可以更有效地理解专注的内容
- ✅ **上下文效率** - 每个任务只加载相关信息
- ✅ **可维护性** - 更容易调试、更新和管理
- ✅ **单一职责** - 每个技能做好一件事

### 单体技能的问题

随着应用程序变得复杂，开发人员通常会创建以下技能：

- ❌ **超过 500 行** - 信息太多，无法有效解析
- ❌ **混合关注点** - 处理多个不相关的职责
- ❌ **浪费上下文** - 即使只有一小部分相关，也会加载整个文件
- ❌ **难以维护** - 更改需要仔细浏览大文件

### 解决方案：技能分层

**技能分层** 涉及：

1. **拆分** - 将大型技能分解为专注的子技能
2. **路由** - 创建将查询引导到适当子技能的主技能
3. **加载** - 每个任务仅激活相关的子技能

**结果：** 在保持每个技能 500 行指南的同时构建复杂的应用程序。

---

## 何时拆分技能

### 决策矩阵

| 技能大小 | 复杂性 | 建议 |
|-----------|-----------|----------------|
| < 500 行 | 单一关注点 | ✅ **保持单体** |
| 500-1000 行 | 相关关注点 | ⚠️ **考虑拆分** |
| 1000+ 行 | 多个关注点 | ❌ **必须拆分** |

### 拆分指标

**您应该在以下情况下拆分：**

- ✅ 技能超过 500 行
- ✅ 多个不同的职责（CRUD、工作流等）
- ✅ 不同的团队成员维护不同的部分
- ✅ 只有部分内容与特定任务相关
- ✅ 上下文窗口经常超出

**您可以在以下情况下保持单体：**

- ✅ 少于 500 行
- ✅ 单一、内聚的职责
- ✅ 所有内容经常一起相关
- ✅ 简单、专注的用例

---

## 路由器模式

### 什么是路由器技能？

**路由器技能**（也称为 **分发器** 或 **中心** 技能）是一个轻量级的主技能，它：

1. **分析** 用户的查询
2. **识别** 哪些子技能相关
3. **引导** Claude 激活适当的子技能
4. **协调** 来自多个子技能的响应（如果需要）

### 工作原理

```
用户查询："如何预订去巴黎的航班？"
     ↓
路由器技能：分析关键字 → "航班"、"预订"
     ↓
激活：flight_booking 子技能
     ↓
响应：航班预订指南（仅加载此技能）
```

### 路由器技能结构

```markdown
# 旅行规划器（路由器）

## 何时使用此技能

用于旅行规划、预订和行程管理。

这是一个路由器技能，将您的问题引导到专门的子技能。

## 可用的子技能

### flight_booking
用于预订航班、搜索航空公司、比较价格、选择座位。
**关键字：** 航班、航空公司、预订、机票、出发、到达

### hotel_reservation
用于酒店搜索、房间预订、设施、入住/退房。
**关键字：** 酒店、住宿、房间、预订、住宿

### itinerary_generation
用于创建旅行计划、安排活动、路线优化。
**关键字：** 行程、时间表、计划、活动、路线

## 路由逻辑

根据您的问题关键字：
- 航班相关 → 激活 `flight_booking`
- 酒店相关 → 激活 `hotel_reservation`
- 规划相关 → 激活 `itinerary_generation`
- 多个主题 → 激活相关组合

## 使用示例

**"帮我找去巴黎的航班"** → flight_booking
**"在东京预订酒店"** → hotel_reservation
**"创建 5 天罗马行程"** → itinerary_generation
**"计划巴黎之旅，包括航班和酒店"** → flight_booking + hotel_reservation + itinerary_generation
```

---

## 手动技能架构

### 示例 1：电子商务平台

**问题：** 电子商务技能有 2000+ 行，涵盖目录、购物车、结账、订单和管理。

**解决方案：** 使用路由器拆分为专注的子技能。

#### 子技能

**1. `ecommerce.md`（路由器 - 150 行）**
```markdown
# 电子商务平台（路由器）

## 子技能
- product_catalog - 浏览、搜索、过滤产品
- shopping_cart - 添加/删除商品、数量
- checkout_payment - 处理订单、付款
- order_management - 跟踪订单、退货
- admin_tools - 库存、分析

## 路由
product/catalog/search → product_catalog
cart/basket/add/remove → shopping_cart
checkout/payment/billing → checkout_payment
order/track/return → order_management
admin/inventory/analytics → admin_tools
```

**2. `product_catalog.md`（350 行）**
```markdown
# 产品目录

## 何时使用
产品浏览、搜索、过滤、推荐。

## 快速参考
- 搜索产品：`search(query, filters)`
- 获取详情：`getProduct(id)`
- 过滤：`filter(category, price, brand)`
...
```

**3. `shopping_cart.md`（280 行）**
```markdown
# 购物车

## 何时使用
管理购物车商品、数量、总计。

## 快速参考
- 添加商品：`cart.add(productId, quantity)`
- 更新数量：`cart.update(itemId, quantity)`
...
```

**结果：**
- 路由器：150 行 ✅
- 每个子技能：200-400 行 ✅
- 总功能：不变
- 上下文效率：5 倍改进

---

### 示例 2：代码助手

**问题：** 代码助手处理调试、重构、文档、测试 - 1800+ 行。

**解决方案：** 带有智能路由的专门子技能。

#### 架构

```
code_assistant.md（路由器 - 200 行）
├── debugging.md（450 行）
├── refactoring.md（380 行）
├── documentation.md（320 行）
└── testing.md（400 行）
```

#### 路由器逻辑

```markdown
# 代码助手（路由器）

## 路由关键字

### debugging
错误、bug、异常、崩溃、修复、故障排除、调试

### refactoring
重构、清理、优化、简化、重组、改进

### documentation
文档、注释、文档字符串、readme、api、解释

### testing
测试、单元、集成、覆盖率、断言、模拟
```

---

### 示例 3：数据管道

**问题：** ETL 管道技能涵盖提取、转换、加载、验证、监控。

**解决方案：** 管道阶段作为子技能。

```
data_pipeline.md（路由器）
├── data_extraction.md - 源连接器、API 调用
├── data_transformation.md - 清理、映射、丰富
├── data_loading.md - 数据库写入、文件导出
├── data_validation.md - 质量检查、错误处理
└── pipeline_monitoring.md - 日志、警报、指标
```

---

## 最佳实践

### 1. 单一职责原则

**每个子技能应该有一个明确的目的。**

❌ **差：** `user_management.md` 处理身份验证、配置文件、权限、通知
✅ **好：**
- `user_authentication.md` - 登录、注销、会话
- `user_profiles.md` - 配置文件 CRUD
- `user_permissions.md` - 角色、访问控制
- `user_notifications.md` - 电子邮件、推送、警报

### 2. 清晰的路由关键字

**使路由关键字明确且无歧义。**

❌ **差：** 模糊的关键字，如"数据"、"用户"、"过程"
✅ **好：** 具体的关键字，如"登录"、"身份验证"、"提取"、"转换"

### 3. 最小化路由器复杂性

**保持路由器轻量级 - 只有路由逻辑。**

❌ **差：** 路由器包含实际实现代码
✅ **好：** 路由器只包含：
- 子技能描述
- 路由关键字
- 使用示例
- 没有实现细节

### 4. 逻辑分组

**按职责分组，而不是按代码结构。**

❌ **差：** 按文件类型拆分（控制器、模型、视图）
✅ **好：** 按功能拆分（user_auth、product_catalog、order_processing）

### 5. 避免过度拆分

**不要为琐碎的区别创建子技能。**

❌ **差：** "add_user"和"update_user"的单独技能
✅ **好：** 单个"user_management"技能涵盖所有 CRUD

### 6. 记录依赖关系

**明确说明子技能何时一起工作。**

```markdown
## 多技能操作

**下订单：** 需要以下之间的协调：
1. product_catalog - 验证产品可用性
2. shopping_cart - 获取购物车内容
3. checkout_payment - 处理付款
4. order_management - 创建订单记录
```

### 7. 保持一致的结构

**在所有子技能中使用相同的 SKILL.md 结构。**

标准部分：
```markdown
# 技能名称

## 何时使用此技能
[清晰的描述]

## 快速参考
[常见操作]

## 关键概念
[领域术语]

## 使用此技能
[使用指南]

## 参考文件
[文档组织]
```

---

## 完整示例

### 旅行规划器（完整实现）

#### 目录结构

```
skills/
├── travel_planner.md（路由器 - 180 行）
├── flight_booking.md（420 行）
├── hotel_reservation.md（380 行）
├── itinerary_generation.md（450 行）
├── travel_insurance.md（290 行）
└── budget_tracking.md（340 行）
```

#### travel_planner.md（路由器）

```markdown
---
name: travel_planner
description: 旅行规划、预订和行程管理路由器
---

# 旅行规划器（路由器）

## 何时使用此技能

用于所有与旅行相关的规划、预订和行程管理。

这个路由器技能分析您的旅行需求并激活专门的子技能。

## 可用的子技能

### flight_booking
**目的：** 航班搜索、预订、座位选择、航空公司比较
**关键字：** 航班、航空公司、飞机、机票、出发、到达、机场、预订
**用于：** 查找和预订航班、比较价格、选择座位

### hotel_reservation
**目的：** 酒店搜索、房间预订、设施、入住/退房
**关键字：** 酒店、住宿、房间、住宿、预订、住宿、入住
**用于：** 查找酒店、预订房间、检查设施

### itinerary_generation
**目的：** 旅行规划、时间安排、路线优化
**关键字：** 行程、时间表、计划、路线、活动、观光
**用于：** 创建每日计划、组织活动

### travel_insurance
**目的：** 旅行保险选项、覆盖范围、索赔
**关键字：** 保险、覆盖范围、保护、医疗、取消、索赔
**用于：** 保险建议、比较政策

### budget_tracking
**目的：** 旅行预算规划、费用跟踪
**关键字：** 预算、成本、费用、价格、支出、金钱
**用于：** 估算成本、跟踪费用

## 路由逻辑

路由器分析您的问题并激活相关技能：

| 查询模式 | 激活的技能 |
|--------------|------------------|
| "查找去 [目的地] 的航班" | flight_booking |
| "在 [城市] 预订酒店" | hotel_reservation |
| "计划 [持续时间] 去 [目的地] 的旅行" | itinerary_generation |
| "需要旅行保险" | travel_insurance |
| "旅行要花多少钱？" | budget_tracking |
| "计划完整的巴黎假期" | 全部（协调） |

## 多技能协调

一些请求需要多个技能一起工作：

### 完整的旅行规划
1. **budget_tracking** - 设置预算限制
2. **flight_booking** - 在预算范围内查找航班
3. **hotel_reservation** - 预订住宿
4. **itinerary_generation** - 创建每日时间表
5. **travel_insurance** - 推荐覆盖范围

### 预订修改
1. **flight_booking** - 检查航班更改费用
2. **hotel_reservation** - 验证取消政策
3. **budget_tracking** - 计算成本影响

## 使用示例

**简单（单个技能）：**
- "查找去东京的直飞航班" → flight_booking
- "巴黎的 5 星级酒店，每晚低于 $200" → hotel_reservation
- "创建 3 天罗马行程" → itinerary_generation

**复杂（多个技能）：**
- "为 2 人计划为期一周的巴黎之旅，预算 $3000" → budget_tracking → flight_booking → hotel_reservation → itinerary_generation
- "下个月访问伦敦的最便宜方式" → budget_tracking + flight_booking + hotel_reservation
```

---

## 实施指南

### 步骤 1：分析当前技能

**要问的问题：**
1. 当前技能有多少行？
2. 不同的职责是什么？
3. 我能识别出明确的关键字组吗？
4. 是否有很少一起使用的部分？

### 步骤 2：设计子技能

**创建计划：**
```
当前：ecommerce_platform.md（2000 行）

拆分为：
1. product_catalog.md（400 行）- 关键字：产品、搜索、浏览
2. shopping_cart.md（300 行）- 关键字：购物车、添加、删除
3. checkout_payment.md（350 行）- 关键字：结账、付款、订单
4. order_management.md（400 行）- 关键字：订单、跟踪、退货
5. admin_tools.md（350 行）- 关键字：管理、库存、分析

路由器：ecommerce_platform.md（200 行）
```

### 步骤 3：提取内容

**对于每个子技能：**
1. 从单体技能复制相关内容
2. 删除不相关的部分
3. 添加"何时使用"部分
4. 添加路由关键字
5. 确保 < 500 行

### 步骤 4：创建路由器

**路由器模板：**
```markdown
# [技能名称]（路由器）

## 何时使用此技能
[简要描述]

## 可用的子技能

### [sub_skill_1]
**目的：** [它做什么]
**关键字：** [路由关键字]
**用于：** [用例]

[为每个子技能重复]

## 路由逻辑
[关键字 → 子技能映射]

## 多技能操作
[需要多个技能的复杂操作]

## 使用示例
[简单和复杂的示例]
```

### 步骤 5：打包和部署

**使用 Skill Seekers：**
```bash
# 创建路由器 + 子技能结构
skill-seekers router \
  output/skill1/ \
  output/skill2/ \
  output/skill3/ \
  --output output/router/ \
  --name skill-router

# 打包
skill-seekers package output/router/ --include-subskills

# 上传
skill-seekers upload router.zip --target claude
```

---

## 故障排除

### 问题：Claude 路由不正确

**症状：** 激活了错误的子技能或没有发生路由

**解决方案：**
1. **更具体的关键字：**
   ```markdown
   ❌ 关键字：数据、过程
   ✅ 关键字：提取、转换、加载、ETL、管道
   ```

2. **添加路由示例：**
   ```markdown
   ## 使用示例
   "将数据加载到数据库" → data_loading
   "清理 CSV 文件" → data_transformation
   ```

3. **检查子技能描述：**
   - 使每个子技能的目的非常清楚
   - 避免重叠的职责

### 问题：子技能太大

**症状：** 子技能超过 500 行

**解决方案：**
1. **进一步拆分：**
   ```
   user_management.md（800 行）
   → user_authentication.md（400 行）
   → user_profiles.md（400 行）
   ```

2. **移动参考材料：**
   - 保持主技能简洁
   - 将详细文档移动到 `references/` 目录

3. **简化内容：**
   - 删除冗余示例
   - 合并相似的部分

### 问题：路由器开销

**症状：** 路由器本身很大（> 300 行）

**解决方案：**
1. **简化路由逻辑：**
   - 使用关键字表而不是散文
   - 删除冗余描述

2. **减少子技能数量：**
   - 组合密切相关的子技能
   - 目标是最多 3-7 个子技能

---

## 高级模式

### 分层路由（路由器的路由器）

**对于非常大的系统：**

```
main_router.md（100 行）
├── user_subsystem_router.md（150 行）
│   ├── user_auth.md（400 行）
│   ├── user_profiles.md（350 行）
│   └── user_permissions.md（380 行）
├── product_subsystem_router.md（180 行）
│   ├── product_catalog.md（450 行）
│   ├── product_inventory.md（420 行）
│   └── product_pricing.md（390 行）
└── order_subsystem_router.md（160 行）
    ├── order_placement.md（440 行）
    ├── order_fulfillment.md（410 行）
    └── order_returns.md（370 行）
```

**何时使用：** 具有 10+ 个子技能或多个逻辑子系统的系统

### 动态路由（上下文感知）

**路由器考虑对话上下文：**

```markdown
## 路由逻辑

**首次用户（无历史记录）：**
- 始终激活 getting_started 技能

**回访用户（有上下文）：**
- 分析最近的对话主题
- 激活相关的子技能
- 跳过介绍性内容

**错误状态（之前的操作失败）：**
- 激活故障排除技能
- 包含失败操作的上下文
```

---

## 下一步

- [三流 GitHub 架构](/zh/docs/reference/c3x-router-architecture) - 多源路由器模式
- [大型文档处理](/zh/docs/reference/large-documentation) - 10K+ 页的拆分策略
- [AI 技能标准](/zh/docs/reference/ai-skill-standards) - 所有平台的最佳实践

---

**状态**：✅ 完成（v2.0.0+）

发现问题或有建议？[打开 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
