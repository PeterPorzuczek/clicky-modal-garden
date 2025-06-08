<script setup>
import ProductQuantitySelector from './ProductQuantitySelector.vue'
import ProductCard from './ProductCard.vue'
import PriceSummary from './PriceSummary.vue'
import { calculateSummary } from './priceSummaryUtils.js'
import { DialogClose } from '../Dialog.vue'
import { computed } from 'vue'
import t from '../../setup/i18n.js'

const props = defineProps({
  products: Array,
  quantity: Number
})

const emit = defineEmits(['update:products', 'update:quantity', 'next-step'])

const MAX_QUANTITY = 20

const addProduct = () => {
  if (props.quantity < MAX_QUANTITY) {
    emit('update:quantity', props.quantity + 1)
    const newProducts = [
      ...props.products,
      {
        id: props.quantity + 1,
        type: '',
        damageCount: 0,
        damages: [],
        damageDetails: {},
        damageLabels: {},
        otherIssues: {},
        defectDetails: {},
        defectLabels: {},
        images: null,
        isEmployeeOwned: false,
        employeeName: '',
        employeeDepartment: '',
        damageErrors: {},
        damageOptionErrors: {},
        markerError: undefined,
      },
    ]
    emit('update:products', newProducts)
  }
}

const removeProduct = () => {
  if (props.quantity > 0) {
    emit('update:quantity', props.quantity - 1)
    const newProducts = props.products.slice(0, -1)
    emit('update:products', newProducts)
  }
}

const updateProduct = (id, field, value) => {
  const updated = props.products.map(p => 
    p.id === id ? { ...p, [field]: value } : p
  )
  emit('update:products', updated)
}

const { total } = computed(() => calculateSummary(props.products))
</script>

<template>
  <div class="product-selection-step">
    <div class="ps-top">
      <div class="ps-header">
        <h2 class="ps-title">
          {{ t('firstStep.title') }}
        </h2>
        <DialogClose class="close-btn" />
      </div>
      <p>{{ t('firstStep.instruction') }}</p>
      <p class="ps-reminder">{{ t('firstStep.reminder') }}</p>
      <ProductQuantitySelector
        :quantity="props.quantity"
        @increase="addProduct"
        @decrease="removeProduct"
      />
    </div>
    <ProductCard 
      v-for="p in props.products" 
      :key="p.id" 
      :product="p" 
      @update="updateProduct" 
    />
    <div v-if="props.products.some(p => p.type) && total > 0" class="summary-card">
      <h3 class="summary-title">{{ t('firstStep.summary') }}</h3>
      <PriceSummary :products="props.products" />
    </div>
    <button
      type="button"
      @click="emit('next-step')"
      class="primary-button"
    >
      {{ t('firstStep.next') }}
    </button>
  </div>
</template>

<style scoped>
</style>
