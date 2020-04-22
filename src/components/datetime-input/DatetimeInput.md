# DatetimeInput

Campo para a selecionar uma data e/ou hora, já normalizado para exibição (humanamente legível) e formatado na programação para trabalhar com o padrão internacional ISO 8601. Este componente utilizada o [QDate, QTime e o QInput](https://quasar.dev/vue-components/date#Example--QDate-and-QTime-with-QInput) para funcionar.


```
<qs-datetime-input />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `dateMask` | `String` | Não | `DD/MM/YYYY` | Máscara da data. |
| `dateOnly` | `Boolean` | Não | | Somente data. |
| `dateOptions` | `Object` | Não | `{}` | Atributos da data para o componente QDate. |
| `timeMask` | `String` | Não | `HH:mm:ss` | Máscara da hora. |
| `timeOnly` | `Boolean` | Não | | Somente hora. |
| `timeOptions` | `Object` | Não | `{}` | Atributos da hora para o componente QTime. |

## Slots

> Sem eventos.

## Eventos

> Sem eventos.

## Exemplos

### Date e hora

```html
<qs-datetime-input v-model="value" label="Data e hora" outlined />
```

### Somente data

```html
<qs-datetime-input v-model="value" data-only label="Data" outlined />
```

### Somente hora

```html
<qs-datetime-input v-model="value" time-only label="Hora" outlined />
```