import type { ShoppingListItem } from "@/entities/shopping-list/shopping-list-item";

const SHOPPING_LIST_STORAGE_KEY = "lista-de-mercado:shopping-list";

export type PersistedShoppingList = {
  items: ShoppingListItem[];
};

export function loadPersistedShoppingList(): PersistedShoppingList | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawList = window.localStorage.getItem(SHOPPING_LIST_STORAGE_KEY);

  if (!rawList) {
    return null;
  }

  try {
    const parsedList = JSON.parse(rawList) as Partial<PersistedShoppingList>;

    return {
      items: Array.isArray(parsedList.items)
        ? parsedList.items
            .filter(isStoredShoppingListItem)
            .map((item) => ({
              id: item.id,
              name: item.name,
              note: item.note,
              quantity: item.quantity,
              priceCents: item.priceCents,
              source: item.source,
            }))
        : [],
    };
  } catch {
    window.localStorage.removeItem(SHOPPING_LIST_STORAGE_KEY);
    return null;
  }
}

export function savePersistedShoppingList(payload: PersistedShoppingList) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    SHOPPING_LIST_STORAGE_KEY,
    JSON.stringify({
      items: payload.items.map((item) => ({
        id: item.id,
        name: item.name,
        note: item.note,
        quantity: item.quantity,
        priceCents: item.priceCents,
        source: item.source,
      })),
    }),
  );
}

type StoredShoppingListItem = ShoppingListItem & { source: string };

function isStoredShoppingListItem(value: unknown): value is StoredShoppingListItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<StoredShoppingListItem>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.note === "string" &&
    typeof candidate.quantity === "number" &&
    typeof candidate.priceCents === "number" &&
    candidate.source === "starter"
  );
}
