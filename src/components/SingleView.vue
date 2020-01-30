<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <slot name="header" :errors="errors" :fields="fields" :metadata="metadata" :result="result" />
    </header>

    <template v-if="hasResult">
      <slot :errors="errors" :fields="fields" :metadata="metadata" :result="result" />
    </template>

    <div v-else class="q-my-xl text-center">
      <q-icon class="text-center q-mb-sm" color="grey-6" name="o_search" size="38px" />
      <div class="text-grey-6">Nenhum item encontrado.</div>
    </div>

    <q-inner-loading :showing="hasResult && isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import store from 'store'
import viewMixin from '../mixins/view'

export default {
  props: {
    customId: {
      default: '',
      type: String
    }
  },

  computed: {
    id () {
      return this.customId || this.$route.params.id
    },

    hasResult () {
      return !!(this.result || []).length
    },

    result () {
      return store.getters[`${this.entity}/byId`](this.id) || {}
    }
  },

  watch: {
    $route () {
      this.fetchSingle()
    }
  },

  created () {
    this.fetchSingle()
  },

  mixins: [viewMixin],

  methods: {
    async fetchSingle () {
      this.isFetching = true

      try {
        const response = await store.dispatch(`${this.entity}/fetchSingle`, { id: this.id, url: this.url })
        const { errors, fields, metadata } = response.data

        this.setErrors(errors)
        this.setFields(fields)
        this.setMetadata(metadata)

        this.$emit('fetch-success', response)
      } catch (error) {
        this.fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.isFetching = false
      }
    }
  }
}
</script>
