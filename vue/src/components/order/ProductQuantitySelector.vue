<script setup>
const props = defineProps({
  quantity: { type: Number, default: 0 }
})
const emit = defineEmits(['increase', 'decrease'])
</script>

<template>
  <div class="pqs-container">
    <div class="pqs-controls">
      <button type="button" class="pqs-btn" @click="emit('decrease')" :disabled="quantity <= 0">-</button>
      <span class="pqs-value">{{ quantity }}</span>
      <button type="button" class="pqs-btn" @click="emit('increase')">+</button>
    </div>
  </div>
</template>

<style scoped>
/* CSS from order.css for quantity selector if any */
</style>
