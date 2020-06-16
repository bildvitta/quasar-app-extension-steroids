<template>
  <div class="column-board no-wrap column q-pa-sm bg-grey-4 rounded-borders" v-bind="$attrs" v-on="$listeners">
    <header class="q-mb-lg">
      <!-- header -->
      <slot name="header" />
    </header>
    <div ref="columnBoardContent" class="column-board__content overflow-auto qs-scroll qs-scroll--y">
      <slot />
    </div>
    <footer class="q-mb-mt">
      <!-- footer -->
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">
  .column-board {
    max-height: inherit;
    background-color: $primary;

    &__content {
       * {
        width: 250px;
        white-space: initial;
        background: white;
      }
    }
  }
</style>