<template>
  <div>
    <q-input ref="input" v-bind="attributes" v-on="events">
      <template v-slot:append>
        <q-icon v-if="!timeOnly" class="cursor-pointer" name="o_event">
          <q-popup-proxy ref="dateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="currentValue" v-bind="dateOptions" :mask="maskDate" @input="input" />
          </q-popup-proxy>
        </q-icon>

        <q-icon v-if="!dateOnly" class="cursor-pointer q-ml-md" name="o_access_time">
          <q-popup-proxy ref="timeProxy" transition-show="scale" transition-hide="scale">
            <q-time v-model="currentValue" v-bind="timeOptions" format24h :mask="maskDate" @input="input" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { date } from 'quasar'
/**
 * Componente de data e hora
 */
export default {
  props: {
    /**
     * Mascara da data
     */
    dateMask: {
      default: 'DD/MM/YYYY',
      type: String
    },
    /**
     * Somente data
     */
    dateOnly: {
      type: Boolean
    },
    /**
     * Atributos da data para o componente de data do quasar
     */
    dateOptions: {
      default: () => ({}),
      type: Object
    },
    /**
     * Mascara da hora
     */
    timeMask: {
      default: 'HH:mm:ss',
      type: String
    },
    /**
     * Somente hora
     */
    timeOnly: {
      type: Boolean
    },
    /**
     * Atributos da hora para o componente de hora do quasar
     */
    timeOptions: {
      default: () => ({}),
      type: Object
    },
    /**
     * @model
     */
    value: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      currentValue: '',
      lastValue: ''
    }
  },

  computed: {
    attributes () {
      const { value, ...attributes } = this.$attrs

      return {
        ...attributes,
        mask: this.mask,
        value: this.currentValue
      }
    },

    events () {
      const { input, ...events } = this.$listeners

      return {
        ...events,
        input: this.input
      }
    },

    inputElement () {
      return this.$refs.input
    },

    mask () {
      return this.maskDate.replace(/\w/g, '#')
    },

    maskDate () {
      const mask = []

      if (!this.timeOnly) { mask.push(this.dateMask) }
      if (!this.dateOnly) { mask.push(this.timeMask) }

      return mask.join(' ')
    }
  },

  watch: {
    value (current, original) {
      if (current !== original && current !== this.lastValue) {
        this.currentValue = this.toMask(current)
      }
    }
  },

  created () {
    this.currentValue = this.toMask(this.value)
  },

  mounted () {
    this.$emit('mounted', this)
  },

  methods: {
    blur () {
      this.inputElement.blur()
    },

    focus () {
      this.inputElement.focus()
    },

    input (value) {
      this.currentValue = value
      const valueLength = value.replace(/_/g, '').length

      if (value === '' || valueLength === this.mask.length) {
        this.lastValue = this.toISOString(value)
        /**
         * Dispara quando valor é inputado
         */
        this.$emit('input', this.lastVallue)
      }

      if (this.dateOnly) {
        this.$refs.dateProxy.hide()
      }

      if (this.timeOnly) {
        this.$refs.timeProxy.hide()
      }
    },

    toISOString (value) {
      if (!value) {
        return ''
      }

      return date.extractDate(value, this.maskDate).toISOString()
    },

    toMask (value) {
      if (!value) {
        return ''
      }

      const newDate = new Date(value).toISOString()

      return date.formatDate(
        this.dateOnly ? newDate.slice(0, 23) : newDate,
        this.maskDate
      )
    }
  }
}
</script>
