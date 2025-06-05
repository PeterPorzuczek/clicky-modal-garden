import React from 'react';
import config from '../config.js';

const OPTIONS = config.productCategories.map((cat) => ({
  value: cat.id,
  label: cat.name.sv || cat.name.en,
}));

export default function ProductTypeSelector({ productType, onTypeChange, onOpenChange, error }) {
  const handleChange = (e) => {
    onTypeChange && onTypeChange(e.target.value);
    onOpenChange && onOpenChange(false);
  };

  return (
    <div className="space-y-2">
      <label className="font-medium">Välj typ av produkt <span className="text-red-500">*</span></label>
      <select
        className={`w-full h-10 rounded border px-3 ${error ? 'border-red-500' : ''}`}
        value={productType || ''}
        onChange={handleChange}
      >
        <option value="" disabled>Välj</option>
        {OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
