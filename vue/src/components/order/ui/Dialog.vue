<script setup>
import { watchEffect, onBeforeUnmount, provide } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['update:open'])

function close() {
  emit('update:open', false)
}

function onKey(e) {
  if (e.key === 'Escape') close()
}

watchEffect(() => {
  if (props.open) {
    document.addEventListener('keydown', onKey)
  } else {
    document.removeEventListener('keydown', onKey)
  }
})

onBeforeUnmount(() => document.removeEventListener('keydown', onKey))

provide('closeDialog', close)
</script>

<script>
import { inject, h } from 'vue'

export const DialogClose = {
  name: 'DialogClose',
  setup(_, { slots, attrs }) {
    const close = inject('closeDialog')
    return () => h('button', { class: ['dialog-close', attrs.class], 'aria-label': 'Close', onClick: close }, slots.default ? slots.default() : '✕')
  }
}

export const DialogContent = {
  name: 'DialogContent',
  setup(_, { slots, attrs }) {
    return () => h('div', { class: ['dialog-window', attrs.class] }, slots.default && slots.default())
  }
}

export const DialogTitle = {
  name: 'DialogTitle',
  setup(_, { slots, attrs }) {
    return () => h('h2', { class: ['dialog-title', attrs.class] }, slots.default && slots.default())
  }
}

export const DialogDescription = {
  name: 'DialogDescription',
  setup(_, { slots, attrs }) {
    return () => h('p', { class: ['dialog-description', attrs.class] }, slots.default && slots.default())
  }
}
</script>

<template>
  <teleport to="body" v-if="props.open">
    <div class="dialog-overlay" @click.self="close">
      <slot />
    </div>
  </teleport>
</template>

<style scoped>
/* relies on styles from ui.css */
</style> 