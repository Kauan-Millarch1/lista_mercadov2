import { useShoppingListStore } from "@/features/shopping-list/store/shopping-list-store";

export function useShoppingListWorkspace() {
  const items = useShoppingListStore((state) => state.items);
  const guestName = useShoppingListStore((state) => state.guestName);
  const estimatedTotalCents = useShoppingListStore(
    (state) => state.estimatedTotalCents,
  );
  const hasCompletedWelcome = useShoppingListStore(
    (state) => state.hasCompletedWelcome,
  );
  const hasHydratedProfile = useShoppingListStore(
    (state) => state.hasHydratedProfile,
  );
  const hasHydratedList = useShoppingListStore((state) => state.hasHydratedList);
  const isMobileListOpen = useShoppingListStore(
    (state) => state.isMobileListOpen,
  );
  const addStarterItem = useShoppingListStore((state) => state.addStarterItem);
  const addCatalogItem = useShoppingListStore((state) => state.addCatalogItem);
  const addCatalogItems = useShoppingListStore((state) => state.addCatalogItems);
  const addManualItem = useShoppingListStore((state) => state.addManualItem);
  const updateItemQuantity = useShoppingListStore(
    (state) => state.updateItemQuantity,
  );
  const removeItem = useShoppingListStore((state) => state.removeItem);
  const clearItems = useShoppingListStore((state) => state.clearItems);
  const setGuestName = useShoppingListStore((state) => state.setGuestName);
  const completeWelcome = useShoppingListStore((state) => state.completeWelcome);
  const skipWelcome = useShoppingListStore((state) => state.skipWelcome);
  const setMobileListOpen = useShoppingListStore(
    (state) => state.setMobileListOpen,
  );
  const hydrateGuestProfile = useShoppingListStore(
    (state) => state.hydrateGuestProfile,
  );
  const hydratePersistedList = useShoppingListStore(
    (state) => state.hydratePersistedList,
  );

  return {
    items,
    guestName,
    estimatedTotalCents,
    hasCompletedWelcome,
    hasHydratedProfile,
    hasHydratedList,
    isMobileListOpen,
    addStarterItem,
    addCatalogItem,
    addCatalogItems,
    addManualItem,
    updateItemQuantity,
    removeItem,
    clearItems,
    setGuestName,
    completeWelcome,
    skipWelcome,
    setMobileListOpen,
    hydrateGuestProfile,
    hydratePersistedList,
  };
}
