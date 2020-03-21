# DecimalInput

Componente de input para campos **decimais** com formatação.

*obs: componente implementa **QInput** do quasar:* https://quasar.dev/vue-components/input#Introduction

```
<qs-decimal-input />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `comma` | `Boolean` | Não | `false` | Separação por vírgula. |
| `places` | `Number` | Não | `2` | casas decimais. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```html
<qs-decimal-input v-model="value" :places="3" />
```

