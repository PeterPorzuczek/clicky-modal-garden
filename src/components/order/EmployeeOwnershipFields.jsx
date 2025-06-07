import React from 'react';

export default function EmployeeOwnershipFields({ product, onUpdate, onFieldBlur, touchedFields = {}, validationErrors = [] }) {
  const fieldPrefix = `product-${product.id}-`;

  const fieldError = (name) => {
    if (!touchedFields[name]) return null;
    const err = validationErrors.find((e) => e.field === name);
    return err ? err.message : null;
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-start space-x-2 mb-4">
        <input
          id={`${fieldPrefix}isEmployeeOwned`}
          type="checkbox"
          checked={product.isEmployeeOwned}
          onChange={(e) => onUpdate('isEmployeeOwned', e.target.checked)}
        />
        <label htmlFor={`${fieldPrefix}isEmployeeOwned`} className="text-sm font-medium leading-none cursor-pointer">
          Plagg tillhör anställd
        </label>
      </div>
      {product.isEmployeeOwned && (
        <div className="ml-6 space-y-4">
          <div>
            <label htmlFor={`${fieldPrefix}employeeName`} className="block mb-1 font-medium">Namn på anställd</label>
            <input
              id={`${fieldPrefix}employeeName`}
              value={product.employeeName}
              onChange={(e) => onUpdate('employeeName', e.target.value)}
              onBlur={() => onFieldBlur && onFieldBlur(fieldPrefix + 'employeeName')}
              required={product.isEmployeeOwned}
              className={`w-full h-10 rounded border px-3 ${fieldError(fieldPrefix + 'employeeName') ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldError(fieldPrefix + 'employeeName') && (
              <p className="text-sm text-red-500 mt-1">{fieldError(fieldPrefix + 'employeeName')}</p>
            )}
          </div>
          <div>
            <label htmlFor={`${fieldPrefix}employeeDepartment`} className="block mb-1 font-medium">Avdelning</label>
            <input
              id={`${fieldPrefix}employeeDepartment`}
              value={product.employeeDepartment}
              onChange={(e) => onUpdate('employeeDepartment', e.target.value)}
              onBlur={() => onFieldBlur && onFieldBlur(fieldPrefix + 'employeeDepartment')}
              required={product.isEmployeeOwned}
              className={`w-full h-10 rounded border px-3 ${fieldError(fieldPrefix + 'employeeDepartment') ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldError(fieldPrefix + 'employeeDepartment') && (
              <p className="text-sm text-red-500 mt-1">{fieldError(fieldPrefix + 'employeeDepartment')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
