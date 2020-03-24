# ListView

Este componente faz a requisão **GET** e retorna uma lista baseado no **endpoint** passado, já inclui o componente de Filtro e a paginação.

```
<qs-list-view />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `noFilter` | `Bollean` | Não | `false` | Desabilita filtro. |
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `disableRefresh` | `Boolean` | Não | `false` | Desabilita o q-pull-to-refresh, normalmente usado junto com o **sortable**. |
| `url` | `String` | Não |  | Caso a entidade seja diferente do endpoint, poderá usar esta propriedade para especificar qual é o endpoint. |
| `dialog` | `Boolean` | Não | `false` | usado para alterar a tag do componente caso use dentro de algum modal passa a ser **div** e não **q-page**. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `header` | (escopo: `fields` tipo: `[Array, Object]`), (escopo: `metadata` tipo: `Object`), (escopo: `results` tipo: `Array`) | slot para acessar o header. |
| `filter` | (escopo: `fields` tipo: `[Array, Object]`), (escopo: `metadata` tipo: `Object`), (escopo: `results` tipo: `Array`), (escopo: `entity` tipo: `String`), (escopo: `errors` tipo: `[Array, Object]`)  | slot para acessar o componente de filtro. |
| `default` | (escopo: `fields` tipo: `[Array, Object]`), (escopo: `metadata` tipo: `Object`), (escopo: `results` tipo: `Array`) |  |
| `footer` | | Slot para acessar o footer |

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetch-success` | param: `response` / tipo: `Object` | Dispara quando a requição é feita com sucesso. |
| `fetch-error` | param: `error` / tipo: `Object` | Dispara quando a há falha na requisição. |

## Métodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetchList` | | Muito utilizado para atualizar lista de dados. |

## Exemplos

```html
<qs-list-view ref="listView"  entity="posts">
	<template v-slot:header>
		Acessando header
	</template>

	<template v-slot:filter="{ entity }">
		Acessando filter
	</template>

	<template v-slot="{ fields, results }">
		Manipule seus dados aqui
	</template>

	<template v-slot:footer>
	  Acessando footer
	</template>
</qs-list-view>
```