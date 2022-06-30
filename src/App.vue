<template>
  <router-view v-slot="{ Component, route }">
    <transition-group name="opacity">
      <div class="transition-key" :key="route.name">
        <component :key="route.name" :is="Component"/>
      </div>
    </transition-group>
  </router-view>
</template>
