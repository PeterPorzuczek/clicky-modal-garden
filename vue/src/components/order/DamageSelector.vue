<script setup>
import CustomSelect from './ui/CustomSelect.vue'
const props = defineProps({
  index: Number,
  damage: { type: String, default: '' },
  option: { type: String, default: '' },
  damageOptions: { type: Array, default: () => [] },
  optionOptions: { type: Array, default: () => [] },
  damageError: String,
  optionError: String,
  texts: Object
})
const emit = defineEmits(['update:damage', 'update:option'])
</script>

<template>
  <div class="damage-selector">
    <div class="damage-selector-inner">
      <div>
        <div class="damage-label-row">
          <label class="damage-label">{{ props.texts.damage }} {{ props.index + 1 }} <span class="text-red">*</span></label>
        </div>
        <CustomSelect
          :model-value="props.damage"
          @update:model-value="val => emit('update:damage', val)"
          :placeholder="props.texts.typeOfDamage"
          :options="props.damageOptions"
          :error="!!props.damageError"
        />
        <p v-if="props.damageError" class="damage-error">{{ props.damageError }}</p>
      </div>
      <div v-if="props.optionOptions.length > 0">
        <label class="damage-label">{{ props.texts.select }} <span class="text-red">*</span></label>
        <CustomSelect
          :model-value="props.option"
          @update:model-value="val => emit('update:option', val)"
          :placeholder="props.texts.select"
          :options="props.optionOptions"
          :error="!!props.optionError"
        />
        <p v-if="props.optionError" class="damage-error">{{ props.optionError }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
