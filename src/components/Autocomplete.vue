<template>
  <q-select v-model="selectModel" v-bind="$attrs" v-on="$listeners" :options="filteredOptions" use-input map-options emit-value outlined :fill-input="isTextType" :hide-selected="isTextType" @filter="filterOptions" @input="inputHandler" @input-value="setModel" clearable>
    <template v-slot:append>
      <q-icon name="o_search" />
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nenhum resultado foi encontrado.
        </q-item-section>
      </q-item>
    </template>

    <template v-if="hasOptionSlot" v-slot:option>
      <slot name="option" :results="filteredOptions"/>
    </template>

    <template v-if="hasSelectedItemSlot" v-slot:selected-item="scope">
      <slot name="selected-item" :scope="scope"/>
    </template>
  </q-select>
</template>

<script>
import Fuse from 'fuse.js'

let fuse = null

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
    },

    fuseOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      filteredOptions: [],
      results: [],
      search: '',
      selectModel: null
    }
  },

  watch: {
    search (value) {
      this.filter(value)
    },

    defaultFuseOptions (value) {
      fuse.options = { ...fuse.options, ...value }
    },

    options (value) {
      fuse.list = value
    }
  },

  created () {
    fuse = new Fuse(this.options, this.defaultFuseOptions)
  },

  computed: {
    hasResult () {
      return this.results.length
    },

    isTextType () {
      return !(this.$attrs.multiple || this.$attrs['use-chips'])
    },

    hasOptionSlot () {
      return !!(this.$slots.option || this.$scopedSlots.option)
    },

    hasSelectedItemSlot () {
      return !!(this.$slots['selected-item'] || this.$scopedSlots['selected-item'])
    },

    formattedResult () {
      if (!this.labelKey && !this.valueKey) {
        return this.options
      }

      return this.options.map(item => this.renameKey(item))
    },

    defaultFuseOptions () {
      return {
        distance: 100,
        keys: ['label', 'value'],
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.1,
        tokenize: true,
        ...this.fuseOptions
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

    filterOptions (value, update) {
      update(() => {
        if (value === '') {
          this.filteredOptions = this.formattedResult
        } else {
          this.filteredOptions = fuse.search(value)
        }
      })
    },

    inputHandler (value) {
      this.$emit('input', this.selectModel)
    },

    setModel (value) {
      this.selectModel = value
    }
  }
}
</script>
