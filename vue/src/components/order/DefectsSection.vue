<script setup>
import t from '../../setup/i18n.js'

const props = defineProps({
  productId: [String, Number],
  issues: { type: Array, default: () => [] },
  selected: { type: Object, default: () => ({}) },
  error: { type: String, default: null }
})

const emit = defineEmits(['toggle'])

const handleToggle = (issueId) => {
  emit('toggle', props.productId, issueId)
}
</script>

<template>
  <div>
    <div class="defects-header">
      <h4 class="defects-title">{{ t('secondStep.otherErrorsAndDefects') }}</h4>
    </div>
    <div :class="props.error ? 'defects-wrapper error' : 'defects-wrapper'">
      <div class="defects-list">
        <div v-for="issue in props.issues" :key="issue.id" class="defect-item">
          <input 
            :id="`issue-${props.productId}-${issue.id}`" 
            type="checkbox" 
            :checked="!!props.selected[issue.id]" 
            @change="handleToggle(issue.id)"
          />
          <label :for="`issue-${props.productId}-${issue.id}`" class="defect-label">
            {{ issue.label }}
          </label>
        </div>
      </div>
    </div>
    <p v-if="props.error" class="defect-error">{{ props.error }}</p>
  </div>
</template>

<style scoped>
</style>
