<template>
  <div>
    <div :class="classes">
      <div v-for="(field, key) in groupedFields.visible" :key="key" :class="getFieldClass(key)">
        <slot :name="`field-${field.name}`" :field="field">
          <qs-field :value="value[field.name]" v-bind="fieldsProps[field.name]" :error="errors[key]" :field="field" @input="emitValue(field.name, $event)" />
        </slot>
      </div>
    </div>

    <div v-for="(field, key) in groupedFields.hidden" :key="key">
      <slot :name="`field-${field.name}`" :field="field">
        <qs-field :value="value[field.name]" v-bind="fieldsProps[field.name]" :field="field" @input="emitValue(field.name, $event)" />
      </slot>
    </div>
  </div>
</template>

<script>
import generator from '../mixins/generator'

export default {
  mixins: [generator],

  props: {
    errors: {
      default: () => ({}),
      type: Object
    },

    order: {
      default: () => [],
      type: Array
    },

    value: {
      default: () => ({}),
      type: Object,
      required: true
    },

    fieldsProps: {
      default: () => ({}),
      type: Object
    }
  },

  computed: {
    groupedFields () {
      const fields = { hidden: {}, visible: {} }

      for (const key in this.fields) {
        const field = this.fields[key]
        fields[field.type === 'hidden' ? 'hidden' : 'visible'][key] = field
      }

      if (this.order.length) {
        const visible = {}

        for (const item of this.order) {
          if (fields.visible[item]) { visible[item] = fields.visible[item] }
        }

        fields.visible = visible
      }

      return fields
    }
  },

  methods: {
    emitValue (key, value) {
      const models = { ...this.value }
      models[key] = value

      this.$emit('input', models)
    }
  }
}
</script>
