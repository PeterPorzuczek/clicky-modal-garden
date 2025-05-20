import React, { useEffect, useState } from 'react';
import ProductTypeSelector from './ProductTypeSelector';
import DamageCountSelector from './DamageCountSelector';
import DamageSelector from './DamageSelector';
import DefectsSection from './DefectsSection';
import EmployeeOwnershipFields from './EmployeeOwnershipFields';
import GarmentDamageMarker from './damage-marker/GarmentDamageMarker';
import upperBodyImg from '../../../assets/Plagg-overdelar1.jpg';
import lowerBodyImg from '../../../assets/Plagg-Nederdel.jpg';

const DAMAGE_OPTIONS = [
  { value: 'tear', label: 'Reva' },
  { value: 'hole', label: 'H\xE5l' },
  { value: 'stain', label: 'Fl\xE4ck' },
];

const DEFECT_OPTIONS = [
  { id: 'zipper', label: 'Trasig dragkedja' },
  { id: 'button', label: 'Saknar knapp' },
];

const typeImages = {
  overdel: { front: upperBodyImg },
  nederdel: { front: lowerBodyImg },
  skor: null,
};

export default function ProductCard({ product, onUpdate }) {
  const [selectedDamageIndex, setSelectedDamageIndex] = useState();
  const [selectedDefectId, setSelectedDefectId] = useState();

  const updateField = (field, value) => {
    onUpdate && onUpdate(product.id, field, value);
  };

  useEffect(() => {
    if (product.damages?.length !== product.damageCount) {
      const arr = Array.from({ length: product.damageCount }, (_, i) => product.damages?.[i] || '');
      updateField('damages', arr);
      const details = { ...(product.damageDetails || {}) };
      Object.keys(details).forEach((k) => {
        const idx = parseInt(k.replace('damage-', ''));
        if (idx >= arr.length) delete details[k];
      });
      updateField('damageDetails', details);
    }
  }, [product.damageCount]);

  const updateDamageType = (idx, val) => {
    const arr = [...(product.damages || [])];
    arr[idx] = val;
    updateField('damages', arr);
  };

  const updateDamageDetail = (idx, detail) => {
    const details = { ...(product.damageDetails || {}) };
    details[`damage-${idx}`] = { ...(details[`damage-${idx}`] || {}), ...detail };
    updateField('damageDetails', details);
  };

  const toggleDefect = (prodId, id) => {
    const issues = { ...(product.otherIssues || {}) };
    const labels = { ...(product.defectLabels || {}) };
    issues[id] = !issues[id];
    if (issues[id]) {
      labels[id] = DEFECT_OPTIONS.find((d) => d.id === id)?.label || id;
    } else {
      delete labels[id];
      const d = { ...(product.defectDetails || {}) };
      delete d[id];
      updateField('defectDetails', d);
    }
    updateField('otherIssues', issues);
    updateField('defectLabels', labels);
  };

  const updateDefectDetail = (id, detail) => {
    const details = { ...(product.defectDetails || {}) };
    details[id] = { ...(details[id] || {}), ...detail };
    updateField('defectDetails', details);
  };

  return (
    <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Produkt #{product.id}</h3>
      </div>
      <div className="space-y-6">
        <ProductTypeSelector
          productType={product.type}
          onTypeChange={(v) => {
            updateField('type', v);
            updateField('images', typeImages[v] || null);
          }}
          error={product.typeError}
        />
        {product.type && (
          <DamageCountSelector
            count={product.damageCount}
            onChange={(v) => updateField('damageCount', v)}
          />
        )}
        {product.damageCount > 0 && (
          <div className="space-y-4">
            {Array.from({ length: product.damageCount }).map((_, idx) => (
              <div key={idx} className="space-y-1">
                <DamageSelector
                  index={idx}
                  damage={product.damages?.[idx] || ''}
                  tearSize={product.damageDetails?.[`damage-${idx}`]?.tearSize || ''}
                  options={DAMAGE_OPTIONS}
                  onDamageChange={(val) => updateDamageType(idx, val)}
                  onTearSizeChange={(val) => updateDamageDetail(idx, { tearSize: val })}
                />
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={() => {
                    setSelectedDefectId(undefined);
                    setSelectedDamageIndex(idx);
                  }}
                >
                  Markera skada
                </button>
              </div>
            ))}
          </div>
        )}
        <DefectsSection
          productId={product.id}
          issues={DEFECT_OPTIONS}
          selected={product.otherIssues || {}}
          onToggle={toggleDefect}
        />
        {Object.entries(product.otherIssues || {})
          .filter(([_, on]) => on)
          .map(([id]) => (
            <button
              key={id}
              type="button"
              className="text-sm text-blue-600 underline mr-2"
              onClick={() => {
                setSelectedDamageIndex(undefined);
                setSelectedDefectId(id);
              }}
            >
              Markera: {DEFECT_OPTIONS.find((d) => d.id === id)?.label || id}
            </button>
          ))}
        <EmployeeOwnershipFields
          product={product}
          onUpdate={(field, val) => updateField(field, val)}
        />
        {(product.damageCount > 0 || Object.values(product.otherIssues || {}).some(Boolean)) && (
          <GarmentDamageMarker
            product={product}
            damageIndex={selectedDamageIndex}
            defectId={selectedDefectId}
            updateDamageDetail={updateDamageDetail}
            updateDefectDetail={updateDefectDetail}
            selectedDamageIndex={selectedDamageIndex}
            selectedDefectId={selectedDefectId}
          />
        )}
      </div>
    </div>
  );
}
