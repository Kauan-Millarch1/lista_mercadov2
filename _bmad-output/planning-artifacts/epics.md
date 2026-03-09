---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\prd.md
  - C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\architecture.md
  - C:\Users\Kauan\Downloads\Projetos\Projeto Lista de mercado\_bmad-output\planning-artifacts\ux-design-specification.md
---

# Projeto Lista de mercado - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Projeto Lista de mercado, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can browse a catalog of grocery products inside the application.
FR2: Users can view products grouped by market area.
FR3: Users can navigate between different market areas to discover products.
FR4: Users can view core product information before adding an item to the list.
FR5: Users can identify the average estimated price of a product from the catalog.
FR6: Users can browse a catalog that covers essential supermarket areas for the MVP.
FR7: Users can create and maintain an active shopping list during a session.
FR8: Users can add a catalog product to the active shopping list.
FR9: Users can add the same product to the active shopping list more than once through quantity or repeated addition.
FR10: Users can remove an item from the active shopping list.
FR11: Users can adjust item quantity in the active shopping list.
FR12: Users can view all selected items in a single active shopping list.
FR13: Users can clear or update the active shopping list as their planning changes.
FR14: Users can add a custom item to the active shopping list when the product is not available in the catalog.
FR15: Users can keep manually added items in the active list even when no price estimate exists.
FR16: Users can distinguish between catalog-backed items and manually added items if needed for list clarity.
FR17: Users can view an average estimated price for supported catalog products.
FR18: Users can view an estimated total cost for the active shopping list.
FR19: The system can recalculate the estimated total when items are added, removed, or updated.
FR20: The system can exclude items without price data from the estimated total while still keeping them in the list.
FR21: Users can understand when a listed item does not have an available price estimate.
FR22: Users can access a dedicated diet section inside the application.
FR23: Users can browse multiple diet categories in the diet section.
FR24: Users can view suggested products associated with a specific diet category.
FR25: Users can add an individual suggested diet product to the active shopping list.
FR26: Users can add a predefined diet list to the active shopping list in a bulk action.
FR27: Users can use diet content in PT-BR as part of the main product experience.
FR28: The system can organize products into supermarket-relevant areas for browsing.
FR29: The system can support an MVP catalog spanning areas such as bebidas, hortifruti, carnes e peixes, laticinios e frios, padaria, mercearia, congelados, limpeza, higiene pessoal, utilidades domesticas, and itens de cozinha.
FR30: The system can associate each product with one primary organizational category in the MVP, while remaining extensible for future multi-category support if needed.
FR31: Users can continue using the application without creating an account in the MVP.
FR32: The system can keep the active shopping list available locally in the browser during MVP usage.
FR33: Users can return to their local shopping context within the same browser environment during MVP usage.
FR34: Users can use the application with PT-BR as the primary interface language.
FR35: Users can view product, category, and diet content in PT-BR.
FR36: Users can understand product actions and list interactions through clear localized labels.
FR37: Users can use the application in a browser-based web experience.
FR38: Users can complete core catalog, list, budget, and diet flows on desktop browsers.
FR39: Users can complete core catalog, list, budget, and diet flows on mobile browser layouts.
FR40: Users can use the MVP on Google Chrome as the primary supported browser.

### NonFunctional Requirements

NFR1: Browsing products, adding items, and updating quantities must feel immediate in normal usage conditions.
NFR2: The list total must update without noticeable delay after a priced item is added, removed, or changed.
NFR3: The application must remain responsive while handling the MVP catalog and typical shopping list sizes.
NFR4: The active shopping list must be preserved locally in the browser for MVP usage.
NFR5: The locally stored list must remain available after page refresh and when the user returns in the same browser environment.
NFR6: Missing price data for individual items must not block list creation or list updates.
NFR7: The interface must maintain a usable accessibility baseline for public web usage.
NFR8: Text, buttons, prices, categories, and list actions must be readable and understandable in PT-BR.
NFR9: Core user flows must remain usable on both desktop and mobile browser layouts.
NFR10: The interface must maintain clear visual hierarchy and interaction clarity for fast scanning and list management.
NFR11: The MVP must avoid collecting unnecessary personal data.
NFR12: Any locally stored shopping-list data must be limited to what is necessary for the product experience.
NFR13: The application must be served over HTTPS in production.
NFR14: The MVP should target WCAG 2.1 AA with visible focus states, keyboard navigation, and non-color-only status communication.
NFR15: Touch targets should remain at or above 44x44px where touch input is expected.
NFR16: Responsive behavior must preserve the same mental model across mobile, tablet, and desktop breakpoints.
NFR17: Chrome is the required browser target for MVP, with smooth SPA navigation and no layout breakage in core flows.

### Additional Requirements

- Epic 1 Story 1 must initialize the project from the Next.js official starter using TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, and `@/*` import alias.
- The UI foundation should add shadcn/ui immediately after project initialization and use Tailwind-based design tokens.
- The architecture should use Next.js Route Handlers with REST-like JSON contracts, with success responses in `{ data: ... }` and error responses in `{ error: { code, message, fieldErrors? } }`.
- The stack should use Supabase Postgres as the primary database for structured catalog content, Prisma ORM 7 with Prisma Migrate, Zod 4 for validation, Zustand for client-local state, and TanStack Query for server-state.
- The MVP must be guest-first with browser-local list persistence and may collect only an optional display name for lightweight personalization.
- Source code should follow the defined project structure with `app/`, `features/`, `entities/`, `lib/`, `components/ui/`, `components/shared/`, `prisma/`, and `tests/`.
- Product cards should include product name, short supporting description, average price, and direct add action across catalog, feed, and diet surfaces.
- The desktop experience should use a premium dark visual direction with a persistent or fixed active-list side panel and a breathable editorial layout.
- The mobile experience should replace the fixed side panel with an always-accessible sheet or slide-up panel without breaking the unified planning model.
- Repeated product additions should increment quantity automatically instead of creating unnecessary duplicate lines.
- Bulk add flows for full diet lists should support preview and confirmation before execution.
- Manual item creation should allow required name entry, optional price entry, and clear communication when totals are partial due to missing prices.
- The first-use experience may optionally ask for the user's name before entering the main planning flow, but must not require account creation or login.
- The UX should surface discovery/feed suggestions and recent-item suggestions as accelerators for list building, while keeping all entry points connected to the same active list.
- Accessibility implementation should include semantic labels, keyboard support, screen-reader compatibility, visible focus states, and clear feedback for add/update/partial-total states.
- Analytics and observability should be planned with Vercel Analytics and PostHog, without making them blockers for MVP core flows.

### FR Coverage Map

FR1: Epic 2 - browse grocery catalog
FR2: Epic 2 - view products by market area
FR3: Epic 2 - navigate between market areas
FR4: Epic 2 - view core product information
FR5: Epic 2 - identify average estimated price
FR6: Epic 2 - browse MVP essential catalog coverage
FR7: Epic 1 - create and maintain active shopping list
FR8: Epic 1 - add product to active list
FR9: Epic 1 - add repeated product with quantity behavior
FR10: Epic 1 - remove item from list
FR11: Epic 1 - adjust item quantity
FR12: Epic 1 - view all selected items in one list
FR13: Epic 1 - clear or update list
FR14: Epic 3 - add custom item outside catalog
FR15: Epic 3 - keep manual item without price
FR16: Epic 3 - distinguish manual and catalog items
FR17: Epic 2 - show average price for supported products
FR18: Epic 1 - show estimated total for the active list
FR19: Epic 1 - recalculate estimated total on list updates
FR20: Epic 3 - keep unpriced items while excluding them from total
FR21: Epic 3 - communicate missing price estimate
FR22: Epic 4 - access diet section
FR23: Epic 4 - browse diet categories
FR24: Epic 4 - view suggested products by diet
FR25: Epic 4 - add individual diet product to active list
FR26: Epic 4 - bulk add predefined diet list
FR27: Epic 4 - use PT-BR diet content
FR28: Epic 2 - organize products into supermarket areas
FR29: Epic 2 - support MVP market areas
FR30: Epic 2 - associate products with organizational categories
FR31: Epic 1 - use MVP without account
FR32: Epic 1 - keep active list locally in browser
FR33: Epic 1 - return to local shopping context
FR34: Epic 1 - use PT-BR as primary interface language
FR35: Epic 2 - show product and category content in PT-BR
FR35: Epic 4 - show diet content in PT-BR
FR36: Epic 1 - provide clear localized labels for actions
FR37: Epic 1 - deliver browser-based web experience
FR38: Epic 1 - support desktop core flows
FR39: Epic 1 - support mobile core flows
FR40: Epic 1 - support Google Chrome as primary browser

## Epic List

### Epic 1: Foundation and Guided Shopping Workspace
Users can access a polished PT-BR web application, manage a locally persistent active shopping list, and receive immediate budget feedback across desktop and mobile.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR18, FR19, FR31, FR32, FR33, FR34, FR36, FR37, FR38, FR39, FR40

### Epic 2: Product Catalog and Category Browsing
Users can explore a structured grocery catalog by market area, understand product information and average prices, and add products into the active shopping workflow.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR17, FR28, FR29, FR30, FR35

### Epic 3: Manual Item Completion and Budget Clarity
Users can complete planning even when the catalog is incomplete by adding manual items, preserving list continuity, and understanding partial-total behavior.
**FRs covered:** FR14, FR15, FR16, FR20, FR21

### Epic 4: Diet-Guided Planning and Smart Discovery
Users can accelerate shopping planning through diet sections, curated suggestions, and bulk-add flows that feed directly into the same active list.
**FRs covered:** FR22, FR23, FR24, FR25, FR26, FR27, FR35

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: Foundation and Guided Shopping Workspace

Users can access a polished PT-BR web application, manage a locally persistent active shopping list, and receive immediate budget feedback across desktop and mobile.

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story 1.1: Initialize the Web Foundation and Design System

As a grocery planner,
I want to open a fast, PT-BR-ready shopping planning app with a polished interface foundation,
So that I can start using the product in a stable and coherent environment.

**Acceptance Criteria:**

**Given** the project repository is empty or uninitialized
**When** the application foundation is created
**Then** it uses the official `Next.js` starter with TypeScript, Tailwind CSS, ESLint, App Router, `src/` directory, and `@/*` alias
**And** the base project structure follows the architecture conventions for `app/`, `features/`, `entities/`, `lib/`, `components/ui/`, and `components/shared/`

**Given** the base application has been initialized
**When** the UI foundation is configured
**Then** `shadcn/ui` is installed and usable for core interface primitives
**And** the project includes initial design tokens and theme foundations for the premium dark interface direction

**Given** a user opens the application in Google Chrome
**When** the initial app shell loads
**Then** the app renders without layout breakage on desktop and mobile viewport sizes
**And** the default interface language and navigation labels are prepared for PT-BR

**Given** a developer starts implementation after setup
**When** they add new routes and shared UI
**Then** they have a consistent scaffold, linting baseline, and folder structure that supports the remaining stories in this epic
**And** the foundation does not require future Epic 1 stories to compile or run

### Story 1.2: Create the Active Shopping List Workspace

As a grocery planner,
I want to see and use a dedicated active shopping list area inside the app,
So that I can centralize the items I am planning to buy in one clear workspace.

**Acceptance Criteria:**

**Given** the application shell is available
**When** the user opens the main planning experience
**Then** the interface displays a dedicated active shopping list workspace connected to the main browsing flow
**And** the list area is visually persistent on desktop and always accessible on mobile

**Given** the product supports lightweight personalization without accounts
**When** the user enters the app for the first time
**Then** the experience may ask only for the user's name before showing the main planning flow
**And** skipping or completing this step never requires account creation or login

**Given** the user has not added any items yet
**When** the active list workspace is shown
**Then** it presents an empty state in PT-BR that clearly explains the next useful action
**And** the empty state directs the user toward starting the shopping plan

**Given** the user adds an item from any supported entry point in the current epic scope
**When** the item is sent to the active list
**Then** the workspace displays the selected item in a single consolidated list
**And** the item appears without requiring a page reload

**Given** the user is using the application on desktop
**When** the main experience is rendered
**Then** the active list remains visible as a fixed or persistent companion panel
**And** the browsing area and list area remain usable together without layout conflict

**Given** the user is using the application on mobile
**When** they need to access the active list
**Then** the list is available through an always-accessible sheet, drawer, or equivalent mobile pattern
**And** the mobile interaction preserves the same planning mental model as desktop

**Given** the active list workspace is implemented
**When** future stories add item editing, totals, and persistence
**Then** the workspace already provides the structural container and state boundary needed for those enhancements
**And** it works independently without depending on future Epic 1 stories to render correctly

### Story 1.3: Add List Item Management and Quantity Updates

As a grocery planner,
I want to add, remove, and update quantities of items in my active shopping list,
So that I can keep the list accurate while planning my shopping.

**Acceptance Criteria:**

**Given** the active shopping list workspace is available
**When** the user adds a supported item to the list
**Then** the item is inserted into the active shopping list immediately
**And** the interface confirms the addition without interrupting the flow

**Given** an item is already present in the active shopping list
**When** the user adds the same item again
**Then** the system increases the existing item quantity instead of creating an unnecessary duplicate line
**And** the updated quantity is shown immediately in the list

**Given** the active shopping list contains one or more items
**When** the user changes the quantity of a listed item
**Then** the new quantity is applied immediately
**And** the list remains clear and stable after the update

**Given** the active shopping list contains one or more items
**When** the user removes an item from the list
**Then** the item is removed without a page reload
**And** the list updates immediately to reflect the change

**Given** the user wants to reset or revise the current plan
**When** they clear the list or remove multiple items through the provided controls
**Then** the active shopping list reflects the updated state correctly
**And** the resulting empty or reduced state remains understandable in PT-BR

**Given** the item-management interactions are implemented
**When** a user performs add, remove, or quantity actions on desktop or mobile
**Then** the controls remain accessible, readable, and usable in both layouts
**And** the story works independently without requiring future Epic 1 stories to function

### Story 1.4: Implement Budget Calculation and Real-Time Feedback

As a grocery planner,
I want to see the estimated total update as I manage my list,
So that I can understand my expected spending while planning.

**Acceptance Criteria:**

**Given** the active shopping list contains priced items
**When** the user adds, removes, or updates the quantity of an item
**Then** the estimated total is recalculated immediately
**And** the updated total is shown without requiring a page reload

**Given** the active shopping list workspace is visible
**When** the user reviews the current plan
**Then** the estimated total is displayed in a clear and prominent summary area
**And** the value is easy to understand in the PT-BR interface

**Given** the user performs multiple list updates in sequence
**When** each update is completed
**Then** the budget feedback remains fast and consistent
**And** the interface does not show stale or conflicting total values

**Given** the estimated total is part of the main planning flow
**When** the app is used on desktop or mobile
**Then** the budget summary remains accessible in both layouts
**And** its placement supports continuous spending awareness without obstructing list management

**Given** the budget summary is implemented
**When** future stories add persistence and expanded flows
**Then** the total-calculation behavior already works correctly for the current active-list state
**And** the story functions independently without requiring future Epic 1 stories

### Story 1.5: Persist the Active List Locally Across Sessions

As a grocery planner,
I want my active shopping list to remain available in the same browser environment,
So that I do not lose my planning progress when I refresh or return later.

**Acceptance Criteria:**

**Given** the user has items in the active shopping list
**When** the page is refreshed
**Then** the active shopping list is restored from local browser storage
**And** the user sees the same items and quantities they had before refresh

**Given** the user closes the application and later reopens it in the same browser environment
**When** the app loads again
**Then** the previously saved active shopping list is restored automatically
**And** the user can continue planning without recreating the list from scratch

**Given** the locally saved list is restored
**When** the app initializes the active shopping workspace
**Then** the list state and estimated total remain consistent with the saved data
**And** restoration does not require user authentication in the MVP

**Given** the application stores local planning data
**When** persistence is implemented
**Then** only data necessary for the shopping-list experience is stored locally
**And** the approach avoids unnecessary personal data collection

**Given** local persistence is active
**When** storage is empty, unavailable, or cleared
**Then** the app falls back gracefully to an empty active list state
**And** the user still receives a stable and understandable PT-BR experience

### Story 1.6: Finalize PT-BR Labels and Responsive Core Flows

As a grocery planner,
I want the core shopping-list experience to be clear in PT-BR and usable on desktop and mobile,
So that I can plan purchases comfortably in my preferred language and device context.

**Acceptance Criteria:**

**Given** the user opens the MVP in its core planning flow
**When** they view navigation, list labels, actions, and feedback states
**Then** all primary interface text is presented in PT-BR
**And** the wording is clear and appropriate for grocery-planning actions

**Given** the user accesses the app on a desktop browser
**When** they use the core active-list flow
**Then** the layout preserves a stable browsing area and visible list management area
**And** the main actions remain easy to scan and operate in Google Chrome

**Given** the user accesses the app on a mobile browser layout
**When** they use the core active-list flow
**Then** the layout adapts without breaking the planning experience
**And** the active list, controls, and budget feedback remain accessible

**Given** the user navigates the core flow with keyboard or assistive support needs
**When** they interact with list actions and summary areas
**Then** focus states, labels, and status feedback remain visible and understandable
**And** critical feedback does not rely only on color

**Given** the Epic 1 core flow is complete
**When** the user uses the application without an account
**Then** they can complete the main list-management and budget-awareness journey in a responsive PT-BR web experience
**And** the implementation is ready to support later catalog and diet epics without restructuring the foundation

## Epic 2: Product Catalog and Category Browsing

Users can explore a structured grocery catalog by market area, understand product information and average prices, and add products into the active shopping workflow.

### Story 2.1: Create the Product Catalog Data Model and Seed MVP Categories

As a grocery planner,
I want the app to provide a structured supermarket catalog with defined market areas,
So that I can browse relevant products instead of building my list from memory.

**Acceptance Criteria:**

**Given** the application needs a catalog foundation
**When** the product domain is introduced
**Then** the app defines a catalog data structure for products and categories that supports grocery browsing in the MVP
**And** the structure is compatible with product name, short description, average price, and category association

**Given** the MVP catalog requires supermarket-relevant organization
**When** the initial category set is prepared
**Then** it includes the planned market areas such as `bebidas`, `hortifruti`, `carnes e peixes`, `laticinios e frios`, `padaria`, `mercearia`, `congelados`, `limpeza`, `higiene pessoal`, `utilidades domesticas`, and `itens de cozinha`
**And** the category content is prepared in PT-BR

**Given** products may need flexible organization
**When** the catalog model is implemented
**Then** it supports associating each product with one primary category for MVP browsing
**And** the structure remains simple enough for MVP implementation while allowing future expansion if multi-category support becomes necessary

**Given** the application renders catalog-backed content
**When** a developer integrates later catalog stories
**Then** they have a stable source of seeded categories and sample products for browsing flows
**And** this story functions independently without requiring future Epic 2 stories to compile or run

**Implementation Note:**

- The initial seed for `categories` and `products` should be created as part of Story 2.1, based on the planning artifact `produtos-mvp.md`.
- The initial seed for `diets` and `diet_products` should be completed in Story 4.1, reusing the same product source of truth.

### Story 2.2: Build Category Browsing and Navigation

As a grocery planner,
I want to navigate products by market area,
So that I can find relevant grocery items quickly.

**Acceptance Criteria:**

**Given** the MVP categories are available
**When** the user opens the catalog browsing experience
**Then** they can see the available market areas in a clear navigation pattern
**And** the category labels are presented in PT-BR

**Given** the user selects a market area
**When** the category view updates
**Then** the interface shows the products associated with that area
**And** the transition feels immediate and understandable

**Given** the user moves between different market areas
**When** they change the active category
**Then** the interface clearly indicates which category is selected
**And** the browsing state remains stable without unnecessary reload behavior

**Given** the category navigation is rendered on desktop
**When** the user scans and switches areas
**Then** the layout supports fast browsing and clear hierarchy
**And** the navigation works alongside the active shopping list workspace without layout conflict

**Given** the category navigation is rendered on mobile
**When** the user switches areas
**Then** the interaction remains simple and touch-friendly
**And** the category selection pattern preserves the same browsing mental model as desktop

**Given** category browsing is implemented
**When** future stories add richer product presentation and add-to-list behavior
**Then** the browsing structure already supports those flows cleanly
**And** this story works independently without requiring future Epic 2 stories

### Story 2.3: Render Product Cards with PT-BR Content and Average Prices

As a grocery planner,
I want to see clear product cards with useful information,
So that I can decide what to add to my list with confidence.

**Acceptance Criteria:**

**Given** a category contains catalog products
**When** the user views the catalog grid or list
**Then** each product is presented in a card or equivalent browsing unit
**And** the card includes at least the product name, short supporting description, and average estimated price

**Given** the product catalog is part of the PT-BR experience
**When** product cards are rendered
**Then** product names, descriptions, and visible labels are displayed in PT-BR
**And** the information is easy to scan in the premium dark interface

**Given** a product has average price data
**When** its card is shown
**Then** the estimated price is visible near the decision point
**And** the formatting makes the value understandable as part of the shopping-planning flow

**Given** the user browses multiple products in sequence
**When** the catalog view is displayed
**Then** the cards maintain consistent hierarchy, spacing, and action placement
**And** the interface supports quick visual comparison across products

**Given** the product-card pattern is used on desktop or mobile
**When** the catalog is rendered on different viewport sizes
**Then** the cards remain readable and usable without layout breakage
**And** the primary action area remains accessible

### Story 2.4: Connect Catalog Add-to-List Actions to the Active Shopping Flow

As a grocery planner,
I want to add products directly from the catalog into my active list,
So that I can build my shopping plan without extra steps.

**Acceptance Criteria:**

**Given** the user is browsing product cards
**When** they use the add-to-list action on a catalog product
**Then** the product is added directly to the active shopping list
**And** the interaction provides immediate feedback without leaving the catalog flow

**Given** the same catalog product is added more than once
**When** the user triggers the add action again
**Then** the active list quantity is incremented according to the existing list rules
**And** the catalog experience remains uninterrupted

**Given** the active shopping list is visible or accessible
**When** a catalog product is added
**Then** the list updates immediately with the selected item
**And** the shopping total reflects the current list state according to Epic 1 behavior

**Given** the user is browsing on desktop or mobile
**When** they add products from the catalog
**Then** the add action remains obvious and usable in both layouts
**And** the user can continue browsing additional products without friction

**Given** catalog add-to-list behavior is implemented
**When** later epics add diet flows and manual item fallback
**Then** the catalog entry point already feeds the same active shopping list model
**And** this story works independently without requiring future Epic 2 stories

### Story 2.5: Refine Responsive Catalog Scanning and Category Usability

As a grocery planner,
I want the catalog and category flow to remain clear across devices,
So that I can browse products comfortably on desktop or mobile.

**Acceptance Criteria:**

**Given** the user accesses the catalog on a desktop browser
**When** they browse categories and products
**Then** the layout supports efficient scanning with stable category navigation and readable product cards
**And** the active-list workspace and catalog area remain visually coordinated

**Given** the user accesses the catalog on a mobile browser
**When** they browse categories and products
**Then** the layout adapts to smaller screens without breaking product discovery
**And** category switching, card reading, and add actions remain touch-friendly

**Given** the catalog contains multiple products and categories
**When** the user moves through the browsing flow
**Then** the interface preserves clear hierarchy and avoids visual clutter
**And** product prices and actions stay easy to locate

**Given** accessibility expectations apply to the catalog flow
**When** a user navigates with keyboard or assistive support needs
**Then** category controls, product cards, and add actions expose clear labels and visible focus states
**And** core browsing feedback does not rely only on color

**Given** the Epic 2 catalog flow is complete
**When** the user explores the product catalog in PT-BR
**Then** they can browse structured supermarket areas, understand product information, and add products into the existing shopping workflow
**And** the implementation is ready to support later manual-item and diet epics without restructuring the catalog foundation

## Epic 3: Manual Item Completion and Budget Clarity

Users can complete planning even when the catalog is incomplete by adding manual items, preserving list continuity, and understanding partial-total behavior.

### Story 3.1: Add Manual Item Entry to the Shopping Flow

As a grocery planner,
I want to add an item manually when I cannot find it in the catalog,
So that I can finish my shopping plan without being blocked by missing products.

**Acceptance Criteria:**

**Given** the user cannot find a needed product in the current planning flow
**When** they choose the manual item option
**Then** the application provides a clear PT-BR flow for creating a custom list item
**And** the flow is connected to the same active shopping list used by catalog items

**Given** the user opens the manual item flow
**When** they enter a valid item name and confirm the action
**Then** the custom item is added to the active shopping list immediately
**And** the item appears without requiring a page reload

**Given** the manual item flow is available
**When** the user has not yet provided the required item name
**Then** the interface prevents invalid submission
**And** it shows a clear and local validation message in PT-BR

**Given** a manual item has been added
**When** the user views the active shopping list
**Then** the custom item is included in the same list structure as other items
**And** the planning flow continues without forcing the user back into catalog browsing

**Given** manual item entry is implemented
**When** future stories add optional pricing and partial-total communication
**Then** this story already provides the base manual-item path needed for those enhancements
**And** it works independently without requiring future Epic 3 stories to function

### Story 3.2: Support Optional Pricing for Manual Items

As a grocery planner,
I want to optionally provide a price for a manual item,
So that I can improve the accuracy of my estimated total when I know the cost.

**Acceptance Criteria:**

**Given** the user is adding a manual item
**When** the manual item form is displayed
**Then** the item name is required and the price field is optional
**And** the form makes this distinction clear in PT-BR

**Given** the user provides a valid optional price for a manual item
**When** the item is added to the active shopping list
**Then** the manual item is stored with that price information
**And** the estimated total can include it according to the list-calculation rules

**Given** the user leaves the optional price empty
**When** the manual item is added
**Then** the item is still accepted into the active shopping list
**And** the planning flow continues without blocking or unnecessary warnings

**Given** the user enters an invalid price value
**When** they attempt to submit the manual item
**Then** the form prevents invalid submission
**And** the interface shows a clear, local validation message in PT-BR

**Given** optional pricing support is implemented
**When** future stories add clearer partial-total communication
**Then** the manual item flow already supports both priced and unpriced custom items
**And** this story works independently without requiring future Epic 3 stories

### Story 3.3: Distinguish Manual Items and Communicate Partial Totals

As a grocery planner,
I want to understand which items are manual and when my total is incomplete,
So that I can trust the shopping plan even when some prices are missing.

**Acceptance Criteria:**

**Given** the active shopping list contains a mix of catalog and manual items
**When** the user reviews the list
**Then** manual items can be visually distinguished when needed for clarity
**And** the distinction does not make the list harder to scan

**Given** the active shopping list contains one or more items without price data
**When** the estimated total is displayed
**Then** those items are excluded from the calculated total
**And** the interface clearly communicates that the total is partial

**Given** the user reviews an unpriced manual item
**When** the item is shown in the active list
**Then** the interface indicates that no price estimate is available
**And** the message is understandable in PT-BR without relying only on color

**Given** the user removes, updates, or replaces unpriced items during planning
**When** the list state changes
**Then** the partial-total communication updates consistently with the current list contents
**And** the user is not shown stale or misleading budget information

**Given** the list includes manual items and partial-total behavior
**When** the experience is used on desktop or mobile
**Then** the distinction and messaging remain readable and accessible in both layouts
**And** this story works independently without requiring future Epic 3 stories

### Story 3.4: Refine Manual Entry UX Across Desktop and Mobile

As a grocery planner,
I want the manual-item flow to feel simple and dependable on any device,
So that I can recover quickly when the catalog does not contain what I need.

**Acceptance Criteria:**

**Given** the user needs to add a manual item on desktop
**When** they open the manual-item flow
**Then** the form appears in a clear and low-friction pattern
**And** it fits naturally into the shopping workflow without disrupting the main layout

**Given** the user needs to add a manual item on mobile
**When** they open the manual-item flow
**Then** the form remains touch-friendly and readable
**And** the interaction preserves the same mental model as the desktop experience

**Given** the user navigates the manual-item flow with keyboard or assistive support needs
**When** they move through fields, actions, and validation states
**Then** labels, focus states, and feedback remain visible and understandable
**And** the form supports accessible completion of the task

**Given** the user completes or cancels the manual-item flow
**When** they return to the shopping experience
**Then** they remain in a stable planning context
**And** the active shopping list reflects the correct resulting state

**Given** the Epic 3 manual fallback flow is complete
**When** the user cannot find a product in the catalog
**Then** they can still add it manually, optionally provide a price, and understand any partial-total impact
**And** the implementation is ready to support the later diet-guided flows without restructuring the list model

## Epic 4: Diet-Guided Planning and Smart Discovery

Users can accelerate shopping planning through diet sections, curated suggestions, and bulk-add flows that feed directly into the same active list.

### Story 4.1: Create Diet Categories and Suggested Product Collections

As a grocery planner with diet-oriented goals,
I want the app to offer predefined diet categories with relevant suggested items,
So that I can start a diet-aligned shopping plan more quickly.

**Acceptance Criteria:**

**Given** the product includes diet-guided planning in the MVP
**When** the diet domain is introduced
**Then** the application defines diet categories and their associated suggested products in a structured format
**And** the content is prepared in PT-BR

**Given** the MVP diet experience needs clear starting points
**When** the initial diet set is created
**Then** it includes predefined categories such as `emagrecimento`, `hipertrofia`, `low carb`, `vegetariana`, and `vegana`
**And** each category includes a usable suggested product collection for shopping planning

**Given** diet content will be rendered in later stories
**When** the seed content is prepared
**Then** each diet category can surface items that connect naturally to the active shopping list flow
**And** the structure remains simple enough for MVP implementation

**Given** the diet data foundation is implemented
**When** future Epic 4 stories build browsing and add behaviors
**Then** they have stable PT-BR diet categories and suggestion data available
**And** this story works independently without requiring future Epic 4 stories

### Story 4.2: Build the Diet Browsing Experience

As a grocery planner with diet-oriented goals,
I want to browse available diet categories and their suggested products,
So that I can discover relevant shopping options without researching everything manually.

**Acceptance Criteria:**

**Given** the predefined diet categories are available
**When** the user opens the diet section
**Then** they can see the available diet categories in a clear PT-BR browsing experience
**And** the diet area feels connected to the main shopping workflow

**Given** the user selects a diet category
**When** the diet view updates
**Then** the interface shows the suggested products associated with that diet
**And** the transition is immediate and easy to understand

**Given** the diet section is rendered on desktop
**When** the user browses diet categories and suggestions
**Then** the layout supports clear scanning and quick understanding
**And** it works alongside the active shopping list without layout conflict

**Given** the diet section is rendered on mobile
**When** the user browses diet categories and suggestions
**Then** the interaction remains touch-friendly and readable
**And** it preserves the same mental model as the desktop flow

**Given** the diet browsing experience is implemented
**When** later stories add individual and bulk add behaviors
**Then** the diet structure already supports those actions cleanly
**And** this story works independently without requiring future Epic 4 stories

### Story 4.3: Add Individual Diet Products to the Active List

As a grocery planner with diet-oriented goals,
I want to add suggested diet products individually to my active list,
So that I can build a diet-aligned plan with control over each item.

**Acceptance Criteria:**

**Given** the user is viewing suggested products for a diet category
**When** they use the add action on a suggested item
**Then** the product is added directly to the active shopping list
**And** the interaction provides immediate feedback without leaving the diet flow

**Given** the same suggested diet product is added more than once
**When** the user triggers the add action again
**Then** the active list quantity follows the existing repeated-add behavior
**And** the diet browsing experience remains uninterrupted

**Given** the active shopping list is visible or accessible
**When** an individual diet product is added
**Then** the list updates immediately with the selected item
**And** the current total reflects the updated list state according to prior epic behavior

**Given** the user is using desktop or mobile
**When** they add an individual diet product
**Then** the add action remains obvious and usable in both layouts
**And** the user can continue exploring diet suggestions without friction

**Given** individual add behavior is implemented
**When** the full diet-list import story is added later
**Then** the diet section already feeds the same active shopping list model
**And** this story works independently without requiring future Epic 4 stories

### Story 4.4: Preview and Bulk Add a Full Diet List

As a grocery planner with diet-oriented goals,
I want to preview and add a full predefined diet list in one action,
So that I can accelerate shopping setup while keeping confidence in what will be added.

**Acceptance Criteria:**

**Given** a diet category has a predefined suggested list
**When** the user chooses the bulk-add action
**Then** the application presents a preview of the items that will be added
**And** the preview is shown in PT-BR with a clear confirmation step

**Given** the preview is displayed
**When** the user confirms the bulk-add action
**Then** the full predefined diet list is added to the active shopping list
**And** the list updates immediately without requiring individual item additions

**Given** the user decides not to continue
**When** they cancel or close the preview
**Then** no unintended items are added to the active shopping list
**And** the user returns to a stable diet browsing context

**Given** the predefined diet list contains items already present in the active shopping list
**When** the bulk-add action is confirmed
**Then** the resulting list follows the existing quantity/merge behavior
**And** the total reflects the updated state consistently

**Given** the preview and bulk-add flow is used on desktop or mobile
**When** the user reviews and confirms the action
**Then** the interaction remains readable, accessible, and low-friction in both layouts
**And** this story works independently without requiring future Epic 4 stories

### Story 4.5: Integrate Smart Suggestion Blocks into the Planning Experience

As a grocery planner,
I want curated suggestion blocks to appear as helpful accelerators in the planning experience,
So that I can discover useful products and diet shortcuts without leaving the main workflow.

**Acceptance Criteria:**

**Given** the application includes smart planning assistance in the MVP UX direction
**When** the user opens the main planning experience
**Then** the interface can surface curated suggestion blocks such as diet shortcuts or recommendation sections
**And** these blocks feel connected to the same active shopping workflow rather than like a separate module

**Given** a suggestion block is displayed
**When** the user interacts with its item or shortcut actions
**Then** the interaction leads into the existing catalog, diet, or active-list flows
**And** the experience remains coherent and low-friction

**Given** the suggestion blocks are rendered in the premium interface
**When** the user scans the planning screen
**Then** the blocks enrich discovery without overwhelming the primary shopping-list experience
**And** they preserve clear hierarchy and visual clarity

**Given** the suggestion blocks appear on desktop or mobile
**When** the layout adapts across breakpoints
**Then** the blocks remain usable and readable
**And** they do not break the accessibility or responsiveness of the core planning flow

**Given** the Epic 4 diet-guided flow is complete
**When** the user wants faster diet-oriented or suggestion-driven planning
**Then** they can browse diets, add individual suggested products, preview and import full diet lists, and use suggestion blocks inside the same shopping experience
**And** the product delivers its guided-planning differentiator without restructuring the active list model
