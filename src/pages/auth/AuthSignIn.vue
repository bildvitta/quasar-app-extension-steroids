<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <q-spinner size="3em" />
      <p class="q-mt-lg">Contactando servidor de autenticação...</p>
    </div>

    <q-banner v-else class="bg-red-1 text-red" inline-actions rounded>
      {{ errorMessage }}

      <template v-slot:action>
        <q-btn color="red" flat label="Tentar novamente" @click="openAuth" />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      errorMessage: '',
      isLoading: true
    }
  },

  computed: {
    ...mapGetters('auth', {
      isUserAuth: 'isAuth'
    }),

    url () {
      return this.$route.query.url || '/'
    }
  },

  created () {
    this.openAuth()
  },

  methods: {
    ...mapActions('auth', {
      signIn: 'signIn'
    }),

    async openAuth () {
      this.errorMessage = ''
      this.isLoading = true

      try {
        if (this.isUserAuth) {
          return this.$router.replace({ name: 'Root' })
        }

        const url = await this.signIn({ url: this.url })
        location.href = url
      } catch (error) {
        this.errorMessage = 'Erro ao obter endereço de autenticação.'
        this.isLoading = false
      }
    }
  }
}
</script>
