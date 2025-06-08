<script setup>
import { computed } from 'vue'
import t from '../../../setup/i18n.js'

const props = defineProps({
  productType: String,
  isMarked: Boolean,
  isSingleMarkMode: Boolean
})

const message = computed(() => {
  if (props.isSingleMarkMode) {
    if (props.isMarked) {
      return t('secondStep.changeMarkingInfo')
    } else {
      return t('secondStep.clickToMarkDamage')
    }
  } else {
    return t('secondStep.markAllDamagesInfo')
  }
})
</script>

<template>
  <div class="instruction-msg">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="instruction-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <p class="instruction-text">
      {{ message }}
    </p>
  </div>
</template>

<style scoped></style>
