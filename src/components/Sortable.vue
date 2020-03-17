<template>
  <component :is="tag" ref="items" v-bind="$attrs" v-on="$listeners">
    <!-- @slot Use this slot to access the sortted elements @binding {array} sorted -->
    <slot :sorted="sorted" />
  </component>
</template>

<script>
import { cloneDeep, get } from 'lodash'
import Sortable from 'sortablejs'
import store from 'store'

let sortable = null
/**
 * This component is for sorting elements on dragging.
 * This component use SortableJS: https://github.com/SortableJS/Sortable
 */
export default {
  props: {
    /**
     * List of elements to sorting
     */
    results: {
      type: Array,
      default: () => []
    },
    /**
     * Component tag
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Entity of api to replace when finish sorting
     */
    entity: {
      type: String,
      required: false
    },
    /**
     * This prop is for when the endpoint api is different of entity
     */
    url: {
      type: String,
      default: ''
    },
    /**
     * SortableJS options.
     */
    options: {
      type: Object,
      default: () => ({ animation: 500 })
    }
  },

  data () {
    return {
      sorted: null
    }
  },

  watch: {
    results (value) {
      this.updateValue(value)
      sortable.sort(sortable.toArray())
    },

    options (value) {
      sortable.options = { ...sortable.options, ...value }
    }
  },

  created () {
    this.updateValue()
  },

  mounted () {
    sortable = new Sortable(this.$refs.items, {
      ...this.options,

      onUpdate: event => {
        this.updateOrder(event)
        /**
         * Triggers when finishe sorting
         *
         * @property {object} event
         */
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
      this.$q.loading.show()

      try {
        const response = await store.dispatch(`${this.entity}/replace`, {
          payload: { order: this.identifiers },
          url: this.url || `${this.entity}/sort`
        })
        /**
         * Triggers when finishe sorting and api return success
         *
         * @property {object} response
         */
        this.$emit('success', response)
      } catch (error) {
        this.handleError(error)
      } finally {
        this.$q.loading.hide()
      }
    },

    handleError (error) {
      const { response } = error
      const exception = get(response, 'data.exception') || error.message

      this.$qs.error('Ops! Erro ao ordernar itens.', exception)
    }
  },

  beforeDestroy () {
    sortable.destroy()
  }
}
</script>
