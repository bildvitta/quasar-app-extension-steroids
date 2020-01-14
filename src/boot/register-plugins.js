import { Notify } from 'quasar'

export default async ({ Vue }) => {
  Vue.prototype.$qs = {
    error (message, caption) {
      Notify.create({ caption, color: 'negative', message })
    },

    success (message, caption) {
      Notify.create({ caption, message })
    }
  }
}
