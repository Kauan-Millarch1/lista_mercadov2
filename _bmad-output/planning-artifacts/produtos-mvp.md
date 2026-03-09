# Catalogo MVP de Produtos

## Objetivo

Este documento define uma base inicial de produtos para o MVP do Projeto Lista de mercado.
Ele serve como referencia para modelagem de dados, seeds, UX de catalogo, cards de produto, dietas e stories de implementacao.

## Campos Definidos

- `slug`: identificador estavel e unico para seed, banco e relacoes
- `nome`: nome exibido ao usuario em PT-BR
- `descricao_curta`: texto breve para cards e sugestoes
- `categoria`: area principal do mercado
- `unidade`: unidade de referencia exibida no catalogo
- `preco_medio`: valor medio estimado em BRL para exibicao inicial
- `dietas_relacionadas`: dietas em que o produto pode aparecer como sugestao
- `origem`: onde o produto deve aparecer no MVP (`catalogo`, `dieta`, `ambos`)

## Categorias MVP

- bebidas
- hortifruti
- carnes e peixes
- laticinios e frios
- padaria
- mercearia
- congelados
- limpeza
- higiene pessoal
- utilidades domesticas
- itens de cozinha

## Dietas MVP

- emagrecimento
- hipertrofia
- low carb
- vegetariana
- vegana

## Regras de Uso

- `preco_medio` e apenas uma referencia inicial de catalogo, nao um preco em tempo real.
- Um produto pode ter zero, uma ou varias dietas relacionadas.
- Produtos com `origem = ambos` podem aparecer tanto no catalogo quanto em secoes de dieta.
- A tabela `Base Inicial de Produtos` e a fonte principal de verdade para produtos e relacoes com dietas.
- A secao `Dietas para Uso Inicial` deve ser tratada como visao operacional derivada da tabela principal.
- Esta base pode ser usada como semente inicial e refinada depois por regiao, marca, unidade ou faixa de preco.

## Base Inicial de Produtos

| slug | nome | descricao_curta | categoria | unidade | preco_medio | dietas_relacionadas | origem |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| arroz-branco-5kg | Arroz branco 5kg | Base tradicional para refeicoes do dia a dia. | mercearia | 5kg | 29.90 | vegetariana, vegana | catalogo |
| feijao-carioca-1kg | Feijao carioca 1kg | Item essencial para combinacoes classicas brasileiras. | mercearia | 1kg | 8.90 | emagrecimento, vegetariana, vegana | catalogo |
| macarrao-espaguete-500g | Macarrao espaguete 500g | Massa pratica para almocos e jantares rapidos. | mercearia | 500g | 5.49 | vegetariana, vegana | catalogo |
| aveia-em-flocos-500g | Aveia em flocos 500g | Boa opcao para cafe da manha e lanches leves. | mercearia | 500g | 7.90 | emagrecimento, vegetariana, vegana | ambos |
| granola-tradicional-1kg | Granola tradicional 1kg | Mistura crocante para cafe da manha e snacks. | mercearia | 1kg | 18.90 | emagrecimento, vegetariana | ambos |
| cafe-em-po-500g | Cafe em po 500g | Bebida basica para a rotina da casa. | mercearia | 500g | 17.40 | vegetariana, vegana | catalogo |
| acucar-refinado-1kg | Acucar refinado 1kg | Ingrediente comum para bebidas e preparos doces. | mercearia | 1kg | 4.79 | vegetariana, vegana | catalogo |
| oleo-de-soja-900ml | Oleo de soja 900ml | Oleo versatil para preparo diario. | mercearia | 900ml | 7.99 | vegetariana, vegana | catalogo |
| azeite-de-oliva-500ml | Azeite de oliva 500ml | Gordura de apoio para saladas e finalizacao. | mercearia | 500ml | 29.90 | emagrecimento, low carb, vegetariana, vegana | ambos |
| molho-de-tomate-340g | Molho de tomate 340g | Complemento pratico para massas e refogados. | mercearia | 340g | 3.99 | vegetariana, vegana | catalogo |
| leite-integral-1l | Leite integral 1L | Item base para bebidas, vitaminas e receitas. | laticinios e frios | 1L | 6.40 | hipertrofia, vegetariana | ambos |
| iogurte-natural-170g | Iogurte natural 170g | Opcao leve para cafe da manha ou lanche. | laticinios e frios | 170g | 3.49 | emagrecimento, hipertrofia, low carb, vegetariana | ambos |
| queijo-mucarela-200g | Queijo mucarela 200g | Laticinio versatil para lanches e preparos rapidos. | laticinios e frios | 200g | 11.90 | hipertrofia, low carb, vegetariana | ambos |
| requeijao-200g | Requeijao 200g | Creme pratico para cafe da manha e lanches. | laticinios e frios | 200g | 8.50 | low carb, vegetariana | ambos |
| presunto-200g | Presunto 200g | Frio comum para sanduiches e combinacoes simples. | laticinios e frios | 200g | 9.90 | hipertrofia, low carb | catalogo |
| ovos-brancos-duzia | Ovos brancos duzia | Fonte acessivel de proteina para varias refeicoes. | laticinios e frios | duzia | 14.90 | emagrecimento, hipertrofia, low carb, vegetariana | ambos |
| pao-frances-1kg | Pao frances 1kg | Item tradicional de padaria para consumo diario. | padaria | 1kg | 16.90 | vegetariana, vegana | catalogo |
| pao-de-forma-integral | Pao de forma integral | Alternativa pratica para cafe da manha e lanches. | padaria | unidade | 9.90 | emagrecimento, vegetariana, vegana | ambos |
| torrada-integral | Torrada integral | Opcao seca para lanches leves e acompanhamentos. | padaria | unidade | 6.99 | emagrecimento, vegetariana, vegana | catalogo |
| bolo-simples | Bolo simples | Produto de padaria para consumo ocasional. | padaria | unidade | 14.90 | vegetariana | catalogo |
| banana-prata-1kg | Banana prata 1kg | Fruta popular para lanche rapido e vitaminas. | hortifruti | 1kg | 9.80 | emagrecimento, vegetariana, vegana | ambos |
| maca-gala-1kg | Maca gala 1kg | Fruta pratica para consumo ao longo do dia. | hortifruti | 1kg | 11.90 | emagrecimento, vegetariana, vegana | ambos |
| mamao-papaia-unidade | Mamao papaia unidade | Fruta comum para cafe da manha e lanches leves. | hortifruti | unidade | 8.90 | emagrecimento, vegetariana, vegana | ambos |
| abacate-hass-unidade | Abacate hass unidade | Fruta cremosa usada em dietas de saciedade. | hortifruti | unidade | 12.90 | emagrecimento, low carb, vegetariana, vegana | ambos |
| alface-crespa-unidade | Alface crespa unidade | Folha base para saladas e acompanhamentos. | hortifruti | unidade | 3.99 | emagrecimento, low carb, vegetariana, vegana | ambos |
| tomate-1kg | Tomate 1kg | Ingrediente coringa para saladas e preparos. | hortifruti | 1kg | 8.49 | emagrecimento, low carb, vegetariana, vegana | ambos |
| cebola-1kg | Cebola 1kg | Item base para refogados e receitas salgadas. | hortifruti | 1kg | 6.99 | vegetariana, vegana | catalogo |
| cenoura-1kg | Cenoura 1kg | Legume versatil para saladas e cozidos. | hortifruti | 1kg | 7.49 | emagrecimento, vegetariana, vegana | catalogo |
| batata-inglesa-1kg | Batata inglesa 1kg | Legume tradicional para variados preparos. | hortifruti | 1kg | 6.90 | vegetariana, vegana | catalogo |
| brocolis-unidade | Brocolis unidade | Vegetal usado em refeicoes leves e funcionais. | hortifruti | unidade | 6.50 | emagrecimento, low carb, vegetariana, vegana | ambos |
| peito-de-frango-1kg | Peito de frango 1kg | Proteina magra para planejamento de refeicoes. | carnes e peixes | 1kg | 21.50 | emagrecimento, hipertrofia, low carb | ambos |
| carne-moida-bovina-1kg | Carne moida bovina 1kg | Proteina versatil para almoco e jantar. | carnes e peixes | 1kg | 34.90 | hipertrofia, low carb | catalogo |
| file-de-salmao-500g | File de salmao 500g | Proteina premium para refeicoes balanceadas. | carnes e peixes | 500g | 39.90 | emagrecimento, hipertrofia, low carb | ambos |
| tilapia-file-500g | Tilapia file 500g | Peixe leve para preparos simples do dia a dia. | carnes e peixes | 500g | 24.90 | emagrecimento, hipertrofia, low carb | ambos |
| atum-em-lata | Atum em lata | Proteina pratica para lanches e saladas. | carnes e peixes | unidade | 8.90 | emagrecimento, hipertrofia, low carb | ambos |
| linguica-toscana-1kg | Linguica toscana 1kg | Proteina para churrasco e refeicoes especificas. | carnes e peixes | 1kg | 19.90 | low carb | catalogo |
| agua-mineral-15l | Agua mineral 1.5L | Bebida essencial para consumo diario. | bebidas | 1.5L | 3.49 | emagrecimento, hipertrofia, low carb, vegetariana, vegana | catalogo |
| suco-integral-uva-1l | Suco integral uva 1L | Bebida pronta para refeicoes e lanches. | bebidas | 1L | 12.90 | vegetariana, vegana | catalogo |
| refrigerante-cola-2l | Refrigerante cola 2L | Bebida popular para consumo ocasional. | bebidas | 2L | 10.99 |  | catalogo |
| agua-de-coco-1l | Agua de coco 1L | Bebida leve para hidratacao e rotina ativa. | bebidas | 1L | 11.90 | emagrecimento, hipertrofia, vegetariana, vegana | ambos |
| cha-verde-1l | Cha verde 1L | Bebida associada a rotinas leves e funcionais. | bebidas | 1L | 6.90 | emagrecimento, vegetariana, vegana | ambos |
| pizza-congelada | Pizza congelada | Refeicao pratica para consumo ocasional. | congelados | unidade | 17.90 | vegetariana | catalogo |
| legumes-congelados-300g | Legumes congelados 300g | Mistura pronta para agilizar refeicoes. | congelados | 300g | 9.90 | emagrecimento, vegetariana, vegana | ambos |
| file-de-frango-congelado-1kg | File de frango congelado 1kg | Opcao pratica de proteina para o freezer. | congelados | 1kg | 19.90 | hipertrofia, low carb | catalogo |
| hamburguer-vegetal-congelado | Hamburguer vegetal congelado | Alternativa sem carne para lanches e refeicoes. | congelados | unidade | 18.90 | vegetariana, vegana | ambos |
| detergente-liquido-500ml | Detergente liquido 500ml | Item basico para lavagem da louca. | limpeza | 500ml | 2.99 |  | catalogo |
| sabao-em-po-16kg | Sabao em po 1.6kg | Produto comum para lavagem de roupas. | limpeza | 1.6kg | 18.90 |  | catalogo |
| agua-sanitaria-1l | Agua sanitaria 1L | Produto de limpeza para uso domestico. | limpeza | 1L | 4.49 |  | catalogo |
| desinfetante-2l | Desinfetante 2L | Item para limpeza e perfumacao de ambientes. | limpeza | 2L | 7.90 |  | catalogo |
| papel-higienico-12-rolos | Papel higienico 12 rolos | Item essencial de higiene para reposicao. | higiene pessoal | 12 rolos | 18.90 |  | catalogo |
| creme-dental-90g | Creme dental 90g | Produto basico para higiene bucal. | higiene pessoal | 90g | 4.99 |  | catalogo |
| shampoo-350ml | Shampoo 350ml | Produto recorrente de cuidado pessoal. | higiene pessoal | 350ml | 14.90 |  | catalogo |
| sabonete-unidade | Sabonete unidade | Item simples para higiene pessoal diaria. | higiene pessoal | unidade | 2.49 |  | catalogo |
| esponja-multiuso-4-unidades | Esponja multiuso 4 unidades | Utilitario para limpeza da cozinha. | utilidades domesticas | 4 unidades | 5.49 |  | catalogo |
| saco-de-lixo-30l | Saco de lixo 30L | Consumivel domestico para descarte diario. | utilidades domesticas | 30L | 12.90 |  | catalogo |
| pano-multiuso | Pano multiuso | Apoio para limpeza e manutencao da casa. | utilidades domesticas | unidade | 7.49 |  | catalogo |
| papel-aluminio-75m | Papel aluminio 7.5m | Item de apoio para preparo e conservacao. | itens de cozinha | 7.5m | 6.90 |  | catalogo |
| filme-pvc-15m | Filme PVC 15m | Material para armazenar e proteger alimentos. | itens de cozinha | 15m | 7.90 |  | catalogo |
| filtro-de-cafe-103 | Filtro de cafe 103 | Item de cozinha para preparo de cafe. | itens de cozinha | unidade | 5.90 |  | catalogo |

## Dietas para Uso Inicial

### Emagrecimento

- Aveia em flocos 500g
- Granola tradicional 1kg
- Banana prata 1kg
- Maca gala 1kg
- Mamao papaia unidade
- Abacate hass unidade
- Alface crespa unidade
- Tomate 1kg
- Brocolis unidade
- Peito de frango 1kg
- File de salmao 500g
- Tilapia file 500g
- Atum em lata
- Agua de coco 1L
- Cha verde 1L

### Hipertrofia

- Leite integral 1L
- Iogurte natural 170g
- Ovos brancos duzia
- Peito de frango 1kg
- File de salmao 500g
- Tilapia file 500g
- Atum em lata
- Agua de coco 1L

### Low Carb

- Azeite de oliva 500ml
- Iogurte natural 170g
- Queijo muçarela 200g
- Requeijao 200g
- Ovos brancos duzia
- Abacate hass unidade
- Alface crespa unidade
- Tomate 1kg
- Brocolis unidade
- Peito de frango 1kg
- Carne moida bovina 1kg
- File de salmao 500g
- Tilapia file 500g
- Atum em lata
- Linguica toscana 1kg

### Vegetariana

- Arroz branco 5kg
- Feijao carioca 1kg
- Aveia em flocos 500g
- Granola tradicional 1kg
- Leite integral 1L
- Iogurte natural 170g
- Queijo muçarela 200g
- Ovos brancos duzia
- Pao de forma integral
- Banana prata 1kg
- Maca gala 1kg
- Mamao papaia unidade
- Abacate hass unidade
- Alface crespa unidade
- Tomate 1kg
- Brocolis unidade
- Legumes congelados 300g
- Hamburguer vegetal congelado

### Vegana

- Arroz branco 5kg
- Feijao carioca 1kg
- Macarrao espaguete 500g
- Aveia em flocos 500g
- Azeite de oliva 500ml
- Pao de forma integral
- Banana prata 1kg
- Maca gala 1kg
- Mamao papaia unidade
- Abacate hass unidade
- Alface crespa unidade
- Tomate 1kg
- Brocolis unidade
- Legumes congelados 300g
- Hamburguer vegetal congelado
- Agua de coco 1L
- Cha verde 1L

## Decisoes Ainda em Aberto

- Revisar se produtos de limpeza, higiene e utilidades entram no mesmo fluxo de dieta ou ficam sempre fora das sugestoes.
- Ajustar precos medios por cidade, rede de mercado ou faixa economica.
- Validar se o catalogo inicial deve ter marcas genericas ou produtos neutros sem marca.

## Recomendacao para Implementacao

Ordem sugerida para transformar esta base em produto:

1. Criar modelo `products` com os campos deste documento.
2. Criar modelo `diets` e tabela de relacao `diet_products`.
3. Implementar seed inicial a partir desta lista.
4. Usar Story 2.1 para categorias e produtos base.
5. Usar Story 4.1 para dietas e relacoes com produtos.
