# Story 3.2: Support Optional Pricing for Manual Items

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to optionally provide a price for a manual item,
so that I can improve the accuracy of my estimated total when I know the cost.

## Acceptance Criteria

1. Given the user is adding a manual item, when the manual item form is displayed, then the item name is required and the price field is optional and the form makes this distinction clear in PT-BR.
2. Given the user provides a valid optional price for a manual item, when the item is added to the active shopping list, then the manual item is stored with that price information and the estimated total can include it according to the list-calculation rules.
3. Given the user leaves the optional price empty, when the manual item is added, then the item is still accepted into the active shopping list and the planning flow continues without blocking or unnecessary warnings.
4. Given the user enters an invalid price value, when they attempt to submit the manual item, then the form prevents invalid submission and the interface shows a clear, local validation message in PT-BR.
5. Given optional pricing support is implemented, when future stories add clearer partial-total communication, then the manual item flow already supports both priced and unpriced custom items and this story works independently without requiring future Epic 3 stories.

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

- Story 3.2 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Extend the manual-item flow with optional price capture and validation while preserving the ability to add unpriced custom items without blocking the planning flow.
- Explicitly deferred from this story: partial-total explanation polish.

### Source-of-Truth Context for This Story

- Epic source: Story 3.2 in _bmad-output/planning-artifacts/epics.md
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 3.2.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Extended the manual-item form with an optional BRL price field, local validation, and non-blocking submission when the field is empty.
- Preserved the shared shopping-list model so priced and unpriced manual items continue to use the same quantity and total rules.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Manual items now accept an optional price in reais, while keeping the item name mandatory and the flow fully local.
- Invalid price input is blocked with a PT-BR validation message, but empty price input still adds the item without warnings.
- Priced manual items feed the estimated total immediately, while unpriced manual items preserve the current total.

### File List

- src/components/shared/app-shell.tsx
- src/features/manual-items/components/manual-item-form.tsx
- tests/shopping-list-store.test.ts
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/3-2-support-optional-pricing-for-manual-items.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Story 3.1, Epic 1 total rules, UX
- Completion note: optional manual pricing is implemented and validated for Story 3.2.

## Change Log

- 2026-03-09: Added optional BRL price capture and validation for manual items without blocking the zero-price path.
