import React from 'react';
import PriceSummary from '../order/PriceSummary.jsx';
import t from '../../i18n.js';

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

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{t('thirdStep.title')}</h2>
      </div>
      <div className="flex mb-4">
        <button type="button" onClick={prevStep} className="text-[#262E85] hover:underline">
          {t('thirdStep.back')}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">{t('thirdStep.orderInformation')}</h3>
          <div className="space-y-4">
            <div>
              <label className="font-medium block mb-2">{t('thirdStep.customerNumber')}</label>
              <input
                placeholder={t('thirdStep.enterCustomerNumber')}
                value={orderInfo.customerNumber || ''}
                onChange={(e) => onChange && onChange('customerNumber', e.target.value)}
                className="w-full h-10 rounded border px-3 border-gray-300"
              />
            </div>
            <div>
              <label className="font-medium block mb-2">
                {t('thirdStep.companyName')} <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterCompanyName')}
                value={orderInfo.companyName || ''}
                onChange={(e) => onChange && onChange('companyName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('companyName')}
                required
                className={`w-full h-10 rounded border px-3 ${fieldError('companyName') ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldError('companyName') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('companyName')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                {t('thirdStep.ordererName')} <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterOrdererName')}
                value={orderInfo.ordererName || ''}
                onChange={(e) => onChange && onChange('ordererName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('ordererName')}
                required
                className={`w-full h-10 rounded border px-3 ${fieldError('ordererName') ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldError('ordererName') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('ordererName')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                {t('thirdStep.phone')} <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterPhone')}
                value={orderInfo.phone || ''}
                onChange={(e) => onChange && onChange('phone', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('phone')}
                required
                className={`w-full h-10 rounded border px-3 ${fieldError('phone') ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldError('phone') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('phone')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                {t('thirdStep.email')} <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterEmail')}
                value={orderInfo.email || ''}
                onChange={(e) => onChange && onChange('email', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('email')}
                required
                className={`w-full h-10 rounded border px-3 ${fieldError('email') ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldError('email') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('email')}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">{t('thirdStep.billingAddress')}</h3>
          <div className="space-y-4">
            <div>
              <label className="font-medium block mb-2">
                {t('thirdStep.companyName')} <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterCompanyName')}
                value={orderInfo.billingCompanyName || ''}
                onChange={(e) => onChange && onChange('billingCompanyName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('billingCompanyName')}
                required
                className={`w-full h-10 rounded border px-3 ${fieldError('billingCompanyName') ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldError('billingCompanyName') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('billingCompanyName')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                {t('thirdStep.streetAddress')} <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={t('thirdStep.enterStreetAddress')}
                value={orderInfo.billingStreet || ''}
                onChange={(e) => onChange && onChange('billingStreet', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('billingStreet')}
                required
                className={`w-full h-10 rounded border px-3 ${fieldError('billingStreet') ? 'border-red-500' : 'border-gray-300'}`}
              />
              {fieldError('billingStreet') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('billingStreet')}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium block mb-2">
                  {t('thirdStep.postalCode')} <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder={t('thirdStep.enterPostalCode')}
                  value={orderInfo.billingZipCode || ''}
                  onChange={(e) => onChange && onChange('billingZipCode', e.target.value)}
                  onBlur={() => onFieldBlur && onFieldBlur('billingZipCode')}
                  required
                  className={`w-full h-10 rounded border px-3 ${fieldError('billingZipCode') ? 'border-red-500' : 'border-gray-300'}`}
                />
                {fieldError('billingZipCode') && (
                  <p className="text-sm text-red-500 mt-1">{fieldError('billingZipCode')}</p>
                )}
              </div>
              <div>
                <label className="font-medium block mb-2">
                  {t('thirdStep.city')} <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder={t('thirdStep.enterCity')}
                  value={orderInfo.billingCity || ''}
                  onChange={(e) => onChange && onChange('billingCity', e.target.value)}
                  onBlur={() => onFieldBlur && onFieldBlur('billingCity')}
                  required
                  className={`w-full h-10 rounded border px-3 ${fieldError('billingCity') ? 'border-red-500' : 'border-gray-300'}`}
                />
                {fieldError('billingCity') && (
                  <p className="text-sm text-red-500 mt-1">{fieldError('billingCity')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {products.some(p => p.type) && (
          <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3">{t('thirdStep.summary')}</h3>
            <PriceSummary products={products} />
          </div>
        )}

        <div className="flex items-start space-x-2 mb-6">
          <input
            id="termsAccepted"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted && setTermsAccepted(e.target.checked)}
            onBlur={() => onFieldBlur && onFieldBlur('termsAccepted')}
            className={`h-4 w-4 rounded border-gray-300 ${fieldError('termsAccepted') ? 'border-red-500' : ''}`}
          />
          <label htmlFor="termsAccepted" className="text-sm cursor-pointer">
            {t('thirdStep.acceptTerms')} <span className="text-red-500">*</span>
          </label>
        </div>
        {fieldError('termsAccepted') && (
          <p className="text-sm text-red-500 mt-1 mb-4">{fieldError('termsAccepted')}</p>
        )}

        <button type="submit" className="w-full rounded-full h-12 bg-[#262E85] hover:bg-[#1e2566]">
          {t('thirdStep.order')}
        </button>
      </form>
    </div>
  );
}
