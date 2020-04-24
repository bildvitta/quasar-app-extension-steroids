# ListView

Este componente retorna uma lista de objetos baseado em uma requisição, já inclui o componente de Filtro e a paginação.

```
<qs-list-view />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `dialog` | `Boolean` | Não | `false` | usado para alterar a tag do componente caso use dentro de algum modal passa a ser `div` e não `QPage`. |
| `disableRefresh` | `Boolean` | Não | `false` | Desabilita o q-pull-to-refresh, normalmente usado junto com o **sortable**. |
| `entity` | `String` | Sim | | Entidade do `vuex`. |
| `noFilter` | `Bollean` | Não | `false` | Desabilita filtro. |
| `url` | `String` | Não | | Caso a entidade seja diferente do endpoint, poderá usar esta propriedade para especificar qual é o endpoint. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | { `fields`: `[Array, Object]`, `metadata`: `Object`, `results`: `Array` } | |
| `filter` | { `fields`: `[Array, Object]`, `metadata`: `Object`, `results`: `Array`, `entity`: `String`, `errors`: `[Array, Object]` } | slot para acessar o componente de filtro. |
| `footer` | | Slot para acessar o footer |
| `header` | { `fields`: `[Array, Object]`, `metadata`: `Object`, `results`: `Array` } | slot para acessar o header. |

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetch-error` | { `error`: `Object` } | Dispara quando a há falha na requisição. |
| `fetch-success` | { `response`: `Object` } | Dispara quando a requição é feita com sucesso. |

## Métodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetchList` | | Utilizado para atualizar lista de dados. |

## Exemplos

```html
<qs-list-view ref="listView" entity="posts">
  <template v-slot:header>
    Acessando header
  </template>

  <template v-slot:filter="{ entity }">
    Acessando filter
  </template>

  <template v-slot="{ fields, results }">
    Equivalente ao main
  </template>

  <template v-slot:footer>
    Acessando footer
  </template>
</qs-list-view>
```