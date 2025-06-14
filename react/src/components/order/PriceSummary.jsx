import React from 'react';
import config from '../../setup/config.js';
import t, { localize } from '../../setup/i18n.js';

const getPrice = (pricing = {}, count) => {
  if (count >= 6) return pricing['10'] || 0;
  if (count >= 4) return pricing['5'] || 0;
  if (count === 3) return pricing['3'] || 0;
  if (count === 2) return pricing['2'] || 0;
  return pricing['1'] || 0;
};

export function calculateSummary(products = [], discount = 0) {
  const productTotals = products.map((p) => {
    const category = config.productCategories.find((c) => c.id === p.type);
    let subtotal = 0;
    let items = [];
    
    // If product already has items with categories (new format), use them directly
    if (p.items && Array.isArray(p.items)) {
      items = p.items.map(item => ({
        ...item,
        category: item.category || 'damages' // default to damages if no category
      }));
      subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
    } 
    // Otherwise use the old format (damages and otherIssues)
    else if (category) {
      p.damages?.forEach((damageId, idx) => {
        const damage = category.damages.find((d) => d.id === damageId);
        if (damage) {
          const optionId = p.damageDetails?.[`damage-${idx}`]?.optionId;
          const option = optionId ? damage.options.find((o) => o.id === optionId) : damage;
          if (option) {
            const price = getPrice(option.pricing, products.length);
            subtotal += price;
            
            // Create label in format "damage - option" if option exists, otherwise just damage
            let label;
            if (optionId && option !== damage) {
              label = `${localize(damage.name)} - ${localize(option.name)}`;
            } else {
              label = localize(damage.name);
            }
            
            items.push({ label, price, category: 'damages' });
          }
        }
      });
      Object.entries(p.otherIssues || {}).forEach(([id, active]) => {
        if (active) {
          const defect = category.defects.find((d) => d.id === id);
          if (defect) {
            const price = getPrice(defect.pricing, products.length);
            subtotal += price;
            items.push({ label: localize(defect.name), price, category: 'defects' });
          }
        }
      });
    }
    
    return { id: p.id, type: localize(category?.name) || p.type, subtotal: p.subtotal || subtotal, items };
  });

  const subTotal = productTotals.reduce((sum, p) => sum + p.subtotal, 0);
  const discountAmount = Math.round(subTotal * (discount / 100));
  const total = subTotal - discountAmount;

  return { productTotals, subTotal, discountAmount, total };
}

export default function PriceSummary({ products = [], discount = 0 }) {
  const { productTotals, subTotal, discountAmount, total } =
    calculateSummary(products, discount);

  return (
    <div className="price-summary">
      {productTotals.map((p) => (
        <div key={p.id} className="price-product">
                      <div className="price-product-heading">{t('firstStep.product')} #{p.id}: {p.type || '-'}</div>
          <div className="price-product-items">
            {p.items.map((item, idx) => (
              <div key={idx} className="price-item">
                <span>{item.label}</span>
                <span>{item.price} kr</span>
              </div>
            ))}
          </div>
          <div className="price-subtotal">
            <span>{t('firstStep.subtotal')}</span>
            <span>{p.subtotal} kr</span>
          </div>
        </div>
      ))}
      <div className="price-summary-total">
        <span>{t('firstStep.subtotal')}</span>
        <span>{subTotal} kr</span>
      </div>
      {discount > 0 && (
        <div className="price-discount">
          <span>{t('firstStep.discount')} ({discount}%)</span>
          <span>-{discountAmount} kr</span>
        </div>
      )}
      <div className="price-grand-total">
        <span>{t('firstStep.total')}</span>
        <span>{total} kr</span>
      </div>
    </div>
  );
}
