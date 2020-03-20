# DialogRouter

Componente para abrir paginas dentro de **modais**.

```
<qs-dialog-router />
```

## Propriedades

> Sem propriedades

## Slots

> Sem slots

## Eventos

| Nome | Parametro | Descrição
|:-:|:-:|:-|
| `hide` | | Fechar dialog. |
| `error` | param: `error` / tipo: `Object` | Dispara quando a há erro ao carregar componente. |

## Métodos

| Nome | Parametro | Descrição
|:-:|:-:|:-|
| `show` | param: `route` / tipo: `Object` | Metodo a ser chamado para carregar componente no modal. |

## Exemplos
Chame o componente **DialogRouter** dentro da página/componente que for usar:

```html
<template v-slot:template-de-exemplo>
	<qs-dialog-router ref="dialogRouter" @hide="reload" />
</template>
```

crie os metodos:

```js
    dialogRouter (route) {
      this.$refs.dialogRouter.show(route)
    },
	
    reload () {
		// faça alguma coisa
    }
```

Quando chamar o método **DialogRouter** passe o `name`  do comonente do **vue-router** que queira carregar.

```html
<q-btn label="abrir página em modal" @click="dialogRouter({ name: 'NomeDoComponente' })"/>
```

