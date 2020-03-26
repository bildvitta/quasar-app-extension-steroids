<template>
  <q-field v-model="text" class="full-width" v-bind="$attrs" stack-label contenteditable="true">
    <input ref="field" :value="text" @input="handleInput" class="full-width" :style="{ all: 'initial'}" type="text" placeholder="ahhh">
  </q-field>
</template>

<script>
import IMask from 'imask'
import { cloneDeep } from 'lodash'

let mask = null

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      text: '',
      field: null
    }
  },

  mounted () {
    this.field = this.$refs.field
    console.log(this.field instanceof Element)

    mask = IMask(this.field, {
      mask: [
        { mask: "(00) 0000-0000" },
        { mask: "(00) 00000-0000" }
      ]
    })
  },

  watch: {
    text (value) {
      // console.log(mask, 'text')
      // this.$emit('input', value)
      // console.log(value)
      mask.value = value || ''
      this.$emit('input', mask.unmaskedValue)
    }
  },

  methods: {
    handleInput (value) {
      this.text = value ? value.target.value : ''
      mask.value = this.text
      // const {unmaskedValue} = mask
      // console.log(extendMask.unmaskedValue, '>> valor sem mascara')
      this.$emit('input', mask.unmaskedValue)
      // this.$emit('input', this.text)
    },
  }
}
</script>