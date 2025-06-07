import React from 'react';
import t from '../../../setup/i18n.js';

function InfoIcon({ className = '', size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export default function InstructionMessage({ productType, isMarked, isSingleMarkMode }) {
  let message = '';
  if (isSingleMarkMode) {
    if (isMarked) {
      message = t('secondStep.changeMarkingInfo');
    } else {
      message = t('secondStep.clickToMarkDamage');
    }
  } else {
    message = t('secondStep.markAllDamagesInfo');
  }

  return (
    <div className="instruction-msg">
      <InfoIcon className="instruction-icon" size={24} />
      <p className="instruction-text">{message}</p>
    </div>
  );
}
