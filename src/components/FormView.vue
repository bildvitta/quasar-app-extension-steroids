<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <slot name="header" :fields="fields" />
    </header>

    <q-form @submit="submit">
      <slot :errors="errors" :fields="fields" :metadata="metadata" />

      <slot v-if="!readOnly" name="actions" :fields="fields">
        <div class="q-my-lg text-right">
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

export default {
  props: {
    customId: {
      default: '',
      type: String
    },

    disable: {
      type: Boolean
    },

    entity: {
      required: true,
      type: String
    },

    modal: {
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

    url: {
      default: '',
      type: String
    },

    value: {
      default: () => ({}),
      type: Object
    }
  },

  data () {
    return {
      errors: {},
      fields: {},
      metadata: {},

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

    id () {
      return this.$route.params.id || this.customId
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
    async fetch () {
      this.isFetching = true

      try {
        const response = await store.dispatch(`${this.entity}/fetchSingle`, { form: true, id: this.id })
        const { errors, fields, metadata, result } = response.data

        this.setErrors(errors)
        this.setFields(fields)
        this.setMetadata(metadata)

        if (result) {
          this.$emit('input', { ...this.value, ...result })
        }

        this.$emit('fetch-success', response, this.value)
      } catch (error) {
        const { response } = error
        const exception = get(response, 'data.exception') || error.message

        this.$qs.error('Ops! Erro ao obter os dados.', exception)
        this.$emit('fetch-error', error)

        const status = get(response, 'status')
        const redirect = ({ 403: 'Forbidden', 404: 'NotFound' })[status]

        if (redirect) {
          this.$router.replace({ name: redirect })
        }
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

    setErrors (errors) {
      this.errors = errors || {}
    },

    setFields (fields) {
      this.fields = fields || {}
    },

    setMetadata (metadata) {
      this.metadata = metadata || {}
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
