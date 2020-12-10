import { extend } from 'quasar'

export default {
  props: {
    labelKey: {
      type: String,
      default: ''
    },

    valueKey: {
      type: String,
      default: ''
    },

    options: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    hasModifierKey () {
      return this.labelKey || this.valueKey
    },

    formattedOptions () {
      if (!this.hasModifierKey) {
        return this.list
      }

      return this.options.map(item => this.renameKey(item))
    }
  },

  methods: {
    renameKey (item, inverse) {
      const mapKeys = inverse
        ? { [this.labelKey]: 'label', [this.valueKey]: 'value' }
        : { label: this.labelKey, value: this.valueKey }

      for (const newKey in mapKeys) {
        if (!Object.prototype.isPrototypeOf.call(item, newKey)) {
          item[newKey] = item[mapKeys[newKey]]

          delete item[mapKeys[newKey]]
        }
      }

      return item
    }
  }
}
