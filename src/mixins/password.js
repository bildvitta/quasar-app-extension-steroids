export default {
  props: {
    veryWeak: {
      type: Number,
      default: 1
    },
  
    weak: {
      type: Number,
      default: 5
    },
  
    pattern: {
      type: [RegExp, String],
      default: ''
    }
  }
}
