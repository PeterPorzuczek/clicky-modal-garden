<script setup>
import t from '../../../setup/i18n.js'

const emit = defineEmits(['reset-all-markers'])
</script>

<template>
  <div class="marker-buttons">
    <button type="button" class="marker-reset" @click="$emit('reset-all-markers')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" class="icon">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 103-8.36L1 10"/>
      </svg>
      {{ t('secondStep.clearAllMarkers') }}
    </button>
  </div>
</template>

<style scoped></style>
