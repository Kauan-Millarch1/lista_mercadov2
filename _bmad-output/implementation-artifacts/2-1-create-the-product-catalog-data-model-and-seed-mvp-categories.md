# Story 2.1: Create the Product Catalog Data Model and Seed MVP Categories

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want the app to provide a structured supermarket catalog with defined market areas,
so that I can browse relevant products instead of building my list from memory.

## Acceptance Criteria

1. Given the application needs a catalog foundation, when the product domain is introduced, then the app defines a catalog data structure for products and categories that supports grocery browsing in the MVP and the structure is compatible with product name, short description, average price, and category association.
2. Given the MVP catalog requires supermarket-relevant organization, when the initial category set is prepared, then it includes the planned market areas such as `bebidas`, `hortifruti`, `carnes e peixes`, `laticinios e frios`, `padaria`, `mercearia`, `congelados`, `limpeza`, `higiene pessoal`, `utilidades domesticas`, and `itens de cozinha` and the category content is prepared in PT-BR.
3. Given products may need flexible organization, when the catalog model is implemented, then it supports associating each product with one primary category for MVP browsing and the structure remains simple enough for MVP implementation while allowing future expansion if multi-category support becomes necessary.
4. Given the application renders catalog-backed content, when a developer integrates later catalog stories, then they have a stable source of seeded categories and sample products for browsing flows and this story functions independently without requiring future Epic 2 stories to compile or run

**Implementation Note:**

- The initial seed for `categories` and `products` should be created as part of Story 2.1, based on the planning artifact `produtos-mvp.md`.
- The initial seed for `diets` and `diet_products` should be completed in Story 4.1, reusing the same product source of truth..

## Tasks / Subtasks

- [x] Implement the catalog-side foundation needed for this story scope. (AC: 1, 2)
  - [x] Implement the primary behavior described in the acceptance criteria using the architecture boundaries that already exist for this epic.
  - [x] Keep the state and data flow aligned with the current stack instead of introducing speculative infrastructure.
  - [x] Reuse the shared active shopping-list model whenever this story adds a new entry point or browsing surface.
- [x] Integrate the new catalog behavior into the existing planning workspace without regressing Epic 1. (AC: 3, 4, 5)
  - [x] Ensure all visible copy and user feedback remain in PT-BR.
  - [x] Validate desktop and mobile behavior against the responsive expectations already defined for the product.
  - [x] Preserve visible focus states, semantic labels, and non-color-only communication where the story introduces interaction feedback.
- [x] Add or extend automated validation for this story. (AC: all)
  - [x] Cover the main happy path introduced here.
  - [x] Cover at least one edge or regression-prone path implied by the acceptance criteria.
  - [x] Continue to pass npm.cmd test, npm.cmd run lint, and npm.cmd run build.

## Dev Notes

### Developer Context Summary

- Story 2.1 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Introduce the product catalog data foundation, including MVP supermarket categories and seeded PT-BR product content, aligned with the architecture for future route handlers and server-state usage.
- Explicitly deferred from this story: full browsing UI and active add-to-list wiring.

### Source-of-Truth Context for This Story

- Epic source: Story 2.1 in _bmad-output/planning-artifacts/epics.md
- Product constraints: _bmad-output/planning-artifacts/prd.md
- Architecture constraints: _bmad-output/planning-artifacts/architecture.md
- UX direction: _bmad-output/planning-artifacts/ux-design-specification.md
- Guardrails and implementation rules: _bmad-output/project-context.md
- Prior implementation artifact references: _bmad-output/implementation-artifacts/1-1-initialize-the-web-foundation-and-design-system.md and _bmad-output/implementation-artifacts/1-2-create-the-active-shopping-list-workspace.md

### Technical Requirements

- Keep all visible interface labels and messages in PT-BR.
- Respect the existing Epic 1 active-list model instead of creating a parallel planning flow.
- Follow the architecture boundary for this feature area and avoid speculative infrastructure not required by the acceptance criteria.
- Preserve Chrome-targeted responsive behavior, visible focus states, and accessible semantics.
- Use the project's established validation baseline: npm.cmd test, npm.cmd run lint, and npm.cmd run build.

### Architecture Compliance

- Keep src/app focused on routing and top-level composition.
- Keep src/components/ui restricted to shadcn/ui primitives.
- Implement story-specific behavior inside feature or entity slices appropriate to the epic scope.
- Reuse the shared shopping-list state boundary whenever this story needs to insert or reflect list changes.
- Do not add remote services, auth, or unrelated persistence unless the acceptance criteria explicitly require it.

### File Structure Requirements

- Expected implementation areas for this story:
- src/entities/product/
- src/features/catalog/
- src/app/api/
- tests/
- Preserve kebab-case file names for new files.
- Prefer extending existing shell and feature boundaries before introducing new cross-cutting abstractions.

### Testing Requirements

- Add automated coverage for the primary flow introduced by this story.
- Include assertions for PT-BR messaging and user-visible feedback where practical.
- Verify responsive and accessibility-sensitive interactions when the story changes layout or introduces new controls.
- Do not claim behavior from later stories unless it is actually implemented and validated here.

### Project Structure Notes

- Align implementation with the current workspace and only create the slices that this story actually needs.
- Avoid broad architecture expansion in a single story; keep changes local to the epic scope.
- Preserve compatibility with the existing Story 1.1 foundation and Story 1.2 workspace contracts.

### References

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 2.1.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story generated in batch mode after the user requested create-story for all remaining backlog items.
- Acceptance criteria were sourced directly from _bmad-output/planning-artifacts/epics.md.
- This document was created to move the story from backlog to ready-for-dev in sprint tracking.
- Story 2.1 implemented a local catalog data source, feature-level selectors, and read-only API boundaries for categories and products.
- Validation executed with npm.cmd test, npm.cmd run lint, and npm.cmd run build after the catalog seed and route envelopes were added.

### Completion Notes List

- Batch story context generated for Story 2.1.
- The story remains intentionally implementation-ready but concise; the implementing dev agent should still inspect the real codebase before writing code.
- Cross-epic dependencies should be satisfied by previously completed stories rather than reimplemented here.
- Added typed catalog entities for categories and products, preserving one primary category per product and PT-BR content aligned with the planning artifacts.
- Seeded all MVP market areas and a broad sample of catalog products from the planning artifact so later stories can render real category and product flows.
- Added `GET /api/categories` and `GET /api/products` with wrapped `{ data: ... }` responses for later catalog integration.

### File List

- src/app/api/categories/route.ts
- src/app/api/products/route.ts
- src/entities/product/catalog.ts
- src/features/catalog/lib/catalog-data.ts
- src/features/catalog/lib/get-categories.ts
- src/features/catalog/lib/get-products.ts
- tests/catalog-api.test.ts
- tests/catalog-data.test.ts

## Change Log

- 2026-03-09: implemented the typed product-catalog data model, MVP category and product seed, and read-only catalog API routes for Story 2.1.

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: architecture, PRD, UX
- Completion note: Story 2.1 implementation completed and validated; ready for code review.
