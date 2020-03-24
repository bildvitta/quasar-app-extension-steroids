# Filters

Componente para gerar filtros dinamicamente vindos da **API**.

```
<qs-filters />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `badges` | `Bollean` | Não | `true` | Habilita os bades para mostrar os filtros ativos. |
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `noFilterButton` | `Boolean` | Não | `false` | Remover botão do filtro. |
| `noSearch` | `Boolean` | Não | `false` | Remove campo de pesquisa. |
| `searchPlaceholder` | `String` | Não | `Pesquisar...` | Label do placeholder do campo de pesquisa. |
| `url` | `String` | Não | | Caso a entidade seja diferente do **endpoint** você pode passar uma **url**  especifica. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `search` | escopo: `filter` tipo: `Function` | slot para campo de pesquisa. |
| `filter-button` | escopo: `filter` tipo: `Function` | slot para do menu do filtro. |
| `default` | (escopo: `filter` tipo: `Function`), (escopo: `context` tipo: `Object`), (escopo: `filters` tipo: `Object`), (escopo: `removeFilter` tipo: `Function`) | slot para do menu do filtro. |

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetch-success` | param: `response` / tipo: `Object` | Dispara quando a requição é feita com sucesso. |
| `fetch-error` | param: `error` / tipo: `Object` | Dispara quando a há falha na requisição. |

## Metodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `filter` | param: `external` / tipo: `Object` | metodo repassado para os slots para adicionar query externas. |

## Exemplos

```html
<qs-filters entity="posts" />
```