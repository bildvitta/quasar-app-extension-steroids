# Sortable

Este componente é para ordenar elementos quando arrastados, o mesmo usa a biblioteca **SortableJS**: https://github.com/SortableJS/Sortable


```
<qs-sortable />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `results` | `Array` | Não | `[]` | Lista de elementos há serem ordenados. |
| `tag` | `String` | Não | `div` | Tag do componente. |
| `entity` | `String` | Não | | Entidade da API para usar como endpoint. |
| `url` | `String` | Não | | Caso a entidade seja diferente do endpoint, poderá usar esta propriedade para especificar qual é o endpoint. |
| `options` | `Object` | Não | `{ animation: 500 }` | Opções da biblioteca SortableJS. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | { `sorted`: `Object` } | Retorna o array com os dados ordenados.

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `sort` | { `event`: `Object` } | Dispara evento nativo da bibliteca, que é acionado quando temrina de ordenar o elemento. |
| `sort` | { `response`: `Object` } | Dispara quando termina de ordenar e a API retorna sucesso. |


## Exemplos

```js
const results = [
  { photo: '/example.jpg', id: '1w312w' },
  { photo: '/example2.jpg', id: '2w4312w' }
]
```

```html
<qs-sortable :result="result" entity="photo" :options="{ animation: 600 }">
  <div v-for="result in results" :key="result.id"> <img :href="result.photo" /></div>
</qs-sortable>
```

Caso você tenha a necessidade de mostar os index atualizados, utilize:

```html
<qs-sortable :result="result" entity="photo" :options="{ animation: 600 }">
  <template v-slot="{ sorted }">
    <div v-for="result in sorted" :key="result.id"> <img :href="result.photo" /></div>
  </template>
</qs-sortable>
```
