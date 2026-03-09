import { describe, expect, it } from "vitest";

import { catalogCategories, catalogProducts } from "@/features/catalog/lib/catalog-data";
import { getCategories } from "@/features/catalog/lib/get-categories";
import { getProducts } from "@/features/catalog/lib/get-products";

describe("catalog data foundation", () => {
  it("defines all MVP categories in PT-BR order", () => {
    expect(getCategories().map((category) => category.slug)).toEqual([
      "bebidas",
      "hortifruti",
      "carnes-e-peixes",
      "laticinios-e-frios",
      "padaria",
      "mercearia",
      "congelados",
      "limpeza",
      "higiene-pessoal",
      "utilidades-domesticas",
      "itens-de-cozinha",
    ]);

    expect(catalogCategories.every((category) => category.description.length > 0)).toBe(true);
  });

  it("keeps products associated to one primary category with average price data", () => {
    expect(catalogProducts.length).toBeGreaterThan(30);
    expect(
      catalogProducts.every(
        (product) =>
          typeof product.categorySlug === "string" &&
          catalogCategories.some((category) => category.slug === product.categorySlug) &&
          product.averagePriceCents > 0,
      ),
    ).toBe(true);
  });

  it("filters products by category slug without mutating the seed source", () => {
    const merceariaProducts = getProducts({ categorySlug: "mercearia" });

    expect(merceariaProducts.length).toBeGreaterThan(0);
    expect(merceariaProducts.every((product) => product.categorySlug === "mercearia")).toBe(true);
    expect(getProducts().length).toBe(catalogProducts.length);
  });
});
