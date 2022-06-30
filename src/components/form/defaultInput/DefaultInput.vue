<template>
  <div
      class="input-box"
  >
    <label
        v-if="label"
        :for="name"
        class="input-box-label"
    >
      {{label}}
    </label>
    <input
        class="input"
        :class="options?.$error ? 'not-invalid' : ''"
        :type="type"
        :id="name"
        :name="name"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        @input="(event) => $emit('update:modelValue', event.target.value)"
        :value="modelValue"
    >
    <template  v-if="options.$dirty && options.$silentErrors.length !== 0">
      <span class="error-message" v-if="options.$dirty && options.$silentErrors.length !== 0">
        <slot name="message"></slot>
      </span>
    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default  defineComponent({
  name : 'Default Input',
  props: {
    modelValue: {
      type : String
    },
    name : {
      type : String,
    },
    value : {
      type: String,
    },
    placeholder : {
      type: String,
      default: 'please set placeholder'
    },
    type : {
      type: String,
      default : 'text'
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    label : {
      type : String
    },
    options : {
      type: Object
    },
  },
})
</script>

<style src="../inputs.css" scoped>

</style>
