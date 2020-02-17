  <template>
    <component :is="componenTag" ref="items" v-bind="$attrs" v-on="$listeners">
      <slot />
    </component>
  </template>

<script>
  import Sortable from 'sortablejs'
  import store from 'store'

  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      },

      componenTag: {
        type: String,
        default: 'div'
      },

      entity: {
        type: String,
        required: true
      },

      url: {
        type: String,
        default: ''
      },

      options: {
        type: Object,
        default: () => { animation: 300 }
      }
    },

    data () {
      return {
        formatedValue: null,
        ids: null
      }
    },

    created () {
      this.formatedValue = this.value
      this.ids = this.formatedValue.map(item => item.path)

      this.$emit('input', this.ids)
    },

    mounted () {
      new Sortable(this.$refs.items, {
        ...this.options,

        onStar: event => this.$emit('on-start', event),

        onEnd: event => this.$emit('on-end', event),

        onUpdate: event => {
          this.changeOrder(event)
          this.$emit('on-update', event)
        }
      })
    },

    methods: {
      async changeOrder ({ oldIndex, newIndex }) {
        const deleted = this.ids.splice(oldIndex, 1)
        this.ids.splice(newIndex, 0, deleted[0])

        this.$emit('input', this.ids)

        try {
          const response = await store.dispatch(`${this.entity}/replace`, {
            payload: this.ids,
            url: this.url
          })

          this.$emit('success', this.response)
        } catch (errors) {
          this.$emit('error', errors)
        }
      }
    }
  }
</script>