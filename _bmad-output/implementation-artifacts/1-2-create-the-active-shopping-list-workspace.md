# Story 1.2: Create the Active Shopping List Workspace

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a grocery planner,
I want to see and use a dedicated active shopping list area inside the app,
so that I can centralize the items I am planning to buy in one clear workspace.

## Acceptance Criteria

1. Given the application shell is available, when the user opens the main planning experience, then the interface displays a dedicated active shopping list workspace connected to the main browsing flow and the list area is visually persistent on desktop and always accessible on mobile.
2. Given the product supports lightweight personalization without accounts, when the user enters the app for the first time, then the experience may ask only for the user's name before showing the main planning flow and skipping or completing this step never requires account creation or login.
3. Given the user has not added any items yet, when the active list workspace is shown, then it presents an empty state in PT-BR that clearly explains the next useful action and the empty state directs the user toward starting the shopping plan.
4. Given the user adds an item from any supported entry point in the current epic scope, when the item is sent to the active list, then the workspace displays the selected item in a single consolidated list and the item appears without requiring a page reload.
5. Given the user is using the application on desktop, when the main experience is rendered, then the active list remains visible as a fixed or persistent companion panel and the browsing area and list area remain usable together without layout conflict.
6. Given the user is using the application on mobile, when they need to access the active list, then the list is available through an always-accessible sheet, drawer, or equivalent mobile pattern and the mobile interaction preserves the same planning mental model as desktop.
7. Given the active list workspace is implemented, when future stories add item editing, totals, and persistence, then the workspace already provides the structural container and state boundary needed for those enhancements and it works independently without depending on future Epic 1 stories to render correctly.

## Tasks / Subtasks

- [x] Establish the shopping-list workspace state boundary and foundational data contracts. (AC: 1, 4, 7)
  - [x] Create the `shopping-list` feature structure under `src/features/` with minimal but real module boundaries for store, hooks, and UI composition.
  - [x] Add a guest-first active-list store using Zustand for session-local shopping-list state, prepared to support future item, budget, and persistence stories without implementing those stories early.
  - [x] Define starter shopping-list item types/interfaces in the correct domain layer so the workspace can render a consolidated list and future stories can extend the model safely.
- [x] Build the desktop active shopping-list workspace shell into the main planning experience. (AC: 1, 3, 5, 7)
  - [x] Replace the Story 1.1 placeholder right rail with a real active-list panel container integrated into the main browsing shell.
  - [x] Add a PT-BR empty state that explains how to start the shopping plan without implying catalog, diet, or manual-entry features already exist.
  - [x] Ensure the desktop layout keeps the browsing area and active-list panel visible together without overlap or layout breakage.
- [x] Add the mobile-accessible active-list pattern and keep parity with the desktop mental model. (AC: 1, 3, 6)
  - [x] Add an always-accessible mobile trigger for the active list using an appropriate shadcn/ui primitive such as `Sheet` or equivalent drawer pattern.
  - [x] Ensure the mobile panel/drawer exposes the same empty-state and list-workspace structure as desktop.
  - [x] Preserve accessibility, touch-target, and focus behavior expectations while switching between main content and the mobile list view.
- [x] Introduce the lightweight first-use personalization entry point without account behavior. (AC: 2)
  - [x] Add a minimal PT-BR first-use step that asks only for the user's name and can be skipped cleanly.
  - [x] Keep the personalization state local-only and inert, without auth, remote sync, or blocking access to the main planning workspace.
  - [x] Ensure the main planning experience still loads correctly whether the user skips or completes the name step.
- [x] Connect the workspace to a real no-reload add-to-list pathway for current-epic scope. (AC: 4, 7)
  - [x] Provide at least one current-scope UI entry point in the planning shell that can add a starter item into the active list store without page reload.
  - [x] Render added items inside a single consolidated active-list view using the new workspace structure.
  - [x] Keep the interaction explicitly scoped as foundation behavior for Epic 1, without prematurely implementing full quantity management, totals, or persistence logic.
- [x] Add baseline validation coverage for the active-list workspace. (AC: 1, 2, 3, 4, 5, 6, 7)
  - [x] Add automated tests for the active-list workspace state boundary, first-use flow branching, and no-reload list rendering behavior.
  - [x] Extend shell-level validation to cover desktop visibility and mobile accessibility affordances for the active-list workspace.
  - [x] Record any intentional deferrals in Dev Notes so future stories do not mistake omitted editing, totals, or persistence behavior for regressions.

## Dev Notes

### Developer Context Summary

- Story 1.1 is complete and delivered the executable Next.js + Tailwind + shadcn/ui foundation, PT-BR-ready shell, and architecture-aligned `src/` layout baseline.
- The current workspace still contains only the Story 1.1 shell. There is no active shopping-list feature code, no list state, no onboarding/name flow, no mobile drawer for the list, and no server or persistence implementation yet.
- This story is the first real product-surface story inside Epic 1. It must establish the active shopping-list workspace as a true product area instead of a static placeholder.
- The story should create the structural list experience and its client-local state boundary, but must stop short of fully implementing later Epic 1 behavior such as quantity management, total calculation, and browser persistence.

### Source-of-Truth Context for This Story

- Epic source: `Story 1.2` in `_bmad-output/planning-artifacts/epics.md`
- Product constraints: `_bmad-output/planning-artifacts/prd.md`
- Architecture constraints and project structure: `_bmad-output/planning-artifacts/architecture.md`
- UX and responsive/accessibility direction: `_bmad-output/planning-artifacts/ux-design-specification.md`
- Agent implementation guardrails: `_bmad-output/project-context.md`
- Prior implementation learnings: `_bmad-output/implementation-artifacts/1-1-initialize-the-web-foundation-and-design-system.md`

### Story-Specific Intent

- Turn the initial marketing-like shell into a real planning workspace with an active-list area that feels like the center of the application.
- Establish the first concrete Zustand-based state boundary for shopping-list behavior, because the architecture explicitly assigns local interactive list state to Zustand.
- Add the lightweight optional name step only as local personalization support, never as authentication, registration, or a blocking gate.
- Ensure the desktop and mobile versions preserve the same planning mental model, with a persistent panel on desktop and an always-accessible drawer/sheet pattern on mobile.
- Create one real current-scope path that adds an item into the active list so the workspace is not a dead shell.

### Scope Boundaries

- Do not implement full quantity editing, remove/clear-list flows, budget totals, or browser persistence in this story; those belong to later Epic 1 stories.
- Do not introduce Prisma, Supabase, route handlers, TanStack Query, or any remote-data coupling for this story.
- Do not overbuild onboarding. The optional name step must remain local-only, minimal, skippable, and non-blocking.
- Do not create disconnected planning modes. Any starter add-to-list interaction must feed the same active list model that later catalog, diet, and manual-item stories will use.
- Do not regress Story 1.1 foundation work such as PT-BR baseline, dark visual direction, accessibility focus styles, or responsive shell behavior.

### Current Workspace Reality

- Existing implemented source files are limited to:
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/globals.css`
  - `src/components/shared/app-shell.tsx`
  - `src/components/ui/button.tsx`
  - `src/lib/utils.ts`
  - `src/providers/app-providers.tsx`
- `src/features/` and `src/entities/` exist only as empty placeholders from Story 1.1 and now need real shopping-list structure.
- Existing automated coverage is a lightweight smoke test in `tests/foundation-smoke.test.mjs`; there is no UI or state-specific test stack beyond what Story 1.1 introduced.
- Git history is minimal. The latest commit title is `feat: initial commit`, so the strongest implementation guidance comes from Story 1.1 output and the planning artifacts rather than commit evolution.

### Previous Story Intelligence

- Story 1.1 established the expected app-shell integration point in `src/components/shared/app-shell.tsx`; this story should extend that shell instead of replacing the application structure wholesale.
- The previous story intentionally kept `AppProviders` inert and local font stacks static; this story can introduce useful client-local providers or state access only when the workspace genuinely needs them.
- Code review on Story 1.1 highlighted the risk of claiming UX behavior without evidence. For this story, any desktop/mobile accessibility or interaction claim should be backed by actual tests or direct validation.
- Story 1.1 also corrected shell affordances so navigation and calls to action are now real interactions. Story 1.2 should preserve that standard and avoid adding non-functional UI chrome.

### Technical Requirements

- Use Zustand as the client-local state solution for the active shopping-list workspace, because the architecture explicitly reserves Zustand for local interactive shopping state.
- Keep all application-facing UI copy in PT-BR, including empty states, first-use name flow labels, list headings, triggers, buttons, and instructional text.
- Keep the active-list data model TypeScript-first and minimal. It should support the current story's consolidated workspace plus safe extension for future quantity, total, and persistence stories.
- The current story must provide one real no-reload add-to-list interaction in the current shell so the workspace can render a non-empty state with actual state updates.
- Any starter list item added in this story should be a local interactive item only. Do not imply catalog-backed pricing, persistence, remote sync, or server validation yet.
- The first-use personalization step may collect only a display name and must store it locally if storage is used. It must never introduce account concepts, login flows, or remote identity assumptions.
- Mobile list access should use an always-accessible drawer, sheet, or equivalent pattern that remains consistent with the desktop list mental model.
- The desktop layout must maintain simultaneous usability of the browsing shell and active-list panel at desktop breakpoints without overlap or broken scrolling behavior.
- Preserve keyboard focus clarity, visible focus states, and non-color-only feedback for active-list and personalization interactions.
- Keep any new code compatible with Story 1.1 validation commands: `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run build`.

### Architecture Compliance

- Extend the application through the architecture-prescribed layers:
  - `src/features/shopping-list/` for state, hooks, and workspace composition
  - `src/entities/` only if shared shopping-list types or entity-level UI genuinely belong there
  - `src/components/shared/` for reusable layout-level pieces that are not shadcn primitives
  - `src/providers/` only if a provider is genuinely needed for app-level composition
- Keep `src/app/` as routing/composition only. Do not place shopping-list business logic directly inside `page.tsx` or `layout.tsx`.
- Keep `components/ui/` limited to shadcn/ui primitives. Any active-list panel, empty state, onboarding gate, or mobile trigger UI must live in `features/` or `components/shared/`, not in the primitive layer.
- Do not introduce `src/app/api/**` route handlers in this story. The active-list workspace is local interactive state only at this phase.
- Do not introduce server-state patterns, TanStack Query hooks, or persistence adapters in advance of the stories that actually need them.
- Keep the state boundary unified so later catalog, diet, and manual-item stories can all add into the same active list rather than creating separate flows.

### Library / Framework Requirements

- Framework baseline remains Next.js App Router with React and TypeScript.
- State-management baseline for this story is Zustand. Use the official modern Zustand React store pattern rather than ad hoc context state or prop drilling. [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture]
- UI primitives should continue using shadcn/ui plus Tailwind CSS. For mobile list access, prefer the official shadcn `Sheet` pattern or an equivalent accessible drawer built on the same primitive ecosystem. [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design System Foundation]
- Continue using the existing `Button` primitive and shared `cn` utility when composition requires them.
- Keep motion optional and minimal. Do not introduce Framer Motion in this story unless needed for a genuinely meaningful interaction and reduced-motion support is respected from the start.
- Do not add new dependencies unless the story cannot be implemented cleanly with the current stack plus the architecture-mandated Zustand usage.

### File Structure Requirements

- Expected new or expanded areas for this story:
  - `src/features/shopping-list/` for store, hooks, and workspace UI
  - `src/components/shared/` for shell-level integration pieces if the active-list panel or onboarding gate is shared
  - `tests/` and/or colocated tests for workspace state and responsive/mobile access validation
- Likely file responsibilities:
  - Active-list workspace container/panel component
  - Empty-state component or empty-state block for the workspace
  - Mobile trigger and sheet/drawer wrapper
  - Zustand store module for active-list state
  - Hook(s) or selectors to consume the workspace state cleanly from UI
  - Optional first-use personalization component or gate
- Preserve `kebab-case` file names for all newly introduced files.
- The main planning experience should continue to render through `src/app/page.tsx` and the existing shell entrypoint, but the shopping-list behavior should be delegated into feature/shared modules.
- If local browser storage is touched for name handling, place helpers under `src/lib/storage/` to remain aligned with the architecture.

### Testing Requirements

- Add automated tests for the active-list state boundary and for the workspace UI behavior introduced by this story.
- Tests should verify:
  - empty-state rendering before any item is added
  - successful no-reload insertion of a starter item into a consolidated list
  - desktop-visible active-list workspace structure
  - mobile-accessible active-list trigger/sheet structure
  - first-use name step can be skipped and does not require account behavior
- Test PT-BR labels and visible user-facing messaging in the core workspace flow.
- Include accessibility-oriented assertions where practical, especially for navigation to the list, sheet trigger labeling, and empty-state clarity.
- Do not claim persistence, quantity editing, or budget totals are covered by this story's tests unless those behaviors are actually implemented here.
- Continue to run the existing baseline commands and add any new test runner/config only if the implementation genuinely requires it.

### Project Structure Notes

- Alignment with unified project structure:
  - `src/app/` remains the composition layer
  - `src/features/shopping-list/` should become the first real feature slice
  - `src/components/shared/` should host shell-level reusable UI only when it is not feature-specific
  - `src/lib/storage/` is the correct place for any local-only name persistence helper if needed
- Detected conflicts or variances:
  - The current workspace is much smaller than the long-term architecture diagram. The developer should create only the shopping-list-related slice needed for this story, not the entire future structure at once.
  - Story 1.1 left `src/features/` and `src/entities/` effectively empty. This story is the first safe place to establish real shopping-list feature patterns.
  - The architecture shows a future `src/features/onboarding/` area. For Story 1.2, only a minimal first-use personalization flow should be introduced, and it should stay lightweight enough that it can later be promoted into a fuller onboarding slice if product scope confirms it.

### Git Intelligence Summary

- Recent git history is minimal (`feat: initial commit`), so there is little pattern intelligence from commits beyond confirming the project is still very early-stage.
- The strongest practical implementation pattern comes from Story 1.1's delivered files:
  - shell integration through `src/components/shared/app-shell.tsx`
  - PT-BR labels and copy as the default visible language
  - shared primitive usage through `src/components/ui/button.tsx`
  - validation baseline through `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run build`
- The dev agent should prefer extending the existing shell and state boundaries incrementally instead of rewriting the Story 1.1 layout from scratch.

### Project Context Reference

- Follow `_bmad-output/project-context.md` as the guardrail summary for naming, boundaries, testing, and anti-pattern prevention.
- Most relevant project-context rules for this story:
  - use Next.js App Router structure by default
  - use Zustand only for client-local interactive shopping state
  - keep `components/ui/` reserved for primitives only
  - preserve PT-BR as the default UI language
  - do not duplicate future server-state into local stores
  - do not introduce auth, remote persistence, or speculative infrastructure into the MVP baseline
  - do not rely only on color for status or list-state communication
  - re-check the real workspace rather than assuming the full architecture already exists

### References

- `_bmad-output/planning-artifacts/epics.md` - Story 1.2 acceptance criteria, Epic 1 scope, and future-story dependency boundaries.
- `_bmad-output/planning-artifacts/architecture.md` - Frontend architecture, Zustand/TanStack Query separation, component boundaries, and target file structure.
- `_bmad-output/planning-artifacts/ux-design-specification.md` - ActiveListPanel intent, mobile sheet/drawer expectations, responsive strategy, accessibility target, and PT-BR UX direction.
- `_bmad-output/project-context.md` - implementation rules for stack usage, state boundaries, naming, testing, and anti-pattern prevention.
- `_bmad-output/implementation-artifacts/1-1-initialize-the-web-foundation-and-design-system.md` - actual delivered shell baseline, Story 1.1 learnings, and prior validation approach.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Sprint discovery selected `1-2-create-the-active-shopping-list-workspace` as the first `backlog` story after `1-1` reached `done`.
- Planning artifacts analyzed: `epics.md`, `architecture.md`, `ux-design-specification.md`, `project-context.md`, and prior story `1-1`.
- Git intelligence checked via `git log --oneline -5`, confirming only a minimal initial-history baseline.
- Installed `zustand`, `vitest`, `jsdom`, and Testing Library to support the required local-state implementation and automated React validation.
- Validation executed with `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run build`.

### Completion Notes List

- Ultimate context engine analysis completed for Story 1.2 with emphasis on the first real shopping-list workspace slice.
- Developer guidance explicitly prevents premature implementation of quantity management, totals, persistence, API routes, Prisma, Supabase, and TanStack Query.
- Story is prepared to establish the first real Zustand boundary, desktop persistent panel, mobile list sheet/drawer, and optional local-only first-use name flow.
- Implemented the first real `shopping-list` feature slice with entity contracts, Zustand store actions, a composition hook, and local guest-profile hydration.
- Replaced the placeholder shell rail with a desktop active-list workspace plus a mobile dialog-based drawer that reads from the same shared list state.
- Added a skippable PT-BR first-use name step, starter item shortcuts, and automated tests for store behavior, onboarding branching, and no-reload item rendering.
- Intentionally deferred quantity editing, totals, removal flows, and browser list persistence to the later Epic 1 stories that own those behaviors.

### File List

- package.json
- src/app/globals.css
- src/components/shared/app-shell.tsx
- src/entities/shopping-list/shopping-list-item.ts
- src/features/shopping-list/components/active-shopping-list-panel.tsx
- src/features/shopping-list/components/first-use-name-step.tsx
- src/features/shopping-list/components/mobile-shopping-list-sheet.tsx
- src/features/shopping-list/hooks/use-shopping-list-workspace.ts
- src/features/shopping-list/store/shopping-list-store.ts
- src/lib/storage/guest-profile.ts
- tests/foundation-smoke.test.ts
- tests/setup.ts
- tests/shopping-list-store.test.ts
- tests/shopping-list-workspace.test.tsx
- vitest.config.mjs

## Change Log

- 2026-03-09: implemented the active shopping-list workspace, optional first-use personalization flow, shared local store, mobile drawer access, and Vitest-based validation coverage for Story 1.2.

### Story Completion Status

- Story status for handoff: `review`
- Story file purpose: give the implementing dev agent enough context to build the first real active shopping-list workspace without architectural drift or premature feature expansion.
- Key implementation outcomes expected from this story:
  - a real active-list workspace integrated into the planning shell
  - a local Zustand state boundary for the active list
  - a desktop-visible panel and mobile-accessible sheet/drawer pattern
  - a minimal optional first-use name step with no account behavior
  - at least one real add-to-list interaction that updates the workspace without reload
- Explicitly deferred from this story:
  - quantity management and duplicate-item merge behavior beyond the minimal foundation needed for rendering
  - remove/clear flows
  - budget totals and partial-total logic
  - local list persistence across sessions
  - catalog-backed product data, route handlers, Prisma, Supabase, TanStack Query, analytics, and advanced motion
- Completion note: Story 1.2 implementation completed and validated; ready for code review.
