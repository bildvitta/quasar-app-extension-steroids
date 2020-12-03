<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <slot name="header" :errors="errors" :fields="fields" :metadata="metadata" />
    </header>

    <q-form @submit="submit">
      <slot :errors="errors" :fields="fields" :metadata="metadata" />

      <slot v-if="!readOnly" name="actions" :errors="errors" :fields="fields" :metadata="metadata">
        <div class="row q-my-lg q-col-gutter-md justify-end">
          <div v-if="hasCancelButton" class="col-12 col-sm-2" :class="cancelButtonClass">
            <qs-btn v-close-popup="dialog" class="full-width" :disable="disable || isSubmiting" :label="cancelButton" outline type="button" @click="cancel" />
          </div>
          <div class="col-12 col-sm-2" :class="saveButtonClass">
            <qs-btn class="full-width" :disable="disable" :label="submitButton" :loading="isSubmiting" type="submit" />
          </div>
        </div>
      </slot>
    </q-form>

    <footer v-if="hasFooterSlot">
      <slot name="footer" :errors="errors" :fields="fields" :metadata="metadata"/>
    </footer>

    <q-inner-loading :showing="isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import { get, isEqual } from 'lodash'
import { extend } from 'quasar'

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
      type: [Number, String]
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

    route: {
      default: () => ({}),
      type: Object
    },

    submitButton: {
      default: 'Salvar',
      type: String
    },

    value: {
      default: () => ({}),
      type: Object
    },

    showDialogOnUnsavedChanges: {
      default: true,
      type: Boolean
    },

    cancelRoute: {
      default: '',
      type: [Boolean, String, Object]
    }
  },

  data () {
    return {
      isSubmiting: false,
      cachedResult: {}
    }
  },

  computed: {
    fetchURL () {
      return this.url ? (`${this.url}/${this.isCreateMode ? 'new' : 'edit'}`) : ''
    },

    id () {
      return this.customId || this.resolvedRoute.params.id
    },

    isCreateMode () {
      return this.mode === 'create'
    },

    resolvedRoute () {
      if (this.route && Object.keys(this.route).length) {
        return this.route
      }

      return this.$route
    },

    hasCancelButton () {
      return !(typeof this.cancelRoute === 'boolean' && !this.cancelRoute)
    },

    isMobile () {
      return this.$q.screen.xs
    },

    saveButtonClass () {
      return this.isMobile && 'order-first'
    },

    cancelButtonClass () {
      return this.isMobile && 'order-last'
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
        this.handleCancelRoute()
      }
    },

    async fetch (params) {
      this.isFetching = true

      try {
        const response = await this.$store.dispatch(
          `${this.entity}/fetchSingle`, { form: true, id: this.id, params, url: this.fetchURL }
        )

        const { errors, fields, metadata, result } = response.data

        this.setErrors(errors)
        this.setFields(fields)
        this.setMetadata(metadata)

        if (result) {
          this.cachedResult = this.showDialogOnUnsavedChanges && extend(true, {}, result)
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
        const response = await this.$store.dispatch(
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
    },

    beforeRouteLeave (to, from, next) {
      if (!this.showDialogOnUnsavedChanges) {
        return null
      }

      if (isEqual(this.value, this.cachedResult)) {
        return next()
      }

      this.$q.dialog({
        title: 'Atenção',
        message: 'Você está deixando a página e suas alterações serão perdidas. Tem certeza que deseja sair sem salvar?',
        persistent: true,
        cancel: {
          label: 'Sair',
          noCaps: true,
          outline: true
        },
        ok: {
          noCaps: true,
          label: 'Continuar editando'
        }
      }).onCancel(() => {
        next()
      }).onOk(() => next(false))
    },

    handleCancelRoute () {
      if (this.cancelRoute) {
        return this.$router.push(this.cancelRoute)
      }

      const [dash, path] = this.$route.path.split('/')
      const resolvedPath = this.$router.resolve(`/${path}`).route.path

      this.$router.push(resolvedPath)
    }
  }
}
</script>
