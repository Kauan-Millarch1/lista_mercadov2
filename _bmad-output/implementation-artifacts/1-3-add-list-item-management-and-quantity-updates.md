# Story 1.3: Add List Item Management and Quantity Updates

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to add, remove, and update quantities of items in my active shopping list,
so that I can keep the list accurate while planning my shopping.

## Acceptance Criteria

1. Given the active shopping list workspace is available, when the user adds a supported item to the list, then the item is inserted into the active shopping list immediately and the interface confirms the addition without interrupting the flow.
2. Given an item is already present in the active shopping list, when the user adds the same item again, then the system increases the existing item quantity instead of creating an unnecessary duplicate line and the updated quantity is shown immediately in the list.
3. Given the active shopping list contains one or more items, when the user changes the quantity of a listed item, then the new quantity is applied immediately and the list remains clear and stable after the update.
4. Given the active shopping list contains one or more items, when the user removes an item from the list, then the item is removed without a page reload and the list updates immediately to reflect the change.
5. Given the user wants to reset or revise the current plan, when they clear the list or remove multiple items through the provided controls, then the active shopping list reflects the updated state correctly and the resulting empty or reduced state remains understandable in PT-BR.
6. Given the item-management interactions are implemented, when a user performs add, remove, or quantity actions on desktop or mobile, then the controls remain accessible, readable, and usable in both layouts and the story works independently without requiring future Epic 1 stories to function.

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

- Story 1.3 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Extend the active shopping list workspace from Story 1.2 with item-management controls, repeated-add merge rules, quantity updates, and removal or clear flows while preserving immediate feedback and responsive usability.
- Explicitly deferred from this story: budget totals, browser persistence, remote catalog integration.

### Source-of-Truth Context for This Story

- Epic source: Story 1.3 in _bmad-output/planning-artifacts/epics.md
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
- src/components/shared/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 1.3.
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
- Story 1.3 implementation extended the existing Story 1.2 shopping-list store and workspace instead of creating a parallel flow.
- Validation executed with npm.cmd test, npm.cmd run lint, and npm.cmd run build after quantity, remove, and clear interactions were added.

### Completion Notes List

- Batch story context generated for Story 1.3.
- The story remains intentionally implementation-ready but concise; the implementing dev agent should still inspect the real codebase before writing code.
- Cross-epic dependencies should be satisfied by previously completed stories rather than reimplemented here.
- Repeated starter additions now increment quantity in the shared shopping-list store instead of creating duplicate lines.
- The active-list panel now supports direct quantity editing, item removal, and a clear-list action in PT-BR on both desktop and mobile.
- Automated coverage now verifies merge behavior, quantity changes, removal, and clear-list flows without reload.

### File List

- src/components/shared/app-shell.tsx
- src/features/shopping-list/components/active-shopping-list-panel.tsx
- src/features/shopping-list/components/mobile-shopping-list-sheet.tsx
- src/features/shopping-list/hooks/use-shopping-list-workspace.ts
- src/features/shopping-list/store/shopping-list-store.ts
- tests/shopping-list-store.test.ts
- tests/shopping-list-workspace.test.tsx

## Change Log

- 2026-03-09: implemented quantity management, repeated-add merge behavior, item removal, clear-list actions, and validation coverage for Story 1.3.

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Story 1.2, architecture, UX
- Completion note: Story 1.3 implementation completed and validated; ready for code review.
