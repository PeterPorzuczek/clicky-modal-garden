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

import { getDamageLabel as lookupDamageLabel } from '../../../setup/i18n.js';

export default function MarkerList({
  product,
  damagePositions = {},
  defectPositions = {},
  markerSelectionOrder = {},
  removeDamage,
  removeDefect,
  getDefectLabel = (id) => id,
  getDamageLabel = (idx) =>
    product.damageLabels?.[idx] || lookupDamageLabel(product.type, product.damages[idx]),
  isWholeProductMarker = () => false,
  onSelectDamage,
  onSelectDefect,
  selectedDamageIndex,
  selectedDefectId,
  damageMarkable = {},
  defectMarkable = {},
}) {
  const damageEntries = product.damages
    .map((d, idx) => ({
      key: `damage-${idx}`,
      type: 'damage',
      id: idx,
      order: markerSelectionOrder[`damage-${idx}`],
      label: getDamageLabel(idx),
      pos: damagePositions[idx],
      markable: damageMarkable[idx],
    }))
    .filter((e) => e.markable);

  const defectEntries = Object.entries(product.otherIssues || {})
    .filter(([, on]) => on)
    .map(([id]) => ({
      key: `defect-${id}`,
      type: 'defect',
      id,
      order: markerSelectionOrder[id],
      label: getDefectLabel(id),
      pos: defectPositions[id],
      markable: defectMarkable[id],
    }))
    .filter((e) => e.markable);

  const entries = [...damageEntries, ...defectEntries].sort((a, b) => {
    const orderA = a.order ?? Infinity;
    const orderB = b.order ?? Infinity;
    if (orderA === orderB) return a.key.localeCompare(b.key);
    return orderA - orderB;
  });

  if (entries.length === 0) return null;

  return (
    <div className="marker-list">
      <h5 className="marker-list-title">Valda markeringar:</h5>
      <div className="marker-list-items">
        {entries.map((e) => {
          const markable = !!e.markable;
          const selected =
            (e.type === 'damage' && selectedDamageIndex === e.id) ||
            (e.type === 'defect' && selectedDefectId === e.id);
          const marked = !!e.pos;
          const baseClasses = marked ? 'marked' : 'unmarked';
          return (
            <div
              key={e.key}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (!markable) return;
                e.type === 'damage'
                  ? onSelectDamage && onSelectDamage(e.id)
                  : onSelectDefect && onSelectDefect(e.id);
              }}
              className={`marker-item ${markable ? 'pointer' : 'disabled'} ${baseClasses} ${selected ? 'selected' : ''}`}
            >
              <span className="marker-label">
                <span
                  className={`marker-num ${marked ? 'marked' : 'unmarked'}`}
                >
                  {marked ? e.order : ''}
                </span>
                <span className="label-text">{e.label}</span>
                {marked && isWholeProductMarker(e.pos) && (
                  <span className="marker-whole">(hela produkten)</span>
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
                  className="marker-remove"
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
