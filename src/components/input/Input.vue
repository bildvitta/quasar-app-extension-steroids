<template>
  <q-input ref="mask" :value="value" v-bind="$attrs" unmasked-value v-on="$listeners" :mask="mask">
    <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope"/>
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  watch: {
    mask () {
      const input = this.$refs.mask.$refs.input
      requestAnimationFrame(() => input.selectionStart = input.value ? input.value.length : '')
    }
  },

  computed: {
    mask () {
      const { mask } = this.$attrs
      return this.masks.hasOwnProperty(mask) ? this.masks[mask]() : mask
    },

    masks () {
      return {
        'phone': () => this.maskLenght(10, '(##) ####-#####', '(##) #####-####'),
        'personal-document': () => '###.###.###-##',
        'company-document': () => '##.###.###/###-##',
        'document': () => this.maskLenght(11, '###.###.###-###', '##.###.###/###-##'),
        'postal-code': () => '#####-###'
      }
    }
  },

  methods: {
    maskLenght (length, first, second) {
      return this.value.length > length ? second : first
    }
  }
}
</script>
