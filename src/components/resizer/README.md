# Resizer

Componente para redimensionar imagens.

```
<qs-resizer />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `resize` | `String` | Não | `cover` | opções para redimencionar: `cover`, `contain`, `fill`, `inside`, `outside`. |
| `size` | `String` | Não | | Tamanho da imagem. |
| `source` | `String` | Sim | | Caminho da imagem. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```html
<qs-resizer size="600x450" :source="//image.jpeg" />
```