---
title: Skill Architecture Guide - Layering and Splitting
description: Complete guide for architecting complex multi-skill systems using the router/dispatcher pattern with the 500-line guideline
section: reference
order: 8
---

# Skill Architecture Guide: Layering and Splitting

**Complete guide for architecting complex multi-skill systems using the router/dispatcher pattern.**

## Overview

### The 500-Line Guideline

Claude recommends keeping skill files under **500 lines** for optimal performance. This guideline exists because:

- ✅ **Better parsing** - AI can more effectively understand focused content
- ✅ **Context efficiency** - Only relevant information loaded per task
- ✅ **Maintainability** - Easier to debug, update, and manage
- ✅ **Single responsibility** - Each skill does one thing well

### The Problem with Monolithic Skills

As applications grow complex, developers often create skills that:

- ❌ **Exceed 500 lines** - Too much information for effective parsing
- ❌ **Mix concerns** - Handle multiple unrelated responsibilities
- ❌ **Waste context** - Load entire file even when only small portion is relevant
- ❌ **Hard to maintain** - Changes require careful navigation of large file

### The Solution: Skill Layering

**Skill layering** involves:

1. **Splitting** - Breaking large skill into focused sub-skills
2. **Routing** - Creating master skill that directs queries to appropriate sub-skill
3. **Loading** - Only activating relevant sub-skills per task

**Result:** Build sophisticated applications while maintaining 500-line guideline per skill.

---

## When to Split Skills

### Decision Matrix

| Skill Size | Complexity | Recommendation |
|-----------|-----------|----------------|
| < 500 lines | Single concern | ✅ **Keep monolithic** |
| 500-1000 lines | Related concerns | ⚠️ **Consider splitting** |
| 1000+ lines | Multiple concerns | ❌ **Must split** |

### Split Indicators

**You should split when:**

- ✅ Skill exceeds 500 lines
- ✅ Multiple distinct responsibilities (CRUD, workflows, etc.)
- ✅ Different team members maintain different sections
- ✅ Only portions are relevant to specific tasks
- ✅ Context window frequently exceeded

**You can keep monolithic when:**

- ✅ Under 500 lines
- ✅ Single, cohesive responsibility
- ✅ All content frequently relevant together
- ✅ Simple, focused use case

---

## The Router Pattern

### What is a Router Skill?

A **router skill** (also called **dispatcher** or **hub** skill) is a lightweight master skill that:

1. **Analyzes** the user's query
2. **Identifies** which sub-skill(s) are relevant
3. **Directs** Claude to activate appropriate sub-skill(s)
4. **Coordinates** responses from multiple sub-skills if needed

### How It Works

```
User Query: "How do I book a flight to Paris?"
     ↓
Router Skill: Analyzes keywords → "flight", "book"
     ↓
Activates: flight_booking sub-skill
     ↓
Response: Flight booking guidance (only this skill loaded)
```

### Router Skill Structure

```markdown
# Travel Planner (Router)

## When to Use This Skill

Use for travel planning, booking, and itinerary management.

This is a router skill that directs your questions to specialized sub-skills.

## Sub-Skills Available

### flight_booking
For booking flights, searching airlines, comparing prices, seat selection.
**Keywords:** flight, airline, booking, ticket, departure, arrival

### hotel_reservation
For hotel search, room booking, amenities, check-in/check-out.
**Keywords:** hotel, accommodation, room, reservation, stay

### itinerary_generation
For creating travel plans, scheduling activities, route optimization.
**Keywords:** itinerary, schedule, plan, activities, route

## Routing Logic

Based on your question keywords:
- Flight-related → Activate `flight_booking`
- Hotel-related → Activate `hotel_reservation`
- Planning-related → Activate `itinerary_generation`
- Multiple topics → Activate relevant combination

## Usage Examples

**"Find me a flight to Paris"** → flight_booking
**"Book hotel in Tokyo"** → hotel_reservation
**"Create 5-day Rome itinerary"** → itinerary_generation
**"Plan Paris trip with flights and hotel"** → flight_booking + hotel_reservation + itinerary_generation
```

---

## Manual Skill Architecture

### Example 1: E-Commerce Platform

**Problem:** E-commerce skill is 2000+ lines covering catalog, cart, checkout, orders, and admin.

**Solution:** Split into focused sub-skills with router.

#### Sub-Skills

**1. `ecommerce.md` (Router - 150 lines)**
```markdown
# E-Commerce Platform (Router)

## Sub-Skills
- product_catalog - Browse, search, filter products
- shopping_cart - Add/remove items, quantities
- checkout_payment - Process orders, payments
- order_management - Track orders, returns
- admin_tools - Inventory, analytics

## Routing
product/catalog/search → product_catalog
cart/basket/add/remove → shopping_cart
checkout/payment/billing → checkout_payment
order/track/return → order_management
admin/inventory/analytics → admin_tools
```

**2. `product_catalog.md` (350 lines)**
```markdown
# Product Catalog

## When to Use
Product browsing, searching, filtering, recommendations.

## Quick Reference
- Search products: `search(query, filters)`
- Get details: `getProduct(id)`
- Filter: `filter(category, price, brand)`
...
```

**3. `shopping_cart.md` (280 lines)**
```markdown
# Shopping Cart

## When to Use
Managing cart items, quantities, totals.

## Quick Reference
- Add item: `cart.add(productId, quantity)`
- Update quantity: `cart.update(itemId, quantity)`
...
```

**Result:**
- Router: 150 lines ✅
- Each sub-skill: 200-400 lines ✅
- Total functionality: Unchanged
- Context efficiency: 5x improvement

---

### Example 2: Code Assistant

**Problem:** Code assistant handles debugging, refactoring, documentation, testing - 1800+ lines.

**Solution:** Specialized sub-skills with smart routing.

#### Architecture

```
code_assistant.md (Router - 200 lines)
├── debugging.md (450 lines)
├── refactoring.md (380 lines)
├── documentation.md (320 lines)
└── testing.md (400 lines)
```

#### Router Logic

```markdown
# Code Assistant (Router)

## Routing Keywords

### debugging
error, bug, exception, crash, fix, troubleshoot, debug

### refactoring
refactor, clean, optimize, simplify, restructure, improve

### documentation
docs, comment, docstring, readme, api, explain

### testing
test, unit, integration, coverage, assert, mock
```

---

### Example 3: Data Pipeline

**Problem:** ETL pipeline skill covers extraction, transformation, loading, validation, monitoring.

**Solution:** Pipeline stages as sub-skills.

```
data_pipeline.md (Router)
├── data_extraction.md - Source connectors, API calls
├── data_transformation.md - Cleaning, mapping, enrichment
├── data_loading.md - Database writes, file exports
├── data_validation.md - Quality checks, error handling
└── pipeline_monitoring.md - Logging, alerts, metrics
```

---

## Best Practices

### 1. Single Responsibility Principle

**Each sub-skill should have ONE clear purpose.**

❌ **Bad:** `user_management.md` handles auth, profiles, permissions, notifications
✅ **Good:**
- `user_authentication.md` - Login, logout, sessions
- `user_profiles.md` - Profile CRUD
- `user_permissions.md` - Roles, access control
- `user_notifications.md` - Email, push, alerts

### 2. Clear Routing Keywords

**Make routing keywords explicit and unambiguous.**

❌ **Bad:** Vague keywords like "data", "user", "process"
✅ **Good:** Specific keywords like "login", "authenticate", "extract", "transform"

### 3. Minimize Router Complexity

**Keep router lightweight - just routing logic.**

❌ **Bad:** Router contains actual implementation code
✅ **Good:** Router only contains:
- Sub-skill descriptions
- Routing keywords
- Usage examples
- No implementation details

### 4. Logical Grouping

**Group by responsibility, not by code structure.**

❌ **Bad:** Split by file type (controllers, models, views)
✅ **Good:** Split by feature (user_auth, product_catalog, order_processing)

### 5. Avoid Over-Splitting

**Don't create sub-skills for trivial distinctions.**

❌ **Bad:** Separate skills for "add_user" and "update_user"
✅ **Good:** Single "user_management" skill covering all CRUD

### 6. Document Dependencies

**Explicitly state when sub-skills work together.**

```markdown
## Multi-Skill Operations

**Place order:** Requires coordination between:
1. product_catalog - Validate product availability
2. shopping_cart - Get cart contents
3. checkout_payment - Process payment
4. order_management - Create order record
```

### 7. Maintain Consistent Structure

**Use same SKILL.md structure across all sub-skills.**

Standard sections:
```markdown
# Skill Name

## When to Use This Skill
[Clear description]

## Quick Reference
[Common operations]

## Key Concepts
[Domain terminology]

## Working with This Skill
[Usage guidance]

## Reference Files
[Documentation organization]
```

---

## Complete Examples

### Travel Planner (Full Implementation)

#### Directory Structure

```
skills/
├── travel_planner.md (Router - 180 lines)
├── flight_booking.md (420 lines)
├── hotel_reservation.md (380 lines)
├── itinerary_generation.md (450 lines)
├── travel_insurance.md (290 lines)
└── budget_tracking.md (340 lines)
```

#### travel_planner.md (Router)

```markdown
---
name: travel_planner
description: Travel planning, booking, and itinerary management router
---

# Travel Planner (Router)

## When to Use This Skill

Use for all travel-related planning, bookings, and itinerary management.

This router skill analyzes your travel needs and activates specialized sub-skills.

## Available Sub-Skills

### flight_booking
**Purpose:** Flight search, booking, seat selection, airline comparisons
**Keywords:** flight, airline, plane, ticket, departure, arrival, airport, booking
**Use for:** Finding and booking flights, comparing prices, selecting seats

### hotel_reservation
**Purpose:** Hotel search, room booking, amenities, check-in/out
**Keywords:** hotel, accommodation, room, lodging, reservation, stay, check-in
**Use for:** Finding hotels, booking rooms, checking amenities

### itinerary_generation
**Purpose:** Travel planning, scheduling, route optimization
**Keywords:** itinerary, schedule, plan, route, activities, sightseeing
**Use for:** Creating day-by-day plans, organizing activities

### travel_insurance
**Purpose:** Travel insurance options, coverage, claims
**Keywords:** insurance, coverage, protection, medical, cancellation, claim
**Use for:** Insurance recommendations, comparing policies

### budget_tracking
**Purpose:** Travel budget planning, expense tracking
**Keywords:** budget, cost, expense, price, spending, money
**Use for:** Estimating costs, tracking expenses

## Routing Logic

The router analyzes your question and activates relevant skills:

| Query Pattern | Activated Skills |
|--------------|------------------|
| "Find flights to [destination]" | flight_booking |
| "Book hotel in [city]" | hotel_reservation |
| "Plan [duration] trip to [destination]" | itinerary_generation |
| "Need travel insurance" | travel_insurance |
| "How much will trip cost?" | budget_tracking |
| "Plan complete Paris vacation" | ALL (coordinated) |

## Multi-Skill Coordination

Some requests require multiple skills working together:

### Complete Trip Planning
1. **budget_tracking** - Set budget constraints
2. **flight_booking** - Find flights within budget
3. **hotel_reservation** - Book accommodation
4. **itinerary_generation** - Create daily schedule
5. **travel_insurance** - Recommend coverage

### Booking Modification
1. **flight_booking** - Check flight change fees
2. **hotel_reservation** - Verify cancellation policy
3. **budget_tracking** - Calculate cost impact

## Usage Examples

**Simple (single skill):**
- "Find direct flights to Tokyo" → flight_booking
- "5-star hotels in Paris under $200/night" → hotel_reservation
- "Create 3-day Rome itinerary" → itinerary_generation

**Complex (multiple skills):**
- "Plan week-long Paris trip for 2, budget $3000" → budget_tracking → flight_booking → hotel_reservation → itinerary_generation
- "Cheapest way to visit London next month" → budget_tracking + flight_booking + hotel_reservation
```

---

## Implementation Guide

### Step 1: Analyze Current Skill

**Questions to ask:**
1. How many lines is the current skill?
2. What are the distinct responsibilities?
3. Can I identify clear keyword groups?
4. Are there sections that are rarely used together?

### Step 2: Design Sub-Skills

**Create a plan:**
```
Current: ecommerce_platform.md (2000 lines)

Split into:
1. product_catalog.md (400 lines) - Keywords: product, search, browse
2. shopping_cart.md (300 lines) - Keywords: cart, add, remove
3. checkout_payment.md (350 lines) - Keywords: checkout, payment, order
4. order_management.md (400 lines) - Keywords: order, track, return
5. admin_tools.md (350 lines) - Keywords: admin, inventory, analytics

Router: ecommerce_platform.md (200 lines)
```

### Step 3: Extract Content

**For each sub-skill:**
1. Copy relevant content from monolithic skill
2. Remove irrelevant sections
3. Add "When to Use" section
4. Add routing keywords
5. Ensure < 500 lines

### Step 4: Create Router

**Router template:**
```markdown
# [Skill Name] (Router)

## When to Use This Skill
[Brief description]

## Sub-Skills Available

### [sub_skill_1]
**Purpose:** [What it does]
**Keywords:** [Routing keywords]
**Use for:** [Use cases]

[Repeat for each sub-skill]

## Routing Logic
[Keyword → sub-skill mapping]

## Multi-Skill Operations
[Complex operations requiring multiple skills]

## Usage Examples
[Simple and complex examples]
```

### Step 5: Package and Deploy

**Using Skill Seekers:**
```bash
# Create router + sub-skills structure
skill-seekers router \
  output/skill1/ \
  output/skill2/ \
  output/skill3/ \
  --output output/router/ \
  --name skill-router

# Package
skill-seekers package output/router/ --include-subskills

# Upload
skill-seekers upload router.zip --target claude
```

---

## Troubleshooting

### Issue: Claude not routing correctly

**Symptoms:** Wrong sub-skill activated or no routing happening

**Solutions:**
1. **More specific keywords:**
   ```markdown
   ❌ keywords: data, process
   ✅ keywords: extract, transform, load, ETL, pipeline
   ```

2. **Add routing examples:**
   ```markdown
   ## Usage Examples
   "Load data into database" → data_loading
   "Clean CSV file" → data_transformation
   ```

3. **Check sub-skill descriptions:**
   - Make each sub-skill purpose crystal clear
   - Avoid overlapping responsibilities

### Issue: Sub-skill too large

**Symptoms:** Sub-skill exceeds 500 lines

**Solutions:**
1. **Further split:**
   ```
   user_management.md (800 lines)
   → user_authentication.md (400 lines)
   → user_profiles.md (400 lines)
   ```

2. **Move reference material:**
   - Keep main skill concise
   - Move detailed docs to `references/` directory

3. **Simplify content:**
   - Remove redundant examples
   - Consolidate similar sections

### Issue: Router overhead

**Symptoms:** Router itself is large (> 300 lines)

**Solutions:**
1. **Simplify routing logic:**
   - Use keyword tables instead of prose
   - Remove redundant descriptions

2. **Reduce number of sub-skills:**
   - Combine closely related sub-skills
   - Aim for 3-7 sub-skills maximum

---

## Advanced Patterns

### Hierarchical Routing (Router of Routers)

**For very large systems:**

```
main_router.md (100 lines)
├── user_subsystem_router.md (150 lines)
│   ├── user_auth.md (400 lines)
│   ├── user_profiles.md (350 lines)
│   └── user_permissions.md (380 lines)
├── product_subsystem_router.md (180 lines)
│   ├── product_catalog.md (450 lines)
│   ├── product_inventory.md (420 lines)
│   └── product_pricing.md (390 lines)
└── order_subsystem_router.md (160 lines)
    ├── order_placement.md (440 lines)
    ├── order_fulfillment.md (410 lines)
    └── order_returns.md (370 lines)
```

**When to use:** Systems with 10+ sub-skills or multiple logical subsystems

### Dynamic Routing (Context-Aware)

**Router considers conversation context:**

```markdown
## Routing Logic

**First-time user (no history):**
- Always activate getting_started skill

**Returning user (has context):**
- Analyze recent conversation topics
- Activate relevant sub-skills
- Skip introductory content

**Error state (previous operation failed):**
- Activate troubleshooting skill
- Include context from failed operation
```

---

## Next Steps

- [Three-Stream GitHub Architecture](/docs/reference/c3x-router-architecture) - Multi-source router pattern
- [Large Documentation Handling](/docs/reference/large-documentation) - Split strategies for 10K+ pages
- [AI Skill Standards](/docs/reference/ai-skill-standards) - Best practices for all platforms

---

**Status**: ✅ Complete (v2.0.0+)

Found an issue or have suggestions? [Open an issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
