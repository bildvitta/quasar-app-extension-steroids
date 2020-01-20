<template>
  <q-table class="bg-transparent" v-bind="attributes">
    <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="context">
      <q-td :key="name">
        <slot :name="name" v-bind="context" />
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  props: {
    columns: {
      default: () => [],
      type: Array
    },

    fields: {
      default: () => ({}),
      type: [Array, Object]
    },

    results: {
      default: () => [],
      required: true,
      type: Array
    }
  },

  computed: {
    attributes () {
      const attributes = {
        flat: true,
        columns: this.columnsByFields,
        data: this.results,
        hideBottom: true,
        pagination: { rowsPerPage: 0 }
      }

      return attributes
    },

    columnsByFields () {
      return this.fields
    },

    rowsPerPage () {
      return this.results.length
    }
  }
}
</script>