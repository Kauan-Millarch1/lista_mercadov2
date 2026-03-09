# Story 4.4: Preview and Bulk Add a Full Diet List

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner with diet-oriented goals,
I want to preview and add a full predefined diet list in one action,
so that I can accelerate shopping setup while keeping confidence in what will be added.

## Acceptance Criteria

1. Given a diet category has a predefined suggested list, when the user chooses the bulk-add action, then the application presents a preview of the items that will be added and the preview is shown in PT-BR with a clear confirmation step.
2. Given the preview is displayed, when the user confirms the bulk-add action, then the full predefined diet list is added to the active shopping list and the list updates immediately without requiring individual item additions.
3. Given the user decides not to continue, when they cancel or close the preview, then no unintended items are added to the active shopping list and the user returns to a stable diet browsing context.
4. Given the predefined diet list contains items already present in the active shopping list, when the bulk-add action is confirmed, then the resulting list follows the existing quantity/merge behavior and the total reflects the updated state consistently.
5. Given the preview and bulk-add flow is used on desktop or mobile, when the user reviews and confirms the action, then the interaction remains readable, accessible, and low-friction in both layouts and this story works independently without requiring future Epic 4 stories.

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

- Story 4.4 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Implement the preview-and-confirm bulk-add flow for diet lists so users can import a curated set of items into the same active shopping list with confidence.
- Explicitly deferred from this story: suggestion blocks in the main workspace.

### Source-of-Truth Context for This Story

- Epic source: Story 4.4 in _bmad-output/planning-artifacts/epics.md
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 4.4.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Added a preview-and-confirm flow for full diet collections directly inside the diet browser, with cancel and confirm paths in PT-BR.
- Connected the bulk-add confirmation to the same list-merge rules already used for individual adds, so repeated products keep quantity behavior consistent.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Users can now preview the full suggested diet collection before importing it into the active list.
- Canceling the preview keeps the planning context stable and does not add unintended items.
- Confirming the collection adds all items at once while respecting existing quantity merge behavior.

### File List

- src/components/shared/app-shell.tsx
- src/features/diets/components/diet-browser.tsx
- src/features/shopping-list/hooks/use-shopping-list-workspace.ts
- src/features/shopping-list/store/shopping-list-store.ts
- tests/diet-browser.test.tsx
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/4-4-preview-and-bulk-add-a-full-diet-list.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 4.1 through 4.3, UX
- Completion note: preview and bulk-add behavior for diet collections is implemented and validated for Story 4.4.

## Change Log

- 2026-03-09: Added full diet-list preview, confirmation, cancellation, and bulk import behavior wired to the shared shopping-list model.
