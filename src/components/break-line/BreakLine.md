# BreakLine

Quebra o texto a partir de um determinado caractere, geralmente `\n`, em várias _tags_ parametrizadas.

```
<qs-break-line />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `is` | `String` | Não | `div` | Uma _tag_ válida do HTML ou um componente do Vue, para utilização no elemento pai. |
| `tag` | `String` | Não | `div` | Uma _tag_ válida do HTML ou um componente do Vue, para utilização em cada quebra. |
| `tag-class` | `Array`, `Object` ou `String` | Não | | Classes para cada `tag`. |
| `tag-style` | `Array`, `Object` ou `String` | Não | | Estilos para cada `tag`. |
| `text` | `String` | Não | | Texto que será utilizado como base. |
| `split` | `String` | Não | `\n` | Caracter que definirá a quebra. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | | Texto pode ser quebrado passando por esse slot sem a necessidade de passar para a prop. |

## Eventos

> Sem eventos.

## Exemplos

Uso simples.

```
<qs-break-line :text="customParagraph" />
```

Uso alternativo.

```
<qs-break-line>
  {{ customParagraph }}
</qs-break-line>
```

Uso como lista.

```
<qs-break-line is="ul" text="Um|Dois|Três" tag="li" split="|" />

---

<ul>
  <li>Um</li>
  <li>Dois</li>
  <li>Três</li>
</ul>
```
