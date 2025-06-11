<script setup>
import config from '../../setup/config.js'
import t, { localize } from '../../setup/i18n.js'
import CustomSelect from './ui/CustomSelect.vue'

const props = defineProps({
  productType: String,
  error: String
})

const emit = defineEmits(['update'])

// Create options dynamically so they update when language changes
const OPTIONS = config.productCategories.map((cat) => ({
  value: cat.id,
  label: localize(cat.name),
}))
</script>

<template>
  <div class="pts-container">
    <label class="pts-label">
      {{ t('firstStep.selectTypeOfProduct') }} <span class="text-red">*</span>
    </label>
    <CustomSelect
      :model-value="props.productType"
      @update:modelValue="val => emit('update', val)"
      :placeholder="t('firstStep.select')"
      :options="OPTIONS"
      :error="!!props.error"
    />
    <p v-if="props.error" class="pts-error">{{ props.error }}</p>
  </div>
</template>

<style scoped>
</style>
