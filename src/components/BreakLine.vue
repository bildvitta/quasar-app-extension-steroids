<template>
  <component :is="is">
    <component :is="tag" v-for="(item, index) in items" :key="index" :class="tagClass" :style="tagStyle">
      {{ item }}
    </component>
  </component>
</template>

<script>
export default {
  props: {
    is: {
      default: 'div',
      type: String
    },

    tag: {
      default: 'div',
      type: String
    },

    tagClass: {
      default: null,
      type: [Array, Object, String]
    },

    tagStyle: {
      default: null,
      type: [Array, Object, String]
    },

    text: {
      default: '',
      type: String
    },

    split: {
      default: '\n',
      type: String
    }
  },

  computed: {
    items () {
      const slot = this.$slots.default[0]
      const text = this.text || (slot ? slot.text : '')

      return text.split(this.split)
    }
  }
}
</script>
