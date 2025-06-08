<script>
import { computed } from 'vue'
import config from '../../setup/config.js'
import { localize } from '../../setup/i18n.js'

export function calculateSummary(products = [], discount = 0) {
  const productTotals = products.map(p => {
    const category = config.productCategories.find(c => c.id === p.type)
    let subtotal = 0
    let items = []

    if (p.items && Array.isArray(p.items)) {
      items = p.items.map(item => ({
        ...item,
        category: item.category || 'damages'
      }))
      subtotal = items.reduce((sum, it) => sum + (it.price || 0), 0)
    } else if (category) {
      p.damages?.forEach((damageId, idx) => {
        const damage = category.damages.find(d => d.id === damageId)
        if (damage) {
          const optId = p.damageDetails?.[`damage-${idx}`]?.optionId
          const option = optId ? damage.options.find(o => o.id === optId) : damage
          if (option) {
            const price = getPrice(option.pricing, products.length)
            subtotal += price

            let label
            if (optId && option !== damage) {
              label = `${localize(damage.name)} - ${localize(option.name)}`
            } else {
              label = localize(damage.name)
            }

            items.push({ label, price, category: 'damages' })
          }
        }
      })
      Object.entries(p.otherIssues || {}).forEach(([id, active]) => {
        if (active) {
          const defect = category.defects.find(d => d.id === id)
          if (defect) {
            const price = getPrice(defect.pricing, products.length)
            subtotal += price
            items.push({ label: localize(defect.name), price, category: 'defects' })
          }
        }
      })
    }

    return { id: p.id, type: localize(category?.name) || p.type, subtotal: p.subtotal || subtotal, items }
  })
  const subTotal = productTotals.reduce((s, p) => s + p.subtotal, 0)
  const discountAmount = Math.round(subTotal * (discount / 100))
  const total = subTotal - discountAmount
  return { productTotals, subTotal, discountAmount, total }
}

function getPrice(pricing = {}, count) {
  if (count >= 6) return pricing['10'] || 0
  if (count >= 4) return pricing['5'] || 0
  if (count === 3) return pricing['3'] || 0
  if (count === 2) return pricing['2'] || 0
  return pricing['1'] || 0
}

export default {
  name: 'PriceSummary',
  props: {
    products: { type: Array, default: () => [] },
    discount: { type: Number, default: 0 },
    texts: { type: Object, default: () => ({}) }
  },
  setup(props) {
    const summary = computed(() => calculateSummary(props.products, props.discount))
    return { summary }
  }
}
</script>

<template>
  <div class="price-summary">
    <div v-for="p in summary.productTotals" :key="p.id" class="price-product">
      <div class="price-product-heading">{{ texts.product }} #{{ p.id }}: {{ p.type || '-' }}</div>
      <div class="price-product-items">
        <div v-for="(item, idx) in p.items" :key="idx" class="price-item">
          <span>{{ item.label }}</span>
          <span>{{ item.price }} kr</span>
        </div>
      </div>
      <div class="price-subtotal">
        <span>{{ texts.subtotal }}</span>
        <span>{{ p.subtotal }} kr</span>
      </div>
    </div>
    <div class="price-summary-total">
      <span>{{ texts.subtotal }}</span>
      <span>{{ summary.subTotal }} kr</span>
    </div>
    <div v-if="discount > 0" class="price-discount">
      <span>{{ texts.discount }} ({{ discount }}%)</span>
      <span>-{{ summary.discountAmount }} kr</span>
    </div>
    <div class="price-grand-total">
      <span>{{ texts.total }}</span>
      <span>{{ summary.total }} kr</span>
    </div>
  </div>
</template>
