import React from 'react';
import { getDamageLabel as lookupDamageLabel } from '../../../i18n.js';

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
  getDamageLabel = (idx) => lookupDamageLabel(product.type, product.damages[idx]),
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
    <div className="whole-list">
      <h5 className="whole-title">Helproduktmarkeringar:</h5>
      <div className="whole-items">
        {wholeDamages.map((index) => {
          const order = markerSelectionOrder[`damage-${index}`] || 0;
          const label = getDamageLabel(index);
          return (
            <div key={`whole-damage-${index}`} className="whole-item">
              <span className="marker-label">
                <span className="marker-num marked">
                  {order}
                </span>
                <span className="label-text">{label}</span>
                <span className="marker-whole">(hela produkten)</span>
              </span>
              <button type="button" onClick={(e) => removeMarker && removeMarker(e, index)} className="marker-remove">
                <XIcon size={14} />
              </button>
            </div>
          );
        })}
        {wholeDefects.map((id) => {
          const order = markerSelectionOrder[id] || 0;
          return (
            <div key={`whole-defect-${id}`} className="whole-item">
              <span className="marker-label">
                <span className="marker-num marked">
                  {order}
                </span>
                <span className="label-text">{getDefectLabel(id)}</span>
                <span className="marker-whole">(hela produkten)</span>
              </span>
              <button type="button" onClick={(e) => removeDefectMarker && removeDefectMarker(e, id)} className="marker-remove">
                <XIcon size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
