<template>
  <q-select v-model="selectModel" v-bind="$attrs" v-on="$listeners" :options="filteredOptions" use-input map-options emit-value outlined :fill-input="!multiple" :hide-selected="!multiple" @filter="filterOptions" clearable>
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

    <template v-if="hasOptionSlot" v-slot:option="scope">
      <slot name="option" :scope="scope"/>
    </template>
  </q-select>
</template>

<script>
import Fuse from 'fuse.js'
import rename from '../mixins/rename'

let fuse = null

export default {
  mixins: [rename],

  props: {
    value: {
      type: [String, Object, Array],
      default: ''
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
      if (!this.filteredOptions.length) {
        this.filteredOptions = value
      }

      fuse.list = value
    },

    value (value) {
      this.$emit('input', value)
    }
  },

  created () {
    if (this.value) {
      this.selectModel = this.multiple ? [this.value] : this.value
    }

    fuse = new Fuse(this.options, this.defaultFuseOptions)
  },

  computed: {
    hasResult () {
      return this.results.length
    },

    multiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    hasOptionSlot () {
      return !!(this.$slots.option || this.$scopedSlots.option)
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
    filterOptions (value, update) {
      update(() => {
        if (value === '') {
          this.filteredOptions = this.formattedOptions
        } else {
          this.filteredOptions = fuse.search(value)
        }
      })
    }
  }
}
</script>
