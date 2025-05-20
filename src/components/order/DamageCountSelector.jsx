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
    <div className="space-y-2">
      <label className="font-medium">Antal skador</label>
      <div className="flex items-center justify-between w-full max-w-xs h-14 rounded-lg border border-input overflow-hidden bg-white">
        <button type="button" className="flex items-center justify-center h-full px-6 cursor-pointer text-gray-500 hover:bg-gray-50" onClick={decrement} disabled={count <= 0}>
          <MinusIcon className="h-5 w-5" />
        </button>
        <span className="text-xl font-medium flex-1 text-center">{count}</span>
        <button type="button" className="flex items-center justify-center h-full px-6 cursor-pointer text-gray-500 hover:bg-gray-50" onClick={increment}>
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
