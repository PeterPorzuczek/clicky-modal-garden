import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from './order/ui/Dialog.jsx';
import '../styles/banner.css';
import OrderForm from './OrderForm';
import t from '../setup/i18n.js';

export const DEMO_CUSTOMER = {
  customerNumber: 'CUS12345',
  companyName: 'Demo AB',
  ordererName: 'Anna Andersson',
  phone: '070-123 45 67',
  email: 'anna.andersson@demo.se',
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
  const open = isOpen !== undefined ? isOpen : openInternal;
  const formContainerRef = useRef(null);

  const handleBannerClick = () => {
    if (isOpen === undefined) setOpenInternal(true);
    onOpenChange && onOpenChange(true);
  };

  const handleChange = (value) => {
    if (isOpen === undefined) setOpenInternal(value);
    onOpenChange && onOpenChange(value);
  };

  return (
    <div className="banner-wrapper">
      <div className="banner" onClick={handleBannerClick}>
        <h2 className="banner-title">{t('trigger.priamry')}</h2>
        <p className="banner-text">{t('trigger.secondary')}</p>
      </div>
      <Dialog open={open} onOpenChange={handleChange}>
        <DialogContent className="dialog-content">
          <DialogTitle className="sr-only">{t('trigger.priamry')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('firstStep.instruction')}
          </DialogDescription>
          <div className="form-container" ref={formContainerRef}>
            <OrderForm prefilledData={prefilledData} scrollRef={formContainerRef} />
          </div>
          <DialogClose className="dialog-close" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
