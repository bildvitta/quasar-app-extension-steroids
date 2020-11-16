<template>
  <q-toolbar class="qs-toolbar">
    <q-ajax-bar color="white" position="top" size="2px" />

    <q-btn dense flat icon="o_menu" round @click="toggleMenuDrawer" />

    <q-toolbar-title class="flex">
      <div @click="goToRoot" class="cursor-pointer">
        <img :src="brand" alt="" class="qs-toolbar__brand">  
        {{ title }} <q-badge v-if="hasDevelopmentBadge" align="middle" color="negative" :label="developmentBadgeLabel" />
      </div>
    </q-toolbar-title>

    <q-btn icon="notifications_none" unelevated dense round>
      <q-badge color="red" floating>4</q-badge>
    </q-btn>

    <qs-apps-menu v-if="hasApps" :apps="apps" />

    <div class="items-center no-wrap q-gutter-md row">
      <slot name="tools" />

      <div v-if="isAuth" class="qs-toolbar__user row items-center q-mr-sm" :title="user.name || user.givenName">
        <qs-avatar color="white" :image="asset(user.photo)" size="36px" :title="user.name || user.givenName" />

        <div class="qs-toolbar__user-data cursor-pointer q-pl-xs q-pr-sm qs-lh-sm">
          <div class="ellipsis">{{ user.name || user.givenName }}</div>
          <div class="text-caption ellipsis opacity-60 qs-lh-sm">{{ user.email }}</div>
        </div>

        <q-menu>
          <div class="qs-toolbar__user-menu">
            <div class="text-center q-pa-md">
              <qs-avatar color="white" :image="asset(user.photo)" size="75px" :title="user.name || user.givenName" />
              <div class="q-mt-md qs-lh-sm text-subtitle1 ellipsis">{{ user.name || user.givenName }}</div>
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
      </div>
    </div>
  </q-toolbar>
</template>

<script>
import { colors } from 'quasar'
import { asset } from 'steroids'

export default {
  props: {
    title: {
      required: true,
      type: String
    },

    user: {
      require: true,
      type: Object,
      default: () => ({})
    },

    isAuth: {
      type: Boolean
    },

    brand: {
      required: true,
      type: String,
      default: ''
    },

    apps: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      menuDrawer: true
    }
  },

  computed: {
    fullscreenIcon () {
      return this.isFullscreen ? 'o_fullscreen_exit' : 'o_fullscreen'
    },

    isFullscreen () {
      return !!this.$q.fullscreen.isActive
    },

    developmentBadgeLabel () {
      const hosts = {
        localhost: 'Local',
        develop: 'Desenvolvimento',
        release: 'Homologação'
      }

      if (process.env.DEV) {
        return hosts.localhost
      }

      const current = Object.keys(hosts).find(
        host => location.hostname.includes(host)
      )

      return current ? hosts[current] : ''
    },

    hasDevelopmentBadge () {
      return !!this.developmentBadgeLabel
    },

    hasApps () {
      return !!this.apps.length
    }
  },

  methods: {
    asset,

    fullscreen () {
      this.$q.fullscreen.toggle()
    },

    goToRoot () {
      this.$router.push({ name: 'Root' })
    },

    toggleMenuDrawer () {
      this.$emit('toggle-menu')
    },

    signOut () {
      this.$emit('sign-out')
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

  &__user {
    background-color: rgba(white, 0.1);
    border-radius: 500rem;
    transition: background-color $generic-hover-transition;

    &:focus,
    &:hover {
      background-color: rgba(white, 0.2);
    }
  }

  &__user-data {
    max-width: 100px;
  }

  &__user-menu {
    max-width: 150px;
  }

  @media (max-width: $breakpoint-xs) {
    &__user-data {
      display: none;
    }
  }
}
</style>
