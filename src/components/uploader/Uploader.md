# Uploader

Componente para fazer upload de arquivos.

*obs: este componente implementa o **QUploader** do quasar: * https://quasar.dev/vue-components/uploader#Introduction

```
<qs-uploader />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `hint` | `String` | Não | | Mensagem de dica. |
| `maxFiles` | `Number` | Não | `1` | Número máximo de arquivos. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```html
<uploader v-model="values" accept=".jpeg,.jpg,.png" auto-upload entity="posts/image" label="Imagem"  />
```