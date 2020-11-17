<template>
  <qs-search-box :list="formattedOptions" v-bind="$attrs" class="q-pa-md" :fuse-options="fuseOptions">
    <template v-slot="{ results }">
      <q-list separator>
        <q-item v-for="(result, index) in results" :key="index">
          <slot name="item" v-bind="self">
            <slot name="item-section" :result="result">
              <q-item-section>{{ result.label }}</q-item-section>

              <q-item-section avatar>
                <slot name="item-action" v-bind="self">
                  <q-btn @click="handleClick(result)" :label="setButtonProps(result).label" color="primary" :outline="setButtonProps(result).outline" no-caps />
                </slot>
              </q-item-section>
            </slot>
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
      cachedOptions: []
    }
  },

  watch: {
    value: {
      handler (value) {
        this.$emit('input', value)
      },

      immediate: true
    }
  },

  computed: {
    self () {
      return this
    },

    isEnabledCachedOptions () {
      return this.value.length && this.options.length && !this.triggedClick
    },

    formattedOptions () {
      if (this.deleteOnly) {
        return this.options.filter(option => this.value.includes(option.value))
      }

      if (this.isEnabledCachedOptions) {
        this.cachedValue = [...this.value]
        this.cachedOptions = sortBy(this.options, option => !this.cachedValue.includes(option.value))
      }

      return this.cachedOptions.length ? this.cachedOptions : this.options
    }
  },

  methods: {
    setButtonProps ({ value }) {
      const isSelected = this.value.includes(value)

      return {
        label: isSelected ? 'Remover' : 'Adicionar',
        outline: isSelected
      }
    },

    handleClick (item) {
      this.triggedClick = true
      return this.value.includes(item.value) ? this.remove(item) : this.add(item)
    },

    add (item, index) {
      this.value.push(item.value)
    },

    remove (item) {
      const index = this.value.findIndex(value => value === item.value)

      this.value.splice(index, 1)
    }
  }
}
</script>
