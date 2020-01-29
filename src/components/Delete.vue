<template>
  <component :is="tag" v-bind="$attrs" v-on="events">
    <slot />
  </component>
</template>

<script>
import store from 'store'

export default {
  props: {
    customId: {
      default: '',
      type: String
    },

    dialog: {
      default: () => ({}),
      type: Object
    },

    entity: {
      required: true,
      type: String
    },

    tag: {
      default: 'q-btn',
      type: String
    }
  },

  computed: {
    events () {
      const { click, ...events } = this.$listeners
      return { click: this.confirm, ...events }
    },

    id () {
      return this.customId || this.$route.params.id
    }
  },

  methods: {
    destroy () {

      store.dispatch(`${this.entity}/destroy`, { id: this.id })
    },

    confirm () {
      this.$q.dialog({
        cancel: true,
        message: 'Tem certeza que deseja deletar este item?',
        persistent: true,
        title: 'Confirmar',
        ...this.dialog
      }).onOk(this.destroy)
    }
  }
}
</script>
