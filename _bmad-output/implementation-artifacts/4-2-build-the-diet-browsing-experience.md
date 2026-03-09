# Story 4.2: Build the Diet Browsing Experience

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner with diet-oriented goals,
I want to browse available diet categories and their suggested products,
so that I can discover relevant shopping options without researching everything manually.

## Acceptance Criteria

1. Given the predefined diet categories are available, when the user opens the diet section, then they can see the available diet categories in a clear PT-BR browsing experience and the diet area feels connected to the main shopping workflow.
2. Given the user selects a diet category, when the diet view updates, then the interface shows the suggested products associated with that diet and the transition is immediate and easy to understand.
3. Given the diet section is rendered on desktop, when the user browses diet categories and suggestions, then the layout supports clear scanning and quick understanding and it works alongside the active shopping list without layout conflict.
4. Given the diet section is rendered on mobile, when the user browses diet categories and suggestions, then the interaction remains touch-friendly and readable and it preserves the same mental model as the desktop flow.
5. Given the diet browsing experience is implemented, when later stories add individual and bulk add behaviors, then the diet structure already supports those actions cleanly and this story works independently without requiring future Epic 4 stories.

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

- Story 4.2 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Build the diet browsing experience on top of the new diet data model, keeping it visually connected to the main shopping workspace and responsive across breakpoints.
- Explicitly deferred from this story: individual and bulk add actions.

### Source-of-Truth Context for This Story

- Epic source: Story 4.2 in _bmad-output/planning-artifacts/epics.md
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 4.2.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Built the first diet browsing surface on top of the new diet data foundation, with desktop rail navigation and mobile select interaction.
- Integrated the diet section into the main app shell without changing the existing shopping-list model or catalog behavior.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Users can now browse PT-BR diet categories and review suggested products in a dedicated section connected to the main workflow.
- The diet area preserves the same desktop/mobile mental model already used in the catalog browsing experience.
- The structure is ready for individual and bulk add actions in the next diet stories.

### File List

- src/components/shared/app-shell.tsx
- src/features/diets/components/diet-browser.tsx
- tests/diet-browser.test.tsx
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/4-2-build-the-diet-browsing-experience.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Story 4.1, UX, architecture
- Completion note: the diet browsing experience is implemented and validated for Story 4.2.

## Change Log

- 2026-03-09: Added the responsive diet browsing experience and integrated it into the main shell navigation.
