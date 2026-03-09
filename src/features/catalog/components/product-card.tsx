"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { CatalogProduct } from "@/entities/product/catalog";
import { formatBrlFromCents } from "@/lib/formatters/currency";

type ProductCardProps = {
  product: CatalogProduct;
  onAddToList: (product: CatalogProduct) => void;
};

export function ProductCard({ product, onAddToList }: ProductCardProps) {
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
          <p className="text-sm leading-6 text-zinc-400">{product.shortDescription}</p>
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
          Compare rapidamente os itens antes de adicionar a lista ativa.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Produto do catalogo
          </span>
          <p aria-live="polite" className="mt-2 text-sm text-emerald-200">
            {hasJustAdded ? "Adicionado a lista ativa" : "Adicionar sem sair do catalogo"}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          aria-label={`Adicionar ${product.name} a lista ativa`}
          className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
          onClick={handleAddToList}
        >
          {hasJustAdded ? "Adicionar de novo" : "Adicionar a lista"}
        </Button>
      </div>
    </article>
  );
}
