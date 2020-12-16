<template>
  <div class="q-mb-sm text-bold text-subtitle2" v-bind="$attrs" v-on="$listeners">
    <slot :formattedLabel="formattedLabel">
      {{ formattedLabel }}
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },

    quantity: {
      type: Number,
      default: 0
    }
  },

  computed: {
    formattedLabel () {
      return this.quantity ? `${this.label} (${this.quantity})` : this.label
    }
  }
}
</script>
