# AppBar

Este componente é o responsável por criar a barra do topo da aplicação e contempla espaço para o menu através de um **QDrawer** e para as informações do usuário autenticado, como foto e nome.

```
<qs-app-bar />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `title` | `String` | Sim | | Título da aplicação. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `tools` | | Usado para adicionar ações ao lado das informações do usuário. |
| `user` | { `user`: `Object` } | Usado para acessar menu do usuário. |

## Eventos
| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `toggle-menu` | | Sempre que o QDrawer é acionado. |

## Exemplos

```html
<q-layout>
  <q-header>
    <qs-app-bar title="Título de exemplo" />
  </q-header>
</q-layout>
```