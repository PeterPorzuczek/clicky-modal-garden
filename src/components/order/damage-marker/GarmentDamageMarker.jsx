import React, { useEffect, useState } from 'react';
import InstructionMessage from './InstructionMessage.jsx';
import MarkerList from './MarkerList.jsx';
import MarkerButtons from './MarkerButton.jsx';
import GarmentView from './GarmentView.jsx';

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
}) {
  const [damagePositions, setDamagePositions] = useState({});
  const [defectPositions, setDefectPositions] = useState({});
  const [orderMap, setOrderMap] = useState({});
  const [nextOrder, setNextOrder] = useState(1);

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
    if (damageIndex !== undefined) {
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
    if (defectId) {
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
  };

  const isWholeMarker = (pos) => pos && pos.view === 'whole';

  const imageUrl = product.images ? product.images.front : null;

  const isMarked = damageIndex !== undefined ? !!damagePositions[damageIndex] : defectId ? !!defectPositions[defectId] : false;
  const singleMode = damageIndex !== undefined || !!defectId;
  const totalMarks = Object.keys(damagePositions).length + Object.keys(defectPositions).length;

  const handleMarkerClick = (type, id) => {
    if (type === 'damage' && onSelectDamage) {
      onSelectDamage(id);
    }
    if (type === 'defect' && onSelectDefect) {
      onSelectDefect(id);
    }
  };

  return (
    <div className="mt-3 space-y-3">
      <InstructionMessage productType={product.type} isMarked={isMarked} isSingleMarkMode={singleMode} />
      <div className="flex flex-col gap-2">
        <MarkerList
          product={product}
          damagePositions={damagePositions}
          defectPositions={defectPositions}
          isWholeProductMarker={isWholeMarker}
          removeDamage={(e, idx) => {
            e.stopPropagation();
            setDamagePositions((p) => {
              const { [idx]: removed, ...rest } = p;
              return rest;
            });
          }}
          removeDefect={(e, id) => {
            e.stopPropagation();
            setDefectPositions((p) => {
              const { [id]: removed, ...rest } = p;
              return rest;
            });
          }}
          getDefectLabel={(id) => product.defectLabels?.[id] || id}
          markerSelectionOrder={orderMap}
        />
        <MarkerButtons onResetAllMarkers={resetAll} />
      </div>
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
        defectLabels={product.defectLabels || {}}
        onMarkerDrag={() => {}}
        onMarkerClick={handleMarkerClick}
        markerSelectionOrder={orderMap}
      />
    </div>
  );
}
