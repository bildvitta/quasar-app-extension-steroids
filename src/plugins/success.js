import { Notify } from 'quasar'

export default (context) => {
  return function (message, caption) {
    Notify.create({ caption, icon: 'check', message, progress: true })
  }
}
