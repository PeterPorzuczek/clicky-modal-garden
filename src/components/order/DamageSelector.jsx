import React from 'react';
import CustomSelect from './ui/CustomSelect.jsx';

export default function DamageSelector({
  index = 0,
  damage = '',
  option = '',
  damageOptions = [],
  optionOptions = [],
  onDamageChange,
  onOptionChange,
  damageError = null,
  optionError = null,
}) {
  const handleDamageChange = (value) => {
    onDamageChange && onDamageChange(value);
  };

  const handleOptionChange = (value) => {
    onOptionChange && onOptionChange(value);
  };

  const damageSelectOptions = damageOptions.map(opt => ({
    value: opt.id,
    label: opt.label
  }));

  const optionSelectOptions = optionOptions.map(opt => ({
    value: opt.id,
    label: opt.label
  }));

  return (
    <div className="damage-selector">
      <div className="damage-selector-inner">
        <div>
          <div className="damage-label-row">
            <label className="damage-label">
              Skada {index + 1} <span className="text-red">*</span>
            </label>
          </div>
          <CustomSelect
            value={damage}
            onValueChange={handleDamageChange}
            placeholder="Välj typ av skada"
            options={damageSelectOptions}
            error={!!damageError}
          />
          {damageError && <p className="damage-error">{damageError}</p>}
        </div>
        {optionOptions.length > 0 && (
          <div>
            <label className="damage-label">
              Alternativ <span className="text-red">*</span>
            </label>
            <CustomSelect
              value={option}
              onValueChange={handleOptionChange}
              placeholder="Välj"
              options={optionSelectOptions}
              error={!!optionError}
            />
            {optionError && <p className="damage-error">{optionError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
