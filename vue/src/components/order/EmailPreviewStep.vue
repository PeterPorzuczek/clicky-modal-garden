<template>
  <div class="email-preview-container">
    <div class="email-preview-content" v-html="emailHtml"></div>
    <div class="email-actions">
      <button type="button" class="secondary-button" @click="emit('back')">
        {{ texts.back }}
      </button>
      <button type="button" class="primary-button" @click="handleSendEmail">
        {{ texts.sendEmail }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { calculateSummary } from './PriceSummary.vue'
import { localize } from '../../setup/i18n.js'

const props = defineProps({
  orderInfo: { type: Object, default: () => ({}) },
  products: { type: Array, default: () => [] },
  texts: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['back'])

const info = ref({ ...props.orderInfo })
const prods = ref([...props.products])
watch(() => props.orderInfo, v => info.value = { ...v })
watch(() => props.products, v => prods.value = [...v])

function generateEmailHtml(orderInfo = {}, products = []) {
  const { subTotal, total } = calculateSummary(products)
  const et = {}
  const l = localize
  const productItemsHtml = products.map(product => {
    const items = product.items || []
    return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e0e0e0;">
          <div style="font-weight:600;color:#2D2E87;margin-bottom:8px;font-size:16px;">
            ${props.texts.product} #${product.id} ${product.type || '-'}
          </div>
          ${(product.employee || product.employeeName) ? `<div style="margin-bottom:8px;color:#666;font-size:14px;"><strong>${l(et.sections?.products?.fields?.employee) || 'Tillhör anställd:'}</strong> ${product.employee || product.employeeName}</div>` : ''}
          ${(product.employeeDepartment || product.department) ? `<div style="margin-bottom:8px;color:#666;font-size:14px;"><strong>${l(et.sections?.products?.fields?.department) || 'Avdelning:'}</strong> ${product.employeeDepartment || product.department}</div>` : ''}
          ${(product.artikelNumber || product.articleNumber) ? `<div style="margin-bottom:8px;color:#666;font-size:14px;"><strong>${l(et.sections?.products?.fields?.article_number) || 'Artikelnummer:'}</strong> ${product.artikelNumber || product.articleNumber}</div>` : ''}
          ${(product.lagningsId || product.repairId) ? `<div style="margin-bottom:8px;color:#666;font-size:14px;"><strong>${l(et.sections?.products?.fields?.repair_id) || 'Lagnings-ID:'}</strong> ${product.lagningsId || product.repairId}</div>` : ''}
          <div style="margin-left:15px;">
            ${(() => {
              let damageCounter = 1
              return items.map(item => {
                let label = item.label
                if (item.category === 'damages') {
                  label = `${damageCounter}. ${item.label}`
                  damageCounter++
                }
                return `<div style="display:table;width:100%;margin:4px 0;padding:2px 0;font-size:14px;"><span style="display:table-cell;color:#333;">${label}</span><span style="display:table-cell;text-align:right;color:#2D2E87;font-weight:500;">${item.price} kr</span></div>`
              }).join('')
            })()}
            <div style="display:table;width:100%;margin-top:8px;padding-top:8px;border-top:1px solid #ddd;font-weight:600;color:#2D2E87;">
              <span style="display:table-cell;">${props.texts.subtotal}</span>
              <span style="display:table-cell;text-align:right;">${product.subtotal} kr</span>
            </div>
          </div>
          ${product.capturedMarkedAreas?.markedImage ? `<div style="margin-top:15px;padding-top:15px;border-top:1px solid #e0e0e0;"><div style="font-weight:500;color:#2D2E87;margin-bottom:10px;font-size:14px;">${texts.productWithMarkedDamages}</div><div style="text-align:center;"><img src="${product.capturedMarkedAreas.markedImage}" alt="${texts.productWithMarkedDamages}" style="max-width:300px;max-height:200px;border:1px solid #ddd;border-radius:4px;" /></div></div>` : ''}
        </td>
      </tr>`
  }).join('')

  const customerInfoRows = `
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><div style="display:table;width:100%;"><span style="display:table-cell;font-weight:500;color:#666;">Kundnummer:</span><span style="display:table-cell;text-align:right;color:#333;">${orderInfo.customerNumber || '-'}</span></div></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><div style="display:table;width:100%;"><span style="display:table-cell;font-weight:500;color:#666;">Företagsnamn:</span><span style="display:table-cell;text-align:right;color:#333;">${orderInfo.companyName || '-'}</span></div></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><div style="display:table;width:100%;"><span style="display:table-cell;font-weight:500;color:#666;">Beställarens namn:</span><span style="display:table-cell;text-align:right;color:#333;">${orderInfo.ordererName || '-'}</span></div></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><div style="display:table;width:100%;"><span style="display:table-cell;font-weight:500;color:#666;">Telefon:</span><span style="display:table-cell;text-align:right;color:#333;">${orderInfo.phone || '-'}</span></div></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><div style="display:table;width:100%;"><span style="display:table-cell;font-weight:500;color:#666;">E-post:</span><span style="display:table-cell;text-align:right;color:#333;">${orderInfo.email || '-'}</span></div></td></tr>`

  return `<!DOCTYPE html><html lang="${l()}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Order</title></head><body><div class="container"><div class="main-header">Beställning</div><div class="content"><div class="section"><div class="section-title">Beställningsinformation</div><table class="table info-table">${customerInfoRows}</table></div><div class="section"><div class="section-title">Produkter</div><table class="table">${productItemsHtml}</table><div class="summary-box"><div class="summary-row"><span>${props.texts.subtotal}</span><span>${subTotal} kr</span></div><div class="summary-row total-row"><span>${props.texts.total}</span><span>${total} kr</span></div></div></div></div><div class="footer"><p>Tack!</p></div></div></body></html>`
}

const emailHtml = computed(() => generateEmailHtml(info.value, prods.value))

async function handleSendEmail() {
  emailjs.init('KfQE_RyvIf8RpZNM8')
  const destination = info.value.email
  if (!destination) {
    alert('Email address is required to send the order confirmation.')
    return
  }
  const templateParams = {
    to_email: destination,
    from_name: 'Workwear Repair Service',
    subject: 'Order Confirmation - Workwear Repair & Restoration',
    message: emailHtml.value,
    customer_name: info.value.ordererName || 'Customer',
    company_name: info.value.companyName || 'N/A',
    reply_to: destination
  }
  try {
    const res = await emailjs.send('service_om94h1p','template_jv1wx1q',templateParams)
    console.log('Email sent', res)
    alert(`Email confirmation sent successfully to ${destination}!`)
  } catch (err) {
    console.error('Error sending email', err)
    alert('Failed to send email. Please try again or contact support.')
  }
}
</script>

<style scoped>
</style>
