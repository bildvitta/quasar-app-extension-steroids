<template>
  <div class="row" :class="btnActionsClass">
    <div class="col-sm-auto" :class="secondaryClass">
      <slot name="secondary" />
    </div>

    <div class="col-sm-auto" :class="primaryClass">
      <slot name="primary" />
    </div>
  </div>
</template>

<script>
import btnActions from '../mixins/btnActions'

export default {
  mixins: [btnActions],

  computed: {
    btnActionsClass () {
      return `q-col-gutter-${this.gutter} justify-${this.align}`
    },

    primaryClass () {
      return this.btnCol || this.isSmallScreen && 'col-12 order-first'
    },

    secondaryClass () {
      return this.btnCol || this.isSmallScreen && 'col-12 order-last'
    }
  }
}
</script>
