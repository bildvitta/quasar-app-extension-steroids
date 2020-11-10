<template>
  <div class="items-center" :class="classes">
    <div v-for="(field, key) in fields" :key="key" :class="getFieldClass(key, true)">
      <slot :name="`field-${field.name}`" :field="slotValue[key]">
        <slot name="header" :field="slotValue[key]">
          <div v-if="!hideEmptyResults || resultsByFields[key]" :class="headerClass">{{ field.label }}</div>
        </slot>

        <slot name="content" :field="slotValue[key]">
          <div v-if="resultsByFields[key]" :class="contentClass">{{ resultsByFields[key] }}</div>
        </slot>
      </slot>
    </div>
  </div>
</template>

<script>
import generator from '../mixins/generator'
import { humanize } from '../helpers/filters'
import { extend } from 'quasar'

export default {
  mixins: [generator],

  props: {
    results: {
      type: Object,
      default: () => ({})
    },

    headerClass: {
      type: String,
      default: 'text-bold'
    },

    contentClass: {
      type: String,
      default: ''
    },

    hideEmptyResults: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      slotValue: {}
    }
  },

  computed: {
    resultsByFields () {
      const results = extend(true, {}, this.results)
      const result = {}

      for (const key in results) {
        if (this.fields[key]?.type) {
          result[key] = humanize(this.fields[key], results[key])
          this.slotValue[key] = { ...this.fields[key], result: result[key] }
        }
      }

      return result
    }
  }
}
</script>
