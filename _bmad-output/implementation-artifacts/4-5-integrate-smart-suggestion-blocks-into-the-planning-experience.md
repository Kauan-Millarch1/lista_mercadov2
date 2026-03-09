# Story 4.5: Integrate Smart Suggestion Blocks into the Planning Experience

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want curated suggestion blocks to appear as helpful accelerators in the planning experience,
so that I can discover useful products and diet shortcuts without leaving the main workflow.

## Acceptance Criteria

1. Given the application includes smart planning assistance in the MVP UX direction, when the user opens the main planning experience, then the interface can surface curated suggestion blocks such as diet shortcuts or recommendation sections and these blocks feel connected to the same active shopping workflow rather than like a separate module.
2. Given a suggestion block is displayed, when the user interacts with its item or shortcut actions, then the interaction leads into the existing catalog, diet, or active-list flows and the experience remains coherent and low-friction.
3. Given the suggestion blocks are rendered in the premium interface, when the user scans the planning screen, then the blocks enrich discovery without overwhelming the primary shopping-list experience and they preserve clear hierarchy and visual clarity.
4. Given the suggestion blocks appear on desktop or mobile, when the layout adapts across breakpoints, then the blocks remain usable and readable and they do not break the accessibility or responsiveness of the core planning flow.
5. Given the Epic 4 diet-guided flow is complete, when the user wants faster diet-oriented or suggestion-driven planning, then they can browse diets, add individual suggested products, preview and import full diet lists, and use suggestion blocks inside the same shopping experience and the product delivers its guided-planning differentiator without restructuring the active list model.

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

- Story 4.5 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Integrate smart suggestion blocks into the planning workspace as accelerators that point into the existing catalog, diet, and active-list flows without creating a disconnected module.
- Explicitly deferred from this story: analytics instrumentation and later recommendation sophistication.

### Source-of-Truth Context for This Story

- Epic source: Story 4.5 in _bmad-output/planning-artifacts/epics.md
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
- src/features/catalog/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 4.5.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Added curated smart suggestion blocks directly into the main planning workspace, pointing users into diet, catalog, and active-list actions without splitting the experience into a separate module.
- Wired shortcut actions to the same existing flow boundaries so discovery blocks remain accelerators rather than parallel logic paths.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- The planning screen now includes smart suggestion blocks that surface diet shortcuts, catalog discovery, and one-click item acceleration.
- Suggestion-block actions lead into the same catalog, diet, and active-list flows already implemented in the product.
- The guided-planning differentiator is now integrated into the main experience without disrupting the list-first workflow.

### File List

- src/components/shared/app-shell.tsx
- src/components/shared/smart-suggestion-blocks.tsx
- tests/shopping-list-workspace.test.tsx
- _bmad-output/implementation-artifacts/4-5-integrate-smart-suggestion-blocks-into-the-planning-experience.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Epic 2 and 4, UX, architecture
- Completion note: smart suggestion blocks are integrated and validated for Story 4.5.

## Change Log

- 2026-03-09: Added curated smart suggestion blocks to the main planning experience and connected them to existing catalog, diet, and active-list flows.
