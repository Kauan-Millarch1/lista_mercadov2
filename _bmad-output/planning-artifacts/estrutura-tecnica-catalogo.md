# Estrutura Tecnica do Catalogo MVP

## Objetivo

Este documento traduz o artefato de produtos do MVP para uma estrutura tecnica de dados pronta para orientar schema, migrations, seeds e implementacao das stories de catalogo e dietas.

## Escopo

Esta proposta cobre:

- categorias de catalogo
- produtos
- dietas
- relacao entre dietas e produtos

Nao cobre nesta etapa:

- listas de compras do usuario
- itens da lista de compras
- historico de preco por mercado
- marcas, fabricantes ou SKUs comerciais reais

## Principios de Modelagem

- O MVP precisa de estrutura simples, legivel e facil de semear.
- O catalogo deve aceitar produtos sem depender de integracao externa.
- Dietas devem se relacionar com produtos sem duplicar dados de produto.
- O sistema deve permitir evolucao futura para subcategorias, marcas e variacoes regionais.

## Tabelas Propostas

### `categories`

Finalidade: organizar o catalogo por areas principais do mercado.

Campos:

- `id`: `string` chave primaria, gerada com `cuid()` no Prisma
- `slug`: `text` unico, obrigatorio
- `name`: `text` obrigatorio
- `sort_order`: `int` obrigatorio
- `is_active`: `boolean` obrigatorio, padrao `true`
- `created_at`: `timestamp` obrigatorio
- `updated_at`: `timestamp` obrigatorio

Restricoes:

- `slug` unico
- `name` idealmente unico no MVP

Categorias iniciais:

- `bebidas`
- `hortifruti`
- `carnes-e-peixes`
- `laticinios-e-frios`
- `padaria`
- `mercearia`
- `congelados`
- `limpeza`
- `higiene-pessoal`
- `utilidades-domesticas`
- `itens-de-cozinha`

### `products`

Finalidade: representar produtos exibidos no catalogo e usados nas dietas.

Campos:

- `id`: `string` chave primaria, gerada com `cuid()` no Prisma
- `slug`: `text` unico, obrigatorio
- `name`: `text` obrigatorio
- `short_description`: `text` obrigatorio
- `category_id`: `string` obrigatorio, chave estrangeira para `categories.id`
- `unit_label`: `text` obrigatorio
- `average_price`: `numeric(10,2)` opcional
- `origin`: `text` obrigatorio
- `is_active`: `boolean` obrigatorio, padrao `true`
- `created_at`: `timestamp` obrigatorio
- `updated_at`: `timestamp` obrigatorio

Restricoes:

- `slug` unico
- `origin` limitado a: `catalogo`, `dieta`, `ambos`
- `average_price` maior ou igual a zero quando preenchido

Observacoes:

- `average_price` pode ser nulo em evolucoes futuras, mas para a base atual quase todos os produtos devem nascer preenchidos.
- `unit_label` e texto curto para exibicao, por exemplo `1kg`, `500g`, `1L`, `unidade`, `duzia`.
- `origin` ajuda a controlar exposicao inicial do produto em fluxos de catalogo e dieta.
- No MVP, cada produto pertence a uma categoria principal. Se surgir necessidade futura de multiplas categorias por produto, isso deve ser introduzido com uma tabela de relacao dedicada.

### `diets`

Finalidade: representar grupos de planejamento alimentar disponiveis na area de dietas.

Campos:

- `id`: `string` chave primaria, gerada com `cuid()` no Prisma
- `slug`: `text` unico, obrigatorio
- `name`: `text` obrigatorio
- `short_description`: `text` obrigatorio
- `sort_order`: `int` obrigatorio
- `is_active`: `boolean` obrigatorio, padrao `true`
- `created_at`: `timestamp` obrigatorio
- `updated_at`: `timestamp` obrigatorio

Restricoes:

- `slug` unico

Dietas iniciais:

- `emagrecimento`
- `hipertrofia`
- `low-carb`
- `vegetariana`
- `vegana`

### `diet_products`

Finalidade: relacionar produtos a dietas sem duplicar dados.

Campos:

- `id`: `string` chave primaria, gerada com `cuid()` no Prisma
- `diet_id`: `string` obrigatorio, chave estrangeira para `diets.id`
- `product_id`: `string` obrigatorio, chave estrangeira para `products.id`
- `sort_order`: `int` obrigatorio
- `is_featured`: `boolean` obrigatorio, padrao `true`
- `created_at`: `timestamp` obrigatorio

Restricoes:

- combinacao unica de `diet_id` + `product_id`

Observacoes:

- `sort_order` permite controlar a ordem da dieta sem depender de ordenacao alfabetica.
- `is_featured` pode ser usado no futuro para destacar produtos principais de uma dieta.

## Relacionamentos

- Uma `category` possui muitos `products`
- Um `product` pertence a uma `category`
- Uma `diet` possui muitos `products` por meio de `diet_products`
- Um `product` pode pertencer a muitas `diets` por meio de `diet_products`

## Decisoes Tecnicas Recomendadas

### 1. Nao criar tabela separada de unidades no MVP

Motivo:

- `unit_label` em texto simples resolve bem a fase inicial
- evita sobreengenharia
- pode virar tabela normalizada depois se surgir necessidade

### 2. Nao salvar `dietas_relacionadas` direto em `products`

Motivo:

- isso duplicaria a mesma relacao ja coberta por `diet_products`
- a relacao N para N deve existir de forma normalizada

### 3. Manter `average_price` no proprio produto no MVP

Motivo:

- o app precisa apenas de preco medio estimado
- ainda nao existe requisito de historico por mercado, data ou regiao

### 4. Usar `slug` como referencia de seed e rotas internas

Motivo:

- facilita importacao da base do documento de produtos
- reduz dependencia do nome exibido

## Exemplo de Schema Conceitual

```text
categories
  id (string/cuid) PK
  slug (text) UNIQUE
  name (text)
  sort_order (int)
  is_active (boolean)
  created_at
  updated_at

products
  id (string/cuid) PK
  slug (text) UNIQUE
  name (text)
  short_description (text)
  category_id (string) FK -> categories.id
  unit_label (text)
  average_price (numeric(10,2))
  origin (text)
  is_active (boolean)
  created_at
  updated_at

diets
  id (string/cuid) PK
  slug (text) UNIQUE
  name (text)
  short_description (text)
  sort_order (int)
  is_active (boolean)
  created_at
  updated_at

diet_products
  id (string/cuid) PK
  diet_id (string) FK -> diets.id
  product_id (string) FK -> products.id
  sort_order (int)
  is_featured (boolean)
  created_at
  UNIQUE (diet_id, product_id)
```

## Mapeamento Direto com o Documento de Produtos

Origem: [produtos-mvp.md](C:/Users/Kauan/Downloads/Projetos/Projeto%20Lista%20de%20mercado/_bmad-output/planning-artifacts/produtos-mvp.md)

- `slug` -> `products.slug`
- `nome` -> `products.name`
- `descricao_curta` -> `products.short_description`
- `categoria` -> associacao com `categories`
- `unidade` -> `products.unit_label`
- `preco_medio` -> `products.average_price`
- `origem` -> `products.origin`
- `dietas_relacionadas` -> registros em `diet_products`

## Ordem Recomendada de Implementacao

1. Criar seed estatico de `categories`
2. Criar seed estatico de `diets`
3. Criar schema de `products`
4. Importar os produtos do documento de catalogo MVP
5. Gerar a relacao `diet_products`
6. Validar se todos os produtos com `origem = ambos` aparecem corretamente nos dois fluxos

## Marcacao de Execucao nas Stories

- A criacao inicial da seed de `categories` e `products` deve acontecer na Story 2.1.
- A criacao inicial da seed de `diets` e `diet_products` deve acontecer na Story 4.1.
- Antes dessas stories, a seed nao e obrigatoria para planejamento, apenas para implementacao e validacao dos fluxos.

## Riscos se Sair Diferente Desta Estrutura

- Se `dietas_relacionadas` ficar como texto dentro de `products`, o filtro de dieta tende a ficar fragil.
- Se `nome` virar identificador, qualquer ajuste editorial quebra seed ou relacao.
- Se `category` ficar texto livre em `products`, o catalogo perde consistencia de navegacao e ordenacao.

## Proximo Passo Sugerido

Se voce quiser, o proximo artefato que posso criar e um pseudo-schema em formato Prisma, ja alinhado com essa estrutura.
