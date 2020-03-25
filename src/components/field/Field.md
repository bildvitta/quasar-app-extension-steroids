# Field

Componente responsavel por renderizar **campos**.

```
<qs-field />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `error` | `[Array, String]` | Não | | Mensagem de erro. |
| `field` | `Object` | Sim | `{}` | Campo a ser renderizado. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```js
// simulando field que vem da API.
const fields = {
  user: {
    name: 'user',
    label: 'Cliente',
    default: '',
    type: 'select'
  },

  comment: {
    name:'comment',
    label:'Descrição',
    default:'',
    type:'textarea'
  }
}
```

```html
<div v-for="(field, key) in fields" :key="key">
  <qs-field v-model="__VALOR_DO_MODEL__" :field="field" />
</div>
```