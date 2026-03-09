import type { ShoppingListItem } from "@/entities/shopping-list/shopping-list-item";
import { Button } from "@/components/ui/button";
import { formatBrlFromCents } from "@/lib/formatters/currency";

type ActiveShoppingListPanelProps = {
  items: ShoppingListItem[];
  guestName: string;
  estimatedTotalCents: number;
  compact?: boolean;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onClearItems?: () => void;
};

export function ActiveShoppingListPanel({
  items,
  guestName,
  estimatedTotalCents,
  compact = false,
  onQuantityChange,
  onRemoveItem,
  onClearItems,
}: ActiveShoppingListPanelProps) {
  const unpricedItems = items.filter((item) => item.priceCents <= 0);
  const hasPartialTotal = unpricedItems.length > 0;

  return (
    <section
      aria-label={compact ? "Lista ativa no celular" : "Lista ativa"}
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300/75">
            Workspace da lista
          </p>
          <h2 className="text-2xl font-semibold text-white">Lista ativa</h2>
          <p className="max-w-sm text-sm leading-6 text-zinc-300">
            {guestName
              ? `Bem-vindo, ${guestName}`
              : "Use os atalhos da area principal para montar sua lista sem sair desta tela."}
          </p>
        </div>
        <div className="min-w-[9.5rem] text-left sm:text-right">
          <span className="inline-flex min-h-8 items-center whitespace-nowrap rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100 sm:ml-auto">
            {items.length === 0 ? "Pronta para comecar" : `${items.length} item(ns)`}
          </span>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
            {hasPartialTotal ? "Total parcial" : "Total estimado"}
          </p>
          <p className="mt-1 text-xl font-semibold text-white">
            {formatBrlFromCents(estimatedTotalCents)}
          </p>
          {hasPartialTotal ? (
            <p className="mt-2 max-w-xs text-xs leading-5 text-amber-200">
              {`${unpricedItems.length} item(ns) ainda sem preco. O total atual considera apenas itens com valor informado.`}
            </p>
          ) : null}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/15 bg-white/4 p-5">
          <p className="text-sm font-medium text-white">
            Adicione um item inicial para transformar esta area na sua lista de compras.
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Escolha um dos atalhos sugeridos na area principal e acompanhe a lista crescer sem recarregar a pagina.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-col items-start gap-3 xl:flex-row xl:items-center xl:justify-between">
            <p className="text-sm text-zinc-400">
              Ajuste quantidades, remova itens ou reinicie o plano atual sem sair da tela.
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10 xl:w-auto"
              onClick={onClearItems}
            >
              Limpar lista
            </Button>
          </div>
          <ol className="mt-4 space-y-3" aria-label="Itens da lista ativa">
            {items.map((item, index) => (
              <li
                key={item.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded-full bg-white/10 text-xs text-zinc-100">
                          0{index + 1}
                        </span>
                        <p className="text-base font-medium text-white">{item.name}</p>
                        {item.source === "manual" ? (
                          <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-100">
                            Manual
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm leading-6 text-zinc-400">{item.note}</p>
                      {item.priceCents > 0 ? (
                        <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
                          Medio: {formatBrlFromCents(item.priceCents)}
                        </p>
                      ) : (
                        <p className="text-xs uppercase tracking-[0.18em] text-amber-200">
                          Sem preco informado
                        </p>
                      )}
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                      Qtd. {item.quantity}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="flex flex-col gap-3 text-sm text-zinc-300 sm:flex-row sm:items-center">
                      <span>Quantidade</span>
                      <input
                        aria-label={`Quantidade de ${item.name}`}
                        className="min-h-11 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 sm:w-24"
                        inputMode="numeric"
                        min={1}
                        type="number"
                        value={item.quantity}
                        onChange={(event) =>
                          onQuantityChange?.(item.id, Number(event.currentTarget.value))
                        }
                      />
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10"
                      onClick={() => onRemoveItem?.(item.id)}
                    >
                      {`Remover ${item.name}`}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {!compact ? (
        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/4 p-4 text-sm leading-6 text-zinc-400">
          Esta base prepara o estado e a composicao da lista para quantidade, totais e persistencia nas proximas stories.
        </div>
      ) : null}
    </section>
  );
}
