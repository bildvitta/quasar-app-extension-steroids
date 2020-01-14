<template>
  <div>
    <div v-for="(option, index) in options" :key="index">
      <q-checkbox :class="hasChildren(option) ? titleClass : []" :label="option.label" :value="hasChildren(option) ? group[option.value] : option.value" @input="updateCheckbox($event, option)" />

      <q-option-group v-if="hasChildren(option)" class="q-ml-sm" inline :options="option.children" type="checkbox" :value="value" @input="updateChildren($event, option)" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      default: () => [],
      type: Array
    },

    value: {
      default: () => [],
      type: Array
    }
  },

  data () {
    return {
      group: {}
    }
  },

  computed: {
    titleClass () {
      return ['text-weight-bold']
    }
  },

  methods: {
    handleParent () {

    },

    hasChildren (option) {
      return option.hasOwnProperty('children')
    },

    updateCheckbox (value, option) {
      console.log(value, option)
      this.group[option.value] = value

      if (!this.hasChildren(option)) {
        // Arrumar
        return this.$emit('input', this.value)
      }

      const groupValue = value ? option.children.map(item => item.value) : []
      this.$emit('input', groupValue)
    },

    updateChildren (value, option) {
      const options = option.children.map(item => item.value)
      const intersection = options.filter(item => value.includes(item))

      this.group[option.value] = intersection.length ? (intersection.length === options.length ? true : null) : false
      this.$emit('input', value)
    }
  }
}
</script>
