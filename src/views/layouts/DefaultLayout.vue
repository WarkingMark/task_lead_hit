<template>
  <Header/>
  <div class="section">
    <router-view v-slot="{ Component, route }">
      <transition name="opacity">
        <component :is="Component" :key="route.name" />
      </transition>
    </router-view>
  </div>
  <Footer/>
</template>

<script>
import {defineComponent} from "vue";

// Компоненты
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default defineComponent({
  name: "Default Layout",
  components: {Header, Footer},
  setup () {
    return {

    }
  }
})
</script>

<style scoped>

</style>
