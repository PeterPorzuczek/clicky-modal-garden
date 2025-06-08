<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select an option' },
  error: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const highlightedIndex = ref(-1)
const selectRef = ref(null)
const listRef = ref(null)

const selectedOption = ref(null)

watch([() => props.modelValue, () => props.options], ([newValue, newOptions]) => {
  selectedOption.value = newOptions.find(opt => opt.value === newValue)
}, { immediate: true, deep: true })

function handleClickOutside(event) {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false
    highlightedIndex.value = -1
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

watch(highlightedIndex, (newIndex) => {
  if (isOpen.value && newIndex >= 0 && listRef.value) {
    const highlightedElement = listRef.value.children[newIndex];
    if(highlightedElement) {
      highlightedElement.scrollIntoView({ block: 'nearest' });
    }
  }
});

function onKeyDown(event) {
  if (props.disabled) return;

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (isOpen.value && highlightedIndex.value >= 0) {
        handleOptionClick(props.options[highlightedIndex.value].value);
      } else {
        isOpen.value = true;
      }
      break;
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
      } else {
        highlightedIndex.value = (highlightedIndex.value + 1) % props.options.length;
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (!isOpen.value) {
        isOpen.value = true;
      } else {
        highlightedIndex.value = (highlightedIndex.value - 1 + props.options.length) % props.options.length;
      }
      break;
    case 'Escape':
      isOpen.value = false;
      highlightedIndex.value = -1;
      break;
  }
}

function handleOptionClick(val) {
  emit('update:modelValue', val)
  isOpen.value = false
  highlightedIndex.value = -1
}
</script>

<template>
  <div class="custom-select" ref="selectRef">
    <button
      type="button"
      class="custom-select-trigger"
      :class="{ error: props.error, disabled: props.disabled }"
      @click="!props.disabled && (isOpen = !isOpen)"
      @keydown="onKeyDown"
      :disabled="props.disabled"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <span class="custom-select-value">
        {{ selectedOption ? selectedOption.label : props.placeholder }}
      </span>
      <svg viewBox="0 0 15 15" width="15" height="15" class="custom-select-icon" :class="{ open: isOpen }">
        <path d="m4.93179 5.43179c.20264-.20264.53284-.20264.73548 0L8 7.76521l2.3328-2.33342c.2026-.20264.5328-.20264.7354 0 .2027.20265.2027.53285 0 .7355L8.36833 8.8682c-.20265.2026-.53285.2026-.73549 0L4.93179 6.1673c-.20264-.2026-.20264-.5328 0-.7355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
      </svg>
    </button>
    <div v-if="isOpen" class="custom-select-content">
      <div class="custom-select-viewport" ref="listRef" role="listbox">
        <div
          v-for="(option, index) in props.options"
          :key="option.value"
          class="custom-select-item"
          :class="{
            highlighted: highlightedIndex === index,
            selected: option.value === props.modelValue
          }"
          @click="handleOptionClick(option.value)"
          @mouseenter="highlightedIndex = index"
          role="option"
          :aria-selected="option.value === props.modelValue"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* uses existing CSS from ui.css */
</style>
