<script setup>
import { RouterView } from 'vue-router'
import { i18n } from './main'
import { watch } from 'vue'
watch(
  () => i18n.global.locale,
  (newLocale) => {
    console.log('Locale changed to:', newLocale) // Log the new locale
    document.documentElement.setAttribute('lang', newLocale)
  }
)
</script>


<template>
  <RouterView />
</template>

<style >
html[lang='ar'] .rowRev {
  flex-direction: row-reverse !important;
}
html[lang='en'] .rowRev {
  flex-direction: row !important;
}
html[lang='ar'] .textRev {
  text-align: right !important;
  display: flex;
  justify-content: flex-end !important;
}
.v-list-item__content {
  text-align: right;
}

html[lang='en'] .textRev {
  text-align: left !important;
  display: flex;
  justify-content: flex-start !important;
}
.iconRev {
  margin-left: auto;
}
html[lang='ar'] .test {
  justify-content: flex-start !important;
}
html[lang='ar'] .v-text-field input {
  direction: rtl;
}
html[lang='ar'] .v-label {
  direction: rtl;
}
html[lang='ar'] .v-field--center-affix .v-label.v-field-label {
  right: 0 !important;
  direction: rtl !important;
}
html[lang='ar'] th {
  text-align: right !important;
}
html[lang='ar'] td {
  text-align: right !important;
}
html[lang='en'] th {
  text-align: left !important;
}
html[lang='en'] td {
  text-align: left !important;
}
</style>

