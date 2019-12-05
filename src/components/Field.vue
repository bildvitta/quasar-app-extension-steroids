<template>
  <q-input v-bind="attributes" v-on="$listeners" />
</template>

<script>
export default {
  computed: {
    attributes () {
      return { ...this.$attrs, error: this.$attrs.error || undefined }
    }
  },

  mounted () {
    this.$emit('mount', this)
  },

  methods: {
    blur () {
      this.$el.blur()
    },

    focus () {
      this.$el.focus()
    }
  }
}
</script>
