# Story 3.4: Refine Manual Entry UX Across Desktop and Mobile

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want the manual-item flow to feel simple and dependable on any device,
so that I can recover quickly when the catalog does not contain what I need.

## Acceptance Criteria

1. Given the user needs to add a manual item on desktop, when they open the manual-item flow, then the form appears in a clear and low-friction pattern and it fits naturally into the shopping workflow without disrupting the main layout.
2. Given the user needs to add a manual item on mobile, when they open the manual-item flow, then the form remains touch-friendly and readable and the interaction preserves the same mental model as the desktop experience.
3. Given the user navigates the manual-item flow with keyboard or assistive support needs, when they move through fields, actions, and validation states, then labels, focus states, and feedback remain visible and understandable and the form supports accessible completion of the task.
4. Given the user completes or cancels the manual-item flow, when they return to the shopping experience, then they remain in a stable planning context and the active shopping list reflects the correct resulting state.
5. Given the Epic 3 manual fallback flow is complete, when the user cannot find a product in the catalog, then they can still add it manually, optionally provide a price, and understand any partial-total impact and the implementation is ready to support the later diet-guided flows without restructuring the list model.

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

- Story 3.4 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Refine the manual-item flow pattern across desktop and mobile so it remains low-friction, accessible, and stable inside the same shopping context.
- Explicitly deferred from this story: diet-driven suggestion shortcuts.

### Source-of-Truth Context for This Story

- Epic source: Story 3.4 in _bmad-output/planning-artifacts/epics.md
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 3.4.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Refined the manual-entry flow into an expandable inline pattern with explicit open/cancel actions, automatic focus placement, and stable return to the surrounding planning context.
- Preserved the same manual-item behavior from Stories 3.1 through 3.3 while reducing visual friction on both desktop and mobile layouts.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- The manual-item flow now opens only when needed, focuses the item-name field immediately, and can be canceled without disturbing the shopping context.
- Desktop and mobile both use the same mental model: open, fill, confirm or cancel, then return to the same planning surface.
- Automated coverage now verifies accessible opening, completion, and cancellation of the manual-entry flow.

### File List

- src/features/manual-items/components/manual-item-form.tsx
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/3-4-refine-manual-entry-ux-across-desktop-and-mobile.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 3.1 through 3.3, UX
- Completion note: manual-entry UX refinements are implemented and validated for Story 3.4.

## Change Log

- 2026-03-09: Refined the manual-entry UX with an expandable inline form, cancellation path, and better focus behavior across desktop and mobile.
