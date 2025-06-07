import React, { useEffect, useState } from 'react';
import InstructionMessage from './InstructionMessage.jsx';
import MarkerList from './MarkerList.jsx';
import MarkerButtons from './MarkerButton.jsx';
import GarmentView from './GarmentView.jsx';
import { getDefectLabel, getDamageLabel } from '../../../setup/i18n.js';
import t from '../../../setup/i18n.js';

export default function GarmentDamageMarker({
  product,
  damageIndex,
  defectId,
  updateDamageDetail,
  updateDefectDetail,
  selectedDamageIndex,
  selectedDefectId,
  onSelectDamage,
  onSelectDefect,
  damageMarkable = {},
  defectMarkable = {},
}) {
  const [damagePositions, setDamagePositions] = useState({});
  const [defectPositions, setDefectPositions] = useState({});
  const [orderMap, setOrderMap] = useState({});
  const [nextOrder, setNextOrder] = useState(1);

  const labelForDefect = (id) =>
    product.defectLabels?.[id] || getDefectLabel(product.type, id);
  const labelForDamage = (idx) =>
    product.damageLabels?.[idx] || getDamageLabel(product.type, product.damages[idx]);

  useEffect(() => {
    const dPos = {};
    const dfPos = {};
    const orders = {};
    let maxOrder = 0;
    product.damages.forEach((_, idx) => {
      const detail = product.damageDetails?.[`damage-${idx}`];
      if (detail && detail.position) {
        dPos[idx] = detail.position;
        if (detail.orderIndex) {
          orders[`damage-${idx}`] = detail.orderIndex;
          maxOrder = Math.max(maxOrder, detail.orderIndex);
        }
      }
    });
    if (product.defectDetails) {
      Object.entries(product.otherIssues).forEach(([id, active]) => {
        if (active && product.defectDetails[id]?.position) {
          dfPos[id] = product.defectDetails[id].position;
          const oi = product.defectDetails[id].orderIndex || 0;
          if (oi) {
            orders[id] = oi;
            maxOrder = Math.max(maxOrder, oi);
          }
        }
      });
    }
    setDamagePositions(dPos);
    setDefectPositions(dfPos);
    setOrderMap(orders);
    setNextOrder(maxOrder + 1);
  }, [product]);

  const nextSelection = () => {
    if (damageIndex !== undefined) return { type: 'damage', id: damageIndex };
    if (defectId) return { type: 'defect', id: defectId };
    for (let i = 0; i < product.damages.length; i++) if (!damagePositions[i]) return { type: 'damage', id: i };
    const defects = Object.entries(product.otherIssues).filter(([id, on]) => on).map(([id]) => id);
    for (const id of defects) if (!defectPositions[id]) return { type: 'defect', id };
    return null;
  };

  const handleMark = (x, y, view) => {
    if (damageIndex !== undefined && damageMarkable[damageIndex]) {
      const pos = { x, y, view };
      setDamagePositions((p) => ({ ...p, [damageIndex]: pos }));
      const orderKey = `damage-${damageIndex}`;
      if (!orderMap[orderKey]) {
        setOrderMap((m) => ({ ...m, [orderKey]: nextOrder }));
        setNextOrder((o) => o + 1);
      }
      updateDamageDetail && updateDamageDetail(damageIndex, { position: pos, orderIndex: orderMap[orderKey] || nextOrder });
      return;
    }
    if (defectId && defectMarkable[defectId]) {
      const pos = { x, y, view };
      setDefectPositions((p) => ({ ...p, [defectId]: pos }));
      if (!orderMap[defectId]) {
        setOrderMap((m) => ({ ...m, [defectId]: nextOrder }));
        setNextOrder((o) => o + 1);
      }
      updateDefectDetail && updateDefectDetail(defectId, { position: pos, orderIndex: orderMap[defectId] || nextOrder });
      return;
    }
  };

  const markWholeProduct = () => {
    handleMark(0.5, 0.5, 'whole');
  };

  const resetAll = () => {
    setDamagePositions({});
    setDefectPositions({});
    setOrderMap({});
    setNextOrder(1);
    product.damages.forEach((_, idx) => {
      updateDamageDetail && updateDamageDetail(idx, { position: undefined, orderIndex: undefined });
    });
    Object.entries(product.otherIssues || {}).forEach(([id, on]) => {
      if (on) {
        updateDefectDetail && updateDefectDetail(id, { position: undefined, orderIndex: undefined });
      }
    });
  };

  const isWholeMarker = (pos) => pos && pos.view === 'whole';

  const imageUrl = product.images ? product.images.front : null;

  const isMarked = damageIndex !== undefined ? !!damagePositions[damageIndex] : defectId ? !!defectPositions[defectId] : false;
  const singleMode = damageIndex !== undefined || !!defectId;
  const totalMarks = Object.keys(damagePositions).length + Object.keys(defectPositions).length;

  const handleMarkerClick = (type, id) => {
    if (type === 'damage' && onSelectDamage && damageMarkable[id]) {
      onSelectDamage(id);
    }
    if (type === 'defect' && onSelectDefect && defectMarkable[id]) {
      onSelectDefect(id);
    }
  };

  return (
    <div className="gdm-container">
      <h4 className="gdm-title">{t('secondStep.markDamageBelow')}</h4>
      <InstructionMessage productType={product.type} isMarked={isMarked} isSingleMarkMode={singleMode} />
      <div className="gdm-row">
        <MarkerButtons onResetAllMarkers={resetAll} />
      </div>
      <div className="gdm-white-section">
        <MarkerList
          product={product}
          damagePositions={damagePositions}
          defectPositions={defectPositions}
          isWholeProductMarker={isWholeMarker}
          damageMarkable={damageMarkable}
          defectMarkable={defectMarkable}
          getDamageLabel={labelForDamage}
          removeDamage={(e, idx) => {
            e.stopPropagation();
            setDamagePositions((p) => {
              const { [idx]: removed, ...rest } = p;
              return rest;
            });
            setOrderMap((m) => {
              const { [`damage-${idx}`]: removed, ...rest } = m;
              return rest;
            });
            updateDamageDetail && updateDamageDetail(idx, { position: undefined, orderIndex: undefined });
          }}
          removeDefect={(e, id) => {
            e.stopPropagation();
            setDefectPositions((p) => {
              const { [id]: removed, ...rest } = p;
              return rest;
            });
            setOrderMap((m) => {
              const { [id]: removed, ...rest } = m;
              return rest;
            });
            updateDefectDetail && updateDefectDetail(id, { position: undefined, orderIndex: undefined });
          }}
          getDefectLabel={labelForDefect}
          markerSelectionOrder={orderMap}
          onSelectDamage={onSelectDamage}
          onSelectDefect={onSelectDefect}
          selectedDamageIndex={selectedDamageIndex}
          selectedDefectId={selectedDefectId}
        />
        <GarmentView
          productType={product.type}
          imageUrl={imageUrl}
          onMarkPosition={handleMark}
          disabled={false}
          maxMarks={product.damages.length}
          currentMarks={totalMarks}
          selectedForMarking={selectedDamageIndex !== undefined || selectedDefectId !== undefined}
          damagePositions={damagePositions}
          defectPositions={defectPositions}
          productDamages={product.damages}
          damageLabels={product.damageLabels || {}}
          defectLabels={Object.fromEntries(
            Object.entries(product.otherIssues || {})
              .filter(([_, on]) => on)
              .map(([id]) => [id, labelForDefect(id)])
          )}
          onMarkerDrag={() => {}}
          onMarkerClick={handleMarkerClick}
          markerSelectionOrder={orderMap}
          product={product}
          removeDamage={(e, idx) => {
            e.stopPropagation();
            setDamagePositions((p) => {
              const { [idx]: removed, ...rest } = p;
              return rest;
            });
            setOrderMap((m) => {
              const { [`damage-${idx}`]: removed, ...rest } = m;
              return rest;
            });
            updateDamageDetail && updateDamageDetail(idx, { position: undefined, orderIndex: undefined });
          }}
          removeDefect={(e, id) => {
            e.stopPropagation();
            setDefectPositions((p) => {
              const { [id]: removed, ...rest } = p;
              return rest;
            });
            setOrderMap((m) => {
              const { [id]: removed, ...rest } = m;
              return rest;
            });
            updateDefectDetail && updateDefectDetail(id, { position: undefined, orderIndex: undefined });
          }}
          getDamageLabel={labelForDamage}
          getDefectLabel={labelForDefect}
          isWholeProductMarker={isWholeMarker}
        />
      </div>
    </div>
  );
}
