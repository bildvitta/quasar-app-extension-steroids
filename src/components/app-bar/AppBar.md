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
| `tools` | | Slot para acessar ferramentas. |
| `user` | { `user`: `Object` } | Slot para acessar menu do usuário. |

## Eventos
| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `toggle-menu` | | Dispara quando o botão QDrawer é clicado. |

## Exemplos

```html
<q-layout>
  <q-header>
    <qs-app-bar title="Título de exemplo" @toggle-menu="___MUDAR_VMODEL_DO_QDRAWER___" />
  </q-header>
</q-layout>
```