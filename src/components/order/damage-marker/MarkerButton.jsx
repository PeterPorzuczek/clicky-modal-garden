import React from 'react';

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

export default function MarkerButtons({ isMarked, onMarkWholeProduct, onResetAllMarkers, isSingleMarkMode }) {
  return (
    <div className="flex flex-wrap gap-2 justify-between">
      {isSingleMarkMode && (
        <button
          type="button"
          className={`text-sm py-1 px-3 h-auto bg-white hover:bg-gray-50 border rounded ${isMarked ? '' : 'border-blue-500 text-blue-600'}`}
          onClick={onMarkWholeProduct}
        >
          Hela produkten
        </button>
      )}
      <button
        type="button"
        className="text-sm py-1 px-3 h-auto text-gray-600 border rounded"
        onClick={onResetAllMarkers}
      >
        <RotateCcwIcon className="h-3.5 w-3.5 mr-1" />
        Rensa alla markeringar
      </button>
    </div>
  );
}
