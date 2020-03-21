# CheckboxGroup

Componente agrupar checkbox.
*
obs: este componente implementa o **QOptionGroup** e **QCheckbox** do quasar:*
 * https://quasar.dev/vue-components/option-group#Usage
 * https://quasar.dev/vue-components/checkbox#Introduction

```
<qs-checkbox-group />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `options` | `Array` | Não |  `[]` | Array com **label** e **children**, onde **children** é um array de objeto com label e value. |

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
 }]

```
```html
<qs-checkbox-group v-model="values" :options="options" />
```