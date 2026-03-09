---
project_name: 'Projeto Lista de mercado'
user_name: 'Kauan'
date: '2026-03-09T02:21:48.0328622-03:00'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - quality_rules
  - workflow_rules
  - anti_patterns
status: 'complete'
rule_count: 69
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Frontend app: Next.js (App Router) + React + TypeScript
- UI foundation: Tailwind CSS + shadcn/ui
- Client state: Zustand for session-local interactive list state
- Server state: TanStack Query for remote data fetching and cache
- Backend/data: Supabase Postgres + Prisma ORM 7 + Prisma Migrate
- Validation: Zod 4 at application boundaries
- Deployment: Vercel
- Product analytics: PostHog
- Web analytics: Vercel Analytics
- Motion layer: Framer Motion
- Primary language: PT-BR UI/content
- Current repo status: planning artifacts exist, but no app scaffold (`src/`, `package.json`, `tsconfig.json`) is present yet

## Critical Implementation Rules

### Language-Specific Rules

- Use TypeScript-first contracts for feature code, route handlers, schemas, and data mappers.
- Keep database field names in `snake_case`, but expose application and API payloads in `camelCase`.
- Use `PascalCase` for types, interfaces, schemas, and React components.
- Use `camelCase` for variables, functions, route params in code, and store actions.
- Use `SCREAMING_SNAKE_CASE` only for real constants.
- Validate application boundaries with Zod instead of relying on implicit runtime assumptions.
- Keep route handlers thin; move business logic into feature or library modules.
- Use explicit mappers when translating Prisma/database records into API-facing models.
- Use ISO 8601 strings for dates in APIs.
- Represent money as integer cents in transport/persistence when precision matters; formatted BRL strings are view-only.
- Prefer `null` over omitted keys when the value is intentionally known-empty.
- Do not assume TypeScript config exists in the repo until the app scaffold is actually created.

### Framework-Specific Rules

- Use Next.js App Router structure as the default project shape.
- Keep `src/app/api/**` as the only application-facing HTTP boundary.
- Route handlers must validate input, delegate to feature/lib logic, and normalize output.
- Do not call Prisma directly from UI components.
- Do not call Supabase directly from client components for business flows.
- Use Zustand only for client-local interactive shopping state.
- Use TanStack Query only for server-state fetching, cache, and invalidation.
- Do not duplicate remote server-state into Zustand unless there is a temporary UI-only reason.
- Keep `components/ui/` for shadcn/ui primitives only.
- Build product-specific UI in feature, entity, or shared component layers instead of turning the primitive layer into feature components.
- Organize code by domain: `features/`, `entities/`, `lib/`, `components/shared/`, `providers/`.
- Keep PT-BR as the default interface/content language in UI-facing implementation.
- Treat motion as a reusable interaction layer with Framer Motion, not as one-off inline animations.
- Respect `prefers-reduced-motion` from the first motion implementation pass.
- Prefer transform/opacity-based animation over layout-heavy motion.

### Testing Rules

- Treat current testing guidance as target architecture until a real test stack is scaffolded.
- Keep unit tests close to feature or entity logic when practical (`*.test.ts` / `*.test.tsx`).
- Reserve `tests/integration/` for route, persistence, and cross-module behavior.
- Reserve `tests/e2e/` for end-to-end user flows across catalog, list, budget, diets, and onboarding.
- Test behavior boundaries, not implementation details of UI libraries.
- Validate route handler input/output contracts, including normalized success and error envelopes.
- Cover price-total recalculation, manual items without price, repeated item add, and bulk diet add.
- Cover PT-BR labels and user-visible messaging in core flows.
- Include accessibility checks for keyboard navigation, focus continuity, and non-color-only status communication.
- Include reduced-motion scenarios for animated flows.
- When active lists or bulk inserts grow large, test simplified/fallback motion behavior instead of assuming full choreography.
- Do not claim coverage or tooling exists unless the actual runner/config files exist in the repo.

### Code Quality & Style Rules

- Follow domain-first organization instead of grouping code only by technical type.
- Use `kebab-case` for component and utility file names.
- Use `PascalCase` for component identifiers, schema/type names, and Prisma models.
- Use plural `snake_case` for database tables and `snake_case` for database columns.
- Use plural nouns for collection endpoints and lowercase route segments.
- Keep API success payloads wrapped as `{ data: ... }`.
- Keep API error payloads wrapped as `{ error: { code, message, fieldErrors? } }`.
- Do not mix wrapped and unwrapped API payload styles across endpoints.
- Keep route handlers thin and colocate shared schemas near the owning feature or entity.
- Put browser persistence helpers in `lib/storage/`, persistence access in `lib/db/`, and shared HTTP normalization in `lib/api/`.
- Keep comments and documentation sparse and high-signal; document decisions and non-obvious behavior, not obvious code mechanics.
- Do not treat planning artifacts as executable truth when the actual repo implementation diverges; re-check the workspace first.

### Development Workflow Rules

- Treat architecture and planning artifacts as implementation guidance, not as proof that code already exists.
- Before implementing any story, confirm whether the required app scaffold, configs, and directories actually exist in the workspace.
- Build the project in vertical slices, but only introduce schema, seed, and infrastructure when the active slice actually needs them.
- Keep guest-first local continuity as the MVP default; do not overbuild auth or remote persistence into MVP flows.
- Preserve PT-BR content and labels across UI, catalog, diets, and onboarding flows.
- Keep feed/discovery and onboarding-name flows behind current product-scope confirmation when requirements are ambiguous.
- Add analytics and motion in ways that do not become hidden dependencies for core list, catalog, budget, and diet flows.
- Do not expand browser-support expectations beyond the documented MVP target unless requirements are updated.
- If implementation artifacts and planning artifacts conflict, flag the mismatch instead of silently following the older document.

### Critical Don't-Miss Rules

- Do not block list creation or list updates when an item has no price.
- Do not include items without price in the estimated total unless the pricing rule is explicitly changed.
- Do not create separate planning modes for catalog, feed, diets, and manual items; all paths must converge into the same active list.
- Do not duplicate server-state into local client stores as a default architecture pattern.
- Do not let UI components access Prisma or raw persistence concerns directly.
- Do not expose database `snake_case` contracts directly in public API responses.
- Do not rely on color alone for status such as success, warning, missing price, or partial total.
- Do not implement heavy animation tails for repeated add, bulk add, or large active lists.
- Do not assume feed/suggestion surfaces are mandatory MVP behavior unless the current PRD confirms that scope.
- Do not assume onboarding-by-name is a formal MVP requirement unless the PRD requirement set is updated to include it.
- Do not overbuild account, auth, remote sync, rate limiting, or distributed cache into the MVP baseline.
- Do not silently resolve conflicts between PRD, UX, architecture, and implementation-readiness docs; surface the mismatch explicitly.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow all rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Re-check the workspace when planned architecture and real files differ.
- Update this file when new non-obvious implementation patterns emerge.

**For Humans:**

- Keep this file lean and focused on agent needs.
- Update it when stack decisions, boundaries, or naming conventions change.
- Remove rules that become obvious or outdated.
- Review it periodically as implementation replaces planning artifacts.

Last Updated: 2026-03-09T02:21:48.0328622-03:00
