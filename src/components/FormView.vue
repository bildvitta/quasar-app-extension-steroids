<template>
  <component :is="componentTag">
    <div v-if="hasHeaderSlot">
      <slot name="header" :values="values" />
    </div>

    <q-form @submit="submit">
      <div v-if="!isEmpty(values)">
        <slot :errors="errors" :values="values" />
      </div>

      <slot v-if="!readOnly" name="actions" :values="values">
        <div class="q-my-lg text-right">
          <q-btn color="primary" :disable="disableSubmit" :label="buttonLabel" :loading="isSubmiting" type="submit" unelevated />
        </div>
      </slot>
    </q-form>

    <q-inner-loading :showing="isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import store from 'store'

import humps from 'humps'
import { cloneDeep, isEmpty, isNull, merge, omitBy } from 'lodash'

export default {
  props: {
    customId: {
      type: String,
      default: ''
    },

    entity: {
      type: String,
      required: true
    },

    disableSubmit: {
      type: Boolean
    },

    fields: {
      type: Object,
      default: () => ({})
    },

    omitFields: {
      type: Boolean
    },

    loadData: {
      type: Boolean
    },

    modal: {
      type: Boolean
    },

    mode: {
      type: String,
      required: true
    },

    readOnly: {
      type: Boolean
    },

    submiting: {
      type: Boolean
    },

    url: {
      type: String,
      default: ''
    },

    buttonLabel: {
      type: String,
      default: 'Salvar'
    }
  },

  data () {
    return {
      errors: {},
      values: {},
      isFetching: false,
      isSubmiting: false
    }
  },

  computed: {
    componentTag () {
      return this.modal ? 'div' : 'q-page'
    },

    hasHeaderSlot () {
      return !!(this.$slots.header || this.$scopedSlots.header)
    },

    fieldsData () {
      return store.getters[`${humps.camelize(this.entity)}/byId`](this.id)
    },

    id () {
      return this.$route.params.id || this.customId
    },

    defaultMessage () {
      return {
        fetchError: 'Erro ao obter item.',
        submitError: 'Erro ao salvar item.',
        submitSuccess: 'Item salvo com sucesso.'
      }
    }
  },

  created () {
    this.values = this.fields

    if (this.loadData || this.mode !== 'create') {
      this.fetch()
    }
  },

  methods: {
    isEmpty,

    fetchSingle () {
      return store.dispatch(`${humps.camelize(this.entity)}/fetchSingle`, { id: this.id })
    },

    handleErrors (apiErrors, path) {
      if (apiErrors) {
        if (Array.isArray(apiErrors)) {
          return apiErrors.join('\n')
        }

        return apiErrors
      }

      return this.defaultMessage[path] ? this.defaultMessage[path] : ''
    },

    async fetch () {
      this.isFetching = true

      try {
        const response = await this.fetchSingle()

        const fields = omitBy(response.data, isNull)
        this.values = cloneDeep(this.omitFields ? merge(this.values, fields) : response.data)

        this.$emit('fetchSuccess', response, this.values)
      } catch (errors) {
        const { data: error, status } = errors.response

        if (status === 404) {
          return this.$router.replace({ name: 'NotFound' })
        }

        if (status === 403) {
          return this.$router.replace({ name: 'Forbidden' })
        }

        this.$q.notify(this.handleErrors(error.detail, 'fetchError'))
        this.$emit('fetchError', errors)
      } finally {
        this.isFetching = false
      }
    },

    async submit () {
      if (this.disableSubmit || this.readyOnly) {
        return null
      }

      this.isSubmiting = true
      this.$emit('update:submiting', this.isSubmiting)

      try {
        const response = await this.submitAction({ id: this.id, payload: this.values, url: this.url })
        const genericMessage = 'Item salvo com sucesso.'
        this.errors = {}
        this.$q.notify(genericMessage)
        this.$emit('submitSuccess', response)
      } catch (errors) {
        this.errors = errors.response.data
        this.$q.notify(this.handleErrors(this.errors.detail, 'submitError'))
        this.$emit('submitError', errors)
      } finally {
        this.isSubmiting = false
        this.$emit('update:submiting', this.isSubmiting)
      }
    },

    submitAction (context) {
      return store.dispatch(`${humps.camelize(this.entity)}/${this.mode}`, context)
    }
  }
}
</script>
