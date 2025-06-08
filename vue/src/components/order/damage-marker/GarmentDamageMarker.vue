<script setup>
import { ref, watch, computed } from 'vue'
import InstructionMessage from './InstructionMessage.vue'
import MarkerList from './MarkerList.vue'
import MarkerButtons from './MarkerButton.vue'
import GarmentView from './GarmentView.vue'
import { getDefectLabel, getDamageLabel } from '../../../setup/i18n.js'
import t from '../../../setup/i18n.js'

const props = defineProps({
  product: Object,
  damageIndex: Number,
  defectId: String,
  updateDamageDetail: Function,
  updateDefectDetail: Function,
  onSelectDamage: Function,
  onSelectDefect: Function,
  damageMarkable: { type: Object, default: () => ({}) },
  defectMarkable: { type: Object, default: () => ({}) }
})

// const emit = defineEmits([])

const damagePositions = ref({})
const defectPositions = ref({})
const orderMap = ref({})
const nextOrder = ref(1)

const labelForDefect = (id) =>
  props.product.defectLabels?.[id] || getDefectLabel(props.product.type, id)
const labelForDamage = (idx) =>
  props.product.damageLabels?.[idx] || getDamageLabel(props.product.type, props.product.damages[idx])

watch(() => props.product, (p) => {
  const dPos = {}
  const dfPos = {}
  const orders = {}
  let maxOrder = 0
  p.damages.forEach((_, idx) => {
    const detail = p.damageDetails?.[`damage-${idx}`]
    if(detail && detail.position){
      dPos[idx]=detail.position
      if(detail.orderIndex){
        orders[`damage-${idx}`]=detail.orderIndex
        maxOrder=Math.max(maxOrder, detail.orderIndex)
      }
    }
  })
  if(p.defectDetails){
    Object.entries(p.otherIssues).forEach(([id,on])=>{
      if(on && p.defectDetails[id]?.position){
        dfPos[id]=p.defectDetails[id].position
        const oi = p.defectDetails[id].orderIndex || 0
        if(oi){ orders[id]=oi; maxOrder=Math.max(maxOrder, oi) }
      }
    })
  }
  damagePositions.value=dPos
  defectPositions.value=dfPos
  orderMap.value=orders
  nextOrder.value=maxOrder+1
},{ immediate:true })

function handleMark(x,y,view){
  if(props.damageIndex!==undefined && props.damageMarkable[props.damageIndex]){
    const pos={x,y,view}
    damagePositions.value = { ...damagePositions.value, [props.damageIndex]: pos }
    const orderKey = `damage-${props.damageIndex}`
    if(!orderMap.value[orderKey]){ orderMap.value = { ...orderMap.value, [orderKey]: nextOrder.value }; nextOrder.value++ }
    props.updateDamageDetail && props.updateDamageDetail(props.damageIndex, { position: pos, orderIndex: orderMap.value[orderKey] })
    return
  }
  if(props.defectId && props.defectMarkable[props.defectId]){
    const pos={x,y,view}
    defectPositions.value = { ...defectPositions.value, [props.defectId]: pos }
    if(!orderMap.value[props.defectId]){ orderMap.value = { ...orderMap.value, [props.defectId]: nextOrder.value }; nextOrder.value++ }
    props.updateDefectDetail && props.updateDefectDetail(props.defectId, { position: pos, orderIndex: orderMap.value[props.defectId] })
  }
}

function markWholeProduct(){
  handleMark(0.5,0.5,'whole')
}

function resetAll(){
  damagePositions.value={}
  defectPositions.value={}
  orderMap.value={}
  nextOrder.value=1
  props.product.damages.forEach((_,idx)=>{ props.updateDamageDetail && props.updateDamageDetail(idx, { position: undefined, orderIndex: undefined }) })
  Object.entries(props.product.otherIssues||{}).forEach(([id,on])=>{ if(on) props.updateDefectDetail && props.updateDefectDetail(id, { position: undefined, orderIndex: undefined }) })
}

function isWholeMarker(pos){ return pos && pos.view==='whole' }
const imageUrl = computed(() => props.product.images ? props.product.images.front : null )
const isMarked = computed(() => props.damageIndex !== undefined ? !!damagePositions.value[props.damageIndex] : props.defectId ? !!defectPositions.value[props.defectId] : false )
const singleMode = computed(() => props.damageIndex !== undefined || !!props.defectId)
const totalMarks = computed(() => Object.keys(damagePositions.value).length + Object.keys(defectPositions.value).length )

function handleMarkerClick(type,id){
  if(type==='damage' && props.onSelectDamage && props.damageMarkable[id]) props.onSelectDamage(id)
  if(type==='defect' && props.onSelectDefect && props.defectMarkable[id]) props.onSelectDefect(id)
}
</script>

<template>
  <div class="gdm-container">
    <h4 class="gdm-title">{{ t('secondStep.markDamageBelow') }}</h4>
    <InstructionMessage :product-type="props.product.type" :is-marked="isMarked" :is-single-mark-mode="singleMode" />
    <div class="gdm-row">
      <MarkerButtons @reset-all-markers="resetAll" />
    </div>
    <div class="gdm-white-section">
      <MarkerList
        :product="props.product"
        :damage-positions="damagePositions"
        :defect-positions="defectPositions"
        :is-whole-product-marker="isWholeMarker"
        :damage-markable="props.damageMarkable"
        :defect-markable="props.defectMarkable"
        :get-damage-label="labelForDamage"
        :get-defect-label="labelForDefect"
        :marker-selection-order="orderMap"
        @select-damage="props.onSelectDamage"
        @select-defect="props.onSelectDefect"
        :selected-damage-index="props.damageIndex"
        :selected-defect-id="props.defectId"
        @remove-damage="(idx) => { delete damagePositions.value[idx]; delete orderMap.value[`damage-${idx}`]; props.updateDamageDetail && props.updateDamageDetail(idx, { position: undefined, orderIndex: undefined }) }"
        @remove-defect="(id) => { delete defectPositions.value[id]; delete orderMap.value[id]; props.updateDefectDetail && props.updateDefectDetail(id, { position: undefined, orderIndex: undefined }) }"
      />
      <GarmentView
        :product-type="props.product.type"
        :image-url="imageUrl"
        @mark-position="handleMark"
        :disabled="false"
        :max-marks="props.product.damages.length"
        :current-marks="totalMarks"
        :selected-for-marking="props.damageIndex !== undefined || props.defectId !== undefined"
        :damage-positions="damagePositions"
        :defect-positions="defectPositions"
        :product-damages="props.product.damages"
        :damage-labels="props.product.damageLabels || {}"
        :defect-labels="Object.fromEntries(Object.entries(props.product.otherIssues || {}).filter(([id,on])=>on).map(([id]) => [id, props.product.defectLabels?.[id] || getDefectLabel(props.product.type, id)]))"
        @marker-click="handleMarkerClick"
        :marker-selection-order="orderMap"
        :product="props.product"
        @remove-damage="(e,idx)=>{ e && e.stopPropagation && e.stopPropagation(); delete damagePositions.value[idx]; delete orderMap.value[`damage-${idx}`]; props.updateDamageDetail && props.updateDamageDetail(idx, { position: undefined, orderIndex: undefined }) }"
        @remove-defect="(e,id)=>{ e && e.stopPropagation && e.stopPropagation(); delete defectPositions.value[id]; delete orderMap.value[id]; props.updateDefectDetail && props.updateDefectDetail(id, { position: undefined, orderIndex: undefined }) }"
        :get-damage-label="labelForDamage"
        :get-defect-label="labelForDefect"
        :is-whole-product-marker="isWholeMarker"
      />
    </div>
  </div>
</template>

<style scoped></style>
