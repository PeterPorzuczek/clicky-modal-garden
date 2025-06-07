import React, { useState, useRef, useEffect } from 'react';
import ProductSelectionStep from './order/ProductSelectionStep.jsx';
import OrderInformationStep from './order/OrderInformationStep.jsx';
import ConfirmationStep from './order/ConfirmationStep.jsx';
import EmailPreviewStep from './order/EmailPreviewStep.jsx';
import config from '../setup/config.js';
import t from '../setup/i18n.js';

const createEmptyProduct = (id) => ({
  id,
  type: '',
  damageCount: 0,
  damages: [],
  damageDetails: {},
  damageLabels: {},
  otherIssues: {},
  defectDetails: {},
  defectLabels: {},
  images: null,
  isEmployeeOwned: false,
  employeeName: '',
  employeeDepartment: '',
  damageErrors: {},
  damageOptionErrors: {},
  markerError: undefined,
});

export default function OrderForm({ prefilledData = null, scrollRef }) {
  const internalRef = useRef(null);
  const containerRef = scrollRef || internalRef;
  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([createEmptyProduct(1)]);
  const [orderInfo, setOrderInfo] = useState(prefilledData || {});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // Scroll back to the top of the form whenever the step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  // Update orderInfo when prefilledData changes
  useEffect(() => {
    if (prefilledData) {
      setOrderInfo(prefilledData);
    }
  }, [prefilledData]);

  const onFieldBlur = (name) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const resetForm = () => {
    setStep(0);
    setQuantity(1);
    setProducts([createEmptyProduct(1)]);
    setOrderInfo(prefilledData || {});
    setTermsAccepted(false);
    setTouchedFields({});
    setValidationErrors({});
  };

  const validateProducts = () => {
    if (products.length === 0) return false;
    let valid = true;
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const typeError = p.type ? undefined : t('validation.required');
        if (!p.type) valid = false;

        const damageErrors = {};
        const damageOptionErrors = {};
        let markerError;
        const category = config.productCategories.find((c) => c.id === p.type);
        if (p.damageCount <= 0) {
          damageErrors[0] = t('validation.required');
          valid = false;
        } else {
          for (let i = 0; i < p.damageCount; i++) {
            if (!p.damages?.[i]) {
              damageErrors[i] = t('validation.required');
              valid = false;
            } else {
              const damage = category?.damages.find((d) => d.id === p.damages[i]);
              if (damage?.options?.length) {
                const opt = p.damageDetails?.[`damage-${i}`]?.optionId;
                if (!opt) {
                  damageOptionErrors[i] = t('validation.required');
                  valid = false;
                }
              }
              if (damage?.markedOnPicture) {
                const pos = p.damageDetails?.[`damage-${i}`]?.position;
                if (!pos) {
                  markerError = t('validation.required');
                  valid = false;
                }
              }
            }
          }
        }

        if (p.otherIssues && category) {
          Object.entries(p.otherIssues).forEach(([id, active]) => {
            if (active) {
              const defect = category.defects.find((d) => d.id === id);
              if (defect?.markedOnPicture) {
                const pos = p.defectDetails?.[id]?.position;
                if (!pos) {
                  markerError = t('validation.required');
                  valid = false;
                }
              }
            }
          });
        }

        return {
          ...p,
          damages: [...(p.damages || [])],
          damageDetails: { ...(p.damageDetails || {}) },
          otherIssues: { ...(p.otherIssues || {}) },
          defectDetails: { ...(p.defectDetails || {}) },
          typeError,
          damageErrors,
          damageOptionErrors,
          markerError,
        };
      })
    );

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
      if (!orderInfo[key]) errors[key] = t('validation.required');
    });
    if (!termsAccepted) errors.termsAccepted = t('validation.mustAccept');
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

  const [completeOrderData, setCompleteOrderData] = useState(null);

  return step === 3 ? (
    <div ref={containerRef} className="order-form-container">
      <EmailPreviewStep
        orderInfo={completeOrderData?.orderInfo}
        products={completeOrderData?.products}
        prevStep={() => setStep(2)}
      />
    </div>
  ) : step === 2 ? (
    <div ref={containerRef} className="order-form-container">
      <ConfirmationStep
        resetForm={resetForm}
        products={products}
        orderInfo={orderInfo}
        onPreview={(orderData) => {
          setCompleteOrderData(orderData);
          setStep(3);
        }}
      />
    </div>
  ) : (
    <div ref={containerRef} className="order-form-inner">
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
