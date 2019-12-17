<template>
  <component :is="componentTag">
    <slot name="header" />

    <div v-if="hasItem">
      <slot :item="item" />
    </div>

    <div v-else class="q-my-xl text-center">
      <q-icon class="text-center q-mb-sm" color="grey-6" name="o_search" size="38px" />
      <div class="text-grey-6">Nenhum item encontrado.</div>
    </div>

    <q-inner-loading :showing="hasItem && isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import store from 'store'

import { isEmpty } from 'lodash'

export default {
  props: {
    entity: {
      type: String,
      required: true
    },

    modal: {
      type: Boolean
    }
  },

  data () {
    return {
      isFetching: false
    }
  },

  computed: {
    componentTag () {
      return this.modal ? 'div' : 'q-page'
    },

    id () {
      return this.$route.params.id
    },

    hasItem () {
      return !isEmpty(this.item)
    },

    item () {
      return store.getters[`${this.entity}/byId`](this.id) || {}
    }
  },

  created () {
    if (!this.$can('read', this.entity)) {
      return this.$router.replace({ name: 'Forbidden' })
    }

    this.fetchSingle()
  },

  methods: {
    isEmpty,

    handleErrors (error) {
      if (error) {
        if (Array.isArray(error)) {
          return error.join('\n')
        }

        return error
      }

      return 'Erro ao obter item.'
    },

    async fetchSingle () {
      this.isFetching = true

      try {
        const response = await store.dispatch(`${this.entity}/fetchSingle`, { id: this.id })
        this.$emit('fetchSuccess', response)
      } catch (errors) {
        const { data: error, status } = errors.response

        if (status === 403) {
          return this.$router.replace({ name: 'Forbidden' })
        }

        if (status === 404) {
          this.$router.replace({ name: 'NotFound' })
        }

        this.$q.notify(this.handleErrors(error.detail))

        this.$emit('fetchError', errors)
      } finally {
        this.isFetching = false
      }
    }
  }
}
</script>
