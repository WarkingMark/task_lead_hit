<template>
  <div class="container">
    <h1 class="section-title">Маршрута который вы указали не существует. </h1>
    <p>Возможно вы искали:
      <router-link
          class="h2-title link"
          :to="{name: 'Analysis'}"
      >
        Аналитику
      </router-link>
      или
      <router-link
          class="h2-title link"
          :to="{name: 'Autharization'}"
      >
        Авторизацию
      </router-link>
    </p>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Not Found",
  setup () {
    return {

    }
  }
})
</script>

<style scoped>

</style>
