import React from 'react';
import config from '../../setup/config.js';
import t, { localize } from '../../setup/i18n.js';
import PriceSummary, { calculateSummary } from './PriceSummary.jsx';

export default function FifthStep({ orderInfo = {}, products = [], prevStep }) {
  const { total } = calculateSummary(products);
  const et = config.emailTemplate || {};

  return (
    <div className="email-preview-container">
      <h1 className="email-company">{localize(et.header?.company_name)}</h1>
      <h2 className="email-title">{localize(et.main_title)}</h2>
      <p>{localize(et.intro?.thank_you)}</p>
      <p>{localize(et.intro?.summary_text)}</p>

      <div className="email-section">
        <h3 className="email-section-title">
          {localize(et.sections?.order_information?.title)}
        </h3>
        <p>
          {localize(et.sections?.order_information?.fields?.customer_number)}{' '}
          {orderInfo.customerNumber || '-'}
        </p>
        <p>
          {localize(et.sections?.order_information?.fields?.company_name)}{' '}
          {orderInfo.companyName || '-'}
        </p>
        <p>
          {localize(et.sections?.order_information?.fields?.orderer_name)}{' '}
          {orderInfo.ordererName || '-'}
        </p>
        <p>
          {localize(et.sections?.order_information?.fields?.phone)} {orderInfo.phone || '-'}
        </p>
        <p>
          {localize(et.sections?.order_information?.fields?.email)} {orderInfo.email || '-'}
        </p>
      </div>

      <div className="email-section">
        <h3 className="email-section-title">
          {localize(et.sections?.billing_address?.title)}
        </h3>
        <p>
          {localize(et.sections?.billing_address?.fields?.company_name)}{' '}
          {orderInfo.billingCompanyName || '-'}
        </p>
        <p>
          {localize(et.sections?.billing_address?.fields?.street_address)}{' '}
          {orderInfo.billingStreet || '-'}
        </p>
        <p>
          {localize(et.sections?.billing_address?.fields?.postal_code)}{' '}
          {orderInfo.billingZipCode || '-'}
        </p>
        <p>
          {localize(et.sections?.billing_address?.fields?.city)} {orderInfo.billingCity || '-'}
        </p>
      </div>

      <div className="email-section">
        <h3 className="email-section-title">
          {localize(et.sections?.pickup_address?.title)}
        </h3>
        <p>
          {localize(et.sections?.pickup_address?.fields?.company_name)}{' '}
          {orderInfo.pickupCompanyName || '-'}
        </p>
        <p>
          {localize(et.sections?.pickup_address?.fields?.street_address)}{' '}
          {orderInfo.pickupStreet || '-'}
        </p>
        <p>
          {localize(et.sections?.pickup_address?.fields?.postal_code)}{' '}
          {orderInfo.pickupZipCode || '-'}
        </p>
        <p>
          {localize(et.sections?.pickup_address?.fields?.city)} {orderInfo.pickupCity || '-'}
        </p>
      </div>

      {!orderInfo.usePickupAddressForDelivery && (
        <div className="email-section">
          <h3 className="email-section-title">
            {localize(et.sections?.delivery_address?.title)}
          </h3>
          <p>
            {localize(et.sections?.delivery_address?.fields?.company_name)}{' '}
            {orderInfo.deliveryCompanyName || '-'}
          </p>
          <p>
            {localize(et.sections?.delivery_address?.fields?.street_address)}{' '}
            {orderInfo.deliveryStreet || '-'}
          </p>
          <p>
            {localize(et.sections?.delivery_address?.fields?.postal_code)}{' '}
            {orderInfo.deliveryZipCode || '-'}
          </p>
          <p>
            {localize(et.sections?.delivery_address?.fields?.city)}{' '}
            {orderInfo.deliveryCity || '-'}
          </p>
        </div>
      )}

      <div className="email-section">
        <h3 className="email-section-title">
          {localize(et.sections?.products?.title)}
        </h3>
        <PriceSummary products={products} />
      </div>

      <div className="email-footer">
        <strong>
          {localize(et.footer?.total_cost)} {total} {localize(et.footer?.currency)}
        </strong>
      </div>

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
