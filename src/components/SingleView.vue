<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <slot name="header" :errors="errors" :fields="fields" :metadata="metadata" :result="result" />
    </header>

    <template v-if="hasResult">
      <slot :errors="errors" :fields="fields" :metadata="metadata" :result="result" />
    </template>

    <div v-else-if="!isFetching" class="q-my-xl text-center">
      <q-icon class="text-center q-mb-sm" color="grey-6" name="o_search" size="38px" />
      <div class="text-grey-6">Nenhum item encontrado.</div>
    </div>
    
    <footer v-if="hasFooterSlot">
      <slot name="footer" />
    </footer>

    <q-inner-loading :showing="isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import viewMixin from '../mixins/view'
import store from 'store'

export default {
  mixins: [viewMixin],

  props: {
    customId: {
      default: '',
      type: [Number, String]
    }
  },

  computed: {
    id () {
      return this.customId || this.$route.params.id
    },

    hasResult () {
      return !!this.result
    },

    result () {
      return store.getters[`${this.entity}/byId`](this.id) || {}
    },

    hasFooterSlot () {
      return !!(this.$slots.footer || this.$scopedSlots.footer)
    },
  },

  watch: {
    $route () {
      this.fetchSingle()
    }
  },

  created () {
    this.fetchSingle()
  },

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
