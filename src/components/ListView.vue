<template>
  <component :is="componentTag">
    <q-pull-to-refresh @refresh="refresh">
      <header v-if="hasHeaderSlot">
        <slot name="header" :fields="fields" :metadata="metadata" :results="results" />
      </header>

      <slot v-if="!noFilter" name="filter" :entity="entity" :errors="errors" :fields="fields" :metadata="metadata" :results="results">
        <qs-filters :entity="entity" />
      </slot>

      <main class="relative-position">
        <div v-if="hasResults">
          <slot :fields="fields" :metadata="metadata" :results="results" />
        </div>
 
        <div v-else-if="!isFetching" class="q-my-xl text-center">
          <q-icon class="text-center q-mb-sm" color="grey-6" name="o_search" size="38px" />
          <div class="text-grey-6">Nenhum item encontrado.</div>
        </div>

        <div v-else class="text-center q-py-lg">
          <q-spinner color="grey" size="3em" />
        </div>

        <div v-if="hasPages" class="q-mt-lg justify-center">
          <q-pagination v-model="page" boundary-links class="flex-center" direction-links :input="$q.screen.lt.sm" :max="totalPages" :max-pages="6" @click="changePage" />
        </div>

        <q-inner-loading :showing="hasResults && isFetching">
          <q-spinner color="grey" size="3em" />
        </q-inner-loading>
      </main>
    </q-pull-to-refresh>

    <slot name="footer" />
  </component>
</template>

<script>
import store from 'store'

import contextMixin from '../mixins/context'
import viewMixin from '../mixins/view'

export default {
  props: {
    noFilter: {
      default: false,
      type: Boolean
    }
  },

  data () {
    return {
      page: 1
    }
  },

  computed: {
    context () {
      const { limit, ordering, page, search, ...filters } = this.$route.query
      return { filters, limit, ordering, page: page ? parseInt(page) : 1, search }
    },

    hasHeaderSlot () {
      return !!(this.$slots.header || this.$scopedSlots.header)
    },

    hasResults () {
      return !!(this.results || []).length
    },

    hasPages () {
      return this.totalPages > 1
    },

    results () {
      return store.getters[`${this.entity}/list`]
    },

    totalPages () {
      return store.getters[`${this.entity}/totalPages`]
    }
  },

  watch: {
    $route () {
      this.fetchList()
      this.setCurrentPage()
    }
  },

  created () {
    this.fetchList()
    this.setCurrentPage()
  },

  mixins: [contextMixin, viewMixin],

  methods: {
    changePage () {
      const query = { ...this.$route.query, page: this.page }
      this.$router.push({ query })
    },

    async fetchList () {
      this.isFetching = true

      try {
        const response = await store.dispatch(`${this.entity}/fetchList`, { ...this.context, url: this.url })
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
    },

    async refresh (done) {
      await this.fetchList()
      done()
    },

    setCurrentPage () {
      this.page = parseInt(this.$route.query.page || 1)
    }
  }
}
</script>
