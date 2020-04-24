# BreakLine

Quebra o texto a partir de um determinado caractere, geralmente `\n`, em várias _tags_ parametrizadas.

```
<qs-break-line />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `is` | `String` | Não | `div` | Uma _tag_ válida do HTML ou um componente do Vue, para utilização no elemento pai. |
| `split` | `String` | Não | `\n` | Caracter que definirá a quebra. |
| `tag-class` | `Array`, `Object` ou `String` | Não | | Classes para cada `tag`. |
| `tag-style` | `Array`, `Object` ou `String` | Não | | Estilos para cada `tag`. |
| `tag` | `String` | Não | `div` | Uma _tag_ válida do HTML ou um componente do Vue, para utilização em cada quebra. |
| `text` | `String` | Não | | Texto que será utilizado como base. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | | Texto que será utilizado como base, embora a prioridade seja do conteúdo que vier através da propriedade `text`. |

## Eventos

> Sem eventos.

## Exemplos

Uso simples.

```html
<qs-break-line :text="customParagraph" />
```

Uso alternativo.

```html
<qs-break-line>
  {{ customParagraph }}
</qs-break-line>
```

Uso como lista.

```html
<qs-break-line is="ul" text="Um|Dois|Três" tag="li" split="|" />

---

<ul>
  <li>Um</li>
  <li>Dois</li>
  <li>Três</li>
</ul>
```