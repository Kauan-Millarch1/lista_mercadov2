const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatBrlFromCents(valueInCents: number) {
  return brlFormatter.format(valueInCents / 100);
}
