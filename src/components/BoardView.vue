<template>
  <!-- <qs-slider ref="boardSlider" class="flex" :style="maxHeight" :sorting="isSorting">
    <slot v-for="(column, index) in 10" :name="`column-${index}`" v-bind="self">
      <qs-column-board ref="columnBoard" :key="index">
        <template v-slot:header>
          <slot :name="`column-header-${index}`" :column="column">
            {{ title }}
            <q-popup-edit v-model="title">
              <q-input v-model="title" dense autofocus counter />
            </q-popup-edit>
          </slot>
        </template>
        <slot v-for="(card, cardIndex) in 3" :name="`card-${index}-${cardIndex}`">
          <qs-card-board v-model="card1" :key="cardIndex" />
        </slot>
        <template v-slot:footer>
          <slot :name="`column-header-${index}`" :column="column">
            <qs-add-card v-model="card1.nome" @add="addCard($event, 'eae')"/>
          </slot>
        </template>
      </qs-column-board>
    </slot>
    <template v-slot:slider-side>
      <slot name="slider-side">
        <qs-column-board>
          <template v-slot:actions>
            <q-btn label="Adicionar nova coluna"/>
          </template >
        </qs-column-board>
      </slot>
    </template>
  </qs-slider> -->
  <qs-slider ref="boardSlider" class="board-view flex" :style="maxHeight" :sorting="isSorting" @mouseover="mouseOver">
    <slot v-for="(column, index) in mock" :name="`column-${index}`" v-bind="self">
      <div ref="columnBoard" :key="index" class="board-view__column no-wrap column">
        <div class="board-view__box q-pa-sm rounded-borders">
          <slot name="column-header" :column="column">
            <header class="q-mb-sm q-mt-xs q-mx-sm text-weight-bold text-grey-9 flex justify-between">
              <div>
                {{ column.name }}
                <q-tooltip :offset="[10, 10]">
                  Clique para editar
                </q-tooltip>
              </div>
              <q-icon name="edit" />
              <q-popup-edit v-model="column.name" auto-save>
                <q-input v-model="column.name" dense autofocus counter>
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
              </q-popup-edit>
            </header>
          </slot>
          <div ref="columnBoardContent" class="board-view__content q-px-sm q-py-xs overflow-auto qs-scroll qs-scroll--y">
            <slot v-for="(card, cardIndex) in 6" :name="`card-${index}-${cardIndex}`">
              <qs-card-board v-model="card1" :class="cardSpacing(cardIndex)" :key="cardIndex" />
            </slot>
          </div>
          <slot name="column-footer" :column="column">
            <footer class="q-mt-sm q-px-sm">
              <transition name="fade">
                <qs-add-card label="Adicionar novo cartão" input-label="Insira um título para este card" @add="addCard('eae', $event)" card/>
              </transition>
            </footer>
          </slot>
        </div>
      </div>
    </slot>
    <slot name="add-column">
      <div class="board-view__add-column q-pa-sm rounded-borders">
        <qs-add-card @add="addColumn($event, 'eae')" />
      </div>
    </slot>
  </qs-slider>
</template>

<script>
import Sortable from 'sortablejs'
import findParent from '../helpers/findParent'

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
      title: 'Titulo da coluna',
      currentElement: false,
      // card
      card1: {
        nome: 'douglas',
        idade: 22
      },
      // mock de datos API
      mock: [
        {
          name: 'coluna 1',
          id: 1,
          order: 1,
          cards: [
            {
              id: 1,
              order: 1,
              title: 'Monica card',
              text: 'Text card'
            }
          ]
        },
        {
          name: 'coluna 2',
          id: 2,
          order: 1,
          cards: [
            {
              id: 2,
              order: 1,
              title: 'Monica card',
              text: 'Text card'
            },
            {
              id: 3,
              order: 2,
              title: 'Monica card',
              text: 'Text card'
            }
          ]
        }
      ]
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.getBoardTopPosition()
      this.setResizeEvent()
    })

    this.setSortable()

    console.log(this.hasCardSlot, '>>> slot')
  },

  destroyed () {
    window.removeEventListener('resize', this.controlHeight)
    this.destroySortable()
  },

  computed: {
    maxHeight () {
      const maxHeight = `${this.windowHeight - this.boardTopPosition - 20}px`
      return this.boardTopPosition && { maxHeight }
    },

    hasCardSlot () {
      return this.$scopedSlots
    },

    self () {
      return this
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

        onMove: event => !event.related.classList.contains('board-view__add-column')
      })
    },

    setSortableCard () {
      this.$refs.columnBoard.forEach((boardElement, index) => {
        // adiciona uma lista instâncias do sortable dos cards
        sortableCard.push(
          new Sortable(this.$refs.columnBoardContent[index], {
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
      if (this.$q.platform.is.desktop) {
        this.setSortableColumn()
        this.setSortableCard()

        return
      }

      this.$q.notify({
        message: 'A opção de ordenar está disponivél somente para desktop.'
      }) || this.$emit('sortable-not-supported')
    },

    destroySortable () {
      sortableColumn.destroy()
      sortableCard.forEach(card => card.destroy())
    },

    addCard (value, value2) {
      console.log(value, value2)
    },

    mouseOver (event) {
      // if (findParent(event.target), '.test') {
      //   return sortableColumn.option('disabled', true)
      // }
      // console.log(!!findParent(event.target, '.test'))

      this.currentElement = !!findParent(event.target, '.test')
      // console.log(sortableColumn.disabled)
    },

    cardSpacing (index) {
      return index ? 'q-mt-sm' : ''
    },

    addColumn (name) {
      this.$set(this.mock, this.mock.length, {
        name: name
      })

      const scrollElement = this.$refs.boardSlider.element

      this.$nextTick(() => {
        scrollElement.scroll({ left: scrollElement.scrollWidth, behavior: 'smooth' })
      })
    }
  }
}
</script>

<style lang="scss">
  $grey: lighten($grey-5, 16%);

  .board-view {
    &__column {
      max-height: inherit;
      width: 300px;
    }

    &__add-column {
      width: 250px;
      height: fit-content;
      background-color: $grey;
    }

    &__box-grey {
      background-color: $grey;
    }


    &__box {
      max-height: 100%;
      display: flex;
      flex-direction: column;
      background-color: $grey;
    }

    &__content {
       * {
        // width: 250px;
        white-space: initial;
        background: white;
      }
    }
  }
</style>