<template>
  <q-select v-model="selectModel" v-bind="$attrs" v-on="$listeners" :options="filteredOptions" use-input map-options emit-value outlined input-debounce="0" @filter="filterOptions" @input="inputHandler" @input.native="clearSelectModel" @keyup.delete="clearSelectModel" clearable>
    <template v-slot:append>
      <q-icon name="o_search" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nenhum resultado encontrado.
        </q-item-section>
      </q-item>
    </template>
    <template v-if="hasOptionSlot" v-slot:option>
      <slot name="option" :result="filteredOptions"/>
    </template>
    <template v-if="hasSelectedItemSlot" v-slot:selected-item="scope">
      <slot name="selected-item" :scope="scope"/>
    </template>
  </q-select>
</template>

<script>
let fuse = null

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },

    labelKey: {
      type: String,
      default: ''
    },

    valueKey: {
      type: String,
      default: ''
    },

    options: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      fetchingFuse: false,
      filteredOptions: [],
      fuse: null,
      fuseError: null,
      result: [],
      search: '',
      selectModel: null
    }
  },

  watch: {
    search (value) {
      this.filter(value)
    },

    defaultOptions (value) {
      if (!this.fuseError || !this.fetchingFuse) {
        fuse.options = { ...fuse.options, ...value }
      }
    }
  },

  created () {
    this.fetchFuse()
  },

  computed: {
    hasResult () {
      return this.result.length
    },

    hasOptionSlot () {
      return !!(this.$slots.option || this.$scopedSlots.option)
    },

    hasSelectedItemSlot () {
      return !!(this.$slots['selected-item'] || this.$scopedSlots['selected-item'])
    },

    formattedResult () {
      if (!this.labelKey && !this.valueKey) {
        return null
      }

      return this.list.map(item => this.renameKey(item))
    },

    defaultOptions () {
      return {
        distance: 100,
        keys: [ 'label', 'value'],
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.1,
        tokenize: true,
        ...this.options
      }
    }
  },

  methods: {
    renameKey (item) {
      const mapKeys = { label: this.labelKey, value: this.valueKey }

      for (const newKey in mapKeys) {
        if (!item.hasOwnProperty(newKey)) {
          item[newKey] = item[mapKeys[newKey]]

          delete item[mapKeys[newKey]]
        }
      }

      return item
    },

    async fetchFuse () {
      this.fetchingFuse = true

      try {
        const response = (await (import('fuse.js'))).default

        fuse = new response(this.list, this.defaultOptions)
      } catch {
        this.fuseError = true
      } finally {
        this.fetchingFuse = false
      }
    },

    filterOptions (value, update) {
      update(() => {
        if (value === '') {
          this.filteredOptions = this.formattedResult
        } else {
          const filtered = value.toLowerCase().trim()

          this.filteredOptions = (this.fuseError || this.fetchingFuse
            ? this.formattedResult.filter(item => item.label.toLowerCase().indexOf(filtered) > -1)
            : fuse.search(value)
          )
        }
      })
    },

    inputHandler (value) {
      this.$emit('input', this.selectModel)
    },

    clearSelectModel () {
      if (this.selectModel && (!this.$attrs.multiple || !this.$attrs.useChips)) {
        this.selectModel = ''
      }
    }
  }
}
</script>