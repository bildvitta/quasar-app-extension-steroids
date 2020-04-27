# Copy

Possibilita copiar um texto para a área de transferência ao clicar.

```
<qs-copy />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `icon` | `String` | Não | `o_file_copy` | Icone do botão. |
| `label` | `String` | Sim | | Texto a ser copiado. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | | Informar um texto alternativo ao informado via propriedade label. |

## Eventos

> Sem eventos.

## Exemplos

```html
<qs-copy class="text-weight-medium" label="texto que será copiado" />
```

