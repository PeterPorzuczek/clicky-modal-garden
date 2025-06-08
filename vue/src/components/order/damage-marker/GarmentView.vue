<script setup>
import { ref, computed } from 'vue'
import Badge from '../ui/Badge.vue'
import { getDamageLabel } from '../../../setup/i18n.js'
import WholeProductList from './WholeProductList.vue'
import t from '../../../setup/i18n.js'

const props = defineProps({
  productType: String,
  imageUrl: String,
  disabled: { type: Boolean, default: false },
  selectedForMarking: { type: Boolean, default: false },
  damagePositions: { type: Object, default: () => ({}) },
  defectPositions: { type: Object, default: () => ({}) },
  productDamages: { type: Array, default: () => [] },
  damageLabels: { type: Object, default: () => ({}) },
  defectLabels: { type: Object, default: () => ({}) },
  markerSelectionOrder: { type: Object, default: () => ({}) },
  product: Object,
  getDamageLabel: Function,
  getDefectLabel: Function,
  isWholeProductMarker: Function
})

const emit = defineEmits(['mark-position', 'marker-click', 'remove-damage', 'remove-defect'])

const containerRef = ref(null)

const handleClick = (e) => {
  if (props.disabled || !emit) return
  const rect = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  emit('mark-position', x, y, 'front')
}

const markers = computed(() => [
  ...Object.entries(props.damagePositions).map(([idx, pos]) => ({
    id: `damage-${idx}`,
    isDamage: true,
    pos,
    order: props.markerSelectionOrder[`damage-${idx}`] || 0,
    label: props.damageLabels[idx] || getDamageLabel(props.productType, props.productDamages[idx]),
    idx: parseInt(idx)
  })),
  ...Object.entries(props.defectPositions).map(([id, pos]) => ({
    id,
    isDamage: false,
    pos,
    order: props.markerSelectionOrder[id] || 0,
    label: props.defectLabels[id] || id,
  })),
])

const handleMarkerClick = (e, m) => {
  e.stopPropagation()
  emit('marker-click', m.isDamage ? 'damage' : 'defect', m.isDamage ? m.idx : m.id)
}
</script>

<template>
  <div class="gv-container">
    <div 
      class="gv-image-wrapper" 
      ref="containerRef" 
      @click="handleClick" 
      :style="{ cursor: props.selectedForMarking ? 'crosshair' : 'default' }"
    >
      <img
        v-if="props.imageUrl"
        :src="props.imageUrl"
        :alt="props.productType"
        class="gv-image"
      />
      <div v-else class="gv-placeholder">{{ t('secondStep.noImageAvailable') }}</div>
      
      <div
        v-for="m in markers"
        :key="m.id"
        class="gv-marker"
        :style="{ left: `${m.pos.x * 100}%`, top: `${m.pos.y * 100}%` }"
        @click="(e) => handleMarkerClick(e, m)"
      >
        <div v-if="m.isDamage" class="gv-marker-circle">
          {{ m.order }}
        </div>
        <div v-else class="gv-badge-wrapper">
          <Badge variant="outline" class="gv-badge">
            {{ m.label }}
          </Badge>
        </div>
      </div>
    </div>
    
    <WholeProductList
      v-if="props.product && props.isWholeProductMarker"
      :product="props.product"
      :damage-positions="props.damagePositions"
      :defect-positions="props.defectPositions"
      :is-whole-product-marker="props.isWholeProductMarker"
      @remove-marker="(e, idx) => emit('remove-damage', e, idx)"
      @remove-defect-marker="(e, id) => emit('remove-defect', e, id)"
      :get-damage-label="props.getDamageLabel"
      :get-defect-label="props.getDefectLabel"
      :marker-selection-order="props.markerSelectionOrder"
    />
  </div>
</template>

<style scoped></style>
