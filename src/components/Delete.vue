<template>
  <component :is="tag" v-bind="$attrs" v-on="events">
    <slot />
    <qs-dialog v-model="showDialog" v-bind="dialogConfig" />
  </component>
</template>

<script>
export default {
  props: {
    customId: {
      default: '',
      type: [Number, String]
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

  data () {
    return {
      showDialog: false
    }
  },

  computed: {
    events () {
      const { click, ...events } = this.$listeners
      return { click: this.confirm, ...events }
    },

    id () {
      return this.customId || this.$route.params.id
    },

    dialogConfig () {
      return {
        card: {
          title: 'Confirmar',
          description: 'Tem certeza que deseja excluir este item?',
        },
        ok: {
          props: { label: 'Excluir' },
          events: { click: this.destroy }
        },
        ...this.dialog
      }
    }
  },

  methods: {
    async destroy () {
      this.$q.loading.show()

      try {
        await this.$store.dispatch(`${this.entity}/destroy`, { id: this.id })
        this.$qs.success('Item deletado com sucesso!')
        this.$emit('success')
      } catch (error) {
        this.$qs.error('Ops! Não foi possível deletar o item.')
        this.$emit('error', error)
      } finally {
        this.$q.loading.hide()
      }
    },

    confirm () {
      this.showDialog = true
    }
  }
}
</script>
