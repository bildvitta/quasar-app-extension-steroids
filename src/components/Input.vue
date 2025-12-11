<template>
  <q-input ref="input" :value="value" v-bind="$attrs" unmasked-value v-on="$listeners" :mask="currentMask" bottom-slots @paste="onPaste">
    <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope"/>
    </template>
  </q-input>
</template>

<script>
const Masks = {
  CompanyDocument: 'company-document',
  Document: 'document',
  PersonalDocument: 'personal-document',
  Phone: 'phone',
  PostalCode: 'postal-code'
}

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  watch: {
    currentMask () {
      const input = this.getInput()

      requestAnimationFrame(() => input.selectionStart = input.value ? input.value.length : '')
    }
  },

  computed: {
    currentMask () {
      const { mask } = this.$attrs

      return this.masks.hasOwnProperty(mask) ? this.masks[mask]() : mask
    },

    masks () {
      return {
        [Masks.CompanyDocument]: () => '##.###.###/####-##',

        [Masks.Document]: () => this.toggleDocumentMask({
          firstMask: 'XXX.XXX.XXX-XXX',
          secondMask: 'XX.XXX.XXX/XXXX-##'
        }),

        [Masks.PersonalDocument]: () => '###.###.###-##',
        [Masks.Phone]: () => this.toggleMask({ firstMask: '(##) ####-#####', secondMask: '(##) #####-####' }),
        [Masks.PostalCode]: () => '#####-###'
      }
    }
  },

  methods: {
    maskLenght (length, first, second) {
      return this.value.length > length ? second : first
    },

    /**
     * Com base na quantidade de caracteres digitados, alterna entre duas máscaras de CPF e CNPJ.
     * @param {Object} params
     * @param {string} params.firstMask - Máscara inicial -> ###.###.###-##
     * @param {string} params.secondMask - Máscara secundária -> XX.XXX.XXX/XXXX-##
     */
    toggleDocumentMask ({ firstMask, secondMask }) {
      // Verifica se tem letras no model.
      const regex = /[a-zA-Z]/
      const containsLyrics = regex.test(this.value)

      // Caso contenha letras, aplica a máscara de CNPJ, pois o CPF não possui letras.
      if (containsLyrics) return secondMask

      return this.toggleMask({ firstMask, secondMask, character: 'X' })
    },

    /**
     * Com base na quantidade de caracteres digitados, alterna entre duas máscaras.
     * @param {Object} params
     * @param {string} params.firstMask - Máscara inicial (ex: CPF -> ###.###.###-##)
     * @param {string} params.secondMask - Máscara secundária (ex: CNPJ -> XX.XXX.XXX/XXXX-##)
     * @param {string} [params.character='#'] - Token da máscara
     */
    toggleMask ({ firstMask, secondMask, character = '#' }) {
      const length = firstMask.split(character).length - 2

      return this.value?.length > length ? secondMask : firstMask
    },

    /**
     * @param {ClipboardEvent} event
     */
    onPaste (event) {
      if (!this.currentMask) return

      const value = event.clipboardData.getData('text')
      const input = this.getInput()

      requestAnimationFrame(() => {
        this.$emit('input', value)
        input.selectionStart = input.value ? input.value.length : ''
      })
    },

    getInput () {
      return this.$refs.input?.$el?.querySelector('input')
    }
  }
}
</script>
