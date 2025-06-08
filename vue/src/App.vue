<script setup>
import { ref, computed } from 'vue'
import config from './setup/config.js'
import { localize, setLanguage, getCurrentLanguage } from './setup/i18n.js'
import Banner from './components/Banner.vue'

const currentLanguage = ref(getCurrentLanguage())

function changeLang(lang) {
  setLanguage(lang)
  currentLanguage.value = lang
}

const bannerTexts = computed(() => {
  const t = config.texts.trigger
  const lang = currentLanguage.value
  return {
    priamry: localize(t.priamry, lang),
    secondary: localize(t.secondary, lang),
    clickToStart: localize(t.clickToStart, lang),
    language: localize(t.language, lang),
    clearData: localize(t.clearData, lang),
    prefillCustomer: localize(t.prefillCustomer, lang),
    emailLabel: localize(t.emailLabel, lang),
    enterEmail: localize(t.enterEmail, lang)
  }
})
</script>

<template>
  <div class="app">
    <Banner
      :texts="bannerTexts"
      :languages="[{ code: 'se', label: 'SE' }, { code: 'en', label: 'EN' }, { code: 'no', label: 'NO' }]"
      :current-language="currentLanguage"
      @change-language="changeLang"
    />
  </div>
</template>

<style>
@import './styles/index.css';
</style>
