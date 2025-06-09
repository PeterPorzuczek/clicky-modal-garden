<script setup>
import { ref, computed, watch } from 'vue'
import ProductSelectionStep from './order/ProductSelectionStep.vue'
import OrderInformationStep from './order/OrderInformationStep.vue'
import ConfirmationStep from './order/ConfirmationStep.vue'
import EmailPreviewStep from './order/EmailPreviewStep.vue'
import { calculateSummary } from './order/priceSummaryUtils.js'
import config from '../setup/config.js'
import t from '../setup/i18n.js'

const createEmptyProduct = (id) => ({
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
  markerError: undefined,
})

const props = defineProps({
  prefilledData: { type: Object, default: null },
  scrollRef: { type: Object, default: null }
})

const internalRef = ref(null)
const containerRef = computed(() => props.scrollRef || internalRef.value)
const step = ref(0)
const quantity = ref(1)
const products = ref([createEmptyProduct(1)])
const orderInfo = ref(props.prefilledData || {})
const termsAccepted = ref(false)
const touchedFields = ref({})
const validationErrors = ref({})
const completeOrderData = ref(null)

// Scroll back to the top of the form whenever the step changes
watch(step, () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Update orderInfo when prefilledData changes
watch(() => props.prefilledData, (val) => {
  if (val) {
    orderInfo.value = val
  }
})

const onFieldBlur = (name) => {
  touchedFields.value = { ...touchedFields.value, [name]: true }
}

const resetForm = () => {
  step.value = 0
  quantity.value = 1
  products.value = [createEmptyProduct(1)]
  orderInfo.value = props.prefilledData || {}
  termsAccepted.value = false
  touchedFields.value = {}
  validationErrors.value = {}
}

const validateProducts = async () => {
  if (products.value.length === 0) return false
  let valid = true
  
  // Check if any product has 0 total cost
  const { productTotals } = calculateSummary(products.value)
  productTotals.forEach((productTotal, index) => {
    if (productTotal.subtotal === 0) {
      valid = false
    }
  })
  
  // Pre-validate damage options before detailed validation
  products.value.forEach((product, productIndex) => {
    const category = config.productCategories.find((c) => c.id === product.type)
    if (!category) return
    
    for (let i = 0; i < (product.damageCount || 0); i++) {
      const damageId = product.damages?.[i]
      if (!damageId) {
        valid = false
        continue
      }
      
      const damage = category.damages.find(d => d.id === damageId)
      if (!damage) {
        valid = false
        continue
      }
      
      // Check if damage has options and if option is selected
      if (damage.options && damage.options.length > 0) {
        const selectedOption = product.damageDetails?.[`damage-${i}`]?.optionId
        if (!selectedOption) {
          valid = false
        }
      }
      
      // Check marker requirement
      if (damage.markedOnPicture) {
        const position = product.damageDetails?.[`damage-${i}`]?.position
        if (!position) {
          valid = false
        }
      }
    }
  })
  
  products.value = products.value.map((p) => {
    const typeError = p.type ? undefined : t('validation.required')
    if (!p.type) valid = false

    const damageErrors = {}
    const damageOptionErrors = {}
    let markerError
    const category = config.productCategories.find((c) => c.id === p.type)
    if (p.damageCount <= 0) {
      damageErrors[0] = t('validation.required')
      valid = false
    } else {
      for (let i = 0; i < p.damageCount; i++) {
        if (!p.damages?.[i]) {
          damageErrors[i] = t('validation.required')
          valid = false
        } else {
          const damage = category?.damages.find((d) => d.id === p.damages[i])
          if (damage?.options?.length > 0) {
            const opt = p.damageDetails?.[`damage-${i}`]?.optionId
            if (!opt) {
              damageOptionErrors[i] = t('validation.required')
              valid = false
            }
          }
          if (damage?.markedOnPicture) {
            const pos = p.damageDetails?.[`damage-${i}`]?.position
            if (!pos) {
              markerError = t('validation.required')
              valid = false
            }
          }
        }
      }
    }

    if (p.otherIssues && category) {
      Object.entries(p.otherIssues).forEach(([id, active]) => {
        if (active) {
          const defect = category.defects.find((d) => d.id === id)
          if (defect?.markedOnPicture) {
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
      damages: [...(p.damages || [])],
      damageDetails: { ...(p.damageDetails || {}) },
      otherIssues: { ...(p.otherIssues || {}) },
      defectDetails: { ...(p.defectDetails || {}) },
      typeError,
      damageErrors,
      damageOptionErrors,
      markerError,
    }
  })

  // If validation passed, capture marked areas
  if (valid) {
    const updatedProducts = await Promise.all(
      products.value.map(async (product) => {
        const capturedData = await captureMarkedAreas(product)
        return {
          ...product,
          capturedMarkedAreas: capturedData
        }
      })
    )
    products.value = updatedProducts
  }

  return valid
}

const validateOrderInfo = () => {
  const required = [
    'companyName',
    'ordererName',
    'phone',
    'email',
    'billingCompanyName',
    'billingStreet',
    'billingZipCode',
    'billingCity',
  ]
  const errors = {}
  required.forEach((key) => {
    if (!orderInfo.value[key]) errors[key] = t('validation.required')
  })
  if (!termsAccepted.value) errors.termsAccepted = t('validation.mustAccept')
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const captureMarkedAreas = async (product) => {
  if (!product.images?.front) return {}

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      
      // Find the actual image element in DOM to get its displayed size
      const imageElements = document.querySelectorAll('.gv-image')
      let actualDisplayWidth = img.width
      let actualDisplayHeight = img.height
      
      if (imageElements.length > 0) {
        const firstImage = imageElements[0]
        const computedStyle = window.getComputedStyle(firstImage)
        const displayedRect = firstImage.getBoundingClientRect()
        
        actualDisplayWidth = displayedRect.width
        actualDisplayHeight = displayedRect.height
      }
      
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Calculate scale factor between displayed image and natural image
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
      
      // Set canvas size to match natural image size
      canvas.width = img.width
      canvas.height = img.height
      
      // Draw original image
      ctx.drawImage(img, 0, 0)
      
      // Collect all markers with proper ordering
      const markers = []
      const damageMarkers = []
      const defectMarkers = []
      
      // Collect damage markers with their order - scale from displayed image to natural image
      if (product.damageDetails) {
        Object.entries(product.damageDetails).forEach(([damageKey, detail]) => {
          if (detail.position && detail.position.view !== 'whole') {
            const damageIndex = damageKey.replace('damage-', '')
            
            // Scale position from displayed image size to natural image size
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
      
      // Collect defect markers - scale from displayed image to natural image
      if (product.defectDetails) {
        Object.entries(product.defectDetails).forEach(([defectId, detail]) => {
          if (detail.position && detail.position.view !== 'whole') {
            
            // Scale position from displayed image size to natural image size
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
      
      // Sort by order and combine
      damageMarkers.sort((a, b) => a.order - b.order)
      defectMarkers.sort((a, b) => a.order - b.order)
      markers.push(...damageMarkers, ...defectMarkers)
      
               // Draw markers - scale sizes to match displayed proportions
       markers.forEach(marker => {
         if (marker.type === 'damage') {
           // Draw damage marker (circle with number) - scale up for natural image size
           const radius = 15.6 / scaleFactor
           const fontSize = Math.max(16 / scaleFactor, 16)
           
           ctx.fillStyle = '#16a34a'
           ctx.beginPath()
           ctx.arc(marker.x, marker.y, radius, 0, 2 * Math.PI)
           ctx.fill()
           
           // White border
           ctx.strokeStyle = '#FFFFFF'
           ctx.lineWidth = 2 / scaleFactor
           ctx.stroke()
           
           ctx.fillStyle = '#FFFFFF'
           ctx.font = `bold ${fontSize}px Arial`
           ctx.textAlign = 'center'
           ctx.textBaseline = 'middle'
           ctx.fillText(marker.label, marker.x, marker.y)
         } else {
           // Draw defect marker (rectangle with text) - scale up for natural image size
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
      
      // Optimize and compress image
      const optimizeImage = (sourceCanvas) => {
        // Target maximum dimensions for compression (smaller = less file size)
        const maxWidth = 400
        const maxHeight = 300
        
        let finalWidth = sourceCanvas.width
        let finalHeight = sourceCanvas.height
        
        // Calculate optimal size maintaining aspect ratio
        if (finalWidth > maxWidth || finalHeight > maxHeight) {
          const widthRatio = maxWidth / finalWidth
          const heightRatio = maxHeight / finalHeight
          const ratio = Math.min(widthRatio, heightRatio)
          
          finalWidth = Math.floor(finalWidth * ratio)
          finalHeight = Math.floor(finalHeight * ratio)
        }
        
        // Create optimized canvas
        const optimizedCanvas = document.createElement('canvas')
        const optimizedCtx = optimizedCanvas.getContext('2d')
        optimizedCanvas.width = finalWidth
        optimizedCanvas.height = finalHeight
        
        // Use high-quality scaling
        optimizedCtx.imageSmoothingEnabled = true
        optimizedCtx.imageSmoothingQuality = 'high'
        
        // Draw resized image
        optimizedCtx.drawImage(sourceCanvas, 0, 0, finalWidth, finalHeight)
        
        // Convert to grayscale for additional compression
        const imageData = optimizedCtx.getImageData(0, 0, finalWidth, finalHeight)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114)
          data[i] = gray     // Red
          data[i + 1] = gray // Green
          data[i + 2] = gray // Blue
          // Alpha stays the same (data[i + 3])
        }
        optimizedCtx.putImageData(imageData, 0, 0)
        
        // Convert to JPEG with adaptive compression
        // Use lower quality for larger images to maintain smaller file sizes
        const pixelCount = finalWidth * finalHeight
        let quality
        
        if (pixelCount > 80000) {       // Large images (>280x285)
          quality = 0.6                // 60% quality
        } else if (pixelCount > 40000) { // Medium images (>200x200)
          quality = 0.7                // 70% quality  
        } else {                        // Small images
          quality = 0.8                // 80% quality
        }
        
        return optimizedCanvas.toDataURL('image/jpeg', quality)
      }
      
      const compressedImage = optimizeImage(canvas)
      resolve({ markedImage: compressedImage })
    }
    img.crossOrigin = 'anonymous'
    img.src = product.images.front
  })
}

const nextStep = async () => {
  if (step.value === 0) {
    const isValid = await validateProducts()
    if (isValid) {
      step.value = 1
    }
  } else if (step.value === 1) {
    if (validateOrderInfo()) step.value = 2
  }
}

const prevStep = () => {
  if (step.value > 0) step.value = step.value - 1
}

const handleOrderInfoChange = (field, value) => {
  orderInfo.value = { ...orderInfo.value, [field]: value }
}
</script>

<template>
  <div v-if="step === 3" ref="internalRef" class="order-form-container">
    <EmailPreviewStep
      :order-info="completeOrderData.value?.orderInfo"
      :products="completeOrderData.value?.products"
      @prev-step="() => (step.value = 2)"
    />
  </div>
  <div v-else-if="step === 2" ref="internalRef" class="order-form-container">
    <ConfirmationStep
      :reset-form="resetForm"
      :products="products.value"
      :order-info="orderInfo.value"
      @preview="(orderData) => {
        completeOrderData.value = orderData;
        step.value = 3;
      }"
    />
  </div>
  <div v-else ref="internalRef" class="order-form-inner">
    <ProductSelectionStep
      v-if="step === 0"
      v-model:products="products"
      v-model:quantity="quantity"
      @next-step="nextStep"
    />
    <OrderInformationStep
      v-if="step === 1"
      :order-info="orderInfo.value"
      :products="products.value"
      :terms-accepted="termsAccepted.value"
      @update:terms-accepted="(val) => (termsAccepted.value = val)"
      @change="handleOrderInfoChange"
      @field-blur="onFieldBlur"
      @prev-step="prevStep"
      @next-step="nextStep"
      :touched-fields="touchedFields"
      :validation-errors="validationErrors"
    />
  </div>
</template>

<style scoped>
</style>
