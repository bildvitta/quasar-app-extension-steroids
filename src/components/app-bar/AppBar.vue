<template>
  <q-toolbar class="qs-toolbar">
    <q-btn dense flat icon="o_menu" round @click="toggleMenuDrawer" />

    <q-toolbar-title class="cursor-pointer" @click="goToRoot">
      <img :src="getBrandURL(theme)" alt="" class="qs-toolbar__brand">
      {{ title }}
    </q-toolbar-title>

    <div class="items-center no-wrap q-gutter-md row">
      <slot name="tools" />

      <q-btn v-if="isAuth" class="row" :title="user.givenName" flat round>
        <qs-avatar color="white" :image="asset(user.photo)" size="36px" :title="user.name || user.givenName" />

        <q-menu>
          <div style="min-width: 150px;">
            <div class="q-pa-md text-center">
              <qs-avatar color="white" :image="asset(user.photo)" size="75px" :title="user.name || user.givenName" />
              <div class="q-mt-md qs-lh-sm text-subtitle1">{{ user.name || user.givenName }}</div>
              <div class="text-caption text-grey-6 ellipsis">{{ user.email }}</div>

              <slot name="user" :user="user" />
            </div>

            <q-separator />

            <q-list>
              <q-item clickable @click="fullscreen">
                <q-item-section side>
                  <q-icon color="grey-6" :name="fullscreenIcon" size="20px" />
                </q-item-section>

                <q-item-section>Tela cheia</q-item-section>
              </q-item>

              <q-separator />

              <q-item v-close-popup clickable @click="signOut">
                <q-item-section side>
                  <q-icon color="grey-6" name="o_exit_to_app" size="20px" />
                </q-item-section>

                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { colors } from 'quasar'
import { asset } from 'steroids'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    title: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      menuDrawer: true
    }
  },

  computed: {
    ...mapGetters('auth', {
      isAuth: 'isAuth',
      user: 'user',
      theme: 'theme'
    }),
  
    fullscreenIcon () {
      return this.isFullscreen ? 'o_fullscreen_exit' : 'o_fullscreen'
    },

    isFullscreen () {
      return !!this.$q.fullscreen.isActive
    }
  },

  created () {
    colors.setBrand('primary', this.$brandColors[this.theme])
    this.getUser()
  },

  methods: {
    ...mapActions('auth', {
      getUser: 'getUser'
    }),

    asset,

    fullscreen () {
      this.$q.fullscreen.toggle()
    },

    getBrandURL (brand) {
      return require(`../assets/brands/${brand}.svg`)
    },

    goToRoot () {
      this.$router.push({ name: 'Root' })
    },

    toggleMenuDrawer () {
      this.$emit('toggle-menu')
    },

    signOut () {
      this.$router.replace({ name: 'AuthSignOut' })
    }
  }
}
</script>

<style lang="scss">
.qs-toolbar {
  box-shadow: 0 0 15px rgba($grey-10, 0.25);
  height: 64px;

  &__brand {
    height: 24px;
    margin-right: map-get($space-sm, x);
    position: relative;
    top: 4px;
  }
}
</style>
