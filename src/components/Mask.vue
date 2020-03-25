<template>
  <q-field v-model="text" class="full-width" v-bind="$attrs" stack-label contenteditable="true">
    <input ref="field" :value="text" @input="handleInput" class="full-width" :style="{ all: 'initial'}" type="text" placeholder="ahhh">
    <!-- <q-input />; -->
  </q-field>
</template>

<script>
import IMask from 'imask'
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

    mask = IMask(this.field, {
      mask: [
        {
          mask: '+{7}(000)000-00-00'
        },
        {
          mask: '(00) 00000-0000'
        }
      ]
    })
  },

  watch: {
    text (value) {
      console.log(mask, 'text')
      // this.$emit('input', value)
    }
  },

  methods: {
    handleInput (value) {
      this.text = value ? value.target.value : ''
      const {unmaskedValue} = mask
      console.log(unmaskedValue, '>> valor sem mascara')
      this.$emit('input', mask.unmaskedValue)
    }
  }
}
</script>