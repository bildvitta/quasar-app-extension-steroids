# AppBar

Componente para criação do **Cabeçalho/Header** do **Menu** do **Layout**.

*obs: este componente implementa Layout **QDrawer** do quasar:* https://quasar.dev/layout/drawer#Introduction

```
<qs-app-bar />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `title` | `String` | Sim | | Título no cabeçalho do menu. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `tools` | | Slot para acessar ferramentas. |
| `user` | escopo: `user` tipo: `Object` | Slot para acessar menu do usuário. |

## Eventos
| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `toggle-menu` | | Dispara quando o botão do menu lateral (**AppMenu**) é clicado. |

## Exemplos

##### Use AppBar dentro do QLayout

```html
<q-header>
	<qs-app-bar title="Título de exemplo" @toggle-menu="___MUDAR_MODEL_DO_APPMENU___" />
</q-header>
```