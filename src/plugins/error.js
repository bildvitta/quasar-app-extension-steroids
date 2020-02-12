import { Notify } from 'quasar'

export default (context) => {
  return function (message, caption) {
    Notify.create({ caption, color: 'negative', message, progress: true })
  }
}
