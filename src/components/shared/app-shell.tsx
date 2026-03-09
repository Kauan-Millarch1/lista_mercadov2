"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { CatalogBrowser } from "@/features/catalog/components/catalog-browser";
import { DietBrowser } from "@/features/diets/components/diet-browser";
import { ManualItemForm } from "@/features/manual-items/components/manual-item-form";
import { SmartSuggestionBlocks } from "@/components/shared/smart-suggestion-blocks";
import { FirstUseNameStep } from "@/features/shopping-list/components/first-use-name-step";
import { ActiveShoppingListPanel } from "@/features/shopping-list/components/active-shopping-list-panel";
import { MobileShoppingListSheet } from "@/features/shopping-list/components/mobile-shopping-list-sheet";
import { useShoppingListWorkspace } from "@/features/shopping-list/hooks/use-shopping-list-workspace";
import { starterSuggestions } from "@/features/shopping-list/store/shopping-list-store";
import { loadGuestProfile, saveGuestProfile } from "@/lib/storage/guest-profile";
import {
  loadPersistedShoppingList,
  savePersistedShoppingList,
} from "@/lib/storage/shopping-list";

const navItems = [
  { href: "#visao-geral", label: "Inicio" },
  { href: "#lista-ativa", label: "Lista ativa" },
  { href: "#catalogo", label: "Catalogo" },
  { href: "#dietas", label: "Dietas" },
  { href: "#item-manual", label: "Item manual" },
  { href: "#atalhos-iniciais", label: "Sugestoes" },
];

const primaryHighlights = [
  "Workspace real da lista ativa com painel persistente no desktop",
  "Atalho local para adicionar itens sem recarregar a experiencia",
  "Entrada opcional de nome sem conta, login ou dependencia remota",
];

export function AppShell() {
  const {
    items,
    guestName,
    estimatedTotalCents,
    hasCompletedWelcome,
    hasHydratedProfile,
    hasHydratedList,
    isMobileListOpen,
    addStarterItem,
    addCatalogItem,
    addCatalogItems,
    addManualItem,
    updateItemQuantity,
    removeItem,
    clearItems,
    setGuestName,
    completeWelcome,
    skipWelcome,
    setMobileListOpen,
    hydrateGuestProfile,
    hydratePersistedList,
  } = useShoppingListWorkspace();

  useEffect(() => {
    hydrateGuestProfile(loadGuestProfile());
    hydratePersistedList(loadPersistedShoppingList());
  }, [hydrateGuestProfile, hydratePersistedList]);

  useEffect(() => {
    if (!hasHydratedList) {
      return;
    }

    savePersistedShoppingList({ items });
  }, [hasHydratedList, items]);

  function handleContinueWithName(name: string) {
    setGuestName(name);
    completeWelcome();
    saveGuestProfile({
      guestName: name,
      hasCompletedWelcome: true,
    });
  }

  function handleSkipWelcome() {
    skipWelcome();
    saveGuestProfile({
      guestName: "",
      hasCompletedWelcome: true,
    });
  }

  const desktopPanel = (
    <ActiveShoppingListPanel
      guestName={guestName}
      items={items}
      estimatedTotalCents={estimatedTotalCents}
      onQuantityChange={updateItemQuantity}
      onRemoveItem={removeItem}
      onClearItems={clearItems}
    />
  );

  function handleAddCatalogProduct(product: {
    id: string;
    name: string;
    shortDescription: string;
    averagePriceCents: number;
  }) {
    addCatalogItem({
      id: product.id,
      name: product.name,
      note: product.shortDescription,
      priceCents: product.averagePriceCents,
    });
  }

  function handleAddManualItem(payload: { name: string; priceCents: number }) {
    addManualItem({
      name: payload.name,
      note: "Item manual criado no fluxo principal.",
      priceCents: payload.priceCents,
    });
  }

  function handleAddDietCollection(products: Array<{
    id: string;
    name: string;
    shortDescription: string;
    averagePriceCents: number;
  }>) {
    addCatalogItems(
      products.map((product) => ({
        id: product.id,
        name: product.name,
        note: product.shortDescription,
        priceCents: product.averagePriceCents,
      })),
    );
  }

  function jumpToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.16),_transparent_30%),linear-gradient(180deg,_rgba(14,17,24,1)_0%,_rgba(8,10,16,1)_100%)] text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-300/80">
              Lista de Mercado
            </p>
            <h1 className="mt-2 text-lg font-semibold text-white sm:text-xl">
              Planejador de compras ativo
            </h1>
          </div>
          <nav aria-label="Navegacao principal">
            <ul className="flex items-center gap-2 text-sm text-zinc-300 sm:gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex rounded-full border border-white/10 px-3 py-1.5 transition-colors hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {!hasHydratedProfile || !hasHydratedList ? null : !hasCompletedWelcome ? (
          <FirstUseNameStep
            onContinue={handleContinueWithName}
            onSkip={handleSkipWelcome}
          />
        ) : (
          <>
            <section
              id="visao-geral"
              className="grid flex-1 gap-6 py-8 lg:grid-cols-[minmax(0,1.1fr)_24rem] lg:items-start lg:py-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">
                  Workspace ativo
                </div>
                <div className="space-y-4">
                  <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                    Planeje compras com uma lista ativa clara, estavel e pronta para continuar de onde voce parou.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
                    O fluxo principal foi consolidado em PT-BR para desktop e celular. A lista, o total estimado e os controles principais permanecem acessiveis no mesmo modelo mental.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    className="bg-emerald-300 text-slate-950 hover:bg-emerald-200"
                    onClick={() => {
                      document.getElementById("atalhos-iniciais")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Adicionar primeiro item
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => {
                      document.getElementById("lista-ativa")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Ver lista ativa
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {primaryHighlights.map((highlight) => (
                    <article
                      key={highlight}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                    >
                      <p className="text-sm leading-6 text-zinc-200">{highlight}</p>
                    </article>
                  ))}
                </div>

                <section id="sugestoes-inteligentes">
                  <SmartSuggestionBlocks
                    onAddShortcutItem={handleAddCatalogProduct}
                    onJumpToSection={jumpToSection}
                  />
                </section>

                <section id="catalogo">
                  <CatalogBrowser onAddToList={handleAddCatalogProduct} />
                </section>

                <section id="dietas">
                  <DietBrowser
                    onAddToList={handleAddCatalogProduct}
                    onAddCollectionToList={handleAddDietCollection}
                  />
                </section>

                <section id="item-manual">
                  <ManualItemForm onSubmitItem={handleAddManualItem} />
                </section>

                <section
                  id="atalhos-iniciais"
                  className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                        Sugestoes iniciais
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        Escolha um item inicial para montar sua lista com rapidez
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-200">
                      Sem reload
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {starterSuggestions.map((suggestion) => (
                      <article
                        key={suggestion.id}
                        className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4"
                      >
                        <p className="text-base font-medium text-white">
                          {suggestion.name}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          {suggestion.note}
                        </p>
                        <Button
                          type="button"
                          className="mt-4 w-full bg-emerald-300 text-slate-950 hover:bg-emerald-200"
                          onClick={() => addStarterItem(suggestion)}
                        >
                          {`Adicionar ${suggestion.name}`}
                        </Button>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              <aside id="lista-ativa" className="hidden lg:block">
                {desktopPanel}
              </aside>
            </section>

            <MobileShoppingListSheet
              guestName={guestName}
              items={items}
              estimatedTotalCents={estimatedTotalCents}
              open={isMobileListOpen}
              onOpenChange={setMobileListOpen}
              onQuantityChange={updateItemQuantity}
              onRemoveItem={removeItem}
              onClearItems={clearItems}
            />
          </>
        )}
      </div>
    </main>
  );
}
