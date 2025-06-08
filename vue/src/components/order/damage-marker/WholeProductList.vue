<script setup>
import { computed } from 'vue'
import { getDamageLabel as lookupDamageLabel } from '../../../setup/i18n.js'

const props = defineProps({
  product: Object,
  damagePositions: { type: Object, default: () => ({}) },
  defectPositions: { type: Object, default: () => ({}) },
  isWholeProductMarker: { type: Function, default: () => false },
  removeMarker: Function,
  removeDefectMarker: Function,
  getDamageLabel: Function,
  getDefectLabel: Function,
  markerSelectionOrder: { type: Object, default: () => ({}) },
  texts: Object
})

const getDamageLabelFn = props.getDamageLabel || ((idx) => lookupDamageLabel(props.product.type, props.product.damages[idx]))
const getDefectLabelFn = props.getDefectLabel || ((id) => id)
const wholeDamages = computed(() => Object.entries(props.damagePositions).filter(([_,pos]) => props.isWholeProductMarker(pos)).map(([idx]) => parseInt(idx)))
const wholeDefects = computed(() => Object.entries(props.defectPositions).filter(([_,pos]) => props.isWholeProductMarker(pos)).map(([id]) => id))
</script>

<template>
  <div v-if="wholeDamages.length || wholeDefects.length" class="whole-list">
    <h5 class="whole-title">{{ props.texts.wholeProductMarkers }}</h5>
    <div class="whole-items">
      <div v-for="index in wholeDamages" :key="`whole-damage-${index}`" class="whole-item">
        <span class="marker-label">
          <span class="marker-num marked">{{ props.markerSelectionOrder[`damage-${index}`] || 0 }}</span>
          <span class="label-text">{{ getDamageLabelFn(index) }}</span>
          <span class="marker-whole">{{ props.texts.wholeProduct }}</span>
        </span>
        <button type="button" class="marker-remove" @click="props.removeMarker && props.removeMarker($event, index)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div v-for="id in wholeDefects" :key="`whole-defect-${id}`" class="whole-item">
        <span class="marker-label">
          <span class="marker-num marked">{{ props.markerSelectionOrder[id] || 0 }}</span>
          <span class="label-text">{{ getDefectLabelFn(id) }}</span>
          <span class="marker-whole">{{ props.texts.wholeProduct }}</span>
        </span>
        <button type="button" class="marker-remove" @click="props.removeDefectMarker && props.removeDefectMarker($event, id)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
