<template>
  <div class="column-board no-wrap column" v-bind="$attrs" v-on="$listeners">
    <div class="column-board__box q-pa-sm rounded-borders">
      <header class="q-mb-md text-weight-bold text-grey-8">
        <!-- header -->
        <slot name="header" />
      </header>
      <div ref="columnBoardContent" class="column-board__content overflow-auto qs-scroll qs-scroll--y q-gutter-sm">
        <slot />
      </div>
      <footer class="q-mb-mt">
        <!-- footer -->
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">
  .column-board {
    max-height: inherit;

    &__box {
      max-height: 100%;
      display: flex;
      flex-direction: column;
      background-color: lighten($grey-5, 16%);
    }

    &__content {
       * {
        width: 250px;
        white-space: initial;
        background: white;
      }
    }
  }
</style>