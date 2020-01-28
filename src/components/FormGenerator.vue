<template>
  <div>
    <div :class="classes">
      <div v-for="(field, key) in groupedFields.visible" :key="key" :class="getFieldClass(key)">
        <slot :name="`field-${field.name}`" :field="field">
          <qs-field :value="value[field.name]" :error="errors[key]" :field="field" @input="emitValue(field.name, $event)" />
        </slot>
      </div>
    </div>

    <div v-for="(field, key) in groupedFields.hidden" :key="key">
      <slot :name="`field-${field.name}`" :field="field">
        <qs-field :value="value[field.name]" :field="field" @input="emitValue(field.name, $event)" />
      </slot>
    </div>
  </div>
</template>

<script>
const irregularClasses = ['fit']

export default {
  props: {
    columns: {
      default: () => [],
      type: [Array, String]
    },

    errors: {
      default: () => ({}),
      type: Object
    },

    fields: {
      default: () => ({}),
      type: Object
    },

    gutter: {
      default: 'md',
      type: [String, Boolean]
    },

    value: {
      default: () => ({}),
      type: Object,
      required: true
    }
  },

  computed: {
    classes () {
      const classes = ['row']

      if (this.gutter) {
        classes.push(`q-col-gutter-${this.gutter}`)
      }

      return classes
    },

    groupedFields () {
      const fields = { hidden: {}, visible: {} }

      for (const key in this.fields) {
        const field = this.fields[key]
        fields[field.type === 'hidden' ? 'hidden' : 'visible'][key] = field
      }

      return fields
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

    emitValue (key, value) {
      const models = { ...this.value }
      models[key] = value

      this.$emit('input', models)
    },

    getFieldClass (index) {
      if (typeof this.columns === 'string') {
        return irregularClasses.includes(this.columns) ? this.columns : `col-${this.columns}`
      }

      const fields = this.groupedFields.visible

      if (!Array.isArray(fields)) {
        index = Object.keys(fields).findIndex(field => field === index)
      }

      const length = this.columns.length

      if (!length) {
        return 'col-6'
      }

      return this.breakpoint(this.columns[index])
    }
  }
}
</script>
