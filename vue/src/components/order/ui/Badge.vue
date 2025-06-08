<script setup>
const props = defineProps({
  variant: { type: String, default: 'default' }
})
</script>

<template>
  <span :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                 variant === 'secondary' ? 'bg-gray-100 text-gray-800 border border-gray-300'
                 : variant === 'destructive' ? 'bg-red-100 text-red-800'
                 : variant === 'outline' ? 'border border-gray-300 bg-transparent text-gray-600'
                 : 'bg-gray-100 text-gray-800']">
    <slot />
  </span>
</template>

<style scoped>
/* styling from ui.css */
</style>
