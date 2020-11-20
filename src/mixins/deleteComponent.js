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
      default: true,
      type: String
    },

    tag: {
      default: 'q-btn',
      type: String
    }
  }
}