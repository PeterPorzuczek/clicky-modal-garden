import React from 'react';
import config from '../../setup/config.js';
import t, { localize } from '../../setup/i18n.js';
import CustomSelect from './ui/CustomSelect.jsx';

const OPTIONS = config.productCategories.map((cat) => ({
  value: cat.id,
  label: localize(cat.name),
}));

export default function ProductTypeSelector({ productType, onTypeChange, onOpenChange, error }) {
  const handleChange = (value) => {
    onTypeChange && onTypeChange(value);
    onOpenChange && onOpenChange(false);
  };

  return (
    <div className="pts-container">
      <label className="pts-label">
        {t('firstStep.selectTypeOfProduct')} <span className="text-red">*</span>
      </label>
      <CustomSelect
        value={productType || ''}
        onValueChange={handleChange}
        placeholder={t('firstStep.select')}
        options={OPTIONS}
        error={!!error}
      />
      {error && <p className="pts-error">{error}</p>}
    </div>
  );
}
