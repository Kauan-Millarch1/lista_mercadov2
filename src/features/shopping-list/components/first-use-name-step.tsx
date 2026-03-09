"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

type FirstUseNameStepProps = {
  onSkip: () => void;
  onContinue: (guestName: string) => void;
};

export function FirstUseNameStep({
  onSkip,
  onContinue,
}: FirstUseNameStepProps) {
  const [guestName, setGuestName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onContinue(guestName.trim());
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <div className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100">
          Primeiro acesso local
        </div>
        <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
          Como devo te chamar?
        </h2>
        <p className="mt-3 max-w-xl text-base leading-8 text-zinc-300">
          Este nome e opcional. Ele serve apenas para personalizar sua experiencia neste navegador, sem conta ou login.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-100" htmlFor="guest-name">
              Seu nome
            </label>
            <input
              id="guest-name"
              name="guest-name"
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
              placeholder="Ex.: Kauan"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="submit"
              className="bg-emerald-300 text-slate-950 hover:bg-emerald-200"
            >
              Continuar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              onClick={onSkip}
            >
              Pular por agora
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
