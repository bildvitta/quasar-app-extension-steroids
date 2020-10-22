<template>
  <q-btn class="company-menu" icon="apps" unelevated>
    <q-menu max-width="400px" anchor="bottom middle" self="top middle">
      <div class="row q-col-gutter-md q-pa-md">
        <a v-for="(company, index) in companies" class="col-sm-4 col-6 flex text-undecoration justify-center" :key="index" :href="company.href">
          <div class="">
            <q-avatar class="q-m-x-auto" :size="avatarSize">
              <img :src="company.image" :alt="company.label" class="rounded-borders">
            </q-avatar>
          </div>
          <div class="text-center q-mt-xs text-black full-width">{{ company.label }}</div>
        </a>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: {
    companies: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    isMobile () {
      return this.$q.screen.xs
    },

    avatarSize () {
      return this.isMobile ? '50px' : '70px'
    }
  }
}
</script>
