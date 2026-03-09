import { Button } from "@/components/ui/button";
import { catalogProducts } from "@/features/catalog/lib/catalog-data";
import { getDietCategories } from "@/features/diets/lib/get-diet-categories";
import { formatBrlFromCents } from "@/lib/formatters/currency";

const featuredDiet = getDietCategories()[0];
const featuredCatalogProduct =
  catalogProducts.find((product) => product.slug === "aveia-em-flocos-500g") ??
  catalogProducts[0];
const featuredShortcutProduct =
  catalogProducts.find((product) => product.slug === "banana-prata-1kg") ??
  catalogProducts[0];

type SmartSuggestionBlocksProps = {
  onAddShortcutItem: (product: {
    id: string;
    name: string;
    shortDescription: string;
    averagePriceCents: number;
  }) => void;
  onJumpToSection: (sectionId: string) => void;
};

export function SmartSuggestionBlocks({
  onAddShortcutItem,
  onJumpToSection,
}: SmartSuggestionBlocksProps) {
  return (
    <section
      aria-labelledby="sugestoes-inteligentes-heading"
      className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Sugestoes inteligentes
          </p>
          <h3
            id="sugestoes-inteligentes-heading"
            className="text-2xl font-semibold text-white"
          >
            Aceleradores curados para planejar mais rapido
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-zinc-300">
            Use atalhos de descoberta para entrar em dietas, revisar o catalogo ou iniciar a lista com um item recorrente sem sair do fluxo principal.
          </p>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
          Conectado ao mesmo workspace
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
            Atalho por dieta
          </p>
          <h4 className="mt-2 text-xl font-semibold text-white">{featuredDiet?.name}</h4>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {featuredDiet?.description}
          </p>
          <Button
            type="button"
            className="mt-5 w-full bg-emerald-300 text-slate-950 hover:bg-emerald-200"
            onClick={() => onJumpToSection("dietas")}
          >
            Ver trilha sugerida
          </Button>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
            Descoberta rapida
          </p>
          <h4 className="mt-2 text-xl font-semibold text-white">
            {featuredCatalogProduct?.name}
          </h4>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {featuredCatalogProduct?.shortDescription}
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            {`Preco medio: ${formatBrlFromCents(featuredCatalogProduct?.averagePriceCents ?? 0)}`}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-5 w-full border-white/15 bg-white/5 text-white hover:bg-white/10"
            onClick={() => onJumpToSection("catalogo")}
          >
            Abrir no catalogo
          </Button>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
            Acao imediata
          </p>
          <h4 className="mt-2 text-xl font-semibold text-white">
            {featuredShortcutProduct?.name}
          </h4>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Adicione um item leve para iniciar o plano e continuar navegando sem interrupcao.
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            {`Preco medio: ${formatBrlFromCents(featuredShortcutProduct?.averagePriceCents ?? 0)}`}
          </p>
          <Button
            type="button"
            className="mt-5 w-full bg-emerald-300 text-slate-950 hover:bg-emerald-200"
            onClick={() =>
              featuredShortcutProduct
                ? onAddShortcutItem(featuredShortcutProduct)
                : undefined
            }
          >
            Adicionar item sugerido
          </Button>
        </article>
      </div>
    </section>
  );
}
