<template>
  <component :is="componenTag" ref="items" v-bind="$attrs" v-on="$listeners">
    <slot :formattedValue="formattedValue" :errors="errors"/>
  </component>
</template>

<script>
import { cloneDeep } from 'lodash'
import Sortable from 'sortablejs'
import store from 'store'

let sortable = null

export default {
  props: {
    results: {
      type: Array,
      default: () => []
    },

    componenTag: {
      type: String,
      default: 'div'
    },

    entity: {
      type: String,
      required: false
    },

    submiting: {
      type: Boolean
    },

    url: {
      type: String,
      default: ''
    },

    options: {
      type: Object,
      default: () => ({ animation: 500 })
    }
  },

  data () {
    return {
      formattedValue: null,
      isSubmiting: false
    }
  },

  watch: {
    isSubmiting (value) {
      this.$emit('update:submiting', this.isSubmiting)
    },

    results (value) {
      this.formattedValue = cloneDeep(value)
      sortable.sort(sortable.toArray())
    }
  },

  created () {
    this.formattedValue = cloneDeep(this.results)
  },

  mounted () {
    sortable = new Sortable(this.$refs.items, {
      ...this.options,

      onUpdate: event => {
        this.updateOrder(event)
        this.$emit('sort', event)
      }
    })
  },

  computed: {
    identifiers () {
      return this.formattedValue.map(({ id }) => id) || []
    }
  },

  methods: {
    updateOrder ({ oldIndex, newIndex }) {
      const deleted = this.formattedValue.splice(oldIndex, 1)
      this.formattedValue.splice(newIndex, 0, deleted[0])

      this.replace()
    },

    async replace () {
      this.isSubmiting = true

      try {
        const response = await store.dispatch(`${this.entity}/replace`, {
          payload: { order: this.identifiers },
          url: this.url || `${this.entity}/sort`
        })

        this.$emit('success', this.response)
      } catch (errors) {
        this.$emit('error', errors)
      } finally {
        this.isSubmiting = false
      }
    }
  },

  destroyed () {
    sortable.destroy()
  }
}
</script>
