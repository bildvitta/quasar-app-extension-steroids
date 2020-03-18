<template>
  <q-avatar :class="classes" :color="backgroundColor" v-bind="$attrs" v-on="$listeners">
    <img v-if="hasImage" :alt="title" :src="image">
    <template v-else-if="hasTitle">{{ firstLetter }}</template>
    <q-icon v-else :name="icon" />
  </q-avatar>
</template>

<script>
/**
 * Componente para cria um avatar automaticamente com a foto ou as iniciais a partir de um título
 */
const colors = [
  'amber',
  'blue',
  'blue-grey',
  'brown',
  'cyan',
  'deep-orange',
  'deep-purple',
  'green',
  'grey',
  'indigo',
  'light-blue',
  'light-green',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow'
]

export default {
  props: {
    /**
     * Utilização em modo escuro
     */
    dark: {
      default: false,
      type: Boolean
    },
    /**
     * Nome do ícone que aparecerá quando imagem e nome não existirem
     */
    icon: {
      default: 'o_error_outline',
      type: String
    },
    /**
     * Endereço remoto da imagem. Quando informado, prevalece como principal
     */
    image: {
      default: '',
      type: String
    },
    /**
     * Altera a cor do texto ou ícone
     */
    textColor: {
      default: '',
      type: String
    },
    /**
     * Título utilizado para extrair as iniciais quando não há imagem definida
     */
    title: {
      default: '',
      type: String
    },
    /**
     * Código único utilizado para alterar a cor de fundo quando não há título definido
     */
    token: {
      default: 0,
      type: Number
    }
  },

  computed: {
    backgroundColor () {
      if (this.color) {
        return this.color
      }

      return this.dark ? this.mainColor : `${this.mainColor}-2`
    },

    classes () {
      return [this.textColorClass]
    },

    color () {
      return this.$attrs.color
    },

    firstLetter () {
      return this.title[0].toUpperCase()
    },

    hasImage () {
      return !!this.image
    },

    hasTitle () {
      return !!this.title
    },

    hasTextColor () {
      return !!this.textColor
    },

    mainColor () {
      if (!this.title && !this.token) {
        return 'grey'
      }

      const dividend = this.title ? this.title.length : this.token
      return colors[dividend % colors.length]
    },

    textColorClass () {
      if (this.hasTextColor) {
        return `text-${this.textColor}`
      }

      return this.color === 'black' || this.dark ? `text-${this.mainColor}-2` : `text-${this.mainColor}`
    }
  }
}
</script>
