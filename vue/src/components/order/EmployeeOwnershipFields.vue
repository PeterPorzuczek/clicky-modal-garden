<script setup>
const props = defineProps({
  product: Object,
  texts: Object
})
const emit = defineEmits(['update:field'])
function update(field, value) {
  emit('update:field', field, value)
}
</script>

<template>
  <div class="employee-section">
    <div class="employee-checkbox-row">
      <input :id="`product-${props.product.id}-isEmployeeOwned`" type="checkbox" v-model="props.product.isEmployeeOwned" @change="update('isEmployeeOwned', $event.target.checked)" />
      <label :for="`product-${props.product.id}-isEmployeeOwned`" class="employee-label-checkbox">{{ props.texts.belongsToEmployee }}</label>
    </div>
    <div v-if="props.product.isEmployeeOwned" class="employee-fields">
      <div>
        <label :for="`product-${props.product.id}-employeeName`" class="employee-label">{{ props.texts.employeeName }}</label>
        <input :id="`product-${props.product.id}-employeeName`" class="employee-input" v-model="props.product.employeeName" @input="update('employeeName', props.product.employeeName)" />
      </div>
      <div>
        <label :for="`product-${props.product.id}-employeeDepartment`" class="employee-label">{{ props.texts.department }}</label>
        <input :id="`product-${props.product.id}-employeeDepartment`" class="employee-input" v-model="props.product.employeeDepartment" @input="update('employeeDepartment', props.product.employeeDepartment)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
