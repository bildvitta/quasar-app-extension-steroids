<template>
  <div v-bind="$attrs" v-on="$listeners" class="box rounded-borders q-px-md q-py-lg" :class="boxClass">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    formMode: {
      type: Boolean
    }
  },

  computed: {
    boxClass () {
      return this.formMode ? 'box__border bg-white' : 'box__shadow'
    }
  }
}
</script>

<style lang="scss">
.box {
  $shadow-color: rgba($primary, 0.15);

  &__border {
    border: 1px solid $secondary;
  }

  &__shadow {
    box-shadow: 0px 9px 27px $shadow-color;
  }
}
</style>
