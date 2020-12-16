<template>
  <div class="row transfer" :class="gutterClass">
    <div class="col-12 col-sm">
      <qs-label :label="label" :quantity="optionsList.length" />

      <qs-search-box :list="optionsList" form-mode v-bind="searchBoxProps">
        <template v-slot="{ results }">
          <q-list separator>
            <q-item v-for="(item, index) in results" :key="index" clickable :class="itemClass(item, true)" @click="onSelectQueue(item, true)">
              <slot name="item-first-column">
                <q-item-section>{{ item[labelKey] }}</q-item-section>
              </slot>
            </q-item>
          </q-list>
        </template>
      </qs-search-box>
    </div>

    <div class="col-sm-auto col-12 row justify-center items-center q-col-gutter-md" :class="actionsClass">
      <div>
        <div>
          <qs-btn :class="iconClass" icon="o_arrow_circle_down" dense rounded flat :disabled="!firstQueue.length" @click="setSelectedFromClick(true)" />
          <q-tooltip anchor="top middle" self="center middle">Transferir</q-tooltip>
        </div>
      </div>
      <div>
        <div>
          <qs-btn :class="iconClass" icon="o_arrow_circle_up" dense rounded flat :disabled="!secondQueue.length" @click="setSelectedFromClick()" />
          <q-tooltip anchor="bottom middle" self="center middle">Transferir</q-tooltip>
        </div>
      </div>
    </div>

    <div class="col-12 col-sm">
      <qs-label label="Selecionadas" :quantity="selectedList.length" />

      <qs-search-box :list="selectedList" form-mode v-bind="searchBoxProps" label="Selecionadas" :quantity="selectedList.length">
        <template v-slot="{ results }">
          <q-list separator>
            <q-item v-for="(item, index) in results" :key="index" clickable :class="itemClass(item)" @click="onSelectQueue(item)">
              <slot name="item-second-column">
                <q-item-section>{{ item[labelKey] }}</q-item-section>
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

    fuseOptions: {
      type: Object,
      default: () => ({ keys: ['label'] })
    },

    hideEmptySlot: {
      type: Boolean,
      default: true
    },

    labelKey: {
      type: String,
      default: 'label'
    },

    valueKey: {
      type: String,
      default: 'value'
    },

    options: {
      type: Array,
      default: () => []
    },

    label: {
      type: String,
      required: true,
      default: ''
    }
  },

  data () {
    return {
      firstQueue: [],
      secondQueue: [],
      selectedList: [],
      optionsList: []
    }
  },

  watch: {
    options: {
      handler (value) {
        this.optionsList = extend(true, [], value)
      },

      immediate: true
    },

    value: {
      handler (value, oldValue) {
        this.setSelectedFromValue(true)
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
        list: this.options,
        fuseOptions: this.fuseOptions,
        hideEmptySlot: this.hideEmptySlot
      }
    },

    isMedium () {
      return this.$q.screen.lt.md
    },

    gutterClass () {
      return `q-col-gutter-${this.isMedium ? 'md' : 'xl'}`
    }
  },

  methods: {
    onSelectQueue (item, isFirst) {
      const model = isFirst ? 'firstQueue' : 'secondQueue'
      const index = this[model].findIndex(selected => selected[this.valueKey] === item[this.valueKey])

      if (~index) {
        return this[model].splice(index, 1)
      }

      return this[model].push(item)
    },

    setSelectedFromValue (isFirst) {
      this.value.forEach(item => {
        const selected = this.optionsList.find(option => {
          return option[this.valueKey] === (this.emitValue ? item : item[this.valueKey])
        })

        if (selected) {
          this.firstQueue.push(extend(true, {}, selected))
        }
      })

      this.handleSelectedList(isFirst)
    },

    setSelectedFromClick (isFirst) {
      this.handleSelectedList(isFirst)
      this.updateValue()
    },

    itemClass (object, isFirst) {
      return this[isFirst
        ? 'firstQueue'
        : 'secondQueue'
      ].some(item => item[this.valueKey] === object[this.valueKey]) && 'bg-secondary'
    },

    handleSelectedList (isFirst) {
      const model = isFirst ? 'firstQueue' : 'secondQueue'

      this[isFirst ? 'selectedList' : 'optionsList'].push(...this[model])

      this.deleteItemsFromList(isFirst)

      this[model] = []
    },

    handleEmit () {
      const selectedList = extend(true, [], this.selectedList)

      return this.emitValue ? selectedList.map(item => item[this.valueKey]) : selectedList
    },

    updateValue () {
      return this.$emit('input', this.handleEmit())
    },

    deleteItemsFromList (isFirst) {
      this[isFirst ? 'firstQueue' : 'secondQueue'].forEach((item) => {
        const model = isFirst ? 'optionsList' : 'selectedList'
        const index = this[model].findIndex(itemValue => {
          return (itemValue[this.valueKey] || itemValue) === item[this.valueKey]
        })

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
