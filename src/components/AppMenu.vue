<template>
  <q-drawer bordered :value="value">
    <q-scroll-area class="fit">
      <q-list class="text-grey-8" padding>
        <div v-for="(header, index) in items" :key="index">
          <q-separator v-if="index" inset spaced />
          <q-item-label class="q-pb-xs" header>{{ header.label }}</q-item-label>

          <q-item v-for="(item, itemIndex) in header.children" :key="itemIndex" v-ripple clickable :to="item.to">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section avatar>
              <q-item-label caption>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
export default {
  props: {
    items: {
      default: () => [],
      type: Array
    },

    value: {
      default: true,
      type: Boolean
    }
  }
}
</script>
