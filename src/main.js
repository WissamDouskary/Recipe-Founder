import './assets/main.css'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Toast)
app.mount('#app')