# Filters

Componente para gerar filtros dinamicamente e adicinar na query da **URL**.

```
<qs-filters />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `badges` | `Bollean` | Não | `true` | Habilita os badges para mostrar os filtros ativos. |
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `noFilterButton` | `Boolean` | Não | `false` | Remover botão do filtro. |
| `noSearch` | `Boolean` | Não | `false` | Remove campo de pesquisa. |
| `searchPlaceholder` | `String` | Não | `Pesquisar...` | Label do placeholder do campo de pesquisa. |
| `url` | `String` | Não | | Caso a entidade seja diferente do **endpoint** você pode passar uma **url**  especifica. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `search` | { `filter`: `Function` } | slot para campo de pesquisa. |
| `filter-button` | { `filter`: `Function` } | slot para do menu do filtro. |
| `default` | { `filter`: `Function`, `context`: `Object`, `filters`: `Object`, `removeFilter`: `Function` } | slot para do menu do filtro. |

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetch-success` | { `response`: `Object` } | Dispara quando a requição é feita com sucesso. |
| `fetch-error` | { `error`: `Object` } | Dispara quando a há falha na requisição. |

## Metodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `filter` | { `external`: `Object` } | metodo repassado para os slots para adicionar query externas. |

## Exemplos

```html
<qs-filters entity="posts" />
```