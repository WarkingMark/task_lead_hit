<template>
  <header class="header">
    <div class="container container--row">
      <router-link
          class="logo link"
          :to="{name: 'Analysis'}"
      >
        Lead hit
      </router-link>
    </div>
  </header>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Header",
  setup () {
    return {

    }
  }
})
</script>

<style src="./header.css" scoped >

</style>
