<template>
  <q-tabs v-model="currentTab" v-bind="$attrs" @input="handleInput">
    <slot v-for="(tab, key) in formattedTabs" :name="`tab-${tab.label}`" :item="tab">
      <q-tab :name="key" :label="tab.label" :key="key" v-bind="tab">
        <slot :name="`tab-slot-${tab.label}`" :item="tab">
          <q-badge v-if="counters[key]" color="red" floating>{{ counters[key] }}</q-badge>
        </slot>
      </q-tab>
    </slot>
  </q-tabs>
</template>

<script>
import { extend } from 'quasar'

export default {
  props: {
    // Basic usage: :tabs="{ teste1: 'teste-1', teste2: 'teste-2' }".
    // Example of usage: You can manipulate the tabs outsite the component and send: --->
    // ---> :tabs="{ teste1: 'teste-1', teste2: 'teste-2', teste3: { label: 'teste-3', icon: 'email' }".
    // If you just send :tabs="{ teste: 'teste-1', teste2: 'teste-2' }" the component will automatically format to: --->
    // ---> "{ teste: { label: 'teste-1' }, teste2: { label: 'teste-2' } }"
    tabs: {
      default: () => ({}),
      type: Object,
      required: true
    },

    counters: {
      default: () => ({}),
      type: Object
    },

    value: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      currentTab: ''
    }
  },

  created () {
    this.currentTab = this.value
  },

  computed: {
    formattedTabs () {
      const tabs = extend(true, {}, this.tabs)

      for (const key in tabs) {
        if (typeof tabs[key] === 'string') {
          tabs[key] = { label: tabs[key] }
        }
      }

      return tabs
    }
  },

  methods: {
    handleInput () {
      this.$emit('input', this.currentTab)
    }
  }
}
</script>
