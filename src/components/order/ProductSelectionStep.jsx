import React from 'react';
import ProductQuantitySelector from './ProductQuantitySelector';
import ProductCard from './ProductCard';
import PriceSummary, { calculateSummary } from './PriceSummary';
import { DialogClose } from '../../ui/dialog.jsx';
import t from '../../i18n.js';

export default function ProductSelectionStep({
  products,
  setProducts,
  quantity,
  setQuantity,
  nextStep,
}) {

  const addProduct = () => {
    setQuantity(quantity + 1);
    const newProducts = [
      ...products,
      {
        id: quantity + 1,
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
        damageErrors: {},
        damageOptionErrors: {},
        markerError: undefined,
      },
    ];
    setProducts(newProducts);
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
    <div className="space-y-4">
      <div className="space-y-4 mb-6">
        <div className="flex items-center">
          <h2 className="text-xl md:text-2xl font-bold flex-1">
            {t('firstStep.title')}
          </h2>
          <DialogClose className="text-xl" />
        </div>
        <p>{t('firstStep.instruction')}</p>
        <p className="text-sm text-gray-700">{t('firstStep.reminder')}</p>
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
        <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-3">{t('firstStep.summary')}</h3>
          <PriceSummary products={products} />
        </div>
      )}
      <button
        type="button"
        onClick={nextStep}
        className="w-full rounded-full h-12 bg-[#262E85] hover:bg-[#1e2566] text-white"
      >
        {t('firstStep.next')}
      </button>
    </div>
  );
}
