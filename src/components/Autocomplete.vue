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
      filteredOptions: [],
      loadingState: false,
      result: [],
      selectModel: null,
      search: '',
      fuse: null,
      fuseError: null,
      fetchingFuse: false,
      formatted: []
    }
  },

  watch: {
    search (value) {
      this.filter(value)
    },

    options () {
      if (!this.fuseError || !this.fetchingFuse) {
        fuse.options = { ...this.defaultOptions }
      }
    }
  },

  mounted() {
    console.log(this.$scopedSlots, this.$slots)
  },

  created () {
    this.fetchFuse()
  },

  computed: {
    hasResult () {
      return this.result.length
    },

    formattedResult () {
      if (!this.labelKey && !this.valueKey) {
        return null
      }

      return this.list.map(item => this.format(item))
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
    },

    style () {
      return { maxHeight: '65vh' }
    }
  },

  methods: {
    format (item) {
      const fromTo = { label: this.labelKey, value: this.valueKey }

      for (const key in fromTo) {
        if (!item[key]) {
          item[key] = item[fromTo[key]]

          delete item[fromTo[key]]
        }
      }

      return item
    },

    async fetchFuse () {
      this.fetchingFuse = true

      // import('fus.js').then().catch(() => console.log('tururu'))

      try {
        const response = (await (import('fuse.js'))).default

        fuse = new response(this.list, this.defaultOptions)
      } catch {
        console.log('cai')
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

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .hightlight {
    color: $primary;
  }
</style>