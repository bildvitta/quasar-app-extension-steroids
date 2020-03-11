<template>
  <q-tabs v-model="tab" v-bind="$attrs" @input="handleInput">
    {{ tab }}
    <slot v-for="(item, index) in tabs" :name="`tab-${item.label}`">
      <q-tab :name="item.value" :label="item.label" :key="index" />
    </slot>
  </q-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      default: () => [{ label: 'teste', value: 'teste'}, { label: 'test2', value: 'test2'}],
      type: Array
    }
  },

  data () {
    return {
      tab: ''
    }
  },

  methods: {
    handleInput () {
      this.$emit('input', this.tab)
    },
  }
}
</script>
