import React, { useEffect, useState } from 'react';
import ProductTypeSelector from './ProductTypeSelector';
import DamageCountSelector from './DamageCountSelector';
import DamageSelector from './DamageSelector';
import DefectsSection from './DefectsSection';
import EmployeeOwnershipFields from './EmployeeOwnershipFields';
import GarmentDamageMarker from './damage-marker/GarmentDamageMarker';
import config from '../../config.js';
import t from '../../i18n.js';

export default function ProductCard({ product, onUpdate }) {
  const [selectedDamageIndex, setSelectedDamageIndex] = useState();
  const [selectedDefectId, setSelectedDefectId] = useState();
  const [markingOpen, setMarkingOpen] = useState(false);

  const category = config.productCategories.find((c) => c.id === product.type);

  // Correctly maps damage options, including nested ones and the markedOnPicture flag.
  const DAMAGE_OPTIONS = category
    ? category.damages.map((d) => ({
        id: d.id,
        label: d.name.sv || d.name.en,
        markedOnPicture: d.markedOnPicture,
        options: (d.options || []).map((opt) => ({
          id: opt.id,
          label: opt.name.sv || opt.name.en,
        })),
      }))
    : [];

  // Correctly maps defect options, including the markedOnPicture flag.
  const DEFECT_OPTIONS = category
    ? category.defects.map((d) => ({
        id: d.id,
        label: d.name.sv || d.name.en,
        markedOnPicture: d.markedOnPicture,
      }))
    : [];

  const updateField = (field, value) => {
    onUpdate && onUpdate(product.id, field, value);
  };

  // This useEffect correctly preserves user selections when damageCount changes.
  useEffect(() => {
    const currentDamages = product.damages || [];
    if (currentDamages.length !== product.damageCount) {
      const newDamages = Array.from({ length: product.damageCount }).map(
        (_, i) => currentDamages[i] || ''
      );
      updateField('damages', newDamages);
    }
  }, [product.damageCount]);

  // This useEffect ensures the correct images are loaded when the product type changes.
  useEffect(() => {
    if (product.type && category) {
      const firstDamageWithImages = category.damages.find(d => d.picturesToBeMarked && d.picturesToBeMarked.length > 0);
      if(firstDamageWithImages) {
          const pics = firstDamageWithImages.picturesToBeMarked;
          updateField('images', {
              front: pics[0] || null,
              back: pics[1] || pics[0] || null,
              left: pics[2] || pics[0] || null,
              right: pics[3] || pics[0] || null,
          });
      }
    }
  }, [product.type, category]);

  const updateDamageType = (idx, val) => {
    const arr = [...(product.damages || [])];
    while (arr.length <= idx) {
      arr.push('');
    }
    arr[idx] = val;
    updateField('damages', arr);

    const details = { ...(product.damageDetails || {}) };
    details[`damage-${idx}`] = { optionId: '' };
    updateField('damageDetails', details);

    // Update images based on the specific damage type selected
    const damageObj = category?.damages.find((d) => d.id === val);
    if (damageObj?.picturesToBeMarked?.length) {
      const pics = damageObj.picturesToBeMarked;
      updateField('images', {
        front: pics[0] || null,
        back: pics[1] || pics[0] || null,
        left: pics[2] || pics[0] || null,
        right: pics[3] || pics[0] || null,
      });
    }
    if (damageObj?.markedOnPicture) {
      setSelectedDefectId(undefined);
      setSelectedDamageIndex(idx);
      setMarkingOpen(true);
    }
  };

  const updateDamageDetail = (idx, detail) => {
    const details = { ...(product.damageDetails || {}) };
    details[`damage-${idx}`] = { ...(details[`damage-${idx}`] || {}), ...detail };
    updateField('damageDetails', details);
  };

  const toggleDefect = (prodId, id) => {
    const issues = { ...(product.otherIssues || {}) };
    issues[id] = !issues[id];
    updateField('otherIssues', issues);

    if (issues[id]) {
      const defectObj = DEFECT_OPTIONS.find((d) => d.id === id);
      if (defectObj?.markedOnPicture) {
        setSelectedDamageIndex(undefined);
        setSelectedDefectId(id);
        setMarkingOpen(true);
      }
    }
  };

  return (
    <div className="bg-[hsl(var(--light-purple))] p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">{t('firstStep.product')} #{product.id}</h3>
      </div>
      <div className="space-y-6">
        <ProductTypeSelector
          productType={product.type}
          onTypeChange={(v) => updateField('type', v)}
          error={product.typeError}
        />
        {product.type && (
          <DamageCountSelector
            count={product.damageCount}
            onChange={(v) => updateField('damageCount', v)}
          />
        )}
        {product.type && product.damageCount > 0 && (
          <div className="space-y-4">
            {Array.from({ length: product.damageCount }).map((_, idx) => {
              const selectedDamageId = product.damages?.[idx];
              const selectedDamageConfig = DAMAGE_OPTIONS.find(d => d.id === selectedDamageId);

              return (
                <div key={idx} className="space-y-1">
                  <DamageSelector
                    index={idx}
                    damage={selectedDamageId || ''}
                    option={product.damageDetails?.[`damage-${idx}`]?.optionId || ''}
                    damageOptions={DAMAGE_OPTIONS}
                    optionOptions={selectedDamageConfig?.options || []}
                    onDamageChange={(val) => updateDamageType(idx, val)}
                    onOptionChange={(val) => updateDamageDetail(idx, { optionId: val })}
                  />
                </div>
              );
            })}
          </div>
        )}
        {product.type && (
          <DefectsSection
            productId={product.id}
            issues={DEFECT_OPTIONS}
            selected={product.otherIssues || {}}
            onToggle={toggleDefect}
          />
        )}
        <EmployeeOwnershipFields
          product={product}
          onUpdate={(field, val) => updateField(field, val)}
        />
        {(product.damageCount > 0 || Object.values(product.otherIssues || {}).some(Boolean)) &&
          markingOpen && (
            <div className="relative p-4 bg-white rounded-lg shadow">
              <button
                type="button"
                aria-label="Close"
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
                onClick={() => {
                  setMarkingOpen(false);
                  setSelectedDamageIndex(undefined);
                  setSelectedDefectId(undefined);
                }}
              >
                ✕
              </button>
              <GarmentDamageMarker
                product={product}
                damageIndex={selectedDamageIndex}
                defectId={selectedDefectId}
                updateDamageDetail={updateDamageDetail}
                updateDefectDetail={(id, detail) => {
                  const details = { ...(product.defectDetails || {}) };
                  details[id] = { ...(details[id] || {}), ...detail };
                  updateField('defectDetails', details);
                }}
                onSelectDamage={(idx) => {
                  setSelectedDefectId(undefined);
                  setSelectedDamageIndex(idx);
                  setMarkingOpen(true);
                }}
                onSelectDefect={(id) => {
                  setSelectedDamageIndex(undefined);
                  setSelectedDefectId(id);
                  setMarkingOpen(true);
                }}
              />
            </div>
          )}
      </div>
    </div>
  );
}
