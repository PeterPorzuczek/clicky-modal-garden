<script setup>
import ProductQuantitySelector from './ProductQuantitySelector.vue'
import ProductCard from './ProductCard.vue'
import PriceSummary from './PriceSummary.vue'
import { DialogClose } from '../Dialog.vue'
import { calculateSummary } from './PriceSummary.vue'
import { computed } from 'vue'

const props = defineProps({
  products: Array,
  quantity: Number,
  texts: Object
})
const emit = defineEmits(['update:products', 'update:quantity', 'next'])

function addProduct() {
  if (props.quantity < 20) {
    emit('update:quantity', props.quantity + 1)
    const newProd = {
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
      markerError: undefined
    }
    emit('update:products', [...props.products, newProd])
  }
}

function removeProduct() {
  if (props.quantity > 0) {
    emit('update:quantity', props.quantity - 1)
    emit('update:products', props.products.slice(0, -1))
  }
}

function updateProduct(id, field, value) {
  const updated = props.products.map(p => p.id === id ? { ...p, [field]: value } : p)
  emit('update:products', updated)
}

const total = computed(() => calculateSummary(props.products).total)
</script>

<template>
  <div class="product-selection-step">
    <div class="ps-top">
      <div class="ps-header">
        <h2 class="ps-title">{{ props.texts.title }}</h2>
        <DialogClose class="close-btn" />
      </div>
      <p>{{ props.texts.instruction }}</p>
      <p class="ps-reminder">{{ props.texts.reminder }}</p>
      <ProductQuantitySelector :quantity="props.quantity" @increase="addProduct" @decrease="removeProduct" />
    </div>
    <ProductCard v-for="p in props.products" :key="p.id" :product="p" :texts="props.texts" @update="updateProduct" />
    <div v-if="props.products.some(p => p.type) && total > 0" class="summary-card">
      <h3 class="summary-title">{{ props.texts.summary }}</h3>
      <PriceSummary :products="props.products" :texts="props.texts" />
    </div>
    <button type="button" @click="emit('next')" class="primary-button">{{ props.texts.next }}</button>
  </div>
</template>

<style scoped>
</style>
