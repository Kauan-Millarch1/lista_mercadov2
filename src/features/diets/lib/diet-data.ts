import type { DietCategory, DietCollection } from "@/entities/diet/diet";

export const dietCategories: DietCategory[] = [
  {
    id: "diet-emagrecimento",
    slug: "emagrecimento",
    name: "Emagrecimento",
    description: "Sugestoes focadas em saciedade, rotina leve e planejamento com controle.",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "diet-hipertrofia",
    slug: "hipertrofia",
    name: "Hipertrofia",
    description: "Base com proteinas, carboidratos de apoio e itens para refeicoes reforcadas.",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "diet-low-carb",
    slug: "low-carb",
    name: "Low carb",
    description: "Colecao voltada a escolhas com menos foco em massas e graos refinados.",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "diet-vegetariana",
    slug: "vegetariana",
    name: "Vegetariana",
    description: "Sugestoes sem carne com variedade para cafe da manha, almoco e lanches.",
    sortOrder: 4,
    isActive: true,
  },
  {
    id: "diet-vegana",
    slug: "vegana",
    name: "Vegana",
    description: "Base vegetal para listas praticas com proteina, fibras e itens de apoio.",
    sortOrder: 5,
    isActive: true,
  },
];

export const dietCollections: DietCollection[] = [
  {
    id: "collection-emagrecimento-inicial",
    dietSlug: "emagrecimento",
    headline: "Comeco leve para a semana",
    summary: "Itens simples para montar refeicoes leves, lanches e cafe da manha com mais saciedade.",
    suggestedProducts: [
      { productSlug: "iogurte-natural-170g", rationale: "Ajuda em lanches rapidos com porcao controlada." },
      { productSlug: "aveia-em-flocos-500g", rationale: "Complementa cafe da manha e aumenta saciedade." },
      { productSlug: "banana-prata-1kg", rationale: "Fruta pratica para lanche e vitaminas." },
      { productSlug: "brocolis-unidade", rationale: "Vegetal versatil para refeicoes leves." },
      { productSlug: "peito-de-frango-1kg", rationale: "Proteina magra para almoco e jantar." },
    ],
  },
  {
    id: "collection-hipertrofia-inicial",
    dietSlug: "hipertrofia",
    headline: "Base proteica para ganho de massa",
    summary: "Proteinas e apoios energeticos para refeicoes mais reforcadas ao longo do dia.",
    suggestedProducts: [
      { productSlug: "peito-de-frango-1kg", rationale: "Proteina principal para preparo em quantidade." },
      { productSlug: "ovos-brancos-duzia", rationale: "Opcao versatil para cafe da manha e lanches." },
      { productSlug: "arroz-branco-5kg", rationale: "Fonte pratica de carboidrato para acompanhar proteinas." },
      { productSlug: "aveia-em-flocos-500g", rationale: "Apoio para vitaminas e refeicoes intermediarias." },
      { productSlug: "leite-integral-1l", rationale: "Complementa vitaminas e preparos proteicos." },
    ],
  },
  {
    id: "collection-low-carb-inicial",
    dietSlug: "low-carb",
    headline: "Selecao enxuta com menos carboidrato",
    summary: "Itens para priorizar proteinas, vegetais e gorduras de apoio na rotina.",
    suggestedProducts: [
      { productSlug: "ovos-brancos-duzia", rationale: "Base versatil para varias refeicoes low carb." },
      { productSlug: "queijo-mucarela-200g", rationale: "Complementa lanches e omeletes." },
      { productSlug: "alface-crespa-unidade", rationale: "Folha base para saladas e wraps." },
      { productSlug: "brocolis-unidade", rationale: "Acompanha pratos principais com praticidade." },
      { productSlug: "azeite-de-oliva-500ml", rationale: "Ajuda na finalizacao e preparo de saladas." },
    ],
  },
  {
    id: "collection-vegetariana-inicial",
    dietSlug: "vegetariana",
    headline: "Lista vegetariana para o dia a dia",
    summary: "Itens de origem vegetal e lacto-ovo para montar refeicoes completas sem carne.",
    suggestedProducts: [
      { productSlug: "ovos-brancos-duzia", rationale: "Proteina de preparo rapido para varias refeicoes." },
      { productSlug: "queijo-mucarela-200g", rationale: "Complementa lanches e pratos simples." },
      { productSlug: "feijao-carioca-1kg", rationale: "Base classica para refeicoes completas." },
      { productSlug: "tomate-1kg", rationale: "Ingrediente coringa para saladas e preparos." },
      { productSlug: "brocolis-unidade", rationale: "Amplia variedade de vegetais no planejamento." },
    ],
  },
  {
    id: "collection-vegana-inicial",
    dietSlug: "vegana",
    headline: "Comeco vegano com itens versateis",
    summary: "Selecao vegetal pensada para refeicoes simples, lanches e base de preparos.",
    suggestedProducts: [
      { productSlug: "feijao-carioca-1kg", rationale: "Ajuda a compor refeicoes com proteina vegetal." },
      { productSlug: "aveia-em-flocos-500g", rationale: "Base para cafe da manha e lanches." },
      { productSlug: "granola-tradicional-1kg", rationale: "Alternativa pratica para cafe da manha." },
      { productSlug: "banana-prata-1kg", rationale: "Fruta acessivel para lanches e vitaminas." },
      { productSlug: "hamburguer-vegetal-congelado", rationale: "Apoio rapido para refeicoes sem carne." },
    ],
  },
];
