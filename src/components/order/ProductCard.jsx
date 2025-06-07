import React, { useEffect, useState, useRef } from 'react';
import ProductTypeSelector from './ProductTypeSelector';
import DamageCountSelector from './DamageCountSelector';
import DamageSelector from './DamageSelector';
import DefectsSection from './DefectsSection';
import EmployeeOwnershipFields from './EmployeeOwnershipFields';
import GarmentDamageMarker from './damage-marker/GarmentDamageMarker';
import config from '../../config.js';
import t, { localize } from '../../i18n.js';

export default function ProductCard({ product, onUpdate }) {
  const [selectedDamageIndex, setSelectedDamageIndex] = useState();
  const [selectedDefectId, setSelectedDefectId] = useState();
  const [markingOpen, setMarkingOpen] = useState(false);
  const [damageMarkable, setDamageMarkable] = useState({});
  const [defectMarkable, setDefectMarkable] = useState({});
  const prevType = useRef(product.type);

  const category = config.productCategories.find((c) => c.id === product.type);

  // Correctly maps damage options, including nested ones and the markedOnPicture flag.
  const DAMAGE_OPTIONS = category
    ? category.damages.map((d) => ({
        id: d.id,
        label: localize(d.name),
        markedOnPicture: d.markedOnPicture,
        options: (d.options || []).map((opt) => ({
          id: opt.id,
          label: localize(opt.name),
        })),
      }))
    : [];

  // Correctly maps defect options, including the markedOnPicture flag.
  const DEFECT_OPTIONS = category
    ? category.defects.map((d) => ({
        id: d.id,
        label: localize(d.name),
        markedOnPicture: d.markedOnPicture,
      }))
    : [];


  const updateField = (field, value) => {
    onUpdate && onUpdate(product.id, field, value);
  };

  // Reset related data when the product category changes
  useEffect(() => {
    if (prevType.current && prevType.current !== product.type) {
      updateField('damageCount', 0);
      updateField('damages', []);
      updateField('damageDetails', {});
      updateField('damageLabels', {});
      updateField('otherIssues', {});
      updateField('defectDetails', {});
      updateField('defectLabels', {});
      updateField('images', null);
      updateField('damageErrors', {});
      updateField('damageOptionErrors', {});
      updateField('markerError', undefined);
      setSelectedDamageIndex(undefined);
      setSelectedDefectId(undefined);
      setMarkingOpen(false);
    }
    prevType.current = product.type;
  }, [product.type]);

  // This useEffect correctly preserves user selections when damageCount changes.
  useEffect(() => {
    const currentDamages = product.damages || [];
    if (currentDamages.length !== product.damageCount) {
      const newDamages = Array.from({ length: product.damageCount }).map(
        (_, i) => currentDamages[i] || ''
      );
      updateField('damages', newDamages);

      const newDamageLabels = { ...(product.damageLabels || {}) };
      for (let i = product.damageCount; i < currentDamages.length; i++) {
        delete newDamageLabels[i];
      }
      updateField('damageLabels', newDamageLabels);
    }
  }, [product.damageCount]);

  // Ensure default images are only set if none are saved for this product.
  useEffect(() => {
    if (product.type && category && !product.images) {
      const firstDamageWithImages = category.damages.find(
        (d) => d.picturesToBeMarked && d.picturesToBeMarked.length > 0
      );
      if (firstDamageWithImages) {
        const pics = firstDamageWithImages.picturesToBeMarked;
        updateField('images', {
          front: pics[0] || null,
          back: pics[1] || pics[0] || null,
          left: pics[2] || pics[0] || null,
          right: pics[3] || pics[0] || null,
        });
      }
    }
  }, [product.type, category, product.images]);

  // When returning to this step, reopen the marker editor if there are
  // existing markings stored in the product details so they remain editable.
  useEffect(() => {
    const hasDamageMarks = product.damages?.some(
      (_, idx) => product.damageDetails?.[`damage-${idx}`]?.position
    );
    const hasDefectMarks = Object.entries(product.otherIssues || {}).some(
      ([id, active]) =>
        active && product.defectDetails?.[id]?.position !== undefined
    );
    if (hasDamageMarks || hasDefectMarks) {
      setMarkingOpen(true);
    }
  }, [
    product.damages,
    product.damageDetails,
    product.otherIssues,
    product.defectDetails,
  ]);

  useEffect(() => {
    const dMark = {};
    product.damages.forEach((id, idx) => {
      const cfg = DAMAGE_OPTIONS.find((o) => o.id === id);
      dMark[idx] = !!cfg?.markedOnPicture;
    });
    setDamageMarkable(dMark);

    const defMark = {};
    DEFECT_OPTIONS.forEach((opt) => {
      defMark[opt.id] = !!opt.markedOnPicture;
    });
    setDefectMarkable(defMark);
  }, [product.damages, category]);

  const updateDamageType = (idx, val) => {
    const arr = [...(product.damages || [])];
    while (arr.length <= idx) {
      arr.push('');
    }
    arr[idx] = val;
    updateField('damages', arr);

    const damageLabels = { ...(product.damageLabels || {}) };
    if (val) {
      const dmgOpt = DAMAGE_OPTIONS.find((d) => d.id === val);
      if (dmgOpt) damageLabels[idx] = dmgOpt.label;
      else delete damageLabels[idx];
    } else {
      delete damageLabels[idx];
    }
    updateField('damageLabels', damageLabels);

    const details = { ...(product.damageDetails || {}) };
    details[`damage-${idx}`] = { optionId: '' };
    updateField('damageDetails', details);

    // Update images based on the specific damage type selected
    const damageCfg = category?.damages.find((d) => d.id === val);
    if (damageCfg?.picturesToBeMarked?.length) {
      const pics = damageCfg.picturesToBeMarked;
      updateField('images', {
        front: pics[0] || null,
        back: pics[1] || pics[0] || null,
        left: pics[2] || pics[0] || null,
        right: pics[3] || pics[0] || null,
      });
    }
    if (damageCfg?.markedOnPicture) {
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

    const labels = { ...(product.defectLabels || {}) };
    if (issues[id]) {
      const defectObj = DEFECT_OPTIONS.find((d) => d.id === id);
      if (defectObj) labels[id] = defectObj.label;
    } else {
      delete labels[id];
    }
    updateField('defectLabels', labels);

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
                    damageError={product.damageErrors?.[idx]}
                    optionError={product.damageOptionErrors?.[idx]}
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
                  if (damageMarkable[idx]) {
                    setSelectedDefectId(undefined);
                    setSelectedDamageIndex(idx);
                    setMarkingOpen(true);
                  }
                }}
                onSelectDefect={(id) => {
                  if (defectMarkable[id]) {
                    setSelectedDamageIndex(undefined);
                    setSelectedDefectId(id);
                    setMarkingOpen(true);
                  }
                }}
                damageMarkable={damageMarkable}
                defectMarkable={defectMarkable}
              />
            </div>
          )}
        {product.markerError && (
          <p className="text-sm text-red-500 mt-1">{product.markerError}</p>
        )}
      </div>
    </div>
  );
}
