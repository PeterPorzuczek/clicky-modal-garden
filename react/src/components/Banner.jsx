import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from './order/ui/Dialog.jsx';
import '../styles/banner.css';
import OrderForm from './OrderForm';
import t, { setLanguage, getCurrentLanguage } from '../setup/i18n.js';

export const DEMO_CUSTOMER = {
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
  deliveryCity: '',
};

export function usePrefilledCustomerData() {
  const [prefilledData, setPrefilledData] = useState(null);
  const loadCustomerData = () => setPrefilledData(DEMO_CUSTOMER);
  const clearPrefilledData = () => setPrefilledData(null);
  return { prefilledData, loadCustomerData, clearPrefilledData };
}

export default function Banner({ prefilledData = null, isOpen, onOpenChange }) {
  const [openInternal, setOpenInternal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isPrefillChecked, setIsPrefillChecked] = useState(false);
  const [email, setEmail] = useState('');
  const { prefilledData: internalPrefilledData, loadCustomerData, clearPrefilledData } = usePrefilledCustomerData();
  const open = isOpen !== undefined ? isOpen : openInternal;
  const formContainerRef = useRef(null);
  
  // Use external prefilled data if provided, otherwise use internal
  const activePrefilledData = prefilledData || (isPrefillChecked ? internalPrefilledData : null);
  
  // Include banner email in the data passed to OrderForm
  const finalPrefilledData = activePrefilledData ? 
    { ...activePrefilledData, email: email || activePrefilledData.email } :
    email ? { email } : null;

  const handleStartClick = () => {
    if (isOpen === undefined) setOpenInternal(true);
    onOpenChange && onOpenChange(true);
  };

  const handleChange = (value) => {
    if (isOpen === undefined) setOpenInternal(value);
    onOpenChange && onOpenChange(value);
  };

  const handleLanguageChange = (language) => {
    setLanguage(language);
    setCurrentLanguage(language);
    setForceUpdate(prev => prev + 1); // Force re-render to update all text
  };

  const handlePrefillToggle = (checked) => {
    setIsPrefillChecked(checked);
    if (checked) {
      loadCustomerData();
      // Also prefill the banner email from demo customer data
      if (DEMO_CUSTOMER.email) {
        setEmail(DEMO_CUSTOMER.email);
      }
    } else {
      clearPrefilledData();
      setEmail('');
    }
  };

  const handleClearData = () => {
    setIsPrefillChecked(false);
    setEmail('');
    clearPrefilledData();
  };

  const languages = [
    { code: 'se', label: 'SE' },
    { code: 'en', label: 'EN' },
    { code: 'no', label: 'NO' }
  ];

  return (
    <div className="banner-wrapper">

      
      <div className="banner">
        <div className="banner-content">
          <div className="banner-controls">
            <div className="language-selector">
              <span className="language-label">{t('trigger.language')}</span>
              <div className="language-options">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange(lang.code);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="app-controls-section">
              <div className="control-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={isPrefillChecked}
                    onChange={(e) => handlePrefillToggle(e.target.checked)}
                  />
                  {t('trigger.prefillCustomer')}
                </label>
              </div>
              <button className="btn-secondary" onClick={handleClearData}>
                {t('trigger.clearData')}
              </button>
            </div>
          </div>
          <div className="banner-header">
          <div className="banner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <div>
            <h2 className="banner-title">{t('trigger.priamry')}</h2>
            <p className="banner-text">{t('trigger.secondary')}</p>
          </div>
          </div>
          
          <div className="email-input-section">
            <label className="email-label" htmlFor="banner-email">
              {t('trigger.emailLabel')}
            </label>
            <input
              id="banner-email"
              type="email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('trigger.enterEmail')}
              required
            />
          </div>
          
          <button 
            className="banner-cta" 
            onClick={handleStartClick}
            disabled={!email.trim()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
            {t('trigger.clickToStart')}
          </button>
        </div>
      </div>
      
      <Dialog open={open} onOpenChange={handleChange}>
        <DialogContent className="dialog-content">
          <DialogTitle className="sr-only">{t('trigger.priamry')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('firstStep.instruction')}
          </DialogDescription>
          <div className="form-container" ref={formContainerRef}>
            <OrderForm prefilledData={finalPrefilledData} scrollRef={formContainerRef} />
          </div>
          <DialogClose className="dialog-close" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
