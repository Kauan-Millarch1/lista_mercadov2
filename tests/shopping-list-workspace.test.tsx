import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { AppShell } from "@/components/shared/app-shell";
import { useShoppingListStore } from "@/features/shopping-list/store/shopping-list-store";

describe("shopping-list workspace", () => {
  beforeEach(() => {
    useShoppingListStore.setState({
      items: [],
      guestName: "",
      hasCompletedWelcome: false,
      isMobileListOpen: false,
      hasHydratedProfile: true,
      hasHydratedList: true,
      estimatedTotalCents: 0,
    });
    window.localStorage.clear();
  });

  it("shows the first-use step and lets the user skip directly to the workspace", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    expect(
      screen.getByRole("heading", { name: "Como devo te chamar?" }),
    ).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));

    expect(screen.getByRole("heading", { name: "Lista ativa" })).toBeTruthy();
    expect(
      screen.getByText("Adicione um item inicial para transformar esta area na sua lista de compras."),
    ).toBeTruthy();
  });

  it("adds a starter item without reload and exposes the mobile drawer trigger", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(screen.getByRole("button", { name: "Adicionar Cafe em po" }));

    expect(screen.getAllByText("Cafe em po")).not.toHaveLength(0);
    expect(screen.getAllByText("R$ 18,90").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Abrir lista ativa" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Abrir lista ativa" }));

    expect(screen.getByRole("dialog", { name: "Lista ativa no celular" })).toBeTruthy();
  });

  it("adds catalog products directly from the browser and updates quantity and total without leaving the flow", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(
      screen.getByRole("button", { name: "Adicionar Agua mineral 1.5L a lista ativa" }),
    );

    expect(screen.getAllByText("Agua mineral 1.5L").length).toBeGreaterThan(0);
    expect(screen.getAllByText("R$ 3,49").length).toBeGreaterThan(0);
    expect(screen.getByText("Adicionado a lista ativa")).toBeTruthy();

    await user.click(
      screen.getByRole("button", { name: "Adicionar Agua mineral 1.5L a lista ativa" }),
    );

    expect(screen.getByText("Qtd. 2")).toBeTruthy();
    expect(screen.getAllByText("R$ 6,98").length).toBeGreaterThan(0);
  });

  it("surfaces smart suggestion blocks connected to the main planning flows", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));

    expect(screen.getByText("Sugestoes inteligentes")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Ver trilha sugerida" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Abrir no catalogo" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Adicionar item sugerido" }));

    expect(screen.getAllByText("Banana prata 1kg").length).toBeGreaterThan(0);
    expect(screen.getAllByText("R$ 9,80").length).toBeGreaterThan(0);
  });

  it("adds individual diet products directly from the diet browser and keeps repeated-add behavior", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(
      screen.getByRole("button", {
        name: "Adicionar Iogurte natural 170g da dieta a lista ativa",
      }),
    );

    expect(screen.getAllByText("Iogurte natural 170g").length).toBeGreaterThan(0);
    expect(screen.getAllByText("R$ 3,49").length).toBeGreaterThan(0);
    expect(screen.getByText("Adicionado a lista ativa")).toBeTruthy();

    await user.click(
      screen.getByRole("button", {
        name: "Adicionar Iogurte natural 170g da dieta a lista ativa",
      }),
    );

    expect(screen.getByText("Qtd. 2")).toBeTruthy();
    expect(screen.getAllByText("R$ 6,98").length).toBeGreaterThan(0);
  });

  it("previews and bulk adds a full diet collection while respecting merge behavior", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(
      screen.getByRole("button", {
        name: "Adicionar Iogurte natural 170g da dieta a lista ativa",
      }),
    );

    await user.click(screen.getByRole("button", { name: "Ver lista completa" }));

    expect(
      screen.getByRole("heading", { name: "Adicionar a colecao Emagrecimento" }),
    ).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.queryByRole("heading", { name: "Adicionar a colecao Emagrecimento" })).toBeNull();
    expect(screen.getAllByText("Iogurte natural 170g").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Ver lista completa" }));
    await user.click(screen.getByRole("button", { name: "Confirmar lista completa" }));

    expect(screen.getByText("Colecao adicionada a lista ativa.")).toBeTruthy();
    expect(screen.getByText("Qtd. 2")).toBeTruthy();
    expect(screen.getAllByText("Banana prata 1kg").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Brocolis unidade").length).toBeGreaterThan(0);
    expect(screen.getAllByText("R$ 52,68").length).toBeGreaterThan(0);
  }, 10000);

  it("validates the manual item form and accepts both priced and unpriced custom items", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(screen.getByRole("button", { name: "Abrir formulario manual" }));

    expect(document.activeElement).toBe(screen.getByLabelText("Nome do item"));

    await user.click(screen.getByRole("button", { name: "Adicionar item manual" }));

    expect(screen.getByText("Digite o nome do item para continuar.")).toBeTruthy();

    await user.type(screen.getByLabelText("Nome do item"), "Tempero caseiro");
    await user.type(screen.getByLabelText("Preco opcional"), "abc");
    await user.click(screen.getByRole("button", { name: "Adicionar item manual" }));

    expect(screen.getByText("Informe um preco valido ou deixe o campo em branco.")).toBeTruthy();

    await user.clear(screen.getByLabelText("Preco opcional"));
    await user.type(screen.getByLabelText("Preco opcional"), "12,90");
    await user.click(screen.getByRole("button", { name: "Adicionar item manual" }));

    expect(screen.getByText("Tempero caseiro foi adicionado com preco informado.")).toBeTruthy();
    expect(screen.getAllByText("Tempero caseiro").length).toBeGreaterThan(0);
    expect(screen.getAllByText("R$ 12,90").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Abrir formulario manual" }));
    await user.type(screen.getByLabelText("Nome do item"), "Tempero caseiro");
    await user.click(screen.getByRole("button", { name: "Adicionar item manual" }));

    expect(screen.getByText("Tempero caseiro foi adicionado a lista ativa.")).toBeTruthy();
    expect(screen.getAllByText("Tempero caseiro").length).toBeGreaterThan(0);
    expect(screen.getAllByText("R$ 25,80").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Abrir formulario manual" }));
    await user.type(screen.getByLabelText("Nome do item"), "Item sem preco");
    await user.click(screen.getByRole("button", { name: "Adicionar item manual" }));

    expect(screen.getByText("Item sem preco foi adicionado a lista ativa.")).toBeTruthy();
    expect(screen.getAllByText("Item sem preco").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Manual").length).toBeGreaterThan(0);
    expect(screen.getByText("Sem preco informado")).toBeTruthy();
    expect(screen.getByText("Total parcial")).toBeTruthy();
    expect(
      screen.getByText(
        "1 item(ns) ainda sem preco. O total atual considera apenas itens com valor informado.",
      ),
    ).toBeTruthy();
    expect(screen.getAllByText("R$ 25,80").length).toBeGreaterThan(0);
  }, 10000);

  it("lets the user cancel the manual form and stay in the same planning context", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(screen.getByRole("button", { name: "Abrir formulario manual" }));
    await user.type(screen.getByLabelText("Nome do item"), "Produto temporario");
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(screen.queryByLabelText("Nome do item")).toBeNull();
    expect(screen.getByRole("button", { name: "Abrir formulario manual" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Lista ativa" })).toBeTruthy();
  });

  it("keeps PT-BR labels and accessible focus targets in the core planning flow", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));

    const heroPrimaryAction = screen.getByRole("button", { name: "Adicionar primeiro item" });
    const viewListAction = screen.getByRole("button", { name: "Ver lista ativa" });
    const categoryActions = [
      screen.getByRole("button", { name: "Bebidas" }),
      screen.getByRole("button", { name: "Mercearia" }),
      screen.getByRole("button", { name: "Hortifruti" }),
      screen.getByRole("button", { name: "Laticinios e frios" }),
    ];
    const expectedSequence = [
      screen.getByRole("link", { name: "Inicio" }),
      screen.getByRole("link", { name: "Lista ativa" }),
      screen.getByRole("link", { name: "Catalogo" }),
      screen.getByRole("link", { name: "Dietas" }),
      screen.getByRole("link", { name: "Item manual" }),
      screen.getByRole("link", { name: "Sugestoes" }),
      heroPrimaryAction,
      viewListAction,
    ];

    for (const expectedElement of expectedSequence) {
      await user.tab();
      expect(document.activeElement).toBe(expectedElement);
    }

    expect(screen.getByText("Planejador de compras ativo")).toBeTruthy();
    expect(screen.getByText("Sugestoes iniciais")).toBeTruthy();
    expect(screen.getAllByText("R$ 0,00").length).toBeGreaterThan(0);

    for (let index = 0; index < 4; index += 1) {
      await user.tab();
    }

    expect(categoryActions).toContain(document.activeElement);
  });

  it("lets the user update quantity, remove items, and clear the current plan", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(screen.getByRole("button", { name: "Adicionar Cafe em po" }));
    await user.click(screen.getByRole("button", { name: "Adicionar Cafe em po" }));

    expect(screen.getByText("Qtd. 2")).toBeTruthy();
    expect(screen.getAllByText("R$ 37,80").length).toBeGreaterThan(0);

    const quantityInput = screen.getByLabelText("Quantidade de Cafe em po");

    fireEvent.change(quantityInput, { target: { value: "5" } });

    expect(screen.getByDisplayValue("5")).toBeTruthy();
    expect(screen.getAllByText("R$ 94,50").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Remover Cafe em po" }));

    expect(
      screen.getByText("Adicione um item inicial para transformar esta area na sua lista de compras."),
    ).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Adicionar Arroz integral" }));
    await user.click(screen.getByRole("button", { name: "Adicionar Agua mineral" }));

    expect(screen.getAllByText("Qtd. 1").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Limpar lista" }));

    expect(
      screen.getByText("Adicione um item inicial para transformar esta area na sua lista de compras."),
    ).toBeTruthy();
  });

  it("accepts an optional guest name without blocking access", async () => {
    const user = userEvent.setup();

    render(<AppShell />);

    await user.type(screen.getByLabelText("Seu nome"), "Kauan");
    await user.click(screen.getByRole("button", { name: "Continuar" }));

    expect(screen.getByText("Bem-vindo, Kauan")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Lista ativa" })).toBeTruthy();
  });

  it("restores the persisted list automatically after a new render", async () => {
    const user = userEvent.setup();

    const firstRender = render(<AppShell />);

    await user.click(screen.getByRole("button", { name: "Pular por agora" }));
    await user.click(screen.getByRole("button", { name: "Adicionar Cafe em po" }));
    await user.click(screen.getByRole("button", { name: "Adicionar Arroz integral" }));

    expect(window.localStorage.getItem("lista-de-mercado:shopping-list")).toContain(
      "cafe-em-po",
    );

    firstRender.unmount();

    await act(async () => {
      useShoppingListStore.setState({
        items: [],
        guestName: "",
        hasCompletedWelcome: true,
        isMobileListOpen: false,
        hasHydratedProfile: false,
        hasHydratedList: false,
        estimatedTotalCents: 0,
      });
    });

    render(<AppShell />);

    await waitFor(() => {
      expect(screen.getAllByText("Cafe em po").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Arroz integral").length).toBeGreaterThan(0);
      expect(screen.getAllByText("R$ 46,80").length).toBeGreaterThan(0);
    });
  });
});
