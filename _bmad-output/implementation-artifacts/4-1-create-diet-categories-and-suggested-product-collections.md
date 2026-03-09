# Story 4.1: Create Diet Categories and Suggested Product Collections

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner with diet-oriented goals,
I want the app to offer predefined diet categories with relevant suggested items,
so that I can start a diet-aligned shopping plan more quickly.

## Acceptance Criteria

1. Given the product includes diet-guided planning in the MVP, when the diet domain is introduced, then the application defines diet categories and their associated suggested products in a structured format and the content is prepared in PT-BR.
2. Given the MVP diet experience needs clear starting points, when the initial diet set is created, then it includes predefined categories such as `emagrecimento`, `hipertrofia`, `low carb`, `vegetariana`, and `vegana` and each category includes a usable suggested product collection for shopping planning.
3. Given diet content will be rendered in later stories, when the seed content is prepared, then each diet category can surface items that connect naturally to the active shopping list flow and the structure remains simple enough for MVP implementation.
4. Given the diet data foundation is implemented, when future Epic 4 stories build browsing and add behaviors, then they have stable PT-BR diet categories and suggestion data available and this story works independently without requiring future Epic 4 stories.

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

- Story 4.1 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Create the data foundation for diet-guided planning, including PT-BR categories and suggested product collections that can later feed the existing active shopping list.
- Explicitly deferred from this story: diet browsing UI and add flows.

### Source-of-Truth Context for This Story

- Epic source: Story 4.1 in _bmad-output/planning-artifacts/epics.md
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
- src/entities/diet/
- src/features/diets/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 4.1.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Added dedicated diet entities and seed collections for the MVP diet-guided planning domain, all prepared in PT-BR.
- Linked each diet collection back to existing catalog products so future diet browsing and add flows can reuse the same shopping-list mental model.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- The diet foundation now includes `emagrecimento`, `hipertrofia`, `low-carb`, `vegetariana` and `vegana` with usable suggested product collections.
- Suggested diet products reference existing catalog items, keeping the MVP data model simple and aligned with the current active-list flow.
- Automated coverage verifies category ordering, collection completeness and product linkage integrity.

### File List

- src/entities/diet/diet.ts
- src/features/diets/lib/diet-data.ts
- src/features/diets/lib/get-diet-categories.ts
- src/features/diets/lib/get-diet-collections.ts
- tests/diet-data.test.ts
- _bmad-output/implementation-artifacts/4-1-create-diet-categories-and-suggested-product-collections.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: PRD, UX, architecture
- Completion note: diet categories and suggested product collections are implemented and validated for Story 4.1.

## Change Log

- 2026-03-09: Added the initial diet domain entities, PT-BR seed categories and suggested product collections for Epic 4.
