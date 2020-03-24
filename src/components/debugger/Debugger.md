# Debugger

Componente para inspecionar variáveis.

```
<qs-debugger />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `inspect` | `Array` | Sim | `[]` | Array a ser inspecionado. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```js
const inspect = [
  {
      name: 'user',
      label: 'Cliente',
      default: '',
      type: 'select'
  },

  {
      name:'comment',
      label:'Descrição',
      default:'',
      type:'textarea'
  }
/

```

```html
<qs-debugger :inspect="inspect" />
```