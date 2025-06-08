<script setup>
import { computed } from 'vue'
import { getDamageLabel as lookupDamageLabel } from '../../../setup/i18n.js'
import t from '../../../setup/i18n.js'

const props = defineProps({
  product: Object,
  damagePositions: { type: Object, default: () => ({}) },
  defectPositions: { type: Object, default: () => ({}) },
  markerSelectionOrder: { type: Object, default: () => ({}) },
  getDefectLabel: Function,
  getDamageLabel: Function,
  isWholeProductMarker: { type: Function, default: () => false },
  selectedDamageIndex: Number,
  selectedDefectId: String,
  damageMarkable: { type: Object, default: () => ({}) },
  defectMarkable: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['select-damage', 'select-defect', 'remove-damage', 'remove-defect'])

const getDamageLabelFn = props.getDamageLabel || ((idx) => props.product.damageLabels?.[idx] || lookupDamageLabel(props.product.type, props.product.damages[idx]))
const getDefectLabelFn = props.getDefectLabel || ((id) => id)

const damageEntries = computed(() =>
  props.product.damages
    .map((d, idx) => ({
      key: `damage-${idx}`,
      type: 'damage',
      id: idx,
      order: props.markerSelectionOrder[`damage-${idx}`],
      label: getDamageLabelFn(idx),
      pos: props.damagePositions[idx],
      markable: props.damageMarkable[idx],
    }))
    .filter((e) => e.markable)
)

const defectEntries = computed(() =>
  Object.entries(props.product.otherIssues || {})
    .filter(([, on]) => on)
    .map(([id]) => ({
      key: `defect-${id}`,
      type: 'defect',
      id,
      order: props.markerSelectionOrder[id],
      label: getDefectLabelFn(id),
      pos: props.defectPositions[id],
      markable: props.defectMarkable[id],
    }))
    .filter((e) => e.markable)
)

const entries = computed(() =>
  [...damageEntries.value, ...defectEntries.value].sort((a, b) => {
    const orderA = a.order ?? Infinity
    const orderB = b.order ?? Infinity
    if (orderA === orderB) return a.key.localeCompare(b.key)
    return orderA - orderB
  })
)

const hasEntries = computed(() => entries.value.length > 0)

const handleItemClick = (e) => {
  if (!e.markable) return
  if (e.type === 'damage') {
    emit('select-damage', e.id)
  } else {
    emit('select-defect', e.id)
  }
}

const handleRemove = (ev, e) => {
  ev.stopPropagation()
  if (e.type === 'damage') {
    emit('remove-damage', ev, e.id)
  } else {
    emit('remove-defect', ev, e.id)
  }
}
</script>

<template>
  <div v-if="hasEntries" class="marker-list">
    <h5 class="marker-list-title">{{ t('secondStep.selectedMarkers') }}</h5>
    <div class="marker-list-items">
      <div
        v-for="e in entries"
        :key="e.key"
        role="button"
        tabindex="0"
        @click="handleItemClick(e)"
        :class="`marker-item ${e.markable ? 'pointer' : 'disabled'} ${e.pos ? 'marked' : 'unmarked'} ${
          (e.type === 'damage' && props.selectedDamageIndex === e.id) ||
          (e.type === 'defect' && props.selectedDefectId === e.id) ? 'selected' : ''
        }`"
      >
        <span class="marker-label">
          <span :class="`marker-num ${e.pos ? 'marked' : 'unmarked'}`">
            {{ e.pos ? e.order : '' }}
          </span>
          <span class="label-text">{{ e.label }}</span>
          <span v-if="e.pos && props.isWholeProductMarker(e.pos)" class="marker-whole">
            {{ t('secondStep.wholeProduct') }}
          </span>
        </span>
        <button
          v-if="e.pos"
          type="button"
          @click="(ev) => handleRemove(ev, e)"
          class="marker-remove"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
