<script setup>
import config from '../../setup/config.js'
import { localize } from '../../setup/i18n.js'
import CustomSelect from './ui/CustomSelect.vue'

const props = defineProps({
  productType: String,
  error: String,
  texts: Object
})
const emit = defineEmits(['update'])
const OPTIONS = config.productCategories.map(cat => ({ value: cat.id, label: localize(cat.name) }))
</script>

<template>
  <div class="pts-container">
    <label class="pts-label">{{ props.texts.selectTypeOfProduct }} <span class="text-red">*</span></label>
    <CustomSelect :model-value="props.productType" @update:model-value="val => emit('update', val)" :placeholder="props.texts.select" :options="OPTIONS" :error="!!props.error" />
    <p v-if="props.error" class="pts-error">{{ props.error }}</p>
  </div>
</template>

<style scoped>
</style>
