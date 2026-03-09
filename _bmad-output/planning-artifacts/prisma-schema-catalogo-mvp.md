# Pseudo-Schema Prisma do Catalogo MVP

## Objetivo

Este documento apresenta uma versao de pseudo-schema em Prisma para a base de catalogo MVP.
Ele serve como ponte entre o planejamento funcional e a implementacao tecnica.

## Premissas

- O schema abaixo foca apenas no dominio de catalogo e dietas.
- Campos de auditoria usam `DateTime`.
- IDs usam `String` com `@default(cuid())` para simplificar o MVP.
- Cada produto pertence a uma categoria principal no MVP.
- O schema pode evoluir depois para suporte multi-categoria se isso se tornar um requisito real.

## Pseudo-Schema

```prisma
enum ProductOrigin {
  catalogo
  dieta
  ambos
}

model Category {
  id        String    @id @default(cuid())
  slug      String    @unique
  name      String    @unique
  sortOrder Int
  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  products  Product[]

  @@map("categories")
}

model Product {
  id               String        @id @default(cuid())
  slug             String        @unique
  name             String
  shortDescription String
  categoryId       String
  unitLabel        String
  averagePrice     Decimal?      @db.Decimal(10, 2)
  origin           ProductOrigin
  isActive         Boolean       @default(true)
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  category         Category      @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  dietProducts     DietProduct[]

  @@index([categoryId])
  @@index([isActive])
  @@index([origin])
  @@map("products")
}

model Diet {
  id               String        @id @default(cuid())
  slug             String        @unique
  name             String        @unique
  shortDescription String
  sortOrder        Int
  isActive         Boolean       @default(true)
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  dietProducts     DietProduct[]

  @@index([isActive])
  @@map("diets")
}

model DietProduct {
  id         String    @id @default(cuid())
  dietId     String
  productId  String
  sortOrder  Int
  isFeatured Boolean   @default(true)
  createdAt  DateTime  @default(now())

  diet       Diet      @relation(fields: [dietId], references: [id], onDelete: Cascade)
  product    Product   @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([dietId, productId])
  @@index([dietId, sortOrder])
  @@index([productId])
  @@map("diet_products")
}
```

## Decisoes Embutidas no Schema

### `ProductOrigin` como enum

Uso:

- evita texto livre para origem do produto
- protege consistencia entre catalogo, dieta e ambos

### `Category.name` e `Diet.name` unicos no MVP

Uso:

- evita duplicacoes sem necessidade
- simplifica seeds iniciais e consultas administrativas

### `averagePrice` opcional

Uso:

- deixa o schema pronto para itens futuros sem preco
- combina com a regra funcional de nao travar a experiencia por ausencia de preco

### `DietProduct` como tabela de relacao explicita

Uso:

- suporta ordenacao por dieta
- permite destaque de itens com `isFeatured`
- evita guardar listas de dieta como texto dentro de `products`

## Seeds Recomendados

### Seed de `Category`

Criar registros para:

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

### Seed de `Diet`

Criar registros para:

- `emagrecimento`
- `hipertrofia`
- `low-carb`
- `vegetariana`
- `vegana`

### Seed de `Product`

Fonte:

- [produtos-mvp.md](C:/Users/Kauan/Downloads/Projetos/Projeto%20Lista%20de%20mercado/_bmad-output/planning-artifacts/produtos-mvp.md)

Mapeamento:

- `slug` -> `slug`
- `nome` -> `name`
- `descricao_curta` -> `shortDescription`
- `categoria` -> busca de `categoryId`
- `unidade` -> `unitLabel`
- `preco_medio` -> `averagePrice`
- `origem` -> `origin`

### Seed de `DietProduct`

Regra:

- para cada item listado em `dietas_relacionadas`, criar um registro em `diet_products`

## Consultas que o Schema Ja Suporta Bem

- listar categorias ativas por ordem
- listar produtos ativos por categoria
- listar produtos ativos por dieta
- montar cards com nome, descricao curta, unidade e preco medio
- adicionar ao fluxo de dieta apenas produtos com relacao valida

## Pontos de Evolucao Futura

- adicionar `imageUrl` em `Product`
- adicionar `brand` ou `brandName` em `Product`
- adicionar subcategorias
- criar historico de preco por regiao, mercado ou data
- separar recomendacao editorial de relacao nutricional de dieta

## Observacoes para Story de Implementacao

- Story 2.1 pode implementar `Category` e `Product`
- Story 2.3 consome diretamente `name`, `shortDescription`, `unitLabel` e `averagePrice`
- Story 4.1 implementa `Diet` e `DietProduct`
- Story 4.2 e Story 4.3 passam a consultar dietas e produtos relacionados sem gambiarra estrutural

## Proximo Passo Sugerido

Se voce quiser, o proximo artefato que posso criar e uma proposta de seed em JSON ou TypeScript pronta para alimentar Prisma.
