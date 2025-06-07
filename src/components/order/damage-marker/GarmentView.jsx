import React from 'react';
import Badge from '../../../ui/Badge.jsx';
import { getDamageLabel } from '../../../i18n.js';

export default function GarmentView({
  productType,
  imageUrl,
  onMarkPosition,
  disabled = false,
  selectedForMarking = false,
  damagePositions = {},
  defectPositions = {},
  productDamages = [],
  defectLabels = {},
  markerSelectionOrder = {},
  onMarkerClick,
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
      label: getDamageLabel(productType, productDamages[idx]),
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
    <div className="mt-4 border rounded-lg p-2 bg-white">
      <div className="relative mt-2" ref={containerRef} onClick={handleClick} style={{ cursor: selectedForMarking ? 'crosshair' : 'default' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={productType}
            className="w-full h-auto object-contain max-h-[250px]"
          />
        ) : (
          <div className="w-full aspect-[4/3] max-h-[250px] flex items-center justify-center bg-gray-100 text-gray-500">
            Ingen bild tillg\u00E4nglig
          </div>
        )}
        {markers.map((m) => (
          <div
            key={m.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${m.pos.x * 100}%`, top: `${m.pos.y * 100}%` }}
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick && onMarkerClick(m.isDamage ? 'damage' : 'defect', m.isDamage ? parseInt(m.id.split('-')[1]) : m.id);
            }}
          >
            {m.isDamage ? (
              <div className="w-6 h-6 -ml-3 -mt-3 rounded-full bg-green-600 border-2 border-white shadow-md flex items-center justify-center text-[10px] text-white font-bold">
                {m.order}
              </div>
            ) : (
              <div className="-translate-x-1/2 -translate-y-1/2">
                <Badge variant="outline" className="bg-gray-100 border-gray-200 shadow-sm flex items-center px-2 py-1">
                  {m.label}
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
