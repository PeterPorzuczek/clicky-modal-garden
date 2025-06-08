<script setup>
import { ref, computed } from 'vue'
import ProductSelectionStep from './order/ProductSelectionStep.vue'
import OrderInformationStep from './order/OrderInformationStep.vue'
import ConfirmationStep from './order/ConfirmationStep.vue'
import EmailPreviewStep from './order/EmailPreviewStep.vue'

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
  prefilledData: Object,
  texts: Object
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
  ...(props.texts.firstStep || {}),
  numberOfDamages: props.texts.secondStep?.numberOfDamages,
  otherErrorsAndDefects: props.texts.secondStep?.otherErrorsAndDefects,
  belongsToEmployee: props.texts.secondStep?.belongsToEmployee,
  employeeName: props.texts.secondStep?.employeeName,
  department: props.texts.secondStep?.department,
  markDamageBelow: props.texts.secondStep?.markDamageBelow,
  markAllDamagesInfo: props.texts.secondStep?.markAllDamagesInfo,
  clickToMarkDamage: props.texts.secondStep?.clickToMarkDamage,
  changeMarkingInfo: props.texts.secondStep?.changeMarkingInfo,
  clearAllMarkers: props.texts.secondStep?.clearAllMarkers,
  selectedMarkers: props.texts.secondStep?.selectedMarkers,
  wholeProductMarkers: props.texts.secondStep?.wholeProductMarkers,
  wholeProduct: props.texts.secondStep?.wholeProduct,
  noImageAvailable: props.texts.secondStep?.noImageAvailable
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
  ...(props.texts.thirdStep || {})
}))

const confirmationTexts = computed(() => {
  const base = props.texts.fourthStep || {}
  return {
    ...base,
    discountMsg: (base.discountMsg || '').replace('{discount}', discount.value)
  }
})

const emailPreviewTexts = computed(() => ({
  ...(props.texts.fifthStep || {}),
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
      console.log('DEBUG IMAGE CAPTURE:')
      console.log('Natural image size:', img.width, 'x', img.height)

      const imageEls = document.querySelectorAll('.gv-image')
      let actualDisplayWidth = img.width
      let actualDisplayHeight = img.height

      if (imageEls.length > 0) {
        const first = imageEls[0]
        const rect = first.getBoundingClientRect()
        const computed = window.getComputedStyle(first)
        console.log('Displayed image size:', rect.width, 'x', rect.height)
        console.log('CSS max-height:', computed.maxHeight)
        console.log('CSS object-fit:', computed.objectFit)
        actualDisplayWidth = rect.width
        actualDisplayHeight = rect.height
      }

      if (product.damageDetails) {
        Object.entries(product.damageDetails).forEach(([key, detail]) => {
          if (detail.position) {
            console.log(`Damage ${key} position:`, detail.position)
            console.log(
              'Calculated canvas position:',
              detail.position.x * img.width,
              detail.position.y * img.height
            )
          }
        })
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const maxHeight = 250
      let displayWidth, displayHeight, scaleFactor

      if (img.height > maxHeight) {
        scaleFactor = maxHeight / img.height
        displayHeight = maxHeight
        displayWidth = img.width * scaleFactor
      } else {
        displayWidth = img.width
        displayHeight = img.height
        scaleFactor = 1
      }

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const markers = []
      const damageMarkers = []
      const defectMarkers = []

      if (product.damageDetails) {
        Object.entries(product.damageDetails).forEach(([damageKey, detail]) => {
          if (detail.position && detail.position.view !== 'whole') {
            const damageIndex = damageKey.replace('damage-', '')
            const scaleX = img.width / actualDisplayWidth
            const scaleY = img.height / actualDisplayHeight
            damageMarkers.push({
              x: detail.position.x * actualDisplayWidth * scaleX,
              y: detail.position.y * actualDisplayHeight * scaleY,
              type: 'damage',
              label: (detail.orderIndex || parseInt(damageIndex) + 1).toString(),
              order: detail.orderIndex || parseInt(damageIndex) + 1,
              id: `damage-${damageIndex}`
            })
          }
        })
      }

      if (product.defectDetails) {
        Object.entries(product.defectDetails).forEach(([defectId, detail]) => {
          if (detail.position && detail.position.view !== 'whole') {
            const scaleX = img.width / actualDisplayWidth
            const scaleY = img.height / actualDisplayHeight
            defectMarkers.push({
              x: detail.position.x * actualDisplayWidth * scaleX,
              y: detail.position.y * actualDisplayHeight * scaleY,
              type: 'defect',
              label: defectId.replace('_', ' '),
              order: detail.orderIndex || 999,
              id: `defect-${defectId}`
            })
          }
        })
      }

      damageMarkers.sort((a, b) => a.order - b.order)
      defectMarkers.sort((a, b) => a.order - b.order)
      markers.push(...damageMarkers, ...defectMarkers)

      markers.forEach(marker => {
        if (marker.type === 'damage') {
          const radius = 15.6 / scaleFactor
          const fontSize = Math.max(16 / scaleFactor, 16)

          ctx.fillStyle = '#16a34a'
          ctx.beginPath()
          ctx.arc(marker.x, marker.y, radius, 0, 2 * Math.PI)
          ctx.fill()

          ctx.strokeStyle = '#FFFFFF'
          ctx.lineWidth = 2 / scaleFactor
          ctx.stroke()

          ctx.fillStyle = '#FFFFFF'
          ctx.font = `bold ${fontSize}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(marker.label, marker.x, marker.y)
        } else {
          const fontSize = Math.max(12 / scaleFactor, 12)
          ctx.font = `bold ${fontSize}px Arial`
          const textWidth = ctx.measureText(marker.label).width + (16 / scaleFactor)
          const rectHeight = 20 / scaleFactor

          ctx.fillStyle = '#0066CC'
          ctx.fillRect(marker.x - textWidth/2, marker.y - rectHeight/2, textWidth, rectHeight)

          ctx.fillStyle = '#FFFFFF'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(marker.label, marker.x, marker.y)
        }
      })

      const optimizeImage = (sourceCanvas) => {
        const maxWidth = 400
        const maxHeight = 300

        let finalWidth = sourceCanvas.width
        let finalHeight = sourceCanvas.height

        if (finalWidth > maxWidth || finalHeight > maxHeight) {
          const widthRatio = maxWidth / finalWidth
          const heightRatio = maxHeight / finalHeight
          const ratio = Math.min(widthRatio, heightRatio)

          finalWidth = Math.floor(finalWidth * ratio)
          finalHeight = Math.floor(finalHeight * ratio)
        }

        const optimizedCanvas = document.createElement('canvas')
        const optimizedCtx = optimizedCanvas.getContext('2d')
        optimizedCanvas.width = finalWidth
        optimizedCanvas.height = finalHeight

        optimizedCtx.imageSmoothingEnabled = true
        optimizedCtx.imageSmoothingQuality = 'high'

        optimizedCtx.drawImage(sourceCanvas, 0, 0, finalWidth, finalHeight)

        const imageData = optimizedCtx.getImageData(0, 0, finalWidth, finalHeight)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114)
          data[i] = gray
          data[i + 1] = gray
          data[i + 2] = gray
        }
        optimizedCtx.putImageData(imageData, 0, 0)

        const pixelCount = finalWidth * finalHeight
        let quality
        if (pixelCount > 80000) {
          quality = 0.6
        } else if (pixelCount > 40000) {
          quality = 0.7
        } else {
          quality = 0.8
        }

        console.log(`Image optimization: ${finalWidth}x${finalHeight} (${pixelCount} pixels) -> JPEG quality: ${Math.round(quality * 100)}%`)

        return optimizedCanvas.toDataURL('image/jpeg', quality)
      }

      const compressedImage = optimizeImage(canvas)
      resolve({ markedImage: compressedImage })
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
      damageErrors[0] = props.texts.validation?.required
      valid = false
    } else {
      for (let i = 0; i < p.damageCount; i++) {
        if (!p.damages?.[i]) {
          damageErrors[i] = props.texts.validation?.required
          valid = false
        } else {
          const dmg = cat?.damages.find(d => d.id === p.damages[i])
          if (dmg?.options?.length) {
            const opt = p.damageDetails?.[`damage-${i}`]?.optionId
            if (!opt) {
              damageOptionErrors[i] = props.texts.validation?.required
              valid = false
            }
          }
          if (dmg?.markedOnPicture) {
            const pos = p.damageDetails?.[`damage-${i}`]?.position
            if (!pos) {
              markerError = props.texts.validation?.required
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
              markerError = props.texts.validation?.required
              valid = false
            }
          }
        }
      })
    }

    return {
      ...p,
      typeError: p.type ? undefined : props.texts.validation?.required,
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
  required.forEach((k) => { if (!orderInfo.value[k]) errors[k] = props.texts.validation?.required })
  if (!termsAccepted.value) errors.termsAccepted = props.texts.validation?.mustAccept
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

async function nextStep() {
  if (step.value === 0) {
    const ok = await validateProducts()
    if (ok) step.value = 1
  } else if (step.value === 1) {
    if (validateOrderInfo()) step.value = 2
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
      @update:products="val => (products.value = val)"
      @update:quantity="val => (quantity.value = val)"
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
      @preview="data => { completeOrderData.value = data; step.value = 3 }"
      @close="step.value = 0"
    />
    <EmailPreviewStep
      v-else-if="step === 3"
      :order-info="completeOrderData?.orderInfo"
      :products="completeOrderData?.products"
      :texts="emailPreviewTexts"
      @back="step.value = 2"
    />
    <div v-else>Further steps not yet ported</div>
  </div>
</template>

<style scoped>
</style>
