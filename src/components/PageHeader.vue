<template>
  <q-toolbar class="justify-between q-mb-md q-px-none">
    <div>
      <q-toolbar-title v-if="title" class="text-h5">
        <q-icon v-if="previousRoute" class="cursor-pointer vertical-baseline" name="o_arrow_back" size="18px" @click="$router.push(previousRoute)" />
        {{ title }}
      </q-toolbar-title>

      <q-breadcrumbs class="text-caption text-grey-6">
        <q-breadcrumbs-el v-for="item in transformedBreadcrumbs" :key="item.label" :label="item.label" :to="item.route" />
      </q-breadcrumbs>
    </div>

    <slot />
  </q-toolbar>
</template>

<script>
import { castArray, get } from 'lodash'

export default {
  props: {
    breadcrumbs: {
      default: '',
      type: [Array, String]
    },

    root: {
      default: () => ({ label: 'Início', routeName: 'Root' }),
      type: [Object, String]
    },

    title: {
      default: '',
      type: String
    }
  },

  computed: {
    previousRoute () {
      if (!this.$history) {
        return false
      }

      const size = this.transformedBreadcrumbs.length
      const last = this.transformedBreadcrumbs[size - 2]

      const history = this.$history[0]

      return history && get(last, 'route.name')
        ? (history.name === last.route.name ? history : null)
        : null
    },

    transformedBreadcrumbs () {
      return [
        this.root,
        ...castArray(this.breadcrumbs || this.title)
      ].map(item => {
        if (typeof item === 'string') {
          return { label: item }
        }

        if (!item.route && item.routeName) {
          item.route = { name: item.routeName }
        }

        if (this.$history && get(item, 'route.name')) {
          const previous = this.$history.find(history => history.name === item.route.name)
          item.route.query = previous ? previous.query : null
        }

        return item
      })
    }
  }
}
</script>
