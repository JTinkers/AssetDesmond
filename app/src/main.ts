import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import desmond from './services/desmond'

const app = createApp(App).use(store).use(router).use(desmond).mount('#app')

console.log(app)