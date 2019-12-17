<template>
  <component :is="componentTag">
    <q-pull-to-refresh @refresh="refresh">
      <slot name="header" :metadata="metadata" />

      <div v-if="showSearch" class="row">
        <q-form class="col" @submit.prevent="filter()">
          <q-input v-model="avaliableFilters.search" type="search" dense placeholder="Pesquisar...">
            <template v-slot:append>
              <q-btn v-if="hasSearchQuery" icon="o_clear" unelevated @click="clearSearch" />
              <q-btn icon="o_search" type="submit" unelevated @click="filter()" />
            </template>
          </q-input>
        </q-form>
        <q-btn v-if="filters" :color="buttonFilterColor" icon-right="o_filter_list" flat>
          <q-menu stretch>
            <q-form @submit.prevent="filter()">
              <div class="q-pa-md q-gutter-y-md">
                <div v-for="(item, index) in apiFilters" :key="item.uuid">
                  <q-input v-if="isString(item.type) && isAvaliableFilter(item)" v-model="item.value" type="search" dense placeholder="Pesquisar..." :label="item.label" reverse-fill-mask>
                    <template v-slot:append>
                      <q-btn v-if="item.value" size="10px" icon="o_clear" unelevated @click="clearFilterString(item, index)" />
                    </template>
                  </q-input>
                  <q-select v-if="isBoolean(item.type) && item.choices && isAvaliableFilter(item)" v-model="item.value" :options="item.choices" map-options emit-value :label="item.label" input-debounce="0" use-input fill-input hide-selected @filter="(value, update, abort) => searchSelect(value, update, abort, index)">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          Nenhum item econtrado.
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <qs-datetime-input v-if="isDateTime(item.type) && isAvaliableFilter(item)" v-model="item.value" date-only outlined :label="item.label" />
                </div>
                <div class="text-right">
                  <q-btn label="Limpar filtros" unelevated size="12px" @click="clearFilters" />
                  <q-btn label="Filtrar" color="primary" type="submit" flat size="12px" @click="filter()" />
                </div>
              </div>
            </q-form>
          </q-menu>
        </q-btn>
        <div v-if="currentFilters.length && inlineFilters" class="row col-12 q-mt-sm">
          <q-chip v-for="(currentFilter, index) in currentFilters" :key="index" v-model="currentFilter.show" size="md" dense removable color="grey-3" text-color="grey-8" @remove="clearChip(currentFilter)">
            {{ currentFilter.label }} = "{{ setChipValue(currentFilter.formatedLabel) }}"
          </q-chip>
        </div>
      </div>

      <slot name="afterFilter" :filter="filter" :metadata="metadata" />

      <main class="relative-position">
        <div v-if="hasItems">
          <slot :list="list" :metadata="metadata" />
        </div>

        <div v-else-if="!isFetching" class="q-my-xl text-center">
          <q-icon class="text-center q-mb-sm" color="grey-6" name="o_search" size="38px" />
          <div class="text-grey-6">Nenhum item encontrado.</div>
        </div>

        <div v-else class="text-center q-py-lg">
          <q-spinner color="grey" size="3em" />
        </div>

        <div v-if="hasPages" class="q-mt-lg justify-center">
          <q-pagination v-model="avaliableFilters.page" class="flex-center" :input="breakpointPagination" boundary-links direction-links :max="totalPages" :max-pages="6" @click="changePage" />
        </div>

        <q-inner-loading :showing="hasItems && isFetching">
          <q-spinner color="grey" size="3em" />
        </q-inner-loading>
      </main>
    </q-pull-to-refresh>
  </component>
</template>

<script>
import store from 'store'

import { date } from 'quasar'
import { isEmpty, omitBy, cloneDeep, set } from 'lodash'

export default {
  props: {
    entity: {
      type: String,
      required: true
    },

    inlineFilters: {
      type: Boolean,
      default: true
    },

    url: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean
    },

    showSearch: {
      type: Boolean,
      default: true
    },

    filters: {
      type: [Boolean, Array, String, Object],
      default: true
    }
  },

  data () {
    return {
      avaliableFilters: {
        search: this.$route.query.search || '',
        page: 1
      },
      apiFilters: [],
      filtersName: [],
      currentFilters: [],
      metadata: {},
      isFetching: false,
      stringOptions: []
    }
  },

  computed: {
    context () {
      const { limit, ordering, page, search, ...filters } = this.$route.query

      return {
        filters,
        limit,
        ordering: (ordering),
        page: page ? parseInt(page) : 1,
        search
      }
    },

    breakpointPagination () {
      return this.$q.screen.lt.sm
    },

    hasPages () {
      return this.totalPages > 1
    },

    componentTag () {
      return this.modal ? 'div' : 'q-page'
    },

    hasSearchQuery () {
      return !!this.context.search
    },

    hasItems () {
      return !!(this.list || []).length
    },

    list () {
      return store.getters[`${this.entity}/list`]
    },

    totalPages () {
      return store.getters[`${this.entity}/totalPages`]
    },

    hasFiltered () {
      return Object.keys(this.$route.query).some(item => this.filtersName.includes(item))
    },

    buttonFilterColor () {
      return this.hasFiltered ? 'primary' : ''
    },

    avaliableQuery () {
      let avaliable = {}

      for (const key in this.$route.query) {
        if (this.filtersName.includes(key)) {
          set(avaliable, key, this.$route.query[key])
        }
      }

      return avaliable
    }
  },

  watch: {
    $route () {
      this.fetchList()
      this.currentPage()

      if (this.inlineFilters) {
        this.setDefaultFiltersValue()
      }
    }
  },

  created () {
    if (!this.$can('read', this.entity)) {
      return this.$router.replace({ name: 'Forbidden' })
    }

    if (this.filters) {
      this.fetchFields()
    }

    this.fetchList()
    this.currentPage()
  },

  methods: {
    currentPage () {
      this.avaliableFilters.page = parseInt(this.$route.query.page || 1)
    },

    handleErrors (apiErrors) {
      if (apiErrors) {
        if (Array.isArray(apiErrors)) {
          return apiErrors.join('\n')
        }

        return apiErrors
      }

      return 'Erro ao obter itens.'
    },

    clearFilters () {
      const { filters, ...query } = this.context

      for (const key in this.$route.query) {
        if (!this.filtersName.includes(key)) {
          set(query, key, this.$route.query[key])
        }
      }

      this.$router.push({ query })

      this.apiFilters.forEach(item => {
        item.value = ''
      })
    },

    clearChip ({ name }) {
      const query = cloneDeep(this.$route.query)
      delete query[name]

      this.$router.push({ query })

      this.apiFilters.forEach(item => {
        if (item.name === name) {
          item.value = ''
        }
      })
    },

    clearSearch () {
      this.avaliableFilters.search = ''
      this.filter()
    },

    setChipValue (value) {
      return date.isValid(value) ? this.$options.filters.formatDate(new Date(value).toISOString().slice(0, 23)) : value
    },

    async fetchList () {
      this.isFetching = true

      try {
        const response = await store.dispatch(`${this.entity}/fetchList`, { ...this.context, url: this.url })
        const { results, ...metadata } = response.data
        this.metadata = metadata

        this.$emit('fetchSuccess', response)
      } catch (errors) {
        const { data: error, status } = errors.response

        if (status === 403) {
          this.$router.replace({ name: 'Forbidden' })
        }

        if (status === 404) {
          this.$router.replace({ name: 'NotFound' })
        }

        this.$q.notify(this.handleErrors(error.detail))
        this.$emit('fetchError', errors)
      } finally {
        this.isFetching = false
      }
    },

    searchSelect (value, update, abort, index) {
      if (value === '') {
        update(() => {
          this.$set(
            this.apiFilters[index],
            'choices',
            this.stringOptions[index].choices
          )
        })

        return
      }

      update(() => {
        const needle = value.toLowerCase()

        this.$set(
          this.apiFilters[index],
          'choices',
          this.stringOptions[index].choices.filter(
            value => value.label.toLowerCase().indexOf(needle) > -1
          )
        )
      })
    },

    filter (externalFilters) {
      if (externalFilters && typeof externalFilters === 'object') {
        for (const key in externalFilters) {
          this.$set(this.avaliableFilters, key, externalFilters[key])
        }
      }

      this.apiFilters.forEach(item => {
        if (this.isDateTime(item.type)) {
          item.value = this.formatDate(item.value)
        }

        this.$set(this.avaliableFilters, item.name, item.value.toString())
      })

      const query = omitBy(this.avaliableFilters, isEmpty)
      this.$router.push({ query })
    },

    formatDate (value) {
      return value
        ? date.formatDate(new Date(value).toISOString().slice(0, 23), 'YYYY-MM-DD')
        : ''
    },

    changePage () {
      this.$router.push({
        query: { ...this.$route.query, page: this.avaliableFilters.page }
      })
    },

    async refresh (done) {
      await this.fetchList()
      done()
    },

    async fetchFields () {
      const response = await store.dispatch(`${this.entity}/fetchFields`)
      const results = cloneDeep(response.data.actions.pOST)

      for (const key in results) {
        this.apiFilters.push(results[key])
        this.filtersName.push(results[key].name)
      }

      this.stringOptions = cloneDeep(this.apiFilters)

      this.setDefaultFiltersValue()
    },

    setDefaultFiltersValue () {
      this.currentFilters = []

      this.apiFilters.forEach(item => {
        let queryIndex = 0

        for (const queryKey in this.avaliableQuery) {
          if (item && item.name === queryKey) {
            item.value = this.isBooleanValue(this.avaliableQuery[queryKey])
              ? JSON.parse(this.avaliableQuery[queryKey])
              : this.avaliableQuery[queryKey]

            this.currentFilters.push(item)
            const filter = this.currentFilters[queryIndex]

            const label = filter.choices
              ? filter.choices.find(item => item.value === this.currentFilters[queryIndex].value).label
              : filter.value

            this.$set(this.currentFilters, queryIndex, { ...item, show: true, formatedLabel: label })
          }

          queryIndex++
        }
      })
    },

    isBooleanValue (value) {
      return ['false', 'true'].includes(value)
    },

    clearFilterString ({ name }, index) {
      this.apiFilters[index].value = ''
    },

    filterString ({ name, value }) {
      const query = omitBy({ ...this.$route.query, [name]: value }, isEmpty)
      this.$router.push({ query })
    },

    isAvaliableFilter ({ name }) {
      if (this.filters === true) {
        return this.filter
      }

      if (this.isObject(this.filters)) {
        return this.filtersPermissions(name)
      }

      if (!Array.isArray(this.filters)) {
        return this.filters.toLowerCase() === name
      }

      if (Array.isArray(this.filters)) {
        return this.filters.includes(name)
      }
    },

    filtersPermissions (name) {
      for (const key in this.filters) {
        if (Array.isArray(this.filters[key])) {
          let isAvaliable = this.$canAny(this.filters[key], this.entity) && key.toLowerCase() === name

          if (isAvaliable) {
            return isAvaliable
          }
        }

        let isAvaliable = this.$can(this.filters[key], this.entity) && key.toLowerCase() === name

        if (isAvaliable) {
          return isAvaliable
        }
      }

      return false
    },

    isObject (value) {
      return typeof value === 'object' && !Array.isArray(value)
    },

    isString (value) {
      return value === 'string'
    },

    isBoolean (value) {
      return value === 'boolean'
    },

    isDateTime (value) {
      return value === 'datetime'
    }
  }
}
</script>
