import { catalogCategories } from "@/features/catalog/lib/catalog-data";

export function getCategories() {
  return [...catalogCategories].sort((left, right) => left.sortOrder - right.sortOrder);
}
