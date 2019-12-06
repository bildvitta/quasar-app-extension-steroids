<template>
  <div>
    <component :is="tag" v-for="(paragraph, index) in paragraphs" :key="index" :class="paragraphClass" :style="paragraphStyle">{{ paragraph }}</component>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      default: 'div',
      type: String
    },

    text: {
      default: '',
      type: String
    },

    paragraphClass: {
      default: null,
      type: [Array, Object, String]
    },

    paragraphStyle: {
      default: null,
      type: [Array, Object, String]
    },

    split: {
      default: '\n',
      type: String
    }
  },

  computed: {
    paragraphs () {
      const slot = this.$slots.default[0]
      const text = this.text || (slot ? slot.text : '')

      return text.split(this.split)
    }
  }
}
</script>
