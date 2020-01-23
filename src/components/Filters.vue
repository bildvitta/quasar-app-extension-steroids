<template>
  <section class="q-mb-lg">
    <div class="row q-gutter-x-md">
      <div class="col">
        <slot name="search">
          <q-form @submit.prevent="filter">
            <q-input v-model="search" dense :placeholder="searchPlaceholder" type="search">
              <template v-slot:append>
                <q-btn v-if="hasSearch" icon="o_clear" unelevated @click="clearSearch" />
                <q-btn icon="o_search" type="submit" unelevated @click="filter" />
              </template>
            </q-input>
          </q-form>
        </slot>
      </div>

      <q-btn :color="filterButtonColor" flat icon="o_filter_list" :label="filterButtonLabel">
        <q-menu stretch>
          <q-form class="q-pa-md" @submit.prevent="filter">
            Form
          </q-form>
        </q-menu>
      </q-btn>

      <slot name="actions" />
    </div>

    <div v-if="hasFilters && badges" class="q-mt-md">
      <q-chip v-for="(filter, index) in activeFilters" :key="index" color="grey-4" dense removable size="md" text-color="grey-8" @remove="removeFilter(filter)">{{ filter.label }} = "{{ filter.value }}"</q-chip>
    </div>

    <slot :filter="filter" :filters="activeFilters" :removeFilter="removeFilter" />
  </section>
</template>

<script>
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
    }
  },

  data () {
    return {
      filters: {},
      search: ''
    }
  },

  computed: {
    activeFilters () {
      // return [{ label: 'a', value: 'a' }]
      return []
    },

    filterButtonColor () {
      return 'grey-8'
    },

    filterButtonLabel () {
      return this.$q.screen.gt.xs ? 'Filtrar' : undefined
    },

    hasFilters () {
      return true
    },

    hasSearch () {
      return this.search.length
    }
  },

  methods: {
    clearSearch () {
      this.search = ''
      this.filter()
    },

    filter (filters) {
      const query = { ...this.activeFilters, ...this.filters, ...filters }
      this.$router.push({ query })
    },

    removeFilter ({ name }) {
      const query = { ...this.$route.query }
      delete query[name]

      this.$router.push({ query })
    }
  }
}
</script>