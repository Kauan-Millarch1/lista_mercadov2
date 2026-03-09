# Story 1.1: Initialize the Web Foundation and Design System

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to open a fast, PT-BR-ready shopping planning app with a polished interface foundation,
so that I can start using the product in a stable and coherent environment.

## Acceptance Criteria

1. Given the project repository is empty or uninitialized, when the application foundation is created, then it uses the official `Next.js` starter with TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, and `@/*` alias.
2. Given the base application has been initialized, when the UI foundation is configured, then `shadcn/ui` is installed and usable for core interface primitives.
3. Given a user opens the application in Google Chrome, when the initial app shell loads, then the app renders without layout breakage on desktop and mobile viewport sizes and the default interface language and navigation labels are prepared for PT-BR.
4. Given a developer starts implementation after setup, when they add new routes and shared UI, then they have a consistent scaffold, linting baseline, and folder structure that supports the remaining stories in Epic 1 without requiring future stories to compile or run.

## Tasks / Subtasks

- [x] Initialize the application scaffold with the official Next.js starter settings required by architecture. (AC: 1, 4)
  - [x] Create the app with Next.js using TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, and `@/*` import alias.
  - [x] Ensure the generated baseline includes the files needed for linting, type-safe development, and future route expansion.
  - [x] Confirm the scaffold runs independently without depending on later Epic 1 stories.
- [x] Establish the base source tree expected by the architecture. (AC: 1, 4)
  - [x] Create the initial top-level application structure under `src/` for `app/`, `features/`, `entities/`, `lib/`, `components/ui/`, `components/shared/`, and `providers/`.
  - [x] Add placeholder or starter-level module boundaries only where needed to keep the project compiling cleanly.
  - [x] Preserve the architecture naming and ownership rules so later stories can extend existing folders instead of restructuring them.
- [x] Install and configure the UI foundation. (AC: 2, 3)
  - [x] Initialize `shadcn/ui` against the Tailwind-based project scaffold.
  - [x] Add the initial design-token foundation for the premium dark direction using Tailwind theme variables and app-level global styles.
  - [x] Verify at least one core shadcn primitive is available and usable in the app shell.
- [x] Prepare the initial PT-BR-ready application shell. (AC: 3, 4)
  - [x] Set the base metadata, root layout, and starter navigation copy to PT-BR.
  - [x] Replace generic starter content with a coherent grocery-planning shell that matches the product direction without implying unfinished Epic 1 features are already implemented.
  - [x] Ensure the app shell renders correctly in Google Chrome on desktop and mobile viewport sizes.
- [x] Establish the baseline engineering guardrails for future stories. (AC: 4)
  - [x] Preserve ESLint and TypeScript checks as part of the initial developer baseline.
  - [x] Add any minimal utility or provider scaffolding needed to support the future architecture without prematurely implementing data, auth, or server-state features.
  - [x] Document any intentional deferrals in Dev Notes so future implementation does not mistake omitted infrastructure for accidental gaps.

## Dev Notes

### Developer Context Summary

- This repository is still in a planning-only state. The workspace currently contains BMAD artifacts, planning documents, and implementation metadata, but no application scaffold such as `package.json`, `src/`, or `tsconfig.json`.
- This story is responsible for creating the initial executable web foundation. Do not assume any existing Next.js app structure or previously installed dependencies.
- The foundation must be implementation-ready for future Epic 1 stories, but it must not fake incomplete functionality such as active list management, catalog data flows, budget logic, persistence, diets, or onboarding flows that belong to later stories.
- The resulting baseline should compile and run on its own immediately after setup, with clean separation between primitive UI, shared layout, feature folders, and library infrastructure.

### Source-of-Truth Context for This Story

- Epic source: `Story 1.1` in `_bmad-output/planning-artifacts/epics.md`
- Product constraints: `_bmad-output/planning-artifacts/prd.md`
- Architecture constraints and project structure: `_bmad-output/planning-artifacts/architecture.md`
- UX and visual direction: `_bmad-output/planning-artifacts/ux-design-specification.md`
- Agent implementation guardrails: `_bmad-output/project-context.md`

### Story-Specific Intent

- Initialize the app using the official Next.js starter path documented by architecture, not a custom manual scaffold.
- Add `shadcn/ui` immediately after initialization so subsequent UI work starts from the intended design-system baseline.
- Prepare the premium dark direction through tokens, global styles, and shell structure, but stop short of building full feature surfaces that belong to later stories.
- Ensure the initial app shell is PT-BR-ready, coherent on desktop and mobile, and safe to extend without architectural rework.

### Scope Boundaries

- Do not implement real catalog fetching, Prisma setup, Supabase configuration, Zustand stores, TanStack Query hooks, or route handlers in this story unless minimal placeholders are strictly necessary for compilation.
- Do not overbuild auth, remote persistence, analytics, or motion systems into the first scaffold.
- Do not invent alternate folder conventions that conflict with the architecture document.
- Do not leave the project in a half-generated state that depends on future stories to restore compilability.

### Current Workspace Reality

- Existing top-level directories: `.agents/`, `docs/`, `_bmad/`, `_bmad-output/`
- No prior implementation story exists for Epic 1, so there are no previous-story learnings or code patterns to inherit.
- The git repository has no commits yet, so there is no git-history intelligence available for this story.

### Technical Requirements

- Use the official Next.js starter configuration required by planning artifacts: TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, and `@/*` import alias.
- Keep the scaffold aligned with a Next.js App Router application intended for Vercel deployment.
- Use PT-BR as the default UI language for any visible labels, metadata, navigation text, and placeholder shell copy introduced in this story.
- Establish a Tailwind-driven design-token baseline that can support the premium dark interface direction without requiring a full visual system implementation yet.
- Add `shadcn/ui` as the primitive UI layer and verify the CLI-generated config can be used by later stories.
- Keep all implementation TypeScript-first. Do not introduce JavaScript-only setup where typed alternatives are standard.
- Preserve clean compile boundaries so the starter shell works without Prisma, Supabase, Zustand, TanStack Query, or route-handler business logic already being implemented.
- If provider or utility scaffolding is added, keep it minimal, inert by default, and aligned with the architecture boundaries.
- Ensure the app shell renders cleanly in desktop and mobile viewports in Chrome without relying on later feature modules.
- Keep all visible starter behavior compatible with a guest-first MVP and avoid implying login, account, or remote sync requirements.

### Architecture Compliance

- Create the source tree under `src/` in the architecture-prescribed shape: `app/`, `features/`, `entities/`, `lib/`, `components/ui/`, `components/shared/`, and `providers/`.
- Treat `src/app/` as the routing and composition layer only. Do not place business logic directly in route files or layout files during scaffold creation.
- Reserve `components/ui/` for shadcn/ui primitives only; do not put product-specific layout components there.
- Put reusable application shell pieces in `components/shared/` if needed for the starter shell.
- Keep future domain ownership clear: `features/` for user-facing vertical slices, `entities/` for domain-level types/UI, `lib/` for infrastructure and shared utilities.
- Use `kebab-case` for file names, `PascalCase` for React component/type identifiers, and `camelCase` for variables and functions.
- Preserve the API boundary rule that future application-facing HTTP code belongs under `src/app/api/**`, even if no real route handlers are required in this story.
- Do not introduce direct persistence, database, or external-service coupling into the UI scaffold.
- Keep the starter implementation compatible with the documented state boundaries: Zustand for future client-local state and TanStack Query for future server-state, without prematurely wiring either into unrelated starter code.
- Respect the architecture requirement that later API responses use `{ data: ... }` and `{ error: { code, message, fieldErrors? } }`, but avoid building speculative endpoints in this story.

### Library / Framework Requirements

- Framework baseline: Next.js with App Router, React, and TypeScript, created through the official starter flow defined in architecture.
- Styling baseline: Tailwind CSS from the starter scaffold, used as the source of theme tokens and global styling primitives.
- UI primitive layer: `shadcn/ui` installed immediately after scaffold creation and configured to work with the Tailwind setup.
- Validation and data stack context for future stories: Zod 4, Prisma ORM 7 with Prisma Migrate, and Supabase Postgres are the documented architecture choices, but this story should only prepare a scaffold that can host them later.
- State-management context for future stories: Zustand is reserved for client-local interactive shopping state and TanStack Query is reserved for server-state. Do not substitute alternate state libraries in the scaffold.
- Deployment context: keep the project compatible with Vercel-hosted Next.js conventions.
- Motion context: Framer Motion is documented in project context as the motion layer for future UI behavior, but it is not required unless the starter shell introduces meaningful motion.
- Tooling baseline: preserve ESLint and TypeScript configuration generated by the starter; do not replace them with alternative lint/build tools during this story.
- Package-manager choice may follow the selected Next.js starter flow, but resulting scripts and configuration must remain conventional for a standard Next.js project.

### File Structure Requirements

- The repository root should gain the standard Next.js scaffold files expected from the official starter, including package manifest, TypeScript config, Next config, ESLint config, and Tailwind/postcss-related files as generated by the current starter.
- All source code must live under `src/`.
- Required initial folders under `src/`:
  - `app/` for root layout, page entry, globals, and future route segments
  - `components/ui/` for shadcn/ui primitives
  - `components/shared/` for application-shell and reusable cross-feature presentation
  - `features/` as the future home for domain slices such as shopping-list, catalog, diets, onboarding, and feed
  - `entities/` for domain-level types, schemas, and reusable entity UI
  - `lib/` for infrastructure, utilities, and future storage/db/api helpers
  - `providers/` for app-level provider composition when needed
- It is acceptable for some of these folders to contain only a minimal placeholder or `.gitkeep`-style presence if required to establish structure without fake feature logic.
- The starter shell should include a root `layout` and initial `page` that already fit the long-term App Router structure.
- Global styles should live in the standard App Router location and contain the initial token/theme baseline for the dark premium direction.
- Do not create speculative feature internals, API routes, Prisma schema files, or test suites beyond what is necessary to make the structure explicit and implementation-safe for later stories.

### Testing Requirements

- Verify the generated project installs and runs successfully as a standalone Next.js application after scaffold creation.
- Run the baseline static checks that exist in the scaffold, at minimum linting and TypeScript/build validation if those scripts are available.
- Confirm the initial app shell renders without layout breakage in Google Chrome desktop and in a mobile-sized viewport.
- Confirm PT-BR labels introduced by the starter shell display correctly and do not fall back to generic English starter copy.
- Validate that the project structure compiles without requiring unfinished feature modules from later stories.
- If a shadcn/ui primitive is introduced to prove installation, verify it renders and styles correctly within the shell.
- Do not claim dedicated unit, integration, or e2e coverage exists unless this story actually adds the corresponding runner and config files.
- If no formal automated tests are added in this story, record manual verification expectations in Dev Notes rather than pretending test coverage exists.

### Project Context Reference

- Follow `_bmad-output/project-context.md` as the agent guardrail summary for stack, naming, API boundaries, testing expectations, and anti-pattern prevention.
- Most relevant project-context rules for this story:
  - the repo currently has no app scaffold, so confirm actual files created rather than assuming setup already exists
  - use Next.js App Router structure by default
  - keep `components/ui/` limited to primitives and organize product code by domain
  - keep PT-BR as the default UI language
  - do not overbuild auth, remote persistence, analytics, or distributed architecture into MVP baseline work
  - treat architecture/planning docs as guidance, but keep the real workspace state as the implementation source of truth

### Story Completion Status

- Story status for handoff: `ready-for-dev`
- Story file purpose: give the implementing dev agent enough context to scaffold the real application foundation without architectural drift
- Key implementation outcome expected from this story:
  - a working Next.js + TypeScript + Tailwind + ESLint + App Router scaffold
  - `shadcn/ui` installed and verified
  - initial premium-dark token baseline and PT-BR-ready shell in place
  - architecture-aligned source tree prepared for subsequent Epic 1 stories
- Explicitly deferred from this story:
  - active shopping list behavior
  - catalog, diet, and manual-item features
  - persistence, route handlers, Prisma, Supabase, Zustand, and TanStack Query implementation details beyond harmless scaffolding
  - analytics, advanced motion, and any non-essential infrastructure
- Validation note: run the create-story validation checklist and then proceed with `dev-story` against this file.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
- Detected conflicts or variances (with rationale)

### References

- Cite all technical details with source paths and sections, e.g. [Source: docs/<file>.md#Section]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `npx.cmd create-next-app@latest web-foundation-temp --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`
- `npx.cmd shadcn@latest init --defaults`
- `npm.cmd test`
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run build` (rerun outside sandbox to confirm the earlier `spawn EPERM` came from execution restrictions, not from application code)
- `code-review` findings addressed for interactive navigation, CTA behavior, provider boundary, package cleanup, and story accuracy
- `chrome.exe --headless=new ... --screenshot=... http://127.0.0.1:3000` for desktop and mobile viewport validation during review

### Completion Notes List

- Initialized the repository with the official Next.js App Router starter and moved the generated scaffold into the project root while preserving BMAD planning artifacts.
- Added the architecture-aligned `src/` structure with minimal placeholders for `features/` and `entities/`, plus a neutral `AppProviders` composition layer for future global providers.
- Installed `shadcn/ui`, generated `components.json`, and verified the shared `Button` primitive is used by the initial app shell.
- Replaced the generic starter page with a PT-BR grocery-planning shell that stays within story scope and does not imply unfinished list, catalog, persistence, auth, or onboarding flows already exist.
- Established a premium dark token baseline in `src/app/globals.css` using local font stacks so the production build does not depend on remote font fetches.
- Added a lightweight smoke test script for scaffold metadata, PT-BR shell copy, and required source-tree boundaries.
- Validation completed with `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run build`.
- The earlier `spawn EPERM` observed during `next build` was reproduced only inside the sandboxed execution environment; the same build completed successfully outside the sandbox, so the implementation baseline remains valid.
- Code review fixes converted the header chips into real anchor navigation, made both primary CTAs perform in-page navigation, and removed the unnecessary client-only provider boundary from the app root.
- The `shadcn` CLI package was removed from runtime dependencies after scaffold generation because it is not required by the shipped application.
- Google Chrome headless validation was executed against the local dev server in desktop and mobile viewport sizes, closing the remaining viewport verification task for this story.
- Intentional deferrals preserved for future stories: active shopping list behavior, catalog flows, budget logic, persistence, Prisma, Supabase, Zustand, TanStack Query, analytics, and advanced motion systems.
- Responsive desktop/mobile layout was implemented with breakpoint-aware Tailwind structure and confirmed through Chrome headless screenshots during review.

### File List

- .gitignore
- components.json
- eslint.config.mjs
- next-env.d.ts
- next.config.ts
- package-lock.json
- package.json
- postcss.config.mjs
- README.md
- tsconfig.json
- public/file.svg
- public/globe.svg
- public/next.svg
- public/vercel.svg
- public/window.svg
- src/app/favicon.ico
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.tsx
- src/components/shared/app-shell.tsx
- src/components/ui/button.tsx
- src/entities/.gitkeep
- src/features/.gitkeep
- src/lib/utils.ts
- src/providers/app-providers.tsx
- tests/foundation-smoke.test.mjs
- web-foundation-temp/.next/types/cache-life.d.ts (deleted)
- web-foundation-temp/.next/types/routes.d.ts (deleted)
- web-foundation-temp/.next/types/validator.ts (deleted)

### Change Log

- 2026-03-09: Created the initial Next.js + Tailwind + TypeScript scaffold, installed shadcn/ui, added the PT-BR shell, and validated the baseline with smoke checks, lint, and production build.
- 2026-03-09: Addressed code review findings by making navigation and CTAs actionable, removing the inert client provider boundary, removing the unused shadcn CLI dependency, correcting story completion claims, and completing Chrome desktop/mobile validation.
