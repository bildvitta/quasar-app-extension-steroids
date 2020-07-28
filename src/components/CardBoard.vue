<template>
  <div v-bind="$attrs" class="card-board" :class="sortingClass" v-on="$listeners" @mouseup="mouseDown">
    <q-card class="card shadow-1" bordered @mouseover="mouseOver" @mouseout="mouseOut" @click="showDialog">
      <q-card-section class="position-relative">
        <div>{{ value.title }}</div>
        <q-icon v-if="showEdit" class="card-board__icon absolute" flat round dense name="edit" />
        <q-icon v-if="value.description" flat round dense name="subject" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialog" persistent>
      <slot name="dialog">
        <q-card class="full-width" style="max-width: 500px; with: 100%;">
          <q-form @submit.prevent="submit">
            <q-toolbar class="q-pa-md">
              <q-toolbar-title class="text-wrap">
                <span class="text-weight-bold text-subtitle1">{{ model.title }}</span>
                <q-popup-edit v-model="model.title" auto-save :validate="titleValidation" @hide="titleValidation">
                  <q-input v-model="model.title" dense autofocus counter>
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-toolbar-title>
              <q-btn class="self-start" flat round dense icon="close" size="sm" v-close-popup />
            </q-toolbar>

            <q-card-section>
              <q-input v-model="model.description" type="textarea" autogrow autofocus label="Descrição" filled :bg-color="descriptionColor" :borderless="!isFocused" @focus="focus" @blur="blur" />

              <div class="text-right q-pt-md justify-between flex q-gutter-x-md">
                <q-btn class="self-start" flat round dense icon="delete" size="sm" v-close-popup @click="onDelete" />
                <q-btn label="salvar" type="submit" color="primary" unelevated v-close-popup />
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </slot>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    },

    isSorting: {
      type: Boolean
    }
  },

  data () {
    return {
      showEdit: false,
      dialog: false,
      isFocused: false,
      model: {
        title: '',
        description: ''
      }
    }
  },

  watch: {
    value (value) {
      this.setModel(value)
    }
  },

  created () {
    this.setModel(this.value)
  },

  computed: {
    descriptionColor () {
      return this.isFocused ? '' : 'white'
    },

    sortingClass () {
      console.log(this.isSorting, '>> created')
      return { 'card-board--sorting': this.isSorting }
    }
  },

  methods: {
    mouseOver () {
      this.showEdit = true
    },

    mouseOut () {
      this.showEdit = false
    },

    showDialog () {
      this.dialog = true
    },

    focus () {
      this.isFocused = true
    },

    blur () {
      this.isFocused = false
    },

    onDelete () {
      this.$emit('on-delete')
    },

    setModel (value) {
      this.model = { ...value }
    },

    submit () {
      this.$emit('input', this.model)
      this.$emit('submit')
    },

    titleValidation (value) {
      return !!value
    },

    mouseDown (event) {
      console.log('opa opaaaaa', event)
    }
  }
}
</script>

<style lang="scss">
  .card-board {

    &--sorting {
      // transform: rotateX(95deg);
    }

    &__icon {
      right: 4px;
      top: calc(50% - 7px);
      z-index: 9;
    }
  }
</style>
