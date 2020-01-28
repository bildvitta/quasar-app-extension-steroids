<template>
  <q-table class="bg-transparent" v-bind="attributes">
    <template v-for="(slot, key) in $scopedSlots" v-slot:[key]="context">
      <q-td :key="key" :props="context">
        <slot :name="key" v-bind="context" />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { extend } from 'quasar'
import { dateTime, optionLabel } from 'steroids'

export default {
  props: {
    columns: {
      default: () => [],
      type: Array
    },

    fields: {
      default: () => ({}),
      type: [Array, Object]
    },

    order: {
      default: () => [],
      type: Array
    },

    results: {
      default: () => [],
      required: true,
      type: Array
    },

    rowKey: {
      default: 'name',
      type: String
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
          const field = this.fields[key]

          if (field && field.type === 'datetime') {
            result[key] = dateTime(result[key])
          }

          if (field && field.type === 'select') {
            result[key] = optionLabel(field.options, result[key])
          }
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
        const { label, name } = field
        columns.push({ align: 'left', field: name, label, name })
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