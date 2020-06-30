<template>
  <div v-bind="$attrs">
    <q-card class="card shadow-1 relative-position" bordered @mouseover="mouseOver" @mouseout="mouseOut">
      <q-card-section class="flex no-wrap justify-between">
        Titulo que aparecerá no card. Porém está um pouco mais longo para testes
        <q-btn flat round dense icon="edit" @click="showDialog" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialog">
      <q-card class="full-width" style="max-width: 400px; with: 100%;">
        <q-form>
          <q-toolbar>
            <q-toolbar-title>
              <span class="text-weight-bold text-subtitle1">{{ teste }}</span>
              <q-popup-edit v-model="teste" auto-save>
                <q-input v-model="teste" dense autofocus counter>
                  <template v-slot:append>
                    <q-icon name="edit" />
                  </template>
                </q-input>
              </q-popup-edit>
            </q-toolbar-title>
            <q-btn flat round dense icon="delete" size="sm" v-close-popup />
            <q-btn flat round dense icon="close" size="sm" v-close-popup />
          </q-toolbar>

          <q-card-section>
            <q-input v-model="content" type="textarea" autogrow autofocus label="Descrição" filled :bg-color="isFocused ? '' : 'white'" :borderless="!isFocused" @focus="focus" @blur="blur" />

            <div class="text-right q-pt-sm">
              <q-btn label="salvar" type="submit" color="primary" unelevated />
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      showEdit: true,
      dialog: false,
      teste: 'titulo do card',
      isFocused: false,
      content: ''
      // content: 'ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.'
    }
  },

  computed: {
    currentValue: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
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
    }
  }
}
</script>

<style lang="scss">
</style>