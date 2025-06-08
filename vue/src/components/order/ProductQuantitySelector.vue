<script setup>
const props = defineProps({
  quantity: { type: Number, default: 0 },
  texts: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['increase', 'decrease'])

const MAX_QUANTITY = 20

function decrease() {
  if (props.quantity > 0) emit('decrease')
}

function increase() {
  if (props.quantity < MAX_QUANTITY) emit('increase')
}
</script>

<template>
  <div class="pqs-container">
    <div class="pqs-row">
      <label class="font-medium">
        {{ props.texts.selectNumberOfProducts }} <span class="text-red">*</span>
      </label>
    </div>
    <div class="pqs-control">
      <button
        type="button"
        class="pqs-btn"
        @click="decrease"
        :disabled="props.quantity <= 0"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-lg">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span class="pqs-value">{{ props.quantity }}</span>
      <button
        type="button"
        class="pqs-btn"
        @click="increase"
        :disabled="props.quantity >= MAX_QUANTITY"
      >
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
