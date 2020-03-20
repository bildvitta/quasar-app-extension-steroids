# TableGenerator

Componente para gerar tabela dinamicamente via **API**.

```
<qs-list-view />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `columns` | `Array` | Sim | `[]` | Colunas da tabela. |
| `fields` | `[Array, Object]` | Não | `{}` | Campos da **API**. |
| `results` | `Array` | Não |  | Resultados da **API**. |
| `rowKey` | `String` | Não | `name` | Propriedade de cada linha que define a chave exclusiva de cada linha. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `body-cell-${nomeDaColuna}` |  | slot para acessar o conteudo do TD. |

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
```
fields e results vem da **API**.
```html
<qs-table-generator :columns="columns" :fields="fields" :results="results">
	<template v-slot:body-cell-property="{ row }">
	  Alterando conteudo e acessando valores pelo {{ row }}
	  "row" é um objeto.
	</template>
</qs-table-generator>
```