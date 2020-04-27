# DialogRouter

Componente para abrir paginas dentro de **modais**.

```
<qs-dialog-router />
```

## Propriedades

> Sem propriedades.

## Slots.

> Sem slots

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `error` | { `error`: `Object` } | Dispara quando a há erro ao carregar componente. |
| `hide` | | Dispara ao fechar o modal. |

## Métodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `show` | { `route`: `Object` } | Método para carregar o componente. Deve ser informado um objeto de rota no mesmo padrão utilizado pelo Vue Router. |

## Exemplos

```html
<qs-dialog-router ref="dialogRouter" />
```

Crie os métodos abaixo. Recomendamos a utilização de um mixin para este fim.

```js
    dialogRouter (route) {
      this.$refs.dialogRouter.show(route)
    }
```

Chame o método `dialogRouter()` informando a rota desejada.

```html
<q-btn label="Navegar (modal)" @click="dialogRouter({ name: 'NomeDaRota' })"/>
```

