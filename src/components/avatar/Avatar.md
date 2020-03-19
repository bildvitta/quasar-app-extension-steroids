# Avatar

Cria um avatar automaticamente com a foto ou as iniciais a partir de um título.

```
<qs-avatar />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `dark` | `Boolean` | Não | `false` | Utilização em modo escuro. |
| `icon` | `String` | Não | `o_error_outline` | Nome do ícone que aparecerá quando imagem e nome não existirem. |
| `image` | `String` | Não | | Endereço remoto da imagem. Quando informado, prevalece como principal. |
| `text-color` | `String` | Não | | Altera a cor do texto ou ícone. |
| `title` | `String` | Não | | Título utilizado para extrair as iniciais quando não há imagem definida. |
| `token` | `Number` | Não | | Código único utilizado para alterar a cor de fundo quando não há título definido. |

## Exemplos

Avatar apenas com ícone e código para fixar a cor.

```
<qs-avatar icon="o_person" token="a1b2c3d4e5" />
```

Com imagem ou texto.

```
<qs-avatar image="http://placehold.it/300x300" title="John Appleseed" />
```
