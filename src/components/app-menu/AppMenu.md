# AppMenu

Cria o menu da aplicação através de um **QDrawer**.

*obs: este componente implementa **QDrawer** do quasar:* https://quasar.dev/layout/drawer#Introduction

```
<qs-app-menu />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `items` | `Array` | Não | `[]` | Itens do menu. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

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

```html
<qs-app-menu v-model="value" :items="menu" />
```