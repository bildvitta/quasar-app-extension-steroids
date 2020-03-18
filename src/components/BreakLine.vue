<template>
  <component :is="parentTag">
    <component :is="tag" v-for="(item, index) in items" :key="index" :class="tagClass" :style="tagStyle">
      {{ item }}
    </component>
  </component>
</template>

<script>
export default {
  props: {
    /**
     * Uma tag válida do HTML ou um componente do Vue, para utilização em cada quebra
     */
    parentTag: {
      default: 'div',
      type: String
    },
    /**
     * Uma tag válida do HTML ou um componente do Vue, para utilização no elemento pai
     */
    tag: {
      default: 'div',
      type: String
    },
    /**
     * Classes para cada tag
     */
    tagClass: {
      default: null,
      type: [Array, Object, String]
    },
    /**
     * Estilos para cada tag
     */
    tagStyle: {
      default: null,
      type: [Array, Object, String]
    },
    /**
     * Texto que será utilizado como base
     */
    text: {
      default: '',
      type: String
    },
    /**
     * Caracter que definirá a quebra
     */
    split: {
      default: '\n',
      type: String
    }
  },

  computed: {
    items () {
      const slot = this.$slots.default
      const text = this.text || (slot ? slot[0].text : '')

      return text.split(this.split)
    }
  }
}
</script>
