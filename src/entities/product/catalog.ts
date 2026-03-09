export const catalogOrigins = ["catalogo", "dieta", "ambos"] as const;

export type CatalogOrigin = (typeof catalogOrigins)[number];

export type CatalogCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  categorySlug: string;
  unitLabel: string;
  averagePriceCents: number;
  origin: CatalogOrigin;
  isActive: boolean;
};
