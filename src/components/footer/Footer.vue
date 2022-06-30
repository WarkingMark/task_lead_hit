<template>
  <footer class="footer container ">
    <router-link
        class="logo link"
        :to="{name: 'Analysis'}"
    >
      Lead hit
    </router-link>
    <span class="copyright">@created at 2022</span>
  </footer>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Footer",
  setup () {
    return {

    }
  }
})
</script>

<style src="./footer.css" scoped>

</style>
