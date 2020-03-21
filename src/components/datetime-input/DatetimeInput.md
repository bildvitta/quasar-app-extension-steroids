# DatetimeInput

Componente de data e hora com formatação correta para trabalhar com **API**.

*obs: componente implementa **QDate e QTime com QInput **do quasar:* https://quasar.dev/vue-components/date#Example--QDate-and-QTime-with-QInput

```
<qs-datetime-input />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `dateMask` | `String` | Não | `DD/MM/YYYY` | Mascara da data. |
| `dateOnly` | `Boolean` | Não | | Somente data. |
| `dateOptions` | `Object` | Não | `{}` | Atributos da data para o componente de data do quasar. |
| `timeMask` | `String` | Não | `HH:mm:ss` | Mascara da hora. |
| `timeOnly` | `Boolean` | Não |  | Somente hora. |
| `timeOptions` | `Object` | Não | `{}`  | Atributos da hora para o componente de hora do quasar. |

## Slots

> Sem eventos.

## Eventos

> Sem eventos.

## Exemplos

##### Date e Hora
```html
<qs-datetime-input v-model="value" label="data e hora" outlined  class="col-6" />
```

##### Somente Data
```html
<qs-datetime-input v-model="value" data-only label="data" outlined  class="col-6" />
```

##### Somente Hora
```html
<qs-datetime-input v-model="value" time-only label="hora" outlined  class="col-6" />
```