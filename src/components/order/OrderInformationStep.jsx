import React from 'react';
import PriceSummary, { calculateSummary } from '../order/PriceSummary.jsx';
import t from '../../i18n.js';
import { DialogClose } from '../ui/Dialog.jsx';

export default function OrderInformationStep({
  orderInfo = {},
  products = [],
  termsAccepted = false,
  setTermsAccepted,
  onChange,
  onFieldBlur,
  prevStep,
  nextStep,
  touchedFields = {},
  validationErrors = {},
}) {
  const fieldError = (name) => {
    if (!touchedFields[name]) return null;
    return validationErrors[name] || null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep && nextStep();
  };

  const { total } = calculateSummary(products);

  return (
    <div>
      <div className="oi-header">
        <h2 className="oi-title">{t('thirdStep.title')}</h2>
        <DialogClose className="oi-close" />
      </div>
      <div className="oi-back-row">
        <button type="button" onClick={prevStep} className="oi-back-btn">
          {t('thirdStep.back')}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="oi-form">
        <div className="oi-card">
          <h3 className="oi-card-title">{t('thirdStep.orderInformation')}</h3>
          <div className="oi-section">
            <div>
              <label className="oi-label">{t('thirdStep.customerNumber')}</label>
              <input
                placeholder={t('thirdStep.enterCustomerNumber')}
                value={orderInfo.customerNumber || ''}
                onChange={(e) => onChange && onChange('customerNumber', e.target.value)}
                className="oi-input"
              />
            </div>
            <div>
              <label className="oi-label">
                {t('thirdStep.companyName')} <span className="text-red">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterCompanyName')}
                value={orderInfo.companyName || ''}
                onChange={(e) => onChange && onChange('companyName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('companyName')}
                required
                className={`oi-input ${fieldError('companyName') ? 'oi-input-error' : ''}`}
              />
              {fieldError('companyName') && (
                <p className="oi-error">{fieldError('companyName')}</p>
              )}
            </div>
            <div>
              <label className="oi-label">
                {t('thirdStep.ordererName')} <span className="text-red">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterOrdererName')}
                value={orderInfo.ordererName || ''}
                onChange={(e) => onChange && onChange('ordererName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('ordererName')}
                required
                className={`oi-input ${fieldError('ordererName') ? 'oi-input-error' : ''}`}
              />
              {fieldError('ordererName') && (
                <p className="oi-error">{fieldError('ordererName')}</p>
              )}
            </div>
            <div>
              <label className="oi-label">
                {t('thirdStep.phone')} <span className="text-red">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterPhone')}
                value={orderInfo.phone || ''}
                onChange={(e) => onChange && onChange('phone', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('phone')}
                required
                className={`oi-input ${fieldError('phone') ? 'oi-input-error' : ''}`}
              />
              {fieldError('phone') && (
                <p className="oi-error">{fieldError('phone')}</p>
              )}
            </div>
            <div>
              <label className="oi-label">
                {t('thirdStep.email')} <span className="text-red">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterEmail')}
                value={orderInfo.email || ''}
                onChange={(e) => onChange && onChange('email', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('email')}
                required
                className={`oi-input ${fieldError('email') ? 'oi-input-error' : ''}`}
              />
              {fieldError('email') && (
                <p className="oi-error">{fieldError('email')}</p>
              )}
            </div>
          </div>
        </div>

        <div className="oi-card">
          <h3 className="oi-card-title">{t('thirdStep.billingAddress')}</h3>
          <div className="oi-section">
            <div>
              <label className="oi-label">
                {t('thirdStep.companyName')} <span className="text-red">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterCompanyName')}
                value={orderInfo.billingCompanyName || ''}
                onChange={(e) => onChange && onChange('billingCompanyName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('billingCompanyName')}
                required
                className={`oi-input ${fieldError('billingCompanyName') ? 'oi-input-error' : ''}`}
              />
              {fieldError('billingCompanyName') && (
                <p className="oi-error">{fieldError('billingCompanyName')}</p>
              )}
            </div>
            <div>
              <label className="oi-label">
                {t('thirdStep.streetAddress')} <span className="text-red">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterStreetAddress')}
                value={orderInfo.billingStreet || ''}
                onChange={(e) => onChange && onChange('billingStreet', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('billingStreet')}
                required
                className={`oi-input ${fieldError('billingStreet') ? 'oi-input-error' : ''}`}
              />
              {fieldError('billingStreet') && (
                <p className="oi-error">{fieldError('billingStreet')}</p>
              )}
            </div>
            <div className="oi-grid-2">
              <div>
                <label className="oi-label">
                  {t('thirdStep.postalCode')} <span className="text-red">*</span>
                </label>
                <input
                  placeholder={t('thirdStep.enterPostalCode')}
                  value={orderInfo.billingZipCode || ''}
                  onChange={(e) => onChange && onChange('billingZipCode', e.target.value)}
                  onBlur={() => onFieldBlur && onFieldBlur('billingZipCode')}
                  required
                  className={`oi-input ${fieldError('billingZipCode') ? 'oi-input-error' : ''}`}
                />
                {fieldError('billingZipCode') && (
                  <p className="oi-error">{fieldError('billingZipCode')}</p>
                )}
              </div>
              <div>
                <label className="oi-label">
                  {t('thirdStep.city')} <span className="text-red">*</span>
                </label>
                <input
                  placeholder={t('thirdStep.enterCity')}
                  value={orderInfo.billingCity || ''}
                  onChange={(e) => onChange && onChange('billingCity', e.target.value)}
                  onBlur={() => onFieldBlur && onFieldBlur('billingCity')}
                  required
                  className={`oi-input ${fieldError('billingCity') ? 'oi-input-error' : ''}`}
                />
                {fieldError('billingCity') && (
                  <p className="oi-error">{fieldError('billingCity')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="oi-card">
          <h3 className="oi-card-title">{t('thirdStep.pickupAddress')}</h3>
          <div className="oi-checkbox-row">
            <input
              id="useBillingAddressForPickup"
              type="checkbox"
              checked={orderInfo.useBillingAddressForPickup !== undefined ? orderInfo.useBillingAddressForPickup : true}
              onChange={(e) => onChange && onChange('useBillingAddressForPickup', e.target.checked)}
              className="oi-checkbox"
            />
            <label htmlFor="useBillingAddressForPickup" className="oi-checkbox-label">
              {t('thirdStep.sameAsBilling')}
            </label>
          </div>
          {orderInfo.useBillingAddressForPickup === false && (
            <div className="oi-section">
              <div>
                <label className="oi-label">{t('thirdStep.companyName')}</label>
                <input
                  placeholder={t('thirdStep.enterCompanyName')}
                  value={orderInfo.pickupCompanyName || ''}
                  onChange={(e) => onChange && onChange('pickupCompanyName', e.target.value)}
                  className="oi-input"
                />
              </div>
              <div>
                <label className="oi-label">{t('thirdStep.streetAddress')}</label>
                <input
                  placeholder={t('thirdStep.enterStreetAddress')}
                  value={orderInfo.pickupStreet || ''}
                  onChange={(e) => onChange && onChange('pickupStreet', e.target.value)}
                  className="oi-input"
                />
              </div>
              <div className="oi-grid-2">
                <div>
                  <label className="oi-label">{t('thirdStep.postalCode')}</label>
                  <input
                    placeholder={t('thirdStep.enterPostalCode')}
                    value={orderInfo.pickupZipCode || ''}
                    onChange={(e) => onChange && onChange('pickupZipCode', e.target.value)}
                    className="oi-input"
                  />
                </div>
                <div>
                  <label className="oi-label">{t('thirdStep.city')}</label>
                  <input
                    placeholder={t('thirdStep.enterCity')}
                    value={orderInfo.pickupCity || ''}
                    onChange={(e) => onChange && onChange('pickupCity', e.target.value)}
                    className="oi-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="oi-card">
          <h3 className="oi-card-title">{t('thirdStep.deliveryAddress')}</h3>
          <div className="oi-checkbox-row">
            <input
              id="usePickupAddressForDelivery"
              type="checkbox"
              checked={orderInfo.usePickupAddressForDelivery !== undefined ? orderInfo.usePickupAddressForDelivery : true}
              onChange={(e) => onChange && onChange('usePickupAddressForDelivery', e.target.checked)}
              className="oi-checkbox"
            />
            <label htmlFor="usePickupAddressForDelivery" className="oi-checkbox-label">
              {t('thirdStep.sameAsPickup')}
            </label>
          </div>
          {orderInfo.usePickupAddressForDelivery === false && (
            <div className="oi-section">
              <div>
                <label className="oi-label">{t('thirdStep.companyName')}</label>
                <input
                  placeholder={t('thirdStep.enterCompanyName')}
                  value={orderInfo.deliveryCompanyName || ''}
                  onChange={(e) => onChange && onChange('deliveryCompanyName', e.target.value)}
                  className="oi-input"
                />
              </div>
              <div>
                <label className="oi-label">{t('thirdStep.streetAddress')}</label>
                <input
                  placeholder={t('thirdStep.enterStreetAddress')}
                  value={orderInfo.deliveryStreet || ''}
                  onChange={(e) => onChange && onChange('deliveryStreet', e.target.value)}
                  className="oi-input"
                />
              </div>
              <div className="oi-grid-2">
                <div>
                  <label className="oi-label">{t('thirdStep.postalCode')}</label>
                  <input
                    placeholder={t('thirdStep.enterPostalCode')}
                    value={orderInfo.deliveryZipCode || ''}
                    onChange={(e) => onChange && onChange('deliveryZipCode', e.target.value)}
                    className="oi-input"
                  />
                </div>
                <div>
                  <label className="oi-label">{t('thirdStep.city')}</label>
                  <input
                    placeholder={t('thirdStep.enterCity')}
                    value={orderInfo.deliveryCity || ''}
                    onChange={(e) => onChange && onChange('deliveryCity', e.target.value)}
                    className="oi-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {products.some(p => p.type) && total > 0 && (
          <div className="oi-card">
            <h3 className="oi-card-title">{t('thirdStep.summary')}</h3>
            <PriceSummary products={products} />
          </div>
        )}

        <div className="oi-checkbox-row">
          <input
            id="termsAccepted"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted && setTermsAccepted(e.target.checked)}
            onBlur={() => onFieldBlur && onFieldBlur('termsAccepted')}
            className={`oi-checkbox ${fieldError('termsAccepted') ? 'error' : ''}`}
          />
          <label htmlFor="termsAccepted" className="oi-checkbox-label">
            {t('thirdStep.acceptTerms')} <span className="text-red">*</span>
          </label>
        </div>
        {fieldError('termsAccepted') && (
          <p className="oi-error oi-error-spaced">{fieldError('termsAccepted')}</p>
        )}
        <button type="submit" className="primary-button">
          {t('thirdStep.order')}
        </button>
      </form>
    </div>
  );
}
