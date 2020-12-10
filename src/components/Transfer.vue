<template>
  <div class="row q-my-xl transfer q-col-gutter-md">
    <div class="col-12">

    <pre>{{ seletedList2 }}</pre>
    ------------------
    <pre>{{ seletedList3 }}</pre>
    </div>
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
          <qs-btn :class="iconClass" icon="o_arrow_circle_down" rounded flat :disabled="!firstQueue.length" @click="setSelectedFromClick(true)" />
          <q-tooltip anchor="top middle" self="center middle">Transferir</q-tooltip>
        </div>
      </div>
      <div>
        <div>
          <qs-btn :class="iconClass" icon="o_arrow_circle_up" rounded flat :disabled="!secondQueue.length" @click="setSelectedFromClick()" />
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
import rename from '../mixins/rename'

export default {
  mixins: [rename],

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
    }
  },

  data () {
    return {
      firstQueue: [],
      secondQueue: [],
      clonedList: [],
      selectedList: [],
      fromClick: false
    }
  },

  watch: {
    formattedOptions: {
      handler (value) {
        this.clonedList = extend(true, [], value)
      },

      immediate: true
    },

    // value (value) {
    //   this.setSelectedFromValue(true)
    //   // this.fromClick = false
    // },

    selectedList (value) {
      console.log('fui chamado no selectedlist', value)
    }
  },

  created () {
    // if (this.value.length) {
    //   this.setSelectedFromValue(true)
    //   this.$emit('input', this.handleEmit())
    //   return 
    // }

    // const unwatch = this.$watch('value', (value => {
    //   if (!this.value.length) {
    //     console.log('deu ruim')
    //     this.setSelectedFromValue(true)
    //     unwatch()
    //   }
    // }))
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
        list: this.formattedOptions,
        fuseOptions: this.fuseOptions,
        hideEmptySlot: this.hideEmptySlot
      }
    },

    formattedSelecList () {
      const test = extend(true, [], this.selectedList)
      return test.map(item => this.renameKey(item, true))
    },

    formattedValue () {
      if (!this.hasModifierKey || this.emitValue) {
        return this.value
      }

      const test = extend(true, [], this.value)

      return test.map(item => this.renameKey(item))
    },

    seletedList2 () {
      // [{ label: 'test', value: 1 }]
      // [1]
      // [{{ label: 'test', value: 1 }}]
      return extend(true, [], this.formattedOptions).filter(item => {
        if (this.emitValue) {
          return this.formattedValue.includes(item.value)
        }

        return this.formattedValue.find(value => value.value === item.value)
      })
    },

    seletedList3 () {
      // [{ label: 'test', value: 1 }]
      // [1]
      // [{{ label: 'test', value: 1 }}]
      return extend(true, [], this.formattedOptions).filter(item => {
        if (this.emitValue) {
          return !this.formattedValue.includes(item.value)
        }

        return !this.formattedValue.find(value => value.value === item.value)
      })
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

    async setSelectedFromValue (isFirst) {
      const first = []
      console.log(this.formattedOptions, '>>>> depois')
      // console.log(this.firstQueue, '.>>>>>> aqui é')
      this.formattedValue.forEach(item => {
        first.push(this.formattedOptions.find(option => option.value === (this.emitValue ? item : item.value)))
      })

      this.firstQueue = extend(true, [], first)

      // console.log(this.firstQueue, '>>>>>>>>> first')

      this.handleSelectedList(isFirst)
    },

    setSelectedFromClick (isFirst) {
      this.handleSelectedList(isFirst)
      this.$emit('input', this.handleEmit())
      this.fromClick = true
      console.log('setSelectedFromClick')
    },

    itemClass ({ value }, isFirst) {
      return this[isFirst ? 'firstQueue' : 'secondQueue'].some(item => item.value === value) && 'bg-secondary'
    },

    handleSelectedList (isFirst) {
      const model = isFirst ? 'firstQueue' : 'secondQueue'

      this[isFirst ? 'selectedList' : 'clonedList'].push(...this[model])
      console.log("handleSelectedList -> this[model]", this[model])

      this.deleteItemsFromList(isFirst)

      this[model] = []
    },

    handleEmit () {
      return this.emitValue ? this.selectedList.map(item => item.value) : this.formattedSelecList
    },

    updateValue () {
      return this.$emit('input', this.handleEmit())
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
