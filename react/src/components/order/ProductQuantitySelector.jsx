import React from 'react';
import t from '../../setup/i18n.js';

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

const MAX_QUANTITY = 20;

export default function ProductQuantitySelector({ quantity, onIncrease, onDecrease }) {
  const decrease = () => {
    if (quantity > 0) onDecrease();
  };
  const increase = () => {
    if (quantity < MAX_QUANTITY) onIncrease();
  };
  return (
    <div className="pqs-container">
      <div className="pqs-row">
        <label htmlFor="quantity" className="font-medium">
          {t('firstStep.selectNumberOfProducts')} <span className="text-red">*</span>
        </label>
      </div>
      <div className="pqs-control">
        <button type="button" className="pqs-btn" onClick={decrease} disabled={quantity <= 0}>
          <MinusIcon className="icon-lg" />
        </button>
        <span className="pqs-value">{quantity}</span>
        <button
          type="button"
          className="pqs-btn"
          onClick={increase}
          disabled={quantity >= MAX_QUANTITY}
        >
          <PlusIcon className="icon-lg" />
        </button>
      </div>
    </div>
  );
}
