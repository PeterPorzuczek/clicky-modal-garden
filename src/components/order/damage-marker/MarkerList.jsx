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
  onSelectDamage,
  onSelectDefect,
  selectedDamageIndex,
  selectedDefectId,
}) {
  const damageEntries = product.damages.map((d, idx) => ({
    key: `damage-${idx}`,
    type: 'damage',
    id: idx,
    order: markerSelectionOrder[`damage-${idx}`],
    label: d === 'tear' ? 'Reva' : d,
    pos: damagePositions[idx],
  }));

  const defectEntries = Object.entries(product.otherIssues || {})
    .filter(([, on]) => on)
    .map(([id]) => ({
      key: `defect-${id}`,
      type: 'defect',
      id,
      order: markerSelectionOrder[id],
      label: getDefectLabel(id),
      pos: defectPositions[id],
    }));

  const entries = [...damageEntries, ...defectEntries].sort((a, b) => {
    const orderA = a.order ?? Infinity;
    const orderB = b.order ?? Infinity;
    if (orderA === orderB) return a.key.localeCompare(b.key);
    return orderA - orderB;
  });

  if (entries.length === 0) return null;

  return (
    <div className="mb-2">
      <h5 className="text-sm font-medium mb-1">Valda markeringar:</h5>
      <div className="flex flex-wrap gap-2">
        {entries.map((e) => {
          const selected =
            (e.type === 'damage' && selectedDamageIndex === e.id) ||
            (e.type === 'defect' && selectedDefectId === e.id);
          const marked = !!e.pos;
          const baseClasses = marked
            ? 'bg-[#F2FCE2] border-[#e1efd2]'
            : 'bg-gray-100 border-gray-300 text-gray-500';
          return (
            <div
              key={e.key}
              role="button"
              tabIndex={0}
              onClick={() =>
                e.type === 'damage'
                  ? onSelectDamage && onSelectDamage(e.id)
                  : onSelectDefect && onSelectDefect(e.id)
              }
              className={`flex items-center border rounded-full px-3 py-1 text-xs cursor-pointer ${baseClasses} ${selected ? 'ring-2 ring-blue-500' : ''}`}
            >
              <span className="flex items-center">
                <span
                  className={`inline-block w-5 h-5 mr-2 flex items-center justify-center text-xs font-bold rounded-full ${marked ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}`}
                >
                  {marked ? e.order : ''}
                </span>
                <span className="mr-2">{e.label}</span>
                {marked && isWholeProductMarker(e.pos) && (
                  <span className="text-xs text-gray-600 mr-2">(hela produkten)</span>
                )}
              </span>
              {marked && (
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    e.type === 'damage'
                      ? removeDamage && removeDamage(ev, e.id)
                      : removeDefect && removeDefect(ev, e.id);
                  }}
                  className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <XIcon size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
