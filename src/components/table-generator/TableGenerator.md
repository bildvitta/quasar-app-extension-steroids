# TableGenerator

Componente para gerar tabela dinamicamente.

*obs: Este componente implementa o **QTable**: https://quasar.dev/vue-components/table#Introduction*

```
<qs-table-generator />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `columns` | `Array` | Sim | `[]` | Colunas da tabela. |
| `fields` | `[Array, Object]` | Não | `{}` | Campos da **API**. |
| `results` | `Array` | Não | | Resultados da **API**. |
| `rowKey` | `String` | Não | `name` | Propriedade de cada linha que define a chave exclusiva de cada linha. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `body-cell-${nomeDaColuna}` | { `row`: `Object` } | slot para acessar o conteudo do TD. |

## Eventos

> Sem eventos

## Exemplos
```js
const columns = [
  'startedAt',
  'finishedAt',
  'property',
  'ticketCategory',
  { align: 'right', name: 'actions' }
]

const fields = {
  status: {
    name: 'status',
    label: 'Status',
    default: '',
    type: 'text'
  },

  user: {
    name: 'user',
    label: 'Cliente',
    default: '',
    type: 'Select',
    optons: [
      { label: 'Ronaldo', value: 1 },
      { label: 'Cleyton', value: 2}
    ]
  }
}
```

```html
<qs-table-generator :columns="columns" :fields="fields" :results="results">
	<template v-slot:body-cell-property="{ row }">
	  Alterando conteudo e acessando valores pelo {{ row }}
	  "row" é um objeto.
	</template>
</qs-table-generator>
```