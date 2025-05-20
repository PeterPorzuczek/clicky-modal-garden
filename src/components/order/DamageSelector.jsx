import React from 'react';

export default function DamageSelector({
  index = 0,
  damage = '',
  tearSize = '',
  options = [],
  onDamageChange,
  onTearSizeChange,
  damageError = null,
  tearSizeError = null,
}) {
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
            value={damage}
            onChange={(e) => onDamageChange && onDamageChange(e.target.value)}
            className={damageError ? 'border-red-500' : ''}
          >
            <option value="">Välj typ av skada</option>
            {options.map((opt) => (
              <option key={opt.value || opt.id} value={opt.value || opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {damageError && <p className="text-sm text-red-500 mt-1">{damageError}</p>}
        </div>
        {damage === 'tear' && (
          <div>
            <label className="text-sm font-medium">
              Storlek <span className="text-red-500">*</span>
            </label>
            <div className={tearSizeError ? 'mt-1 border border-red-500 rounded-md p-2' : 'mt-1 p-2'}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`tear-small-${index}`}
                  value="small"
                  checked={tearSize === 'small'}
                  onChange={(e) => onTearSizeChange && onTearSizeChange(e.target.value)}
                />
                <label htmlFor={`tear-small-${index}`}>Max 5 cm</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`tear-medium-${index}`}
                  value="medium"
                  checked={tearSize === 'medium'}
                  onChange={(e) => onTearSizeChange && onTearSizeChange(e.target.value)}
                />
                <label htmlFor={`tear-medium-${index}`}>6-15 cm</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`tear-large-${index}`}
                  value="large"
                  checked={tearSize === 'large'}
                  onChange={(e) => onTearSizeChange && onTearSizeChange(e.target.value)}
                />
                <label htmlFor={`tear-large-${index}`}>16 cm+</label>
              </div>
            </div>
            {tearSizeError && <p className="text-sm text-red-500 mt-1">{tearSizeError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
