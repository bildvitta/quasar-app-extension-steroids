<template>
  <q-dialog ref="dialog" v-model="model" v-bind="$attrs" v-on="$listeners" :persistent="persistent">
    <q-card v-bind="cardProps" class="q-pa-sm" :style="style">
      <q-card-section>
        <slot name="header">
          <div class="text-h6 text-bold">{{ card.title }}</div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="description">
          <div v-if="card.description">{{ card.description }}</div>
        </slot>
      </q-card-section>

      <q-card-section>
        <slot name="actions">
          <qs-btn-actions v-bind="btnActionsProps">
            <template v-slot:primary>
              <qs-btn v-if="ok" class="full-width" v-close-popup v-bind="defaultOk.props" v-on="defaultOk.events" />
            </template>
            <template v-slot:secondary>
              <qs-btn v-if="cancel" class="full-width" v-close-popup v-bind="defaultCancel.props" v-on="defaultCancel.events" />
            </template>
          </qs-btn-actions>
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import btnActions from '../mixins/btnActions'

export default {
  mixins: [btnActions],

  props: {
    value: {
      type: Boolean
    },

    persistent: {
      type: Boolean,
      default: true
    },

    card: {
      type: Object,
      default: () => ({})
    },

    maxWidth: {
      type: String,
      default: ''
    },

    minWidth: {
      type: String,
      default: ''
    },

    ok: {
      type: [Object, Boolean],
      default: () => ({})
    },

    cancel: {
      type: [Object, Boolean],
      default: () => ({})
    },

    cardProps: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      dialogMethods: {
        show: null,
        hide: null,
        toggle: null,
        focus: null,
        shake: null
      }
    }
  },

  mounted () {
    this.setDialogMethods()
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        return this.$emit('input', value)
      }
    },

    defaultOk () {
      return {
        props: {
          label: 'Ok',
          ...this.ok?.props
        },

        events: this.ok?.events
      }
    },

    defaultCancel () {
      return {
        props: {
          label: 'Cancelar',
          outline: true,
          ...this.cancel?.props
        },

        events: this.cancel?.events
      }
    },

    defaultDialogMethods () {
      return this.dialogMethods
    },

    btnActionsProps () {
      return {
        side: this.side,
        align: this.align,
        gutter: this.gutter,
        btnCol: this.btnCol
      }
    },

    style () {
      return {
        maxWidth: this.maxWidth || (this.isSmallScreen ? '' : '600px'),
        minWidth: this.minWidth || (this.isSmallScreen ? '' : '400px')
      }
    }
  },

  methods: {
    setDialogMethods () {
      for (const key in this.dialogMethods) {
        this.dialogMethods[key] = this.$refs.dialog[key]
      }
    }
  }
}
</script>
