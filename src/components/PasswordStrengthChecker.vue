<template>
  <div class="password-strenght-checker">
    <div :class="contentClass">
      <div class="password-strenght-checker__percent rounded-borders" :class="[option.width, option.color]"/>
    </div>
    <div class="q-mt-xs text-subtitle2" :class="option.text">{{ option.label }}</div>
  </div>
</template>

<script>
import password from '../mixins/password'

export default {
  mixins: [password],

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  created () {
    if (this.veryWeak >= this.weak) {
      throw new Error ('Prop "weak" must be greater than prop "veryWeak".')
    }
  },

  computed: {
    formattedValue () {
      return this.value.length
    },

    isSucess () {
      return !!this.value.match(this.pattern)
    },

    isWeak () {
      return this.formattedValue && (this.formattedValue >= this.weak)
    },

    isVeryWeak () {
      return this.formattedValue && (this.formattedValue <= this.veryWeak || this.formattedValue < this.weak)
    },

    option () {
      return this.formattedValue && [
        {
          label: 'Forte',
          value: this.isSucess,
          width: 'password-strenght-checker__percent--lg',
          color: 'bg-positive',
          text: 'text-positive'
        },
        {
          label: 'Fraca',
          value: this.isWeak,
          width: 'password-strenght-checker__percent--md',
          color: 'bg-warning',
          text: 'text-warning'
        },
        {
          label: 'Muito Fraca',
          value: this.isVeryWeak,
          width: 'password-strenght-checker__percent--sm',
          color: 'bg-negative',
          text: 'text-negative'
        }
      ].find(item => item.value)
    },

    contentClass () {
      return this.value && 'bg-blue-grey-1'
    }
  }
}
</script>

<style lang="scss">
.password-strenght-checker {
  &__percent {
    transition: width 300ms, color 300ms;
    width: 0;
    height: 3px;

    &--sm {
      width: 25%;
    }

    &--md {
      width: 50%
    }

    &--lg {
      width: 100%
    }
  }
}
</style>
