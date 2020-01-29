<template>
  <q-dialog persistent ref="dialog" @hide="onDialogHide">
    <q-card class="full-width" style="max-width: 80vw;">
      <q-card-section>
        <component v-if="component" :is="component" dialog @hide="hide" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
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

      this.$emit('hide')
    },

    resolveRoute (path) {
      return this.$router.resolve(path).route
    },

    show (route) {
      this.parentRoute = this.$route.fullPath
      this.route = this.resolveRoute(route)

      if (history) {
        history.replaceState(null, null, this.route.fullPath)
      }

      this.component = [...this.route.matched].pop().components.default
      this.$refs.dialog.show()
    }
  }
}
</script>