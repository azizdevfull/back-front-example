import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css' // You can use 'theme-sugar.css' instead for a different style
const app = createApp(App)

app.use(router)
app.use(VueToast, {
    position: 'top-right',
    duration: 5000,
})
app.mount('#app')
