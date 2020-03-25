# CheckboxGroup

Componente para agrupar checkbox, impementa [QOptionGroup](https://quasar.dev/vue-components/option-group#Usage) e [QCheckbox](https://quasar.dev/vue-components/checkbox#Introduction). Um bom uso desse componente é oferecer um conjunto de opções ou configurações para ativar e desativar.

```
<qs-checkbox-group />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `options` | `Array` | Não | `[]` | Lista de objetos com as chaves `label` (rótulo do campo) e `value` (valor primário do campo). Aceita a criação de árvore de opções utilizando a chave children, que deve conter um objeto de estrutura similar. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos
```js
const options = [
  {
    label: 'Exemplo checkbox',
    children: [
      { label: 'Exemplo checkbox children', value: '1' },
      { label: 'Exemplo checkbox children 2', value: '2' }
    ]
  }
]
```

```html
<qs-checkbox-group v-model="values" :options="options" />
```