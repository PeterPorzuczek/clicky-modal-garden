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
    emailLabel: localize(t.emailLabel, lang),
    enterEmail: localize(t.enterEmail, lang)
  }
})
</script>

<template>
  <div class="app">
    <Banner :texts="bannerTexts" />
  </div>
</template>

<style>
@import './styles/index.css';
</style>
