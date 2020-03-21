# Profile

Componente para criar perfil.

obs: este componente utiliza o componente: **Avatar**.

```
<qs-profile />
```

## Propriedades

| Nome | Tipo | Obrigatório? | Padrão | Descrição |
|:-|:-:|:-:|:-:|:-|
| `icon` | `String` | Não |  | Icone do avatar. |
| `iconic` | `Boolean` | Não | `false` | |
| `image` | `String` | Não |  | Imagem do avatar. |
| `title` | `String` | Sim | | Título do profile. |


## Slots

| Nome | Escopo | Descrição |
|:-:|:-:|:-|
| `beforeTitle` | | Slot para acessar antes do título. |
| `afterTitle` | | Slot para acessar depois do título. |
| `meta` | | Slot para acessar meta. |

## Eventos

> Sem eventos.

## Exemplos

```html
      <!-- Profile -->
<profile image="/imagem.png" title="título " icon="o_person">
	<template v-slot:beforeTitle>
		// Antes do título
	</template>

	<template v-slot:afterTitle>
		// Depois do título
	</template>

	<template v-slot:meta>
		// Meta
	</template>
</profile>
```