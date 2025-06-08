<script setup>
const props = defineProps({
  count: { type: Number, default: 0 },
  label: String
})
const emit = defineEmits(['update:count'])
function decrement() {
  emit('update:count', Math.max(0, props.count - 1))
}
function increment() {
  emit('update:count', props.count + 1)
}
</script>

<template>
  <div class="dcs-container">
    <label class="oi-label">{{ props.label }}</label>
    <div class="dcs-control">
      <button type="button" class="dcs-btn" @click="decrement" :disabled="props.count <= 0">-</button>
      <span class="dcs-value">{{ props.count }}</span>
      <button type="button" class="dcs-btn" @click="increment">+</button>
    </div>
  </div>
</template>

<style scoped>
</style>
