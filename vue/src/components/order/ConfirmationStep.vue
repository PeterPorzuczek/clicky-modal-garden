<template>
  <div class="confirm-container">
    <div class="confirm-header">
      <h2 class="confirm-title">{{ texts.thankYouTitle }}</h2>
      <DialogClose class="confirm-close" />
    </div>
    <p class="confirm-text">{{ texts.orderReceivedMsg }}</p>
    <p v-if="discount > 0" class="confirm-discount">{{ texts.discountMsg }}</p>
    <p class="confirm-steps-intro">{{ texts.instructionsTitle }}</p>
    <ol class="confirm-list">
      <li>{{ texts.step1 }}</li>
      <li>{{ texts.step2 }}</li>
      <li>{{ texts.step3 }}</li>
      <li>{{ texts.step4 }}</li>
      <li>{{ texts.step5 }}</li>
      <li>{{ texts.step6 }}</li>
    </ol>
    <div class="confirm-actions">
      <button type="button" class="secondary-button" @click="emit('reset')">
        {{ texts.additionalOrder }}
      </button>
      <button type="button" class="secondary-button" @click="emit('preview', completeOrderData)">
        {{ texts.previewEmail }}
      </button>
      <button type="button" class="primary-button" @click="emit('close')">
        {{ texts.close }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { DialogClose } from '../Dialog.vue'
import { calculateSummary } from './PriceSummary.vue'

const props = defineProps({
  products: { type: Array, default: () => [] },
  orderInfo: { type: Object, default: () => ({}) },
  discount: { type: Number, default: 0 },
  texts: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['reset', 'preview', 'close'])

const completeOrderData = computed(() => {
  const { productTotals, subTotal, total } = calculateSummary(props.products, props.discount)
  return {
    orderInfo: { ...props.orderInfo },
    products: productTotals.map(pt => {
      const orig = props.products.find(p => p.id === pt.id) || {}
      return {
        id: pt.id,
        type: pt.type,
        employee: orig.employeeName || orig.employee || '',
        employeeName: orig.employeeName || orig.employee || '',
        employeeDepartment: orig.employeeDepartment || orig.department || '',
        artikelNumber: orig.artikelNumber || orig.articleNumber || '',
        lagningsId: orig.lagningsId || orig.repairId || '',
        isEmployeeOwned: orig.isEmployeeOwned || false,
        damages: orig.damages || [],
        defects: orig.defects || [],
        damageDetails: orig.damageDetails || {},
        otherIssues: orig.otherIssues || {},
        images: orig.images || null,
        capturedMarkedAreas: orig.capturedMarkedAreas || {},
        items: pt.items || [],
        subtotal: pt.subtotal || 0
      }
    }),
    summary: {
      productTotals,
      subTotal,
      discount: props.discount,
      discountAmount: Math.round(subTotal * (props.discount / 100)),
      total
    },
    metadata: {
      timestamp: new Date().toISOString(),
      language: 'sv'
    }
  }
})
</script>

<style scoped>
</style>
