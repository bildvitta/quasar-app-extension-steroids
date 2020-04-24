# Autocomplete

Componente para pesquisa de texto em select que implementa [Fuse](https://fusejs.io/) e [QSelect](https://quasar.dev/vue-components/select#Introduction) (todos eventos do `QSelect` estão disponíveis).

```
<qs-autocomplete />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `labelKey` | `String` | Não | | Chave do objeto a ser substituida por `label` caso não exista a chave `label` no objeto |
| `valueKey` | `String` | Não | | Chave do objeto a ser substituida por `value` caso não exista a chave `value` no objeto |
| `options` | `Array` | Não | `[]` | options do select |
| `fuseOptions` | `Object` | Não | `{}` | opções da biblioteca `Fuse.js` |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `append` | | Anexar ao campo interno; Sugestões: QIcon, QBtn. |
| `no-option` | | Por padrão, quando não há opções, o menu não aparece. Mas você pode personalizar esse cenário e especificar o que o menu deve exibir. |
| `option` | | Slot para acessar a lista encontrada ao filtrar |

## Eventos

> sem eventos

## Exemplos

`options` é um array de objeto, caso os objetos não possuam uma chave label e value, você precisará passar a prop labelKey, valueKey com os valores sendo as chaves atuais a serem modificadas

```js
data () {
  return {
    // options com label e value
    options: [{ label: 'teste 1', value: 1 }, { label: 'teste2', value: 2 }],
    valueOption: 1,
    // options sem label e value
    options2: [{ title: 'teste 1', result: 1 }, { title: 'teste2', result: 2 }],
    valueOption2: 2,
  }
}
```

```html
<qs-autocomplete v-model="valueOption" :options="options" />

<qs-autocomplete v-model="valueOption2" labelKey="title" valueKey="result" :options="options2" />
<!-- o componente irá trocar a key "title" por "label" e "result" por "value" -->
```
