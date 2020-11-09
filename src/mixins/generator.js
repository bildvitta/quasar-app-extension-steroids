const irregularClasses = ['col', 'col-auto', 'fit']

export default {
  props: {
    gutter: {
      default: 'md',
      type: [String, Boolean]
    },

    fields: {
      default: () => ({}),
      type: Object
    },

    columns: {
      default: () => [],
      type: [Array, String]
    }
  },

  computed: {
    classes () {
      const classes = ['row']

      if (this.gutter) {
        classes.push(`q-col-gutter-${this.gutter}`)
      }

      return classes
    }
  },

  methods: {
    breakpoint (columns) {
      const classes = []
      const profiles = { col: 'col', xs: 'col-xs', sm: 'col-sm', md: 'col-md', lg: 'col-lg', xl: 'col-xl' }

      for (const key in columns) {
        const value = columns[key]
        classes.push(irregularClasses.includes(value) ? value : `${profiles[key]}-${value}`)
      }

      return classes
    },

    getFieldClass (index, isGridGenerator) {
      if (typeof this.columns === 'string') {
        return irregularClasses.includes(this.columns) ? this.columns : `col-${this.columns}`
      }

      const fields = isGridGenerator ? this.fields : this.groupedFields.visible

      if (!Array.isArray(fields)) {
        index = Object.keys(fields).findIndex(field => field === index)
      }

      const length = this.columns.length

      if (!length) {
        return isGridGenerator ? 'col-6 col-sm-4' : 'col-6'
      }

      return this.breakpoint(this.columns[index])
    }
  }
}
