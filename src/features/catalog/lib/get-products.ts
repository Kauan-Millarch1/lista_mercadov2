import { catalogProducts } from "@/features/catalog/lib/catalog-data";

type GetProductsOptions = {
  categorySlug?: string | null;
};

export function getProducts(options: GetProductsOptions = {}) {
  const categorySlug = options.categorySlug?.trim() ?? "";

  return catalogProducts.filter((product) =>
    categorySlug ? product.categorySlug === categorySlug : true,
  );
}
