<script setup>
import t from '../../setup/i18n.js'

const props = defineProps({
  product: Object,
  onFieldBlur: Function,
  touchedFields: { type: Object, default: () => ({}) },
  validationErrors: { type: Array, default: () => [] }
})

const emit = defineEmits(['update'])

const fieldPrefix = `product-${props.product.id}-`

const fieldError = (name) => {
  if (!props.touchedFields[name]) return null
  const err = props.validationErrors.find((e) => e.field === name)
  return err ? err.message : null
}

const update = (field, value) => {
  emit('update', field, value)
}
</script>

<template>
  <div class="employee-section">
    <div class="employee-checkbox-row">
      <input 
        :id="`${fieldPrefix}isEmployeeOwned`" 
        type="checkbox" 
        :checked="props.product.isEmployeeOwned" 
        @change="update('isEmployeeOwned', $event.target.checked)" 
      />
      <label :for="`${fieldPrefix}isEmployeeOwned`" class="employee-label-checkbox">
        {{ t('secondStep.belongsToEmployee') }}
      </label>
    </div>
    <div v-if="props.product.isEmployeeOwned" class="employee-fields">
      <div>
        <label :for="`${fieldPrefix}employeeName`" class="employee-label">
          {{ t('secondStep.employeeName') }}
        </label>
        <input 
          :id="`${fieldPrefix}employeeName`" 
          :value="props.product.employeeName"
          @input="update('employeeName', $event.target.value)"
          @blur="() => props.onFieldBlur && props.onFieldBlur(fieldPrefix + 'employeeName')"
          :required="props.product.isEmployeeOwned"
          :class="`employee-input ${fieldError(fieldPrefix + 'employeeName') ? 'error' : ''}`"
        />
        <p v-if="fieldError(fieldPrefix + 'employeeName')" class="employee-error">
          {{ fieldError(fieldPrefix + 'employeeName') }}
        </p>
      </div>
      <div>
        <label :for="`${fieldPrefix}employeeDepartment`" class="employee-label">
          {{ t('secondStep.department') }}
        </label>
        <input 
          :id="`${fieldPrefix}employeeDepartment`" 
          :value="props.product.employeeDepartment"
          @input="update('employeeDepartment', $event.target.value)"
          @blur="() => props.onFieldBlur && props.onFieldBlur(fieldPrefix + 'employeeDepartment')"
          :required="props.product.isEmployeeOwned"
          :class="`employee-input ${fieldError(fieldPrefix + 'employeeDepartment') ? 'error' : ''}`"
        />
        <p v-if="fieldError(fieldPrefix + 'employeeDepartment')" class="employee-error">
          {{ fieldError(fieldPrefix + 'employeeDepartment') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
