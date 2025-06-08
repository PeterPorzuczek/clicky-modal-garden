<script setup>
import { getDamageLabel as lookupDamageLabel } from '../../../setup/i18n.js'

const props = defineProps({
  product: Object,
  damagePositions: { type: Object, default: () => ({}) },
  defectPositions: { type: Object, default: () => ({}) },
  markerSelectionOrder: { type: Object, default: () => ({}) },
  removeDamage: Function,
  removeDefect: Function,
  getDefectLabel: Function,
  getDamageLabel: Function,
  isWholeProductMarker: { type: Function, default: () => false },
  onSelectDamage: Function,
  onSelectDefect: Function,
  selectedDamageIndex: Number,
  selectedDefectId: String,
  damageMarkable: { type: Object, default: () => ({}) },
  defectMarkable: { type: Object, default: () => ({}) },
  texts: Object
})

import { computed } from 'vue'
const getDamageLabelFn = props.getDamageLabel || ((idx) => props.product.damageLabels?.[idx] || lookupDamageLabel(props.product.type, props.product.damages[idx]))
const getDefectLabelFn = props.getDefectLabel || ((id) => id)

const entries = computed(() => {
  const damageEntries = props.product.damages.map((d, idx) => ({
    key: `damage-${idx}`,
    type: 'damage',
    id: idx,
    order: props.markerSelectionOrder[`damage-${idx}`],
    label: getDamageLabelFn(idx),
    pos: props.damagePositions[idx],
    markable: props.damageMarkable[idx]
  })).filter(e => e.markable)
  const defectEntries = Object.entries(props.product.otherIssues || {}).filter(([,on]) => on).map(([id]) => ({
    key: `defect-${id}`,
    type: 'defect',
    id,
    order: props.markerSelectionOrder[id],
    label: getDefectLabelFn(id),
    pos: props.defectPositions[id],
    markable: props.defectMarkable[id]
  })).filter(e => e.markable)
  const arr = [...damageEntries, ...defectEntries]
  arr.sort((a,b)=>{
    const orderA = a.order ?? Infinity
    const orderB = b.order ?? Infinity
    if(orderA===orderB) return a.key.localeCompare(b.key)
    return orderA - orderB
  })
  return arr.map(e => ({
    ...e,
    marked: !!e.pos,
    selected: (e.type==='damage' && props.selectedDamageIndex===e.id) || (e.type==='defect' && props.selectedDefectId===e.id)
  }))
})

function handleClick(e){
  if(!e.markable) return
  if(e.type==='damage') props.onSelectDamage && props.onSelectDamage(e.id)
  else props.onSelectDefect && props.onSelectDefect(e.id)
}
function handleRemove(e){
  if(e.type==='damage') props.removeDamage && props.removeDamage(e.id)
  else props.removeDefect && props.removeDefect(e.id)
}
</script>

<template>
  <div v-if="entries.length" class="marker-list">
    <h5 class="marker-list-title">{{ props.texts.selectedMarkers }}</h5>
    <div class="marker-list-items">
      <div v-for="e in entries" :key="e.key" class="marker-item" :class="[e.markable ? 'pointer' : 'disabled', e.marked ? 'marked' : 'unmarked', e.selected ? 'selected' : '']" role="button" tabindex="0" @click="handleClick(e)">
        <span class="marker-label">
          <span class="marker-num" :class="e.marked ? 'marked' : 'unmarked'">{{ e.marked ? e.order : '' }}</span>
          <span class="label-text">{{ e.label }}</span>
          <span v-if="e.marked && props.isWholeProductMarker(e.pos)" class="marker-whole">{{ props.texts.wholeProduct }}</span>
        </span>
        <button v-if="e.marked" type="button" class="marker-remove" @click.stop="handleRemove(e)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>
