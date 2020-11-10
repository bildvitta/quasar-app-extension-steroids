<template>
  <div class="items-center" :class="classes">
    <div v-for="(field, key) in fields" :key="key" :class="getFieldClass(key, true)">
      <slot :name="`field-${field.name}`" :field="slotValue[key]">
        <slot name="header" :field="slotValue[key]">
          <div v-if="!hideEmptyResult || resultsByFields[key]" :class="headerClass">{{ field.label }}</div>
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
    result: {
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

    hideEmptyResult: {
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
      const result = extend(true, {}, this.result)
      const formattedResult = {}

      for (const key in result) {
        if (this.fields[key]?.type) {
          formattedResult[key] = humanize(this.fields[key], result[key])
          this.slotValue[key] = { ...this.fields[key], formattedResult: formattedResult[key] }
        }
      }

      return formattedResult
    }
  }
}
</script>
