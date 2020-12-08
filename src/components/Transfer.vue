<template>
  <div class="row q-my-xl transfer q-col-gutter-md">
    <div class="col-12 col-sm">
      <qs-search-box :list="clonedList" form-mode v-bind="searchBoxProps">
        <template v-slot="{ results }">
          <q-list separator>
            <q-item v-for="(item, index) in results" :key="index" clickable :class="itemClass(item, true)" @click="onSelectQueue(item, true)">
              <slot name="item-first-column">
                <q-item-section>{{ item.label }}</q-item-section>
              </slot>
            </q-item>
          </q-list>
        </template>
      </qs-search-box>
    </div>

    <div class="col-sm-1 col-12 row justify-center items-center q-col-gutter-md" :class="actionsClass">
      <div>
        <div>
          <qs-btn :class="iconClass" icon="o_arrow_circle_down" rounded flat :disabled="!firstQueue.length" @click="handleSelectedList(true)" />
          <q-tooltip anchor="top middle" self="center middle">Transferir</q-tooltip>
        </div>
      </div>
      <div>
        <div>
          <qs-btn :class="iconClass" icon="o_arrow_circle_up" rounded flat :disabled="!secondQueue.length" @click="handleSelectedList()" />
          <q-tooltip anchor="bottom middle" self="center middle">Transferir</q-tooltip>
        </div>
      </div>
    </div>

    <div class="col-12 col-sm">
      <qs-search-box :list="selectedList" form-mode v-bind="searchBoxProps">
        <template v-slot="{ results }">
          <q-list separator>
            <q-item v-for="(item, index) in results" :key="index" clickable :class="itemClass(item)" @click="onSelectQueue(item)">
              <slot name="item-second-column">
                <q-item-section>{{ item.label }}</q-item-section>
              </slot>
            </q-item>
          </q-list>
        </template>
      </qs-search-box>
    </div>
  </div>
</template>

<script>
import { extend } from 'quasar'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },

    emitValue: {
      type: Boolean
    },

    list: {
      type: Array,
      default: () => []
    },

    fuseOptions: {
      type: Object,
      default: () => ({ keys: ['label'] })
    },

    hideEmptySlot: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      firstQueue: [],
      secondQueue: [],
      clonedList: [],
      selectedList: []
    }
  },

  watch: {
    list: {
      handler (value) {
        this.clonedList = extend(true, [], value)
      },

      immediate: true
    }
  },

  computed: {
    isMobile () {
      return this.$q.screen.xs
    },

    iconClass () {
      return !this.isMobile && 'transfer__icon'
    },

    actionsClass () {
      return !this.isMobile && 'column'
    },

    searchBoxProps () {
      return {
        list: this.list,
        fuseOptions: this.fuseOptions,
        hideEmptySlot: this.hideEmptySlot
      }
    }
  },

  methods: {
    onSelectQueue (item, isFirst) {
      const model = isFirst ? 'firstQueue' : 'secondQueue'
      const index = this[model].findIndex(selected => selected.value === item.value)

      if (~index) {
        return this[model].splice(index, 1)
      }

      return this[model].push(item)
    },

    itemClass ({ value }, isFirst) {
      return this[isFirst ? 'firstQueue' : 'secondQueue'].some(item => item.value === value) && 'bg-secondary'
    },

    handleSelectedList (isFirst) {
      const model = isFirst ? 'firstQueue' : 'secondQueue'

      this[isFirst ? 'selectedList' : 'clonedList'].push(...this[model])

      this.deleteItemsFromList(isFirst)
      this.$emit('input', this.handleEmit())

      this[model] = []
    },

    handleEmit () {
      return this.emitValue ? this.selectedList.map(item => item.value) : this.selectedList
    },

    deleteItemsFromList (isFirst) {
      this[isFirst ? 'firstQueue' : 'secondQueue'].forEach(({ value }) => {
        const model = isFirst ? 'clonedList' : 'selectedList'
        const index = this[model].findIndex(item => item.value === value)

        if (~index) {
          this[model].splice(index, 1)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.transfer {
  &__icon {
    transform: rotate(-90deg);
  }
}
</style>
