import { describe, expect, it } from "vitest";

import { createShoppingListStore, starterSuggestions } from "@/features/shopping-list/store/shopping-list-store";

describe("shopping-list store", () => {
  it("starts empty and merges repeated starter additions into quantity", () => {
    const store = createShoppingListStore();
    const firstSuggestion = starterSuggestions[0];

    expect(store.getState().items).toEqual([]);

    store.getState().addStarterItem(firstSuggestion);
    store.getState().addStarterItem(firstSuggestion);

    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0]).toMatchObject({
      id: firstSuggestion.id,
      name: firstSuggestion.name,
      source: "starter",
      quantity: 2,
    });
    expect(store.getState().estimatedTotalCents).toBe(firstSuggestion.priceCents * 2);
  });

  it("updates quantity, removes an item, and clears the list", () => {
    const store = createShoppingListStore();
    const [firstSuggestion, secondSuggestion] = starterSuggestions;

    store.getState().addStarterItem(firstSuggestion);
    store.getState().addStarterItem(secondSuggestion);
    store.getState().updateItemQuantity(firstSuggestion.id, 4);

    expect(store.getState().items[0]?.quantity).toBe(4);
    expect(store.getState().estimatedTotalCents).toBe(
      firstSuggestion.priceCents * 4 + secondSuggestion.priceCents,
    );

    store.getState().removeItem(secondSuggestion.id);

    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0]?.id).toBe(firstSuggestion.id);
    expect(store.getState().estimatedTotalCents).toBe(firstSuggestion.priceCents * 4);

    store.getState().clearItems();

    expect(store.getState().items).toEqual([]);
    expect(store.getState().estimatedTotalCents).toBe(0);
  });

  it("stores the guest name locally in memory and allows skipping onboarding", () => {
    const store = createShoppingListStore();

    store.getState().setGuestName("Kauan");
    store.getState().completeWelcome();

    expect(store.getState().guestName).toBe("Kauan");
    expect(store.getState().hasCompletedWelcome).toBe(true);
  });

  it("hydrates the persisted list and keeps the total consistent after restore", () => {
    const store = createShoppingListStore();
    const [firstSuggestion, secondSuggestion] = starterSuggestions;

    store.getState().hydratePersistedList({
      items: [
        {
          id: firstSuggestion.id,
          name: firstSuggestion.name,
          note: firstSuggestion.note,
          quantity: 2,
          priceCents: firstSuggestion.priceCents,
          source: "starter",
        },
        {
          id: secondSuggestion.id,
          name: secondSuggestion.name,
          note: secondSuggestion.note,
          quantity: 1,
          priceCents: secondSuggestion.priceCents,
          source: "starter",
        },
      ],
    });

    expect(store.getState().hasHydratedList).toBe(true);
    expect(store.getState().items).toHaveLength(2);
    expect(store.getState().estimatedTotalCents).toBe(
      firstSuggestion.priceCents * 2 + secondSuggestion.priceCents,
    );
  });

  it("adds catalog products into the same active list model and increments quantity on repeated adds", () => {
    const store = createShoppingListStore();

    store.getState().addCatalogItem({
      id: "prod-agua-mineral-15l",
      name: "Agua mineral 1.5L",
      note: "Bebida essencial para consumo diario.",
      priceCents: 349,
    });
    store.getState().addCatalogItem({
      id: "prod-agua-mineral-15l",
      name: "Agua mineral 1.5L",
      note: "Bebida essencial para consumo diario.",
      priceCents: 349,
    });

    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0]).toMatchObject({
      id: "prod-agua-mineral-15l",
      name: "Agua mineral 1.5L",
      source: "catalog",
      quantity: 2,
    });
    expect(store.getState().estimatedTotalCents).toBe(698);
  });

  it("adds manual items into the shared list with optional price support", () => {
    const store = createShoppingListStore();

    store.getState().addManualItem({
      name: "Tempero caseiro",
      note: "Item manual criado no fluxo principal.",
      priceCents: 1290,
    });
    store.getState().addManualItem({
      name: "Tempero caseiro",
      note: "Item manual criado no fluxo principal.",
      priceCents: 1290,
    });

    expect(store.getState().items).toHaveLength(1);
    expect(store.getState().items[0]).toMatchObject({
      id: "manual-tempero-caseiro",
      name: "Tempero caseiro",
      source: "manual",
      quantity: 2,
      priceCents: 1290,
    });
    expect(store.getState().estimatedTotalCents).toBe(2580);
  });
});
