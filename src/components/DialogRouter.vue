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
export default {
  data () {
    return {
      component: null,
      parentRoute: '',
      route: null,
      isLoading: false
    }
  },

  created () {
    console.log(history)
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
      // console.log(this.$router.resolve(path).route, '<<<<')
      return this.$router.resolve(path).route
    },

    async show (route) {
      this.parentRoute = this.$route.fullPath
      this.route = this.resolveRoute(route)

      if (history) {
        console.log(window.history, this.route.fullPath)
        // console.log(history, this.route.fullPath)
        // history.replaceState(null, null, this.route.fullPath)
        history.replaceState({}, null, this.route.fullPath)
        // this.$router.replace({ path: this.route.fullPath})
      }

      // console.log(history)

      this.component = [...this.route.matched].pop().components.default
      this.$q.loading.show()
      if (this.component) {
        this.$refs.dialog.show()
      } else {
        }
      this.$q.loading.hide()

      // console.log(([...this.route.matched].pop().components.default)())
      // try {
      //   // await ([...this.route.matched].pop().components.default)() || []
      //   this.component = [...this.route.matched].pop().components.default
      //   console.log(this.route.matched)
      //   this.$refs.dialog.show()
      //   this.$q.loading.hide()
      // } catch (error) {
      //   console.log(error, 'error')
      // } finally {
      //   this.isLoading = false
      // }
    }
  }
}
</script>