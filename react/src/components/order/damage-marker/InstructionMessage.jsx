import React from 'react';

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
      message =
        'Du kan \u00E4ndra markeringen genom att klicka p\u00E5 en ny plats p\u00E5 plagget, dra mark\u00F6ren till en ny position, eller markera att det g\u00E4ller hela plagget.';
    } else {
      message =
        'Klicka p\u00E5 bilden f\u00F6r att markera var skadan/defekten \u00E4r placerad, eller markera att det g\u00E4ller hela plagget.';
    }
  } else {
    message =
      'Du m\u00E5ste markera alla valda skador och defekter p\u00E5 bilden nedan. Markeringar visas i den ordning de har valts. Du kan dra markeringarna till andra positioner om du beh\u00F6ver justera dem.';
  }

  return (
    <div className="instruction-msg">
      <InfoIcon className="instruction-icon" size={24} />
      <p className="instruction-text">{message}</p>
    </div>
  );
}
