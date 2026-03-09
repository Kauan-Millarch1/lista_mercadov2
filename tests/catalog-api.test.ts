import { describe, expect, it } from "vitest";

import { GET as getCategoriesRoute } from "@/app/api/categories/route";
import { GET as getProductsRoute } from "@/app/api/products/route";

describe("catalog api routes", () => {
  it("returns category data wrapped in the standard success envelope", async () => {
    const response = await getCategoriesRoute();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(payload.data)).toBe(true);
    expect(payload.data[0]).toMatchObject({
      slug: "bebidas",
    });
  });

  it("returns filtered product data for a category query", async () => {
    const request = new Request("http://localhost:3000/api/products?category=mercearia");
    const response = await getProductsRoute(request as never);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.data.length).toBeGreaterThan(0);
    expect(
      payload.data.every((product: { categorySlug: string }) => product.categorySlug === "mercearia"),
    ).toBe(true);
  });
});
