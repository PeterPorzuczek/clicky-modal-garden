<script setup>
const props = defineProps({
  productType: String,
  isMarked: Boolean,
  isSingleMarkMode: Boolean,
  texts: Object
})
</script>

<template>
  <div class="instruction-msg">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="instruction-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <p class="instruction-text">
      {{ props.isSingleMarkMode ? (props.isMarked ? props.texts.changeMarkingInfo : props.texts.clickToMarkDamage) : props.texts.markAllDamagesInfo }}
    </p>
  </div>
</template>

<style scoped></style>
