# PageHeader

Componente de cabeçalho de Páginas com breadcrumbs que indicam a localização atual do usuário.

*obs: este componente implementa **QBreadcrumbs e QToolbar** do quasar:*
* https://quasar.dev/vue-components/breadcrumbs#Introduction
* https://quasar.dev/vue-components/breadcrumbs#Introduction

```
<qs-page-header />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `breadcrumbs` | `[Array, Boolean, String]` | Não | | "Migalhas de pão", para saber mais acesse o link acima. |
| `noBreadcrumbs` | `Boolean` | Não | `false` | Sem "Migalhas de pão". |
| `root` | `[Object, String]` | Não | `{ label: 'Início', routeName: 'Root' }` | Rotas e label. |
| `title` | `String` | Não | | Título do cabeçalho. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | | |

## Eventos

> Sem eventos.

## Exemplos

```js
const breadcrumbs = [
  { label: 'Label 1', route: { name: 'ComponentName' } },
  { label: 'este é o titulo' }
]
```

```html
<qs-page-header :breadcrumbs="breadcrumbs" title="Este é o titulo" />
```