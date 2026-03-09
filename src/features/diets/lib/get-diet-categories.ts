import { dietCategories } from "@/features/diets/lib/diet-data";

export function getDietCategories() {
  return [...dietCategories]
    .filter((category) => category.isActive)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}
