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

// Preserve selected damages when damageCount changes
watch(() => props.product.damageCount, (newVal) => {
  const current = props.product.damages || []
  if (current.length !== newVal) {
    const arr = Array.from({ length: newVal }).map((_, i) => current[i] || '')
    updateField('damages', arr)

    const labels = { ...(props.product.damageLabels || {}) }
    for (let i = newVal; i < current.length; i++) {
      delete labels[i]
    }
    updateField('damageLabels', labels)
  }
})

// Set default images when type selected and none exist
watch([() => props.product.type, category, () => props.product.images], ([type, cat, imgs]) => {
  if (type && cat && !imgs) {
    const first = cat.damages.find(d => d.picturesToBeMarked && d.picturesToBeMarked.length)
    if (first) {
      const pics = first.picturesToBeMarked
      updateField('images', {
        front: pics[0] || null,
        back: pics[1] || pics[0] || null,
        left: pics[2] || pics[0] || null,
        right: pics[3] || pics[0] || null
      })
    }
  }
})

watch([() => props.product.damages, () => props.product.damageDetails, () => props.product.otherIssues, () => props.product.defectDetails], () => {
  const hasDamageMarks = (props.product.damages || []).some((_, idx) => props.product.damageDetails?.[`damage-${idx}`]?.position)
  const hasDefectMarks = Object.entries(props.product.otherIssues || {}).some(([id,on]) => on && props.product.defectDetails?.[id]?.position !== undefined)
  if(hasDamageMarks || hasDefectMarks){ markingOpen.value = true }
})

function updateField(field, value) {
  emit('update', props.product.id, field, value)
}

function updateDamageType(idx, val) {
  const arr = [...(props.product.damages || [])]
  while (arr.length <= idx) arr.push('')
  arr[idx] = val
  updateField('damages', arr)

  const damageLabels = { ...(props.product.damageLabels || {}) }
  if (val) {
    const dmgOpt = DAMAGE_OPTIONS.value.find(d => d.id === val)
    if (dmgOpt) damageLabels[idx] = dmgOpt.label
    else delete damageLabels[idx]
  } else {
    delete damageLabels[idx]
  }
  updateField('damageLabels', damageLabels)

  const details = { ...(props.product.damageDetails || {}) }
  details[`damage-${idx}`] = { optionId: '' }
  updateField('damageDetails', details)

  const damageCfg = category.value?.damages.find(d => d.id === val)
  if (damageCfg?.picturesToBeMarked?.length) {
    const pics = damageCfg.picturesToBeMarked
    updateField('images', {
      front: pics[0] || null,
      back: pics[1] || pics[0] || null,
      left: pics[2] || pics[0] || null,
      right: pics[3] || pics[0] || null
    })
  }
  if (damageCfg?.markedOnPicture) {
    selectedDefectId.value = undefined
    selectedDamageIndex.value = idx
    markingOpen.value = true
  }
}

function updateDamageDetail(idx, detail) {
  const details = { ...(props.product.damageDetails || {}) }
  details[`damage-${idx}`] = { ...(details[`damage-${idx}`] || {}), ...detail }
  updateField('damageDetails', details)
}

function toggleDefect(pid, id) {
  const issues = { ...(props.product.otherIssues || {}) }
  issues[id] = !issues[id]
  updateField('otherIssues', issues)

  const labels = { ...(props.product.defectLabels || {}) }
  if (issues[id]) {
    const defectObj = DEFECT_OPTIONS.value.find(d => d.id === id)
    if (defectObj) labels[id] = defectObj.label
  } else {
    delete labels[id]
  }
  updateField('defectLabels', labels)

  if (issues[id]) {
    const defectObj = DEFECT_OPTIONS.value.find(d => d.id === id)
    if (defectObj?.markedOnPicture) {
      selectedDamageIndex.value = undefined
      selectedDefectId.value = id
      markingOpen.value = true
    }
  }
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
            @update:damage="val => updateDamageType(idx-1, val)"
            @update:option="val => updateDamageDetail(idx-1, { optionId: val })"
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
        @toggle="(pid, id) => toggleDefect(pid, id)"
      />
      <div v-if="(props.product.damageCount > 0 || Object.values(props.product.otherIssues || {}).some(Boolean)) && markingOpen" class="pc-marker">
        <GarmentDamageMarker
          :product="props.product"
          :texts="props.texts"
          :damage-index="selectedDamageIndex"
          :defect-id="selectedDefectId"
          :update-damage-detail="(idx, detail) => updateDamageDetail(idx, detail)"
          :update-defect-detail="(id, detail) => {
            const details = { ...(props.product.defectDetails || {}) }
            details[id] = { ...(details[id] || {}), ...detail }
            updateField('defectDetails', details)
          }"
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
