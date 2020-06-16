<template>
  <component :is="boardTag" class="flex" :style="maxHeight" :sorting="isSorting">
    <qs-column-board ref="columnBoard" v-for="item in 8" :key="item" @mousedown="boardActived">
      <template v-slot:header>
        aqui é meu novo header
      </template>
      <div v-for="item in 10" :key="item" class="q-mt-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem temporibus, numquam perferendis deleniti expedita nobis, dignissimos quaerat velit, dicta nemo eos! Commodi fugit ratione saepe natus provident necessitatibus cum fugiat.
      </div>
      <template v-slot:footer>
        aqui é meu novo footer
      </template>
    </qs-column-board>
  </component>
</template>

<script>
// import Sortable from 'sortablejs'
import Sortable, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js'

export default {
  data () {
    return {
      windowHeight: window.innerHeight,
      boardTopPosition: null,
      boardTag: 'qs-slider',
      isSorting: false
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.getBoardTopPosition()
      this.setResizeEvent()
    })

    this.setSortable()
  },

  // updated () {
  //   this.setSortable()
  // },

  destroyed() {
    window.removeEventListener('resize', this.controlHeight)
  },

  computed: {
    maxHeight () {
      const maxHeight = `${this.windowHeight - this.boardTopPosition - 20}px`
      console.log(this.$el, '>>>> el')
      return this.boardTopPosition && { maxHeight }
    }
  },

  methods: {
    boardActived () {
      // this.boardTag = 'div'
      console.log('fui clicado')
    },

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

    setSortable () {
      if (!this.$q.platform.is.desktop) {
        return null
      }

      new Sortable(this.$el.childNodes[0].childNodes[0], {
        group: 'column',
        animation: 350,
        scroll: true,
        fallbackOnBody: true,
        swapThreshold: 1,
        // invertSwap: true,
        // scrollSensitivity: 100,
        // scrollSpeed: 100,

        // onUpdate: event => {
        //   console.log('fui chamado')
        // }
          onStart: event => {
            console.log('olokinho meu')
            this.isSorting = true
          }
      })

      this.$refs.columnBoard.forEach(boardElement => {
        new Sortable(boardElement.$refs.columnBoardContent, {
          group: 'card',
          scroll: true,
          animation: 350,
          fallbackOnBody: true,
          // invertSwap: true,
          swapThreshold: 1,
          // scrollSensitivity: 100,
          // scrollSpeed: 100,
          onStart: event => {
            this.isSorting = true
          }
        })
      })

      // Sortable.mount(new AutoScroll())
    }
  }
}
</script>
