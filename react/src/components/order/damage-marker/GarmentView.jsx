import React from 'react';
import { Badge } from '../ui/Badge.jsx';
import { getDamageLabel } from '../../../setup/i18n.js';
import WholeProductList from './WholeProductList.jsx';
import t from '../../../setup/i18n.js';

export default function GarmentView({
  productType,
  imageUrl,
  onMarkPosition,
  disabled = false,
  selectedForMarking = false,
  damagePositions = {},
  defectPositions = {},
  productDamages = [],
  damageLabels = {},
  defectLabels = {},
  markerSelectionOrder = {},
  onMarkerClick,
  product,
  removeDamage,
  removeDefect,
  getDamageLabel: getDamageLabelProp,
  getDefectLabel,
  isWholeProductMarker,
}) {
  const containerRef = React.useRef(null);

  const handleClick = (e) => {
    if (disabled || !onMarkPosition) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    onMarkPosition(x, y, 'front');
  };

  const markers = [
    ...Object.entries(damagePositions).map(([idx, pos]) => ({
      id: `damage-${idx}`,
      isDamage: true,
      pos,
      order: markerSelectionOrder[`damage-${idx}`] || 0,
      label: damageLabels[idx] || getDamageLabel(productType, productDamages[idx]),
    })),
    ...Object.entries(defectPositions).map(([id, pos]) => ({
      id,
      isDamage: false,
      pos,
      order: markerSelectionOrder[id] || 0,
      label: defectLabels[id] || id,
    })),
  ];

  return (
    <div className="gv-container">
      <div className="gv-image-wrapper" ref={containerRef} onClick={handleClick} style={{ cursor: selectedForMarking ? 'crosshair' : 'default' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={productType}
              className="gv-image"
          />
        ) : (
          <div className="gv-placeholder">
            {t('secondStep.noImageAvailable')}
          </div>
        )}
        {markers.map((m) => (
          <div
            key={m.id}
            className="gv-marker"
            style={{ left: `${m.pos.x * 100}%`, top: `${m.pos.y * 100}%` }}
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick && onMarkerClick(m.isDamage ? 'damage' : 'defect', m.isDamage ? parseInt(m.id.split('-')[1]) : m.id);
            }}
          >
            {m.isDamage ? (
                <div className="gv-marker-circle">
                {m.order}
              </div>
            ) : (
              <div className="gv-badge-wrapper">
                <Badge variant="outline" className="gv-badge">
                  {m.label}
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>
      {product && isWholeProductMarker && (
        <WholeProductList
          product={product}
          damagePositions={damagePositions}
          defectPositions={defectPositions}
          isWholeProductMarker={isWholeProductMarker}
          removeMarker={removeDamage}
          removeDefectMarker={removeDefect}
          getDamageLabel={getDamageLabelProp}
          getDefectLabel={getDefectLabel}
          markerSelectionOrder={markerSelectionOrder}
        />
      )}
    </div>
  );
}
