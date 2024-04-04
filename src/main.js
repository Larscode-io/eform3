// import './assets/main.css' // from the Vue 3 starter template
// we are using Tailwind so the Tailwind "base" layer is already included
// to avoid conflicts, we will not include the "base" layer from the Vue 3 starter template

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
