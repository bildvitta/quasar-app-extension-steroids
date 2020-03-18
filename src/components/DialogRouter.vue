<template>
  <q-dialog persistent ref="dialog" @hide="onDialogHide">
    <q-card class="full-width" style="max-width: 80vw;">
      <q-card-section>
        <component v-if="component" :is="component" dialog :route="route" @hide="hide" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
/**
 * Componente para abrir paginas dentro de modais
 */
export default {
  data () {
    return {
      component: null,
      parentRoute: '',
      route: null
    }
  },

  methods: {
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      if (history && this.parentRoute) {
        history.replaceState(null, null, this.parentRoute)
      }

      this.component = ''
      this.parentRoute = ''
      this.route = null
      /**
       * hide
       */
      this.$emit('hide')
    },

    resolveRoute (path) {
      return this.$router.resolve(path).route
    },
    /**
     * Metodo a ser chamado para carregar componente no modal
     *
     * @param {Object} route rota passada para carregar o componente
     */
    async show (route) {
      this.parentRoute = this.$route.fullPath
      this.route = this.resolveRoute(route)

      if (history) {
        history.replaceState(null, null, this.route.fullPath)
      }

      try {
        this.$q.loading.show()

        const component = [...this.route.matched].pop().components.default

        if (typeof component !== 'function') {
          this.component = component
          this.$refs.dialog.show()
        } else {
          const componentFn = (await component()).default

          this.component = componentFn
          this.$refs.dialog.show()
        }
      } catch (error) {
        this.$qs.error('Ops! Erro ao carregar item.')
        /**
         * Erro ao carregar componente
         * @property {object} error
         */
        this.emit('error', error)
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>