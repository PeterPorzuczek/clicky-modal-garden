<script setup>
import { computed, ref, watch } from 'vue'
import config from '../../setup/config.js'
import { localize } from '../../setup/i18n.js'
import ProductTypeSelector from './ProductTypeSelector.vue'
import DamageCountSelector from './DamageCountSelector.vue'
import DamageSelector from './DamageSelector.vue'
import DefectsSection from './DefectsSection.vue'
import EmployeeOwnershipFields from './EmployeeOwnershipFields.vue'
import GarmentDamageMarker from './damage-marker/GarmentDamageMarker.vue'

const props = defineProps({
  product: Object,
  texts: Object
})
const emit = defineEmits(['update'])

const selectedDamageIndex = ref()
const selectedDefectId = ref()
const markingOpen = ref(false)
const damageMarkable = ref({})
const defectMarkable = ref({})
const prevType = ref(props.product.type)

const category = computed(() => config.productCategories.find(c => c.id === props.product.type))

const DAMAGE_OPTIONS = computed(() =>
  category.value ? category.value.damages.map(d => ({
    id: d.id,
    label: localize(d.name),
    options: (d.options || []).map(o => ({ id: o.id, label: localize(o.name) }))
  })) : []
)

const DEFECT_OPTIONS = computed(() =>
  category.value ? category.value.defects.map(d => ({ id: d.id, label: localize(d.name) })) : []
)

watch(() => props.product.type, (newVal) => {
  if(prevType.value && prevType.value !== newVal){
    updateField('damageCount', 0)
    updateField('damages', [])
    updateField('damageDetails', {})
    updateField('damageLabels', {})
    updateField('otherIssues', {})
    updateField('defectDetails', {})
    updateField('defectLabels', {})
    updateField('images', null)
    updateField('damageErrors', {})
    updateField('damageOptionErrors', {})
    selectedDamageIndex.value = undefined
    selectedDefectId.value = undefined
    markingOpen.value = false
  }
  prevType.value = newVal
})

watch([() => props.product.damages, category], ([dmg, cat]) => {
  const dMark = {}
  (dmg || []).forEach((id, idx) => {
    const cfg = DAMAGE_OPTIONS.value.find(o => o.id === id)
    dMark[idx] = !!cfg?.markedOnPicture
  })
  damageMarkable.value = dMark

  const defMark = {}
  DEFECT_OPTIONS.value.forEach(opt => { defMark[opt.id] = !!opt.markedOnPicture })
  defectMarkable.value = defMark
})

watch([() => props.product.damages, () => props.product.damageDetails, () => props.product.otherIssues, () => props.product.defectDetails], () => {
  const hasDamageMarks = (props.product.damages || []).some((_, idx) => props.product.damageDetails?.[`damage-${idx}`]?.position)
  const hasDefectMarks = Object.entries(props.product.otherIssues || {}).some(([id,on]) => on && props.product.defectDetails?.[id]?.position !== undefined)
  if(hasDamageMarks || hasDefectMarks){ markingOpen.value = true }
})

function updateField(field, value) {
  emit('update', props.product.id, field, value)
}
</script>

<template>
  <div class="pc-card">
    <div class="pc-header">
      <h3 class="pc-title">{{ props.texts.product }} #{{ props.product.id }}</h3>
    </div>
    <div class="pc-body">
      <ProductTypeSelector :product-type="props.product.type" :texts="props.texts" @update="val => updateField('type', val)" :error="props.product.typeError" />
      <DamageCountSelector v-if="props.product.type" :count="props.product.damageCount" :label="props.texts.numberOfDamages" @update:count="val => updateField('damageCount', val)" />
      <div v-if="props.product.type && props.product.damageCount > 0" class="pc-damage-list">
        <div v-for="idx in props.product.damageCount" :key="idx" class="pc-damage-item">
          <DamageSelector
            :index="idx - 1"
            :damage="props.product.damages?.[idx-1] || ''"
            :option="props.product.damageDetails?.[`damage-${idx-1}`]?.optionId || ''"
            :damage-options="DAMAGE_OPTIONS"
            :option-options="DAMAGE_OPTIONS.find(d => d.id === props.product.damages?.[idx-1])?.options || []"
            :damage-error="props.product.damageErrors?.[idx-1]"
            :option-error="props.product.damageOptionErrors?.[idx-1]"
            @update:damage="val => {
              const arr = [...(props.product.damages || [])]
              while (arr.length <= idx-1) arr.push('')
              arr[idx-1] = val
              updateField('damages', arr)

              const damageCfg = category.value?.damages.find(d => d.id === val)
              if(damageCfg?.options?.length) {
                const details = { ...(props.product.damageDetails || {}) }
                details[`damage-${idx-1}`] = { optionId: '' }
                updateField('damageDetails', details)
              }
              if(damageCfg?.markedOnPicture){
                selectedDefectId.value = undefined
                selectedDamageIndex.value = idx-1
                markingOpen.value = true
              }
            }"
            @update:option="val => {
              const details = { ...(props.product.damageDetails || {}) }
              details[`damage-${idx-1}`] = { ...(details[`damage-${idx-1}`] || {}), optionId: val }
              updateField('damageDetails', details)
            }"
            :texts="props.texts"
          />
        </div>
      </div>
      <DefectsSection
        v-if="props.product.type"
        :product-id="props.product.id"
        :issues="DEFECT_OPTIONS"
        :selected="props.product.otherIssues || {}"
        :title="props.texts.otherErrorsAndDefects"
        @toggle="(pid, id) => {
          const issues = { ...(props.product.otherIssues || {}) }
          issues[id] = !issues[id]
          updateField('otherIssues', issues)
          const defectObj = DEFECT_OPTIONS.value.find(d => d.id === id)
          if(issues[id] && defectObj?.markedOnPicture){
            selectedDamageIndex.value = undefined
            selectedDefectId.value = id
            markingOpen.value = true
          }
        }"
      />
      <div v-if="(props.product.damageCount > 0 || Object.values(props.product.otherIssues || {}).some(Boolean)) && markingOpen" class="pc-marker">
        <GarmentDamageMarker
          :product="props.product"
          :texts="props.texts"
          :damage-index="selectedDamageIndex"
          :defect-id="selectedDefectId"
          :update-damage-detail="(idx, detail) => { const details = { ...(props.product.damageDetails || {}) }; details[`damage-${idx}`] = { ...(details[`damage-${idx}`] || {}), ...detail }; updateField('damageDetails', details) }"
          :update-defect-detail="(id, detail) => { const details = { ...(props.product.defectDetails || {}) }; details[id] = { ...(details[id] || {}), ...detail }; updateField('defectDetails', details) }"
          :on-select-damage="idx => { if(damageMarkable.value[idx]) { selectedDefectId.value = undefined; selectedDamageIndex.value = idx; markingOpen.value = true } }"
          :on-select-defect="id => { if(defectMarkable.value[id]) { selectedDamageIndex.value = undefined; selectedDefectId.value = id; markingOpen.value = true } }"
          :damage-markable="damageMarkable"
          :defect-markable="defectMarkable"
          :selected-damage-index="selectedDamageIndex"
          :selected-defect-id="selectedDefectId"
        />
      </div>
      <p v-if="props.product.markerError" class="pc-error">{{ props.product.markerError }}</p>
      <EmployeeOwnershipFields :product="props.product" :texts="props.texts" @update:field="updateField" />
    </div>
  </div>
</template>

<style scoped>
</style>
