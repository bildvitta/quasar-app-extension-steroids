<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <q-spinner size="3em" />
      <p class="q-mt-lg">Desconectando...</p>
    </div>

    <q-banner v-else class="bg-red-1 text-red" inline-actions rounded>
      {{ errorMessage }}

      <template v-slot:action>
        <q-btn color="red" flat label="Tentar novamente" @click="closeAuth" />
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
    })
  },

  created () {
    this.closeAuth()
  },

  methods: {
    ...mapActions('auth', {
      signOut: 'signOut'
    }),

    async closeAuth () {
      this.errorMessage = ''
      this.isLoading = true

      try {
        if (!this.isUserAuth) {
          return this.$router.replace({ name: 'AuthSignedOut' })
        }

        const url = await this.signOut()
        location.href = url
      } catch (error) {
        this.errorMessage = 'Erro ao desconectar.'
        this.isLoading = false
      }
    }
  }
}
</script>
