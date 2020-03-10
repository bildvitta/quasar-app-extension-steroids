<template>
  <q-table class="bg-transparent" v-bind="attributes" @request="request" binary-state-sort :filter="filter" :pagination.sync="pagination2">
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

    externalFilter: {
      type: Function
    }
  },

  data () {
    return {
      raw: {},
      // loading: false,
      sortBy: '',
      fromTo: {},
      filter: '',
      orderList: [],
      pagination2: {
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

      // TODO remover
      columns.map(column => column.sortable = true)

      return columns
    },

    hasFields () {
      return Object.keys(this.fields).length
    },

    rowsPerPage () {
      return this.results.length
    }
  },

  mounted () {
    // this.request({
    //   pagination: this.pagination,
    //   filter: undefined
    // })
  },

  methods: {
    request (props) {
      const { rowsPerPage, sortBy, descending } = props.pagination || {}
      // this.attributes.pagination = !descending
      const filter = props.filter
      // const orderingList = []
      let cached = ''

      if (sortBy) {
        cached = sortBy
      }

      const cachedSort = this.sortBy
      this.sortBy = `${sortBy || cached}_${descending === false ? 'asc' : 'desc'}`
      const arr = []

      this.fromTo = {
        ...this.fromTo,
        [sortBy]: `${sortBy || cached}_${descending === false ? 'asc' : 'desc'}`
      }

      for (const key in this.fromTo) {
        arr.push(this.fromTo[key])
      }

      this.$router.push({ query: { ...this.$route.query, queryordering: arr.join(',') } })

      // if (!this.orderList.includes(this.sortBy)) {
      //   this.orderList.push(this.sortBy)

      //   this.orderList.forEach((order, index) => {
      //     if (order.startsWith(sortBy) && this.orderList.indexOf(cachedSort) >= index && cachedSort !== sortBy) {
      //       // if (this.orderList.indexOf(cachedSort) >= index && cachedSort !== sortBy) {
      //         this.orderList.splice(this.orderList.indexOf(cachedSort) , 1)
      //       // }
      //     }
      //   })
      // }

      // this.formatOrdering()


      this.pagination2.descending = descending
      this.pagination2.rowsPerPage = rowsPerPage
      this.pagination2.sortBy = sortBy || cached

      // delete this.$route.query.ordering
      // this.$router.push({ query: { ordering: this.orderList.join(',') } })
      // this.$router.push({ query: { group_slug_eq: '' } })
      // console.log('aqui')
      // this.$router.push({ query: { page: '2' } })

      // console.log(this.query)
      this.$emit('request-table', props)
    },

    formatOrdering () {
      const { ordering } = this.$route.query
      const orderingList = (ordering || '').split(',')

      orderingList.forEach(order => {
        if (!order.startsWith(this.sortBy)) {
          console.log(this.orderList)
          this.$router.push({ query: { ordering: this.orderList.join(',') } })
        }
      })

      // this.orderList.forEach((order, index) => {
      //   if (order.startsWith(this.sortBy) && this.orderList.includes(this.sortBy)) {
      //     console.log('cai', order)
      //     this.orderList.splice(index, 1)
      //   }
      // })
    }
  }
}
</script>
