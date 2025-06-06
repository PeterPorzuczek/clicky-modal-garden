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

export default function MarkerList({
  product,
  damagePositions = {},
  defectPositions = {},
  markerSelectionOrder = {},
  removeDamage,
  removeDefect,
  getDefectLabel = (id) => id,
  isWholeProductMarker = () => false,
}) {
  const entries = [
    ...Object.entries(damagePositions).map(([idx, pos]) => ({
      key: `damage-${idx}`,
      type: 'damage',
      id: parseInt(idx),
      order: markerSelectionOrder[`damage-${idx}`] || 0,
      label: product.damages[idx] === 'tear' ? 'Reva' : product.damages[idx],
      pos,
    })),
    ...Object.entries(defectPositions).map(([id, pos]) => ({
      key: `defect-${id}`,
      type: 'defect',
      id,
      order: markerSelectionOrder[id] || 0,
      label: getDefectLabel(id),
      pos,
    })),
  ].sort((a, b) => a.order - b.order);

  if (entries.length === 0) return null;

  return (
    <div className="mb-2">
      <h5 className="text-sm font-medium mb-1">Valda markeringar:</h5>
      <div className="flex flex-wrap gap-2">
        {entries.map((e) => (
          <div
            key={e.key}
            className="flex items-center bg-[#F2FCE2] border border-[#e1efd2] rounded-full px-3 py-1 text-xs"
          >
            <span className="flex items-center">
              <span className="inline-block w-5 h-5 bg-green-600 text-white rounded-full mr-2 flex items-center justify-center text-xs font-bold">
                {e.order}
              </span>
              <span className="mr-2">{e.label}</span>
              {isWholeProductMarker(e.pos) && (
                <span className="text-xs text-gray-600 mr-2">(hela produkten)</span>
              )}
            </span>
            <button
              type="button"
              onClick={(ev) =>
                e.type === 'damage'
                  ? removeDamage && removeDamage(ev, e.id)
                  : removeDefect && removeDefect(ev, e.id)
              }
              className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <XIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
