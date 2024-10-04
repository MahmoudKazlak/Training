import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import '@vueform/multiselect/themes/default.css'


const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', 
  },
})
app.use(PrimeVue, {
  theme: {
      preset: Aura
  }
})
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
