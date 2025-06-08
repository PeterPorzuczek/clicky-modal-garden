<script setup>
import { ref, computed, watch } from 'vue'
import Dialog from './Dialog.vue'
import OrderForm from './OrderForm.vue'

const props = defineProps({
  texts: Object,
  prefilledData: Object
})

const open = ref(false)
const email = ref('')
const isPrefillChecked = ref(false)

watch(() => props.prefilledData, (val) => {
  if (isPrefillChecked.value && val && val.email) {
    email.value = val.email
  }
})

function start() {
  if (email.value.trim()) {
    open.value = true
  }
}
</script>

<template>
  <div class="banner-wrapper">
    <div class="banner">
      <div class="banner-content">
        <h2 class="banner-title">{{ texts.priamry }}</h2>
        <p class="banner-text">{{ texts.secondary }}</p>
        <div class="email-input-section">
          <label class="email-label" for="banner-email">{{ texts.emailLabel }}</label>
          <input id="banner-email" type="email" class="email-input" v-model="email" :placeholder="texts.enterEmail" required />
        </div>
        <button class="banner-cta" @click="start" :disabled="!email.trim()">
          {{ texts.clickToStart }}
        </button>
      </div>
    </div>
    <Dialog v-if="open" @close="open = false">
      <OrderForm />
    </Dialog>
  </div>
</template>
