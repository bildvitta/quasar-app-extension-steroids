# Input

Componente que implementa [QInput](https://quasar.dev/vue-components/input#Introduction) para utilização de mascaras personalizadas. Todos eventos, props e slots disponiveis no `QInput` estão disponíveis neste componente.

```
<qs-input />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `mask` | `[phone, document, personal-document, company-document, postal-code]` ou `personalizada` | Não | | Mensagem de erro. |

> Patterns das mascaras
  - **phone**: `['(##) ####-#####', '(##) #####-####']`
  - **document**: `['###.###.###-###', '##.###.###/###-##']`
  - **persona-document**: `###.###.###-##`
  - **postal-code**: `#####-###`

## Slots

> Sem slots.

## Eventos

> Sem eventos.

## Exemplos

```js
data () {
  return {
    phone: '1699999999',
    personalDocument: '44444444444'
  }
}
```

```html
<qs-input v-model="phone" mask="phone" />
<!-- retorno valor no input: (16) 99999-9999 / valor do model: 1699999999 -->
<qs-input v-model="personalDocument" mask="personal-document" />
<!-- retorno valor no input: 444.444.444-44 / valor do model: 44444444444 -->
```
