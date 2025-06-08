<script setup>
import { ref, computed, watch } from 'vue'
import Dialog, { DialogContent, DialogTitle, DialogDescription, DialogClose } from './Dialog.vue'
import OrderForm from './OrderForm.vue'
import { setLanguage, getCurrentLanguage } from '../setup/i18n.js'
import t from '../setup/i18n.js'

const DEMO_CUSTOMER = {
  customerNumber: 'CUS12345',
  companyName: 'Demo AB',
  ordererName: 'Anna Andersson',
  phone: '070-123 45 67',
  email: 'piotr.porzuczek@lyreco.com',
  billingCompanyName: 'Demo AB',
  billingStreet: 'Storgatan 1',
  billingZipCode: '12345',
  billingCity: 'Stockholm',
  pickupCompanyName: 'Demo AB',
  pickupStreet: 'Storgatan 1',
  pickupZipCode: '12345',
  pickupCity: 'Stockholm',
  usePickupAddressForDelivery: true,
  deliveryCompanyName: '',
  deliveryStreet: '',
  deliveryZipCode: '',
  deliveryCity: '',
}

function usePrefilledCustomerData() {
  const prefilledData = ref(null)
  const loadCustomerData = () => { prefilledData.value = DEMO_CUSTOMER }
  const clearPrefilledData = () => { prefilledData.value = null }
  return { prefilledData, loadCustomerData, clearPrefilledData }
}

const props = defineProps({
  prefilledData: { type: Object, default: null },
  isOpen: { type: Boolean, default: undefined },
  onOpenChange: { type: Function, default: undefined }
})

const openInternal = ref(false)
const currentLanguage = ref(getCurrentLanguage())
const forceUpdate = ref(0)
const isPrefillChecked = ref(false)
const email = ref('')
const { prefilledData: internalPrefilledData, loadCustomerData, clearPrefilledData } = usePrefilledCustomerData()

const open = computed(() => props.isOpen !== undefined ? props.isOpen : openInternal.value)

// Use external prefilled data if provided, otherwise use internal
const activePrefilledData = computed(() => 
  props.prefilledData || (isPrefillChecked.value ? internalPrefilledData.value : null)
)

// Include banner email in the data passed to OrderForm
const finalPrefilledData = computed(() => {
  if (activePrefilledData.value) {
    return { ...activePrefilledData.value, email: email.value || activePrefilledData.value.email }
  }
  return email.value ? { email: email.value } : null
})

const formContainerRef = ref(null)

const handleStartClick = () => {
  if (props.isOpen === undefined) openInternal.value = true
  if (props.onOpenChange) props.onOpenChange(true)
}

const handleChange = (value) => {
  if (props.isOpen === undefined) openInternal.value = value
  if (props.onOpenChange) props.onOpenChange(value)
}

const handleLanguageChange = (language) => {
  setLanguage(language)
  currentLanguage.value = language
  forceUpdate.value = forceUpdate.value + 1 // Force re-render to update all text
}

const handlePrefillToggle = (checked) => {
  isPrefillChecked.value = checked
  if (checked) {
    loadCustomerData()
    // Also prefill the banner email from demo customer data
    if (DEMO_CUSTOMER.email) {
      email.value = DEMO_CUSTOMER.email
    }
  } else {
    clearPrefilledData()
    email.value = ''
  }
}

const handleClearData = () => {
  isPrefillChecked.value = false
  email.value = ''
  clearPrefilledData()
}

const languages = [
  { code: 'se', label: 'SE' },
  { code: 'en', label: 'EN' },
  { code: 'no', label: 'NO' }
]
</script>

<template>
  <div class="banner-wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="banner-controls">
          <div class="language-selector">
            <span class="language-label">{{ t('trigger.language') }}</span>
            <div class="language-options">
              <button
                v-for="lang in languages"
                :key="lang.code"
                class="language-option"
                :class="{ active: currentLanguage === lang.code }"
                @click.stop="handleLanguageChange(lang.code)"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>
          
          <div class="app-controls-section">
            <div class="control-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  :checked="isPrefillChecked"
                  @change="handlePrefillToggle($event.target.checked)"
                />
                {{ t('trigger.prefillCustomer') }}
              </label>
            </div>
            <button class="btn-secondary" @click="handleClearData">
              {{ t('trigger.clearData') }}
            </button>
          </div>
        </div>
        <div class="banner-header">
          <div class="banner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <div>
            <h2 class="banner-title">{{ t('trigger.priamry') }}</h2>
            <p class="banner-text">{{ t('trigger.secondary') }}</p>
          </div>
        </div>
        
        <div class="email-input-section">
          <label class="email-label" for="banner-email">
            {{ t('trigger.emailLabel') }}
          </label>
          <input
            id="banner-email"
            type="email"
            class="email-input"
            v-model="email"
            :placeholder="t('trigger.enterEmail')"
            required
          />
        </div>
        
        <button 
          class="banner-cta" 
          @click="handleStartClick"
          :disabled="!email.trim()"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
          {{ t('trigger.clickToStart') }}
        </button>
      </div>
    </div>
    
    <Dialog :open="open" @update:open="handleChange">
      <DialogContent class="dialog-content">
        <DialogTitle class="sr-only">{{ t('trigger.priamry') }}</DialogTitle>
        <DialogDescription class="sr-only">
          {{ t('firstStep.instruction') }}
        </DialogDescription>
        <div class="form-container" ref="formContainerRef">
          <OrderForm :prefilled-data="finalPrefilledData" :scroll-ref="formContainerRef" />
        </div>
        <DialogClose class="dialog-close" />
      </DialogContent>
    </Dialog>
  </div>
</template>

<style>
@import '../styles/banner.css';
</style>
