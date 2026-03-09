# Story 2.3: Render Product Cards with PT-BR Content and Average Prices

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to see clear product cards with useful information,
so that I can decide what to add to my list with confidence.

## Acceptance Criteria

1. Given a category contains catalog products, when the user views the catalog grid or list, then each product is presented in a card or equivalent browsing unit and the card includes at least the product name, short supporting description, and average estimated price.
2. Given the product catalog is part of the PT-BR experience, when product cards are rendered, then product names, descriptions, and visible labels are displayed in PT-BR and the information is easy to scan in the premium dark interface.
3. Given a product has average price data, when its card is shown, then the estimated price is visible near the decision point and the formatting makes the value understandable as part of the shopping-planning flow.
4. Given the user browses multiple products in sequence, when the catalog view is displayed, then the cards maintain consistent hierarchy, spacing, and action placement and the interface supports quick visual comparison across products.
5. Given the product-card pattern is used on desktop or mobile, when the catalog is rendered on different viewport sizes, then the cards remain readable and usable without layout breakage and the primary action area remains accessible.

## Tasks / Subtasks

- [x] Implement the catalog-side foundation needed for this story scope. (AC: 1, 2)
  - [x] Implement the primary behavior described in the acceptance criteria using the architecture boundaries that already exist for this epic.
  - [x] Keep the state and data flow aligned with the current stack instead of introducing speculative infrastructure.
  - [x] Reuse the shared active shopping-list model whenever this story adds a new entry point or browsing surface.
- [x] Integrate the new catalog behavior into the existing planning workspace without regressing Epic 1. (AC: 3, 4, 5)
  - [x] Ensure all visible copy and user feedback remain in PT-BR.
  - [x] Validate desktop and mobile behavior against the responsive expectations already defined for the product.
  - [x] Preserve visible focus states, semantic labels, and non-color-only communication where the story introduces interaction feedback.
- [x] Add or extend automated validation for this story. (AC: all)
  - [x] Cover the main happy path introduced here.
  - [x] Cover at least one edge or regression-prone path implied by the acceptance criteria.
  - [x] Continue to pass npm.cmd test, npm.cmd run lint, and npm.cmd run build.

## Dev Notes

### Developer Context Summary

- Story 2.3 was generated in batch from the planning artifacts after Story 1.1 was completed and Story 1.2 was prepared for development.
- This story should be implemented incrementally on top of the current Next.js App Router workspace, not as a rewrite of the application shell.
- Story intent: Render catalog products as readable PT-BR cards with product details and average prices, optimized for quick scanning in the existing premium dark interface.
- Explicitly deferred from this story: full list integration and diet reuse.

### Source-of-Truth Context for This Story

- Epic source: Story 2.3 in _bmad-output/planning-artifacts/epics.md
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
- src/features/catalog/
- src/entities/product/
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

- _bmad-output/planning-artifacts/epics.md - story description and acceptance criteria for Story 2.3.
- _bmad-output/planning-artifacts/prd.md - product requirements and MVP scope guardrails.
- _bmad-output/planning-artifacts/architecture.md - stack, boundaries, and target project structure.
- _bmad-output/planning-artifacts/ux-design-specification.md - responsive, accessibility, and PT-BR UX expectations.
- _bmad-output/project-context.md - implementation guardrails and anti-pattern prevention.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Implemented a reusable product-card component with PT-BR copy, estimated average price formatting, and stable action placement for future add-to-list work.
- Reused the catalog browsing shell from Story 2.2 and introduced a shared BRL formatter to keep catalog and active-list pricing consistent.
- Validation passed with npm.cmd test, npm.cmd run lint, and npm.cmd run build on 2026-03-09.

### Completion Notes List

- Product cards now present name, supporting description, unit label, and average estimated price in a consistent dark-surface pattern.
- The catalog grid was upgraded for faster scanning on desktop and mobile, with a dedicated decision block and placeholder CTA area for the next story.
- Automated coverage now asserts PT-BR content, visible prices, and the accessible action area in both desktop and mobile category flows.

### File List

- src/features/catalog/components/catalog-browser.tsx
- src/features/catalog/components/product-card.tsx
- src/features/shopping-list/components/active-shopping-list-panel.tsx
- src/lib/formatters/currency.ts
- tests/catalog-browser.test.tsx
- _bmad-output/implementation-artifacts/2-3-render-product-cards-with-pt-br-content-and-average-prices.md

### Story Completion Status

- Story status for handoff: review
- Source bundle used for context synthesis: Stories 2.1 and 2.2, UX, architecture
- Completion note: product cards with PT-BR content and average prices are implemented and validated for Story 2.3.

## Change Log

- 2026-03-09: Added reusable catalog product cards, shared BRL formatting, and validation for visible average-price decision points.
