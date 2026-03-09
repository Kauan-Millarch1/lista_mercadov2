---
title: 'Premium Motion System for Shopping Flow'
slug: 'premium-motion-system-shopping-flow'
created: '2026-03-09'
status: 'ready-for-dev'
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
tech_stack:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Framer Motion
files_to_modify:
  - src/lib/motion/tokens.ts
  - src/lib/motion/transitions.ts
  - src/lib/motion/use-reduced-motion-config.ts
  - src/lib/motion/config.ts
  - src/components/catalog/product-card.tsx
  - src/components/diet/diet-collection-card.tsx
  - src/components/list/active-list-panel.tsx
  - src/components/list/price-summary-card.tsx
  - src/components/feedback/quick-add-feedback.tsx
  - src/components/feed/feed-collection-block.tsx
  - src/components/motion/motion-presets.tsx
  - src/components/motion/stagger-group.tsx
  - src/app/(shopping)/page.tsx
code_patterns:
  - Build motion as a reusable interaction layer, not isolated one-off animations
  - Keep premium dark UI aligned with shadcn/ui foundations and custom tokens
  - Prioritize transform and opacity-based animations for performance
  - Respect prefers-reduced-motion for all non-essential transitions
  - Confirmed clean slate: no existing src/components frontend structure was found in workspace
  - Anchor implementation to planning artifacts first, then apply to newly created frontend structure
  - Keep motion presets decoupled from business logic and data-fetching concerns
  - Compose reusable Framer Motion variants instead of duplicating animation definitions inside feature components
test_patterns:
  - Validate animation behavior on core shopping flows
  - Verify smoothness and no blocking on repeated add actions
  - Check keyboard/focus continuity and reduced-motion behavior
  - Create motion behavior tests when component structure exists
  - Validate large-list fallback behavior and repeated panel toggles
---

# Tech-Spec: Premium Motion System for Shopping Flow

**Created:** 2026-03-09

## Overview

### Problem Statement

Projeto Lista de mercado already defines a premium motion language in the UX specification, but there is not yet an implementation-ready technical plan to convert those decisions into frontend behavior. Without a dedicated quick spec, motion risks being inconsistent, too heavy, inaccessible, or implemented ad hoc across product cards, diet flows, list updates, and summary panels.

### Solution

Create a focused technical specification for implementing the premium shopping-flow motion system using Framer Motion, covering product-add confirmations, diet-card application, active-list entry, estimated-total updates, panel and sheet transitions, and the supporting motion token system needed to keep behavior consistent, lightweight, and accessible.

### Scope

**In Scope:**
- Define motion tokens for durations, easing, and stagger timing
- Specify Framer Motion patterns for `ProductCard`, `DietCollectionCard`, `ActiveListPanel`, `PriceSummaryCard`, and related flow surfaces
- Implement animation behavior for product add, diet add, list-item entry, total update, panel open/close, and section reveal
- Define reduced-motion fallbacks and accessibility-safe motion behavior
- Define performance constraints and acceptable implementation patterns
- Provide implementation tasks and acceptance criteria for the core motion system

**Out of Scope:**
- Redesigning the visual identity or layout structure of the product
- Building the full feature set of all shopping components from scratch if they do not yet exist
- Decorative animation unrelated to shopping flow clarity or user confidence
- Non-core motion polish outside the main planning, diet, feed, and list-summary journeys

## Context for Development

### Codebase Patterns

The project planning artifacts define a premium all-black interface built on shadcn/ui, Tailwind CSS, and custom product-level components. The UX specification already establishes a named motion language with reusable behaviors such as `card-add-confirm`, `diet-card-apply`, `list-item-enter`, `price-total-update`, `panel-open`, and `section-reveal`.

The architecture and UX documents imply a modern React/Next.js frontend where motion should be implemented as a reusable interaction layer rather than scattered one-off effects. Performance guidance is explicit: prefer transform- and opacity-based animation, avoid layout-heavy motion, keep feedback immediate, and support `prefers-reduced-motion`.

Deep investigation confirmed a clean-slate frontend state in this workspace for the target feature: no `src` directory, no `components` directory, and no discoverable `package.json`, `next.config.*`, `tsconfig.json`, or other app-root files were found at the project root. This means the quick spec cannot anchor to existing concrete component files and instead must define the first implementation structure the frontend should adopt.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\ux-design-specification.md` | Source of approved motion language, UX behavior, component mapping, and accessibility expectations |
| `C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\architecture.md` | Architecture context and likely frontend implementation constraints |
| `C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\prd.md` | Product scope and critical user journeys that motion must support |
| `C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\ux-design-directions.html` | Visual direction reference for premium behavior and component emphasis |
| `C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\src` | Investigated and confirmed missing |
| `C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\components` | Investigated and confirmed missing |

### Technical Decisions

- Use `Framer Motion` as the standard motion implementation layer
- Keep motion focused on core shopping-flow components and state transitions
- Treat motion as part of UX feedback, not decoration
- Require reduced-motion support from the initial implementation
- Prioritize desktop planning flow while keeping panel and sheet motion adaptable to smaller screens
- Treat the implementation as a first-pass frontend motion foundation rather than a retrofit of existing components
- The generated spec must define proposed file locations because no frontend component tree exists yet

## Implementation Plan

### Tasks

- [ ] Task 1: Establish the frontend motion foundation and shared motion tokens
  - File: `src/lib/motion/tokens.ts`
  - Action: Create shared duration, easing, stagger, and motion-scale tokens aligned to the UX specification (`motion-fast`, `motion-base`, `motion-medium`, `motion-panel`, `motion-stagger`)
  - Notes: Export strongly typed token objects for reuse across Framer Motion variants and UI transitions

- [ ] Task 2: Create reusable transition and reduced-motion utilities
  - File: `src/lib/motion/transitions.ts`
  - Action: Define reusable Framer Motion transition presets for `card-add-confirm`, `diet-card-apply`, `list-item-enter`, `price-total-update`, `panel-open`, and `section-reveal`
  - Notes: Pair with `src/lib/motion/use-reduced-motion-config.ts` to collapse non-essential movement into low-motion variants when `prefers-reduced-motion` is active

- [ ] Task 2.1: Add shared motion configuration and safety controls
  - File: `src/lib/motion/config.ts`
  - Action: Define motion feature flags and guardrails for stagger limits, large-list fallback behavior, and environment-level simplification hooks
  - Notes: Use this to cap stagger length for bulk diet insertions and reduce animation intensity when the UI is under repeated rapid updates

- [ ] Task 3: Create reusable motion wrapper primitives for components
  - File: `src/components/motion/motion-presets.tsx`
  - Action: Implement reusable wrappers or exported variant objects for hover lift, add confirmation, section reveal, and list-entry choreography
  - Notes: Keep these primitives generic enough to be reused by product, diet, feed, and list components without duplicating animation logic or embedding business-state decisions

- [ ] Task 4: Implement product card motion behavior
  - File: `src/components/catalog/product-card.tsx`
  - Action: Apply Framer Motion variants for hover/focus lift, direct add confirmation, and graceful repeated-add behavior
  - Notes: Repeated adds should not replay a large entrance animation; use subtle confirmation plus quantity-oriented feedback instead

- [ ] Task 5: Implement diet card premium apply animation
  - File: `src/components/diet/diet-collection-card.tsx`
  - Action: Add Framer Motion behavior for hover lift, preview/expanded state transition, and premium diet add confirmation
  - Notes: The animation should feel more substantial than single-product add, but remain lightweight and non-blocking; bulk insertion should use capped stagger to avoid long chained reveals

- [ ] Task 6: Implement active list entry and price-summary motion
  - File: `src/components/list/active-list-panel.tsx`
  - Action: Animate list-row insertion, quantity increment emphasis, and synchronized summary updates when items are added
  - Notes: Pair with `src/components/list/price-summary-card.tsx` to animate total changes using stable, readable number/state transitions; when multiple items are inserted quickly, the total must remain visually stable rather than repeatedly jumping

- [ ] Task 7: Implement quick feedback surfaces and feed motion
  - File: `src/components/feedback/quick-add-feedback.tsx`
  - Action: Add lightweight success/error/status feedback for add actions
  - Notes: Also update `src/components/feed/feed-collection-block.tsx` to support section reveal and per-item add confirmation without competing animations

- [ ] Task 8: Wire the motion system into the main shopping entry screen
  - File: `src/app/(shopping)/page.tsx`
  - Action: Compose the motion-enabled cards, feed blocks, diet surfaces, and active list panel in the primary shopping flow
  - Notes: Use the same motion primitives and token layer everywhere; avoid bespoke page-level animation logic when a shared preset already exists

- [ ] Task 9: Add testing coverage and implementation guardrails
  - File: `src/components/motion/stagger-group.tsx`
  - Action: Add test-friendly abstractions and define manual verification hooks for performance-sensitive staggered list and section reveals
  - Notes: Pair with component-level test files and reduced-motion test cases once the component tree exists

### Acceptance Criteria

- [ ] AC 1: Given the shopping UI is rendered, when a user hovers or focuses a product card on desktop, then the card shows a restrained lift/elevation effect without causing layout shift.
- [ ] AC 2: Given a user clicks add on a product card, when the action succeeds, then the card confirms the add immediately and the item appears in the active list with a lightweight entry animation.
- [ ] AC 3: Given the same product is added repeatedly, when the user adds it again, then the quantity updates without replaying a heavy entry animation and the feedback remains clear.
- [ ] AC 4: Given a user applies a diet card or curated diet set, when the action is confirmed, then the diet card plays a premium confirmation animation and the inserted list items appear with subtle staggered entry.
- [ ] AC 5: Given the active list total changes, when items are added or quantities change, then the total updates with a restrained transition that remains legible and stable.
- [ ] AC 6: Given a panel, sheet, or preview surface opens, when it is triggered, then it uses calm directional motion and preserves focus/context continuity.
- [ ] AC 7: Given the interface is rendered with multiple animated sections, when feed blocks or suggestion strips first appear, then their reveal motion remains understated and does not block interaction readiness.
- [ ] AC 8: Given `prefers-reduced-motion` is enabled, when animated interactions occur, then all non-essential movement collapses to simplified fades or direct state changes while preserving confirmation clarity.
- [ ] AC 9: Given the motion system is implemented, when core shopping flows are executed repeatedly, then animations remain smooth and do not introduce visible jank or interaction delay on normal desktop hardware.
- [ ] AC 10: Given keyboard-only navigation or assistive technology use, when motion-enabled components are interacted with, then focus order, status feedback, and state communication remain accessible and do not rely on color alone.
- [ ] AC 11: Given a bulk diet add inserts many items, when the list entry animation runs, then staggered motion is capped to a short bounded sequence and does not create a long animation tail.
- [ ] AC 12: Given the active list already contains many items, when new items are inserted, then the UI falls back to simplified entry behavior rather than replaying heavy per-row choreography across the full list.
- [ ] AC 13: Given a user triggers add actions repeatedly in quick succession, when the system processes those updates, then confirmation feedback remains clear and the total summary does not flicker or visually thrash.
- [ ] AC 14: Given a user repeatedly opens and closes a sheet or panel, when those transitions run multiple times in sequence, then the motion remains smooth and focus handling stays correct.
- [ ] AC 15: Given `prefers-reduced-motion` is enabled, when hover, stagger, and entrance interactions occur, then reduced-motion behavior also suppresses those secondary animation patterns rather than only simplifying major transitions.

## Additional Context

### Dependencies

- Framer Motion added to the frontend stack if not already present
- Next.js / React frontend scaffold created if it is not already present
- Existing or planned React components for product cards, diet cards, active list, and summary surfaces
- Shared token layer for design/motion constants
- Motion config layer for feature flags, fallback thresholds, and reusable safety limits

### Testing Strategy

Unit and component tests should validate that motion-enabled components render the correct state classes/variants and preserve interaction behavior under reduced-motion settings.

Integration tests should cover the full shopping-flow transitions: product add, repeated add, diet add, list row entry, total update, and panel open/close.

Manual validation should confirm:
- no visible jank during repeated quick-add actions
- stable total readability during updates
- smooth but restrained diet card confirmation
- correct reduced-motion fallback behavior
- correct keyboard focus and accessible feedback during animated transitions
- graceful fallback behavior with large active lists
- stable repeated open/close behavior for sheets and panels on common hardware

### Notes

This quick spec is intended to translate the already-approved UX motion direction into implementation-ready engineering guidance. It should stay tightly aligned to the UX specification and avoid inventing new animation language outside that source.

Because the frontend codebase is currently absent from this workspace, the file paths in this spec are proposed implementation targets and should become the default structure for the first frontend build. If a different app structure is created later, the motion architecture should still preserve the same separation between token layer, transition presets, reusable motion wrappers, and feature components.

For bulk interactions, the implementation should prefer bounded, professional motion over literal animation of every inserted element. The goal is clarity and premium feel, not animation volume.

