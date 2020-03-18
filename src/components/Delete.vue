<template>
  <component :is="tag" v-bind="$attrs" v-on="events">
    <slot />
  </component>
</template>

<script>
import store from 'store'
/**
 * Componente para deletar via requisição
 */
export default {
  props: {
    /**
     * Caso o Id da URL seja diferente do ID real, você pode passar um id customizado por essa prop
     */
    customId: {
      default: '',
      type: [Number, String]
    },
    /**
     * Configuração do $q.dialog para confirmação ao deletar
     */
    dialog: {
      default: () => ({}),
      type: Object
    },
    /**
     * Entidade da api para usar no storeModule e como endpoint
     */
    entity: {
      required: true,
      type: String
    },
    /**
     * Uma tag válida do HTML ou um componente do Vue
     */
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
    async destroy () {
      this.$q.loading.show()

      try {
        await store.dispatch(`${this.entity}/destroy`, { id: this.id })
        this.$qs.success('Item deletado com sucesso!')
        /**
         * Dispara quando a requição é feita com sucesso
         */
        this.$emit('success')
      } catch (error) {
        this.$qs.error('Ops! Não foi possível deletar o item.')
        /**
         * Dispara quando a há falha na requisição
         *
         * @property {object} error resposta de erro da api
         */
        this.$emit('error', error)
      } finally {
        this.$q.loading.hide()
      }
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
