"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CatalogCategory, CatalogProduct } from "@/entities/product/catalog";
import { ProductCard } from "@/features/catalog/components/product-card";
import { getCategories } from "@/features/catalog/lib/get-categories";
import { getProducts } from "@/features/catalog/lib/get-products";

const categories = getCategories();

type CatalogBrowserProps = {
  onAddToList?: (product: CatalogProduct) => void;
};

export function CatalogBrowser({ onAddToList }: CatalogBrowserProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState(categories[0]?.slug ?? "");
  const mobileSelectId = useId();

  const activeCategory =
    categories.find((category) => category.slug === activeCategorySlug) ?? categories[0];
  const visibleProducts = getProducts({ categorySlug: activeCategory?.slug ?? "" });

  return (
    <section
      aria-labelledby="catalogo-heading"
      className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Catalogo por area
          </p>
          <h3 id="catalogo-heading" className="text-2xl font-semibold text-white">
            Navegue pelas areas do mercado
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-zinc-300">
            Explore as categorias do MVP sem sair do fluxo principal. A navegacao e estavel no desktop e continua simples no celular.
          </p>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
          {`${visibleProducts.length} item(ns) nesta area`}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[11.5rem_minmax(0,1fr)] xl:grid-cols-[12rem_minmax(0,1fr)] lg:items-start">
        <CategoryRail
          activeCategorySlug={activeCategorySlug}
          categories={categories}
          onSelectCategory={setActiveCategorySlug}
        />

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
                  Categoria ativa
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {activeCategory?.name}
                </p>
              </div>

              <div className="lg:hidden">
                <label
                  className="mb-2 block text-sm font-medium text-zinc-100"
                  htmlFor={mobileSelectId}
                >
                  Trocar area
                </label>
                <select
                  id={mobileSelectId}
                  className="min-h-11 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                  value={activeCategorySlug}
                  onChange={(event) => setActiveCategorySlug(event.currentTarget.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {activeCategory?.description}
            </p>

            <div className="mt-5 flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Leitura rapida
                </p>
                <p className="mt-2 text-sm text-zinc-100">
                  {`Mostrando ${visibleProducts.length} produto(s) em ${activeCategory?.name}.`}
                </p>
              </div>
              <p className="max-w-sm text-sm leading-6 text-zinc-400">
                Compare preco medio, leia o contexto do item e adicione sem sair da navegacao atual.
              </p>
            </div>
          </div>

          <ul
            aria-label={`Produtos de ${activeCategory?.name ?? "categoria ativa"}`}
            className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(14.5rem,1fr))]"
          >
            {visibleProducts.map((product) => (
              <li key={product.id} className="min-w-0">
                <ProductCard
                  product={product}
                  onAddToList={onAddToList ?? (() => undefined)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

type CategoryRailProps = {
  categories: CatalogCategory[];
  activeCategorySlug: string;
  onSelectCategory: (slug: string) => void;
};

function CategoryRail({
  categories,
  activeCategorySlug,
  onSelectCategory,
}: CategoryRailProps) {
  return (
    <div className="hidden lg:block">
      <nav
        aria-label="Categorias do catalogo"
        className="sticky top-6 rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-3"
      >
        <p className="px-2 pb-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
          Areas do mercado
        </p>
        <ul className="space-y-2">
          {categories.map((category) => {
            const isActive = category.slug === activeCategorySlug;

            return (
              <li key={category.id}>
                <Button
                  type="button"
                  variant="ghost"
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? "min-h-12 w-full justify-start rounded-2xl bg-emerald-300/15 text-white hover:bg-emerald-300/20"
                      : "min-h-12 w-full justify-start rounded-2xl text-zinc-300 hover:bg-white/8 hover:text-white"
                  }
                  onClick={() => onSelectCategory(category.slug)}
                >
                  {category.name}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
