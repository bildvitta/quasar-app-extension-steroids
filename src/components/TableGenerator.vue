<template>
  <q-table class="bg-transparent" v-bind="attributes">
    <template v-for="(slot, key) in $scopedSlots" v-slot:[key]="context">
      <q-td :key="key" :props="context">
        <slot :name="key" v-bind="context" :raw="raw" />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { extend } from 'quasar'
import { humanize } from '../helpers/filters'
/**
 * Componente para gerar tabela dinamicamente
 */
export default {
  props: {
    /**
     * Colunas
     */
    columns: {
      default: () => [],
      type: Array
    },
    /**
     * Campos da api
     */
    fields: {
      default: () => ({}),
      type: [Array, Object]
    },
    /**
     * @ignore
     */
    order: {
      default: () => [],
      type: Array
    },
    /**
     * Resultados da api
     */
    results: {
      default: () => [],
      required: true,
      type: Array
    },
    /**
     * Propriedade de cada linha que define a chave exclusiva de cada linha
     */
    rowKey: {
      default: 'name',
      type: String
    }
  },

  data () {
    return {
      raw: {}
    }
  },

  computed: {
    attributes () {
      const attributes = {
        flat: true,
        columns: this.columnsByFields,
        data: this.resultsByFields,
        hideBottom: true,
        pagination: { rowsPerPage: 0 },
        rowKey: this.rowKey
      }

      return attributes
    },

    resultsByFields () {
      const results = extend(true, [], this.results)

      return results.map(result => {
        for (const key in result) {
          this.raw[key] = result[key]
          result[key] = humanize(this.fields[key], result[key])
        }

        return result
      })
    },

    columnsByFields () {
      if (!this.hasFields) {
        return this.columns.filter(column => column instanceof Object)
      }

      const columns = []

      function columnByField (field) {
        const { align, label, name } = field
        columns.push({ align: align || 'left', field: name, label, name })
      }

      // Automatic columns.
      if (!this.columns.length) {
        for (const index in this.fields) {
          columnByField(this.fields[index])
        }

        return columns
      }

      // Sorting from the column list.
      this.columns.forEach(column => {
        if (column instanceof Object) {
          columnByField(column)
        } else if (this.fields[column]) {
          columnByField(this.fields[column])
        }
      })

      return columns
    },

    hasFields () {
      return Object.keys(this.fields).length
    },

    rowsPerPage () {
      return this.results.length
    }
  }
}
</script>