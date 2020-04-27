# Uploader

Componente para fazer upload de arquivos. Este componente implementa o [QUploader](https://quasar.dev/vue-components/uploader#Introduction).

```
<qs-uploader />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `entity` | `String` | Sim | | Entidade do `vuex`. |
| `hint` | `String` | Não | | Mensagem de dica. |
| `maxFiles` | `Number` | Não | `1` | Número máximo de arquivos. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```html
<uploader v-model="values" accept=".jpeg,.jpg,.png" auto-upload entity="posts/image" label="Imagem" />
```