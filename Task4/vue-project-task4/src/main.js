import './assets/main.css'

import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'

import { createI18n } from 'vue-i18n'
import en from './locale/en.json'
import ar from './locale/ar.json'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import '@vueform/multiselect/themes/default.css'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: en,
    ar: ar
  }
})
export { i18n }

// let currentLocale = ref()
// currentLocale.value = i18n.global.locale
// export { currentLocale }
// main.js
let changeLanguage = (key) => {
  if (key === 'English' || key === 'الإنجليزية') {
    i18n.global.locale = 'en'
  } else if (key === 'Arabic' || key === 'العربية') {
    i18n.global.locale = 'ar'
  }
  console.log(i18n.global.locale)
}
export { changeLanguage }

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  rtl: i18n.global.locale.value === 'ar'
})
app.use(i18n)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
