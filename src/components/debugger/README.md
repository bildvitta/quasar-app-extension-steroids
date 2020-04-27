# Debugger

Componente para inspecionar múltiplas variáveis reativas.

```
<qs-debugger />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `inspect` | `Array` | Sim | `[]` | Lista de variáveis que serão inspecionadas. |

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

  ['value 1', 'value 2', 'value 3']
]
```

```html
<qs-debugger :inspect="inspect" />
```