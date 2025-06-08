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
      <button
        type="button"
        class="dcs-btn"
        @click="decrement"
        :disabled="props.count <= 0"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-lg">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span class="dcs-value">{{ props.count }}</span>
      <button type="button" class="dcs-btn" @click="increment">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-lg">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
