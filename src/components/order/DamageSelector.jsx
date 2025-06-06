import React from 'react';

export default function DamageSelector({
  index = 0,
  allDamages = [],
  option = '',
  damageOptions = [],
  optionOptions = [],
  onDamageChange,
  onOptionChange,
  damageError = null,
  optionError = null,
}) {
  const currentDamage = allDamages[index] || '';

  const handleDamageChange = (e) => {
    onDamageChange && onDamageChange(e.target.value);
  };

  const handleOptionChange = (e) => {
    onOptionChange && onOptionChange(e.target.value);
  };

  return (
    <div className="border border-gray-200 p-3 rounded-md space-y-3 relative">
      <div className="flex flex-col space-y-3">
        <div>
          <div className="flex items-center mb-1">
            <label className="text-sm font-medium">
              Skada {index + 1} <span className="text-red-500">*</span>
            </label>
          </div>
          <select
            value={currentDamage}
            onChange={handleDamageChange}
            className={`w-full h-10 rounded border px-3 ${damageError ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Välj typ av skada</option>
            {damageOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {damageError && <p className="text-sm text-red-500 mt-1">{damageError}</p>}
        </div>
        {optionOptions.length > 0 && (
          <div>
            <label className="text-sm font-medium">Alternativ</label>
            <select
              value={option}
              onChange={handleOptionChange}
              className={`w-full h-10 rounded border px-3 ${optionError ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Välj</option>
              {optionOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            {optionError && <p className="text-sm text-red-500 mt-1">{optionError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
