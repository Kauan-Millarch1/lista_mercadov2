# Story 1.4: Implement Budget Calculation and Real-Time Feedback

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to see the estimated total update as I manage my list,
so that I can understand my expected spending while planning.

## Acceptance Criteria

1. Given the active shopping list contains priced items, when the user adds, removes, or updates the quantity of an item, then the estimated total is recalculated immediately and the updated total is shown without requiring a page reload.
2. Given the active shopping list workspace is visible, when the user reviews the current plan, then the estimated total is displayed in a clear and prominent summary area and the value is easy to understand in the PT-BR interface.
3. Given the user performs multiple list updates in sequence, when each update is completed, then the budget feedback remains fast and consistent and the interface does not show stale or conflicting total values.
4. Given the estimated total is part of the main planning flow, when the app is used on desktop or mobile, then the budget summary remains accessible in both layouts and its placement supports continuous spending awareness without obstructing list management.
5. Given the budget summary is implemented, when future stories add persistence and expanded flows, then the total-calculation behavior already works correctly for the current active-list state and the story functions independently without requiring future Epic 1 stories.

## Tasks / Subtasks

- [x] Extend the active shopping-list foundation for this story scope. (AC: 1, 2)
  - [x] Implement the primary behavior described in the acceptance criteria using the architecture boundaries that already exist for this epic.
  - [x] Keep the state and data flow aligned with the current stack instead of introducing speculative infrastructure.
  - [x] Reuse the shared active shopping-list model whenever this story adds a new entry point or browsing surface.
- [x] Preserve PT-BR UX, accessibility, and responsive behavior for the updated workspace. (AC: 3, 4, 5, 6)
  - [x] Ensure all visible copy and user feedback remain in PT-BR.
  - [x] Validate desktop and mobile behavior against the responsive expectations already defined for the product.
  - [x] Preserve visible focus states, semantic labels, and non-color-only communication where the story introduces interaction feedback.
- [x] Add or extend automated validation for this story. (AC: all)
  - [x] Cover the main happy path introduced here.
  - [x] Cover at least one edge or regression-prone path implied by the acceptance criteria.
  - [x] Continue to pass npm.cmd test, npm.cmd run lint, and npm.cmd run build.

## Dev Notes

### Developer Context Summary

- Story 1.4 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Add budget-summary calculation and real-time feedback on top of the active-list state, keeping totals synchronized with current priced items and readable on desktop and mobile.
- Explicitly deferred from this story: manual-item missing-price logic and long-term persistence.

### Source-of-Truth Context for This Story

- Epic source: Story 1.4 in _bmad-output/planning-artifacts/epics.md
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 1.4.
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
- Story 1.4 reused the Story 1.3 list-management foundation and extended the shared store with calculated total state instead of introducing a separate budgeting layer.
- Validation executed with npm.cmd test, npm.cmd run lint, and npm.cmd run build after the total-summary UI and calculation rules were added.

### Completion Notes List

- Batch story context generated for Story 1.4.
- The story remains intentionally implementation-ready but concise; the implementing dev agent should still inspect the real codebase before writing code.
- Cross-epic dependencies should be satisfied by previously completed stories rather than reimplemented here.
- Starter items now carry local average-price data in cents so the active list can recalculate the total immediately after add, quantity change, removal, and clear actions.
- The active-list panel now shows a clear PT-BR total summary in desktop and mobile views, with item-level average-price context near the quantity controls.
- Automated coverage now verifies real-time total updates in store logic and in the visible workspace flow.

### File List

- src/components/shared/app-shell.tsx
- src/entities/shopping-list/shopping-list-item.ts
- src/features/shopping-list/components/active-shopping-list-panel.tsx
- src/features/shopping-list/components/mobile-shopping-list-sheet.tsx
- src/features/shopping-list/hooks/use-shopping-list-workspace.ts
- src/features/shopping-list/store/shopping-list-store.ts
- tests/shopping-list-store.test.ts
- tests/shopping-list-workspace.test.tsx

## Change Log

- 2026-03-09: implemented estimated-total calculation, PT-BR budget summary feedback, and validation coverage for Story 1.4.

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 1.2 and 1.3, architecture, UX
- Completion note: Story 1.4 implementation completed and validated; ready for code review.
