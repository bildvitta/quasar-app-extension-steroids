<template>
  <qs-search-box :list="sortedOptions" v-bind="$attrs" class="q-pa-md" :fuse-options="fuseOptions">
    <template v-slot="{ results }">
      <q-list separator>
        <q-item v-for="(result, index) in results" :key="index">
          <slot name="item" v-bind="self">
            <slot name="item-section" :result="result">
              <q-item-section class="text-bold items-start">
                <div :class="labelClass" @click="redirectRoute(result)">{{ result.label }}</div>
              </q-item-section>
            </slot>

            <q-item-section avatar>
              <slot name="item-action" v-bind="self">
                <qs-btn @click="handleClick(result)" hide-mobile-label v-bind="setButtonProps(result)" size="sm" />
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

    to: {
      type: Object,
      default: () => ({})
    },

    toIdentifier: {
      type: String,
      default: 'value'
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
      sortedOptions: [],
      values: []
    }
  },

  watch: {
    value (value) {
      this.values = [...value]
    },

    options: {
      handler (value) {
        if (!this.sortedOptions.length) {
          this.sortedOptions = value
        }
      },

      immediate: true
    }
  },

  created () {
    this.values = [...this.value]

    this.handleOptions()
  },

  computed: {
    self () {
      return this
    },

    isMobile () {
      return this.$q.screen.xs
    },

    isRedirectEnabled () {
      return Object.keys(this.to).length
    },

    labelClass () {
      return this.isRedirectEnabled ? 'cursor-pointer' : ''
    }
  },

  methods: {
    setButtonProps ({ value }) {
      const isSelected = this.values.includes(value)

      return {
        label: isSelected ? 'Remover' : 'Adicionar',
        icon: !this.isMobile ? undefined : isSelected ? 'o_close' : 'o_add',
        dense: this.isMobile,
        outline: isSelected
      }
    },

    handleOptions () {
      if (this.value.length) {
        return this.sortOptions()
      }

      const unwatch = this.$watch('value', (value => {
        if (!this.sortedOptions.length) {
          this.sortOptions()
          unwatch()
        }
      }))
    },

    sortOptions () {
      this.sortedOptions = this.deleteOnly
        ? this.options.filter(option => this.value.includes(option.value))
        : sortBy(this.options, option => !this.value.includes(option.value))
    },

    handleClick (item) {
      return this.values.includes(item.value) ? this.remove(item) : this.add(item)
    },

    add (item) {
      this.values.push(item.value)
      this.updateModel()
    },

    remove (item) {
      const index = this.values.findIndex(value => value === item.value)

      this.values.splice(index, 1)
      this.updateModel()
    },

    updateModel () {
      this.$emit('input', this.values)
    },

    redirectRoute (item) {
      return this.isRedirectEnabled && this.$router.push({
        params: { id: item[this.toIdentifier] },
        ...this.to
      })
    }
  }
}
</script>
