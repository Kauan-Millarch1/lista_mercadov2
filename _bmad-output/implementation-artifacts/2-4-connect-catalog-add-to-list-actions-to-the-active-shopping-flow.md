# Story 2.4: Connect Catalog Add-to-List Actions to the Active Shopping Flow

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to add products directly from the catalog into my active list,
so that I can build my shopping plan without extra steps.

## Acceptance Criteria

1. Given the user is browsing product cards, when they use the add-to-list action on a catalog product, then the product is added directly to the active shopping list and the interaction provides immediate feedback without leaving the catalog flow.
2. Given the same catalog product is added more than once, when the user triggers the add action again, then the active list quantity is incremented according to the existing list rules and the catalog experience remains uninterrupted.
3. Given the active shopping list is visible or accessible, when a catalog product is added, then the list updates immediately with the selected item and the shopping total reflects the current list state according to Epic 1 behavior.
4. Given the user is browsing on desktop or mobile, when they add products from the catalog, then the add action remains obvious and usable in both layouts and the user can continue browsing additional products without friction.
5. Given catalog add-to-list behavior is implemented, when later epics add diet flows and manual item fallback, then the catalog entry point already feeds the same active shopping list model and this story works independently without requiring future Epic 2 stories.

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

- Story 2.4 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Connect catalog product actions to the shared active shopping-list model so catalog additions feel immediate and respect the quantity and total rules already established in Epic 1.
- Explicitly deferred from this story: manual-item and diet-specific entry points.

### Source-of-Truth Context for This Story

- Epic source: Story 2.4 in _bmad-output/planning-artifacts/epics.md
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
- src/features/catalog/
- src/features/shopping-list/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 2.4.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Extended the shared shopping-list store with catalog-origin items while preserving the same quantity merge and total-calculation rules used by Epic 1.
- Connected product-card actions directly to the active-list workspace and added inline feedback so the user can continue browsing without context switching.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Catalog products now feed the same active shopping-list model as starter suggestions, including repeat-add quantity increments.
- Product cards provide immediate PT-BR feedback after an add action while keeping the user inside the catalog browsing flow.
- Desktop and mobile catalog interactions continue to update the active-list total and item state in real time.

### File List

- src/components/shared/app-shell.tsx
- src/entities/shopping-list/shopping-list-item.ts
- src/features/catalog/components/catalog-browser.tsx
- src/features/catalog/components/product-card.tsx
- src/features/shopping-list/hooks/use-shopping-list-workspace.ts
- src/features/shopping-list/store/shopping-list-store.ts
- tests/catalog-browser.test.tsx
- tests/shopping-list-store.test.ts
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/2-4-connect-catalog-add-to-list-actions-to-the-active-shopping-flow.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Epic 1 finished stories, Stories 2.1 through 2.3, architecture
- Completion note: catalog add-to-list actions are connected and validated for Story 2.4.

## Change Log

- 2026-03-09: Connected catalog product actions to the active shopping-list model and added integration coverage for repeated adds and total updates.
