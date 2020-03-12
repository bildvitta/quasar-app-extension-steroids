<template>
  <q-tabs v-model="tab" v-bind="$attrs" @input="handleInput">
    <slot v-for="(item, index) in tabs" :name="`tab-${item.label}`" :item="item">
      <q-tab :name="item.value" :label="item.label" :key="index" v-bind="setAttributes(index)">
        <slot :name="`tab-slot-${item.label}`" :item="item">
          <q-badge v-if="counters[item.value]" color="red" floating>{{ counters[item.value] }}</q-badge>
        </slot>
      </q-tab>
    </slot>
  </q-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      default: () => [],
      type: Array,
      required: true
    },

    counters: {
      default: () => ({}),
      type: Object,
      required: true
    },

    value: {
      default: '',
      type: String
    },

    // Example of usage: :tab-attributes="{ 1: { icon: 'mail' } }" will get tab of index "1" and set email icon.
    // Example of usage 2: if you pass only :tab-attributes="{ icon: 'mail' }" it will set icon to every tab.
    tabAttributes: {
      default: () => ({}),
      type: Object
    }
  },

  data () {
    return {
      tab: ''
    }
  },

  created () {
    this.tab = this.value
  },

  computed: {
    isObjectOfObject () {
      return Object.keys(this.tabAttributes).some(item => !isNaN(item))
    }
  },

  methods: {
    handleInput () {
      this.$emit('input', this.tab)
    },

    setAttributes (index) {
      return this.isObjectOfObject ? this.tabAttributes[index] : this.tabAttributes
    }
  }
}
</script>
