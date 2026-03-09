# Story 3.1: Add Manual Item Entry to the Shopping Flow

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to add an item manually when I cannot find it in the catalog,
so that I can finish my shopping plan without being blocked by missing products.

## Acceptance Criteria

1. Given the user cannot find a needed product in the current planning flow, when they choose the manual item option, then the application provides a clear PT-BR flow for creating a custom list item and the flow is connected to the same active shopping list used by catalog items.
2. Given the user opens the manual item flow, when they enter a valid item name and confirm the action, then the custom item is added to the active shopping list immediately and the item appears without requiring a page reload.
3. Given the manual item flow is available, when the user has not yet provided the required item name, then the interface prevents invalid submission and it shows a clear and local validation message in PT-BR.
4. Given a manual item has been added, when the user views the active shopping list, then the custom item is included in the same list structure as other items and the planning flow continues without forcing the user back into catalog browsing.
5. Given manual item entry is implemented, when future stories add optional pricing and partial-total communication, then this story already provides the base manual-item path needed for those enhancements and it works independently without requiring future Epic 3 stories to function.

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

- Story 3.1 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Add a manual-item entry path that feeds the same active shopping list model as catalog items, with required-name validation and immediate insertion into the current planning workflow.
- Explicitly deferred from this story: optional manual pricing and partial-total messaging.

### Source-of-Truth Context for This Story

- Epic source: Story 3.1 in _bmad-output/planning-artifacts/epics.md
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 3.1.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Added a dedicated manual-item form to the main planning flow with PT-BR validation and immediate insertion into the shared active-list state.
- Extended the shopping-list store to accept manual items while preserving the same quantity merge behavior already used by starter and catalog entries.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Users can now add custom items directly from the main workflow when the catalog does not contain what they need.
- Empty manual submissions are blocked with local PT-BR validation feedback and valid submissions update the active list without reload.
- Manual items currently enter with zero price, establishing the correct base path for the optional pricing stories that follow.

### File List

- src/components/shared/app-shell.tsx
- src/entities/shopping-list/shopping-list-item.ts
- src/features/manual-items/components/manual-item-form.tsx
- src/features/shopping-list/hooks/use-shopping-list-workspace.ts
- src/features/shopping-list/store/shopping-list-store.ts
- tests/shopping-list-store.test.ts
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/3-1-add-manual-item-entry-to-the-shopping-flow.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Epic 1 finished stories, UX, architecture
- Completion note: the manual item entry flow is implemented and validated for Story 3.1.

## Change Log

- 2026-03-09: Added the manual-item entry path, local validation feedback, and shared-list integration for custom items.
