<script setup>
import { computed, ref, watch } from 'vue'
import config from '../../setup/config.js'
import t, { localize } from '../../setup/i18n.js'
import ProductTypeSelector from './ProductTypeSelector.vue'
import DamageCountSelector from './DamageCountSelector.vue'
import DamageSelector from './DamageSelector.vue'
import DefectsSection from './DefectsSection.vue'
import EmployeeOwnershipFields from './EmployeeOwnershipFields.vue'
import GarmentDamageMarker from './damage-marker/GarmentDamageMarker.vue'

const props = defineProps({
  product: Object
})

const emit = defineEmits(['update'])

const selectedDamageIndex = ref()
const selectedDefectId = ref()
const markingOpen = ref(false)
const damageMarkable = ref({})
const defectMarkable = ref({})
const prevType = ref(props.product.type)

const category = computed(() => config.productCategories.find(c => c.id === props.product.type))

// Correctly maps damage options, including nested ones and the markedOnPicture flag.
const DAMAGE_OPTIONS = computed(() =>
  category.value
    ? category.value.damages.map((d) => ({
        id: d.id,
        label: localize(d.name),
        markedOnPicture: d.markedOnPicture,
        options: (d.options || []).map((opt) => ({
          id: opt.id,
          label: localize(opt.name),
        })),
      }))
    : []
)

// Correctly maps defect options, including the markedOnPicture flag.
const DEFECT_OPTIONS = computed(() =>
  category.value
    ? category.value.defects.map((d) => ({
        id: d.id,
        label: localize(d.name),
        markedOnPicture: d.markedOnPicture,
      }))
    : []
)

const updateField = (field, value) => {
  emit('update', props.product.id, field, value)
}

// Reset related data when the product category changes
watch(() => props.product.type, (newType, oldType) => {
  if (prevType.value && prevType.value !== newType) {
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
    updateField('markerError', undefined)
    selectedDamageIndex.value = undefined
    selectedDefectId.value = undefined
    markingOpen.value = false
  }
  prevType.value = newType
}, { immediate: true })

// This watch correctly preserves user selections when damageCount changes.
watch(() => props.product.damageCount, (newCount) => {
  const currentDamages = props.product.damages || []
  if (currentDamages.length !== newCount) {
    const newDamages = Array.from({ length: newCount }).map(
      (_, i) => currentDamages[i] || ''
    )
    updateField('damages', newDamages)

    const newDamageLabels = { ...(props.product.damageLabels || {}) }
    for (let i = newCount; i < currentDamages.length; i++) {
      delete newDamageLabels[i]
    }
    updateField('damageLabels', newDamageLabels)
  }
}, { immediate: true })

// Ensure default images are only set if none are saved for this product.
watch([() => props.product.type, category, () => props.product.images], ([type, cat, images]) => {
  if (type && cat && !images) {
    const firstDamageWithImages = cat.damages.find(
      (d) => d.picturesToBeMarked && d.picturesToBeMarked.length > 0
    )
    if (firstDamageWithImages) {
      const pics = firstDamageWithImages.picturesToBeMarked
      updateField('images', {
        front: pics[0] || null,
        back: pics[1] || pics[0] || null,
        left: pics[2] || pics[0] || null,
        right: pics[3] || pics[0] || null,
      })
    }
  }
}, { immediate: true })

// When returning to this step, reopen the marker editor if there are
// existing markings stored in the product details so they remain editable.
watch([
  () => props.product.damages,
  () => props.product.damageDetails,
  () => props.product.otherIssues,
  () => props.product.defectDetails,
], ([damages, damageDetails, otherIssues, defectDetails]) => {
  const hasDamageMarks = damages?.some(
    (_, idx) => damageDetails?.[`damage-${idx}`]?.position
  )
  const hasDefectMarks = Object.entries(otherIssues || {}).some(
    ([id, active]) =>
      active && defectDetails?.[id]?.position !== undefined
  )
  if (hasDamageMarks || hasDefectMarks) {
    markingOpen.value = true
  }
}, { immediate: true })

watch([() => props.product.damages, category], ([damages, cat]) => {
  const dMark = {}
  damages.forEach((id, idx) => {
    const cfg = DAMAGE_OPTIONS.value.find((o) => o.id === id)
    dMark[idx] = !!cfg?.markedOnPicture
  })
  damageMarkable.value = dMark

  const defMark = {}
  DEFECT_OPTIONS.value.forEach((opt) => {
    defMark[opt.id] = !!opt.markedOnPicture
  })
  defectMarkable.value = defMark
}, { immediate: true })

function updateDamageType(idx, val) {
  const newDamages = [...(props.product.damages || [])]
  while (newDamages.length <= idx) {
    newDamages.push('')
  }
  newDamages[idx] = val
  updateField('damages', newDamages)

  const newDamageLabels = { ...(props.product.damageLabels || {}) }
  if (val) {
    const dmgOpt = DAMAGE_OPTIONS.value.find((d) => d.id === val)
    if (dmgOpt) newDamageLabels[idx] = dmgOpt.label
    else delete newDamageLabels[idx]
  } else {
    delete newDamageLabels[idx]
  }
  updateField('damageLabels', newDamageLabels)

  const newDetails = { ...(props.product.damageDetails || {}) }
  newDetails[`damage-${idx}`] = { optionId: '' }
  updateField('damageDetails', newDetails)

  const damageCfg = category.value?.damages.find((d) => d.id === val)
  if (damageCfg?.picturesToBeMarked?.length) {
    const pics = damageCfg.picturesToBeMarked
    updateField('images', {
      front: pics[0] || null,
      back: pics[1] || pics[0] || null,
      left: pics[2] || pics[0] || null,
      right: pics[3] || pics[0] || null,
    })
  }
  if (damageCfg?.markedOnPicture) {
    selectedDefectId.value = undefined
    selectedDamageIndex.value = idx
    markingOpen.value = true
  }
}

function updateDamageDetail(idx, detail) {
  const newDetails = { ...(props.product.damageDetails || {}) };
  newDetails[`damage-${idx}`] = { ...(newDetails[`damage-${idx}`] || {}), ...detail };
  updateField('damageDetails', newDetails);
}

function toggleDefect(prodId, id) {
  const newIssues = { ...(props.product.otherIssues || {}) }
  newIssues[id] = !newIssues[id]
  updateField('otherIssues', newIssues)

  const newLabels = { ...(props.product.defectLabels || {}) }
  if (newIssues[id]) {
    const defectObj = DEFECT_OPTIONS.value.find((d) => d.id === id)
    if (defectObj) newLabels[id] = defectObj.label
  } else {
    delete newLabels[id]
  }
  updateField('defectLabels', newLabels)

  if (newIssues[id]) {
    const defectObj = DEFECT_OPTIONS.value.find((d) => d.id === id)
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
      <h3 class="pc-title">{{ t('firstStep.product') }} #{{ props.product.id }}</h3>
    </div>
    <div class="pc-body">
      <ProductTypeSelector 
        :product-type="props.product.type" 
        @update="val => updateField('type', val)" 
        :error="props.product.typeError" 
      />
      <DamageCountSelector 
        v-if="props.product.type" 
        :count="props.product.damageCount" 
        @update:count="val => updateField('damageCount', val)" 
      />
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
          />
        </div>
      </div>
      <DefectsSection
        v-if="props.product.type"
        :product-id="props.product.id"
        :issues="DEFECT_OPTIONS"
        :selected="props.product.otherIssues || {}"
        @toggle="(pid, id) => toggleDefect(pid, id)"
      />
      <div 
        v-if="(props.product.damageCount > 0 || Object.values(props.product.otherIssues || {}).some(Boolean)) && markingOpen"
        class="pc-marker"
      >
        <GarmentDamageMarker
          :product="props.product"
          :damage-index="selectedDamageIndex"
          :defect-id="selectedDefectId"
          :update-damage-detail="updateDamageDetail"
          :update-defect-detail="(id, detail) => {
            const details = { ...(props.product.defectDetails || {}) };
            details[id] = { ...(details[id] || {}), ...detail };
            updateField('defectDetails', details);
          }"
          :on-select-damage="(idx) => {
            if (damageMarkable.value[idx]) {
              selectedDefectId.value = undefined;
              selectedDamageIndex.value = idx;
              markingOpen.value = true;
            }
          }"
          :on-select-defect="(id) => {
            if (defectMarkable.value[id]) {
              selectedDamageIndex.value = undefined;
              selectedDefectId.value = id;
              markingOpen.value = true;
            }
          }"
          :damage-markable="damageMarkable"
          :defect-markable="defectMarkable"
        />
      </div>
      <p v-if="props.product.markerError" class="pc-error">{{ props.product.markerError }}</p>
      <EmployeeOwnershipFields
        :product="props.product"
        @update="(field, val) => updateField(field, val)"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
