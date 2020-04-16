<template>
  <q-input ref="mask" v-model="text" v-bind="$attrs" v-on="$listeners" :mask="mask" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      text: ''
    }
  },

  watch: {
    mask () {
      const input = this.$refs.mask.$refs.input

      requestAnimationFrame(() => input.selectionStart = input.value ? input.value.length : '')
    }
  },

  computed: {
    mask () {
      console.log(this.$attrs.mask)
      switch (true) {
        case this.text.length <= 8 && this.$attrs.mask === 'phone': return '####-#####'
        case this.text.length === 9 && this.$attrs.mask === 'phone': return '#####-#####'
        case this.text.length === 10 && this.$attrs.mask === 'phone': return '(##) ####-#####'
        default: return '(##) #####-####'
      }
    }
  }
}
</script>
