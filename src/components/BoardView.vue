<template>
  <qs-slider ref="boardSlider" class="board-view flex" :style="maxHeight" cancel-mouse-down-target="board-view__box">
    <slot v-for="(column, index) in mock" :name="`column`" v-bind="self">
      <div v-if="!column.deleted" ref="columnBoard" :key="index" class="board-view__column no-wrap column">
        <div class="board-view__box q-pa-sm rounded-borders">
          <slot name="column-header" :column="column">
            <header class="q-mb-sm no-wrap items-start q-mt-xs q-mx-sm text-weight-bold text-grey-9 flex justify-between">
              <div class="full-width text-wrap">
                {{ column.title }}
                <q-popup-edit v-model="column.title" auto-save :validate="columnTitleValidation" @hide="columnTitleValidation">
                  <q-input v-model="column.title" dense autofocus counter>
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </div>

              <q-btn flat round size="sm" dense unelevated icon="delete" @click="deleteDialog(index)" />
            </header>
          </slot>

          <div ref="columnBoardContent" class="board-view__content q-px-sm q-py-xs qs-scroll qs-scroll--y">
            <slot v-for="(card, cardIndex) in column.cards" name="card">
              <qs-card-board v-if="!card.deleted" v-model="column.cards[cardIndex]" :is-sorting="isSortingCard" class="board-view__card" :key="cardIndex" @on-delete="deleteCard(index, cardIndex)"/>
            </slot>
          </div>

          <slot name="column-footer" :column="column">
            <footer class="q-mt-sm q-px-sm">
              <qs-add-card-column label="Adicionar novo cartão" input-label="Insira um título para este cartão" @add="addCard($event, index)" card/>
            </footer>
          </slot>
        </div>
      </div>
    </slot>

    <slot name="add-column">
      <div class="board-view__add-column q-pa-sm rounded-borders">
        <qs-add-card-column @add="addColumn($event)" />
      </div>
    </slot>
  </qs-slider>
</template>

<script>
import Sortable from 'sortablejs'
import findParent from '../helpers/findParent'
import { extend } from 'quasar'

let sortableColumn = null
let sortableCard = []

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
    },

    deleteDialogOptions: {
      type: Object,
      default: () => ({})
    },

    fullHeight: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      windowHeight: window.innerHeight,
      boardTopPosition: null,
      isSortingCard: false,
      // mock de datos API
      mock: [
        {
          title: 'Titulo de uma coluna grande para testes 1',
          id: 1,
          deleted: false,
          order: 1,
          cards: [
            {
              id: 1,
              order: 1,
              title: 'Este é um titulo mais longo para testar',
              deleted: false,
              text: 'Text card'
            }
          ]
        },
        {
          title: 'Titulo de uma coluna grande para testes 2',
          id: 2,
          deleted: false,
          order: 1,
          cards: [
            {
              id: 2,
              order: 1,
              deleted: false,
              title: 'Este é um titulo mais longo para testar. Este é um titulo mais longo para testar',
              text: 'Text card'
            },
            {
              id: 3,
              order: 2,
              deleted: false,
              title: 'Este é um titulo mais longo para testar',
              text: 'Text card'
            },
            {
              id: 3,
              order: 2,
              deleted: false,
              title: 'Este é um titulo mais longo para testar',
              text: 'Text card'
            },
            {
              id: 3,
              order: 2,
              deleted: false,
              title: 'Este é um titulo mais longo para testar',
              text: 'Text card'
            },
            {
              id: 3,
              order: 2,
              deleted: false,
              title: 'Este é um titulo mais longo para testar',
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
  },

  destroyed () {
    window.removeEventListener('resize', this.controlHeight)
    this.destroySortable()
  },

  computed: {
    maxHeight () {
      const maxHeight = `${this.windowHeight - this.boardTopPosition - 5}px`
      return this.boardTopPosition && { maxHeight, height: this.fullHeight && maxHeight }
    },

    self () {
      return this
    }
  },

  methods: {
    getBoardTopPosition () {
      this.boardTopPosition = this.$el.getBoundingClientRect().y
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

    updateSortableColumn () {
      return sortableColumn.sort(sortableColumn.toArray())
    },

    setSortableCard (addSingle) {
      const boardContent = this.$refs.columnBoardContent

      const add = element => {
        sortableCard.push(
          new Sortable(element, {
            group: 'card',
            ...this.sortableCardOptions,
            ...this.sortableOptions,
            onStart: () => {
              this.isSortingCard = true
            },

            onUnchoose: () => this.isSortingCard = false,

            onClone: ({ clone, item }) => {
              // console.log(event.clone)
              item.style.transform = 'rotateX(180deg) !important'
              // item.style.display = 'none'
              console.log(item)
            }
          })
        )
      }

      return addSingle
        ? add(boardContent[this.$refs.columnBoard.length - 1])
        : boardContent.forEach((boardElement, index) => add(this.$refs.columnBoardContent[index]))
    },

    updateSortableCard () {
      return sortableCard.forEach(card => card.sort(card.toArray()))
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

    addCard (title, index, customObject) {
      customObject = extend(true, {}, customObject)

      this.$set(this.mock[index].cards, this.mock[index].cards.length, {
        title,
        deleted: false,
        ...customObject
      })
    },

    addColumn (title, customObject) {
      customObject = extend(true, {}, customObject)
      const scrollElement = this.$refs.boardSlider.element

      this.$set(this.mock, this.mock.length, {
        title,
        deleted: false,
        cards: [],
        ...customObject
      })

      this.$nextTick(() => {
        scrollElement.scroll({ left: scrollElement.scrollWidth, behavior: 'smooth' })
        this.$q.platform.is.desktop && this.setSortableCard(true)
      })
    },

    deleteCard (columnIndex, cardIndex) {
      this.$set(this.mock[columnIndex].cards[cardIndex], 'deleted', true)
      this.$emit('delete-card')
    },

    deleteColumn (index) {
      this.$emit('delete-column')
      this.$set(this.mock[index], 'deleted', true)
      // TODO bater metodo para atualizar
    },

    deleteDialog (index) {
      this.$q.dialog({
        title: 'Remover coluna',
        message: 'Ao remover esta coluna todos os <strong>cartões</strong> serão excluídos, deseja continuar?',
        html: true,
        cancel: { label: 'Não', flat: true, unelevated: true },
        ok: { label: 'Sim', unelevated: true },
        persistent: true,
        ...this.deleteDialogOptions
      }).onOk(() => this.deleteColumn(index))
    },

    columnTitleValidation (value) {
      return !!value
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

    &__card:not(:first-child) {
      margin-top: map-get($space-sm, y);
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
      overflow-y: auto;
      overflow-x: hidden;

      * {
        white-space: initial;
        background: white;
      }
    }
  }
</style>
