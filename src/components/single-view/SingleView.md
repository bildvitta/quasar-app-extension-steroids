# SingleView

Assim como o **ListView** este componente faz a requisão e retorna objeto baseado no **endpoint** e **id** passado, usada em "show" de páginas.

```
<qs-single-view />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `customId` | `[Numer, String]` | Não | `false` | Caso o **Id** da URL seja diferente do **id** do item a ser deletado, você pode passar um **id customizado**. |
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `url` | `String` | Não | | Caso a entidade seja diferente do **endpoint**, poderá usar esta propriedade para especificar qual é o endpoint. |
| `dialog` | `Boolean` | Não | `false` | usado para alterar a tag do componente caso use dentro de algum modal passa a ser `div` e não `QPage`. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `header` | { `fields`: `[Array, Object]`, `metadata`: `Object`, `results`: `Array`, `errors`: `[Array, Object]` } | slot para acessar o header. |
| `default` | { `fields`: `[Array, Object]`, `metadata`: `Object`, `results`: `Array`, `errors`: `[Array, Object]` } | |
| `footer` | | Slot para acessar o footer. |

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetch-success` | { `response`: `Object` } | Dispara quando a requição é feita com sucesso. |
| `fetch-error` | { `error`: `Object` } | Dispara quando a há falha na requisição. |

## Métodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetchSingle` | | Muito utilizado para atualizar lista de dados. |

## Exemplos

```html
<qs-single-view ref="listView" entity="posts">
  <template v-slot:header>
    Acessando headr
  </template>

  <template v-slot="{ fields, results }">
    Manipule seus dados aqui
  </template>

  <template v-slot:footer>
    Acessando footer
  </template>
</qs-single-view>
```