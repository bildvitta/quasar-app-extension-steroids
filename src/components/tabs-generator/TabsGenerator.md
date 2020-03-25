# TabsGenerator

Componente para gerar **Tabs** dinamicamente.

*obs: componente implementa **QTabs e QTAb** do quasar:* https://quasar.dev/vue-components/tabs#Introduction

```
<qs-tabs-generator />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `counters` | `Object` | Não | `{}` | Numero da badge que vai aparecer no tab. |
| `tabs` | `Object` | Sim | `{}` | chave equivale ao **value** e valor do objeto equivalente ao **label**. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| tab-`nome dinamico` | { `item`: `Object` } | Escopo com nome dinamico possível acessar pelo **label** do obj. Neste slot você substitui o tab inteiro. |
| tab-slot-`{label}` | { `item`: `Object` } | Escopo com nome dinamico, possível acessar pelo **label** do obj. Neste slot você substitui o que está dentro do tab. |

## Eventos

> Sem eventos.

## Exemplos

```js
const tabs = { test: 'teste', test2: 'teste-2' }
const counters = { test: 2 }
const modifiedTabs = { ...tabs, test2: { label: 'test2-2', icon: 'email' } }
```

```html
<qs-tabs-generator v-model="value" :tabs="tabs" :counters="counters" />
```

##### Tabs modificadas:
Caso tenha necessidade de passar propriedades para cada tab individualmente sem ter que abrir um **template** você pode modificar o tabs como no exemplo **modifiedTabs**. Lembrando que é necessario passar o **label**.

```html
<qs-tabs-generator v-model="value" :tabs="tabs" :counters="counters" />
```

##### Usando template para o tab inteiro:

```html
<qs-tabs-generator v-model="value" :tabs="tabs" :counters="counters">
  <template v-slot:tab-teste>
    <div>Agora é uma div e não uma tab!</div>
  </template>
</qs-tabs-generator>
```

##### Usando template para substituir o conteudo do Tab:

```html
<qs-tabs-generator v-model="value" :tabs="tabs" :counters="counters">
  <template v-slot:tab-slot-teste>
    <div>Estou dentro da tab!</div>
  </template>
</qs-tabs-generator>
```