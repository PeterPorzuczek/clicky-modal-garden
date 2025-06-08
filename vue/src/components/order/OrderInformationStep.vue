<template>
  <div>
    <div class="oi-header">
      <h2 class="oi-title">{{ texts.title }}</h2>
      <DialogClose class="oi-close" />
    </div>
    <div class="oi-back-row">
      <button type="button" class="oi-back-btn" @click="emit('prev')">
        {{ texts.back }}
      </button>
    </div>
    <form class="oi-form" @submit.prevent="submit">
      <div class="oi-card">
        <h3 class="oi-card-title">{{ texts.orderInformation }}</h3>
        <div class="oi-section">
          <div>
            <label class="oi-label">{{ texts.customerNumber }}</label>
            <input
              class="oi-input"
              :placeholder="texts.enterCustomerNumber"
              v-model="localInfo.customerNumber"
              @input="update('customerNumber', localInfo.customerNumber)"
            />
          </div>
          <div>
            <label class="oi-label">{{ texts.companyName }} <span class="text-red">*</span></label>
            <input
              class="oi-input"
              :class="{ 'oi-input-error': fieldError('companyName') }"
              :placeholder="texts.enterCompanyName"
              v-model="localInfo.companyName"
              @input="update('companyName', localInfo.companyName)"
              @blur="blur('companyName')"
              required
            />
            <p v-if="fieldError('companyName')" class="oi-error">{{ fieldError('companyName') }}</p>
          </div>
          <div>
            <label class="oi-label">{{ texts.ordererName }} <span class="text-red">*</span></label>
            <input
              class="oi-input"
              :class="{ 'oi-input-error': fieldError('ordererName') }"
              :placeholder="texts.enterOrdererName"
              v-model="localInfo.ordererName"
              @input="update('ordererName', localInfo.ordererName)"
              @blur="blur('ordererName')"
              required
            />
            <p v-if="fieldError('ordererName')" class="oi-error">{{ fieldError('ordererName') }}</p>
          </div>
          <div>
            <label class="oi-label">{{ texts.phone }} <span class="text-red">*</span></label>
            <input
              class="oi-input"
              :class="{ 'oi-input-error': fieldError('phone') }"
              :placeholder="texts.enterPhone"
              v-model="localInfo.phone"
              @input="update('phone', localInfo.phone)"
              @blur="blur('phone')"
              required
            />
            <p v-if="fieldError('phone')" class="oi-error">{{ fieldError('phone') }}</p>
          </div>
          <div>
            <label class="oi-label">{{ texts.email }} <span class="text-red">*</span></label>
            <input
              class="oi-input"
              :class="{ 'oi-input-error': fieldError('email') }"
              :placeholder="texts.enterEmail"
              v-model="localInfo.email"
              @input="update('email', localInfo.email)"
              @blur="blur('email')"
              required
            />
            <p v-if="fieldError('email')" class="oi-error">{{ fieldError('email') }}</p>
          </div>
        </div>
      </div>

      <div class="oi-card">
        <h3 class="oi-card-title">{{ texts.billingAddress }}</h3>
        <div class="oi-section">
          <div>
            <label class="oi-label">{{ texts.companyName }} <span class="text-red">*</span></label>
            <input
              class="oi-input"
              :class="{ 'oi-input-error': fieldError('billingCompanyName') }"
              :placeholder="texts.enterCompanyName"
              v-model="localInfo.billingCompanyName"
              @input="update('billingCompanyName', localInfo.billingCompanyName)"
              @blur="blur('billingCompanyName')"
              required
            />
            <p v-if="fieldError('billingCompanyName')" class="oi-error">{{ fieldError('billingCompanyName') }}</p>
          </div>
          <div>
            <label class="oi-label">{{ texts.streetAddress }} <span class="text-red">*</span></label>
            <input
              class="oi-input"
              :class="{ 'oi-input-error': fieldError('billingStreet') }"
              :placeholder="texts.enterStreetAddress"
              v-model="localInfo.billingStreet"
              @input="update('billingStreet', localInfo.billingStreet)"
              @blur="blur('billingStreet')"
              required
            />
            <p v-if="fieldError('billingStreet')" class="oi-error">{{ fieldError('billingStreet') }}</p>
          </div>
          <div class="oi-grid-2">
            <div>
              <label class="oi-label">{{ texts.postalCode }} <span class="text-red">*</span></label>
              <input
                class="oi-input"
                :class="{ 'oi-input-error': fieldError('billingZipCode') }"
                :placeholder="texts.enterPostalCode"
                v-model="localInfo.billingZipCode"
                @input="update('billingZipCode', localInfo.billingZipCode)"
                @blur="blur('billingZipCode')"
                required
              />
              <p v-if="fieldError('billingZipCode')" class="oi-error">{{ fieldError('billingZipCode') }}</p>
            </div>
            <div>
              <label class="oi-label">{{ texts.city }} <span class="text-red">*</span></label>
              <input
                class="oi-input"
                :class="{ 'oi-input-error': fieldError('billingCity') }"
                :placeholder="texts.enterCity"
                v-model="localInfo.billingCity"
                @input="update('billingCity', localInfo.billingCity)"
                @blur="blur('billingCity')"
                required
              />
              <p v-if="fieldError('billingCity')" class="oi-error">{{ fieldError('billingCity') }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="oi-card">
        <h3 class="oi-card-title">{{ texts.pickupAddress }}</h3>
        <div class="oi-checkbox-row">
          <input id="useBillingAddressForPickup" type="checkbox" class="oi-checkbox" v-model="useBilling" @change="update('useBillingAddressForPickup', useBilling)" />
          <label for="useBillingAddressForPickup" class="oi-checkbox-label">{{ texts.sameAsBilling }}</label>
        </div>
        <div v-if="useBilling === false" class="oi-section">
          <div>
            <label class="oi-label">{{ texts.companyName }}</label>
            <input class="oi-input" :placeholder="texts.enterCompanyName" v-model="localInfo.pickupCompanyName" @input="update('pickupCompanyName', localInfo.pickupCompanyName)" />
          </div>
          <div>
            <label class="oi-label">{{ texts.streetAddress }}</label>
            <input class="oi-input" :placeholder="texts.enterStreetAddress" v-model="localInfo.pickupStreet" @input="update('pickupStreet', localInfo.pickupStreet)" />
          </div>
          <div class="oi-grid-2">
            <div>
              <label class="oi-label">{{ texts.postalCode }}</label>
              <input class="oi-input" :placeholder="texts.enterPostalCode" v-model="localInfo.pickupZipCode" @input="update('pickupZipCode', localInfo.pickupZipCode)" />
            </div>
            <div>
              <label class="oi-label">{{ texts.city }}</label>
              <input class="oi-input" :placeholder="texts.enterCity" v-model="localInfo.pickupCity" @input="update('pickupCity', localInfo.pickupCity)" />
            </div>
          </div>
        </div>
      </div>

      <div class="oi-card">
        <h3 class="oi-card-title">{{ texts.deliveryAddress }}</h3>
        <div class="oi-checkbox-row">
          <input id="usePickupAddressForDelivery" type="checkbox" class="oi-checkbox" v-model="usePickup" @change="update('usePickupAddressForDelivery', usePickup)" />
          <label for="usePickupAddressForDelivery" class="oi-checkbox-label">{{ texts.sameAsPickup }}</label>
        </div>
        <div v-if="usePickup === false" class="oi-section">
          <div>
            <label class="oi-label">{{ texts.companyName }}</label>
            <input class="oi-input" :placeholder="texts.enterCompanyName" v-model="localInfo.deliveryCompanyName" @input="update('deliveryCompanyName', localInfo.deliveryCompanyName)" />
          </div>
          <div>
            <label class="oi-label">{{ texts.streetAddress }}</label>
            <input class="oi-input" :placeholder="texts.enterStreetAddress" v-model="localInfo.deliveryStreet" @input="update('deliveryStreet', localInfo.deliveryStreet)" />
          </div>
          <div class="oi-grid-2">
            <div>
              <label class="oi-label">{{ texts.postalCode }}</label>
              <input class="oi-input" :placeholder="texts.enterPostalCode" v-model="localInfo.deliveryZipCode" @input="update('deliveryZipCode', localInfo.deliveryZipCode)" />
            </div>
            <div>
              <label class="oi-label">{{ texts.city }}</label>
              <input class="oi-input" :placeholder="texts.enterCity" v-model="localInfo.deliveryCity" @input="update('deliveryCity', localInfo.deliveryCity)" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="products.some(p => p.type) && summary.total > 0" class="oi-card">
        <h3 class="oi-card-title">{{ texts.summary }}</h3>
        <PriceSummary :products="products" />
      </div>

      <div class="oi-checkbox-row">
        <input id="termsAccepted" type="checkbox" class="oi-checkbox" :class="{ error: fieldError('termsAccepted') }" v-model="localTerms" @change="emit('update:termsAccepted', localTerms)" @blur="blur('termsAccepted')" />
        <label for="termsAccepted" class="oi-checkbox-label">{{ texts.acceptTerms }} <span class="text-red">*</span></label>
      </div>
      <p v-if="fieldError('termsAccepted')" class="oi-error oi-error-spaced">{{ fieldError('termsAccepted') }}</p>

      <button type="submit" class="primary-button">{{ texts.order }}</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import PriceSummary, { calculateSummary } from './PriceSummary.vue'
import { DialogClose } from '../Dialog.vue'

const props = defineProps({
  orderInfo: { type: Object, default: () => ({}) },
  products: { type: Array, default: () => [] },
  termsAccepted: Boolean,
  touchedFields: { type: Object, default: () => ({}) },
  validationErrors: { type: Object, default: () => ({}) },
  texts: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['update:orderInfo','update:termsAccepted','prev','next','blur-field'])

const localInfo = reactive({ ...props.orderInfo })
const localTerms = computed({
  get: () => props.termsAccepted,
  set: v => emit('update:termsAccepted', v)
})
const useBilling = computed({
  get: () => props.orderInfo.useBillingAddressForPickup !== undefined ? props.orderInfo.useBillingAddressForPickup : true,
  set: v => update('useBillingAddressForPickup', v)
})
const usePickup = computed({
  get: () => props.orderInfo.usePickupAddressForDelivery !== undefined ? props.orderInfo.usePickupAddressForDelivery : true,
  set: v => update('usePickupAddressForDelivery', v)
})

watch(() => props.orderInfo, val => Object.assign(localInfo, val))

function fieldError(name) {
  if (!props.touchedFields[name]) return null
  return props.validationErrors[name] || null
}

function update(field, value) {
  emit('update:orderInfo', { ...props.orderInfo, [field]: value })
}

function blur(field) {
  emit('blur-field', field)
}

function submit() {
  emit('next')
}

const summary = computed(() => calculateSummary(props.products))
</script>

<style scoped>
</style>

