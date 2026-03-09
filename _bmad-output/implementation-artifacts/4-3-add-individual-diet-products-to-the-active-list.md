# Story 4.3: Add Individual Diet Products to the Active List

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner with diet-oriented goals,
I want to add suggested diet products individually to my active list,
so that I can build a diet-aligned plan with control over each item.

## Acceptance Criteria

1. Given the user is viewing suggested products for a diet category, when they use the add action on a suggested item, then the product is added directly to the active shopping list and the interaction provides immediate feedback without leaving the diet flow.
2. Given the same suggested diet product is added more than once, when the user triggers the add action again, then the active list quantity follows the existing repeated-add behavior and the diet browsing experience remains uninterrupted.
3. Given the active shopping list is visible or accessible, when an individual diet product is added, then the list updates immediately with the selected item and the current total reflects the updated list state according to prior epic behavior.
4. Given the user is using desktop or mobile, when they add an individual diet product, then the add action remains obvious and usable in both layouts and the user can continue exploring diet suggestions without friction.
5. Given individual add behavior is implemented, when the full diet-list import story is added later, then the diet section already feeds the same active shopping list model and this story works independently without requiring future Epic 4 stories.

## Tasks / Subtasks

- [x] Implement the diet-guided planning foundation for this story scope. (AC: 1, 2)
  - [x] Implement the primary behavior described in the acceptance criteria using the architecture boundaries that already exist for this epic.
  - [x] Keep the state and data flow aligned with the current stack instead of introducing speculative infrastructure.
  - [x] Reuse the shared active shopping-list model whenever this story adds a new entry point or browsing surface.
- [x] Keep the diet experience connected to the shared active-list mental model across breakpoints. (AC: 3, 4, 5)
  - [x] Ensure all visible copy and user feedback remain in PT-BR.
  - [x] Validate desktop and mobile behavior against the responsive expectations already defined for the product.
  - [x] Preserve visible focus states, semantic labels, and non-color-only communication where the story introduces interaction feedback.
- [x] Add or extend automated validation for this story. (AC: all)
  - [x] Cover the main happy path introduced here.
  - [x] Cover at least one edge or regression-prone path implied by the acceptance criteria.
  - [x] Continue to pass npm.cmd test, npm.cmd run lint, and npm.cmd run build.

## Dev Notes

### Developer Context Summary

- Story 4.3 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Connect individual diet suggestion actions to the same active shopping-list state used by the catalog and manual flows, preserving existing quantity and total behaviors.
- Explicitly deferred from this story: bulk diet import preview.

### Source-of-Truth Context for This Story

- Epic source: Story 4.3 in _bmad-output/planning-artifacts/epics.md
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
- src/features/diets/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 4.3.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Connected individual diet suggestion cards to the same add-to-list behavior already used in the catalog flow, preserving quantity merge and total updates.
- Added immediate PT-BR feedback in the diet cards so users can continue browsing without leaving the diet section.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Suggested diet products can now be added individually into the active list from desktop or mobile without interrupting browsing.
- Repeated add behavior follows the same quantity and total rules already established for the catalog and starter flows.
- The diet section is now structurally ready for later bulk-add behavior.

### File List

- src/components/shared/app-shell.tsx
- src/features/diets/components/diet-browser.tsx
- tests/diet-browser.test.tsx
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/4-3-add-individual-diet-products-to-the-active-list.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 4.1 and 4.2, Epic 1 and 2 add rules
- Completion note: individual diet-product add behavior is implemented and validated for Story 4.3.

## Change Log

- 2026-03-09: Added individual add-to-list actions and immediate feedback to diet suggestion cards.
