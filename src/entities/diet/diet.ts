export type DietCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

export type DietSuggestedProduct = {
  productSlug: string;
  rationale: string;
};

export type DietCollection = {
  id: string;
  dietSlug: string;
  headline: string;
  summary: string;
  suggestedProducts: DietSuggestedProduct[];
};
