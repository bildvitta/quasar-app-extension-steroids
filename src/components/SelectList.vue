<template>
  <qs-search-box :list="options" class="q-pa-md" :fuse-options="fuseOptions">
    <template v-slot="{ results }">
      <q-list separator>
        <q-item v-for="(result, index) in results" :key="index">
          <slot name="label-section">
            <q-item-section>{{ result.label }}</q-item-section>
            <q-item-section avatar>
              <q-btn @click="handleClick(result)" :label="setButtonProps(result).label" color="primary" :outline="setButtonProps(result).outline" no-caps />
            </q-item-section>
          </slot>
        </q-item>
      </q-list>
    </template>
  </qs-search-box>
</template>

<script>
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

  watch: {
    value: {
      handler (value) {
        this.$emit('input', value)
      },
      immedite: true
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
      const isSelected = this.value.includes(item.value)

      return isSelected ? this.remove(item) : this.add(item)
    },

    add (item, index) {
      this.value.push(item.value)
    },

    remove (item) {
      const index = this.value.findIndex(value => value === item.value)

      this.value.splice(index, 1)
    },
  }
}
</script>
