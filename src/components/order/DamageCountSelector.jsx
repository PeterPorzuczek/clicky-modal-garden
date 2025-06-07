import React from 'react';

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

export default function DamageCountSelector({ count, onChange }) {
  const decrement = () => onChange(Math.max(0, count - 1));
  const increment = () => onChange(count + 1);

  return (
    <div className="dcs-container">
      <label className="oi-label">Antal skador</label>
      <div className="dcs-control">
        <button
          type="button"
          className="dcs-btn"
          onClick={decrement}
          disabled={count <= 0}
        >
          <MinusIcon className="icon-lg" />
        </button>
        <span className="dcs-value">{count}</span>
        <button type="button" className="dcs-btn" onClick={increment}>
          <PlusIcon className="icon-lg" />
        </button>
      </div>
    </div>
  );
}
