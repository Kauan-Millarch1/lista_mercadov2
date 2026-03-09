import { dietCollections } from "@/features/diets/lib/diet-data";

export function getDietCollections(dietSlug?: string) {
  if (!dietSlug) {
    return [...dietCollections];
  }

  return dietCollections.filter((collection) => collection.dietSlug === dietSlug);
}
