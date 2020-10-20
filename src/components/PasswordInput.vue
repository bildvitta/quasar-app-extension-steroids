<template>
  <q-input ref="mask" v-model="model" v-bind="$attrs" v-on="events" :type="type" bottom-slots>
    <template v-slot:hint>
      <qs-password-strength-checker v-bind="$props" />
    </template>
    <template v-slot:append>
      <q-icon :name="icon" class="cursor-pointer" @click="toggle" />
    </template>

    <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope"/>
    </template>
  </q-input>
</template>

<script>
import password from '../mixins/password'

export default {
  mixins: [password],

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      toggleType: true
    }
  },

  watch: {
    value () {
      if (this.$attrs.error) {
        this.$attrs.error = false
        this.$attrs.errorMessage = ''
      }
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        return this.$emit('input', value)
      }
    },

    events () {
      const { input, ...events } = this.$listeners

      return events
    },

    icon () {
      return this.toggle ? 'visibility_off' : 'visibility'
    },

    type () {
      return this.toggle ? 'password' : 'text'
    }
  },

  methods: {
    toggle () {
      this.toggleType = !this.toggleType
    }
  }
}
</script>