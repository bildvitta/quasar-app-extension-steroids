<template>
  <div v-bind="$attrs">
    <q-btn v-if="showAddCardButton" :label="label" flat color="grey-7" no-caps icon="add" unelevated @click="showActions" />
    <div v-else>
      <div class="q-mb-sm">
        <q-input outlined type="textarea" autogrow autofocus v-model="text" :label="inputLabel" />
      </div>
      <div class="flex q-gutter-sm">
        <q-btn class="col" label="Cancelar" outline color="grey-6" no-caps unelevated @click="cancel" />
        <q-btn class="col" label="Adicionar" :disabled="!text" color="primary" no-caps unelevated @click="add" />
      </div>
    </div>
  </div>
</template>

<script>
import { findParent } from '../helpers'

export default {
  props: {
    card: {
      type: Boolean
    },

    label: {
      type: String,
      default: 'Adicionar nova coluna'
    },

    inputLabel: {
      type: String,
      default: 'Insira um título para esta coluna'
    }
  },

  data () {
    return {
      showAddCardButton: true,
      text: ''
    }
  },

  methods: {
    showActions () {
      this.showAddCardButton = false

      return !this.card ? this.scrollColumn() : this.scrollCard()
    },

    scrollCard () {
      const parentElement = findParent(this.$el, '.board-view__box')
      const scrollElement = parentElement.querySelector('.board-view__content')

      scrollElement.scroll({ top: scrollElement.scrollHeight, behavior: 'smooth' })
    },

    scrollColumn () {
      this.$parent.element.scroll({ left: this.$parent.element.scrollWidth, behavior: 'smooth' })
    },

    add () {
      this.$emit('add', this.text)
      this.clear()
    },

    cancel () {
      this.$emit('cancel')
      this.clear()
    },

    clear () {
      this.showAddCardButton = true
      this.text = ''
    }
  }
}
</script>
