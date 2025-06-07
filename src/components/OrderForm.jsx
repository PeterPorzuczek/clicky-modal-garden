import React, { useState, useRef } from 'react';
import ProductSelectionStep from './order/ProductSelectionStep.jsx';
import OrderInformationStep from './order/OrderInformationStep.jsx';
import ConfirmationStep from './order/ConfirmationStep.jsx';

const createEmptyProduct = (id) => ({
  id,
  type: '',
  damageCount: 0,
  damages: [],
  damageDetails: {},
  otherIssues: {},
  defectDetails: {},
  defectLabels: {},
  images: null,
  isEmployeeOwned: false,
  employeeName: '',
  employeeDepartment: '',
});

export default function OrderForm({ prefilledData = null }) {
  const containerRef = useRef(null);
  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [orderInfo, setOrderInfo] = useState(prefilledData || {});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const onFieldBlur = (name) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const resetForm = () => {
    setStep(0);
    setQuantity(0);
    setProducts([]);
    setOrderInfo(prefilledData || {});
    setTermsAccepted(false);
    setTouchedFields({});
    setValidationErrors({});
  };

  const validateProducts = () => {
    let valid = true;
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const error = p.type ? undefined : 'Obligatoriskt';
        if (!p.type) valid = false;
        return {
          ...p,
          damages: [...(p.damages || [])],
          damageDetails: { ...(p.damageDetails || {}) },
          otherIssues: { ...(p.otherIssues || {}) },
          defectDetails: { ...(p.defectDetails || {}) },
          typeError: error,
        };
      })
    );
    
    products.forEach((p) => {
        if (!p.type) valid = false;
    });

    if (!valid) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => ({
          ...p,
          typeError: p.type ? undefined : 'Obligatoriskt',
        }))
      );
    }

    return valid;
  };

  const validateOrderInfo = () => {
    const required = [
      'companyName',
      'ordererName',
      'phone',
      'email',
      'billingCompanyName',
      'billingStreet',
      'billingZipCode',
      'billingCity',
    ];
    const errors = {};
    required.forEach((key) => {
      if (!orderInfo[key]) errors[key] = 'Obligatoriskt';
    });
    if (!termsAccepted) errors.termsAccepted = 'Måste accepteras';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (step === 0) {
      if (validateProducts()) setStep(1);
    } else if (step === 1) {
      if (validateOrderInfo()) setStep(2);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleOrderInfoChange = (field, value) => {
    setOrderInfo((prev) => ({ ...prev, [field]: value }));
  };

  return step === 2 ? (
    <div ref={containerRef} className="max-h-full overflow-auto">
      <ConfirmationStep resetForm={resetForm} products={products} />
    </div>
  ) : (
    <div ref={containerRef} className="p-6 max-h-full overflow-auto">
      {step === 0 && (
        <ProductSelectionStep
          products={products}
          setProducts={setProducts}
          quantity={quantity}
          setQuantity={setQuantity}
          nextStep={nextStep}
        />
      )}
      {step === 1 && (
        <OrderInformationStep
          orderInfo={orderInfo}
          products={products}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          onChange={handleOrderInfoChange}
          onFieldBlur={onFieldBlur}
          prevStep={prevStep}
          nextStep={nextStep}
          touchedFields={touchedFields}
          validationErrors={validationErrors}
        />
      )}
    </div>
  );
}
