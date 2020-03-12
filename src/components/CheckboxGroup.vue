<template>
  <div class="full-width">
    <q-checkbox v-model="checkAll" label="Selecionar todas" />
    <div v-for="(option, index) in options" :key="index" class="full-width">
      <q-checkbox :class="hasChildren(option) ? titleClass : []" :label="option.label" :value="hasChildren(option) ? group[index] : option.value" @input="updateCheckbox($event, option, index)" />

      <q-option-group v-if="hasChildren(option)" class="q-ml-sm row col full-width" inline :options="option.children" type="checkbox" :value="value" @input="updateChildren($event, option, index)" />
    </div>
  </div>
</template>

<script>
import { every } from 'lodash'

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
      group: {},
      checkAll: false
    }
  },

  computed: {
    titleClass () {
      return ['text-weight-bold']
    },

    groupList () {
      const groupList = []

      for (const key in this.group) {
        groupList.push(this.group[key])
      }

      return groupList
    }
  },

  created () {
    this.handleParent()
  },

  watch: {
    options (value) {
      this.handleParent()
    },

    checkAll (value) {
      const updatedValue = []

      if (value) {
        this.options.forEach(option => option.children.forEach(child => updatedValue.push(child.value)))
      }

      for (const key in this.group) {
        this.$set(this.group, key, value)
      }

      this.$emit('input', updatedValue)
    },

    value () {
      // if (this.groupList.every(value => value)) {
      //   this.checkAll = true
      // }
      this.checkAll = this.groupList.every(value => value)
    }
  },

  methods: {
    handleParent () {
      for (const index in this.options) {
        const option = this.options[index]

        if (this.hasChildren(option)) {
          this.setGroupIntersection(this.value, option, index)
        }
      }
    },

    hasChildren (option) {
      return option.hasOwnProperty('children')
    },

    setGroupIntersection (value, option, index) {
      const options = option.children.map(item => item.value)
      const intersection = options.filter(item => value.includes(item))

      this.$set(this.group, index, intersection.length ? (intersection.length === options.length ? true : null) : false)
    },

    updateCheckbox (value, option, index) {
      if (!this.hasChildren(option)) {
        // Arrumar
        return this.$emit('input', this.value)
      }

      this.$set(this.group, index, value)
      const groupValues = option.children.map(item => item.value)

      const updatedValue = value
        ? [...this.value, ...groupValues]
        : this.value.filter(item => !groupValues.includes(item))

      this.$emit('input', updatedValue)
    },

    updateChildren (value, option, index) {
      this.setGroupIntersection(value, option, index)
      this.$emit('input', value)
    }
  }
}
</script>
