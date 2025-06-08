<script setup>
import { onMounted, onBeforeUnmount, provide } from 'vue'

const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))

provide('closeDialog', () => emit('close'))
</script>

<script>
import { inject, h } from 'vue'
export const DialogClose = {
  name: 'DialogClose',
  setup(_, { slots }) {
    const close = inject('closeDialog')
    return () => h('button', { class: 'dialog-close', 'aria-label': 'Close', onClick: close }, slots.default ? slots.default() : '✕')
  }
}
</script>

<template>
  <div class="dialog-overlay" @click.self="emit('close')">
    <div class="dialog-window">
      <slot></slot>
    </div>
  </div>
</template>
