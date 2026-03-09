# Story 1.6: Finalize PT-BR Labels and Responsive Core Flows

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want the core shopping-list experience to be clear in PT-BR and usable on desktop and mobile,
so that I can plan purchases comfortably in my preferred language and device context.

## Acceptance Criteria

1. Given the user opens the MVP in its core planning flow, when they view navigation, list labels, actions, and feedback states, then all primary interface text is presented in PT-BR and the wording is clear and appropriate for grocery-planning actions.
2. Given the user accesses the app on a desktop browser, when they use the core active-list flow, then the layout preserves a stable browsing area and visible list management area and the main actions remain easy to scan and operate in Google Chrome.
3. Given the user accesses the app on a mobile browser layout, when they use the core active-list flow, then the layout adapts without breaking the planning experience and the active list, controls, and budget feedback remain accessible.
4. Given the user navigates the core flow with keyboard or assistive support needs, when they interact with list actions and summary areas, then focus states, labels, and status feedback remain visible and understandable and critical feedback does not rely only on color.
5. Given the Epic 1 core flow is complete, when the user uses the application without an account, then they can complete the main list-management and budget-awareness journey in a responsive PT-BR web experience and the implementation is ready to support later catalog and diet epics without restructuring the foundation.

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

- Story 1.6 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Finalize PT-BR interface labels, responsive behavior, and Chrome-targeted polish across the core Epic 1 flows after list, totals, and persistence are in place.
- Explicitly deferred from this story: catalog, diet, and manual-item flows from later epics.

### Source-of-Truth Context for This Story

- Epic source: Story 1.6 in _bmad-output/planning-artifacts/epics.md
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
- src/app/
- src/components/shared/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 1.6.
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
- Story 1.6 focused on copy polish, focus visibility, and responsive UX consistency on top of the already implemented Epic 1 flows.
- Validation executed with npm.cmd test, npm.cmd run lint, and npm.cmd run build after PT-BR copy and focus-behavior assertions were finalized.

### Completion Notes List

- Batch story context generated for Story 1.6.
- The story remains intentionally implementation-ready but concise; the implementing dev agent should still inspect the real codebase before writing code.
- Cross-epic dependencies should be satisfied by previously completed stories rather than reimplemented here.
- The shell copy now reflects the real shopping workflow in PT-BR instead of the earlier scaffold-oriented wording.
- Core interactive elements now share stronger visible-focus treatment and the tests verify keyboard navigation through the primary planning actions.
- The responsive Epic 1 flow now has coverage for PT-BR labels, focus order, persisted restore, budget feedback, and mobile list access.

### File List

- src/app/globals.css
- src/components/shared/app-shell.tsx
- tests/foundation-smoke.test.ts
- tests/shopping-list-workspace.test.tsx

## Change Log

- 2026-03-09: finalized PT-BR core-flow copy, shared focus styling, and responsive/accessibility validation coverage for Story 1.6.

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 1.1 through 1.5, UX, PRD
- Completion note: Story 1.6 implementation completed and validated; ready for code review.
