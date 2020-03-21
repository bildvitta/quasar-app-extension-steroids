# FormView

Componente de formulário, faz as requisições **GET**, **PUT** e **POST**, é usuado para **criar**, **editar**.
```
<qs-form-view />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `cancelButton` | `String` | Não | `Cancelar` | Título botão cancelar. |
| `customId` | `[Number, String]` | Não | | Título botão cancelar. |
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `dialog` | `Boolean` | Não | `false` | usado para alterar a tag do componente caso use dentro de algum modal passa a ser **div** e não **q-page**. |
| `url` | `String` | Não |  | Caso a entidade seja diferente do endpoint, poderá usar esta propriedade para especificar qual é o endpoint. |
| `customId` | `[Numer, String]` | Não | `false` | Caso o **Id** da URL seja diferente do **id** do item a ser deletado, você pode passar um **id customizado**. |
| `disable` | `Boolean` | Não | `false` | Desabilitar submit do form. |
| `mode` | `String` | Não | `create` | Define qual método a **API** vai bater: **PUT** ou **POST**. |
| `readOnly` | `Boolean` | Não | `false` | Habilita forumalário apenas para leitura |
| `route` | `Object` | Não | `{}` | Rotas |
| `submitButton` | `String` | Não | `Salvar` | Título do botão de salvar. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `header` | (escopo: `fields` tipo: `Object`), (escopo: `metadata` tipo: `Object`), (escopo: `errors` tipo: `[Array, Object]`) | Slot para acessar o header. |
| `default` | (escopo: `fields` tipo: `Object`), (escopo: `metadata` tipo: `Object`), (escopo: `errors` tipo: `[Array, Object]`) | |
| `footer` | (escopo: `fields` tipo: `Object`), (escopo: `metadata` tipo: `Object`), (escopo: `errors` tipo: `[Array, Object]`) | Slot para acessar o header. |

## Eventos
| Nome | Parametro | Descrição |
|:-:|:-:|:-|
| `fetch-success` | (param: `response` / tipo: `Object`), param: `value` / tipo: `Object` | Dispara quando a requição é feita com sucesso. |
| `submit-success` | (param: `response` / tipo: `Object`), param: `value` / tipo: `Object` | Dispara quando a requição é feita com sucesso. |
| `fetch-error` | param: `error` / tipo: `Object` | Dispara quando a há falha na requisição. |
| `submit-error` | param: `error` / tipo: `Object` | Dispara quando a há falha na requisição. |

## Métodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetch` | param: `params` | Recebe os parametros e envia para a **API**. |

## Exemplos

```html
<qs-form-view v-model="values"  mode="create" entity="posts" @submit-success="__FAÇA_ALGO__">
	<template v-slot:header>
		// Faça algo
	</template>

	<template v-slot="{ errors, fields }">
		// Aqui normalmente é usado o componente **FormGenerator** 
	</template>

	<template v-slot:footer>
		// Faça algo
	</template>
</qs-form-view>
```