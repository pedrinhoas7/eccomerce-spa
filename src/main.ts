import { createApp } from 'vue'
import router from './router/index.ts';
import App from './App.vue'
import './assets/styles/tailwind.css';
import { vMaska } from "maska/vue"

const app = createApp(App)
app.directive("maska", vMaska)
app.use(router)
app.mount('#app')
