import React, { useEffect, useState } from 'react';
import ProductTypeSelector from './ProductTypeSelector';
import DamageCountSelector from './DamageCountSelector';
import DamageSelector from './DamageSelector';
import DefectsSection from './DefectsSection';
import EmployeeOwnershipFields from './EmployeeOwnershipFields';
import GarmentDamageMarker from './damage-marker/GarmentDamageMarker';
import config from '../../config.js';

export default function ProductCard({ product, onUpdate }) {
  const [selectedDamageIndex, setSelectedDamageIndex] = useState();
  const [selectedDefectId, setSelectedDefectId] = useState();


  const category = config.productCategories.find((c) => c.id === product.type);
  
  const DAMAGE_OPTIONS = category
    ? category.damages.map((d) => ({ 
        id: d.id, 
        label: d.name.sv || d.name.en,
        options: (d.options || []).map(opt => ({
          id: opt.id,
          label: opt.name.sv || opt.name.en
        }))
      }))
    : [];
    
  const DEFECT_OPTIONS = category
    ? category.defects.map((d) => ({ 
        id: d.id, 
        label: d.name.sv || d.name.en 
      }))
    : [];

  const updateField = (field, value) => {
    onUpdate && onUpdate(product.id, field, value);
  };

  useEffect(() => {
    const currentDamages = product.damages || [];
    if (currentDamages.length !== product.damageCount) {
      let newDamages;
      if (product.damageCount > currentDamages.length) {
        newDamages = [...currentDamages];
        while (newDamages.length < product.damageCount) {
          newDamages.push('');
        }
      } else {
        newDamages = currentDamages.slice(0, product.damageCount);
      }

      updateField('damages', newDamages);

      const details = { ...(product.damageDetails || {}) };
      Object.keys(details).forEach((k) => {
        const idx = parseInt(k.replace('damage-', ''));
        if (idx >= product.damageCount) delete details[k];
      });
      updateField('damageDetails', details);
    }
  }, [product.damageCount]); // Removed product.damages from dependency array


  useEffect(() => {
    if (!product.images && category && category.damages.length > 0) {
      const pics = category.damages[0].picturesToBeMarked || [];
      if (pics.length) {
        updateField('images', {
          front: pics[0] || null,
          back: pics[1] || pics[0] || null,
          left: pics[2] || pics[0] || null,
          right: pics[3] || pics[0] || null,
        });
      }
    }
  }, [product.type, product.images, category]);

  const updateDamageType = (idx, val) => {
    const arr = [...(product.damages || [])];
    arr[idx] = val;
    updateField('damages', arr);
    const details = { ...(product.damageDetails || {}) };
    details[`damage-${idx}`] = { optionId: '' };
    updateField('damageDetails', details);
    const damageObj = category?.damages.find((d) => d.id === val);
    if (damageObj && damageObj.picturesToBeMarked?.length) {
      const pics = damageObj.picturesToBeMarked;
      updateField('images', {
        front: pics[0] || null,
        back: pics[1] || pics[0] || null,
        left: pics[2] || pics[0] || null,
        right: pics[3] || pics[0] || null,
      });
    }
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
          onTypeChange={(v) => updateField('type', v)}
          error={product.typeError}
        />
        {product.type && (
          <DamageCountSelector
            count={product.damageCount}
            onChange={(v) => updateField('damageCount', v)}
          />
        )}
        {product.type && product.damageCount > 0 && DAMAGE_OPTIONS.length > 0 && (
          <div className="space-y-4">
            {Array.from({ length: product.damageCount }).map((_, idx) => (
              <div key={idx} className="space-y-1">
                <DamageSelector
                  index={idx}
                  damage={product.damages[idx] || ''}
                  allDamages={product.damages || []}
                  option={product.damageDetails?.[`damage-${idx}`]?.optionId || ''}
                  damageOptions={DAMAGE_OPTIONS}
                  optionOptions={
                    DAMAGE_OPTIONS.find((d) => d.id === (product.damages?.[idx] || ''))?.options || []
                  }
                  onDamageChange={(val) => updateDamageType(idx, val)}
                  onOptionChange={(val) => updateDamageDetail(idx, { optionId: val })}
                />
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={() => {
                    setSelectedDefectId(undefined);
                    setSelectedDamageIndex(idx);
                  }}
                >
                  Markera skada na bild
                </button>
              </div>
            ))}
          </div>
        )}
        {product.type && DEFECT_OPTIONS.length > 0 && (
          <DefectsSection
            productId={product.id}
            issues={DEFECT_OPTIONS}
            selected={product.otherIssues || {}}
            onToggle={toggleDefect}
          />
        )}
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
