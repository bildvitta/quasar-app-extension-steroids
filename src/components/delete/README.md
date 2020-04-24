# Delete

Componente para deletar um registro a partir do evento de clique. Opcionalmente pode exibir uma caixa de diálogo.

```
<qs-delete />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `customId` | `String` | Não | `false` | Informa o `id` a ser utilizado. Normalmente considera-se o parâmetro `id` da URL. |
| `dialog` | `Object` | Não | `{}` | Configuração do `$q.dialog` para confirmação ao deletar. |
| `entity` | `String` | Sim | | Entidade do `vuex`. |
| `tag` | `String` | Não | `q-btn` | Uma tag válida do HTML ou um componente do Vue. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | | Conteúdo principal do campo. |

## Eventos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `error` | { `error`: `Object` } | Dispara quando há falha ao deletar item. |
| `success` | | Dispara quando o item é deletado com sucesso. |

## Exemplos

```html
<qs-delete entity="posts" custom-id="post-1s2us" />
```