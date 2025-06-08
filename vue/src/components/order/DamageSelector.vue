<script setup>
import { computed } from 'vue'
import CustomSelect from './ui/CustomSelect.vue'
import t from '../../setup/i18n.js'

const props = defineProps({
  index: { type: Number, default: 0 },
  damage: { type: String, default: '' },
  option: { type: String, default: '' },
  damageOptions: { type: Array, default: () => [] },
  optionOptions: { type: Array, default: () => [] },
  damageError: { type: String, default: null },
  optionError: { type: String, default: null }
})

const emit = defineEmits(['update:damage', 'update:option'])

const handleDamageChange = (value) => {
  emit('update:damage', value)
}

const handleOptionChange = (value) => {
  emit('update:option', value)
}

const damageSelectOptions = computed(() => props.damageOptions.map(opt => ({
  value: opt.id,
  label: opt.label
})))

const optionSelectOptions = computed(() => props.optionOptions.map(opt => ({
  value: opt.id,
  label: opt.label
})))
</script>

<template>
  <div class="damage-selector">
    <div class="damage-selector-inner">
      <div>
        <div class="damage-label-row">
          <label class="damage-label">
            {{ t('secondStep.damage') }} {{ props.index + 1 }} <span class="text-red">*</span>
          </label>
        </div>
        <CustomSelect
          :model-value="props.damage"
          @update:model-value="handleDamageChange"
          :placeholder="t('secondStep.typeOfDamage')"
          :options="damageSelectOptions"
          :error="!!props.damageError"
        />
        <p v-if="props.damageError" class="damage-error">{{ props.damageError }}</p>
      </div>
      <div v-if="props.optionOptions.length > 0">
        <label class="damage-label">
          {{ t('firstStep.select') }} <span class="text-red">*</span>
        </label>
        <CustomSelect
          :model-value="props.option"
          @update:model-value="handleOptionChange"
          :placeholder="t('firstStep.select')"
          :options="optionSelectOptions"
          :error="!!props.optionError"
        />
        <p v-if="props.optionError" class="damage-error">{{ props.optionError }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
