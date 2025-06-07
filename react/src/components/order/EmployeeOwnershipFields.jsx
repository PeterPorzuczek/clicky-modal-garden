import React from 'react';
import t from '../../setup/i18n.js';

export default function EmployeeOwnershipFields({ product, onUpdate, onFieldBlur, touchedFields = {}, validationErrors = [] }) {
  const fieldPrefix = `product-${product.id}-`;

  const fieldError = (name) => {
    if (!touchedFields[name]) return null;
    const err = validationErrors.find((e) => e.field === name);
    return err ? err.message : null;
  };

  return (
    <div className="employee-section">
      <div className="employee-checkbox-row">
        <input
          id={`${fieldPrefix}isEmployeeOwned`}
          type="checkbox"
          checked={product.isEmployeeOwned}
          onChange={(e) => onUpdate('isEmployeeOwned', e.target.checked)}
        />
        <label htmlFor={`${fieldPrefix}isEmployeeOwned`} className="employee-label-checkbox">
          {t('secondStep.belongsToEmployee')}
        </label>
      </div>
      {product.isEmployeeOwned && (
        <div className="employee-fields">
          <div>
            <label htmlFor={`${fieldPrefix}employeeName`} className="employee-label">{t('secondStep.employeeName')}</label>
            <input
              id={`${fieldPrefix}employeeName`}
              value={product.employeeName}
              onChange={(e) => onUpdate('employeeName', e.target.value)}
              onBlur={() => onFieldBlur && onFieldBlur(fieldPrefix + 'employeeName')}
              required={product.isEmployeeOwned}
              className={`employee-input ${fieldError(fieldPrefix + 'employeeName') ? 'error' : ''}`}
            />
            {fieldError(fieldPrefix + 'employeeName') && (
              <p className="employee-error">{fieldError(fieldPrefix + 'employeeName')}</p>
            )}
          </div>
          <div>
            <label htmlFor={`${fieldPrefix}employeeDepartment`} className="employee-label">{t('secondStep.department')}</label>
            <input
              id={`${fieldPrefix}employeeDepartment`}
              value={product.employeeDepartment}
              onChange={(e) => onUpdate('employeeDepartment', e.target.value)}
              onBlur={() => onFieldBlur && onFieldBlur(fieldPrefix + 'employeeDepartment')}
              required={product.isEmployeeOwned}
              className={`employee-input ${fieldError(fieldPrefix + 'employeeDepartment') ? 'error' : ''}`}
            />
            {fieldError(fieldPrefix + 'employeeDepartment') && (
              <p className="employee-error">{fieldError(fieldPrefix + 'employeeDepartment')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
