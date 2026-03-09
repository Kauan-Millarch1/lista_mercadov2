import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { DietBrowser } from "@/features/diets/components/diet-browser";

describe("diet browser", () => {
  it("renders PT-BR diet navigation and updates the visible collection without reload", async () => {
    const user = userEvent.setup();

    render(<DietBrowser />);

    expect(
      screen.getByRole("heading", { name: "Explore sugestoes por objetivo alimentar" }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Emagrecimento" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Hipertrofia" }));

    expect(screen.getByRole("button", { name: "Hipertrofia", pressed: true })).toBeTruthy();
    expect(screen.getByText("Base proteica para ganho de massa")).toBeTruthy();
    expect(screen.getByText("Peito de frango 1kg")).toBeTruthy();
    expect(screen.getByText("R$ 21,50")).toBeTruthy();
    expect(
      screen.getAllByRole("button", { name: /Adicionar .* da dieta a lista ativa/i }).length,
    ).toBeGreaterThan(0);
  });

  it("keeps the diet browsing model accessible on mobile through the diet select", async () => {
    const user = userEvent.setup();

    render(<DietBrowser />);

    await user.selectOptions(screen.getByLabelText("Trocar dieta"), "vegana");

    expect(screen.getByRole("option", { name: "Vegana" }).selected).toBe(true);
    expect(screen.getByText("Comeco vegano com itens versateis")).toBeTruthy();
    expect(screen.getByText("Hamburguer vegetal congelado")).toBeTruthy();
    expect(
      screen.getByRole("button", {
        name: "Adicionar Hamburguer vegetal congelado da dieta a lista ativa",
      }),
    ).toBeTruthy();
  });

  it("shows a PT-BR preview before bulk adding the full diet list", async () => {
    const user = userEvent.setup();

    render(<DietBrowser />);

    await user.click(screen.getByRole("button", { name: "Ver lista completa" }));

    expect(
      screen.getByRole("heading", { name: "Adicionar a colecao Emagrecimento" }),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Revise os itens abaixo antes de importar a selecao completa para a lista ativa.",
      ),
    ).toBeTruthy();
    expect(screen.getAllByText("Iogurte natural 170g").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Confirmar lista completa" })).toBeTruthy();
  });
});
