<template>
  <qs-slider ref="boardSlider" class="flex" :style="maxHeight" :sorting="isSorting">
    <qs-column-board ref="columnBoard" v-for="item in 8" :key="item">
      <template v-slot:header>
        {{ title }}
        <q-popup-edit v-model="title">
          <q-input v-model="title" dense autofocus counter />
        </q-popup-edit>
      </template>
      <qs-card-board v-model="card" v-for="item in 3" :key="item" />
      <template v-slot:footer>
        <qs-add-card v-model="card.nome" @add="addCard($event, 'eae')"/>
      </template>
    </qs-column-board>
  </qs-slider>
</template>

<script>
import Sortable from 'sortablejs'

let sortableColumn = null
const sortableCard = []

const defaultSortableOptions = {
  animation: 350,
  scroll: true,
  fallbackOnBody: true,
  swapThreshold: 1
}

export default {
  props: {
    sortableColumnOptions: {
      type: Object,
      default: () => ({ ...defaultSortableOptions })
    },

    sortableCardOptions: {
      type: Object,
      default: () => ({ ...defaultSortableOptions })
    },

    sortableOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      windowHeight: window.innerHeight,
      boardTopPosition: null,
      isSorting: false,
      title: 'titulo',
      // card
      card: {
        nome: 'douglas',
        idade: 22
      }
    }
  },

  created () {
    !this.$q.platform.is.desktop && this.$q.notify({
      message: 'A opção de ordenar está disponivél somente para desktop.'
    }) || this.$emit('sortable-not-supported')
  },

  mounted () {
    this.$nextTick(() => {
      this.getBoardTopPosition()
      this.setResizeEvent()
    })

    this.setSortable()
  },

  destroyed () {
    window.removeEventListener('resize', this.controlHeight)
    this.destroySortable()
  },

  computed: {
    maxHeight () {
      const maxHeight = `${this.windowHeight - this.boardTopPosition - 20}px`
      return this.boardTopPosition && { maxHeight }
    }
  },

  methods: {
    getBoardTopPosition () {
      this.boardTopPosition = this.$el.offsetTop
    },

    controlHeight () {
      this.windowHeight = window.innerHeight
      this.getBoardTopPosition()
    },

    setResizeEvent () {
      window.addEventListener('resize', this.controlHeight)
    },

    setSortableColumn () {
      sortableColumn = new Sortable(this.$el.childNodes[0].childNodes[0], {
        group: 'column',
        ...this.sortableColumnOptions,
        ...this.sortableOptions,

        onStart: event => {
          console.log('olokinho meu')
          this.isSorting = true
        }
      })
    },

    setSortableCard () {
      this.$refs.columnBoard.forEach(boardElement => {
        // adiciona uma lista instâncias do sortable dos cards
        sortableCard.push(
          new Sortable(boardElement.$refs.columnBoardContent, {
            group: 'card',
            ...this.sortableCardOptions,
            ...this.sortableOptions,

            onStart: event => {
              this.isSorting = true
            }
          })
        )
      })
    },

    setSortable () {
      this.$q.platform.is.desktop && (this.setSortableColumn() || this.setSortableCard())
    },

    destroySortable () {
      sortableColumn.destroy()
      sortableCard.forEach(card => card.destroy())
    },

    addCard (value, value2) {
      console.log(value, value2)
    }
  }
}
</script>
