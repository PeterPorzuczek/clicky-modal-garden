import React, { useContext, useMemo } from 'react';
import { DialogClose, DialogContext } from './ui/Dialog.jsx';
import { calculateSummary } from './PriceSummary.jsx';
import t from '../../setup/i18n.js';

export default function ConfirmationStep({
  resetForm,
  products = [],
  orderInfo = {},
  discount = 0,
  onPreview,
}) {
  const dialogCtx = useContext(DialogContext);
  
  // Create complete order JSON for API
  const completeOrderData = useMemo(() => {
    const { productTotals, subTotal, total } = calculateSummary(products, discount);
    
    const orderData = {
      // Order information
      orderInfo: {
        customerNumber: orderInfo.customerNumber || '',
        companyName: orderInfo.companyName || '',
        ordererName: orderInfo.ordererName || '',
        phone: orderInfo.phone || '',
        email: orderInfo.email || '',
        billingCompanyName: orderInfo.billingCompanyName || '',
        billingStreet: orderInfo.billingStreet || '',
        billingZipCode: orderInfo.billingZipCode || '',
        billingCity: orderInfo.billingCity || '',
        sameAsBillingAddress: orderInfo.sameAsBillingAddress || false,
        pickupCompanyName: orderInfo.pickupCompanyName || '',
        pickupStreet: orderInfo.pickupStreet || '',
        pickupZipCode: orderInfo.pickupZipCode || '',
        pickupCity: orderInfo.pickupCity || '',
        sameAsPickupAddress: orderInfo.usePickupAddressForDelivery !== undefined ? orderInfo.usePickupAddressForDelivery : true,
        usePickupAddressForDelivery: orderInfo.usePickupAddressForDelivery !== undefined ? orderInfo.usePickupAddressForDelivery : true,
        deliveryCompanyName: orderInfo.deliveryCompanyName || '',
        deliveryStreet: orderInfo.deliveryStreet || '',
        deliveryZipCode: orderInfo.deliveryZipCode || '',
        deliveryCity: orderInfo.deliveryCity || ''
      },
      
      // Products with enriched data including items from calculateSummary
      products: productTotals.map(productTotal => {
        const originalProduct = products.find(p => p.id === productTotal.id) || {};
        return {
          id: productTotal.id,
          type: productTotal.type,
          employee: originalProduct.employeeName || originalProduct.employee || '',
          employeeName: originalProduct.employeeName || originalProduct.employee || '',
          employeeDepartment: originalProduct.employeeDepartment || originalProduct.department || '',
          artikelNumber: originalProduct.artikelNumber || originalProduct.articleNumber || '',
          lagningsId: originalProduct.lagningsId || originalProduct.repairId || '',
          isEmployeeOwned: originalProduct.isEmployeeOwned || false,
          damages: originalProduct.damages || [],
          defects: originalProduct.defects || [],
          damageDetails: originalProduct.damageDetails || {},
          otherIssues: originalProduct.otherIssues || {},
          images: originalProduct.images || null,
          capturedMarkedAreas: originalProduct.capturedMarkedAreas || {},
          items: productTotal.items || [],
          subtotal: productTotal.subtotal || 0
        };
      }),
      
      // Summary
      summary: {
        productTotals,
        subTotal,
        discount,
        discountAmount: Math.round(subTotal * (discount / 100)),
        total
      },
      
      // Metadata
      metadata: {
        timestamp: new Date().toISOString(),
        language: 'sv' // Default to Swedish
      }
    };
    
    console.log('Complete Order Data for API:', orderData);
    
    return orderData;
  }, [products, orderInfo, discount]);
  
  const handlePreview = () => {
    onPreview && onPreview(completeOrderData);
  };
  return (
    <div className="confirm-container">
      <div className="confirm-header">
        <h2 className="confirm-title">{t('fourthStep.thankYouTitle')}</h2>
        <DialogClose className="confirm-close" />
      </div>
      <p className="confirm-text">
        {t('fourthStep.orderReceivedMsg')}
      </p>
      {discount > 0 && (
        <p className="confirm-discount">{t('fourthStep.discountMsg').replace('{discount}', discount)}</p>
      )}
      <p className="confirm-steps-intro">{t('fourthStep.instructionsTitle')}</p>
      <ol className="confirm-list">
        <li>{t('fourthStep.step1')}</li>
        <li>{t('fourthStep.step2')}</li>
        <li>{t('fourthStep.step3')}</li>
        <li>{t('fourthStep.step4')}</li>
        <li>{t('fourthStep.step5')}</li>
        <li>{t('fourthStep.step6')}</li>
      </ol>
      <div className="confirm-actions">
        <button
          type="button"
          onClick={resetForm}
          className="secondary-button"
        >
          {t('fourthStep.additionalOrder')}
        </button>
        <button
          type="button"
          onClick={handlePreview}
          className="secondary-button"
        >
          {t('fourthStep.previewEmail')}
        </button>
        <button
          type="button"
          onClick={() => dialogCtx?.onOpenChange(false)}
          className="primary-button"
        >
          {t('fourthStep.close')}
        </button>
      </div>
    </div>
  );
}
