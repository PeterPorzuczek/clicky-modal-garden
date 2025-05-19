import React from 'react';
import PriceSummary from '../order/PriceSummary.jsx';

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
        <h2 className="text-xl md:text-2xl font-bold">
          Beställ lagning & återställning av arbetskläder
        </h2>
      </div>
      <div className="flex mb-4">
        <button type="button" onClick={prevStep} className="text-[#262E85] hover:underline">
          Tillbaka
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Orderinformation</h3>
          <div className="space-y-4">
            <div>
              <label className="font-medium block mb-2">Kundnummer</label>
              <input
                placeholder="Ange kundnummer"
                value={orderInfo.customerNumber || ''}
                onChange={(e) => onChange && onChange('customerNumber', e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium block mb-2">
                Företagsnamn <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Ange företagsnamn"
                value={orderInfo.companyName || ''}
                onChange={(e) => onChange && onChange('companyName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('companyName')}
                required
                className={fieldError('companyName') ? 'border-red-500' : ''}
              />
              {fieldError('companyName') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('companyName')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                Namn på beställare <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Ange beställare"
                value={orderInfo.ordererName || ''}
                onChange={(e) => onChange && onChange('ordererName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('ordererName')}
                required
                className={fieldError('ordererName') ? 'border-red-500' : ''}
              />
              {fieldError('ordererName') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('ordererName')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                Telefon <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Ange telefon"
                value={orderInfo.phone || ''}
                onChange={(e) => onChange && onChange('phone', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('phone')}
                required
                className={fieldError('phone') ? 'border-red-500' : ''}
              />
              {fieldError('phone') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('phone')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                E-post <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Ange e-post"
                value={orderInfo.email || ''}
                onChange={(e) => onChange && onChange('email', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('email')}
                required
                className={fieldError('email') ? 'border-red-500' : ''}
              />
              {fieldError('email') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('email')}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Faktureringsadress</h3>
          <div className="space-y-4">
            <div>
              <label className="font-medium block mb-2">
                Företagsnamn <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Ange företagsnamn"
                value={orderInfo.billingCompanyName || ''}
                onChange={(e) => onChange && onChange('billingCompanyName', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('billingCompanyName')}
                required
                className={fieldError('billingCompanyName') ? 'border-red-500' : ''}
              />
              {fieldError('billingCompanyName') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('billingCompanyName')}</p>
              )}
            </div>
            <div>
              <label className="font-medium block mb-2">
                Gatuadress <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Ange gatuadress"
                value={orderInfo.billingStreet || ''}
                onChange={(e) => onChange && onChange('billingStreet', e.target.value)}
                onBlur={() => onFieldBlur && onFieldBlur('billingStreet')}
                required
                className={fieldError('billingStreet') ? 'border-red-500' : ''}
              />
              {fieldError('billingStreet') && (
                <p className="text-sm text-red-500 mt-1">{fieldError('billingStreet')}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium block mb-2">
                  Postnummer <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Ange postnummer"
                  value={orderInfo.billingZipCode || ''}
                  onChange={(e) => onChange && onChange('billingZipCode', e.target.value)}
                  onBlur={() => onFieldBlur && onFieldBlur('billingZipCode')}
                  required
                  className={fieldError('billingZipCode') ? 'border-red-500' : ''}
                />
                {fieldError('billingZipCode') && (
                  <p className="text-sm text-red-500 mt-1">{fieldError('billingZipCode')}</p>
                )}
              </div>
              <div>
                <label className="font-medium block mb-2">
                  Ort <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Ange ort"
                  value={orderInfo.billingCity || ''}
                  onChange={(e) => onChange && onChange('billingCity', e.target.value)}
                  onBlur={() => onFieldBlur && onFieldBlur('billingCity')}
                  required
                  className={fieldError('billingCity') ? 'border-red-500' : ''}
                />
                {fieldError('billingCity') && (
                  <p className="text-sm text-red-500 mt-1">{fieldError('billingCity')}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <PriceSummary products={products} />

        <div className="flex items-start space-x-2 mb-6">
          <input
            id="termsAccepted"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted && setTermsAccepted(e.target.checked)}
            onBlur={() => onFieldBlur && onFieldBlur('termsAccepted')}
            className={fieldError('termsAccepted') ? 'border-red-500' : ''}
          />
          <label htmlFor="termsAccepted" className="text-sm cursor-pointer">
            Jag accepterar villkoren <span className="text-red-500">*</span>
          </label>
        </div>
        {fieldError('termsAccepted') && (
          <p className="text-sm text-red-500 mt-1 mb-4">{fieldError('termsAccepted')}</p>
        )}

        <button type="submit" className="w-full rounded-full h-12 bg-[#262E85] hover:bg-[#1e2566]">
          Skicka
        </button>
      </form>
    </div>
  );
}
