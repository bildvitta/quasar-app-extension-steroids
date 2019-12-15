<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <q-spinner size="3em" />
      <p class="q-mt-lg">Validando...</p>
    </div>

    <q-banner v-else class="bg-red-1 text-red" inline-actions rounded>
      {{ errorMessage }}

      <template v-slot:action>
        <q-btn color="red" flat label="Tentar novamente" @click="validate" />
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

    session () {
      const { query } = this.$route

      return {
        code: query.code,
        sessionState: query.session_state,
        state: query.state
      }
    }
  },

  created () {
    this.validate()
  },

  methods: {
    ...mapActions('auth', {
      authenticate: 'authenticate'
    }),

    async validate () {
      this.errorMessage = ''
      this.isLoading = true

      try {
        if (this.isUserAuth) {
          return this.$router.replace({ name: 'Root' })
        }

        const url = await this.authenticate(this.session)
        this.$router.replace(url || '/')
      } catch (error) {
        this.errorMessage = 'Erro ao validar sessão.'
        this.isLoading = false
      }
    }
  }
}
</script>