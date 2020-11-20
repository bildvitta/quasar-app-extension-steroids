<template>
  <q-btn class="settings-menu" color="primary" icon="o_settings" :label="label" outline no-caps>
    <q-menu class="settings-menu__menu">
      <q-list separator class="settings-menu__list">
        <q-item clickable class="text-primary text-bold" v-close-popup>
          <q-item-section class="flex">
            <div class="flex justify-center items-center q-gutter-x-md">
              <q-icon name="o_lock" />
              <div>{{ blockLabel }}</div>
            </div>
          </q-item-section>
        </q-item>
        <qs-delete tag="q-item" v-bind="deleteProps" class="text-negative text-bold" clickable v-close-popup :custom-id="customId" @success="onDeleteSuccess">
          <q-item-section>
            <div class="flex justify-center items-center q-gutter-x-md">
              <q-icon name="o_delete" />
              <div>{{ deleteLabel }}</div>
            </div>
          </q-item-section>
        </qs-delete>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import deleteComponent from '../mixins/deleteComponent'

export default {
  props: {
    deleteLabel: {
      type: String,
      default: ''
    },

    blockLabel: {
      type: String,
      default: 'Bloquear acesso'
    }
  },

  mixins: [deleteComponent],

  computed: {
    label () {
      return this.$q.screen.gt.xs ? 'Configurações' : undefined
    },

    deleteProps () {
      const { deleteLabel, blockLabel, ...deleteProps } = this.$props

      return deleteProps
    }
  },

  methods: {
    onDeleteSuccess () {
      console.log('cai aqui')
      return this.$emit('delete-success')
    }
  }
}
</script>

<style lang="scss">
.settings-menu {
  &__list {
    max-width: 265px;
    width: 265px;
  }
}
</style>
