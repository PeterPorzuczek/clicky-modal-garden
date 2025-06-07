import React from 'react';
import ProductQuantitySelector from './ProductQuantitySelector';
import ProductCard from './ProductCard';
import PriceSummary, { calculateSummary } from './PriceSummary';
import { DialogClose } from '../ui/Dialog.jsx';
import t from '../../i18n.js';

export default function ProductSelectionStep({
  products,
  setProducts,
  quantity,
  setQuantity,
  nextStep,
}) {

  const MAX_QUANTITY = 20;

  const addProduct = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity(quantity + 1);
      const newProducts = [
        ...products,
        {
          id: quantity + 1,
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
        },
      ];
      setProducts(newProducts);
    }
  };

  const removeProduct = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      const newProducts = products.slice(0, -1);
      setProducts(newProducts);
    }
  };

  const updateProduct = (id, field, value) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const { total } = calculateSummary(products);

  return (
    <div className="product-selection-step">
      <div className="ps-top">
        <div className="ps-header">
          <h2 className="ps-title">
            {t('firstStep.title')}
          </h2>
          <DialogClose className="close-btn" />
        </div>
        <p>{t('firstStep.instruction')}</p>
        <p className="ps-reminder">{t('firstStep.reminder')}</p>
        <ProductQuantitySelector
          quantity={quantity}
          onIncrease={addProduct}
          onDecrease={removeProduct}
        />
      </div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onUpdate={updateProduct} />
      ))}
      {products.some(p => p.type) && total > 0 && (
        <div className="summary-card">
          <h3 className="summary-title">{t('firstStep.summary')}</h3>
          <PriceSummary products={products} />
        </div>
      )}
      <button
        type="button"
        onClick={nextStep}
        className="primary-button"
      >
        {t('firstStep.next')}
      </button>
    </div>
  );
}
