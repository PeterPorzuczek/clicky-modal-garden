import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../ui/dialog';
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
    <div className="w-full">
      <div
        className="bg-[hsl(var(--navy))] text-white p-8 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow w-full max-w-3xl mx-auto flex flex-col items-center justify-center"
        onClick={handleBannerClick}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Beställ lagning & återställning</h2>
        <p className="text-gray-200 text-center">Som icke inloggad kund</p>
      </div>
      <Dialog open={open} onOpenChange={handleChange}>
        <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
          <DialogTitle className="sr-only">Beställ lagning & återställning</DialogTitle>
          <DialogDescription className="sr-only">
            Formulär för att beställa lagning och återställning av arbetskläder
          </DialogDescription>
          <div className="flex-1 overflow-auto" ref={formContainerRef}>
            <OrderForm prefilledData={prefilledData} scrollRef={formContainerRef} />
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground p-2 text-xl" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
