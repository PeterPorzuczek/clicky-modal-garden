import React, { useMemo } from 'react';
import config from '../../setup/config.js';
import t, { localize } from '../../setup/i18n.js';
import { calculateSummary } from './PriceSummary.jsx';

export function generateEmailHtml(orderInfo = {}, products = []) {
  const { productTotals, subTotal, total } = calculateSummary(products);
  const et = config.emailTemplate || {};
  const l = localize;

  const productItemsHtml = productTotals
    .map((p) => `\n      <div class="price-product">\n        <div class="price-product-heading">${t('firstStep.product')} #${p.id}: ${p.type || '-'}<\/div>\n        <div class="price-product-items">\n          ${p.items
            .map(
              (item) => `<div class="price-item"><span>${item.label}<\/span><span>${item.price} kr<\/span><\/div>`
            )
            .join('')}\n        <\/div>\n        <div class="price-subtotal">\n          <span>${t('firstStep.subtotal')}<\/span>\n          <span>${p.subtotal} kr<\/span>\n        <\/div>\n      <\/div>`)
    .join('');

  const priceSummaryHtml = `\n    <div class="price-summary">\n      ${productItemsHtml}\n      <div class="price-summary-total">\n        <span>${t('firstStep.subtotal')}<\/span>\n        <span>${subTotal} kr<\/span>\n      <\/div>\n      <div class="price-grand-total">\n        <span>${t('firstStep.total')}<\/span>\n        <span>${total} kr<\/span>\n      <\/div>\n    <\/div>`;

  return `\n    <h1 class="email-company">${l(et.header?.company_name)}<\/h1>\n    <h2 class="email-title">${l(et.main_title)}<\/h2>\n    <p>${l(et.intro?.thank_you)}<\/p>\n    <p>${l(et.intro?.summary_text)}<\/p>\n    <div class="email-section">\n      <h3 class="email-section-title">${l(et.sections?.order_information?.title)}<\/h3>\n      <p>${l(et.sections?.order_information?.fields?.customer_number)} ${orderInfo.customerNumber || '-'}<\/p>\n      <p>${l(et.sections?.order_information?.fields?.company_name)} ${orderInfo.companyName || '-'}<\/p>\n      <p>${l(et.sections?.order_information?.fields?.orderer_name)} ${orderInfo.ordererName || '-'}<\/p>\n      <p>${l(et.sections?.order_information?.fields?.phone)} ${orderInfo.phone || '-'}<\/p>\n      <p>${l(et.sections?.order_information?.fields?.email)} ${orderInfo.email || '-'}<\/p>\n    <\/div>\n    <div class="email-section">\n      <h3 class="email-section-title">${l(et.sections?.billing_address?.title)}<\/h3>\n      <p>${l(et.sections?.billing_address?.fields?.company_name)} ${orderInfo.billingCompanyName || '-'}<\/p>\n      <p>${l(et.sections?.billing_address?.fields?.street_address)} ${orderInfo.billingStreet || '-'}<\/p>\n      <p>${l(et.sections?.billing_address?.fields?.postal_code)} ${orderInfo.billingZipCode || '-'}<\/p>\n      <p>${l(et.sections?.billing_address?.fields?.city)} ${orderInfo.billingCity || '-'}<\/p>\n    <\/div>\n    <div class="email-section">\n      <h3 class="email-section-title">${l(et.sections?.pickup_address?.title)}<\/h3>\n      <p>${l(et.sections?.pickup_address?.fields?.company_name)} ${orderInfo.pickupCompanyName || '-'}<\/p>\n      <p>${l(et.sections?.pickup_address?.fields?.street_address)} ${orderInfo.pickupStreet || '-'}<\/p>\n      <p>${l(et.sections?.pickup_address?.fields?.postal_code)} ${orderInfo.pickupZipCode || '-'}<\/p>\n      <p>${l(et.sections?.pickup_address?.fields?.city)} ${orderInfo.pickupCity || '-'}<\/p>\n    <\/div>\n    ${!orderInfo.usePickupAddressForDelivery ? `<div class="email-section">\n      <h3 class="email-section-title">${l(et.sections?.delivery_address?.title)}<\/h3>\n      <p>${l(et.sections?.delivery_address?.fields?.company_name)} ${orderInfo.deliveryCompanyName || '-'}<\/p>\n      <p>${l(et.sections?.delivery_address?.fields?.street_address)} ${orderInfo.deliveryStreet || '-'}<\/p>\n      <p>${l(et.sections?.delivery_address?.fields?.postal_code)} ${orderInfo.deliveryZipCode || '-'}<\/p>\n      <p>${l(et.sections?.delivery_address?.fields?.city)} ${orderInfo.deliveryCity || '-'}<\/p>\n    <\/div>` : ''}\n    <div class="email-section">\n      <h3 class="email-section-title">${l(et.sections?.products?.title)}<\/h3>\n      ${priceSummaryHtml}\n    <\/div>\n    <div class="email-footer"><strong>${l(et.footer?.total_cost)} ${total} ${l(et.footer?.currency)}<\/strong><\/div>`;
}

export default function EmailPreviewStep({ orderInfo = {}, products = [], prevStep }) {
  const emailHtml = useMemo(() => generateEmailHtml(orderInfo, products), [orderInfo, products]);

  return (
    <div className="email-preview-container">
      <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
      <div className="email-actions">
        <button type="button" onClick={prevStep} className="secondary-button">
          {t('fifthStep.back')}
        </button>
        <button type="button" className="primary-button">
          {t('fifthStep.sendEmail')}
        </button>
      </div>
    </div>
  );
}
