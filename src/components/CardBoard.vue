<template>
  <q-card>
    <q-card-section>
      header
    </q-card-section>
    <q-card-section>
      <!-- <q-input v-model="value.idade" type="number" />
      <q-input v-model="value.nome" type="text" /> -->
    </q-card-section>
    <q-card-actions>
      actions
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    currentValue: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>