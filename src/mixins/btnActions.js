export default {
  props: {
    btnCol: {
      type: String,
      default: ''
    },

    align: {
      type: String,
      default: 'end',
      validator: value => [
        'end',
        'start',
        'center',
        'between',
        'around'
      ].includes(value)
    },

    gutter: {
      type: String,
      default: 'md',
      validator: value => [
        'xs',
        'sm',
        'md',
        'lg',
        'xl'
      ].includes(value)
    }
  },

  computed: {
    isSmallScreen () {
      return this.$q.screen.xs
    }
  }
}
