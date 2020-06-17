<template>
  <div>
    <q-btn v-if="showAddCardButton" label="Adicionar novo cartão..." flat color="grey-7" no-caps icon="add" unelevated @click="showActions" />
    <div v-else>
      <div class="q-mb-sm">
        <q-input outlined type="textarea" autogrow autofocus v-model="model" label="Insira um título para este cartão..." />
      </div>
      <div class="flex q-gutter-sm">
        <q-btn class="col" label="Adicionar" :disabled="!model" outline color="positive" no-caps unelevated @click="add" />
        <q-btn class="col" label="Cancelar" outline color="grey-6" no-caps unelevated @click="cancel" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      showAddCardButton: true
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    showActions () {
      this.showAddCardButton = false
      const scrollElement = this.$parent.$el.querySelector('.column-board__content')

      scrollElement.scroll({ top: scrollElement.offsetHeight, behavior: 'smooth' })
    },

    add () {
      this.$emit('add')
    },

    cancel () {
      this.showAddCardButton = true
      this.$emit('cancel')
    }
  }
}
</script>
