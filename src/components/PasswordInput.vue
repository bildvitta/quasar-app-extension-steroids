<template>
  <q-input ref="mask" v-model="model" v-bind="$attrs" v-on="events" :type="type" bottom-slots>
    <slot v-for="(slot, key) in $slots" :name="key" :slot="key" />
    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
      <slot :name="key" v-bind="scope"/>
    </template>
    <template v-slot:hint>
      <qs-password-strength-checker :value="value" :pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/" />
    </template>
    <template v-slot:append>
      <q-icon :name="icon" class="cursor-pointer" @click="toggleType" />
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

  data () {
    return {
      toggle: true
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
    toggleType () {
      this.toggle = !this.toggle
    }
  }
}
</script>
