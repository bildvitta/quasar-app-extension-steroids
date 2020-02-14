  <template>
    <component :is="componenTag" ref="items" v-bind="$attrs">
      <slot :order="order"/>
    </component>
  </template>

  <script>
  import Sortable from 'sortablejs'
  import { sortBy } from 'lodash'

  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      },

      componenTag: {
        type: String,
        default: 'div'
      }
    },

    data () {
      return {
        formatedValue: null,
        ids: null,
        order: [0, 1, 2, 3, 4, 5]
      }
    },

    created () {
      this.formatedValue = this.value
      this.ids = this.formatedValue.map(item => item.path)

      this.$emit('input', this.ids)
    },

    mounted () {
      new Sortable(this.$refs.items, {
        animation: 300,

        onStar: event => this.$emit('on-start', event),

        onEnd: event => this.$emit('on-end', event),

        onUpdate: event => {
          this.changeOrder(event)
          this.$emit('on-update', event)
        }
      })
    },

    methods: {
      changeOrder ({ oldIndex, newIndex }) {
        // this.$set(this.images[oldIndex], 'order', newIndex)
        // const cache = this.formatedValue[newIndex]

        // this.$set(this.formatedValue, newIndex, this.formatedValue[oldIndex])
        // this.$set(this.formatedValue, oldIndex, cache)
        // this.order = []

        const deleted = this.ids.splice(oldIndex, 1)
        const cache = this.order[oldIndex]
        this.ids.splice(newIndex, 0, deleted[0])
        this.order.splice(oldIndex, 1)
        this.order.splice(newIndex, 0, cache)
        console.log(this.order, '<< epois')
        // this.ids.forEach((id, index) => this.$set(this.order, this.order.length, { id, index}))
        this.$emit('input', this.ids)

        // this.ids.forEach((id, index) => {
        //   console.log(id, index)
        //   this.order.push({ id, index })
        // })

        console.log(this.ids)

        try {
          // const response = this.await
        } catch (error) {
          
        }

        // this.order = this.ids.map((id, index) => { id, index })
        // this.ids.forEach((id, index) => this.order.push({ id, index}))

        console.log(this.order)
        // const newValue = this.formatedValue.filter((value, index) => value.path === this.ids[index])

        // console.log(newValue)
        // this.images[newIndex] = this.images[oldIndex]
        // this.images[oldIndex] = cache

        // if (oldIndex > newIndex) {
        //   while (newIndex < oldIndex) {
        //     this.$set(this.images[newIndex], 'order', this.images[newIndex].order + 1)
        //     newIndex++
        //   }

        //   sortBy(this.images, [image => image.order]).forEach((item, itemIndex) => {
        //     this.$set(this.images, itemIndex, item)
        //   })

        // } else {
        //   while (oldIndex < newIndex) {
        //     this.$set(this.images[oldIndex + 1], 'order', this.images[oldIndex + 1].order - 1)
        //     oldIndex++
        //   }

        //   sortBy(this.images, [image => image.order]).forEach((item, itemIndex) => {
        //     this.$set(this.images, itemIndex, item)
        //   })
        // }
      }
    },
  }
  </script>