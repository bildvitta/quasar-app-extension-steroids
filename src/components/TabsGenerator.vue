<template>
  <q-tabs v-model="currentTab" class="tabs-generator" inline-label v-bind="$attrs" v-on="$listeners">
    <slot v-for="(tab, key) in formattedTabs" :name="`tab-${tab.label}`" class="text-weight-light" :item="tab">
      <q-tab :key="key" class="tabs-generator__tab" :name="key">
        <q-icon v-if="icons[key]" class="text-bold q-mr-xs" :name="icons[key].name" :color="icons[key].color" />
        <div class="tabs-generator__label">{{ formatLabel(counters[key], tab.label) }}</div>
      </q-tab>
    </slot>
  </q-tabs>
</template>

<script>
import { extend } from 'quasar'
import formatLabel from '../helpers/label'

export default {
  props: {
    tabs: {
      default: () => ({}),
      type: Object,
      required: true
    },

    counters: {
      default: () => ({}),
      type: Object
    },

    icons: {
      default: () => ({}),
      type: Object
    },

    value: {
      default: '',
      type: String
    }
  },

  computed: {
    currentTab: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    },

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
    formatLabel
  }
}
</script>

<style lang="scss">
.tabs-generator {
  &__label {
    .q-tab--active & {
      font-weight: bold;
    }
  }
}
</style>
