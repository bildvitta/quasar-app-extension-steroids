<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <!--
				@slot slot para acessar o header
				@binding {object} errors
o				@binding {object} fields
				@binding {array} results
				@binding {object} metadata
			-->
      <slot name="header" :errors="errors" :fields="fields" :metadata="metadata" :result="result" />
    </header>

    <template v-if="hasResult">
      <!--
				@slot slot para acessar conteudo main
				@binding {object} errors
o				@binding {object} fields
				@binding {array} results
				@binding {object} metadata
			-->
      <slot :errrs="errors" :fields="fields" :metadata="metadata" :result="result" />
    </template>

    <div v-else-if="!isFetching" class="q-my-xl text-center">
      <q-icon class="text-center q-mb-sm" color="grey-6" name="o_search" size="38px" />
      <div class="text-grey-6">Nenhum item encontrado.</div>
    </div>
    
    <footer v-if="hasFooterSlot">
      <!-- @slot slot para acessar footer -->
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
/**
 * Componente semelhante ao ListView porem não retorna uma lista, usado como "show" nas paginas
 */
export default {
  mixins: [viewMixin],

  props: {
    /**
     * Caso o Id da URL seja diferente do ID real, você pode passar um id customizado por essa prop
     */
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

  methods: {
    async fetchSingle () {
      this.isFetching = true

      try {
        const response = await store.dispatch(`${this.entity}/fetchSingle`, { id: this.id, url: this.url })
        const { errors, fields, metadata } = response.data

        this.setErrors(errors)
        this.setFields(fields)
        this.setMetadata(metadata)
        /**
         * Dispara quando a requição é feita com sucesso
         *
         * @property {object} response resposta da api
         */
        this.$emit('fetch-success', response)
      } catch (error) {
        this.fetchError(error)
        /**
         * Dispara quando a há falha na requisição
         *
         * @property {object} error resposta de erro da api
         */
        this.$emit('fetch-error', error)
      } finally {
        this.isFetching = false
      }
    }
  }
}
</script>
