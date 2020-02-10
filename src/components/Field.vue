<template>
  <component :is="component.is" v-bind="component" :value="$attrs.value" @input="emitValue" />
</template>

<script>
export default {
  props: {
    error: {
      default: '',
      type: [String, Array]
    },

    field: {
      default: () => ({}),
      type: Object,
      required: true
    }
  },

  computed: {
    component () {
      const { entity, extensions, label, multiple, name, options, type } = this.field

      // Default error attributes for Quasar.
      const error = {
        error: this.hasError || undefined,
        errorMessage: this.errorMessage || undefined
      }

      // Compact default fields attributes.
      const input = { label, outlined: true, type, ...error }
      console.log(input)

      const datetimeInput = { is: 'qs-datetime-input', ...input }
      const decimalInput = { is: 'qs-decimal-input', comma: true, fillMask: '0', reverseFillMask: true, ...input }

      // It'll generate a list of acceptable files extensions.
      const accept = extensions && extensions.length ? extensions.map(extension => `.${extension}`).join(',') : false

      // Editor default toolbar.
      const toolbar = [
        ['undo', 'redo'],
        ['bold', 'italic', 'underline'],
        ['left', 'center', 'right', 'justify'],
        ['hr', 'link'],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['print', 'fullscreen']
      ]

      // Profiles
      const profiles = {
        default: { is: 'q-input', ...input },
        hidden: { is: 'input', name, type },

        decimal: { ...decimalInput },
        money: { ...decimalInput, prefix: 'R$' },
        percent: { ...decimalInput, suffix: '%' },

        date: { ...datetimeInput, dateOnly: true },
        datetime: { ...datetimeInput },
        time: { ...datetimeInput, timeOnly: true },

        boolean: { is: 'q-toggle', label, ...error },
        checkbox: { is: 'qs-checkbox-group', label, options, ...error },
        radio: { is: 'q-option-group', label, options, type: 'radio', ...error },

        select: { is: 'q-select', emitValue: true, mapOptions: true, multiple, options, ...input },
        upload: { is: 'qs-uploader', accept, autoUpload: true, entity, label, multiple, ...error },
        editor: { is: 'q-editor', toolbar, ...error }
      }

      return { ...(profiles[type] || profiles.default), ...this.$attrs }
    },

    errorMessage () {
      return Array.isArray(this.error) ? this.error.join(' ') : this.error
    },

    hasError () {
      return !!(Array.isArray(this.error) ? this.error.length : this.error)
    }
  },

  methods: {
    emitValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
