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
import { calculateSummary } from './priceSummaryUtils.js'
import { localize } from '../../setup/i18n.js'
import config from '../../setup/config.js'

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
  const et = config.emailTemplate || {}
  const l = localize

  const productItemsHtml = products.map(product => {
    const items = product.items || []
    return `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
          <div style="font-weight: 600; color: #2D2E87; margin-bottom: 8px; font-size: 16px;">
            ${props.texts.product} #${product.id} ${product.type || '-'}
          </div>
          ${(product.employee || product.employeeName) ? `
          <div style="margin-bottom: 8px; color: #666; font-size: 14px;">
            <strong>${l(et.sections?.products?.fields?.employee) || 'Tillhör anställd:'}</strong> ${product.employee || product.employeeName}
          </div>` : ''}
          ${(product.employeeDepartment || product.department) ? `
          <div style="margin-bottom: 8px; color: #666; font-size: 14px;">
            <strong>${l(et.sections?.products?.fields?.department) || 'Avdelning:'}</strong> ${product.employeeDepartment || product.department}
          </div>` : ''}
          ${(product.artikelNumber || product.articleNumber) ? `
          <div style="margin-bottom: 8px; color: #666; font-size: 14px;">
            <strong>${l(et.sections?.products?.fields?.article_number) || 'Artikelnummer:'}</strong> ${product.artikelNumber || product.articleNumber}
          </div>` : ''}
          ${(product.lagningsId || product.repairId) ? `
          <div style="margin-bottom: 8px; color: #666; font-size: 14px;">
            <strong>${l(et.sections?.products?.fields?.repair_id) || 'Lagnings-ID:'}</strong> ${product.lagningsId || product.repairId}
          </div>` : ''}
          <div style="margin-left: 15px;">
            ${(() => {
              let damageCounter = 1
              return items.map(item => {
                let label = item.label
                if (item.category === 'damages') {
                  label = `${damageCounter}. ${item.label}`
                  damageCounter++
                }
                return `
                  <div style="display: table; width: 100%; margin: 4px 0; padding: 2px 0; font-size: 14px;">
                    <span style="display: table-cell; color: #333;">${label}</span>
                    <span style="display: table-cell; text-align: right; color: #2D2E87; font-weight: 500;">${item.price} kr</span>
                  </div>`
              }).join('')
            })()}
            <div style="display: table; width: 100%; margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd; font-weight: 600; color: #2D2E87;">
              <span style="display: table-cell;">${props.texts.subtotal}</span>
              <span style="display: table-cell; text-align: right;">${product.subtotal} kr</span>
            </div>
          </div>
          ${product.capturedMarkedAreas?.markedImage ? `
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
            <div style="font-weight: 500; color: #2D2E87; margin-bottom: 10px; font-size: 14px;">${props.texts.productWithMarkedDamages}</div>
            <div style="text-align: center;">
              <img src="${product.capturedMarkedAreas.markedImage}" alt="${props.texts.productWithMarkedDamages}" style="max-width: 300px; max-height: 200px; border: 1px solid #ddd; border-radius: 4px;" />
            </div>
          </div>` : ''}
        </td>
      </tr>`
  }).join('')

  const customerInfoRows = `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.customer_number) || 'Kundnummer:'}</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.customerNumber || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.company_name) || 'Företagsnamn:'}</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.companyName || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.orderer_name) || 'Beställarens namn:'}</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.ordererName || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.phone) || 'Telefon:'}</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.phone || '-'}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="display: table; width: 100%;">
          <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.order_information?.fields?.email) || 'E-post:'}</span>
          <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.email || '-'}</span>
        </div>
      </td>
    </tr>`

  return `
    <!DOCTYPE html>
    <html lang="${l()}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${l(et.subject, 'Order Confirmation')}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.5;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #ffffff;
        }
        .container {
          max-width: 748px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background-color: #ffffff;
          padding: 40px 50px 20px;
          text-align: left;
        }
        .logo {
          height: 50px;
          margin-bottom: 20px;
        }
        .main-header {
          background-color: #2D2E87;
          color: #ffffff;
          padding: 15px 50px;
          font-size: 20px;
          font-weight: 500;
          text-align: left;
        }
        .content {
          padding: 40px 50px;
          background-color: #ffffff;
        }
        .greeting {
          font-size: 16px;
          line-height: 1.6;
          color: #2D2E87;
          margin-bottom: 30px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #2D2E87;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #2D2E87;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table td {
          vertical-align: top;
        }
        .info-table td {
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .summary-box {
          background-color: #f8f9fa;
          padding: 20px;
          margin-top: 25px;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }
        .summary-row {
          display: table;
          width: 100%;
          margin: 8px 0;
          font-size: 14px;
        }
        .total-row {
          border-top: 2px solid #2D2E87;
          padding-top: 12px;
          margin-top: 12px;
          font-weight: 700;
          font-size: 16px;
          color: #2D2E87;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 30px 50px;
          text-align: center;
          color: #666666;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer p {
          margin: 8px 0;
        }
        .disclaimer {
          font-size: 12px;
          color: #999999;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"></div>
        <div class="main-header">
          ${l(et.main_title) || 'Beställning lagning & återställning av arbetskläder'}
        </div>
        <div class="content">
          <div class="greeting">
            ${l(et.intro?.thank_you) || 'Tack för din beställning!'}<br><br>
            ${l(et.intro?.summary_text) || 'Nedan ser du en sammanfattning av din beställning. Vår kundservice kommer inom kort återkomma med ytterligare instruktioner.'}
          </div>
          <div class="section">
            <div class="section-title">${l(et.sections?.order_information?.title) || 'Beställningsinformation'}</div>
            <table class="table info-table">
              ${customerInfoRows}
            </table>
          </div>
          <div class="section">
            <div class="section-title">${l(et.sections?.billing_address?.title) || 'Fakturaadress'}</div>
            <table class="table info-table">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.company_name) || 'Företagsnamn'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingCompanyName || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.street_address) || 'Gatuadress'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingStreet || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.postal_code) || 'Postnummer'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingZipCode || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.billing_address?.fields?.city) || 'Ort'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.billingCity || '-'}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="section">
            <div class="section-title">${l(et.sections?.pickup_address?.title) || 'Hämtadress'}</div>
            <table class="table info-table">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.company_name) || 'Företagsnamn'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupCompanyName || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.street_address) || 'Gatuadress'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupStreet || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.postal_code) || 'Postnummer'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupZipCode || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.pickup_address?.fields?.city) || 'Ort'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.pickupCity || '-'}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          ${!orderInfo.usePickupAddressForDelivery ? `
          <div class="section">
            <div class="section-title">${l(et.sections?.delivery_address?.title) || 'Leveransadress'}</div>
            <table class="table info-table">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.company_name) || 'Företagsnamn'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryCompanyName || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.street_address) || 'Gatuadress'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryStreet || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.postal_code) || 'Postnummer'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryZipCode || '-'}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <div style="display: table; width: 100%;">
                    <span style="display: table-cell; font-weight: 500; color: #666;">${l(et.sections?.delivery_address?.fields?.city) || 'Ort'}</span>
                    <span style="display: table-cell; text-align: right; color: #333;">${orderInfo.deliveryCity || '-'}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>` : ''}
          <div class="section">
            <div class="section-title">${l(et.sections?.products?.title) || 'Beställda produkter'}</div>
            <table class="table">
              ${productItemsHtml}
            </table>
            <div class="summary-box">
              <div class="summary-row">
                <span style="display: table-cell;">${props.texts.subtotal}</span>
                <span style="display: table-cell; text-align: right;">${subTotal} kr</span>
              </div>
              <div class="summary-row total-row">
                <span style="display: table-cell;">${props.texts.total}</span>
                <span style="display: table-cell; text-align: right;">${total} kr</span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>${l(et.footer) || 'Tack för att du valde vår tjänst!'}</p>
          <div class="disclaimer">
            ${l(et.disclaimer) || 'Detta är ett automatiskt meddelande. Vänligen svara inte på detta e-postmeddelande.'}
          </div>
        </div>
      </div>
    </body>
    </html>
  `
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
    await emailjs.send('service_om94h1p','template_jv1wx1q',templateParams)
    alert(`Email confirmation sent successfully to ${destination}!`)
  } catch (err) {
    alert('Failed to send email. Please try again or contact support.')
  }
}
</script>

<style scoped>
</style>
