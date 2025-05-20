import React from 'react';

function XIcon({ className = '', size = 14 }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function WholeProductList({
  product,
  damagePositions = {},
  defectPositions = {},
  isWholeProductMarker = () => false,
  removeMarker,
  removeDefectMarker,
  getDefectLabel = (id) => id,
  markerSelectionOrder = {},
}) {
  const wholeDamages = Object.entries(damagePositions)
    .filter(([_, pos]) => isWholeProductMarker(pos))
    .map(([idx]) => parseInt(idx));
  const wholeDefects = Object.entries(defectPositions)
    .filter(([_, pos]) => isWholeProductMarker(pos))
    .map(([id]) => id);

  if (wholeDamages.length === 0 && wholeDefects.length === 0) return null;

  return (
    <div className="mb-2">
      <h5 className="text-sm font-medium mb-1">Helproduktmarkeringar:</h5>
      <div className="flex flex-wrap gap-2">
        {wholeDamages.map((index) => {
          const order = markerSelectionOrder[`damage-${index}`] || 0;
          const label = product.damages[index] === 'tear' ? 'Reva' : product.damages[index];
          return (
            <div key={`whole-damage-${index}`} className="flex items-center bg-[#F2FCE2] border border-[#e1efd2] rounded-full px-3 py-1 text-xs">
              <span className="flex items-center">
                <span className="inline-block w-5 h-5 bg-green-600 text-white rounded-full mr-2 flex items-center justify-center text-xs font-bold">
                  {order}
                </span>
                <span className="mr-2">{label}</span>
                <span className="text-xs text-gray-600 mr-2">(hela produkten)</span>
              </span>
              <button type="button" onClick={(e) => removeMarker && removeMarker(e, index)} className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                <XIcon size={14} />
              </button>
            </div>
          );
        })}
        {wholeDefects.map((id) => {
          const order = markerSelectionOrder[id] || 0;
          return (
            <div key={`whole-defect-${id}`} className="flex items-center bg-[#F2FCE2] border border-[#e1efd2] rounded-full px-3 py-1 text-xs">
              <span className="flex items-center">
                <span className="inline-block w-5 h-5 bg-green-600 text-white rounded-full mr-2 flex items-center justify-center text-xs font-bold">
                  {order}
                </span>
                <span className="mr-2">{getDefectLabel(id)}</span>
                <span className="text-xs text-gray-600 mr-2">(hela produkten)</span>
              </span>
              <button type="button" onClick={(e) => removeDefectMarker && removeDefectMarker(e, id)} className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none">
                <XIcon size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}