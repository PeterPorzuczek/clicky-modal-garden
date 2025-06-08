<script setup>
import { computed } from 'vue'
import t from '../../setup/i18n.js'
import { calculateSummary } from './priceSummaryUtils.js'

const props = defineProps({
  products: { type: Array, default: () => [] },
  discount: { type: Number, default: 0 }
})

const { productTotals, subTotal, discountAmount, total } = computed(() => 
  calculateSummary(props.products, props.discount)
)
</script>

<template>
  <div class="price-summary">
    <div v-for="p in productTotals" :key="p.id" class="price-product">
      <div class="price-product-heading">{{ t('firstStep.product') }} #{{ p.id }}: {{ p.type || '-' }}</div>
      <div class="price-product-items">
        <div v-for="(item, idx) in p.items" :key="idx" class="price-item">
          <span>{{ item.label }}</span>
          <span>{{ item.price }} kr</span>
        </div>
      </div>
      <div class="price-subtotal">
        <span>{{ t('firstStep.subtotal') }}</span>
        <span>{{ p.subtotal }} kr</span>
      </div>
    </div>
    <div class="price-summary-total">
      <span>{{ t('firstStep.subtotal') }}</span>
      <span>{{ subTotal }} kr</span>
    </div>
    <div v-if="discount > 0" class="price-discount">
      <span>{{ t('firstStep.discount') }} ({{ discount }}%)</span>
      <span>-{{ discountAmount }} kr</span>
    </div>
    <div class="price-grand-total">
      <span>{{ t('firstStep.total') }}</span>
      <span>{{ total }} kr</span>
    </div>
  </div>
</template>

<style scoped>
</style>
