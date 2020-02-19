<template>
  <component :is="tag" ref="items" v-bind="$attrs" v-on="$listeners">
    <slot :sorted="sorted" :errors="errors"/>
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

    tag: {
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
      sorted: null,
      isSubmiting: false,
      errors: null
    }
  },

  watch: {
    isSubmiting (value) {
      this.$emit('update:submiting', this.isSubmiting)
    },

    results (value) {
      // this.sorted = cloneDeep(value)
      this.updateValue(value)
      sortable.sort(sortable.toArray())
    }
  },

  created () {
    // this.sorted = cloneDeep(this.results)
    this.updateValue()
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
      return this.sorted.map(({ id }) => id)
    }
  },

  methods: {
    updateOrder ({ oldIndex, newIndex }) {
      const deleted = this.sorted.splice(oldIndex, 1)
      this.sorted.splice(newIndex, 0, deleted[0])

      this.replace()
    },

    updateValue (value) {
      this.sorted = cloneDeep(value || this.results)
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
        this.errors = errors.response.data
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
