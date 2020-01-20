<template>
  <section>
    <div class="row">
      <div class="col">
        <slot name="search">
          Col
        </slot>
      </div>
    </div>

    <div class="q-mt-sm">
      Lista
    </div>

    <slot name="after" :filter="{}" />
  </section>
</template>

<script>
export default {
}
</script>