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
  }
}