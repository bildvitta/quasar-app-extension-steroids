# AppMenu

Cria o menu da aplicação através de um [QDrawer](https://quasar.dev/layout/drawer).

```
<qs-app-menu />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `items` | `Array` | Não | `[]` | Lista de itens do menu, onde cada item é um objeto contendo: `label` e `chindren`, sendo **children** um array de objetos com: `label`, `icon` e `to`. Dentro do **to** é passado a rota desejada. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```js
const menu = [
  {
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