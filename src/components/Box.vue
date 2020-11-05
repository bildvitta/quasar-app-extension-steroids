<template>
  <div v-bind="$attrs" v-on="$listeners" class="box rounded-borders">
    <slot />
  </div>
</template>

<style lang="scss">
.box {
  $shadow-color: rgba($primary, 0.15);

  box-shadow: 0px 9px 27px $shadow-color;
}
</style>
