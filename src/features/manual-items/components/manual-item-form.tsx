"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type ManualItemFormProps = {
  onSubmitItem: (payload: { name: string; priceCents: number }) => void;
};

export function ManualItemForm({ onSubmitItem }: ManualItemFormProps) {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (isFormOpen) {
      nameInputRef.current?.focus();
    }
  }, [isFormOpen]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedName = itemName.trim();
    const parsedPrice = parseOptionalPriceToCents(priceInput);

    if (!normalizedName) {
      setNameErrorMessage("Digite o nome do item para continuar.");
      setPriceErrorMessage("");
      setFeedbackMessage("");
      return;
    }

    if (parsedPrice == null) {
      setPriceErrorMessage("Informe um preco valido ou deixe o campo em branco.");
      setNameErrorMessage("");
      setFeedbackMessage("");
      return;
    }

    onSubmitItem({
      name: normalizedName,
      priceCents: parsedPrice,
    });
    setItemName("");
    setPriceInput("");
    setNameErrorMessage("");
    setPriceErrorMessage("");
    setIsFormOpen(false);
    setFeedbackMessage(
      parsedPrice > 0
        ? `${normalizedName} foi adicionado com preco informado.`
        : `${normalizedName} foi adicionado a lista ativa.`,
    );
  }

  function handleOpenForm() {
    setIsFormOpen(true);
  }

  function handleCancelForm() {
    setIsFormOpen(false);
    setItemName("");
    setPriceInput("");
    setNameErrorMessage("");
    setPriceErrorMessage("");
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Nao encontrou no catalogo?
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Adicione um item manualmente
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
            Crie um item personalizado sem sair do fluxo. O formulario abre no mesmo
            contexto e pode ser fechado sem perder a navegacao atual.
          </p>
        </div>
        <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs text-amber-100">
          Entrada local
        </span>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">
              Abra apenas quando precisar complementar a lista.
            </p>
            <p aria-live="polite" className="text-sm text-emerald-200">
              {feedbackMessage || "O item entra direto na lista ativa sem recarregar a pagina."}
            </p>
          </div>
          <Button
            type="button"
            className="w-full bg-emerald-300 text-slate-950 hover:bg-emerald-200 sm:w-auto"
            aria-expanded={isFormOpen}
            onClick={handleOpenForm}
          >
            {isFormOpen ? "Formulario aberto" : "Abrir formulario manual"}
          </Button>
        </div>

        {isFormOpen ? (
          <form className="mt-5 space-y-4" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-100" htmlFor="manual-item-name">
                  Nome do item
                </label>
                <input
                  id="manual-item-name"
                  ref={nameInputRef}
                  aria-describedby={nameErrorMessage ? "manual-item-error" : "manual-item-help"}
                  aria-invalid={nameErrorMessage ? "true" : "false"}
                  className="min-h-12 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/80 px-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                  placeholder="Ex.: Temperos para feijao"
                  type="text"
                  value={itemName}
                  onChange={(event) => {
                    setItemName(event.currentTarget.value);
                    if (nameErrorMessage) {
                      setNameErrorMessage("");
                    }
                  }}
                />
                <p id="manual-item-help" className="text-sm text-zinc-400">
                  Use esse caminho quando o item ainda nao existir no catalogo.
                </p>
                {nameErrorMessage ? (
                  <p id="manual-item-error" className="text-sm text-amber-200">
                    {nameErrorMessage}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-100" htmlFor="manual-item-price">
                  Preco opcional
                </label>
                <input
                  id="manual-item-price"
                  aria-describedby={priceErrorMessage ? "manual-price-error" : "manual-price-help"}
                  aria-invalid={priceErrorMessage ? "true" : "false"}
                  className="min-h-12 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/80 px-4 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                  inputMode="decimal"
                  placeholder="Ex.: 12,90"
                  type="text"
                  value={priceInput}
                  onChange={(event) => {
                    setPriceInput(event.currentTarget.value);
                    if (priceErrorMessage) {
                      setPriceErrorMessage("");
                    }
                  }}
                />
                <p id="manual-price-help" className="text-sm text-zinc-400">
                  Se souber o valor, informe em reais. Se nao souber, deixe em branco.
                </p>
                {priceErrorMessage ? (
                  <p id="manual-price-error" className="text-sm text-amber-200">
                    {priceErrorMessage}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                onClick={handleCancelForm}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="w-full bg-emerald-300 text-slate-950 hover:bg-emerald-200 sm:w-auto"
              >
                Adicionar item manual
              </Button>
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
}

function parseOptionalPriceToCents(rawValue: string) {
  const normalizedValue = rawValue.trim();

  if (!normalizedValue) {
    return 0;
  }

  const sanitizedValue = normalizedValue.replace(/\s+/g, "").replace(",", ".");
  const parsedValue = Number(sanitizedValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return null;
  }

  return Math.round(parsedValue * 100);
}
