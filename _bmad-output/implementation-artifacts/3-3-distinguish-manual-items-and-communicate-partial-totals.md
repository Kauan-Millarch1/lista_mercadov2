# Story 3.3: Distinguish Manual Items and Communicate Partial Totals

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to understand which items are manual and when my total is incomplete,
so that I can trust the shopping plan even when some prices are missing.

## Acceptance Criteria

1. Given the active shopping list contains a mix of catalog and manual items, when the user reviews the list, then manual items can be visually distinguished when needed for clarity and the distinction does not make the list harder to scan.
2. Given the active shopping list contains one or more items without price data, when the estimated total is displayed, then those items are excluded from the calculated total and the interface clearly communicates that the total is partial.
3. Given the user reviews an unpriced manual item, when the item is shown in the active list, then the interface indicates that no price estimate is available and the message is understandable in PT-BR without relying only on color.
4. Given the user removes, updates, or replaces unpriced items during planning, when the list state changes, then the partial-total communication updates consistently with the current list contents and the user is not shown stale or misleading budget information.
5. Given the list includes manual items and partial-total behavior, when the experience is used on desktop or mobile, then the distinction and messaging remain readable and accessible in both layouts and this story works independently without requiring future Epic 3 stories.

## Tasks / Subtasks

- [x] Implement the manual-item flow behavior required by this story. (AC: 1, 2)
  - [x] Implement the primary behavior described in the acceptance criteria using the architecture boundaries that already exist for this epic.
  - [x] Keep the state and data flow aligned with the current stack instead of introducing speculative infrastructure.
  - [x] Reuse the shared active shopping-list model whenever this story adds a new entry point or browsing surface.
- [x] Preserve stable list behavior, PT-BR messaging, and accessibility around manual items. (AC: 3, 4, 5)
  - [x] Ensure all visible copy and user feedback remain in PT-BR.
  - [x] Validate desktop and mobile behavior against the responsive expectations already defined for the product.
  - [x] Preserve visible focus states, semantic labels, and non-color-only communication where the story introduces interaction feedback.
- [x] Add or extend automated validation for this story. (AC: all)
  - [x] Cover the main happy path introduced here.
  - [x] Cover at least one edge or regression-prone path implied by the acceptance criteria.
  - [x] Continue to pass npm.cmd test, npm.cmd run lint, and npm.cmd run build.

## Dev Notes

### Developer Context Summary

- Story 3.3 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Teach the active-list workspace to distinguish manual items and communicate partial totals whenever unpriced items are present, without relying on color-only feedback.
- Explicitly deferred from this story: broader UX refinement across all manual flows.

### Source-of-Truth Context for This Story

- Epic source: Story 3.3 in _bmad-output/planning-artifacts/epics.md
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
- src/features/manual-items/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 3.3.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Updated the active-list panel to identify manual items explicitly and communicate partial totals whenever at least one item has no price.
- Kept the total calculation stable by continuing to exclude zero-price items while making that exclusion visible in PT-BR copy.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Manual items now show a dedicated label and unpriced manual entries explicitly communicate that no price estimate is available.
- The workspace switches from total estimado to total parcial whenever one or more items are still missing price information.
- Partial-total messaging updates automatically as the list changes, avoiding stale budget signals.

### File List

- src/features/shopping-list/components/active-shopping-list-panel.tsx
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/3-3-distinguish-manual-items-and-communicate-partial-totals.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 3.1 and 3.2, Epic 1 budget behavior, UX
- Completion note: manual-item distinction and partial-total communication are implemented and validated for Story 3.3.

## Change Log

- 2026-03-09: Added manual-item differentiation and partial-total messaging for unpriced items in the active-list workspace.
