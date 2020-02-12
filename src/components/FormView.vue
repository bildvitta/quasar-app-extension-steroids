<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <slot name="header" :fields="fields" :metadata="metadata" />
    </header>

    <q-form @submit="submit">
      <slot :errors="errors" :fields="fields" :metadata="metadata" />

      <slot v-if="!readOnly" name="actions" :fields="fields">
        <div class="q-my-lg text-right">
          <q-btn v-close-popup="dialog" class="q-mr-md" color="grey-8" :disable="disable || isSubmiting" :label="cancelButton" outline type="button" @click="cancel" />
          <q-btn color="primary" :disable="disable" :label="submitButton" :loading="isSubmiting" type="submit" unelevated />
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
import { get } from 'lodash'

import viewMixin from '../mixins/view'

export default {
  mixins: [viewMixin],

  props: {
    cancelButton: {
      default: 'Cancelar',
      type: String
    },

    customId: {
      default: '',
      type: String
    },

    disable: {
      type: Boolean
    },

    mode: {
      default: 'create',
      type: String
    },

    readOnly: {
      type: Boolean
    },

    submitButton: {
      default: 'Salvar',
      type: String
    },

    value: {
      default: () => ({}),
      type: Object
    }
  },

  data () {
    return {
      isSubmiting: false
    }
  },

  computed: {
    fetchURL () {
      return this.url ? (`${this.url}/${this.isCreateMode ? 'new' : 'edit'}`) : ''
    },

    id () {
      return this.customId || this.$route.params.id
    },

    isCreateMode () {
      return this.mode === 'create'
    }
  },

  watch: {
    fields (fields) {
      const models = this.getModelsByFields(fields)
      this.$emit('input', { ...models, ...this.value })
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    cancel () {
      if (!this.dialog) {
        history.back()
      }
    },

    async fetch (params) {
      this.isFetching = true

      try {
        const response = await store.dispatch(
          `${this.entity}/fetchSingle`, { form: true, id: this.id, params, url: this.fetchURL }
        )

        const { errors, fields, metadata, result } = response.data

        this.setErrors(errors)
        this.setFields(fields)
        this.setMetadata(metadata)

        if (result) {
          this.$emit('input', { ...this.value, ...result })
        }

        this.$emit('fetch-success', response, this.value)
      } catch (error) {
        this.fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.isFetching = false
      }
    },

    getModelsByFields (fields) {
      const models = {}

      for (const field in fields) {
        models[field] = fields[field].default
      }

      return models
    },

    async submit (event) {
      if (event) {
        event.preventDefault()
      }

      if (this.disable || this.readyOnly) {
        return null
      }

      this.isSubmiting = true

      try {
        const response = await store.dispatch(
          `${this.entity}/${this.mode}`,
          { id: this.id, payload: this.value, url: this.url }
        )

        this.setErrors()
        this.$qs.success(response.data.status.text || 'Item salvo com sucesso!')
        this.$emit('submit-success', response, this.value)
      } catch (error) {
        const errors = get(error, 'response.data.errors')
        const message = get(error, 'response.data.status.text')

        const exception = errors
          ? 'Existem erros de validação no formulário.'
          : get(error, 'response.data.exception') || error.message

        this.setErrors(errors)
        this.$qs.error(message || 'Ops! Erro ao salvar item.', exception)

        this.$emit('submit-error', error)
      } finally {
        this.isSubmiting = false
      }
    }
  }
}
</script>
