# FormView

Componente de formulário, é usuado para **criar** e **editar**.
```
<qs-form-view />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `cancelButton` | `String` | Não | `Cancelar` | Título botão cancelar. |
| `customId` | `[Number, String]` | Não | | Título botão cancelar. |
| `customId` | `[Numer, String]` | Não | `false` | Caso o **Id** da URL seja diferente do **id** do item a ser deletado, você pode passar um **id customizado**. |
| `dialog` | `Boolean` | Não | `false` | usado para alterar a tag do componente caso use dentro de algum modal passa a ser `div` e não `QPage`. |
| `disable` | `Boolean` | Não | `false` | Desabilitar submit do form. |
| `entity` | `String` | Sim | | Entidade da **API** para usar como **endpoint**. |
| `mode` | `String` | Não | `create` | Define qual método a **API** vai bater: **PUT** ou **POST**. |
| `readOnly` | `Boolean` | Não | `false` | Habilita forumalário apenas para leitura |
| `route` | `Object` | Não | `{}` | Rotas |
| `submitButton` | `String` | Não | `Salvar` | Título do botão de salvar. |
| `url` | `String` | Não |  | Caso a entidade seja diferente do endpoint, poderá usar esta propriedade para especificar qual é o endpoint. |

## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `default` | { `fields`: `Object`, `metadata`: `Object`, `errors`: `[Array, Object]` } | |
| `footer` | { `fields`: `Object`, `metadata`: `Object`, `errors`: `[Array, Object]` } | Slot para acessar o footer. |
| `header` | { `fields`: `Object`, `metadata`: `Object`, `errors`: `[Array, Object]` } | Slot para acessar o header. |

## Eventos
| Nome | Parametro | Descrição |
|:-:|:-:|:-|
| `fetch-error` | { `error`: `Object` } | Dispara quando a há falha na requisição. |
| `fetch-success` | { `response`: `Object`, `value`: `Object` } | Dispara quando a requição é feita com sucesso. |
| `submit-error` | { `error`: `Object` } | Dispara quando a há falha ao submeter formulário. |
| `submit-success` | { `response`: `Object`, `value`: `Object` } | Dispara quando formulário é submetido com sucesso. |

## Métodos

| Nome | Parâmetro | Descrição |
|:-:|:-:|:-|
| `fetch` | { `params`: `Object` } | Recebe os parametros e envia para a **API**. |

## Exemplos

```html
<qs-form-view v-model="values" mode="create" entity="posts" @submit-success="__FAÇA_ALGO__">
 <template v-slot:header>
  // Faça algo
 </template>

 <template v-slot="{ errors, fields }">
  // Aqui normalmente é usado o componente **FormGenerator**
 </template>

 <template v-slot:footer>
  // Faça algo
 </template>
</qs-form-view>
```