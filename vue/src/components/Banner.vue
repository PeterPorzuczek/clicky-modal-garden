<script setup>
import { ref, computed, watch } from 'vue'
import Dialog, { DialogClose, DialogContent } from './Dialog.vue'
import OrderForm from './OrderForm.vue'
import config from '../setup/config.js'
import { localize } from '../setup/i18n.js'

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
  deliveryCity: ''
}

const props = defineProps({
  texts: Object,
  prefilledData: Object,
  languages: { type: Array, default: () => ([
    { code: 'se', label: 'SE' },
    { code: 'en', label: 'EN' },
    { code: 'no', label: 'NO' }
  ]) },
  currentLanguage: String
})

const emit = defineEmits(['change-language'])

const open = ref(false)
const email = ref('')
const isPrefillChecked = ref(false)
const internalPrefilled = ref(null)

watch(() => props.prefilledData, (val) => {
  if (isPrefillChecked.value && val && val.email) {
    email.value = val.email
  }
})

function loadCustomerData() {
  internalPrefilled.value = DEMO_CUSTOMER
}

function clearPrefilledData() {
  internalPrefilled.value = null
}

watch(isPrefillChecked, (val) => {
  if (val) {
    loadCustomerData()
    if (internalPrefilled.value?.email) email.value = internalPrefilled.value.email
  } else {
    clearPrefilledData()
  }
})

function start() {
  if (email.value.trim()) {
    open.value = true
  }
}

function handleClear() {
  isPrefillChecked.value = false
  email.value = ''
  clearPrefilledData()
}

const finalPrefilledData = computed(() => {
  const active = props.prefilledData || (isPrefillChecked.value ? internalPrefilled.value : null)
  if (active) {
    return { ...active, email: email.value || active.email }
  }
  return email.value ? { email: email.value } : null
})

function mapSection(section, lang) {
  const result = {}
  for (const [k, v] of Object.entries(section)) {
    result[k] = localize(v, lang)
  }
  return result
}

const orderFormTexts = computed(() => {
  const lang = props.currentLanguage
  const t = config.texts
  return {
    validation: mapSection(t.validation, lang),
    firstStep: mapSection(t.firstStep, lang),
    secondStep: mapSection(t.secondStep, lang),
    thirdStep: mapSection(t.thirdStep, lang),
    fourthStep: mapSection(t.fourthStep, lang),
    fifthStep: mapSection(t.fifthStep, lang)
  }
})

function changeLanguage(code) {
  emit('change-language', code)
}
</script>

<template>
  <div class="banner-wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="banner-controls">
          <div class="language-selector">
            <span class="language-label">{{ texts.language }}</span>
            <div class="language-options">
              <button
                v-for="lang in props.languages"
                :key="lang.code"
                class="language-option"
                :class="{ active: props.currentLanguage === lang.code }"
                @click.stop="changeLanguage(lang.code)"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>
          <div class="app-controls-section">
            <div class="control-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="isPrefillChecked" />
                {{ texts.prefillCustomer }}
              </label>
            </div>
            <button class="btn-secondary" @click="handleClear">
              {{ texts.clearData }}
            </button>
          </div>
        </div>
        <div class="banner-header">
          <div class="banner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div>
            <h2 class="banner-title">{{ texts.priamry }}</h2>
            <p class="banner-text">{{ texts.secondary }}</p>
          </div>
        </div>
        <div class="email-input-section">
          <label class="email-label" for="banner-email">{{ texts.emailLabel }}</label>
          <input id="banner-email" type="email" class="email-input" v-model="email" :placeholder="texts.enterEmail" required />
        </div>
        <button class="banner-cta" @click="start" :disabled="!email.trim()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="9" />
          </svg>
          {{ texts.clickToStart }}
        </button>
      </div>
    </div>
    <Dialog :open="open" @update:open="open = $event">
      <DialogContent class="dialog-content">
        <div class="form-container">
          <OrderForm :prefilled-data="finalPrefilledData" :texts="orderFormTexts" />
        </div>
        <DialogClose class="dialog-close" />
      </DialogContent>
    </Dialog>
  </div>
</template>
