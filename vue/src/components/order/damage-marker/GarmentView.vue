<script setup>
import { ref, computed } from 'vue'
import Badge from '../ui/Badge.vue'
import WholeProductList from './WholeProductList.vue'
import { getDamageLabel } from '../../../setup/i18n.js'

const props = defineProps({
  productType: String,
  imageUrl: String,
  onMarkPosition: Function,
  disabled: { type: Boolean, default: false },
  selectedForMarking: { type: Boolean, default: false },
  damagePositions: { type: Object, default: () => ({}) },
  defectPositions: { type: Object, default: () => ({}) },
  productDamages: { type: Array, default: () => [] },
  damageLabels: { type: Object, default: () => ({}) },
  defectLabels: { type: Object, default: () => ({}) },
  markerSelectionOrder: { type: Object, default: () => ({}) },
  onMarkerClick: Function,
  product: Object,
  removeDamage: Function,
  removeDefect: Function,
  getDamageLabel: Function,
  getDefectLabel: Function,
  isWholeProductMarker: Function,
  texts: Object
})

const containerRef = ref(null)

function handleClick(e){
  if(props.disabled || !props.onMarkPosition) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left)/rect.width
  const y = (e.clientY - rect.top)/rect.height
  props.onMarkPosition(x,y,'front')
}

const markers = computed(() => {
  return [
    ...Object.entries(props.damagePositions).map(([idx,pos]) => ({
      id:`damage-${idx}`,
      isDamage:true,
      pos,
      order: props.markerSelectionOrder[`damage-${idx}`] || 0,
      label: props.damageLabels[idx] || getDamageLabel(props.productType, props.productDamages[idx])
    })),
    ...Object.entries(props.defectPositions).map(([id,pos]) => ({
      id,
      isDamage:false,
      pos,
      order: props.markerSelectionOrder[id] || 0,
      label: props.defectLabels[id] || id
    }))
  ]
})

function clickMarker(m,e){
  e.stopPropagation()
  props.onMarkerClick && props.onMarkerClick(m.isDamage?'damage':'defect', m.isDamage?parseInt(m.id.split('-')[1]):m.id)
}
</script>

<template>
  <div class="gv-container">
    <div class="gv-image-wrapper" ref="containerRef" @click="handleClick" :style="{cursor: props.selectedForMarking ? 'crosshair' : 'default'}">
      <img v-if="props.imageUrl" :src="props.imageUrl" :alt="props.productType" class="gv-image" />
      <div v-else class="gv-placeholder">{{ props.texts.noImageAvailable }}</div>
      <div v-for="m in markers" :key="m.id" class="gv-marker" :style="{ left: `${m.pos.x*100}%`, top: `${m.pos.y*100}%` }" @click="clickMarker(m, $event)">
        <div v-if="m.isDamage" class="gv-marker-circle">{{ m.order }}</div>
        <div v-else class="gv-badge-wrapper"><Badge variant="outline" class="gv-badge">{{ m.label }}</Badge></div>
      </div>
    </div>
    <WholeProductList v-if="props.product && props.isWholeProductMarker" :product="props.product" :damage-positions="props.damagePositions" :defect-positions="props.defectPositions" :is-whole-product-marker="props.isWholeProductMarker" :remove-marker="props.removeDamage" :remove-defect-marker="props.removeDefect" :get-damage-label="props.getDamageLabel" :get-defect-label="props.getDefectLabel" :marker-selection-order="props.markerSelectionOrder" :texts="props.texts" />
  </div>
</template>

<style scoped></style>
