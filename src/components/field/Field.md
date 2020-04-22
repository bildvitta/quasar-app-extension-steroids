# Field

Componente coringa para a renderização de campos de formulário.

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
const field = {
  name:'comment',
  label:'Descrição',
  default:'',
  type:'textarea'
}

data () {
  return {
    value: 'Model com valor incial'
  }
}
```

```html
<qs-field v-model="value" :field="field" />
```