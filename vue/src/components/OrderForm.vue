<script setup>
import { ref, computed } from 'vue'
import ProductSelectionStep from './order/ProductSelectionStep.vue'
import OrderInformationStep from './order/OrderInformationStep.vue'
import ConfirmationStep from './order/ConfirmationStep.vue'
import EmailPreviewStep from './order/EmailPreviewStep.vue'
import t from '../setup/i18n.js'

function createEmptyProduct(id) {
  return {
    id,
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
}

const props = defineProps({
  prefilledData: Object
})

const step = ref(0)
const quantity = ref(1)
const products = ref([createEmptyProduct(1)])
const orderInfo = ref(props.prefilledData || {})
const termsAccepted = ref(false)
const touchedFields = ref({})
const validationErrors = ref({})
const discount = ref(0)
const completeOrderData = ref(null)

const productSelectionTexts = computed(() => ({
  title: t('firstStep.title'),
  instruction: t('firstStep.instruction'),
  reminder: t('firstStep.reminder'),
  selectNumberOfProducts: t('firstStep.selectNumberOfProducts'),
  next: t('firstStep.next'),
  summary: t('firstStep.summary'),
  product: t('firstStep.product'),
  subtotal: t('firstStep.subtotal'),
  discount: t('firstStep.discount'),
  total: t('firstStep.total'),
  selectTypeOfProduct: t('firstStep.selectTypeOfProduct'),
  select: t('firstStep.select'),
  numberOfDamages: t('secondStep.numberOfDamages'),
  otherErrorsAndDefects: t('secondStep.otherErrorsAndDefects'),
  belongsToEmployee: t('secondStep.belongsToEmployee'),
  employeeName: t('secondStep.employeeName'),
  department: t('secondStep.department'),
  markDamageBelow: t('secondStep.markDamageBelow'),
  markAllDamagesInfo: t('secondStep.markAllDamagesInfo'),
  clickToMarkDamage: t('secondStep.clickToMarkDamage'),
  changeMarkingInfo: t('secondStep.changeMarkingInfo'),
  clearAllMarkers: t('secondStep.clearAllMarkers'),
  selectedMarkers: t('secondStep.selectedMarkers'),
  wholeProductMarkers: t('secondStep.wholeProductMarkers'),
  wholeProduct: t('secondStep.wholeProduct'),
  noImageAvailable: t('secondStep.noImageAvailable')
}))

function handleUpdateOrderInfo(val) {
  orderInfo.value = val
}

function handleBlur(field) {
  touchedFields.value = { ...touchedFields.value, [field]: true }
}

function setTerms(val) {
  termsAccepted.value = val
}

const orderInfoTexts = computed(() => ({
  title: t('thirdStep.title'),
  back: t('thirdStep.back'),
  orderInformation: t('thirdStep.orderInformation'),
  customerNumber: t('thirdStep.customerNumber'),
  enterCustomerNumber: t('thirdStep.enterCustomerNumber'),
  companyName: t('thirdStep.companyName'),
  enterCompanyName: t('thirdStep.enterCompanyName'),
  ordererName: t('thirdStep.ordererName'),
  enterOrdererName: t('thirdStep.enterOrdererName'),
  phone: t('thirdStep.phone'),
  enterPhone: t('thirdStep.enterPhone'),
  email: t('thirdStep.email'),
  enterEmail: t('thirdStep.enterEmail'),
  billingAddress: t('thirdStep.billingAddress'),
  streetAddress: t('thirdStep.streetAddress'),
  enterStreetAddress: t('thirdStep.enterStreetAddress'),
  postalCode: t('thirdStep.postalCode'),
  enterPostalCode: t('thirdStep.enterPostalCode'),
  city: t('thirdStep.city'),
  enterCity: t('thirdStep.enterCity'),
  pickupAddress: t('thirdStep.pickupAddress'),
  deliveryAddress: t('thirdStep.deliveryAddress'),
  sameAsPickup: t('thirdStep.sameAsPickup'),
  sameAsBilling: t('thirdStep.sameAsBilling'),
  summary: t('thirdStep.summary'),
  acceptTerms: t('thirdStep.acceptTerms'),
  terms: t('thirdStep.terms'),
  order: t('thirdStep.order')
}))

const confirmationTexts = computed(() => ({
  thankYouTitle: t('fourthStep.thankYouTitle'),
  orderReceivedMsg: t('fourthStep.orderReceivedMsg'),
  discountMsg: t('fourthStep.discountMsg').replace('{discount}', discount.value),
  instructionsTitle: t('fourthStep.instructionsTitle'),
  step1: t('fourthStep.step1'),
  step2: t('fourthStep.step2'),
  step3: t('fourthStep.step3'),
  step4: t('fourthStep.step4'),
  step5: t('fourthStep.step5'),
  step6: t('fourthStep.step6'),
  additionalOrder: t('fourthStep.additionalOrder'),
  previewEmail: t('fourthStep.previewEmail'),
  close: t('fourthStep.close')
}))

const emailPreviewTexts = computed(() => ({
  back: t('fifthStep.back'),
  sendEmail: t('fifthStep.sendEmail'),
  productWithMarkedDamages: t('fifthStep.productWithMarkedDamages'),
  product: productSelectionTexts.value.product,
  subtotal: productSelectionTexts.value.subtotal,
  total: productSelectionTexts.value.total
}))

// --- form helpers ---
import { watch } from 'vue'
import { calculateSummary } from './order/PriceSummary.vue'
import config from '../setup/config.js'

const containerRef = ref(null)

watch(step, () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

watch(() => props.prefilledData, (val) => {
  if (val) orderInfo.value = val
})

function resetForm() {
  step.value = 0
  quantity.value = 1
  products.value = [createEmptyProduct(1)]
  orderInfo.value = props.prefilledData || {}
  termsAccepted.value = false
  touchedFields.value = {}
  validationErrors.value = {}
  completeOrderData.value = null
}

async function captureMarkedAreas(product) {
  if (!product.images?.front) return {}
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const maxHeight = 250
      let scale = 1
      if (img.height > maxHeight) {
        scale = maxHeight / img.height
      }
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      ;(product.damageDetails ? Object.entries(product.damageDetails) : []).forEach(([k, d]) => {
        if (d.position && d.position.view !== 'whole') {
          const x = d.position.x * img.width
          const y = d.position.y * img.height
          const r = 15.6 / scale
          ctx.fillStyle = '#16a34a'
          ctx.beginPath()
          ctx.arc(x, y, r, 0, 2 * Math.PI)
          ctx.fill()
          ctx.fillStyle = '#FFFFFF'
          ctx.font = `bold ${Math.max(16 / scale, 16)}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(d.orderIndex || k.replace('damage-', ''), x, y)
        }
      })
      const compressed = canvas.toDataURL('image/jpeg', 0.7)
      resolve({ markedImage: compressed })
    }
    img.crossOrigin = 'anonymous'
    img.src = product.images.front
  })
}

async function validateProducts() {
  if (products.value.length === 0) return false
  let valid = true
  const { productTotals } = calculateSummary(products.value)
  productTotals.forEach((pt, idx) => {
    if (pt.subtotal === 0) valid = false
  })

  products.value = products.value.map((p) => {
    const cat = config.productCategories.find((c) => c.id === p.type)
    const damageErrors = {}
    const damageOptionErrors = {}
    let markerError
    if (!p.type) valid = false
    if (p.damageCount <= 0) {
      damageErrors[0] = t('validation.required')
      valid = false
    } else {
      for (let i = 0; i < p.damageCount; i++) {
        if (!p.damages?.[i]) {
          damageErrors[i] = t('validation.required')
          valid = false
        } else {
          const dmg = cat?.damages.find(d => d.id === p.damages[i])
          if (dmg?.options?.length) {
            const opt = p.damageDetails?.[`damage-${i}`]?.optionId
            if (!opt) {
              damageOptionErrors[i] = t('validation.required')
              valid = false
            }
          }
          if (dmg?.markedOnPicture) {
            const pos = p.damageDetails?.[`damage-${i}`]?.position
            if (!pos) {
              markerError = t('validation.required')
              valid = false
            }
          }
        }
      }
    }

    if (p.otherIssues && cat) {
      Object.entries(p.otherIssues).forEach(([id, on]) => {
        if (on) {
          const def = cat.defects.find(d => d.id === id)
          if (def?.markedOnPicture) {
            const pos = p.defectDetails?.[id]?.position
            if (!pos) {
              markerError = t('validation.required')
              valid = false
            }
          }
        }
      })
    }

    return {
      ...p,
      typeError: p.type ? undefined : t('validation.required'),
      damageErrors,
      damageOptionErrors,
      markerError
    }
  })

  if (valid) {
    const updated = await Promise.all(products.value.map(async (prod) => ({
      ...prod,
      capturedMarkedAreas: await captureMarkedAreas(prod)
    })))
    products.value = updated
  }
  return valid
}

function validateOrderInfo() {
  const required = ['companyName','ordererName','phone','email','billingCompanyName','billingStreet','billingZipCode','billingCity']
  const errors = {}
  required.forEach((k) => { if (!orderInfo.value[k]) errors[k] = t('validation.required') })
  if (!termsAccepted.value) errors.termsAccepted = t('validation.mustAccept')
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

async function nextStep() {
  if (step.value === 0) {
    const ok = await validateProducts()
    if (ok) step.value = 1
  } else if (step.value === 1) {
    if (validateOrderInfo()) step.value = 2
  } else if (step.value === 2) {
    step.value = 3
  }
}

function prevStep() {
  if (step.value > 0) step.value--
}
</script>

<template>
  <div class="order-form-inner" ref="containerRef">
    <ProductSelectionStep
      v-if="step === 0"
      :products="products"
      :quantity="quantity"
      :texts="productSelectionTexts"
      @update:products="val => products = val"
      @update:quantity="val => quantity = val"
      @next="nextStep"
    />
    <OrderInformationStep
      v-else-if="step === 1"
      :order-info="orderInfo"
      :products="products"
      :terms-accepted="termsAccepted"
      :touched-fields="touchedFields"
      :validation-errors="validationErrors"
      :texts="orderInfoTexts"
      @update:orderInfo="handleUpdateOrderInfo"
      @update:termsAccepted="setTerms"
      @blur-field="handleBlur"
      @prev="prevStep"
      @next="nextStep"
    />
    <ConfirmationStep
      v-else-if="step === 2"
      :products="products"
      :order-info="orderInfo"
      :discount="discount"
      :texts="confirmationTexts"
      @reset="resetForm"
      @preview="data => { completeOrderData = data; step = 3 }"
      @close="step = 0"
    />
    <EmailPreviewStep
      v-else-if="step === 3"
      :order-info="completeOrderData?.orderInfo"
      :products="completeOrderData?.products"
      :texts="emailPreviewTexts"
      @back="step = 2"
    />
    <div v-else>Further steps not yet ported</div>
  </div>
</template>

<style scoped>
</style>
