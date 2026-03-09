---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\brief.md
  - C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\prd.md
  - C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\ux-design-specification.md
  - C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\prd-validation-report.md
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-09T00:54:08.1515039-03:00'
project_name: 'Projeto Lista de mercado'
user_name: 'Kauan'
date: '2026-03-09T00:00:00-03:00'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The product requires a unified grocery-planning experience centered on an active shopping list. Architecturally, the requirements cluster into: catalog browsing by market area, list item management, manual item entry, price estimation and running total calculation, diet-based item collections, localized PT-BR content, and responsive browser use. A notable architectural characteristic is that multiple entry points, including categories, diet flows, and possibly feed/discovery content from the original brief, must converge into the same active-list state model.

The requirement set implies a frontend with rich client-side interaction patterns, a structured product-content domain model, and a pricing model that tolerates incomplete product metadata. The system must support both catalog-backed items and manual items while preserving a coherent list and budget calculation flow.

**Non-Functional Requirements:**
The strongest architectural NFRs are responsiveness of core interactions, continuity of locally stored shopping-list state, strong mobile and desktop usability, PT-BR localization, and accessibility expectations reinforced by the UX specification. The UX specification also raises the quality bar around keyboard navigation, clear feedback states, visible totals, and adaptive layout behavior. Although the PRD validation report notes that many NFRs are not yet precisely measurable, they are still directionally strong enough to shape architectural priorities around client responsiveness, resilient state handling, and accessible component design.

**Scale & Complexity:**
This project is best assessed as a medium-complexity web application. It does not include enterprise-grade compliance, real-time collaboration, or heavy integration complexity in the current scope, but it does require a non-trivial interaction architecture because browsing, suggestions, diet collections, manual entry, and price-aware list management must all work as one coherent system.

- Primary domain: Full-stack web application for grocery planning
- Complexity level: Medium
- Estimated architectural components: 6-8

### Technical Constraints & Dependencies

The current documentation establishes several meaningful constraints. The product must operate as a responsive web application with PT-BR as the primary language. It must support local continuity of shopping-list state and graceful handling of products without price data. The UX direction also implies a premium, dark, component-driven interface with a persistent planning model across desktop and mobile layouts. The brief introduces possible future authenticated and analytics-driven evolution, while the current PRD still reflects a lighter MVP posture; this mismatch should be reconciled during architecture decisions so the design remains extensible without overcommitting early.

### Cross-Cutting Concerns Identified

Key cross-cutting concerns include client state management for the active list, consistency of pricing and total-calculation rules, content modeling for products/categories/diets/suggestions, persistence strategy, localization, responsive layout adaptation, and accessibility compliance. Another major concern is scope alignment between the brief, PRD, and UX specification, especially around whether discovery/feed behavior is part of the MVP architecture baseline or a deferred capability.

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application based on project requirements analysis.

### Starter Options Considered

**Next.js official starter**
The official Next.js starter is the strongest fit for this project. It aligns with the existing product direction toward Vercel deployment, React-based UI development, App Router usage, and progressive addition of server capabilities when needed. It also fits the UX requirement for a highly interactive, responsive application while preserving a straightforward path to route handlers, server rendering, and future authenticated flows.

**shadcn/ui project creation flow**
shadcn/ui now supports project creation and initialization flows for new apps. This is highly relevant because the UX and brief already require shadcn/ui-aligned components and a custom premium visual system. However, it is best treated as a UI foundation layered on top of the core framework choice rather than the primary architectural starter itself.

**TanStack Start**
TanStack Start is promising and modern, but its current release posture is still RC. Given the project's need for implementation consistency, lower adoption risk, and compatibility with the documented Next.js-centric direction, it is not the best default choice here.

### Selected Starter: Next.js Official Starter

**Rationale for Selection:**
This starter best matches the explicit direction already present in the project artifacts: Next.js, TypeScript, Tailwind CSS, App Router, and Vercel deployment. It provides a stable and well-maintained foundation, minimizes architectural drift from the brief, and creates the cleanest path to layer in shadcn/ui, analytics, and future backend/data features without prematurely locking the project into a heavier meta-starter.

**Initialization Command:**

```bash
pnpm create next-app@latest projeto-lista-de-mercado --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript-first React application on top of the current Next.js runtime model.

**Styling Solution:**
Tailwind CSS configured from the start, which fits the required shadcn/ui integration path and custom design-token strategy.

**Build Tooling:**
Next.js build pipeline with modern bundling defaults and current framework conventions.

**Testing Framework:**
No opinionated test framework is included by default, which is acceptable because testing strategy should remain an explicit architecture decision later.

**Code Organization:**
App Router structure, route-oriented organization, and optional `src/` directory separation for cleaner scaling.

**Development Experience:**
Strong local development ergonomics, current CLI support, and direct compatibility with Vercel deployment workflows.

**Note:** After initialization, shadcn/ui should be added immediately as part of the first implementation setup story so the UI foundation matches the UX specification from the beginning.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Supabase Postgres as the primary database platform
- Prisma ORM 7 with Prisma Migrate as the persistence and migration layer
- Next.js Route Handlers with REST-like JSON contracts as the application API boundary
- Zustand for client-local planning state and TanStack Query for server-state management
- Vercel as the hosting and deployment platform

**Important Decisions (Shape Architecture):**
- Zod 4 as the validation layer for API inputs and shared schemas
- Guest-first MVP with local browser persistence as the primary continuity model
- No dedicated distributed cache in MVP; rely on framework-level caching and client query caching
- Vercel Analytics plus PostHog as the initial observability and product analytics stack

**Deferred Decisions (Post-MVP):**
- Remote account-based continuity across devices
- Authorization rules for future user-owned remote data
- Stronger database-level protections for future user-owned tables
- Dedicated rate limiting infrastructure beyond platform defaults
- Redis or equivalent distributed caching
- Advanced error monitoring stack beyond platform logs and analytics
- Multi-service decomposition or background job infrastructure
- Fine-grained internationalization infrastructure beyond PT-BR-first delivery
- Supabase branching as a required preview-environment primitive

### Data Architecture

The system will use Supabase Postgres as the primary relational datastore. This fits the structured domain model around users, shopping lists, list items, products, diets, and suggestion content. Supabase is selected because it provides a managed Postgres platform with operational simplicity, backups, extensions, and a natural path to future use of storage, realtime, or other platform capabilities if the product evolves.

Prisma ORM 7 will be the database access layer used by the Next.js application. Prisma Migrate will manage schema evolution in a controlled way across development and production environments. Prisma is intentionally retained as the application-facing data layer because it provides stronger type safety, explicit schema management, and clearer implementation consistency for AI-assisted development than relying directly on generated database APIs.

Zod 4 will be used for input validation and contract enforcement at application boundaries. Validation schemas should remain close to route handlers and shared domain contracts so that client and server rules remain consistent.

Caching will remain intentionally simple in the MVP. There will be no Redis or distributed cache initially. Read-heavy content such as catalog and diet collections can use framework-native caching where appropriate, while interactive client views will rely on TanStack Query cache for remote state.

### Access Model & Security

The MVP will be guest-first. Users should be able to browse the catalog, use diet flows, and maintain an active shopping list immediately on entry. The primary continuity model in this phase is local browser persistence.

Because MVP usage is guest-first, authorization requirements remain minimal in the initial release. Public catalog and diet content can be exposed through application-controlled read endpoints, while mutable list state stays local to the browser unless and until server persistence is introduced.

If a later phase introduces account-based persistence across devices, the architecture can be extended without invalidating the current MVP structure. At that stage, dedicated authorization and database protection rules should be introduced for user-owned tables such as shopping lists and list items.

API security in MVP should rely on strict schema validation, explicit control of writable endpoints, and standard platform transport security. Transport security and storage encryption remain delegated to the selected providers in MVP scope rather than introducing an application-managed encryption layer prematurely.

### API & Communication Patterns

The main application boundary will use Next.js Route Handlers that expose REST-like JSON endpoints. This keeps the communication pattern explicit, easy to reason about, and implementation-friendly for both human developers and AI agents.

Supabase's auto-generated API will not be treated as the primary application contract for MVP business flows. It may exist as a platform capability, but the product should expose its own stable server-side API surface so validation, authorization, and domain logic remain centralized.

Reads that benefit from server rendering can still be performed directly in server components where appropriate, but shared application mutations and client-driven reads should prefer stable route contracts.

Errors should follow a standard envelope structure with a stable machine-readable code, a user-safe message, and optional field-level validation details.

### Frontend Architecture

Client-local state will use Zustand for the active shopping list, ephemeral UI controls, and planning-session interactions that must feel immediate. This state should remain independent from remote-fetching concerns.

TanStack Query will manage server-state such as product catalog data, diet collections, and future personalized or feed-based content. This creates a clear separation between interactive planning state and backend-backed content retrieval.

The UI foundation will use shadcn/ui primitives, but feature implementation should be organized around domain-oriented modules rather than a flat component directory. A preferred structure is:
- `app/` for routing and layout composition
- `features/` for user-facing capabilities
- `entities/` for domain models and entity UI
- `lib/` or `shared/` for utilities, clients, and shared infrastructure
- `components/ui/` for shadcn/ui primitives

Performance strategy should prioritize a server-rendered shell, careful client hydration boundaries, and progressive loading of secondary discovery surfaces when needed.

### Infrastructure & Deployment

The application will be deployed on Vercel with three main environments: development, preview, and production.

Supabase will provide the managed Postgres infrastructure. Preview database branching should not be treated as a required architectural baseline for MVP because the current Supabase branching experience is still evolving. Instead, the architecture should assume conventional environment separation first, with branching adopted later only if it proves operationally stable for the team.

Observability in MVP will combine Vercel Analytics for web and performance insights with PostHog for product usage events and KPI instrumentation.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize Next.js foundation
2. Add shadcn/ui and base design tokens
3. Establish route-handler conventions and validation layer
4. Build frontend state architecture with Zustand and TanStack Query
5. Provision Supabase project and Prisma schema baseline for catalog and diet content
6. Integrate analytics and deployment environment configuration
7. Defer cross-device account continuity and user-owned remote persistence until post-MVP scope is approved

**Cross-Component Dependencies:**
- Guest-first persistence decisions shape where shopping-list state lives in MVP
- Supabase and Prisma decisions shape API contracts and migration workflows
- Frontend state decisions shape how route handlers are consumed
- Deployment decisions shape environment variable strategy and operational setup
- Analytics decisions affect route events, UI instrumentation, and KPI traceability

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
6 areas where AI agents could make different choices and create integration conflicts:
- naming conventions
- project structure
- API response and error formats
- data exchange conventions
- state management boundaries
- loading and validation behavior

### Naming Patterns

**Database Naming Conventions:**
- Tables must use `snake_case` plural names: `shopping_lists`, `list_items`, `diet_products`
- Columns must use `snake_case`: `user_id`, `created_at`, `unit_price`
- Foreign keys must use `<referenced_entity>_id`: `shopping_list_id`, `product_id`
- Join tables must use descriptive plural names: `diet_products`
- Prisma model names must use `PascalCase` singular names mapped to database tables when needed: `ShoppingList`, `ListItem`

**API Naming Conventions:**
- Route segments must use lowercase kebab-case or lowercase nouns: `/api/lists`, `/api/diets`, `/api/feed-items`
- Collection endpoints must use plural nouns
- Route params must use bracket notation in Next.js and `camelCase` in code variables: `[listId]`, `params.listId`
- Query parameters must use `camelCase` in application-facing APIs: `dietSlug`, `includeUnchecked`
- Headers should follow standard HTTP casing; custom headers should be avoided unless justified

**Code Naming Conventions:**
- React components: `PascalCase`
- Component files: `kebab-case.tsx`
- Utility files: `kebab-case.ts`
- Functions and variables: `camelCase`
- Types/interfaces/schemas: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE` only for true constants
- Hooks must start with `use`
- Server-only helpers should be named explicitly when useful: `get-user-lists.ts`, `create-list-item.ts`

### Structure Patterns

**Project Organization:**
- `app/` contains routes, layouts, pages, route handlers, and route-local server composition
- `features/` contains user-facing vertical slices such as `shopping-list`, `catalog`, `diets`, `feed`, `onboarding`
- `entities/` contains domain entity UI and entity-level contracts such as `product`, `shopping-list`, `diet`
- `lib/` contains shared infrastructure such as `prisma`, `env`, `api`, `analytics`, `storage`
- `components/ui/` contains shadcn/ui primitives only
- `components/shared/` contains reusable cross-feature presentation components
- `prisma/` contains schema and migrations
- `tests/` contains integration and end-to-end tests when not co-located
- Unit tests may be co-located as `*.test.ts` or `*.test.tsx`

**File Structure Patterns:**
- Feature folders should group related UI, hooks, actions, and schemas
- Route handlers should stay thin and delegate to feature/lib functions
- Shared schemas should live near the feature or entity that owns them
- Static assets go under `public/`
- Documentation artifacts remain outside app code unless directly implementation-facing

### Format Patterns

**API Response Formats:**
- Success responses must use:
  - `{ data: ... }`
- Error responses must use:
  - `{ error: { code: string, message: string, fieldErrors?: Record<string, string[]> } }`
- Mutation success responses may include metadata only when necessary:
  - `{ data: ..., meta?: ... }`
- API routes must not mix direct payloads and wrapped payloads across endpoints

**Data Exchange Formats:**
- JSON fields exposed by application APIs must use `camelCase`
- Database fields remain `snake_case`
- Dates in APIs must be ISO 8601 strings
- Money values must use integer cents in persistence and transport when precision matters; formatted BRL strings are view-only
- Booleans must always use `true` and `false`
- Null should be preferred over omitted keys when "known empty" is semantically important

### Communication Patterns

**Event System Patterns:**
- Analytics/event names must use `snake_case` past-tense or action style consistently: `item_added`, `diet_opened`, `list_checked_out`
- Event payloads must use `camelCase`
- Event names should reflect user or domain action, not UI implementation detail
- Event versioning is deferred unless payload evolution becomes frequent

**State Management Patterns:**
- Zustand is only for client-local interactive state
- TanStack Query is only for server-state fetching, cache, and invalidation
- Do not duplicate server-state into Zustand unless there is a temporary UI-only reason
- Store actions must use verb-first `camelCase`: `addItem`, `removeItem`, `toggleChecked`
- Selectors should be explicit and narrow to avoid over-rendering
- State updates must be immutable in intent, even when helper libraries simplify syntax

### Process Patterns

**Error Handling Patterns:**
- Validation errors return `400`
- Authentication errors return `401`
- Authorization errors return `403`
- Not found returns `404`
- Unhandled server errors return `500`
- User-facing messages must be short and safe
- Logs may contain technical detail, but API responses must not leak internals
- Server actions and route handlers must normalize errors before returning them

**Loading State Patterns:**
- Initial page/section loading should use skeletons for content areas
- Mutations should use local pending states on the triggering control
- Global loading indicators should be rare and reserved for navigation-level transitions
- Empty states must always provide a next action
- Loading flags should use `isLoading`, `isPending`, `isFetching` consistently according to context

### Enforcement Guidelines

**All AI Agents MUST:**
- Keep database naming in `snake_case` and API/code naming in `camelCase` or `PascalCase` as defined
- Use the standard API success and error wrappers
- Keep route handlers thin and place business logic in feature/lib modules
- Keep Zustand for local interactive state and TanStack Query for remote state
- Store currency values as numeric amounts, not formatted strings
- Use ISO date strings at API boundaries

**Pattern Enforcement:**
- Code review must reject naming, response-shape, and state-boundary violations
- New endpoints must match the standard response envelope before merge
- New feature folders must follow the agreed structure unless architecture is intentionally revised
- Pattern updates should be made in this architecture document before large deviations are introduced

### Pattern Examples

**Good Examples:**
- Database table: `shopping_lists`
- Prisma model: `ShoppingList`
- API route: `/api/lists/[listId]/items`
- Success response: `{ "data": { "id": "123", "name": "Semana" } }`
- Error response: `{ "error": { "code": "VALIDATION_ERROR", "message": "Invalid item quantity", "fieldErrors": { "quantity": ["Must be at least 1"] } } }`
- Zustand action: `addItem`
- Query key: `['products', categorySlug]`

**Anti-Patterns:**
- Database table named `ShoppingList`
- API returning raw arrays on one route and wrapped objects on another
- Putting fetched product catalog data into Zustand as the default approach
- Formatting BRL currency in persistence fields
- Route handlers with embedded database, validation, and formatting logic all in one file
- Shared UI primitives mixed into feature folders without clear ownership

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
projeto-lista-de-mercado/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tsconfig.json
├── postcss.config.js
├── eslint.config.js
├── components.json
├── middleware.ts
├── .env.example
├── .env.local
├── .gitignore
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── preview.yml
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── images/
│   │   ├── products/
│   │   ├── diets/
│   │   └── placeholders/
│   ├── icons/
│   └── fonts/
├── tests/
│   ├── e2e/
│   │   ├── shopping-list.spec.ts
│   │   ├── catalog.spec.ts
│   │   └── diets.spec.ts
│   ├── integration/
│   │   ├── api/
│   │   │   ├── lists.test.ts
│   │   │   ├── items.test.ts
│   │   │   ├── products.test.ts
│   │   │   └── diets.test.ts
│   │   └── db/
│   │       ├── list-repository.test.ts
│   │       └── product-repository.test.ts
│   ├── fixtures/
│   │   ├── products.ts
│   │   ├── diets.ts
│   │   └── onboarding.ts
│   └── utils/
│       ├── test-env.ts
│       └── render.tsx
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── (app)/
    │   │   ├── layout.tsx
    │   │   ├── lista/
    │   │   │   └── page.tsx
    │   │   ├── catalogo/
    │   │   │   └── page.tsx
    │   │   ├── dietas/
    │   │   │   ├── page.tsx
    │   │   │   └── [dietSlug]/
    │   │   │       └── page.tsx
    │   │   └── feed/
    │   │       └── page.tsx
    │   ├── boas-vindas/
    │   │   └── page.tsx
    │   └── api/
    │       ├── lists/
    │       │   ├── route.ts
    │       │   └── [listId]/
    │       │       ├── route.ts
    │       │       └── items/
    │       │           ├── route.ts
    │       │           └── [itemId]/
    │       │               └── route.ts
    │       ├── products/
    │       │   └── route.ts
    │       ├── categories/
    │       │   └── route.ts
    │       ├── diets/
    │       │   ├── route.ts
    │       │   └── [dietSlug]/
    │       │       └── route.ts
    │       ├── feed-items/
    │       │   └── route.ts
    │       └── analytics/
    │           └── route.ts
    ├── components/
    │   ├── ui/
    │   └── shared/
    │       ├── app-shell.tsx
    │       ├── empty-state.tsx
    │       ├── page-header.tsx
    │       ├── price-badge.tsx
    │       └── section-shell.tsx
    ├── entities/
    │   ├── product/
    │   │   ├── product.types.ts
    │   │   ├── product.schema.ts
    │   │   ├── product-card.tsx
    │   │   └── product-price.tsx
    │   ├── shopping-list/
    │   │   ├── shopping-list.types.ts
    │   │   ├── shopping-list.schema.ts
    │   │   ├── shopping-list-item.tsx
    │   │   └── shopping-list-total.tsx
    │   └── diet/
    │       ├── diet.types.ts
    │       ├── diet.schema.ts
    │       ├── diet-card.tsx
    │       └── diet-product-list.tsx
    ├── features/
    │   ├── onboarding/
    │   │   ├── welcome-gate.tsx
    │   │   ├── name-step.tsx
    │   │   └── use-local-profile.ts
    │   ├── shopping-list/
    │   │   ├── components/
    │   │   │   ├── active-list-panel.tsx
    │   │   │   ├── add-item-form.tsx
    │   │   │   ├── manual-item-composer.tsx
    │   │   │   └── quantity-stepper.tsx
    │   │   ├── hooks/
    │   │   │   ├── use-active-list.ts
    │   │   │   └── use-list-actions.ts
    │   │   ├── api/
    │   │   │   ├── create-list.ts
    │   │   │   ├── get-user-lists.ts
    │   │   │   ├── add-list-item.ts
    │   │   │   ├── update-list-item.ts
    │   │   │   └── remove-list-item.ts
    │   │   ├── store/
    │   │   │   └── active-list.store.ts
    │   │   └── utils/
    │   │       ├── calculate-list-total.ts
    │   │       └── merge-list-item.ts
    │   ├── catalog/
    │   │   ├── components/
    │   │   │   ├── category-rail.tsx
    │   │   │   ├── catalog-grid.tsx
    │   │   │   └── product-search.tsx
    │   │   ├── hooks/
    │   │   │   ├── use-products-query.ts
    │   │   │   └── use-categories-query.ts
    │   │   └── api/
    │   │       ├── get-products.ts
    │   │       └── get-categories.ts
    │   ├── diets/
    │   │   ├── components/
    │   │   │   ├── diet-collection-card.tsx
    │   │   │   ├── diet-preview-dialog.tsx
    │   │   │   └── diet-products-grid.tsx
    │   │   ├── hooks/
    │   │   │   ├── use-diets-query.ts
    │   │   │   └── use-diet-query.ts
    │   │   └── api/
    │   │       ├── get-diets.ts
    │   │       ├── get-diet-by-slug.ts
    │   │       └── add-diet-items-to-list.ts
    │   ├── feed/
    │   │   ├── components/
    │   │   │   ├── feed-collection-block.tsx
    │   │   │   └── suggestion-strip.tsx
    │   │   ├── hooks/
    │   │   │   └── use-feed-items-query.ts
    │   │   └── api/
    │   │       └── get-feed-items.ts
    │   └── analytics/
    │       ├── track-event.ts
    │       ├── posthog-provider.tsx
    │       └── vercel-analytics.tsx
    ├── lib/
    │   ├── storage/
    │   │   ├── local-profile.ts
    │   │   ├── local-list.ts
    │   │   └── onboarding-state.ts
    │   ├── db/
    │   │   ├── prisma.ts
    │   │   ├── repositories/
    │   │   │   ├── lists.repository.ts
    │   │   │   ├── products.repository.ts
    │   │   │   └── diets.repository.ts
    │   │   └── mappers/
    │   │       ├── product.mapper.ts
    │   │       ├── shopping-list.mapper.ts
    │   │       └── diet.mapper.ts
    │   ├── env/
    │   │   ├── server.ts
    │   │   └── client.ts
    │   ├── api/
    │   │   ├── api-response.ts
    │   │   ├── api-error.ts
    │   │   └── route-handler.ts
    │   ├── validations/
    │   │   ├── common.schema.ts
    │   │   ├── money.schema.ts
    │   │   └── pagination.schema.ts
    │   ├── utils/
    │   │   ├── currency.ts
    │   │   ├── dates.ts
    │   │   ├── cn.ts
    │   │   └── object.ts
    │   └── constants/
    │       ├── categories.ts
    │       ├── diets.ts
    │       └── analytics-events.ts
    └── providers/
        ├── app-provider.tsx
        ├── query-provider.tsx
        ├── clerk-provider.tsx
        └── theme-provider.tsx
```

### Architectural Boundaries

**API Boundaries:**
- `src/app/api/**` is the only application-facing HTTP boundary
- Route handlers validate input, call feature/lib services, and normalize output
- No UI component may call Prisma directly
- No client component may call Supabase directly for business flows

**Component Boundaries:**
- `components/ui/` contains primitives only
- `entities/` contains domain-level UI and types
- `features/` composes entities and shared components into user flows
- `app/` wires routes and layouts, but does not own business logic

**Service Boundaries:**
- `features/*/api` contains use-case level server functions for that feature
- `lib/db/repositories` contains persistence operations
- `lib/storage` owns browser-persistence helpers and lightweight onboarding storage
- `lib/api` owns shared HTTP response and error normalization

**Data Boundaries:**
- Prisma is the only ORM/persistence interface
- Database naming remains `snake_case`; application contracts remain `camelCase`
- Zustand owns session-local interactive state
- TanStack Query owns remote-fetch lifecycle and cache

### Requirements to Structure Mapping

**Feature Mapping:**
- Shopping list management -> `src/features/shopping-list/`, `src/app/api/lists/`, `src/entities/shopping-list/`
- Catalog browsing -> `src/features/catalog/`, `src/app/api/products/`, `src/app/api/categories/`, `src/entities/product/`
- Diet planning -> `src/features/diets/`, `src/app/api/diets/`, `src/entities/diet/`
- Feed/discovery -> `src/features/feed/`, `src/app/api/feed-items/`
- First-use onboarding -> `src/features/onboarding/`, `src/app/boas-vindas/`, `src/lib/storage/`
- Analytics -> `src/features/analytics/`, `src/app/api/analytics/`, `src/lib/constants/analytics-events.ts`

**Cross-Cutting Concerns:**
- Validation -> `src/lib/validations/` and feature/entity schemas
- API normalization -> `src/lib/api/`
- Database access -> `src/lib/db/`
- Environment handling -> `src/lib/env/`
- Shared layout/shell UI -> `src/components/shared/`
- Providers -> `src/providers/`

### Integration Points

**Internal Communication:**
- UI pages call feature hooks/components
- Feature hooks call route handlers through typed fetch utilities or query functions
- Route handlers call feature use cases
- Feature use cases call repositories and storage helpers when needed

**External Integrations:**
- Supabase/Postgres is accessed only via Prisma connection in `src/lib/db/prisma.ts`
- PostHog and Vercel Analytics enter through `src/features/analytics/`

**Data Flow:**
- User action -> feature component/hook -> API route or server action -> validation -> repository or local storage -> normalized response -> query/store update -> UI render

### File Organization Patterns

**Configuration Files:**
- Root configs stay at repository root
- Environment schemas live in `src/lib/env/`
- Prisma schema and migrations stay in `prisma/`

**Source Organization:**
- Source code lives under `src/`
- Domain-first separation is preferred over type-only separation
- Shared infrastructure stays in `lib/`, not inside feature folders

**Test Organization:**
- E2E tests live in `tests/e2e/`
- Integration tests live in `tests/integration/`
- Unit tests can be co-located for feature-level logic
- Shared fixtures and render helpers live in `tests/fixtures/` and `tests/utils/`

**Asset Organization:**
- Static assets live in `public/`
- Product and diet imagery are separated by folder
- Fonts and icons remain centralized

### Development Workflow Integration

**Development Server Structure:**
- Local app runs from Next.js root
- Prisma migrations and seed data support local environment setup
- Providers centralize app bootstrap concerns

**Build Process Structure:**
- Next.js builds from `src/app`
- Prisma client generation is part of install/build workflow
- Shared environment validation prevents bad deploys

**Deployment Structure:**
- Vercel deploys app and route handlers together
- Supabase stays external as managed data platform
- CI validates lint, typecheck, tests, and migration integrity before promotion

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:**
All core decisions are compatible. The chosen stack forms a coherent full-stack web architecture: Next.js provides the application shell and API boundary, Prisma provides type-safe persistence, Supabase provides managed Postgres infrastructure for structured content, Zustand handles local interactive state, TanStack Query handles remote state, and Vercel supports the deployment model. Authentication is intentionally deferred from the MVP baseline so the architecture stays aligned with the current product scope.

**Pattern Consistency:**
Implementation patterns support the chosen architecture well. Naming conventions are consistent across database, API, and application code. Response envelopes, state-management boundaries, and file-organization rules reinforce the core decisions rather than competing with them.

**Structure Alignment:**
The defined project structure supports all major architectural choices. Route handlers, features, entities, infrastructure libraries, providers, and tests are separated in a way that enables multiple AI agents to work without overlapping responsibilities or creating integration ambiguity.

### Requirements Coverage Validation

**Epic/Feature Coverage:**
All currently known feature areas are covered by explicit architectural modules: shopping list, catalog, diets, feed/discovery, and analytics. Future cross-device continuity remains architecturally possible without being a required MVP module.

**Functional Requirements Coverage:**
All major functional requirement groups are architecturally supported:
- shopping-list creation and item management
- manual item entry
- price estimation and running total calculation
- category-based catalog browsing
- diet-based collections and bulk-add flows
- guest-first local continuity for planning state
- responsive browser-based use

The architecture also preserves room for the feed/discovery capability that exists in the brief, even though the PRD still needs scope reconciliation in that area.

**Non-Functional Requirements Coverage:**
Performance, security, maintainability, and deployment requirements are all addressed at the architectural level. Accessibility and responsive behavior are supported through the component strategy, UI boundaries, and project structure. NFR precision remains partly dependent on future PRD refinement, but there are no major architectural gaps blocking implementation.

### Implementation Readiness Validation

**Decision Completeness:**
Critical technology and platform decisions are documented. Core integration choices, validation strategy, state boundaries, API style, and deployment model are all explicit enough to guide implementation.

**Structure Completeness:**
The project structure is concrete and implementation-ready. Key directories, route locations, repositories, providers, test areas, and integration points are all specified.

**Pattern Completeness:**
The most likely AI-agent conflict points are covered: naming, structure, API format, state boundaries, loading behavior, and error handling. The rules are specific enough to enforce consistency across independent implementation work.

### Gap Analysis Results

**Critical Gaps:**
None identified.

**Important Gaps:**
- The Discovery Feed remains architecturally supported, but the product scope should still be reconciled between the brief and the PRD.
- Some non-functional requirements in the PRD remain qualitative and would benefit from sharper measurable targets.

**Nice-to-Have Gaps:**
- Future background-job strategy is not defined because it is not needed for MVP.
- Advanced observability beyond initial analytics is deferred.
- Preview-database branching is intentionally not treated as a baseline capability.

### Validation Issues Addressed

The main architectural risk was mismatch between the original brief and the current PRD around feed/discovery scope. This was addressed by keeping the architecture feed-capable without making it a hidden dependency for unrelated modules. This preserves flexibility without forcing scope expansion during MVP implementation.

A second risk was conflict between local interactive state and remote fetched state. This was addressed clearly by assigning Zustand to local planning state and TanStack Query to server-state concerns.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Clear and coherent full-stack architecture
- Strong boundaries for AI-agent consistency
- Explicit project structure and module ownership
- Good balance between MVP simplicity and future extensibility

**Areas for Future Enhancement:**
- Refine PRD NFR measurability
- Reconcile final feed/discovery MVP scope
- Add deeper monitoring strategy if operational complexity increases

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
Initialize the Next.js foundation, then immediately add shadcn/ui, Prisma, and the baseline environment/configuration required to support the selected guest-first MVP architecture.
