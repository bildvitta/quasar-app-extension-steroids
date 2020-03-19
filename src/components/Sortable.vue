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
 * Este componente é para ordenar elementos quando arrastados.
 * Este component usa a biblioteca SortableJS: https://github.com/SortableJS/Sortable
 */
export default {
  props: {
    /**
     * Lista de elementos há serem ordenados
     */
    results: {
      type: Array,
      default: () => []
    },
    /**
     * Tag do componente
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Entidade da api para usar no storeModule e como endpoint
     */
    entity: {
      type: String,
      required: false
    },
    /**
     * Caso a entidade seja diferente do endpoit
     * você poderá usar essa prop para especificar qual é o endpoint correto
     */
    url: {
      type: String,
      default: ''
    },
    /**
     * Prop para passar as opções da biblioteca SortableJS.
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
         * Dispara evento nativo da bibliteca, que é acionado quando temrina de ordenar o elemento
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
         * Dispara quando termina de ordenar e a api retorna sucesso
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
