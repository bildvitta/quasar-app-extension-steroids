<template>
  <q-toolbar class="justify-between q-mb-lg q-px-none">
    <div class="ellipsis">
      <q-toolbar-title v-if="title" class="text-h5 text-bold">
        <q-icon v-if="hasPreviousRoute" data-dialog-router="hide" class="cursor-pointer vertical-baseline" name="o_arrow_back" size="18px" @click="back" />
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
import { history, handleHistory } from '../helpers/historyHandler'

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
    hasPreviousRoute () {
      return history.hasPreviousRoute
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
    back () {
      this.$router.push(handleHistory().getPreviousRoute(this.$route))
    }
  },

  meta () {
    return {
      title: this.title
    }
  }
}
</script>
