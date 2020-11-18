<template>
  <qs-search-box :list="formattedOptions" v-bind="$attrs" class="q-pa-md" :fuse-options="fuseOptions">
    <template v-slot="{ results }">
      <q-list separator>
        <q-item v-for="(result, index) in results" :key="index">
          <slot name="item" v-bind="self">
            <slot name="item-section" :result="result">
              <q-item-section>{{ result.label }}</q-item-section>
            </slot>

            <q-item-section avatar>
              <slot name="item-action" v-bind="self">
                <q-btn @click="handleClick(result)" :label="setButtonProps(result).label" color="primary" :outline="setButtonProps(result).outline" no-caps />
              </slot>
            </q-item-section>
          </slot>
        </q-item>
      </q-list>
    </template>
  </qs-search-box>
</template>

<script>
import { sortBy } from 'lodash'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },

    value: {
      type: Array,
      default: () => []
    },

    deleteOnly: {
      type: Boolean
    },

    fuseOptions: {
      type: Object,
      default: () => ({
        keys: ['label']
      })
    }
  },

  data () {
    return {
      cachedValue: [],
      triggedClick: false,
      cachedOptions: [],
      values: []
    }
  },

  watch: {
    values: {
      handler (value) {
        this.$emit('input', value)
      },

      immediate: true
    }
  },

  created () {
    this.values = [...this.value]
  },

  computed: {
    self () {
      return this
    },

    isEnabledCachedOptions () {
      return this.values.length && this.options.length && !this.triggedClick
    },

    formattedOptions () {
      if (this.deleteOnly) {
        return this.options.filter(option => this.values.includes(option.value))
      }

      if (this.isEnabledCachedOptions) {
        this.cachedValue = [...this.values]
        this.cachedOptions = sortBy(this.options, option => !this.cachedValue.includes(option.value))
      }

      return this.cachedOptions.length ? this.cachedOptions : this.options
    }
  },

  methods: {
    setButtonProps ({ value }) {
      const isSelected = this.values.includes(value)

      return {
        label: isSelected ? 'Remover' : 'Adicionar',
        outline: isSelected
      }
    },

    handleClick (item) {
      this.triggedClick = true
      return this.values.includes(item.value) ? this.remove(item) : this.add(item)
    },

    add (item) {
      this.values.push(item.value)
    },

    remove (item) {
      const index = this.values.findIndex(value => value === item.value)

      this.values.splice(index, 1)
    }
  }
}
</script>
