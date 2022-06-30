import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Styles
import './assets/styles/main.css'
import './assets/styles/animations.css'
import './assets/styles/fonts.css'

createApp(App).use(store).use(router).mount('#app')
