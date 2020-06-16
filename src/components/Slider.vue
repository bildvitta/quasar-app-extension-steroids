<template>
  <div class="full-width slider relative-position" v-on="$listeners">
    <div ref="slider" class="slider__container qs-scroll" @mousedown="mouseDown" @mousemove="mouseMove">
      <div ref="sliderContent" class="slider__content" :class="gutter">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'

export default {
  props: {
    gutter: {
      type: String,
      default: 'q-gutter-x-md'
    },

    sorting: {
      type: Boolean
    }
  },

  data () {
    return {
      start: 1,
      difference: 0,
      drag: false,
      hideBar: false,
      element: null,
      mousedownPosition: null,
      clickPosition: null
    }
  },

  mounted () {
    console.log('mouted')
    this.element = this.$refs.slider
  },

  created () {
    // Polyfill for scrolling
    window.__forceSmoothScrollPolyfill__ = true
    smoothscroll.polyfill()

    window.addEventListener('mouseup', this.mouseUp)
  },

  destroyed () {
    window.removeEventListener('mouseup', this.mouseUp)
  },

  methods: {
    mouseDown (event) {
      this.handleScroll(event)

      const findParent = (element, selector) => {
        while (element.parentElement) {
          if (!element) {
            continue
          }

          if (element && element.matches(selector)) {
            return element
          }

          element = element.parentElement
        }
      }
      console.log(findParent(event.target, '.column-board'), '>> refs')
      // console.log(event.target, event.target.matches('draggable'))
      if (findParent(event.target, '.column-board')) { 
        console.log('mousedown')

        // event.preventDefault()
        return null
       }

      if (!event) {
        event = window.event
      }

      event.preventDefault()

      this.start = event.clientX + this.element.scrollLeft
      this.difference = 0
      this.drag = true
    },

    mouseMove (event) {
      const findParent = (element, selector) => {
        while (element.parentElement) {
          if (!element) {
            continue
          }

          if (element && element.matches(selector)) {
            return element
          }

          element = element.parentElement
        }
      }

      // if (this.mousedownPosition !== this.clickPosition) {
      //   console.log('opaaa')
      // }

      // if (findParent(event.target, '.column-board')) {
      //   console.log(this.sorting)
      //   // event.preventDefault()
      //   return
      //  }

      if (!this.drag) {
        return null
      }

      if (!event) {
        event = window.event
      }

      event.preventDefault()

      this.difference = this.start - (event.clientX + this.element.scrollLeft)
      this.element.scrollLeft += this.difference
    },

    mouseUp (event) {
      let tick = 1

      // if (this.sorting) { return null }

      // console.log(this.sorting, '>> up')

      if (!event) {
        event = window.event
      }

      event.preventDefault()
      this.drag = false

      const animate = () => {
        const step = Math.sin(tick)

        if (step <= 0) {
          this.difference = 0
          window.cancelAnimationFrame(animate)
        } else {
          this.element.scrollLeft += this.difference * step
          // tick -= 0.02
          tick -= 1

          window.requestAnimationFrame(animate)
        }
      }

      animate()
    },

    handleScroll (event) {
      if (!event) {
        return null
      }

      const { type, clientX } = event
      console.log(type, '>> tp')

      if (type === 'mousedown') {
        this.mousedownPosition = clientX

        return
      }


      this.clickPosition = clientX
    },
  }
}
</script>

<style lang="scss">
  .slider {
    overflow: hidden;
    width: 100%;

    &__container {
      cursor: grab;
      overflow-x: auto;
      position: relative;
      white-space: nowrap;
      max-height: inherit;
      display: flex;
      padding-bottom: 10px;

      // -ms-overflow-style: none;
      // -ms-overflow-style: none;
      // -webkit-overflow-scrolling: touch;
      // & > * {
      // }

      // &::-webkit-scrollbar {
        // width: 0 !important;
      // }
    //   scroll-margin: 50px 0 0 50px;
    //   &::-webkit-scrollbar {
    //     /* 1 */
    //     background-color: $grey-4;
    //     border-radius: 500rem;
    //     height: 10px;
    //   }
    //   ::-webkit-scrollbar-button       { /* 2 */ }
    //   ::-webkit-scrollbar-track        { /* 3 */ }
    //   ::-webkit-scrollbar-track-piece  { /* 4 */ }
    //   &::-webkit-scrollbar-thumb {
    //     /* 5 */
    //     background-color: $grey-5;
    //     border-radius: 500rem;
    //   }
    //   // 2
    //   &::-webkit-scrollbar-button,
    //   // 6
    //   &::-webkit-scrollbar-corner {
    //     // display: none;
    //   }
    //   ::-webkit-resizer                { /* 7 */ }
    //   scrollbar-arrow-color:#000000 !important;
    //   scrollbar-3dlight-color:#000000 !important;
    //   scrollbar-highlight-color:#FF0000 !important;
    //   scrollbar-face-color:#FFFFFF !important;
    //   scrollbar-shadow-color:#0000FF !important;
    //   scrollbar-darkshadow-color:#FFFF00 !important;
    //   scrollbar-track-color:#00FF00 !important;
    //   scrollbar-color: red;
    // }
    }

    &__content {
      display: flex;
    }
  }
</style>
