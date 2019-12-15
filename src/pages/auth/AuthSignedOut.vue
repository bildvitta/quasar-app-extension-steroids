<template>
  <q-banner class="bg-green-1 text-green" inline-actions rounded>
    Você foi desconectado com sucesso!

    <template v-slot:action>
      <q-btn color="green" flat label="Entrar" @click="signIn" />
    </template>
  </q-banner>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', {
      isUserAuth: 'isAuth'
    })
  },

  created () {
    if (this.isUserAuth) {
      this.$router.replace({ name: 'AuthSignOut' })
    }
  },

  methods: {
    signIn () {
      this.$router.replace({ name: 'Auth' })
    }
  }
}
</script>
