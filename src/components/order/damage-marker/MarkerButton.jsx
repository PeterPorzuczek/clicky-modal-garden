import React from 'react';
import t from '../../../setup/i18n.js';

function RotateCcwIcon({ className = '', size = 14 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className={className}
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 103-8.36L1 10" />
    </svg>
  );
}

export default function MarkerButtons({ onResetAllMarkers }) {
  return (
    <div className="marker-buttons">
      <button
        type="button"
        className="marker-reset"
        onClick={onResetAllMarkers}
      >
        <RotateCcwIcon className="icon" />
        {t('secondStep.clearAllMarkers')}
      </button>
    </div>
  );
}
