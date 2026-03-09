"use client";

import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CatalogProduct } from "@/entities/product/catalog";
import type { DietCategory } from "@/entities/diet/diet";
import { getDietCategories } from "@/features/diets/lib/get-diet-categories";
import { getDietCollections } from "@/features/diets/lib/get-diet-collections";
import { catalogProducts } from "@/features/catalog/lib/catalog-data";
import { formatBrlFromCents } from "@/lib/formatters/currency";

const dietCategories = getDietCategories();

type DietBrowserProps = {
  onAddToList?: (product: CatalogProduct) => void;
  onAddCollectionToList?: (products: CatalogProduct[]) => void;
};

export function DietBrowser({ onAddToList, onAddCollectionToList }: DietBrowserProps) {
  const [activeDietSlug, setActiveDietSlug] = useState(dietCategories[0]?.slug ?? "");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hasJustBulkAdded, setHasJustBulkAdded] = useState(false);
  const mobileSelectId = useId();

  const activeDiet =
    dietCategories.find((category) => category.slug === activeDietSlug) ?? dietCategories[0];
  const activeCollection = getDietCollections(activeDiet?.slug)[0];
  const visibleSuggestions =
    activeCollection?.suggestedProducts
      .map((suggestion) => {
        const product = catalogProducts.find((item) => item.slug === suggestion.productSlug);

        if (!product) {
          return null;
        }

        return {
          ...product,
          rationale: suggestion.rationale,
        };
      })
      .filter((product) => product != null) ?? [];

  useEffect(() => {
    if (!hasJustBulkAdded) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasJustBulkAdded(false);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [hasJustBulkAdded]);

  function handleConfirmBulkAdd() {
    onAddCollectionToList?.(visibleSuggestions);
    setIsPreviewOpen(false);
    setHasJustBulkAdded(true);
  }

  return (
    <section
      aria-labelledby="dietas-heading"
      className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Trilhas por dieta
          </p>
          <h3 id="dietas-heading" className="text-2xl font-semibold text-white">
            Explore sugestoes por objetivo alimentar
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-zinc-300">
            Navegue por dietas prontas em PT-BR e descubra combinacoes de produtos que ja conversam com o fluxo da lista ativa.
          </p>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
          {`${visibleSuggestions.length} sugestao(oes) nesta dieta`}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[11.5rem_minmax(0,1fr)] xl:grid-cols-[12rem_minmax(0,1fr)] lg:items-start">
        <DietRail
          activeDietSlug={activeDietSlug}
          diets={dietCategories}
          onSelectDiet={setActiveDietSlug}
        />

        <div className="min-w-0 space-y-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
                  Dieta ativa
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {activeDiet?.name}
                </p>
              </div>

              <div className="lg:hidden">
                <label
                  className="mb-2 block text-sm font-medium text-zinc-100"
                  htmlFor={mobileSelectId}
                >
                  Trocar dieta
                </label>
                <select
                  id={mobileSelectId}
                  className="min-h-11 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                  value={activeDietSlug}
                  onChange={(event) => setActiveDietSlug(event.currentTarget.value)}
                >
                  {dietCategories.map((diet) => (
                    <option key={diet.id} value={diet.slug}>
                      {diet.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {activeDiet?.description}
            </p>

            <div className="mt-5 flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Colecao sugerida
                </p>
                <p className="mt-2 text-sm text-zinc-100">
                  {activeCollection?.headline}
                </p>
              </div>
              <p className="max-w-sm text-sm leading-6 text-zinc-400">
                {activeCollection?.summary}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-[1.25rem] border border-white/10 bg-white/4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Lista completa
                </p>
                <p aria-live="polite" className="mt-2 text-sm text-zinc-100">
                  {hasJustBulkAdded
                    ? "Colecao adicionada a lista ativa."
                    : "Revise toda a selecao antes de importar os itens de uma vez."}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                onClick={() => setIsPreviewOpen(true)}
              >
                Ver lista completa
              </Button>
            </div>
          </div>

          {isPreviewOpen ? (
            <section
              aria-label={`Preview da dieta ${activeDiet?.name ?? "ativa"}`}
              className="rounded-[1.5rem] border border-emerald-300/20 bg-slate-950/90 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
                    Confirmacao da lista
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    {`Adicionar a colecao ${activeDiet?.name}`}
                  </h4>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
                    Revise os itens abaixo antes de importar a selecao completa para a lista ativa.
                  </p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                  {`${visibleSuggestions.length} item(ns)`}
                </span>
              </div>

              <ol className="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Itens da colecao de dieta">
                {visibleSuggestions.map((product) => (
                  <li
                    key={product.slug}
                    className="rounded-[1.25rem] border border-white/10 bg-white/4 p-4"
                  >
                    <p className="text-sm font-medium text-white">{product.name}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{product.rationale}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-emerald-200/75">
                      {formatBrlFromCents(product.averagePriceCents)}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  className="w-full bg-emerald-300 text-slate-950 hover:bg-emerald-200 sm:w-auto"
                  onClick={handleConfirmBulkAdd}
                >
                  Confirmar lista completa
                </Button>
              </div>
            </section>
          ) : null}

          <ul
            aria-label={`Sugestoes da dieta ${activeDiet?.name ?? "ativa"}`}
            className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(14.5rem,1fr))]"
          >
            {visibleSuggestions.map((product) => (
              <li key={product.slug} className="min-w-0">
                <DietProductCard
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

type DietProductCardProps = {
  product: CatalogProduct & { rationale: string };
  onAddToList: (product: CatalogProduct) => void;
};

function DietProductCard({ product, onAddToList }: DietProductCardProps) {
  const [hasJustAdded, setHasJustAdded] = useState(false);

  useEffect(() => {
    if (!hasJustAdded) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasJustAdded(false);
    }, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [hasJustAdded]);

  function handleAddToList() {
    onAddToList(product);
    setHasJustAdded(true);
  }

  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-base font-medium text-white">{product.name}</p>
          <p className="text-sm leading-6 text-zinc-400">
            {product.shortDescription}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
          {product.unitLabel}
        </span>
      </div>

      <div className="mt-5 rounded-[1.25rem] border border-emerald-300/15 bg-emerald-300/8 p-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/75">
          Preco medio estimado
        </p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {formatBrlFromCents(product.averagePriceCents)}
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          {product.rationale}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Acao individual
          </p>
          <p aria-live="polite" className="mt-2 text-sm text-emerald-200">
            {hasJustAdded ? "Adicionado a lista ativa" : "Adicione sem sair da trilha atual"}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          aria-label={`Adicionar ${product.name} da dieta a lista ativa`}
          className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
          onClick={handleAddToList}
        >
          {hasJustAdded ? "Adicionar de novo" : "Adicionar item"}
        </Button>
      </div>
    </article>
  );
}

type DietRailProps = {
  diets: DietCategory[];
  activeDietSlug: string;
  onSelectDiet: (slug: string) => void;
};

function DietRail({ diets, activeDietSlug, onSelectDiet }: DietRailProps) {
  return (
    <div className="hidden lg:block">
      <nav
        aria-label="Dietas disponiveis"
        className="sticky top-6 rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-3"
      >
        <p className="px-2 pb-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
          Objetivos
        </p>
        <ul className="space-y-2">
          {diets.map((diet) => {
            const isActive = diet.slug === activeDietSlug;

            return (
              <li key={diet.id}>
                <Button
                  type="button"
                  variant="ghost"
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? "min-h-12 w-full justify-start rounded-2xl bg-emerald-300/15 text-white hover:bg-emerald-300/20"
                      : "min-h-12 w-full justify-start rounded-2xl text-zinc-300 hover:bg-white/8 hover:text-white"
                  }
                  onClick={() => onSelectDiet(diet.slug)}
                >
                  {diet.name}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
