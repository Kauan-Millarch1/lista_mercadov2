import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CatalogBrowser } from "@/features/catalog/components/catalog-browser";

describe("catalog browser", () => {
  it("renders PT-BR category navigation and updates the visible area without reload", async () => {
    const user = userEvent.setup();

    render(<CatalogBrowser />);

    expect(screen.getByRole("heading", { name: "Navegue pelas areas do mercado" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Bebidas" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Mercearia" }));

    expect(screen.getByRole("button", { name: "Mercearia", pressed: true })).toBeTruthy();
    expect(screen.getAllByText("Mercearia").length).toBeGreaterThan(0);
    expect(screen.getByText("Leitura rapida")).toBeTruthy();
    expect(screen.getByText("Mostrando 8 produto(s) em Mercearia.")).toBeTruthy();
    expect(screen.getByText("Arroz branco 5kg")).toBeTruthy();
    expect(screen.getByText("Cafe em po 500g")).toBeTruthy();
    expect(screen.getAllByText("R$ 29,90").length).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", { name: /Adicionar .* a lista ativa/i }).length,
    ).toBeGreaterThan(0);
  });

  it("keeps the browsing model accessible on mobile through the category select", async () => {
    const user = userEvent.setup();

    render(<CatalogBrowser />);

    await user.selectOptions(screen.getByLabelText("Trocar area"), "hortifruti");

    expect(screen.getByRole("option", { name: "Hortifruti" }).selected).toBe(true);
    expect(screen.getByText("Banana prata 1kg")).toBeTruthy();
    expect(screen.getByText("R$ 9,80")).toBeTruthy();
    expect(screen.getByText("Mostrando 5 produto(s) em Hortifruti.")).toBeTruthy();
    expect(
      screen
        .getByRole("button", { name: "Adicionar Banana prata 1kg a lista ativa" }),
    ).toBeTruthy();
  });
});
