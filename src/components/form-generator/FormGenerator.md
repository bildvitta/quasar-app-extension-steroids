# FormGenerator

Componente para gerar formularios a aprtir de uma estrutura pré-definida de campos.

```
<qs-form-generator />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `columns` | `[Array, String]` |  Não |`[]` | Lista de classes "col" para definir o tamanho dos campos. |
| `errors` | `Object` |  Não | `{}` | Mensagens de erros dos campos. |
| `fields` | `Object` |  Não | `{}` | Campos a serem renderizados. |
| `gutter` | `[String, Boolean]` |  Não | `md` | Espaçamento dos campos. |
| `order` | `Array` |  Não | `[]` | Ordem dos campos. |

## Slots

| Nome | Escopo | Descrição
|:-:|:-:|:-|
| field-`${nome-do-field}` | escopo: `field` / tipo: `Object` | pode acessar o field pelo template e modificá-lo caso haja necessidade. |

## Eventos

> Sem eventos.

## Exemplos

```js
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
},

const formColumns = [{ col: 8, sm: 6 }, { col: 4, sm: 6 },]
```

```html
<qs-form-generator v-model="value" :columns="formColumns" :fields="fields">
	<template v-slot:field-comment>
		<div>Estou modificando campo "comment" xD</div>
	</template>
</qs-form-generator>
```