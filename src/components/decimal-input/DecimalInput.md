# DecimalInput

Campo para formatar valores decimais. Utiliza o QInput.

```
<qs-decimal-input />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `comma` | `Boolean` | Não | `false` | Separação das casas decimais utilizando vírgula ao invés de pontos. |
| `places` | `Number` | Não | `2` | Número de casas decimais. |

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```html
<qs-decimal-input v-model="value" :places="3" />
```