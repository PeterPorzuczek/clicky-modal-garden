import React from 'react';
import ProductQuantitySelector from './ProductQuantitySelector';
import ProductCard from './ProductCard';
import PriceSummary from './PriceSummary';

export default function ProductSelectionStep({
  products,
  setProducts,
  quantity,
  setQuantity,
  nextStep,
}) {
  const addProduct = () => {
    setQuantity(quantity + 1);
    setProducts([
      ...products,
      {
        id: quantity + 1,
        type: '',
        damageCount: 0,
        otherIssues: {},
        isEmployeeOwned: false,
        employeeName: '',
        employeeDepartment: '',
      },
    ]);
  };

  const removeProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setProducts(products.slice(0, -1));
    }
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 mb-6">
        <p>
          Välkommen! Här kan du enkelt beställa lagning & återställning av dina arbetskläder.
          Tänk på att inte skicka in klassificerade skyddskläder och skyddsskor.
        </p>
        <ProductQuantitySelector
          quantity={quantity}
          onIncrease={addProduct}
          onDecrease={removeProduct}
        />
      </div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onUpdate={updateProduct} />
      ))}
      {products.length > 0 && (
        <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-3">Summering</h3>
          <PriceSummary products={products} />
        </div>
      )}
      <button
        type="button"
        onClick={nextStep}
        className="w-full rounded-full h-12 bg-[#262E85] hover:bg-[#1e2566] text-white"
      >
        Nästa
      </button>
    </div>
  );
}
