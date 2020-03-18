<template>
  <span>
    <slot>{{ label }}</slot>

    <q-btn class="q-ml-xs" color="grey-5" flat :icon="icon" round size="xs" @click="copy">
      <q-tooltip>Copiar</q-tooltip>
    </q-btn>
  </span>
</template>

<script>
import { copyToClipboard } from 'quasar'
/**
 * Componente para copiar texto ao clicar no botão
 */
export default {
  props: {
    /**
     * Icone do botão
     */
    icon: {
      default: 'o_file_copy',
      type: String
    },
    /**
     * Texto a ser copiado
     */
    label: {
      required: true,
      type: String
    }
  },

  methods: {
    async copy () {
      try {
        await copyToClipboard(this.label)
        this.$qs.success('Copiado!', this.label)
      } catch (error) {
        this.$qs.error('Não foi possível copiar.', this.label)
      }
    }
  }
}
</script>