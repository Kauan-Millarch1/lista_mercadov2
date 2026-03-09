export type ShoppingListItemSource = "starter" | "catalog" | "manual";

export type ShoppingListItem = {
  id: string;
  name: string;
  note: string;
  quantity: number;
  priceCents: number;
  source: ShoppingListItemSource;
};

export type StarterSuggestion = {
  id: string;
  name: string;
  note: string;
  priceCents: number;
};

export type CatalogShoppingListInput = {
  id: string;
  name: string;
  note: string;
  priceCents: number;
};

export type ManualShoppingListInput = {
  name: string;
  note: string;
  priceCents: number;
};
