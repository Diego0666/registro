// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

const app = createApp(App)

app.use(router)

app.use(VueReCaptcha, {
  siteKey: '6Lc3H70rAAAAAH9QrJbrFS_1Up1VpkUcq9uqdQWl', // pega la que te dio Google
  loaderOptions: {
    autoHideBadge: true, // oculta el logo flotante de Google si quieres
  },
})
app.use(Quasar, {
  plugins: {} // Aquí puedes agregar plugins de Quasar si los necesitas
})
app.mount('#app')
