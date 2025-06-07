import React from 'react';

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
  const handleDamageChange = (e) => {
    onDamageChange && onDamageChange(e.target.value);
  };

  const handleOptionChange = (e) => {
    onOptionChange && onOptionChange(e.target.value);
  };

  return (
    <div className="damage-selector">
      <div className="damage-selector-inner">
        <div>
          <div className="damage-label-row">
            <label className="damage-label">
              Skada {index + 1} <span className="text-red">*</span>
            </label>
          </div>
          <select
            value={damage}
            onChange={handleDamageChange}
            className={`damage-select ${damageError ? 'error' : ''}`}
            required
          >
            <option value="">Välj typ av skada</option>
            {damageOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {damageError && <p className="damage-error">{damageError}</p>}
        </div>
        {optionOptions.length > 0 && (
          <div>
            <label className="damage-label">
              Alternativ <span className="text-red">*</span>
            </label>
            <select
              value={option}
              onChange={handleOptionChange}
              className={`damage-select ${optionError ? 'error' : ''}`}
              required
            >
              <option value="">Välj</option>
              {optionOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            {optionError && <p className="damage-error">{optionError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
