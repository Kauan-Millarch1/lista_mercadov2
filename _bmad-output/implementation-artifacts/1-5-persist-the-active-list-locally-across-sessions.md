# Story 1.5: Persist the Active List Locally Across Sessions

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want my active shopping list to remain available in the same browser environment,
so that I do not lose my planning progress when I refresh or return later.

## Acceptance Criteria

1. Given the user has items in the active shopping list, when the page is refreshed, then the active shopping list is restored from local browser storage and the user sees the same items and quantities they had before refresh.
2. Given the user closes the application and later reopens it in the same browser environment, when the app loads again, then the previously saved active shopping list is restored automatically and the user can continue planning without recreating the list from scratch.
3. Given the locally saved list is restored, when the app initializes the active shopping workspace, then the list state and estimated total remain consistent with the saved data and restoration does not require user authentication in the MVP.
4. Given the application stores local planning data, when persistence is implemented, then only data necessary for the shopping-list experience is stored locally and the approach avoids unnecessary personal data collection.
5. Given local persistence is active, when storage is empty, unavailable, or cleared, then the app falls back gracefully to an empty active list state and the user still receives a stable and understandable PT-BR experience.

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

- Story 1.5 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Persist the active shopping list locally in the browser, restoring the same shopping context after refresh and revisit without introducing accounts or remote sync.
- Explicitly deferred from this story: server persistence and multi-device sync.

### Source-of-Truth Context for This Story

- Epic source: Story 1.5 in _bmad-output/planning-artifacts/epics.md
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
- src/lib/storage/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 1.5.
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
- Story 1.5 added browser-local persistence for the active shopping list through dedicated storage helpers under src/lib/storage.
- Validation executed with npm.cmd test, npm.cmd run lint, and npm.cmd run build after restore and fallback behavior were added.

### Completion Notes List

- Batch story context generated for Story 1.5.
- The story remains intentionally implementation-ready but concise; the implementing dev agent should still inspect the real codebase before writing code.
- Cross-epic dependencies should be satisfied by previously completed stories rather than reimplemented here.
- The active shopping list now persists only the data required for the MVP list experience: item identity, label, note, quantity, price, and source.
- The app now hydrates local list state on startup, recalculates the estimated total from restored items, and falls back gracefully to an empty list when storage is empty or invalid.
- Automated coverage now verifies local restore behavior in the store and through a full UI rerender flow.

### File List

- src/components/shared/app-shell.tsx
- src/features/shopping-list/hooks/use-shopping-list-workspace.ts
- src/features/shopping-list/store/shopping-list-store.ts
- src/lib/storage/shopping-list.ts
- tests/shopping-list-store.test.ts
- tests/shopping-list-workspace.test.tsx

## Change Log

- 2026-03-09: implemented browser-local active-list persistence, restore hydration, graceful empty fallback, and validation coverage for Story 1.5.

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 1.2 through 1.4, architecture, PRD
- Completion note: Story 1.5 implementation completed and validated; ready for code review.
