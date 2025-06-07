import React from 'react';
import config from '../../config.js';
import t, { localize } from '../../i18n.js';

const OPTIONS = config.productCategories.map((cat) => ({
  value: cat.id,
  label: localize(cat.name),
}));

export default function ProductTypeSelector({ productType, onTypeChange, onOpenChange, error }) {
  const handleChange = (e) => {
    onTypeChange && onTypeChange(e.target.value);
    onOpenChange && onOpenChange(false);
  };

  return (
    <div className="pts-container">
      <label className="pts-label">
        {t('firstStep.selectTypeOfProduct')} <span className="text-red">*</span>
      </label>
      <select
        className={`pts-select ${error ? 'error' : ''}`}
        value={productType || ''}
        onChange={handleChange}
        required
      >
        <option value="" disabled>{t('firstStep.select')}</option>
        {OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="pts-error">{error}</p>}
    </div>
  );
}
