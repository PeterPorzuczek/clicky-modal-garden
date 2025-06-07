import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from './order/ui/Dialog.jsx';
import '../banner.css';
import OrderForm from './OrderForm';

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
        <h2 className="banner-title">Beställ lagning & återställning</h2>
        <p className="banner-text">Som icke inloggad kund</p>
      </div>
      <Dialog open={open} onOpenChange={handleChange}>
        <DialogContent className="dialog-content">
          <DialogTitle className="sr-only">Beställ lagning & återställning</DialogTitle>
          <DialogDescription className="sr-only">
            Formulär för att beställa lagning och återställning av arbetskläder
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
