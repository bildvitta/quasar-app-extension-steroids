# Delete

Componente para deletar via requisição da **API**.

```
<qs-delete />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `customId` | `String` | Não | `false` | Caso o **Id** da URL seja diferente do **id** do item a ser deletado, você pode passar um **id customizado**. |
| `dialog` | `Object` | Não | `{}` | Configuração do `$q.dialog` para confirmação ao deletar. |
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `tab` | `String` | Não | `q-btn` | Uma tag válida do HTML ou um componente do Vue. |

## Slots

| Nome | Escopo | Descrição
|:-:|:-:|:-|
| `default` | | |

## Eventos

| Nome | Parametro | Descrição
|:-:|:-:|:-|
| `success` | | Dispara quando o item é deletado com sucesso. |
| `error` | param: `error` / tipo: `Object` | Dispara quando há falha ao deletar item. |

## Exemplos

```html
  <qs-delete entity="posts" color="grey-8" custom-id="post-1s2us">
  </qs-delete>
```