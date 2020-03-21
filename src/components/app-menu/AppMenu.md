# AppMenu

Componente para criação dinâmica do **Menu lateral** do **Layout**.

*obs: este componente implementa **QDrawer** do quasar:* https://quasar.dev/layout/drawer#Introduction

```
<qs-app-menu />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `items` | `Array` | Não | `[]` | Itens do menu. |
| `noBreadcrumbs` | `Boolean` | Não | `false` | Sem "Migalhas de pão". |
| `title` | `String` | Não |  | Título do cabeçalho. |
| `root` | `[Object, String]` | Não | `{ label: 'Início', routeName: 'Root' }` | Rotas e label. |

## Slots

> Sem slots

## Eventos

> Sem eventos

## Exemplos
```js
const menu = [
  {
    type: 'header',
    label: 'Usuários',
    children: [
      { label: 'Clientes', icon: 'o_group', to: { name: 'CustomersList' } },
      { label: 'Colaboradores', icon: 'o_supervised_user_circle', to: { name: 'EmployeesList' } }
    ]
  }]
```

#####  Use AppBar dentro do QLayout

```html
<qs-app-menu v-model="value" :items="menu" />
```