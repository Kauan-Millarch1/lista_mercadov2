import { describe, expect, it } from "vitest";

import { dietCategories, dietCollections } from "@/features/diets/lib/diet-data";
import { getDietCategories } from "@/features/diets/lib/get-diet-categories";
import { getDietCollections } from "@/features/diets/lib/get-diet-collections";
import { catalogProducts } from "@/features/catalog/lib/catalog-data";

describe("diet data foundation", () => {
  it("defines the MVP diet categories in PT-BR order", () => {
    expect(getDietCategories().map((category) => category.slug)).toEqual([
      "emagrecimento",
      "hipertrofia",
      "low-carb",
      "vegetariana",
      "vegana",
    ]);

    expect(dietCategories.every((category) => category.description.length > 0)).toBe(true);
  });

  it("keeps a usable suggested collection for each diet category", () => {
    expect(dietCollections).toHaveLength(5);
    expect(
      dietCollections.every(
        (collection) =>
          collection.summary.length > 0 &&
          collection.suggestedProducts.length >= 4 &&
          dietCategories.some((category) => category.slug === collection.dietSlug),
      ),
    ).toBe(true);
  });

  it("links diet suggested products to existing catalog products without mutating the source", () => {
    const veganaCollection = getDietCollections("vegana");

    expect(veganaCollection).toHaveLength(1);
    expect(
      veganaCollection[0]?.suggestedProducts.every((suggestion) =>
        catalogProducts.some((product) => product.slug === suggestion.productSlug),
      ),
    ).toBe(true);
    expect(getDietCollections().length).toBe(dietCollections.length);
  });
});
