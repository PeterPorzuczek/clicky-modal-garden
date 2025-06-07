import React from 'react';
import t from '../../i18n.js';

function MinusIcon({className}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon({className}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function ProductQuantitySelector({ quantity, onIncrease, onDecrease }) {
  const decrease = () => {
    if (quantity > 0) onDecrease();
  };
  const increase = () => {
    onIncrease();
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor="quantity" className="font-medium">
          {t('firstStep.selectNumberOfProducts')} <span className="text-red-500">*</span>
        </label>
      </div>
      <div className="flex items-center justify-between w-full max-w-md h-14 rounded-lg border border-input overflow-hidden bg-white">
        <button type="button" className="flex items-center justify-center h-full px-6 cursor-pointer text-gray-500 hover:bg-gray-50" onClick={decrease} disabled={quantity <= 0}>
          <MinusIcon className="h-5 w-5" />
        </button>
        <span className="text-xl font-medium flex-1 text-center">{quantity}</span>
        <button type="button" className="flex items-center justify-center h-full px-6 cursor-pointer text-gray-500 hover:bg-gray-50" onClick={increase}>
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
