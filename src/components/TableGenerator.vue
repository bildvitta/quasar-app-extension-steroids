<template>
  <q-table class="bg-transparent" v-bind="attributes" binary-state-sort @request="request" :pagination.sync="pagination">
    <template v-for="(slot, key) in $scopedSlots" v-slot:[key]="context">
      <q-td :key="key" :props="context">
        <slot :name="key" v-bind="context"/>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { extend } from 'quasar'
import { humanize } from '../helpers/filters'

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
    },

    noSortable: {
      type: [Boolean, String, Array]
    }
  },

  data () {
    return {
      raw: {},
      orderingMap: {},
      filter: '',
      pagination: {
        rowsNumber: 10,
        descending: false,
        sortBy: 'name',
      }
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

      return results.map((result, index) => {
        for (const key in result) {
          result.default = this.results[index]
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

      const columnByField = (field) => {
        const { align, label, name } = field
        const mapObject = { align: align || 'left', field: name, label, name }

        if (typeof this.noSortable === 'boolean') {
          return columns.push({ ...mapObject, sortable: !this.noSortable })
        }

        const noSortable = typeof this.noSortable === 'string' ? [this.noSortable] : this.noSortable

        return columns.push({ ...mapObject, sortable: !noSortable.find(item => item === name) })
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
  },

  methods: {
    request (props) {
      const { rowsPerPage, sortBy, descending } = props.pagination || {}
      const orderingList = []

      this.orderingMap = {
        ...this.orderingMap,
        [sortBy]: `${sortBy}_${descending === false ? 'asc' : 'desc'}`
      }

      for (const key in this.orderingMap) {
        orderingList.push(this.orderingMap[key])
      }

      this.$router.push({ query: { ...this.$route.query, ordering: orderingList.join(',') } })

      this.pagination.descending = descending
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
    }
  }
}
</script>
