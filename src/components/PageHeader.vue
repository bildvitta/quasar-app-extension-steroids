<template>
  <q-toolbar class="justify-between q-mb-lg q-px-none">
    <div class="ellipsis">
      <q-toolbar-title v-if="title" class="text-h5 text-bold">
        <!-- {{ previousRoute }} -->
        <!-- <q-icon v-if="!noBreadcrumbs && previousRoute" class="cursor-pointer vertical-baseline" name="o_arrow_back" size="18px" @click="$router.push(previousRoute)" /> -->
        <q-icon v-if="!noBreadcrumbs" class="cursor-pointer vertical-baseline" name="o_arrow_back" size="18px" @click="routerHandler" />
        {{ title }}
      </q-toolbar-title>

      <q-breadcrumbs v-if="!noBreadcrumbs" class="text-grey-6 text-caption">
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
      type: [Array, Boolean, String]
    },

    noBreadcrumbs: {
      default: false,
      type: Boolean
    },

    root: {
      default: '',
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
      // console.log("previousRoute -> history", this.$history)

      const history = this.$history[0]
      // console.log("previousRoute -> history", history)

      return history && get(last, 'route.name')
        ? (history.name === last.route.name ? history : null)
        : null
    },

    transformedBreadcrumbs () {
      const list = [...castArray(this.breadcrumbs || this.title)]

      this.root && list.unshift(this.root)
      
      return list.map(item => {
        if (item && typeof item === 'string') {
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
  },

  methods: {
    routerHandler () {
      const size = this.transformedBreadcrumbs.length

      return this.$router.push(this.transformedBreadcrumbs[size - 2].route)
    }
  },

  meta () {
    return {
      title: this.title
    }
  }
}
</script>
