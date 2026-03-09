import { create, type StateCreator } from "zustand";

import type {
  CatalogShoppingListInput,
  ManualShoppingListInput,
  ShoppingListItem,
  StarterSuggestion,
} from "@/entities/shopping-list/shopping-list-item";
import type { GuestProfile } from "@/lib/storage/guest-profile";
import type { PersistedShoppingList } from "@/lib/storage/shopping-list";

export const starterSuggestions: StarterSuggestion[] = [
  {
    id: "cafe-em-po",
    name: "Cafe em po",
    note: "Bom para abrir a lista com um item de uso frequente.",
    priceCents: 1890,
  },
  {
    id: "arroz-integral",
    name: "Arroz integral",
    note: "Ajuda a validar a lista ativa sem depender do catalogo.",
    priceCents: 2790,
  },
  {
    id: "agua-mineral",
    name: "Agua mineral",
    note: "Serve como item leve para testar o fluxo sem recarregar a pagina.",
    priceCents: 490,
  },
];

export type ShoppingListState = {
  items: ShoppingListItem[];
  estimatedTotalCents: number;
  guestName: string;
  hasCompletedWelcome: boolean;
  isMobileListOpen: boolean;
  hasHydratedProfile: boolean;
  hasHydratedList: boolean;
  addStarterItem: (suggestion: StarterSuggestion) => void;
  addCatalogItem: (product: CatalogShoppingListInput) => void;
  addCatalogItems: (products: CatalogShoppingListInput[]) => void;
  addManualItem: (manualItem: ManualShoppingListInput) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearItems: () => void;
  setGuestName: (guestName: string) => void;
  completeWelcome: () => void;
  skipWelcome: () => void;
  setMobileListOpen: (open: boolean) => void;
  hydrateGuestProfile: (profile: GuestProfile | null) => void;
  hydratePersistedList: (persistedList: PersistedShoppingList | null) => void;
};

const shoppingListStoreCreator: StateCreator<ShoppingListState> = (set) => ({
    items: [],
    estimatedTotalCents: 0,
    guestName: "",
    hasCompletedWelcome: false,
    isMobileListOpen: false,
    hasHydratedProfile: false,
    hasHydratedList: false,
    addStarterItem: (suggestion) =>
      set((state) => {
        const nextItems = upsertShoppingListItem(state.items, {
          id: suggestion.id,
          name: suggestion.name,
          note: suggestion.note,
          priceCents: suggestion.priceCents,
          source: "starter",
        });

        return {
          items: nextItems,
          estimatedTotalCents: calculateEstimatedTotal(nextItems),
        };
      }),
    addCatalogItem: (product) =>
      set((state) => {
        const nextItems = upsertShoppingListItem(state.items, {
          id: product.id,
          name: product.name,
          note: product.note,
          priceCents: product.priceCents,
          source: "catalog",
        });

        return {
          items: nextItems,
          estimatedTotalCents: calculateEstimatedTotal(nextItems),
        };
      }),
    addCatalogItems: (products) =>
      set((state) => {
        const nextItems = products.reduce(
          (currentItems, product) =>
            upsertShoppingListItem(currentItems, {
              id: product.id,
              name: product.name,
              note: product.note,
              priceCents: product.priceCents,
              source: "catalog",
            }),
          state.items,
        );

        return {
          items: nextItems,
          estimatedTotalCents: calculateEstimatedTotal(nextItems),
        };
      }),
    addManualItem: (manualItem) =>
      set((state) => {
        const nextItems = upsertShoppingListItem(state.items, {
          id: createManualItemId(manualItem.name),
          name: manualItem.name,
          note: manualItem.note,
          priceCents: manualItem.priceCents,
          source: "manual",
        });

        return {
          items: nextItems,
          estimatedTotalCents: calculateEstimatedTotal(nextItems),
        };
      }),
    updateItemQuantity: (itemId, quantity) =>
      set((state) => {
        const nextItems: ShoppingListItem[] = state.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(1, Number.isNaN(quantity) ? item.quantity : quantity) }
            : item,
        );

        return {
          items: nextItems,
          estimatedTotalCents: calculateEstimatedTotal(nextItems),
        };
      }),
    removeItem: (itemId) =>
      set((state) => {
        const nextItems: ShoppingListItem[] = state.items.filter(
          (item) => item.id !== itemId,
        );

        return {
          items: nextItems,
          estimatedTotalCents: calculateEstimatedTotal(nextItems),
        };
      }),
    clearItems: () => set({ items: [], estimatedTotalCents: 0 }),
    setGuestName: (guestName) => set({ guestName }),
    completeWelcome: () => set({ hasCompletedWelcome: true }),
    skipWelcome: () => set({ guestName: "", hasCompletedWelcome: true }),
    setMobileListOpen: (open) => set({ isMobileListOpen: open }),
    hydrateGuestProfile: (profile) =>
      set({
        guestName: profile?.guestName ?? "",
        hasCompletedWelcome: profile?.hasCompletedWelcome ?? false,
        hasHydratedProfile: true,
      }),
    hydratePersistedList: (persistedList) =>
      set({
        items: persistedList?.items ?? [],
        estimatedTotalCents: calculateEstimatedTotal(persistedList?.items ?? []),
        hasHydratedList: true,
      }),
  });

export const createShoppingListStore = () => create<ShoppingListState>()(shoppingListStoreCreator);

export const useShoppingListStore = createShoppingListStore();

function calculateEstimatedTotal(items: ShoppingListItem[]) {
  return items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
}

function createManualItemId(name: string) {
  const normalizedName = name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `manual-${normalizedName}`;
}

function upsertShoppingListItem(
  items: ShoppingListItem[],
  nextItem: Omit<ShoppingListItem, "quantity">,
) {
  const existingItem = items.find((item) => item.id === nextItem.id);

  if (existingItem) {
    return items.map((item) =>
      item.id === nextItem.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [
    ...items,
    {
      ...nextItem,
      quantity: 1,
    },
  ];
}
