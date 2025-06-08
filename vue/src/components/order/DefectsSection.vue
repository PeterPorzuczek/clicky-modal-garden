<script setup>
const props = defineProps({
  productId: [String, Number],
  issues: { type: Array, default: () => [] },
  selected: { type: Object, default: () => ({}) },
  title: String,
  error: String
})
const emit = defineEmits(['toggle'])
function toggle(id) {
  emit('toggle', props.productId, id)
}
</script>

<template>
  <div>
    <div class="defects-header">
      <h4 class="defects-title">{{ props.title }}</h4>
    </div>
    <div :class="props.error ? 'defects-wrapper error' : 'defects-wrapper'">
      <div class="defects-list">
        <div v-for="issue in props.issues" :key="issue.id" class="defect-item">
          <input :id="`issue-${props.productId}-${issue.id}`" type="checkbox" :checked="props.selected[issue.id]" @change="toggle(issue.id)">
          <label :for="`issue-${props.productId}-${issue.id}`" class="defect-label">{{ issue.label }}</label>
        </div>
      </div>
    </div>
    <p v-if="props.error" class="defect-error">{{ props.error }}</p>
  </div>
</template>

<style scoped>
</style>
