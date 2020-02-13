<template>
  <div ref="items" style="display: flex; justify-content: space-between; flex-wrap: wrap;">
    <div v-for="(image, index) in value" :key="image.path" class="card">
      <div>{{ image.name }}{{ image.order }}</div>
      {{ image.path }} {{ image.oldOrder }}
      {{ index }}
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { sortBy } from 'lodash'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  created () {
    this.formatedValue = this.value
    console.log(this.value)
  },

  data () {
    return {
      // images: [
      //   {
      //     path: 'test 0',
      //     name: 'nome de teste',
      //     order: 0
      //   },
      //   {
      //     path: 'test 1',
      //     name: 'nome de teste',
      //     order: 1
      //   },
      //   {
      //     path: 'test 2',
      //     name: 'nome de teste',
      //     order: 2
      //   },
      //   {
      //     path: 'test 3',
      //     name: 'nome de teste',
      //     order: 3
      //   },
      //   {
      //     path: 'test 4',
      //     name: 'nome de teste',
      //     order: 4
      //   },
      //   {
      //     path: 'test 5',
      //     name: 'nome de teste',
      //     order: 5
      //   },
      // ]
      formatedValue: null
    }
  },

  computed: {
    ids () {
      return this.formatedValue.map(item => item.path)
    }
  },

  mounted() {
    new Sortable(this.$refs.items, {
      animation: 150,

      onUpdate: (event) => {
        this.changeOrder(event)
      }
    })
  },

  methods: {
    changeOrder ({ oldIndex, newIndex }) {
      // this.$set(this.images[oldIndex], 'order', newIndex)
      const cache = this.formatedValue[newIndex]

      this.$set(this.formatedValue, newIndex, this.formatedValue[oldIndex])
      this.$set(this.formatedValue, oldIndex, cache)
      // this.images[newIndex] = this.images[oldIndex]
      // this.images[oldIndex] = cache
      this.$emit('input', this.ids)

      console.log(this.ids)

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

<style lang="scss">
  .card {
    background-color: blue;
    height: 300px;
    margin: 20px;
    color: white;
    width: 25%;
    font-size: 20px;
  }
</style>