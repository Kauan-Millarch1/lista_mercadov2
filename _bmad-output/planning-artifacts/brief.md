# Project Briefing — Smart Grocery List Web Application

**Document Version:** 1.1  
**Created:** March 2026  
**Status:** Ready for PRD Phase  
**Methodology:** BMAD (Breakthrough Method of Agile AI-Driven Development)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Product Vision & Goals](#3-product-vision--goals)
4. [Target Audience & User Personas](#4-target-audience--user-personas)
5. [Functional Requirements](#5-functional-requirements)
6. [Feature Specifications](#6-feature-specifications)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [UX/UI Design Requirements](#8-uxui-design-requirements)
9. [Tech Stack & Architecture](#9-tech-stack--architecture)
10. [Platform & Deployment](#10-platform--deployment)
11. [Data Architecture](#11-data-architecture)
12. [Key Differentiators](#12-key-differentiators)
13. [Success Metrics (KPIs)](#13-success-metrics-kpis)
14. [Risks & Mitigations](#14-risks--mitigations)
15. [Open Questions & Next Steps](#15-open-questions--next-steps)

---

## 1. Executive Summary

This document describes the product vision, functional scope, and technical requirements for a **Smart Grocery List Web Application** — a browser-based tool that empowers users to plan, organize, and cost-estimate their grocery shopping in a modern, intelligent interface.

The application goes beyond a simple checklist. It introduces real-time cost estimation based on average product prices, a discovery feed with smart product filters, and a dedicated diet-planning section with curated shopping lists for specific nutritional goals. These features position the product as a comprehensive grocery planning companion rather than a static note-taking tool.

The system will be deployed on **Vercel** and built entirely as a web application. The UI will be built using the **shadcn/ui** component library to ensure a modern, clean, and consistent design language throughout the product.

This briefing serves as the foundational input document for the BMAD development workflow — informing architecture decisions, story mapping, design direction, and sprint planning.

---

## 2. Problem Statement

### 2.1 The Core Problem

Grocery shopping is a routine task that the majority of people perform weekly, yet it is persistently disorganized. Users commonly face three recurring pain points:

1. **Lack of planning** — People frequently forget items they intended to buy, leading to return trips or missed purchases.
2. **No cost awareness** — Shoppers rarely know how much their cart will cost before arriving at the store, making it difficult to stay within budget.
3. **Dietary confusion** — Users who are following a specific diet (weight loss, muscle gain, vegan, etc.) struggle to know exactly which grocery products align with their goals.

### 2.2 Existing Alternatives & Their Shortcomings

Current solutions on the market (e.g., OurGroceries, AnyList, Bring!) are primarily focused on list-making only. They lack:

- Integrated cost estimation by product
- Diet-aware shopping suggestions
- A discovery feed that helps users explore what to buy
- A modern, visually refined interface that feels like a current-generation product

This application aims to fill that gap by combining task utility with intelligent recommendations and cost awareness.

---

## 3. Product Vision & Goals

### 3.1 Vision Statement

> *To be the most intuitive and intelligent grocery planning tool on the web — helping users shop smarter, spend less, and eat better.*

### 3.2 Product Goals

| # | Goal | Priority |
|---|---|---|
| G1 | Allow users to create and manage a structured grocery shopping list | Must Have |
| G2 | Provide real-time cost estimation as items are added to the list | Must Have |
| G3 | Surface intelligent product suggestions through a discovery feed | Must Have |
| G4 | Offer curated diet-based shopping lists in a dedicated section | Must Have |
| G5 | Deliver a visually modern, premium-feeling interface | Must Have |
| G6 | Ensure the product is fully functional from any web browser | Must Have |
| G7 | Enable personalization over time as users build usage history | Should Have |

### 3.3 Out of Scope (v1.0)

The following capabilities are explicitly **not** in scope for the initial version and should not be assumed during development:

- Native mobile application (iOS or Android)
- Integration with real supermarket pricing APIs (may use static/curated average prices in v1)
- Social features (sharing lists with others, collaborative shopping)
- In-app purchasing or e-commerce integration
- Barcode scanning
- Push notifications

---

## 4. Target Audience & User Personas

### 4.1 Primary User

**The Practical Planner**  
A person aged 22–45 who does regular grocery shopping — either for themselves or their household. They want to stop forgetting items, stay within their budget, and spend less mental energy on the task. They are comfortable using web applications on both desktop and mobile browsers.

Key behaviors:
- Makes grocery trips 1–3 times per week
- Often shops with a mental list that is incomplete
- Has a rough idea of their budget but rarely tracks it precisely
- May follow a diet casually but is not necessarily disciplined about it

### 4.2 Secondary User

**The Fitness-Focused Shopper**  
A user who is actively following a dietary protocol (e.g., high-protein, caloric deficit, vegan) and wants the application to help them understand which grocery products align with their goals. They are more engaged with the Diet section and product suggestions.

Key behaviors:
- Has specific nutritional goals
- Researches food before buying
- Wants clarity on what to buy without having to consult multiple sources
- Values structured shopping lists organized around a dietary framework

---

## 5. Functional Requirements

### 5.1 Shopping List Management

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | User can create a new shopping list | Must Have |
| FR-02 | User can add items to the list by typing the product name | Must Have |
| FR-03 | User can remove items from the list | Must Have |
| FR-04 | User can mark items as "already purchased" during a shopping trip | Must Have |
| FR-05 | User can edit the quantity of each item | Must Have |
| FR-06 | User can organize items by category (e.g., produce, dairy, bakery) | Should Have |
| FR-07 | User can create multiple saved lists (e.g., "Weekly Shop", "Party") | Should Have |
| FR-08 | User can clear all checked items from the list in one action | Must Have |

### 5.2 Cost Estimation

| ID | Requirement | Priority |
|---|---|---|
| FR-09 | Each product in the list displays an estimated average price | Must Have |
| FR-10 | The list displays a running total that updates in real time as items are added or removed | Must Have |
| FR-11 | The running total reflects quantity multiplied by unit price | Must Have |
| FR-12 | User can see a cost breakdown per category | Should Have |
| FR-13 | User can set a budget target and see how close they are to it | Should Have |

### 5.3 Discovery Feed

| ID | Requirement | Priority |
|---|---|---|
| FR-14 | The feed section displays product suggestions grouped by filter tabs | Must Have |
| FR-15 | Feed includes a "Most Purchased" tab with trending grocery items | Must Have |
| FR-16 | Feed includes a "Diet Picks" tab with most purchased items by diet-conscious users | Must Have |
| FR-17 | User can add any item from the feed directly to their active shopping list | Must Have |
| FR-18 | Feed content can be extended with additional category tabs in future iterations | Should Have |

### 5.4 Diet Section

| ID | Requirement | Priority |
|---|---|---|
| FR-19 | A dedicated "Diet" tab/section exists in the application navigation | Must Have |
| FR-20 | The section lists supported diets (e.g., caloric deficit, high-protein, vegan, vegetarian) | Must Have |
| FR-21 | Each diet has a curated list of recommended grocery items | Must Have |
| FR-22 | User can browse a diet's suggested shopping list | Must Have |
| FR-23 | User can add all or selected items from a diet list directly to their active shopping list | Must Have |
| FR-24 | Each diet shows a brief description explaining its goal and context | Should Have |

---

## 6. Feature Specifications

### 6.1 Shopping List — Detailed Behavior

The shopping list is the core feature of the application. When a user types a product name into the input field:

1. The system attempts to match the typed text against a product database.
2. If a match is found, the product is added with its average price automatically populated.
3. If no match is found, the item is still added as a custom entry, with no price or with the option for the user to input a price manually.
4. The quantity defaults to 1 and is adjustable.
5. As each item is added, the total estimated cost at the bottom of the list updates immediately.
6. Items can be checked off during shopping without being deleted, allowing the user to track progress mid-trip.
7. A visual indicator (strikethrough or faded style) is applied to checked items to distinguish them from remaining items.

### 6.2 Discovery Feed — Detailed Behavior

The discovery feed acts as a lightweight inspiration layer within the app. It is **not** a social network — it is a curated content surface designed to help users discover products they may want to add to their lists.

Feed tabs in v1.0:
- **Most Purchased** — displays the most frequently added products across the platform (or a statically curated list for v1 if usage data is not available at launch)
- **Diet Picks** — displays products most commonly associated with health/diet goals

Each product card in the feed should display:
- Product name
- Product category (e.g., proteins, grains, dairy)
- Average estimated price
- A quick-add button to add the product directly to the active shopping list

### 6.3 Diet Section — Detailed Behavior

The Diet section is a standalone area of the application. Initial diet protocols to be supported in v1.0:

| Diet Name | Description |
|---|---|
| Caloric Deficit | Low-calorie products for weight loss |
| High-Protein | Protein-dense items for muscle gain or satiety |
| Vegan | Plant-based only items |
| Vegetarian | No meat, but includes dairy/eggs |
| Low-Carb / Keto | Minimal carbohydrate products |

For each diet, the application presents:
- A short descriptive paragraph explaining the dietary approach
- A curated list of recommended grocery products, each with estimated price
- An "Add All to List" button and individual "Add" buttons per product

### 6.4 Cost Estimation — Detailed Behavior

Average prices displayed in the system will be based on a **static, internally maintained price reference** at launch (v1.0). This is the simplest and most reliable approach for the initial version and can be replaced or supplemented with a real pricing API in future iterations.

Price display behavior:
- Prices are shown in Brazilian Real (BRL, R$) — the confirmed primary market currency
- When quantity is changed, the line-item cost updates instantly
- The grand total is always visible at the bottom of the list, pinned/sticky if the list is long
- If a product has no price in the database, its contribution to the total is shown as "—" (not counted)

---

## 7. Non-Functional Requirements

### 7.1 Performance

| ID | Requirement |
|---|---|
| NFR-01 | Initial page load must complete in under 3 seconds on a standard broadband connection |
| NFR-02 | List interactions (add, remove, check) must respond in under 200ms — perceived as instant |
| NFR-03 | The application must remain performant with lists containing up to 100 items |

### 7.2 Usability

| ID | Requirement |
|---|---|
| NFR-04 | The application must be fully usable on desktop browsers (Chrome, Firefox, Safari, Edge) |
| NFR-05 | The layout must be responsive and usable on mobile browsers (no native app required) |
| NFR-06 | The user must be able to complete core tasks (add item, check off, view total) without any onboarding or tutorial |

### 7.3 Reliability & Availability

| ID | Requirement |
|---|---|
| NFR-07 | The application must target 99.5% uptime (achievable via Vercel's infrastructure) |
| NFR-08 | User data (shopping lists) must not be lost between sessions |

### 7.4 Security

| ID | Requirement |
|---|---|
| NFR-09 | If future account features are introduced, they must follow appropriate credential and data protection practices |
| NFR-10 | The application must be served over HTTPS at all times |
| NFR-11 | No sensitive user data beyond the shopping list content should be collected in v1.0 |

---

## 8. UX/UI Design Requirements

### 8.1 Design Philosophy

The application's design must feel **modern, clean, and technology-forward**. The visual language should communicate sophistication and precision — this is not a casual note-taking tool but a purposeful product.

Design principles to follow:
- **Minimalism with purpose** — no decorative elements without function
- **High contrast and readability** — text must be legible in all conditions
- **Intentional hierarchy** — the most important information (list, total) should be the most visually prominent
- **Responsive fluidity** — layout adapts gracefully across screen sizes without feeling like an afterthought

### 8.2 Component Library

**All UI components must be sourced from or aligned with [shadcn/ui](https://ui.shadcn.com/).**

shadcn/ui is built on Radix UI primitives and styled with Tailwind CSS. It provides accessible, composable components that match the required modern aesthetic. Developers must reference the official shadcn/ui documentation for all component implementations, ensuring visual and behavioral consistency throughout the product.

Key shadcn/ui components anticipated for use:

| Component | Use Case |
|---|---|
| `Input` | Product search / add field |
| `Button` | Add to list, quick-add from feed, diet import |
| `Card` | Feed product cards, diet list cards |
| `Badge` | Product categories, diet labels |
| `Tabs` | Feed filter tabs, Diet section navigation |
| `Checkbox` | Mark items as purchased |
| `Sheet` / `Dialog` | Expanded product view, confirmations |
| `Progress` | Budget tracker (if implemented) |
| `Separator` | List category dividers |

### 8.3 Color & Typography

- Color scheme must feel modern — dark mode support is highly desirable for v1.0
- Typography must be clean and legible — system fonts or a modern sans-serif (e.g., Inter)
- Neutral tones with carefully applied accent colors (not overwhelming)
- The overall tone must feel closer to a productivity app or fintech product, not a traditional grocery/food app

### 8.4 Navigation Structure (Proposed)

```
App Shell
├── Shopping List (default/home view)
│   ├── Active List
│   └── Saved Lists
├── Feed
│   ├── Most Purchased
│   └── Diet Picks
└── Diet
    ├── Caloric Deficit
    ├── High-Protein
    ├── Vegan
    ├── Vegetarian
    └── Low-Carb / Keto
```

---

## 9. Tech Stack & Architecture

> The following is a recommended stack aligned with modern web development practices and compatibility with Vercel deployment. Final decisions are subject to team review.

### 9.1 Frontend

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | Industry standard for React-based web apps on Vercel; excellent DX and performance |
| Language | TypeScript | Type safety reduces bugs; required for large-scale maintainability |
| Styling | Tailwind CSS | Native to shadcn/ui; utility-first and highly customizable |
| UI Components | shadcn/ui | Mandated by design requirements; modern, accessible, composable |
| State Management | Zustand or React Context | Lightweight state for list management; no need for Redux in v1 |

### 9.2 Backend

| Layer | Technology | Rationale |
|---|---|---|
| API Layer | Next.js API Routes or Route Handlers | Keeps backend co-located with frontend in the same Vercel project |
| Database | PostgreSQL (via Supabase or Neon) | Reliable relational database; both providers offer Vercel-native integrations |
| ORM | Prisma | Type-safe database access; works seamlessly with Next.js and PostgreSQL |
| Personalization | Local browser storage | Supports optional user name capture and guest-first continuity without account friction |

### 9.3 Data & Pricing Reference

| Layer | Technology | Rationale |
|---|---|---|
| Product Database | Internal JSON / PostgreSQL table | Curated product list with average prices; manageable for v1 |
| Price Source (v1) | Static/manually curated data | Reliable and cost-free; independent of third-party API limitations |
| Price Source (future) | Open Food Facts API or similar | Can be integrated in a later iteration to improve price accuracy |

---

## 10. Platform & Deployment

| Property | Value |
|---|---|
| Platform Type | Web Application (browser-based) |
| Target Deployment | [Vercel](https://vercel.com/) |
| Domain | To be defined |
| Mobile Support | Responsive web (no native app) |
| Browser Targets | Chrome, Firefox, Safari, Edge — latest 2 versions |
| Environment Stages | Development → Staging → Production |

Vercel provides automatic deployments from Git branches, preview URLs for pull requests, and edge network delivery — all of which benefit development velocity and production reliability.

---

## 11. Data Architecture

### 11.1 Core Entities

**User**
- id, email, name, created_at, updated_at

**ShoppingList**
- id, user_id, name, created_at, updated_at, is_active

**ListItem**
- id, list_id, product_id (nullable), custom_name (nullable), quantity, unit_price, is_checked, created_at

**Product**
- id, name, category, average_price, unit, image_url, created_at

**Diet**
- id, name, slug, description, created_at

**DietProduct**
- id, diet_id, product_id, notes

### 11.2 Key Relationships

- A `User` can have many `ShoppingLists`
- A `ShoppingList` contains many `ListItems`
- A `ListItem` optionally references a `Product` (for priced items)
- A `ListItem` can also be a freeform entry (custom_name) when no product match exists
- A `Diet` is associated with many `Products` through `DietProduct`

---

## 12. Key Differentiators

The following features represent the product's primary competitive advantages and must be executed with precision:

### 12.1 Real-Time Cost Estimation
No current free grocery list tool offers seamless, item-level price estimation with an auto-updating total. This feature transforms the shopping list from a memory aid into a financial planning tool — giving users genuine value and a clear reason to choose this product over alternatives.

### 12.2 Diet-Integrated Shopping
The Diet section bridges the gap between health goals and grocery execution. Instead of consulting a nutritionist's blog and then separately writing a list, users can go directly from "I want to follow a high-protein diet" to a ready-made, shoppable list with one action. This is the most novel feature of the product and should be treated as a flagship differentiator.

---

## 13. Success Metrics (KPIs)

These metrics should be tracked from launch to evaluate product-market fit and guide iteration:

| Metric | Description | Target (90 days post-launch) |
|---|---|---|
| Active Users | Users who create or update a list at least once per week | TBD at launch |
| List Creation Rate | Average number of lists created per active user | ≥ 1 per week |
| Diet Section Engagement | % of users who visit the Diet section | ≥ 30% |
| Feed Engagement | % of users who add a product via the feed | ≥ 20% |
| Cost Feature Usage | % of lists where at least one priced item is present | ≥ 70% |
| Session Duration | Average time spent in app per session | ≥ 3 minutes |
| Return Rate | % of users who return within 7 days of first use | ≥ 40% |

---

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Product price data is inaccurate or outdated | High | Medium | Launch with clearly labeled "estimated average price" copy; set user expectations correctly |
| Users don't trust the price estimates | Medium | High | Allow users to manually override prices per item |
| Diet suggestions feel generic or unhelpful | Medium | High | Invest in quality content curation for each diet; consult nutritional references |
| Feed feels static without real user data at launch | High | Medium | Use editorially curated content for "Most Purchased" at launch; replace with real data as usage grows |
| shadcn/ui learning curve delays frontend development | Low | Low | shadcn/ui is well-documented; developer familiarity is a common assumption in modern React stacks |
| Scope creep into mobile app territory | Medium | High | Enforce web-only constraint at all planning checkpoints; defer mobile to a post-v1 roadmap |

---

## 15. Architectural Decisions & Next Steps

### 15.1 Resolved Decisions

The following decisions were open during the initial draft and have now been confirmed. These are binding inputs for the PRD, architecture, and story mapping phases.

---

**Decision 1 - Guest-First Access in v1**

Authentication is not required from v1.0. The application must support immediate use without account creation or login, allowing the shopping flow to begin as soon as the user enters the app. A lightweight first-use step may ask only for the user's name so the experience can feel guided and personal without introducing account friction.

- Access model: **guest-first**
- Optional first step: ask only for the user's display name
- Shopping list continuity: browser-local persistence in the same environment
- Multi-device continuity and protected user-specific routes: deferred from v1.0

---

**Decision 2 — Language, Locale & Currency**

The primary market is Brazil. All product content, UI copy, and dietary suggestions must be written in **Portuguese (pt-BR)** from v1.0. The application will not be bilingual at launch — an English version is a post-v1 consideration if the market expands.

- Interface language: Portuguese (pt-BR)
- Currency: Brazilian Real (BRL, R$)
- Number formatting: Brazilian locale standard (e.g., R$ 12,90)
- Date formatting: dd/mm/yyyy

---

**Decision 3 — Pricing Data Source**

For v1.0, product prices will be maintained as a **static, internally curated dataset** stored directly in the application database. No external pricing API will be integrated at launch. This eliminates third-party dependency, reduces complexity, and ensures launch stability.

- Prices will represent approximate Brazilian supermarket averages and will be manually maintained by the product team
- Prices are clearly labeled in the UI as "estimated average price" to set correct user expectations
- Users may manually override the price of any item in their list
- Integration with a real-time pricing API (e.g., a national supermarket API or Open Food Facts) is deferred to v2.0

---

**Decision 4 — Feed Initial Data Source**

At launch, the "Most Purchased" tab in the Discovery Feed will be **editorially curated** — a hand-picked list of commonly purchased Brazilian grocery items managed by the product team. Real usage-based data (derived from actual user behavior) will replace or supplement this content once the active user base reaches a threshold that makes behavioral data statistically meaningful (estimated: 500+ weekly active users).

- The feed content will be stored as a seeded dataset in the database
- The architecture must be designed so that the data source behind the feed can be swapped without frontend changes (i.e., the feed must consume an API endpoint, not hardcoded content)
- This ensures a seamless transition from curated to algorithmic data in a future iteration

---

**Decision 5 — Analytics**

Analytics will be implemented from day one. Two tools will be used in combination:

- **Vercel Analytics** — enabled by default; tracks page views, Web Vitals, and performance metrics with zero configuration overhead
- **PostHog** — integrated for product event tracking (e.g., "item added to list", "diet section visited", "feed item quick-added"); free tier is sufficient for v1 usage levels

Both tools must be configured before the first production deployment. The KPIs defined in Section 13 must be mapped to PostHog events during the implementation phase so that measurement is available from day one.

---

**Decision 6 — MVP Scope (v1.0 vs. Deferred)**

The following table defines exactly what ships in v1.0 and what is explicitly deferred.

| Feature | v1.0 | Deferred |
|---|---|---|
| Multi-device account continuity | - | Post-MVP |
| Optional user name step on first entry | Yes | - |
| Create and manage shopping lists | Yes | — |
| Add, remove, check off items | Yes | — |
| Real-time running total with BRL pricing | Yes | — |
| Manual price override per item | Yes | — |
| Discovery Feed with curated tabs | Yes | — |
| Diet section with 5 diet protocols | Yes | — |
| Add items from feed/diet to active list | Yes | — |
| Dark mode support | Yes | — |
| Multiple saved lists per user | — | v1.1 |
| Budget target with progress indicator | — | v1.1 |
| Cost breakdown by product category | — | v1.1 |
| Personalized feed based on user history | — | v1.1 |
| Real-time pricing API integration | — | v2.0 |
| Native mobile application | — | v2.0 |
| Social/collaborative lists | — | v2.0 |
| Barcode scanning | — | v2.0 |

---

### 15.2 Next Steps (BMAD Workflow)

1. **Update the PRD** — incorporate all decisions from Section 15.1 into the formal Product Requirements Document
2. **Finalize the data model** - update Section 11 entities to reflect guest-first usage, browser-local continuity, and optional user name personalization
3. **Curate the product catalog** — build the initial product list with BRL prices (target: 150-200 products across all major categories and diet protocols)
4. **Design system setup** — initialize the Next.js project with shadcn/ui, configure Tailwind tokens (colors, typography, spacing), and set up dark mode
5. **Configure analytics** — set up Vercel Analytics and PostHog, define the event taxonomy before any feature development begins
6. **Story mapping session** — break down all FR-01 through FR-24 requirements into user stories, assign to sprints based on the MVP scope table above
7. **Architecture review** — validate the proposed tech stack (Section 9) against all resolved decisions before development starts

---

*Briefing Version 1.2 — Smart Grocery List Web App — March 2026*  
*All open questions resolved. This document is ready to serve as the primary input for the BMAD PRD and architecture phases.*




