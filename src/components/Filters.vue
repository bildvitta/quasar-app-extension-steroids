<template>
  <section class="q-mb-lg">
    <div class="row q-gutter-x-md">
      <div class="col">
        <q-form @submit.prevent="filter">
          <q-input v-model="search" dense :placeholder="searchPlaceholder" type="search">
            <template v-slot:append>
              <q-btn v-if="hasSearch" icon="o_clear" unelevated @click="clearSearch" />
              <q-btn icon="o_search" type="submit" unelevated @click="filter()" />
            </template>
          </q-input>
        </q-form>
      </div>

      <q-btn :color="filterButtonColor" flat icon="o_filter_list" :label="filterButtonLabel">
        <q-menu stretch @before-show="fetchFilters">
          <div v-if="isFetching" class="q-pa-xl text-center">
            <q-spinner color="grey" size="2em" />
          </div>

          <div v-else-if="hasFetchError" class="q-pa-xl text-center">
            <q-icon color="negative" name="o_warning" size="2em" />
          </div>

          <q-form v-else class="q-pa-md q-gutter-y-md" @submit.prevent="filter()">
            <div v-for="(field, index) in fields" :key="index">
              <qs-field v-model="filters[field.name]" dense :field="field" />
            </div>

            <div class="text-right">
              <q-btn label="Limpar filtros" size="12px" unelevated @click="clearFilters" />
              <q-btn color="primary" label="Filtrar" size="12px" unelevated type="submit" />
            </div>
          </q-form>
        </q-menu>
      </q-btn>
    </div>

    <div v-if="badges && hasActiveFilters" class="q-mt-md">
      <q-chip v-for="(filter, key) in activeFilters" :key="key" color="grey-4" dense removable size="md" text-color="grey-8" @remove="removeFilter(filter)">{{ filter.label }} = "{{ filter.value }}"</q-chip>
    </div>

    <slot :context="context" :filter="filter" :filters="activeFilters" :removeFilter="removeFilter" />
  </section>
</template>

<script>
import { camelizeKeys } from 'humps'
import store from 'store'

import contextMixin from '../mixins/context'

export default {
  props: {
    badges: {
      default: true,
      type: Boolean
    },

    entity: {
      required: true,
      type: String
    },

    searchPlaceholder: {
      default: 'Pesquisar...',
      type: String
    },

    url: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      filters: {},
      search: '',

      hasFetchError: false,
      isFetching: false
    }
  },

  computed: {
    activeFilters () {
      if (!this.hasFields) {
        return {}
      }

      console.log('=========')

      const activeFilters = {}
      const filters = camelizeKeys(this.context.filters)

      for (const key in filters) {
        const value = filters[key]
        const { label, name } = this.fields[key]

        activeFilters[key] = { label, name, value }
      }


      return activeFilters
    },

    fields () {
      return store.getters[`${this.entity}/filters`]
    },

    filterButtonColor () {
      return this.hasActiveFilters ? 'primary' : 'grey-8'
    },

    filterButtonLabel () {
      return this.$q.screen.gt.xs ? 'Filtrar' : undefined
    },

    hasActiveFilters () {
      const { filters } = this.context
      return !!Object.keys(filters).length
    },

    hasFields () {
      return !!Object.keys(this.fields).length
    },

    hasSearch () {
      return this.search.length
    }
  },

  created () {
    this.fetchFilters()
    this.updateValues()
  },

  mixins: [contextMixin],

  watch: {
    $route () {
      this.fetchFilters()
      this.updateValues()
    }
  },

  methods: {
    clearFilters () {
      const { filters, ...query } = this.context
      this.$router.push({ query })
    },

    clearSearch () {
      this.search = ''
      this.filter()
    },

    async fetchFilters () {
      if (this.hasFields) {
        return null
      }

      this.hasFetchError = false
      this.isFetching = true

      try {
        const response = await store.dispatch(`${this.entity}/fetchFilters`, { url: this.url })
        this.$emit('fetch-success', response)
      } catch (error) {
        this.hasFetchError = true
        this.$emit('fetch-error', error)
      } finally {
        this.isFetching = false
      }
    },

    filter (external) {
      const { filters, ...context } = this.context

      const query = {
        ...filters, ...this.filters, ...external, ...context,
        search: this.search || undefined
      }

      this.$router.push({ query })
    },

    removeFilter ({ name }) {
      const query = { ...this.$route.query }
      delete query[name]

      this.$router.push({ query })
    },

    updateValues () {
      const { filters, search } = this.context
      this.search = search || ''

      for (const key in filters) {
        this.$set(this.filters, key, filters[key] || {})
      }
    }
  }
}
</script>